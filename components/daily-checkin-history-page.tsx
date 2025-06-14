"use client";

import { DailyCheckinHistory } from "@/components/daily-checkin-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import type { CheckinData } from "./daily-checkin-history";

// Sample data for demonstration
const generateSampleData = () => {
  const data = [];
  const now = new Date();

  // Generate 30 days of sample data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Randomize whether there are morning/evening check-ins
    const hasMorning = Math.random() > 0.3;
    const hasEvening = Math.random() > 0.4;

    if (hasMorning) {
      data.push({
        id: `morning-${i}`,
        energy: [Math.floor(Math.random() * 4) + 6], // 6-10 range for morning energy
        mood: [Math.floor(Math.random() * 4) + 6], // 6-10 range for morning mood
        focus: [Math.floor(Math.random() * 4) + 5], // 5-9 range for morning focus
        goals: [
          "Complete project proposal and send to team",
          "Review quarterly reports and prepare presentation",
          "Attend client meeting and finalize contract details",
          "Work on new feature development for mobile app",
          "Organize team building event for next week",
        ][Math.floor(Math.random() * 5)],
        priorities: [
          "1. Project deadline preparation\n2. Client calls\n3. Team sync meeting",
          "1. Code review and testing\n2. Documentation updates\n3. Bug fixes",
          "1. Strategic planning session\n2. Market research\n3. Competitor analysis",
        ][Math.floor(Math.random() * 3)],
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
          "Successfully completed the client presentation and got positive feedback",
          "Finished implementing the new authentication system",
          "Resolved 5 critical bugs and improved system performance",
          "Led productive team meeting and aligned on project goals",
          "Completed market research and identified new opportunities",
        ][Math.floor(Math.random() * 5)],
        challenges: [
          "Struggled with time management during busy client calls",
          "Had technical issues with the deployment pipeline",
          "Difficulty focusing due to multiple interruptions",
          "Communication challenges with remote team members",
          "Balancing multiple project priorities",
        ][Math.floor(Math.random() * 5)],
        reflections: [
          "Today was productive overall. Need to better manage interruptions.",
          "Feeling good about the progress made on key projects.",
          "Learning to delegate more effectively to the team.",
          "Good collaboration with colleagues on complex problems.",
          "Need to improve work-life balance for better sustainability.",
        ][Math.floor(Math.random() * 5)],
        gratitude: [
          "Grateful for supportive team members and positive client feedback",
          "Thankful for the learning opportunities and growth challenges",
          "Appreciate the flexibility to work effectively from different locations",
          "Grateful for the resources and tools available to do quality work",
        ][Math.floor(Math.random() * 4)],
        tomorrow: [
          "Focus on completing the quarterly review presentation",
          "Start working on the new feature specifications",
          "Schedule one-on-one meetings with team members",
          "Prepare for the upcoming client demo and Q&A session",
        ][Math.floor(Math.random() * 4)],
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

export default function DailyCheckinHistoryPage() {
  const [sampleData] = useState(generateSampleData);

  const handleViewDetail = (checkin: CheckinData) => {
    console.log("Viewing detail for checkin:", checkin);
    // In a real app, this might navigate to a detailed view or open a modal
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Daily Check-in History
        </h1>
        <p className="text-gray-600 text-lg">
          Track your productivity patterns and gain insights from your daily
          reflections
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">History & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="flex flex-col gap-6">
          <DailyCheckinHistory
            checkins={sampleData}
            onViewDetail={handleViewDetail}
          />
        </TabsContent>
      </Tabs>

      {/* Usage Example */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Integration Example</h3>
        <div className="text-sm text-gray-700 flex flex-col gap-2">
          <p>
            <strong>Historical View:</strong> The main component provides
            filtering, search, timeline view, trends analysis, and AI-powered
            insights.
          </p>
          <p>
            <strong>Data Structure:</strong> Compatible with the existing
            CheckinData interface from the daily-checkin-form component.
          </p>
          <p>
            <strong>Customization:</strong> Easy to integrate with your existing
            backend and customize the UI/UX to match your application's design.
          </p>
        </div>
      </div>
    </div>
  );
}
