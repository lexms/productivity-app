"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sun, Moon, Heart, Brain, Battery, CheckCircle2, Target, X, Save } from "lucide-react"

interface DailyCheckinFormProps {
  type: "morning" | "evening"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function DailyCheckinForm({ type, open, onOpenChange, onSubmit }: DailyCheckinFormProps) {
  const [formData, setFormData] = useState({
    energy: [7],
    mood: [8],
    focus: [6],
    goals: "",
    priorities: "",
    achievements: "",
    challenges: "",
    reflections: "",
    gratitude: "",
    tomorrow: "",
  })

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      type,
      timestamp: new Date().toISOString(),
    })
    onOpenChange(false)
  }

  const isMorning = type === "morning"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2">
              {isMorning ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  Morning Check-in
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-blue-500" />
                  Evening Check-in
                </>
              )}
            </DialogTitle>
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
          <DialogDescription>
            {isMorning
              ? "Set your intentions and energy for the day ahead"
              : "Reflect on your day and celebrate your achievements"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Energy Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <Label>Energy Level</Label>
            </div>
            <div className="px-3">
              <Slider
                value={formData.energy}
                onValueChange={(value) => setFormData({ ...formData, energy: value })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>Low (1)</span>
                <span className="font-medium">Current: {formData.energy[0]}</span>
                <span>High (10)</span>
              </div>
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <Label>Mood</Label>
            </div>
            <div className="px-3">
              <Slider
                value={formData.mood}
                onValueChange={(value) => setFormData({ ...formData, mood: value })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>😔 (1)</span>
                <span className="font-medium">Current: {formData.mood[0]}</span>
                <span>😊 (10)</span>
              </div>
            </div>
          </div>

          {/* Focus Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-green-500" />
              <Label>Focus Level</Label>
            </div>
            <div className="px-3">
              <Slider
                value={formData.focus}
                onValueChange={(value) => setFormData({ ...formData, focus: value })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>Scattered (1)</span>
                <span className="font-medium">Current: {formData.focus[0]}</span>
                <span>Laser (10)</span>
              </div>
            </div>
          </div>

          {isMorning ? (
            <>
              {/* Morning Goals */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <Label htmlFor="goals">Today's Goals</Label>
                </div>
                <Textarea
                  id="goals"
                  placeholder="What do you want to accomplish today?"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Priorities */}
              <div className="space-y-2">
                <Label htmlFor="priorities">Top 3 Priorities</Label>
                <Textarea
                  id="priorities"
                  placeholder="List your most important tasks for today"
                  value={formData.priorities}
                  onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Gratitude */}
              <div className="space-y-2">
                <Label htmlFor="gratitude">Morning Gratitude</Label>
                <Textarea
                  id="gratitude"
                  placeholder="What are you grateful for today?"
                  value={formData.gratitude}
                  onChange={(e) => setFormData({ ...formData, gratitude: e.target.value })}
                  rows={2}
                />
              </div>
            </>
          ) : (
            <>
              {/* Evening Achievements */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <Label htmlFor="achievements">Today's Achievements</Label>
                </div>
                <Textarea
                  id="achievements"
                  placeholder="What did you accomplish today?"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Challenges */}
              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges Faced</Label>
                <Textarea
                  id="challenges"
                  placeholder="What obstacles did you encounter?"
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Reflections */}
              <div className="space-y-2">
                <Label htmlFor="reflections">Reflections</Label>
                <Textarea
                  id="reflections"
                  placeholder="Any insights or thoughts about today?"
                  value={formData.reflections}
                  onChange={(e) => setFormData({ ...formData, reflections: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Tomorrow */}
              <div className="space-y-2">
                <Label htmlFor="tomorrow">Tomorrow's Focus</Label>
                <Textarea
                  id="tomorrow"
                  placeholder="What will you focus on tomorrow?"
                  value={formData.tomorrow}
                  onChange={(e) => setFormData({ ...formData, tomorrow: e.target.value })}
                  rows={2}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Complete Check-in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
