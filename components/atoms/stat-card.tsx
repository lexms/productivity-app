"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-slate-600 truncate">{label}</p>
            <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${color} flex-shrink-0 ml-2`} />
        </div>
      </CardContent>
    </Card>
  )
}
