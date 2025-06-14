import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { traceable } from "langsmith/traceable";
import { type NextRequest, NextResponse } from "next/server";

interface UserMetrics {
  taskCompletionRate?: number;
  averageEnergyLevel?: number;
  meetingEfficiency?: number;
  focusTime?: number;
  checkinData?: Record<string, unknown>;
  recentTasks?: Record<string, unknown>[];
}

interface InsightResult {
  insights: {
    type: string;
    title: string;
    description: string;
    impact: string;
    priority: string;
    actionable: boolean;
  }[];
  recommendations: string[];
  overallScore: number;
  summary: string;
  strengths: string[];
  areas_for_improvement: string[];
  aiGenerated: boolean;
  timestamp: string;
}

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0.1,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Insights generation prompt
const insightsPrompt = PromptTemplate.fromTemplate(`
    You are a productivity analyst. Analyze the user's metrics and provide actionable insights to improve their productivity.
    
    USER METRICS:
    Task Completion Rate: {taskCompletionRate}%
    Average Energy Level: {averageEnergyLevel}/10
    Meeting Efficiency: {meetingEfficiency}%
    Focus Time: {focusTime} hours/day
    Checkin Data: {checkinData}
    Recent Tasks: {recentTasks}
    
    INSTRUCTIONS:
    1. Analyze each metric for patterns and issues
    2. Identify specific areas for improvement
    3. Provide actionable recommendations
    4. Give an overall productivity assessment
    5. Prioritize insights by impact
    
    Return ONLY valid JSON in this exact format:
    {{
      "insights": [
        {{
          "type": "improvement",
          "title": "Task Completion Optimization",
          "description": "Specific observation about their performance",
          "impact": "Potential improvement percentage or benefit",
          "priority": "high",
          "actionable": true
        }}
      ],
      "recommendations": [
        "Specific actionable recommendation with clear steps"
      ],
      "overallScore": 75,
      "summary": "Brief summary of current productivity state and main opportunities",
      "strengths": ["What they're doing well"],
      "areas_for_improvement": ["Key areas that need attention"]
    }}
    `);

// Create insights chain
const insightsChain = RunnableSequence.from([
  insightsPrompt,
  llm,
  new JsonOutputParser(),
]);

