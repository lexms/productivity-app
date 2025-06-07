"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PriorityBadge } from "@/components/atoms/priority-badge"
import { StatusBadge } from "@/components/atoms/status-badge"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Star, Calendar, Play, Pause, MoreHorizontal } from "lucide-react"

interface TaskItemProps {
  task: {
    id: string
    title: string
    description: string
    priority: "low" | "medium" | "high"
    category: string
    status: "pending" | "in-progress" | "completed" | "skipped"
    estimatedDuration: number
    points: number
    scheduledDate: string
    timerActive: boolean
    timerSeconds: number
  }
  onToggleStatus: (taskId: string) => void
  onToggleTimer: (taskId: string) => void
  onOpenDetail: (taskId: string) => void
}

export function TaskItem({ task, onToggleStatus, onToggleTimer, onOpenDetail }: TaskItemProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Button variant="ghost" size="sm" className="p-0 h-auto mt-1" onClick={() => onToggleStatus(task.id)}>
              {task.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`font-medium cursor-pointer hover:text-blue-600 ${
                    task.status === "completed" ? "line-through text-slate-500" : ""
                  }`}
                  onClick={() => onOpenDetail(task.id)}
                >
                  {task.title}
                </h3>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                <Badge variant="outline">{task.category}</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">{task.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedDuration}m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{task.points} pts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {task.status === "in-progress" && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-md">
                <span className="text-sm font-mono">{formatTime(task.timerSeconds)}</span>
                <Button
                  size="sm"
                  variant={task.timerActive ? "destructive" : "default"}
                  onClick={() => onToggleTimer(task.id)}
                  className="h-6 px-2"
                >
                  {task.timerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => onOpenDetail(task.id)}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
