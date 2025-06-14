"use client";

import { TaskItem } from "@/components/molecules/task-item";
import { TaskDetail } from "@/components/task-detail";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle, Filter } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: string;
  status: "pending" | "in-progress" | "completed" | "skipped";
  estimatedDuration: number;
  actualDuration?: number;
  points: number;
  scheduledDate: string;
  timerActive: boolean;
  timerSeconds: number;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask?: (task: Omit<Task, "id">) => void;
}

export function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onAddTask: _onAddTask,
}: TaskListProps) {
  const [filter, setFilter] = useState("all");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      onUpdateTask({ ...task, status: newStatus });
    }
  };

  const toggleTimer = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      onUpdateTask({ ...task, timerActive: !task.timerActive });
    }
  };

  const openTaskDetail = (taskId: string) => {
    setSelectedTaskId(taskId);
    setTaskDetailOpen(true);
  };

  const handleTaskSave = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
  };

  const handleTaskDelete = (taskId: string) => {
    onDeleteTask(taskId);
    setTaskDetailOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={toggleTaskStatus}
            onToggleTimer={toggleTimer}
            onOpenDetail={openTaskDetail}
          />
        ))}

        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Circle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No tasks found
              </h3>
              <p className="text-slate-600 mb-4">
                {filter === "all"
                  ? "Get started by adding your first task."
                  : `No ${filter} tasks at the moment.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedTaskId && (
        <TaskDetail
          taskId={selectedTaskId}
          open={taskDetailOpen}
          onOpenChange={setTaskDetailOpen}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
}
