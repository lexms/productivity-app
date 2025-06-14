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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Clock,
  Coffee,
  Edit,
  Save,
  Settings,
  Target,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  id: string;
  activity: string;
  time: string;
  type: string;
  priority: string;
  energy: number;
  reasoning: string;
}

interface ScheduleDetailProps {
  timeSlot?: TimeSlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (timeSlot: TimeSlot) => void;
  onDelete?: (timeSlotId: string) => void;
  onClose?: () => void;
}

export function ScheduleDetail({
  timeSlot,
  open,
  onOpenChange,
  onSave,
  onDelete,
  onClose,
}: ScheduleDetailProps) {
  const isCreating = !timeSlot;
  const [isEditing, setIsEditing] = useState(isCreating);

  // Default values for new time slot
  const defaultTimeSlot = {
    id: Date.now().toString(),
    activity: "",
    time: "09:00",
    type: "deep-work",
    priority: "medium",
    energy: 7,
    reasoning: "",
  };

  const [editedTimeSlot, setEditedTimeSlot] = useState(
    timeSlot || defaultTimeSlot,
  );

  const handleSave = () => {
    if (onSave) {
      onSave(editedTimeSlot);
    }
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && timeSlot?.id) {
      onDelete(timeSlot.id);
    }
    onOpenChange(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deep-work":
        return <Brain className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      case "break":
        return <Coffee className="w-4 h-4" />;
      case "communication":
        return <Target className="w-4 h-4" />;
      case "admin":
        return <Settings className="w-4 h-4" />;
      case "focused-work":
        return <Zap className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "deep-work":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "break":
        return "bg-green-100 text-green-800 border-green-200";
      case "communication":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "admin":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "focused-work":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {isCreating
                ? "Create Time Slot"
                : isEditing
                  ? "Edit Time Slot"
                  : editedTimeSlot.activity || "Time Slot Details"}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {!isEditing && !isCreating && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogDescription>
            {isCreating
              ? "Create a new time slot for your schedule"
              : isEditing
                ? "Make changes to this time slot"
                : "View and manage time slot details"}
          </DialogDescription>
        </DialogHeader>

        {isEditing || isCreating ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity</Label>
              <Input
                id="activity"
                placeholder="Enter activity name"
                value={editedTimeSlot.activity}
                onChange={(e) =>
                  setEditedTimeSlot({
                    ...editedTimeSlot,
                    activity: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={editedTimeSlot.time}
                  onChange={(e) =>
                    setEditedTimeSlot({
                      ...editedTimeSlot,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Activity Type</Label>
                <Select
                  value={editedTimeSlot.type}
                  onValueChange={(value) =>
                    setEditedTimeSlot({ ...editedTimeSlot, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deep-work">Deep Work</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="break">Break</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="focused-work">Focused Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={editedTimeSlot.priority}
                  onValueChange={(value) =>
                    setEditedTimeSlot({ ...editedTimeSlot, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="energy">Energy Level (1-10)</Label>
                <Input
                  id="energy"
                  type="number"
                  min="1"
                  max="10"
                  value={editedTimeSlot.energy}
                  onChange={(e) =>
                    setEditedTimeSlot({
                      ...editedTimeSlot,
                      energy: Number.parseInt(e.target.value) || 5,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasoning">Reasoning</Label>
              <Input
                id="reasoning"
                placeholder="Why is this the optimal time for this activity?"
                value={editedTimeSlot.reasoning}
                onChange={(e) =>
                  setEditedTimeSlot({
                    ...editedTimeSlot,
                    reasoning: e.target.value,
                  })
                }
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  isCreating ? handleClose() : setIsEditing(false)
                }
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {isCreating ? "Create Time Slot" : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getActivityColor(editedTimeSlot.type)}>
                {getActivityIcon(editedTimeSlot.type)}
                <span className="ml-1 capitalize">
                  {editedTimeSlot.type.replace("-", " ")}
                </span>
              </Badge>
              <Badge className={getPriorityColor(editedTimeSlot.priority)}>
                {editedTimeSlot.priority} priority
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Time</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{editedTimeSlot.time}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Energy Level
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{editedTimeSlot.energy}/10</span>
                </div>
              </div>
            </div>

            {editedTimeSlot.reasoning && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Reasoning</p>
                <p className="text-sm text-slate-600 p-3 bg-slate-50 rounded-md">
                  {editedTimeSlot.reasoning}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">
                Optimization Tips
              </p>
              <div className="space-y-2">
                {editedTimeSlot.type === "deep-work" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Consider using the Pomodoro technique (25 min work, 5
                        min break) during this session
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Turn off notifications and close email to minimize
                        distractions
                      </p>
                    </div>
                  </>
                )}

                {editedTimeSlot.type === "meeting" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Send an agenda 15 minutes before the meeting starts
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        End the meeting 5 minutes early to allow for transition
                        time
                      </p>
                    </div>
                  </>
                )}

                {editedTimeSlot.type === "break" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Step away from your screen to reduce eye strain
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Try a quick 5-minute stretching routine to boost energy
                      </p>
                    </div>
                  </>
                )}

                {(editedTimeSlot.type === "communication" ||
                  editedTimeSlot.type === "admin") && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Batch similar tasks together to improve efficiency
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 min-w-[12px]">•</div>
                      <p className="text-sm text-slate-600">
                        Set a time limit for email processing to avoid getting
                        sidetracked
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {!isCreating && (
              <DialogFooter>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Time Slot
                </Button>
              </DialogFooter>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
