"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  BarChart3,
  Calendar,
  Clock,
  Heart,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

export function Analytics() {
  // Mock analytics data
  const weeklyData = {
    tasksCompleted: 42,
    totalTasks: 50,
    focusTime: 28.5,
    averageEfficiency: 87,
    streakDays: 12,
    pointsEarned: 1250,
  };

  const dailyStats = [
    { day: "Mon", tasks: 8, focus: 6.5, efficiency: 92 },
    { day: "Tue", tasks: 6, focus: 4.2, efficiency: 85 },
    { day: "Wed", tasks: 7, focus: 5.8, efficiency: 89 },
    { day: "Thu", tasks: 9, focus: 7.1, efficiency: 94 },
    { day: "Fri", tasks: 5, focus: 3.5, efficiency: 78 },
    { day: "Sat", tasks: 4, focus: 2.8, efficiency: 82 },
    { day: "Sun", tasks: 3, focus: 2.1, efficiency: 75 },
  ];

  const categories = [
    { name: "Work", completed: 18, total: 22, color: "bg-blue-500" },
    { name: "Personal", completed: 12, total: 15, color: "bg-green-500" },
    { name: "Health", completed: 8, total: 9, color: "bg-purple-500" },
    { name: "Learning", completed: 4, total: 4, color: "bg-orange-500" },
  ];

  const biometricInsights = [
    { metric: "Sleep Quality", value: 8.2, trend: "+5%", icon: Heart },
    { metric: "Recovery Score", value: 85, trend: "+12%", icon: Activity },
    { metric: "Stress Level", value: 3.1, trend: "-8%", icon: Zap },
    { metric: "HRV", value: 42, trend: "+3%", icon: BarChart3 },
  ];

  return (
    <div>
      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Tasks Completed
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {weeklyData.tasksCompleted}/{weeklyData.totalTasks}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <Progress
              value={(weeklyData.tasksCompleted / weeklyData.totalTasks) * 100}
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Focus Time</p>
                <p className="text-2xl font-bold text-slate-900">
                  {weeklyData.focusTime}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600 mt-2">+2.3h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Efficiency</p>
                <p className="text-2xl font-bold text-slate-900">
                  {weeklyData.averageEfficiency}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">↗ +5% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Activity Heatmap
          </CardTitle>
          <CardDescription>
            Your productivity patterns throughout the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {dailyStats.map((day, _index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-slate-600">
                  {day.day}
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span>Tasks</span>
                      <span>{day.tasks}</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(day.tasks / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span>Focus</span>
                      <span>{day.focus}h</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${(day.focus / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span>Efficiency</span>
                      <span>{day.efficiency}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${day.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Task Categories</CardTitle>
          <CardDescription>Performance breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">
                    {category.completed}/{category.total}
                  </span>
                  <div className="w-24">
                    <Progress
                      value={(category.completed / category.total) * 100}
                    />
                  </div>
                  <Badge variant="outline">
                    {Math.round((category.completed / category.total) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Biometric Insights
          </CardTitle>
          <CardDescription>
            How your physical metrics correlate with productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {biometricInsights.map((insight) => (
              <div key={insight.metric} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <insight.icon className="w-5 h-5 text-slate-600" />
                  <Badge
                    variant="outline"
                    className={
                      insight.trend.startsWith("+")
                        ? "text-green-700 border-green-200"
                        : "text-red-700 border-red-200"
                    }
                  >
                    {insight.trend}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{insight.metric}</p>
                <p className="text-xl font-bold text-slate-900">
                  {insight.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                🎯 Productivity Peak
              </h4>
              <p className="text-sm text-blue-800">
                Your highest productivity occurs between 9-11 AM when your focus
                time averages 2.1 hours per session. Consider scheduling your
                most important tasks during this window.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">
                💪 Recovery Correlation
              </h4>
              <p className="text-sm text-green-800">
                Days with 8+ hours of sleep show 23% higher task completion
                rates. Your current sleep average is 7.2 hours.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">
                📈 Improvement Opportunity
              </h4>
              <p className="text-sm text-purple-800">
                Friday efficiency drops to 78%. Consider lighter workloads or
                different task types on Fridays.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
