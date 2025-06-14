"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Clock,
  History,
  MessageCircle,
  Pause,
  Play,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  dueDate: string;
  tags: string[];
  estimatedDuration: number;
  actualDuration: number;
  points: number;
  scheduledDate: string;
  timerActive: boolean;
  timerSeconds: number;
  subtasks: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }>;
  history: Array<{
    action: string;
    timestamp: string;
  }>;
}

interface TaskDetailProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskDetail({
  task,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: TaskDetailProps) {
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setEditedTask(task);
    onSave(editedTask);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: `c${Date.now()}`,
      author: "Alex Johnson",
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    setEditedTask({
      ...editedTask,
      comments: [...editedTask.comments, comment],
    });
    setNewComment("");
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    const subtask = {
      id: `st${Date.now()}`,
      text: newSubtask,
      completed: false,
    };

    setEditedTask({
      ...editedTask,
      subtasks: [...editedTask.subtasks, subtask],
    });
    setNewSubtask("");
  };

  const toggleSubtask = (subtaskId: string) => {
    setEditedTask({
      ...editedTask,
      subtasks: editedTask.subtasks.map((st) =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st,
      ),
    });
  };

  const toggleTimer = () => {
    setEditedTask({
      ...editedTask,
      timerActive: !editedTask.timerActive,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {isEditing ? "Edit Task" : "Task Details"}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogDescription>
            {isEditing
              ? "Make changes to this task"
              : "View and manage task details"}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={editedTask.priority}
                  onValueChange={(value) =>
                    setEditedTask({ ...editedTask, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedTask.status}
                  onValueChange={(value) =>
                    setEditedTask({ ...editedTask, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="skipped">Skipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editedTask.category}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, category: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={editedTask.scheduledDate}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      scheduledDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">
                  Estimated Duration (min)
                </Label>
                <Input
                  id="estimatedDuration"
                  type="number"
                  value={editedTask.estimatedDuration}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      estimatedDuration: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={editedTask.points}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      points: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={editedTask.tags.join(", ")}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  className={
                    priorityColors[task.priority as keyof typeof priorityColors]
                  }
                >
                  {task.priority}
                </Badge>
                <Badge
                  className={
                    statusColors[task.status as keyof typeof statusColors]
                  }
                >
                  {task.status.replace("-", " ")}
                </Badge>
                <Badge variant="outline">{task.category}</Badge>
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  Description
                </p>
                <p className="text-sm text-slate-600">{task.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Scheduled Date
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">
                      {formatDate(task.scheduledDate)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Points</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{task.points} points</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Estimated Duration
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">
                      {task.estimatedDuration} minutes
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Time Spent
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">
                      {task.actualDuration || 0} minutes
                    </span>
                  </div>
                </div>
              </div>

              {task.status === "in-progress" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">
                      Focus Timer
                    </span>
                    <span className="text-lg font-mono text-blue-900">
                      {formatTime(task.timerSeconds)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={task.timerActive ? "destructive" : "default"}
                      onClick={toggleTimer}
                      className="flex-shrink-0"
                    >
                      {task.timerActive ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                    <Progress
                      value={
                        (task.timerSeconds / (task.estimatedDuration * 60)) *
                        100
                      }
                      className="flex-1 h-2"
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="subtasks" className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSubtask();
                  }}
                />
                <Button onClick={handleAddSubtask}>Add</Button>
              </div>

              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => toggleSubtask(subtask.id)}
                    >
                      {subtask.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                    </Button>
                    <span
                      className={`text-sm ${subtask.completed ? "line-through text-slate-500" : "text-slate-900"}`}
                    >
                      {subtask.text}
                    </span>
                  </div>
                ))}

                {task.subtasks.length === 0 && (
                  <div className="text-center py-6 text-slate-500">
                    <p>No subtasks yet. Add one to get started!</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Progress
                  value={
                    task.subtasks.length > 0
                      ? (task.subtasks.filter((st) => st.completed).length /
                          task.subtasks.length) *
                        100
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {task.subtasks.filter((st) => st.completed).length}/
                  {task.subtasks.length} completed
                </p>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment();
                  }}
                />
                <Button onClick={handleAddComment}>Post</Button>
              </div>

              <div className="space-y-4 mt-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">
                        {comment.author}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{comment.text}</p>
                  </div>
                ))}

                {task.comments.length === 0 && (
                  <div className="text-center py-6 text-slate-500">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Start the conversation!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 py-4">
              <div className="space-y-4">
                {task.history.map((item) => (
                  <div key={item.timestamp} className="flex items-start gap-3">
                    <div className="mt-1">
                      <History className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.action}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {!isEditing && (
          <DialogFooter>
            <Button variant="destructive" onClick={() => onDelete(task.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Task
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
