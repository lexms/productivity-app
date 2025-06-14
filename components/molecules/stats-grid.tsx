"use client";

import { StatCard } from "@/components/atoms/stat-card";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

interface StatsGridProps {
  tasksToday: number;
  completedToday: number;
  completionRate: number;
  focusTime: number;
  weeklyProgress: number;
}

export function StatsGrid({
  tasksToday,
  completedToday,
  completionRate,
  focusTime,
  weeklyProgress,
}: StatsGridProps) {
  const stats = [
    {
      label: "Tasks Today",
      value: `${completedToday}/${tasksToday}`,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Focus Time",
      value: `${focusTime}h`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Weekly Progress",
      value: `${weeklyProgress}%`,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
