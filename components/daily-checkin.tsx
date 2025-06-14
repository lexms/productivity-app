"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Brain, CheckCircle2, Heart, Moon, Sun, Target } from "lucide-react";
import { useState } from "react";

interface CheckinProps {
  type: "morning" | "evening";
}

export function DailyCheckin({ type }: CheckinProps) {
  const [checkinData, setCheckinData] = useState({
    energy: [7],
    mood: [8],
    goals: "",
    priorities: "",
    achievements: "",
    challenges: "",
    reflections: "",
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = () => {
    setIsCompleted(true);
    // Here you would typically save to your backend
    console.log("Check-in submitted:", checkinData);
  };

  const isMorning = type === "morning";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMorning ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
          <span className="font-medium">
            {isMorning ? "Morning" : "Evening"} Check-in
          </span>
        </div>
        {isCompleted ? (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        ) : (
          <Badge variant="outline">Pending</Badge>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={isCompleted ? "outline" : "default"}
            className="w-full"
            disabled={isCompleted}
          >
            {isCompleted
              ? "View Check-in"
              : `Complete ${isMorning ? "Morning" : "Evening"} Check-in`}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isMorning ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
              {isMorning ? "Morning" : "Evening"} Check-in
            </DialogTitle>
            <DialogDescription>
              {isMorning
                ? "Set your intentions and energy for the day ahead"
                : "Reflect on your day and celebrate your achievements"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Energy Level */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <Label>Energy Level</Label>
              </div>
              <div className="px-3">
                <Slider
                  value={checkinData.energy}
                  onValueChange={(value) =>
                    setCheckinData({ ...checkinData, energy: value })
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>Low (1)</span>
                  <span className="font-medium">
                    Current: {checkinData.energy[0]}
                  </span>
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
                  value={checkinData.mood}
                  onValueChange={(value) =>
                    setCheckinData({ ...checkinData, mood: value })
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>😔 (1)</span>
                  <span className="font-medium">
                    Current: {checkinData.mood[0]}
                  </span>
                  <span>😊 (10)</span>
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
                    value={checkinData.goals}
                    onChange={(e) =>
                      setCheckinData({ ...checkinData, goals: e.target.value })
                    }
                  />
                </div>

                {/* Priorities */}
                <div className="space-y-2">
                  <Label htmlFor="priorities">Top 3 Priorities</Label>
                  <Textarea
                    id="priorities"
                    placeholder="List your most important tasks for today"
                    value={checkinData.priorities}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        priorities: e.target.value,
                      })
                    }
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
                    value={checkinData.achievements}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        achievements: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Challenges */}
                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges Faced</Label>
                  <Textarea
                    id="challenges"
                    placeholder="What obstacles did you encounter?"
                    value={checkinData.challenges}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        challenges: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Reflections */}
                <div className="space-y-2">
                  <Label htmlFor="reflections">Reflections</Label>
                  <Textarea
                    id="reflections"
                    placeholder="Any insights or thoughts about today?"
                    value={checkinData.reflections}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        reflections: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}

            <Button onClick={handleSubmit} className="w-full">
              Complete Check-in
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Coach Insight */}
      {isCompleted && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 AI Insight:</strong>{" "}
            {isMorning
              ? "Your energy is high today! Perfect time to tackle challenging tasks."
              : "Great reflection! Consider scheduling similar tasks during your peak energy hours tomorrow."}
          </p>
        </div>
      )}
    </div>
  );
}
