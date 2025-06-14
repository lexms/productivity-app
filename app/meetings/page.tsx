import { MeetingManagement } from "@/components/meeting-management";
import { PageHeader } from "@/components/molecules/page-header";

export default function MeetingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Meeting Management"
        description="Analyze and optimize your meetings"
      />
      <MeetingManagement />
    </div>
  );
}
