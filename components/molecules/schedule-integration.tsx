"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type TimeOfDay,
  getOptimalActivities,
  getTimeOfDay,
} from "@/utils/time-utils";
import { ArrowRight, Calendar, Clock, Zap } from "lucide-react";

interface ScheduleIntegrationProps {
  checkinData?: {
    energy: number[];
    mood: number[];
    focus: number[];
    timeOfDay: TimeOfDay;
  };
}

export function ScheduleIntegration({ checkinData }: ScheduleIntegrationProps) {
  const currentTime = getTimeOfDay();
  const _optimalActivities = getOptimalActivities(currentTime);

  const getScheduleSuggestions = () => {
    if (!checkinData) return [];

    const energy = checkinData.energy[0];
    const mood = checkinData.mood[0];
    const focus = checkinData.focus[0];

    const suggestions = [];

    if (energy >= 8 && focus >= 7) {
      suggestions.push({
        type: "deep-work",
        activity: "Deep Work Session",
        duration: "2 hours",
        reasoning: "High energy and focus - perfect for complex tasks",
      });
    } else if (energy >= 6 && mood >= 7) {
      suggestions.push({
        type: "collaborative",
        activity: "Team Meetings",
        duration: "1 hour",
        reasoning: "Good energy and mood - ideal for collaboration",
      });
    } else if (energy < 6) {
      suggestions.push({
        type: "admin",
        activity: "Administrative Tasks",
        duration: "30 minutes",
        reasoning: "Lower energy - handle lighter tasks",
      });
    }

    return suggestions;
  };

  const suggestions = getScheduleSuggestions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule Integration
        </CardTitle>
        <CardDescription>
          AI-powered schedule adjustments based on your check-in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checkinData ? (
          <>
            {/* Current State Summary */}
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current State</span>
                <Badge className="capitalize">{checkinData.timeOfDay}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Energy:</span>
                  <div className="font-medium">{checkinData.energy[0]}/10</div>
                </div>
                <div>
                  <span className="text-slate-600">Mood:</span>
                  <div className="font-medium">{checkinData.mood[0]}/10</div>
                </div>
                <div>
                  <span className="text-slate-600">Focus:</span>
                  <div className="font-medium">{checkinData.focus[0]}/10</div>
                </div>
              </div>
            </div>

            {/* Schedule Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">
                  Recommended Next Activities
                </h4>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {suggestion.activity}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {suggestion.reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Update Schedule
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <ArrowRight className="w-4 h-4 mr-2" />
                View Full Schedule
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">
              Complete a check-in to get personalized schedule suggestions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
