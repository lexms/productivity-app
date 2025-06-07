import { ScheduleOptimization } from "@/components/schedule-optimization"

export default function SchedulePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Optimization</h1>
        <p className="text-gray-600">Optimize your schedule based on tasks, meetings, and biometric data</p>
      </div>
      <ScheduleOptimization />
    </div>
  )
}
