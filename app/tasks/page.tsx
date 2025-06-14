import { TaskManager } from "@/components/task-manager";
import { PageHeader } from "@/components/molecules/page-header";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Task Management"
          description="Organize and track your daily tasks"
        />
      </div>
      <TaskManager />
    </div>
  );
}
