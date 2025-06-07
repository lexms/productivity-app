"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Target, TrendingUp, BarChart3, Download, X, Filter } from "lucide-react"

interface AnalyticsDetailProps {
  metricType: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnalyticsDetail({ metricType, open, onOpenChange }: AnalyticsDetailProps) {
  const [timeRange, setTimeRange] = useState("week")

  // Mock data for different metrics
  const productivityData = {
    week: {
      average: 87,
      trend: "+5%",
      data: [
        { day: "Mon", value: 92 },
        { day: "Tue", value: 95 },
        { day: "Wed", value: 88 },
        { day: "Thu", value: 90 },
        { day: "Fri", value: 82 },
        { day: "Sat", value: 78 },
        { day: "Sun", value: 75 },
      ],
      insights: [
        "Your productivity peaks on Tuesday mornings",
        "You're 23% more productive after taking breaks",
        "Meetings after 3 PM reduce your productivity by 15%",
        "Deep work sessions average 87 minutes in length",
      ],
    },
    month: {
      average: 84,
      trend: "+3%",
      data: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        value: Math.floor(Math.random() * 20) + 75,
      })),
      insights: [
        "Your monthly productivity is trending upward",
        "Week 2 showed the highest productivity this month",
        "You completed 45 tasks this month (12% more than last month)",
        "Your average focus time increased by 18 minutes per day",
      ],
    },
  }

  const focusData = {
    week: {
      average: 4.8,
      trend: "+0.5h",
      data: [
        { day: "Mon", value: 5.2 },
        { day: "Tue", value: 6.1 },
        { day: "Wed", value: 4.5 },
        { day: "Thu", value: 5.0 },
        { day: "Fri", value: 3.8 },
        { day: "Sat", value: 2.5 },
        { day: "Sun", value: 1.5 },
      ],
      insights: [
        "Your longest focus sessions occur between 9-11 AM",
        "You average 3.2 deep work sessions per day",
        "Focus time decreases by 35% on days with 4+ meetings",
        "Your focus improves after morning exercise",
      ],
    },
    month: {
      average: 4.5,
      trend: "+0.3h",
      data: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        value: Math.floor(Math.random() * 3) + 3,
      })),
      insights: [
        "Your monthly focus time is trending upward",
        "You had 18 days with 5+ hours of focus time",
        "Focus time is 28% higher on days with no meetings",
        "Morning focus sessions are 32% more effective than afternoon ones",
      ],
    },
  }

  const taskData = {
    week: {
      completed: 42,
      total: 50,
      trend: "+8",
      data: [
        { day: "Mon", completed: 8, total: 10 },
        { day: "Tue", completed: 9, total: 9 },
        { day: "Wed", completed: 7, total: 8 },
        { day: "Thu", completed: 8, total: 10 },
        { day: "Fri", completed: 6, total: 8 },
        { day: "Sat", completed: 2, total: 3 },
        { day: "Sun", completed: 2, total: 2 },
      ],
      insights: [
        "You complete 84% of your scheduled tasks",
        "Tuesday has your highest task completion rate",
        "You're most effective with 7-9 tasks per day",
        "Morning tasks are completed 23% faster than afternoon ones",
      ],
    },
    month: {
      completed: 165,
      total: 195,
      trend: "+22",
      data: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        completed: Math.floor(Math.random() * 10) + 35,
        total: Math.floor(Math.random() * 10) + 45,
      })),
      insights: [
        "You completed 165 tasks this month (85% completion rate)",
        "High priority tasks have a 92% completion rate",
        "Your task efficiency improved by 12% this month",
        "You're most productive with tasks between 30-45 minutes",
      ],
    },
  }

  const getMetricData = () => {
    switch (metricType) {
      case "productivity":
        return productivityData[timeRange as keyof typeof productivityData]
      case "focus":
        return focusData[timeRange as keyof typeof focusData]
      case "tasks":
        return taskData[timeRange as keyof typeof taskData]
      default:
        return productivityData[timeRange as keyof typeof productivityData]
    }
  }

  const getMetricTitle = () => {
    switch (metricType) {
      case "productivity":
        return "Productivity Analysis"
      case "focus":
        return "Focus Time Analysis"
      case "tasks":
        return "Task Completion Analysis"
      default:
        return "Metric Analysis"
    }
  }

  const getMetricIcon = () => {
    switch (metricType) {
      case "productivity":
        return <Target className="w-5 h-5" />
      case "focus":
        return <Clock className="w-5 h-5" />
      case "tasks":
        return <BarChart3 className="w-5 h-5" />
      default:
        return <BarChart3 className="w-5 h-5" />
    }
  }

  const getMetricUnit = () => {
    switch (metricType) {
      case "productivity":
        return "%"
      case "focus":
        return "h"
      case "tasks":
        return ""
      default:
        return ""
    }
  }

  const data = getMetricData()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2">
              {getMetricIcon()}
              {getMetricTitle()}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>Detailed analysis and insights</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-2 py-1">
                <Calendar className="w-3 h-3 mr-1" />
                {timeRange === "week" ? "Last 7 days" : "Last 30 days"}
              </Badge>
              <Badge variant="outline" className="px-2 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {data.trend}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="w-3 h-3 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <div className="mb-4 mt-6 flex justify-end">
              <div className="flex items-center gap-2 bg-slate-100 rounded-md p-1">
                <Button
                  variant={timeRange === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("week")}
                  className="h-8"
                >
                  Week
                </Button>
                <Button
                  variant={timeRange === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("month")}
                  className="h-8"
                >
                  Month
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-600">Average {metricType}</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold">
                        {metricType === "tasks" ? `${data.completed}/${data.total}` : data.average}
                        {getMetricUnit()}
                      </p>
                      <Badge className="mb-1 bg-green-100 text-green-800">{data.trend}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {metricType === "productivity" && (
                      <>
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm">Productivity</span>
                      </>
                    )}
                    {metricType === "focus" && (
                      <>
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm">Focus Hours</span>
                      </>
                    )}
                    {metricType === "tasks" && (
                      <>
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm">Completed</span>
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                        <span className="text-sm">Total</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {data.data.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.day || item.week}</span>
                        <span>
                          {metricType === "tasks"
                            ? `${item.completed}/${item.total}`
                            : `${item.value}${getMetricUnit()}`}
                        </span>
                      </div>
                      {metricType === "tasks" ? (
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(item.completed / item.total) * 100}%` }}
                          />
                        </div>
                      ) : (
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              metricType === "productivity" ? "bg-green-500" : "bg-blue-500"
                            } rounded-full`}
                            style={{
                              width: `${
                                metricType === "productivity"
                                  ? item.value
                                  : (item.value / (metricType === "focus" ? 8 : 100)) * 100
                              }%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">Top Performing Day</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {metricType === "tasks"
                          ? `${Math.max(...data.data.map((item) => item.completed))}`
                          : `${Math.max(...data.data.map((item) => item.value))}${getMetricUnit()}`}
                      </p>
                      <p className="text-sm text-slate-600">
                        {data.data.reduce((max, item) => {
                          const value = metricType === "tasks" ? item.completed : item.value
                          return value > (metricType === "tasks" ? max.completed : max.value) ? item : max
                        }, data.data[0]).day || "Week 2"}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        metricType === "productivity"
                          ? "bg-green-100"
                          : metricType === "focus"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                      }`}
                    >
                      <TrendingUp
                        className={`w-6 h-6 ${
                          metricType === "productivity"
                            ? "text-green-600"
                            : metricType === "focus"
                              ? "text-blue-600"
                              : "text-purple-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">
                    {metricType === "productivity"
                      ? "Productivity Score"
                      : metricType === "focus"
                        ? "Focus Efficiency"
                        : "Task Efficiency"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-medium">
                        {metricType === "tasks" ? "85%" : metricType === "focus" ? "78%" : "82%"}
                      </span>
                    </div>
                    <Progress value={metricType === "tasks" ? 85 : metricType === "focus" ? 78 : 82} className="h-2" />
                    <p className="text-xs text-slate-600">
                      {metricType === "productivity"
                        ? "Based on task completion and focus time"
                        : metricType === "focus"
                          ? "Based on deep work quality and duration"
                          : "Based on estimated vs. actual completion time"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-sm font-semibold mb-4">
                  {metricType === "productivity"
                    ? "Productivity by Time of Day"
                    : metricType === "focus"
                      ? "Focus Time Distribution"
                      : "Task Completion by Category"}
                </h3>

                <div className="space-y-4">
                  {metricType === "productivity" && (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Morning (8 AM - 12 PM)</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Afternoon (12 PM - 5 PM)</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Evening (5 PM - 9 PM)</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </>
                  )}

                  {metricType === "focus" && (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Deep Work</span>
                        <span>3.2h</span>
                      </div>
                      <Progress value={(3.2 / 8) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Shallow Work</span>
                        <span>2.8h</span>
                      </div>
                      <Progress value={(2.8 / 8) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Meetings</span>
                        <span>1.5h</span>
                      </div>
                      <Progress value={(1.5 / 8) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Breaks</span>
                        <span>0.5h</span>
                      </div>
                      <Progress value={(0.5 / 8) * 100} className="h-2" />
                    </>
                  )}

                  {metricType === "tasks" && (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Work</span>
                        <span>28/32</span>
                      </div>
                      <Progress value={(28 / 32) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Personal</span>
                        <span>8/10</span>
                      </div>
                      <Progress value={(8 / 10) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Health</span>
                        <span>4/5</span>
                      </div>
                      <Progress value={(4 / 5) * 100} className="h-2" />

                      <div className="flex justify-between text-sm mb-1">
                        <span>Learning</span>
                        <span>2/3</span>
                      </div>
                      <Progress value={(2 / 3) * 100} className="h-2" />
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-sm font-semibold mb-4">
                  {metricType === "productivity"
                    ? "Productivity Factors"
                    : metricType === "focus"
                      ? "Focus Enhancers & Detractors"
                      : "Task Completion Factors"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {metricType === "productivity"
                          ? "Morning deep work sessions"
                          : metricType === "focus"
                            ? "Pomodoro technique"
                            : "Breaking tasks into smaller steps"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {metricType === "productivity"
                          ? "Increases productivity by 32%"
                          : metricType === "focus"
                            ? "Increases focus duration by 28%"
                            : "Improves completion rate by 35%"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {metricType === "productivity"
                          ? "Regular breaks"
                          : metricType === "focus"
                            ? "Noise-cancelling headphones"
                            : "Setting clear deadlines"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {metricType === "productivity"
                          ? "Increases productivity by 23%"
                          : metricType === "focus"
                            ? "Increases focus quality by 18%"
                            : "Improves completion rate by 27%"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {metricType === "productivity"
                          ? "Back-to-back meetings"
                          : metricType === "focus"
                            ? "Notification interruptions"
                            : "Unclear task requirements"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {metricType === "productivity"
                          ? "Decreases productivity by 28%"
                          : metricType === "focus"
                            ? "Reduces focus time by 23%"
                            : "Reduces completion rate by 32%"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {metricType === "productivity"
                          ? "Multitasking"
                          : metricType === "focus"
                            ? "Open office distractions"
                            : "Overestimating capacity"}
                      </p>
                      <p className="text-xs text-slate-600">
                        {metricType === "productivity"
                          ? "Decreases productivity by 40%"
                          : metricType === "focus"
                            ? "Reduces focus quality by 35%"
                            : "Reduces completion rate by 25%"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-sm font-semibold mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {data.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            metricType === "productivity"
                              ? "bg-green-100"
                              : metricType === "focus"
                                ? "bg-blue-100"
                                : "bg-purple-100"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium ${
                              metricType === "productivity"
                                ? "text-green-700"
                                : metricType === "focus"
                                  ? "text-blue-700"
                                  : "text-purple-700"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-sm font-semibold mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {metricType === "productivity" && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Schedule deep work in the morning</p>
                          <p className="text-xs text-slate-600">Your productivity is 32% higher between 9-11 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Implement no-meeting Tuesdays</p>
                          <p className="text-xs text-slate-600">
                            Tuesday is your most productive day - protect it for deep work
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Take regular breaks</p>
                          <p className="text-xs text-slate-600">
                            5-minute breaks every 25 minutes increase your productivity
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {metricType === "focus" && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Use the Pomodoro technique</p>
                          <p className="text-xs text-slate-600">
                            25-minute focus sessions with 5-minute breaks work best for you
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Minimize notifications</p>
                          <p className="text-xs text-slate-600">
                            Turn off email and chat notifications during focus sessions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Use noise-cancelling headphones</p>
                          <p className="text-xs text-slate-600">Reduce ambient noise to improve focus quality</p>
                        </div>
                      </div>
                    </>
                  )}

                  {metricType === "tasks" && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Break down complex tasks</p>
                          <p className="text-xs text-slate-600">
                            Tasks broken into smaller steps have a 35% higher completion rate
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Limit daily tasks to 7-9</p>
                          <p className="text-xs text-slate-600">
                            You're most effective with this number of daily tasks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Schedule high-priority tasks in the morning</p>
                          <p className="text-xs text-slate-600">Morning tasks have a 23% higher completion rate</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
