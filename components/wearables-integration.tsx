"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Battery,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Moon,
  Target,
  TrendingUp,
  Watch,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { useState } from "react";

export function WearablesIntegration() {
  const [connectedDevices, _setConnectedDevices] = useState([
    {
      id: 1,
      name: "Apple Watch Series 9",
      type: "smartwatch",
      connected: true,
      battery: 78,
      lastSync: "2 min ago",
    },
    {
      id: 2,
      name: "Oura Ring Gen 3",
      type: "ring",
      connected: true,
      battery: 45,
      lastSync: "5 min ago",
    },
    {
      id: 3,
      name: "Fitbit Charge 6",
      type: "fitness",
      connected: false,
      battery: 0,
      lastSync: "2 hours ago",
    },
  ]);

  // Mock biometric data
  const sleepData = {
    lastNight: {
      duration: 7.2,
      quality: 82,
      deepSleep: 1.8,
      remSleep: 1.4,
      lightSleep: 4.0,
      bedtime: "23:15",
      wakeTime: "06:27",
      efficiency: 89,
    },
    weeklyAverage: {
      duration: 7.4,
      quality: 79,
      trend: "+3%",
    },
  };

  const recoveryData = {
    current: {
      score: 85,
      status: "optimal",
      hrv: 42,
      restingHR: 58,
      trend: "improving",
    },
    weekly: [78, 82, 79, 85, 88, 84, 85],
  };

  const stressData = {
    current: {
      level: 2.8,
      status: "low",
      trend: "stable",
    },
    daily: [
      { time: "6:00", stress: 1.2, activity: "sleep" },
      { time: "9:00", stress: 3.5, activity: "commute" },
      { time: "12:00", stress: 4.2, activity: "meeting" },
      { time: "15:00", stress: 2.1, activity: "focus work" },
      { time: "18:00", stress: 3.8, activity: "workout" },
      { time: "21:00", stress: 1.8, activity: "relaxation" },
    ],
  };

  const productivityInsights = [
    {
      metric: "Task Completion",
      correlation: "+23%",
      insight: "Higher on days with 8+ hours sleep",
      recommendation: "Maintain consistent bedtime of 11 PM",
      icon: Target,
      color: "text-green-600",
    },
    {
      metric: "Focus Duration",
      correlation: "+18%",
      insight: "Peaks when HRV is above 40ms",
      recommendation: "Schedule deep work during high HRV periods",
      icon: Brain,
      color: "text-blue-600",
    },
    {
      metric: "Energy Levels",
      correlation: "-15%",
      insight: "Decreases with stress levels above 4.0",
      recommendation: "Take breaks when stress indicators rise",
      icon: Battery,
      color: "text-orange-600",
    },
    {
      metric: "Meeting Performance",
      correlation: "+12%",
      insight: "Better when recovery score is 80+",
      recommendation: "Schedule important meetings on high recovery days",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const schedulingRecommendations = [
    {
      time: "9:00 AM - 11:00 AM",
      activity: "Deep Work",
      reason: "Peak HRV and low stress levels",
      confidence: 92,
      status: "optimal",
    },
    {
      time: "2:00 PM - 3:00 PM",
      activity: "Light Tasks",
      reason: "Natural energy dip, elevated stress",
      confidence: 78,
      status: "caution",
    },
    {
      time: "4:00 PM - 5:00 PM",
      activity: "Meetings",
      reason: "Good recovery, moderate stress",
      confidence: 85,
      status: "good",
    },
    {
      time: "6:00 PM - 7:00 PM",
      activity: "Exercise",
      reason: "Stress release window, good energy",
      confidence: 88,
      status: "optimal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "caution":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const formatSleepStage = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div>
      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Watch className="w-5 h-5" />
            Connected Devices
          </CardTitle>
          <CardDescription>
            Manage your wearable devices and sync status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedDevices.map((device) => (
              <div
                key={device.id}
                className={`p-4 rounded-lg border ${
                  device.connected
                    ? "bg-green-50 border-green-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {device.type === "smartwatch" && (
                      <Watch className="w-4 h-4" />
                    )}
                    {device.type === "ring" && (
                      <div className="w-4 h-4 rounded-full bg-slate-400" />
                    )}
                    {device.type === "fitness" && (
                      <Activity className="w-4 h-4" />
                    )}
                    <span className="font-medium text-sm">{device.name}</span>
                  </div>
                  {device.connected ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Battery</span>
                    <span>{device.battery}%</span>
                  </div>
                  <Progress value={device.battery} className="h-1" />
                  <p className="text-xs text-slate-600">
                    Last sync: {device.lastSync}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sleep" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="stress">Stress</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="sleep" className="space-y-6">
          {/* Sleep Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Duration
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.lastNight.duration}h
                    </p>
                  </div>
                  <Moon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {sleepData.lastNight.bedtime} - {sleepData.lastNight.wakeTime}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Quality
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.lastNight.quality}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <Progress
                  value={sleepData.lastNight.quality}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Efficiency
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.lastNight.efficiency}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Excellent</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Weekly Avg
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.weeklyAverage.duration}h
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">
                  {sleepData.weeklyAverage.trend} vs last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sleep Stages */}
          <Card>
            <CardHeader>
              <CardTitle>Sleep Stages Breakdown</CardTitle>
              <CardDescription>Last night's sleep composition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-indigo-500 rounded" />
                    <span className="font-medium">Deep Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {formatSleepStage(sleepData.lastNight.deepSleep)}
                    </span>
                    <p className="text-xs text-slate-600">25% of total</p>
                  </div>
                </div>
                <Progress value={25} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span className="font-medium">REM Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {formatSleepStage(sleepData.lastNight.remSleep)}
                    </span>
                    <p className="text-xs text-slate-600">19% of total</p>
                  </div>
                </div>
                <Progress value={19} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-sky-300 rounded" />
                    <span className="font-medium">Light Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {formatSleepStage(sleepData.lastNight.lightSleep)}
                    </span>
                    <p className="text-xs text-slate-600">56% of total</p>
                  </div>
                </div>
                <Progress value={56} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Sleep Recommendations */}
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Sleep Insight:</strong> Your deep sleep percentage is
              optimal (25%). Maintain your current bedtime routine for continued
              recovery benefits.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-6">
          {/* Recovery Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Recovery Score
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {recoveryData.current.score}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={getStatusColor(recoveryData.current.status)}
                    >
                      {recoveryData.current.status}
                    </Badge>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        {recoveryData.current.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <Progress value={recoveryData.current.score} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">HRV</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {recoveryData.current.hrv}ms
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Above baseline</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Resting HR
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {recoveryData.current.restingHR}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-slate-600 mt-2">Normal range</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Recovery Trend */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Recovery Trend</CardTitle>
              <CardDescription>
                Track your recovery patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recoveryData.weekly.map((score, index) => {
                  const days = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ];
                  const isToday = index === 6;
                  return (
                    <div key={days[index]} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-slate-600">
                        {days[index]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recovery Score</span>
                          <span
                            className={
                              isToday
                                ? "font-bold text-slate-900"
                                : "text-slate-600"
                            }
                          >
                            {score}
                          </span>
                        </div>
                        <Progress
                          value={score}
                          className={`h-2 ${isToday ? "ring-2 ring-blue-200" : ""}`}
                        />
                      </div>
                      <div className="w-16 text-right">
                        <Badge
                          variant="outline"
                          className={
                            score >= 80
                              ? "text-green-700 border-green-200"
                              : score >= 60
                                ? "text-yellow-700 border-yellow-200"
                                : "text-red-700 border-red-200"
                          }
                        >
                          {score >= 80
                            ? "Optimal"
                            : score >= 60
                              ? "Good"
                              : "Low"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Heart className="h-4 w-4" />
            <AlertDescription>
              <strong>Recovery Insight:</strong> Your HRV is 15% above your
              baseline, indicating excellent recovery. This is an ideal day for
              challenging workouts or important tasks.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="stress" className="space-y-6">
          {/* Current Stress Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Current Stress Level
              </CardTitle>
              <CardDescription>
                Real-time stress monitoring based on HRV and heart rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-4xl font-bold text-slate-900">
                    {stressData.current.level}
                  </p>
                  <p className="text-sm text-slate-600">out of 10</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(stressData.current.status)}>
                    {stressData.current.status} stress
                  </Badge>
                  <p className="text-xs text-slate-600 mt-1">
                    Trend: {stressData.current.trend}
                  </p>
                </div>
              </div>
              <Progress value={stressData.current.level * 10} className="h-3" />
              <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>Relaxed (0-2)</span>
                <span>Moderate (3-6)</span>
                <span>High (7-10)</span>
              </div>
            </CardContent>
          </Card>

          {/* Daily Stress Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Stress Pattern</CardTitle>
              <CardDescription>
                How your stress levels change throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stressData.daily.map((entry) => (
                  <div key={entry.time} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-slate-600">
                      {entry.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{entry.activity}</span>
                        <span className="font-medium">{entry.stress}</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            entry.stress <= 2
                              ? "bg-green-500"
                              : entry.stress <= 4
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${(entry.stress / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <Badge
                        variant="outline"
                        className={
                          entry.stress <= 2
                            ? "text-green-700 border-green-200"
                            : entry.stress <= 4
                              ? "text-yellow-700 border-yellow-200"
                              : "text-red-700 border-red-200"
                        }
                      >
                        {entry.stress <= 2
                          ? "Low"
                          : entry.stress <= 4
                            ? "Moderate"
                            : "High"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stress Management Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Good News:</strong> Your stress levels are well-managed
                today. Your afternoon focus session shows optimal stress for
                productivity.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Tip:</strong> Consider a 5-minute breathing exercise
                before your 3 PM meeting to maintain low stress levels.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Productivity-Biometrics Correlations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Productivity-Biometrics Insights
              </CardTitle>
              <CardDescription>
                How your physical metrics impact your performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productivityInsights.map((insight) => (
                  <div
                    key={insight.title}
                    className="p-4 bg-slate-50 rounded-lg border"
                  >
                    <div className="flex items-start gap-3">
                      <insight.icon
                        className={`w-6 h-6 ${insight.color} mt-1`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">
                            {insight.metric}
                          </h4>
                          <Badge className="bg-green-100 text-green-800">
                            {insight.correlation}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {insight.insight}
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          💡 {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI-Powered Scheduling Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Scheduling Recommendations
              </CardTitle>
              <CardDescription>
                Optimize your schedule based on your current biometric readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedulingRecommendations.map((rec) => (
                  <div
                    key={rec.time}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                        <p className="text-sm font-medium text-slate-900">
                          {rec.time}
                        </p>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {rec.activity}
                        </h4>
                        <p className="text-sm text-slate-600">{rec.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(rec.status)}>
                        {rec.status}
                      </Badge>
                      <p className="text-xs text-slate-600 mt-1">
                        {rec.confidence}% confidence
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Biometric Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Biometric Summary</CardTitle>
              <CardDescription>
                Key trends and patterns from this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <Moon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-900 mb-1">
                    Sleep Quality
                  </h4>
                  <p className="text-2xl font-bold text-green-900">82%</p>
                  <p className="text-sm text-green-700">+5% vs last week</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-900 mb-1">Recovery</h4>
                  <p className="text-2xl font-bold text-blue-900">84</p>
                  <p className="text-sm text-blue-700">Consistently high</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900 mb-1">
                    Stress Management
                  </h4>
                  <p className="text-2xl font-bold text-purple-900">2.8</p>
                  <p className="text-sm text-purple-700">Well controlled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              <strong>AI Recommendation:</strong> Based on your biometric
              patterns, schedule your most challenging tasks between 9-11 AM
              when your HRV peaks and stress is lowest. Consider a 20-minute
              walk at 2 PM to maintain afternoon productivity.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
