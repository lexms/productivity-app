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
  DialogTrigger,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Calendar,
  CheckCircle2,
  Filter,
  Heart,
  LineChart,
  Moon,
  Search,
  Sun,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Import the CheckinData interface from the form component
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
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedType, setSelectedType] = useState<
    "all" | "morning" | "evening"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCheckin, setSelectedCheckin] = useState<CheckinData | null>(
    null,
  );

  // Filter checkins based on selected filters
  const filteredCheckins = checkins.filter((checkin) => {
    const matchesType = selectedType === "all" || checkin.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      checkin.goals.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.achievements.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.reflections.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by period
    const checkinDate = new Date(checkin.timestamp);
    const now = new Date();
    const daysAgo = Number.parseInt(selectedPeriod.replace("d", ""));
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const matchesPeriod = checkinDate >= cutoffDate;

    return matchesType && matchesSearch && matchesPeriod;
  });

  // Calculate trends and statistics
  const getAverageMetrics = () => {
    if (filteredCheckins.length === 0) return { energy: 0, mood: 0, focus: 0 };

    const totals = filteredCheckins.reduce(
      (acc, checkin) => ({
        energy: acc.energy + checkin.energy[0],
        mood: acc.mood + checkin.mood[0],
        focus: acc.focus + checkin.focus[0],
      }),
      { energy: 0, mood: 0, focus: 0 },
    );

    return {
      energy: Math.round(totals.energy / filteredCheckins.length),
      mood: Math.round(totals.mood / filteredCheckins.length),
      focus: Math.round(totals.focus / filteredCheckins.length),
    };
  };

  const averageMetrics = getAverageMetrics();

  // Group checkins by date for timeline view
  const groupedCheckins = filteredCheckins.reduce(
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check-in History</h2>
          <p className="text-gray-600">
            Review your daily check-ins and track your progress
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search check-ins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-48"
            />
          </div>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="365d">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedType}
            onValueChange={(value: "all" | "morning" | "evening") =>
              setSelectedType(value)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Check-ins</p>
                <p className="text-2xl font-bold">{filteredCheckins.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Energy</p>
                <p className="text-2xl font-bold">{averageMetrics.energy}/10</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Mood</p>
                <p className="text-2xl font-bold">{averageMetrics.mood}/10</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Focus</p>
                <p className="text-2xl font-bold">{averageMetrics.focus}/10</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Timeline View */}
        <TabsContent value="timeline" className="space-y-4">
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
                  <div className="space-y-3">
                    {dayCheckins
                      .sort(
                        (a, b) =>
                          new Date(a.timestamp).getTime() -
                          new Date(b.timestamp).getTime(),
                      )
                      .map((checkin) => (
                        <button
                          key={checkin.id}
                          type="button"
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer w-full text-left"
                          onClick={() => setSelectedCheckin(checkin)}
                          aria-label={`View ${checkin.type} check-in details`}
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetail?.(checkin);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}

          {filteredCheckins.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No check-ins found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or complete your first check-in to
                  see data here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

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

              <div className="space-y-4">
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
                <div className="space-y-4">
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
