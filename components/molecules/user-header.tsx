"use client"

import { UserBadge } from "@/components/atoms/user-badge"
import { Award, Zap } from "lucide-react"

interface UserHeaderProps {
  name: string
  points: number
  streak: number
}

export function UserHeader({ name, points, streak }: UserHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Good morning, {name}! 👋</h1>
        <p className="text-slate-600 mt-1">Ready to make today productive?</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <UserBadge icon={Award} value={`${points} points`} variant="secondary" />
        <UserBadge icon={Zap} value={`${streak} day streak`} variant="outline" />
      </div>
    </div>
  )
}
