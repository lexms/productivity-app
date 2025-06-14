import { MeetingManagement } from "@/components/meeting-management";
import { PageHeader } from "@/components/molecules/page-header";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Meeting Management"
          description="Analyze and optimize your meetings"
        />
      </div>
      <MeetingManagement />
    </div>
  );
}
