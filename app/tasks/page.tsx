import { TaskManager } from "@/components/task-manager";

export default function TasksPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
        <p className="text-gray-600">Organize and track your daily tasks</p>
      </div>
      <TaskManager />
    </div>
  );
}
