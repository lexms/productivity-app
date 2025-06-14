"use client";

import { AiCoachCard } from "@/components/molecules/ai-coach-card";
import { DailyCheckinCard } from "@/components/molecules/daily-checkin-card";
import { StatsGrid } from "@/components/molecules/stats-grid";
import { UserHeader } from "@/components/molecules/user-header";
import { WeeklyProgress } from "@/components/molecules/weekly-progress";

export function DashboardOverview() {
  // Mock user data moved inside the component
  const userData = {
    name: "Alex Johnson",
    points: 2847,
    streak: 12,
    completionRate: 87,
    focusTime: 6.5,
    weeklyProgress: 73,
    rank: 3,
    tasksToday: 8,
    completedToday: 6,
  };

  return (
    <div className="flex flex-col gap-6">
      <UserHeader
        name={userData.name}
        points={userData.points}
        streak={userData.streak}
      />

      <StatsGrid
        tasksToday={userData.tasksToday}
        completedToday={userData.completedToday}
        completionRate={userData.completionRate}
        focusTime={userData.focusTime}
        weeklyProgress={userData.weeklyProgress}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <DailyCheckinCard />
        <AiCoachCard />
      </div>

      <WeeklyProgress weeklyProgress={userData.weeklyProgress} />
    </div>
  );
}
