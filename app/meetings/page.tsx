import { MeetingManagement } from "@/components/meeting-management";

export default function MeetingsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meeting Management</h1>
        <p className="text-gray-600">Analyze and optimize your meetings</p>
      </div>
      <MeetingManagement />
    </div>
  );
}
