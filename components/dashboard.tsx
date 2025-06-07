"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/organisms/dashboard-overview"
import { SmartCheckinCard } from "@/components/molecules/smart-checkin-card"
import { ScheduleIntegration } from "@/components/molecules/schedule-integration"
import { TaskManager } from "./task-manager"
import { Analytics } from "./analytics"
import { Leaderboard } from "./leaderboard"
import { WearablesIntegration } from "./wearables-integration"
import { MeetingManagement } from "./meeting-management"
import { ScheduleOptimization } from "./schedule-optimization"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 lg:w-fit lg:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="wearables">Wearables</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <DashboardOverview userData={userData} />

              {/* Enhanced Check-in and Schedule Integration */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SmartCheckinCard />
                <ScheduleIntegration />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManager />
          </TabsContent>

          <TabsContent value="meetings">
            <MeetingManagement />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleOptimization />
          </TabsContent>

          <TabsContent value="wearables">
            <WearablesIntegration />
          </TabsContent>

          <TabsContent value="reports">
            <Analytics />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
