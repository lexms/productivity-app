"use client";

import { DailyCheckin } from "@/components/daily-checkin";
import { DailyCheckinHistory } from "@/components/daily-checkin-history";
import { PageHeader } from "@/components/molecules/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, LineChart, Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { CheckinData } from "@/components/daily-checkin-history";

// Sample data generator for demonstration - in production, this would come from your API
const generateSampleData = () => {
  const data = [];
  const now = new Date();

  // Generate 60 days of sample data for more comprehensive view
  for (let i = 60; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Randomize whether there are morning/evening check-ins (higher probability for recent dates)
    const hasMorning = Math.random() > (i > 30 ? 0.6 : 0.3);
    const hasEvening = Math.random() > (i > 30 ? 0.7 : 0.4);

    if (hasMorning) {
      data.push({
        id: `morning-${i}`,
        energy: [Math.floor(Math.random() * 4) + 6], // 6-10 range for morning energy
        mood: [Math.floor(Math.random() * 4) + 6], // 6-10 range for morning mood
        focus: [Math.floor(Math.random() * 4) + 5], // 5-9 range for morning focus
        goals: [
          "Complete project proposal and send to team for review",
          "Review quarterly reports and prepare presentation slides",
          "Attend client meeting and finalize contract details",
          "Work on new feature development for mobile app",
          "Organize team building event for next week",
          "Prepare for upcoming product launch campaign",
          "Conduct user research interviews and analyze feedback",
        ][Math.floor(Math.random() * 7)],
        priorities: [
          "1. Project deadline preparation\n2. Client calls and follow-ups\n3. Team sync meeting",
          "1. Code review and testing\n2. Documentation updates\n3. Bug fixes and optimization",
          "1. Strategic planning session\n2. Market research analysis\n3. Competitor analysis",
          "1. Product roadmap review\n2. User feedback integration\n3. Performance monitoring",
        ][Math.floor(Math.random() * 4)],
        achievements: "",
        challenges: "",
        reflections: "",
        gratitude: "",
        tomorrow: "",
        type: "morning" as const,
        timestamp: new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 AM
        date: date.toISOString().split("T")[0],
      });
    }

    if (hasEvening) {
      data.push({
        id: `evening-${i}`,
        energy: [Math.floor(Math.random() * 6) + 4], // 4-9 range for evening energy
        mood: [Math.floor(Math.random() * 5) + 5], // 5-9 range for evening mood
        focus: [Math.floor(Math.random() * 4) + 4], // 4-7 range for evening focus
        goals: "",
        priorities: "",
        achievements: [
          "Successfully completed the client presentation and received positive feedback",
          "Finished implementing the new authentication system with proper testing",
          "Resolved 5 critical bugs and improved overall system performance",
          "Led productive team meeting and aligned everyone on project goals",
          "Completed comprehensive market research and identified new opportunities",
          "Successfully launched the new feature and monitored initial user adoption",
          "Finished quarterly planning and set clear objectives for next quarter",
        ][Math.floor(Math.random() * 7)],
        challenges: [
          "Struggled with time management during multiple concurrent client calls",
          "Encountered technical issues with the deployment pipeline that caused delays",
          "Difficulty maintaining focus due to frequent interruptions and context switching",
          "Communication challenges with remote team members across different time zones",
          "Balancing multiple high-priority projects with competing deadlines",
          "Debugging complex integration issues that required deep investigation",
          "Managing stakeholder expectations while dealing with technical constraints",
        ][Math.floor(Math.random() * 7)],
        reflections: [
          "Today was productive overall. Need to better manage interruptions and focus blocks.",
          "Feeling good about the progress made on key projects. Team collaboration was excellent.",
          "Learning to delegate more effectively to the team. Seeing positive results.",
          "Good collaboration with colleagues on complex problems. Knowledge sharing worked well.",
          "Need to improve work-life balance for better long-term sustainability and performance.",
          "The new workflow changes are showing positive results. Team is adapting well.",
          "Important to maintain momentum while ensuring quality standards are met.",
        ][Math.floor(Math.random() * 7)],
        gratitude: [
          "Grateful for supportive team members and positive client feedback today",
          "Thankful for the learning opportunities and growth challenges presented",
          "Appreciate the flexibility to work effectively from different locations",
          "Grateful for the resources and tools available to deliver quality work",
          "Thankful for mentor guidance and peer collaboration on difficult problems",
        ][Math.floor(Math.random() * 5)],
        tomorrow: [
          "Focus on completing the quarterly review presentation and stakeholder updates",
          "Start working on the new feature specifications and technical requirements",
          "Schedule one-on-one meetings with team members for performance discussions",
          "Prepare for the upcoming client demo and anticipate potential Q&A scenarios",
          "Begin research phase for the next quarter's strategic initiatives",
        ][Math.floor(Math.random() * 5)],
        type: "evening" as const,
        timestamp: new Date(date.getTime() + 20 * 60 * 60 * 1000).toISOString(), // 8 PM
        date: date.toISOString().split("T")[0],
      });
    }
  }

  return data.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};

export default function CheckinPage() {
  const [historicalData, setHistoricalData] = useState<CheckinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading - in production, this would be an API call
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHistoricalData(generateSampleData());
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleViewDetail = (checkin: CheckinData) => {
    console.log("Viewing detail for checkin:", checkin);
    // In a real app, this might navigate to a detailed view or open a modal
  };

  // Calculate some quick stats for the dashboard
  const recentCheckins = historicalData.filter((checkin) => {
    const checkinDate = new Date(checkin.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return checkinDate >= weekAgo;
  });

  const avgEnergyThisWeek =
    recentCheckins.length > 0
      ? Math.round(
          recentCheckins.reduce((sum, c) => sum + c.energy[0], 0) /
            recentCheckins.length,
        )
      : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <PageHeader
            title="Daily Check-ins"
            description="Track your daily mood, energy, goals, and review your progress"
          />

          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="text-center">
              <div className="text-sm text-gray-600">This Week</div>
              <div className="font-bold text-lg">{recentCheckins.length}</div>
              <div className="text-xs text-gray-500">check-ins</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Avg Energy</div>
              <div className="font-bold text-lg">{avgEnergyThisWeek}/10</div>
              <div className="text-xs text-gray-500">this week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Today's Check-in */}
        <TabsContent value="today" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Check-in</h2>
              <Badge variant="outline" className="text-xs">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
            <DailyCheckin type="morning" />
          </div>
        </TabsContent>

        {/* Historical View */}
        <TabsContent value="history" className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading your check-in history...</p>
            </div>
          ) : (
            <DailyCheckinHistory
              checkins={historicalData}
              onViewDetail={handleViewDetail}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          💡 Pro Tips
        </h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>
            • Complete both morning and evening check-ins for the most
            comprehensive insights
          </p>
          <p>
            • Use the search feature in History to find specific entries or
            themes
          </p>
          <p>
            • Review your trends weekly to identify patterns and opportunities
            for improvement
          </p>
          <p>
            • Pay attention to the AI insights - they can help you optimize your
            daily routine
          </p>
        </div>
      </div>
    </div>
  );
}
