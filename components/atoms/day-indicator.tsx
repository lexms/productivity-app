"use client"

interface DayIndicatorProps {
  day: string
  completed: boolean
}

export function DayIndicator({ day, completed }: DayIndicatorProps) {
  return (
    <div className="text-center">
      <div className="text-xs text-slate-600 mb-1">{day}</div>
      <div
        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-medium ${
          completed ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
        }`}
      >
        {completed ? "✓" : "○"}
      </div>
    </div>
  )
}
