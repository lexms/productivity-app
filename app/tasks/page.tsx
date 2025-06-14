import { TaskManager } from "@/components/task-manager";
import { PageHeader } from "@/components/molecules/page-header";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Task Management"
        description="Organize and track your daily tasks"
      />
      <TaskManager />
    </div>
  );
}
