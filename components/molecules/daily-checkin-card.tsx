"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyCheckin } from "@/components/daily-checkin"
import { Calendar } from "lucide-react"

export function DailyCheckinCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Check-ins
        </CardTitle>
        <CardDescription>Track your daily goals and reflections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DailyCheckin type="morning" />
      </CardContent>
    </Card>
  )
}
