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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, Heart, Moon, Sun, Brain, Target } from "lucide-react";
import { useState } from "react";

export interface CheckinData {
  id?: string;
  energy: number[];
  mood: number[];
  focus: number[];
  goals: string;
  priorities: string;
  achievements: string;
  challenges: string;
  reflections: string;
  gratitude: string;
  tomorrow: string;
  type: "morning" | "evening";
  timestamp: string;
  date?: string;
}

interface DailyCheckinHistoryProps {
  checkins: CheckinData[];
  onViewDetail?: (checkin: CheckinData) => void;
}

export function DailyCheckinHistory({
  checkins = [],
  onViewDetail,
}: DailyCheckinHistoryProps) {
  const [selectedCheckin, setSelectedCheckin] = useState<CheckinData | null>(
    null,
  );

  // Filter checkins for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentCheckins = checkins.filter((checkin) => {
    const checkinDate = new Date(checkin.timestamp);
    return checkinDate >= sevenDaysAgo;
  });

  // Group checkins by date for timeline view
  const groupedCheckins = recentCheckins.reduce(
    (acc, checkin) => {
      const date = checkin.date || checkin.timestamp.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(checkin);
      return acc;
    },
    {} as Record<string, CheckinData[]>,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Timeline View */}
      <div className="flex flex-col gap-4">
        {Object.entries(groupedCheckins)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, dayCheckins]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="text-lg">{formatDate(date)}</CardTitle>
                <CardDescription>
                  {dayCheckins.length} check-in
                  {dayCheckins.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {dayCheckins
                    .sort(
                      (a, b) =>
                        new Date(a.timestamp).getTime() -
                        new Date(b.timestamp).getTime(),
                    )
                    .map((checkin) => (
                      <div
                        key={checkin.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full"
                      >
                        <div className="flex items-center gap-3">
                          {checkin.type === "morning" ? (
                            <Sun className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <Moon className="w-5 h-5 text-blue-500" />
                          )}
                          <div>
                            <div className="font-medium capitalize">
                              {checkin.type} Check-in
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatTime(checkin.timestamp)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex gap-2 text-sm">
                            <Badge variant="outline">
                              E: {checkin.energy[0]}
                            </Badge>
                            <Badge variant="outline">
                              M: {checkin.mood[0]}
                            </Badge>
                            <Badge variant="outline">
                              F: {checkin.focus[0]}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCheckin(checkin)}
                            >
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetail?.(checkin);
                              }}
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}

        {recentCheckins.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No check-ins in the last 7 days
              </h3>
              <p className="text-gray-600">
                Complete a check-in to see it here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedCheckin}
        onOpenChange={() => setSelectedCheckin(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedCheckin && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedCheckin.type === "morning" ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-500" />
                  )}
                  {selectedCheckin.type === "morning" ? "Morning" : "Evening"}{" "}
                  Check-in
                </DialogTitle>
                <DialogDescription>
                  {formatDate(selectedCheckin.timestamp)} at{" "}
                  {formatTime(selectedCheckin.timestamp)}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Energy</div>
                    <div className="text-xl font-bold">
                      {selectedCheckin.energy[0]}/10
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Mood</div>
                    <div className="text-xl font-bold">
                      {selectedCheckin.mood[0]}/10
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Focus</div>
                    <div className="text-xl font-bold">
                      {selectedCheckin.focus[0]}/10
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  {selectedCheckin.goals && (
                    <div>
                      <Label className="font-medium">Goals</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.goals}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.priorities && (
                    <div>
                      <Label className="font-medium">Priorities</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.priorities}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.achievements && (
                    <div>
                      <Label className="font-medium">Achievements</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.achievements}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.challenges && (
                    <div>
                      <Label className="font-medium">Challenges</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.challenges}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.reflections && (
                    <div>
                      <Label className="font-medium">Reflections</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.reflections}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.gratitude && (
                    <div>
                      <Label className="font-medium">Gratitude</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.gratitude}
                      </p>
                    </div>
                  )}

                  {selectedCheckin.tomorrow && (
                    <div>
                      <Label className="font-medium">Tomorrow's Focus</Label>
                      <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedCheckin.tomorrow}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
