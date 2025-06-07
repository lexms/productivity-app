"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  label: string
  value: number
  showPercentage?: boolean
}

export function ProgressIndicator({ label, value, showPercentage = true }: ProgressIndicatorProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        {showPercentage && <span className="font-medium">{value}%</span>}
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}
