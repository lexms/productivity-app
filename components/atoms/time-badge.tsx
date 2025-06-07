import { Badge } from "@/components/ui/badge"
import { Sun, Sunrise, Sunset } from "lucide-react"

interface TimeBadgeProps {
  timeOfDay: "morning" | "midday" | "afternoon" | "evening"
}

export function TimeBadge({ timeOfDay }: TimeBadgeProps) {
  const timeConfig = {
    morning: { icon: Sunrise, color: "bg-yellow-100 text-yellow-800", label: "Morning" },
    midday: { icon: Sun, color: "bg-orange-100 text-orange-800", label: "Midday" },
    afternoon: { icon: Sun, color: "bg-blue-100 text-blue-800", label: "Afternoon" },
    evening: { icon: Sunset, color: "bg-purple-100 text-purple-800", label: "Evening" },
  }

  const config = timeConfig[timeOfDay]
  const Icon = config.icon

  return (
    <Badge className={config.color}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
