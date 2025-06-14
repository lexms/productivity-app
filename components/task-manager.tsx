"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Star,
} from "lucide-react";
import { useState } from "react";
import { TaskDetail } from "./task-detail";

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

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      description:
        "Draft and review the Q1 project proposal for client presentation",
      priority: "high",
      category: "Work",
      status: "in-progress",
      estimatedDuration: 120,
      actualDuration: 45,
      points: 50,
      scheduledDate: "2024-01-15",
      timerActive: false,
      timerSeconds: 2700,
    },
    {
      id: "2",
      title: "Morning workout",
      description: "30-minute cardio session",
      priority: "medium",
      category: "Health",
      status: "completed",
      estimatedDuration: 30,
      actualDuration: 35,
      points: 25,
      scheduledDate: "2024-01-15",
      timerActive: false,
      timerSeconds: 0,
    },
    {
      id: "3",
      title: "Review team feedback",
      description: "Go through feedback from last week's sprint review",
      priority: "medium",
      category: "Work",
      status: "pending",
      estimatedDuration: 45,
      points: 30,
      scheduledDate: "2024-01-15",
      timerActive: false,
      timerSeconds: 0,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "",
    estimatedDuration: 30,
  });
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    pending: "bg-slate-100 text-slate-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    skipped: "bg-gray-100 text-gray-800",
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus =
            task.status === "completed" ? "pending" : "completed";
          return { ...task, status: newStatus };
        }
        return task;
      }),
    );
  };

  const toggleTimer = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, timerActive: !task.timerActive };
        }
        return task;
      }),
    );
  };

  const addTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category || "General",
      status: "pending",
      estimatedDuration: newTask.estimatedDuration,
      points: Math.floor(newTask.estimatedDuration / 2),
      scheduledDate: new Date().toISOString().split("T")[0],
      timerActive: false,
      timerSeconds: 0,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      estimatedDuration: 30,
    });
  };

  const openTaskDetail = (taskId: string) => {
    setSelectedTaskId(taskId);
    setTaskDetailOpen(true);
  };

  const handleTaskSave = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setTaskDetailOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold break-words">
            Task Manager
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Organize and track your daily tasks
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to add to your list.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        priority: value as "low" | "medium" | "high",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    placeholder="e.g., Work, Personal"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newTask.estimatedDuration}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      estimatedDuration: Number.parseInt(e.target.value) || 30,
                    })
                  }
                  min="5"
                  max="480"
                />
              </div>
              <Button onClick={addTask} className="w-full">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-slate-600">Total Tasks</p>
                <p className="text-xl sm:text-2xl font-bold">{totalTasks}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-slate-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {completedTasks}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-slate-600">
                  Completion Rate
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {Math.round(completionRate)}%
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={completionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
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
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto mt-1 flex-shrink-0"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <button
                        type="button"
                        className={`font-medium text-left cursor-pointer hover:text-blue-600 mb-2 break-words bg-transparent border-none p-0 w-full ${
                          task.status === "completed"
                            ? "line-through text-slate-500"
                            : ""
                        }`}
                        onClick={() => openTaskDetail(task.id)}
                        aria-label={`Open details for task: ${task.title}`}
                      >
                        <h3 className="font-medium">{task.title}</h3>
                      </button>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <Badge
                          className={`${priorityColors[task.priority]} text-xs`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge
                          className={`${statusColors[task.status]} text-xs`}
                        >
                          {task.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 break-words">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{task.estimatedDuration}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 flex-shrink-0" />
                        <span>{task.points} pts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(task.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:flex-col sm:items-end">
                  {task.status === "in-progress" && (
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md">
                      <span className="text-sm font-mono whitespace-nowrap">
                        {formatTime(task.timerSeconds)}
                      </span>
                      <Button
                        size="sm"
                        variant={task.timerActive ? "destructive" : "default"}
                        onClick={() => toggleTimer(task.id)}
                        className="h-7 px-2 flex-shrink-0"
                      >
                        {task.timerActive ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openTaskDetail(task.id)}
                    className="flex-shrink-0"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
              {filter === "all" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                      <DialogDescription>
                        Create a new task to add to your list.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                          }
                          placeholder="Enter task title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newTask.description}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter task description"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value) =>
                              setNewTask({
                                ...newTask,
                                priority: value as "low" | "medium" | "high",
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={newTask.category}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                category: e.target.value,
                              })
                            }
                            placeholder="e.g., Work, Personal"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">
                          Estimated Duration (minutes)
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          value={newTask.estimatedDuration}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              estimatedDuration:
                                Number.parseInt(e.target.value) || 30,
                            })
                          }
                          min="5"
                          max="480"
                        />
                      </div>
                      <Button onClick={addTask} className="w-full">
                        Add Task
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
