import { GoogleCalendarIntegration } from "@/components/google-calendar-integration";
import { ScheduleOptimization } from "@/components/schedule-optimization";
import { PageHeader } from "@/components/molecules/page-header";

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Schedule Optimization"
        description="Optimize your schedule based on tasks, meetings, and biometric data"
      />
      <div className="flex flex-col gap-6">
        <GoogleCalendarIntegration />
        <ScheduleOptimization />
      </div>
    </div>
  );
}