// Traceable insights generation
const generateProductivityInsights = traceable(
  async (userMetrics: UserMetrics): Promise<InsightResult> => {
    try {
      console.log("🧠 Generating AI productivity insights...");

      const result = (await insightsChain.invoke({
        taskCompletionRate: userMetrics.taskCompletionRate || 0,
        averageEnergyLevel: userMetrics.averageEnergyLevel || 5,
        meetingEfficiency: userMetrics.meetingEfficiency || 70,
        focusTime: userMetrics.focusTime || 3,
        checkinData: JSON.stringify(userMetrics.checkinData || {}, null, 2),
        recentTasks: JSON.stringify(userMetrics.recentTasks || [], null, 2),
      })) as Partial<InsightResult>;

      console.log("✅ AI insights generated successfully");

      return {
        insights: result.insights || [],
        recommendations: result.recommendations || [],
        overallScore: result.overallScore || 70,
        summary: result.summary || "Productivity analysis complete",
        strengths: result.strengths || [],
        areas_for_improvement: result.areas_for_improvement || [],
        aiGenerated: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ AI insights error:", error);

      // Fallback insights
      return generateFallbackInsights(userMetrics);
    }
  },
  {
    name: "Productivity Insights Generation",
    run_type: "chain",
    project_name: "productivity-app-scheduler",
    metadata: {
      model: "gpt-3.5-turbo",
      feature: "productivity_insights",
    },
  },
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    console.log(`📡 Received ${action} request`);

    if (action === "generate_insights") {
      console.log("🧠 Starting AI productivity insights generation...");

      const insights = await generateProductivityInsights(data.userMetrics);

      return NextResponse.json({
        success: true,
        data: insights,
        traceUrl:
          "https://smith.langchain.com/projects/productivity-app-scheduler",
        message: "Productivity insights generated successfully",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action. Use 'generate_insights'",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("❌ Insights API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate insights",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Productivity Insights API with LangChain + LangSmith",
    endpoint: "POST /api/scheduler",
    action: "generate_insights",
    status: "operational",
    ai_model: "gpt-3.5-turbo",
    tracing: "LangSmith enabled",
    timestamp: new Date().toISOString(),
  });
}

// Fallback insights function
function generateFallbackInsights(userMetrics: UserMetrics): InsightResult {
  const insights = [];
  const recommendations = [];
  const strengths = [];
  const areas_for_improvement = [];

  // Analyze task completion rate
  if (userMetrics.taskCompletionRate < 70) {
    insights.push({
      type: "improvement",
      title: "Task Completion Rate Needs Attention",
      description: `Current completion rate: ${userMetrics.taskCompletionRate}%. This is below the recommended 70-80% range.`,
      impact: "Could improve overall productivity by 15-20%",
      priority: "high",
      actionable: true,
    });
    areas_for_improvement.push("Task completion consistency");
    recommendations.push(
      "Break large tasks into smaller, 25-minute focused sessions",
    );
    recommendations.push("Use the Eisenhower Matrix to prioritize tasks");
  } else {
    strengths.push("Strong task completion rate");
  }

  // Analyze energy levels
  if (userMetrics.averageEnergyLevel && userMetrics.averageEnergyLevel < 6) {
    insights.push({
      type: "wellness",
      title: "Energy Levels Below Optimal",
      description: `Average energy: ${userMetrics.averageEnergyLevel}/10. Low energy can significantly impact productivity.`,
      impact: "Better energy management could boost productivity by 25%",
      priority: "high",
      actionable: true,
    });
    areas_for_improvement.push("Energy management");
    recommendations.push("Review sleep schedule - aim for 7-9 hours nightly");
    recommendations.push("Take 5-minute breaks every 25-30 minutes");
    recommendations.push("Consider nutrition timing and hydration");
  } else if (userMetrics.averageEnergyLevel >= 8) {
    strengths.push("Excellent energy levels");
  }

  // Analyze meeting efficiency
  if (userMetrics.meetingEfficiency < 75) {
    insights.push({
      type: "meetings",
      title: "Meeting Efficiency Opportunity",
      description: `Meeting efficiency: ${userMetrics.meetingEfficiency}%. Inefficient meetings drain productivity.`,
      impact: "Could save 2-3 hours per week",
      priority: "medium",
      actionable: true,
    });
    areas_for_improvement.push("Meeting effectiveness");
    recommendations.push("Set clear agendas before meetings");
    recommendations.push("Use 25/50 minute meetings instead of 30/60");
    recommendations.push("Question if meetings could be emails instead");
  } else {
    strengths.push("Efficient meeting management");
  }

  // Analyze focus time
  if (userMetrics.focusTime < 3) {
    insights.push({
      type: "focus",
      title: "Insufficient Deep Work Time",
      description: `Only ${userMetrics.focusTime} hours of focused work daily. Most knowledge workers need 3-4 hours minimum.`,
      impact: "Could significantly improve output quality",
      priority: "high",
      actionable: true,
    });
    areas_for_improvement.push("Deep work time");
    recommendations.push("Block 2-hour chunks for deep work");
    recommendations.push("Turn off notifications during focus sessions");
  } else {
    strengths.push("Good focus time allocation");
  }

  // Calculate overall score
  const scores = [
    userMetrics.taskCompletionRate || 50,
    (userMetrics.averageEnergyLevel || 5) * 10,
    userMetrics.meetingEfficiency || 60,
    Math.min((userMetrics.focusTime || 2) * 25, 100),
  ];
  const overallScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length,
  );

  return {
    insights,
    recommendations:
      recommendations.length > 0
        ? recommendations
        : [
            "Great job! Continue your current productivity practices",
            "Consider tracking more detailed metrics for deeper insights",
          ],
    overallScore,
    summary:
      insights.length > 0
        ? `Found ${insights.length} key areas for productivity improvement`
        : "Your productivity metrics look strong overall!",
    strengths:
      strengths.length > 0 ? strengths : ["Maintaining consistent work habits"],
    areas_for_improvement:
      areas_for_improvement.length > 0
        ? areas_for_improvement
        : ["Continue optimizing current systems"],
    aiGenerated: false,
    timestamp: new Date().toISOString(),
  };
}
