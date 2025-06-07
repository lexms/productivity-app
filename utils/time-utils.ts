export type TimeOfDay = "morning" | "midday" | "afternoon" | "evening"

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) return "morning"
  if (hour >= 12 && hour < 14) return "midday"
  if (hour >= 14 && hour < 18) return "afternoon"
  return "evening"
}

export function getTimeOfDayMessage(timeOfDay: TimeOfDay): string {
  const messages = {
    morning: "Start your day with intention",
    midday: "How's your energy holding up?",
    afternoon: "Time for a productivity check",
    evening: "Reflect on your day's achievements",
  }
  return messages[timeOfDay]
}

export function getOptimalActivities(timeOfDay: TimeOfDay): string[] {
  const activities = {
    morning: ["Deep work", "Strategic planning", "Learning", "Creative tasks"],
    midday: ["Quick meetings", "Admin tasks", "Email", "Light planning"],
    afternoon: ["Collaborative work", "Meetings", "Implementation", "Reviews"],
    evening: ["Reflection", "Planning tomorrow", "Wrap-up tasks", "Documentation"],
  }
  return activities[timeOfDay]
}

export function shouldShowCheckin(timeOfDay: TimeOfDay, lastCheckin?: string): boolean {
  if (!lastCheckin) return true

  const lastCheckinDate = new Date(lastCheckin)
  const now = new Date()
  const hoursSinceLastCheckin = (now.getTime() - lastCheckinDate.getTime()) / (1000 * 60 * 60)

  // Show check-in if it's been more than 4 hours since last one
  return hoursSinceLastCheckin >= 4
}
