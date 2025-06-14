"use client";

import { TimeBadge } from "@/components/atoms/time-badge";
import {
  DailyCheckinForm,
  type CheckinData as FormCheckinData,
} from "@/components/daily-checkin-form";
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
  getTimeOfDayMessage,
  shouldShowCheckin,
} from "@/utils/time-utils";
import { Calendar, CheckCircle2, Clock, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

interface CheckinData {
  timeOfDay: TimeOfDay;
  timestamp: string;
  energy: number[];
  mood: number[];
  focus: number[];
  notes: string;
  id: string;
}

export function SmartCheckinCard() {
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("morning");
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<CheckinData | null>(null);
  const [checkinHistory, setCheckinHistory] = useState<CheckinData[]>([]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getTimeOfDay());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCheckinSubmit = (data: FormCheckinData) => {
    const checkinData: CheckinData = {
      timeOfDay: currentTime,
      timestamp: new Date().toISOString(),
      energy: data.energy,
      mood: data.mood,
      focus: data.focus,
      notes: data.goals || data.achievements || data.reflections || "",
      id: crypto.randomUUID(),
    };

    setLastCheckin(checkinData);
    setCheckinHistory((prev) => [...prev, checkinData]);
    setShowCheckinForm(false);
  };

  const shouldShow = shouldShowCheckin(currentTime, lastCheckin?.timestamp);
  const timeMessage = getTimeOfDayMessage(currentTime);
  const optimalActivities = getOptimalActivities(currentTime);

  const getCheckinType = (timeOfDay: TimeOfDay): "morning" | "evening" => {
    return timeOfDay === "morning" ? "morning" : "evening";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Smart Check-in
          </CardTitle>
          <TimeBadge timeOfDay={currentTime} />
        </div>
        <CardDescription>{timeMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium">Current Time</span>
          </div>
          <span className="text-sm text-slate-600">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Last Check-in Status */}
        {lastCheckin && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Last check-in
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-800">
                {lastCheckin.timeOfDay} •{" "}
                {new Date(lastCheckin.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs text-green-600">
                Energy: {lastCheckin.energy[0]}/10 • Mood: {lastCheckin.mood[0]}
                /10
              </div>
            </div>
          </div>
        )}

        {/* Check-in Button */}
        <Button
          onClick={() => setShowCheckinForm(true)}
          className="w-full"
          variant={shouldShow ? "default" : "outline"}
          disabled={!shouldShow}
        >
          {shouldShow
            ? `Complete ${currentTime} check-in`
            : "Check-in completed recently"}
        </Button>

        {/* Optimal Activities Suggestion */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Optimal for {currentTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {optimalActivities.map((activity) => (
              <Badge
                key={activity}
                variant="outline"
                className="text-blue-700 border-blue-300 text-xs"
              >
                {activity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Today's Check-in History */}
        {checkinHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-700">
              Today's Check-ins
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {checkinHistory.slice(-4).map((checkin) => (
                <div key={checkin.id} className="p-2 bg-slate-50 rounded text-xs">
                  <div className="font-medium capitalize">
                    {checkin.timeOfDay}
                  </div>
                  <div className="text-slate-600">
                    {checkin.mood} • {checkin.energy}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Check-in Form */}
        <DailyCheckinForm
          type={getCheckinType(currentTime)}
          open={showCheckinForm}
          onOpenChange={setShowCheckinForm}
          onSubmit={handleCheckinSubmit}
        />
      </CardContent>
    </Card>
  );
}
