"use client";

import { DayIndicator } from "@/components/atoms/day-indicator";
import { ProgressIndicator } from "@/components/atoms/progress-indicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeeklyProgressProps {
  weeklyProgress: number;
}

export function WeeklyProgress({ weeklyProgress }: WeeklyProgressProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Your productivity journey this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ProgressIndicator
            label="Weekly Goal Progress"
            value={weeklyProgress}
          />
          <div className="grid grid-cols-7 gap-2 mt-4">
            {days.map((day, index) => (
              <DayIndicator key={day} day={day} completed={index < 5} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
