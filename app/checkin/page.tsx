import { DailyCheckin } from "@/components/daily-checkin"

export default function CheckinPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Daily Check-in</h1>
        <p className="text-gray-600">Track your daily mood, energy, and goals</p>
      </div>
      <DailyCheckin />
    </div>
  )
}
