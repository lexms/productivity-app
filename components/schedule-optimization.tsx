"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  Coffee,
  Heart,
  Lightbulb,
  Loader2,
  RefreshCw,
  Settings,
  Target,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { ScheduleDetail } from "./schedule-detail";

interface TimeSlot {
  id: string;
  activity: string;
  time: string;
  type: string;
  priority: string;
  energy: number;
  reasoning: string;
}

export function ScheduleOptimization() {
  const [_selectedDay, _setSelectedDay] = useState("today");
  const [autoScheduling, setAutoScheduling] = useState(true);
  const [deepWorkPreference, setDeepWorkPreference] = useState(true);
  const [meetingBatching, setMeetingBatching] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>(undefined);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataSourcesExpanded, setDataSourcesExpanded] = useState(false);

  // Mock data integration
  const [taskData, _setTaskData] = useState({
    highPriorityCount: 3,
    dueSoonCount: 5,
    totalTasks: 12,
    completedToday: 4,
    categories: {
      development: 5,
      design: 2,
      meetings: 3,
      admin: 2,
    },
  });

  const [meetingData, _setMeetingData] = useState({
    todayCount: 3,
    totalDuration: 120, // minutes
    nextMeeting: "14:00",
    meetingFreeBlocks: [
      { start: "08:00", end: "10:00" },
      { start: "12:30", end: "14:00" },
      { start: "15:30", end: "18:00" },
    ],
  });

  const [checkinData, _setCheckinData] = useState({
    lastCheckin: "10:30",
    energy: [8, 7, 6, 9, 7],
    mood: [7, 6, 8, 7, 8],
    focus: [9, 7, 6, 8, 7],
    timeOfDay: "midday",
  });

  const [wearableData, _setWearableData] = useState({
    sleep: {
      quality: 85,
      duration: 7.2,
      deepSleep: 1.8,
    },
    recovery: 78,
    stress: 42,
    steps: 4500,
    heartRate: {
      resting: 62,
      current: 68,
    },
  });

  // Mock habit pattern data
  const habitPatterns = {
    energyLevels: [
      {
        timeRange: "7-9 AM",
        avgEnergy: 5,
        activity: "Morning Routine",
        peak: "wake up & breakfast",
      },
      {
        timeRange: "9-11 AM",
        avgEnergy: 9,
        activity: "Peak Focus",
        peak: "deep work optimal",
      },
      {
        timeRange: "11-1 PM",
        avgEnergy: 7,
        activity: "Focused Work",
        peak: "meetings & collaboration",
      },
      {
        timeRange: "1-3 PM",
        avgEnergy: 5,
        activity: "Post-Lunch",
        peak: "light tasks & admin",
      },
      {
        timeRange: "3-5 PM",
        avgEnergy: 8,
        activity: "Afternoon Peak",
        peak: "implementation work",
      },
      {
        timeRange: "5-7 PM",
        avgEnergy: 6,
        activity: "Wind Down",
        peak: "wrap up & planning",
      },
      {
        timeRange: "7-9 PM",
        avgEnergy: 4,
        activity: "Evening",
        peak: "personal time",
      },
      {
        timeRange: "9-11 PM",
        avgEnergy: 2,
        activity: "Rest",
        peak: "relaxation & sleep prep",
      },
    ],
    weeklyPatterns: {
      monday: { productivity: 85, meetings: 3, focusTime: 4.5 },
      tuesday: { productivity: 92, meetings: 2, focusTime: 5.2 },
      wednesday: { productivity: 88, meetings: 4, focusTime: 3.8 },
      thursday: { productivity: 90, meetings: 3, focusTime: 4.8 },
      friday: { productivity: 78, meetings: 5, focusTime: 2.5 },
      saturday: { productivity: 65, meetings: 0, focusTime: 1.2 },
      sunday: { productivity: 60, meetings: 0, focusTime: 0.8 },
    },
    taskTypes: [
      {
        type: "Deep Work",
        optimalTime: "9:00-11:00",
        efficiency: 94,
        frequency: "daily",
      },
      {
        type: "Meetings",
        optimalTime: "14:00-16:00",
        efficiency: 87,
        frequency: "3-4 per day",
      },
      {
        type: "Admin Tasks",
        optimalTime: "16:00-17:00",
        efficiency: 82,
        frequency: "daily",
      },
      {
        type: "Creative Work",
        optimalTime: "10:00-12:00",
        efficiency: 91,
        frequency: "2-3 per week",
      },
      {
        type: "Email/Communication",
        optimalTime: "8:00-9:00, 17:00-18:00",
        efficiency: 85,
        frequency: "2x daily",
      },
    ],
  };

  // Mock optimized schedule
  const [optimizedSchedule, setOptimizedSchedule] = useState<TimeSlot[]>([
    {
      id: "1",
      time: "8:00-8:30",
      activity: "Email & Planning",
      type: "communication",
      priority: "medium",
      energy: 6,
      reasoning: "Good time for communication before peak focus",
    },
    {
      id: "2",
      time: "8:30-9:00",
      activity: "Daily Standup",
      type: "meeting",
      priority: "high",
      energy: 7,
      reasoning: "Team sync when everyone is fresh",
    },
    {
      id: "3",
      time: "9:00-11:00",
      activity: "Deep Work: Project Architecture",
      type: "deep-work",
      priority: "high",
      energy: 9,
      reasoning: "Peak focus time - ideal for complex problem solving",
    },
    {
      id: "4",
      time: "11:00-11:15",
      activity: "Break",
      type: "break",
      priority: "medium",
      energy: 8,
      reasoning: "Maintain energy levels with strategic break",
    },
    {
      id: "5",
      time: "11:15-12:00",
      activity: "Code Review & Documentation",
      type: "focused-work",
      priority: "medium",
      energy: 8,
      reasoning: "Still high focus but less demanding than deep work",
    },
    {
      id: "6",
      time: "12:00-13:00",
      activity: "Lunch Break",
      type: "break",
      priority: "high",
      energy: 6,
      reasoning: "Natural energy dip - perfect for extended break",
    },
    {
      id: "7",
      time: "13:00-13:30",
      activity: "Light Admin Tasks",
      type: "admin",
      priority: "low",
      energy: 5,
      reasoning: "Post-lunch dip - handle easier tasks",
    },
    {
      id: "8",
      time: "13:30-15:00",
      activity: "Client Meeting",
      type: "meeting",
      priority: "high",
      energy: 7,
      reasoning: "Energy recovering - good for collaborative work",
    },
    {
      id: "9",
      time: "15:00-15:15",
      activity: "Break",
      type: "break",
      priority: "medium",
      energy: 8,
      reasoning: "Quick recharge before afternoon focus",
    },
    {
      id: "10",
      time: "15:15-16:30",
      activity: "Feature Development",
      type: "focused-work",
      priority: "high",
      energy: 8,
      reasoning: "Afternoon peak - good for implementation work",
    },
    {
      id: "11",
      time: "16:30-17:00",
      activity: "Email & Follow-ups",
      type: "communication",
      priority: "medium",
      energy: 6,
      reasoning: "End of day communication and planning",
    },
  ]);

  const deepWorkSuggestions = [
    {
      timeSlot: "9:00-11:00 AM",
      duration: "2 hours",
      confidence: 95,
      reasoning: "Peak cognitive performance based on your energy patterns",
      activities: [
        "Complex problem solving",
        "Strategic planning",
        "Creative work",
        "Learning new skills",
      ],
    },
    {
      timeSlot: "10:00-11:30 AM",
      duration: "1.5 hours",
      confidence: 88,
      reasoning: "Alternative slot if morning meetings are unavoidable",
      activities: ["Code architecture", "Writing", "Research", "Analysis"],
    },
    {
      timeSlot: "3:00-4:30 PM",
      duration: "1.5 hours",
      confidence: 82,
      reasoning: "Afternoon focus peak after post-lunch recovery",
      activities: ["Implementation work", "Design", "Detailed planning"],
    },
  ];

  const meetingOptimizations = [
    {
      suggestion: "Batch meetings in afternoon",
      impact: "+23% focus time",
      reasoning: "Preserve morning peak hours for deep work",
      timeSlots: ["2:00-4:00 PM", "4:00-5:00 PM"],
    },
    {
      suggestion: "Limit meetings to 25/50 minutes",
      impact: "+15% efficiency",
      reasoning: "Built-in buffer time reduces context switching",
      implementation: "Auto-adjust calendar defaults",
    },
    {
      suggestion: "No-meeting Tuesdays",
      impact: "+40% deep work time",
      reasoning: "Your highest productivity day should be protected",
      implementation: "Block calendar every Tuesday 9 AM - 5 PM",
    },
    {
      suggestion: "Morning meeting-free zone",
      impact: "+30% morning productivity",
      reasoning: "Protect peak cognitive hours",
      implementation: "Block 8:30-11:30 AM daily",
    },
  ];

  const handleRegenerateSchedule = () => {
    setIsGenerating(true);

    // Simulate API call or processing time
    setTimeout(() => {
      // Here we would normally call an API to generate a new schedule
      // based on all the data sources

      // For now, we'll just update the timestamp to simulate a refresh
      const updatedSchedule = [...optimizedSchedule];
      setOptimizedSchedule(updatedSchedule);
      setIsGenerating(false);
    }, 1500);
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setDetailOpen(true);
  };

  const handleSaveTimeSlot = (updatedTimeSlot: TimeSlot) => {
    const updatedSchedule = optimizedSchedule.map((slot) =>
      slot.id === updatedTimeSlot.id ? updatedTimeSlot : slot,
    );
    setOptimizedSchedule(updatedSchedule);
    setDetailOpen(false);
    setSelectedTimeSlot(undefined);
  };

  const handleDeleteTimeSlot = (timeSlotId: string) => {
    const updatedSchedule = optimizedSchedule.filter(
      (slot) => slot.id !== timeSlotId,
    );
    setOptimizedSchedule(updatedSchedule);
    setDetailOpen(false);
    setSelectedTimeSlot(undefined);
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 8) return "bg-green-500";
    if (energy >= 6) return "bg-yellow-500";
    if (energy >= 4) return "bg-orange-500";
    return "bg-red-500";
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Schedule Optimization
          </h2>
          <p className="text-slate-600">
            AI-powered scheduling based on your productivity patterns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Preferences</DialogTitle>
                <DialogDescription>
                  Customize your schedule optimization settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-scheduling">Auto-scheduling</Label>
                  <Switch
                    id="auto-scheduling"
                    checked={autoScheduling}
                    onCheckedChange={setAutoScheduling}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="deep-work">Protect deep work time</Label>
                  <Switch
                    id="deep-work"
                    checked={deepWorkPreference}
                    onCheckedChange={setDeepWorkPreference}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="meeting-batching">Batch meetings</Label>
                  <Switch
                    id="meeting-batching"
                    checked={meetingBatching}
                    onCheckedChange={setMeetingBatching}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleRegenerateSchedule} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Schedule
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Data Sources Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Data Sources
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDataSourcesExpanded(!dataSourcesExpanded)}
              className="text-xs"
            >
              {dataSourcesExpanded ? "Hide Details" : "Show Details"}
            </Button>
          </CardTitle>
          <CardDescription>
            Your schedule is optimized based on these data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center text-center">
              <div className="p-2 bg-blue-100 rounded-full mb-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-sm">Tasks</h4>
              <p className="text-xs text-slate-600 mt-1">
                {taskData.highPriorityCount} high priority
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center text-center">
              <div className="p-2 bg-purple-100 rounded-full mb-2">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-sm">Meetings</h4>
              <p className="text-xs text-slate-600 mt-1">
                {meetingData.todayCount} today
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center text-center">
              <div className="p-2 bg-green-100 rounded-full mb-2">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-medium text-sm">Check-ins</h4>
              <p className="text-xs text-slate-600 mt-1">
                Last: {checkinData.lastCheckin}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center text-center">
              <div className="p-2 bg-red-100 rounded-full mb-2">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="font-medium text-sm">Wearables</h4>
              <p className="text-xs text-slate-600 mt-1">
                {wearableData.recovery}% recovery
              </p>
            </div>
          </div>

          {dataSourcesExpanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tasks Detail */}
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium">Task Data</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">High Priority:</span>
                      <span className="font-medium">
                        {taskData.highPriorityCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Due Soon:</span>
                      <span className="font-medium">
                        {taskData.dueSoonCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Tasks:</span>
                      <span className="font-medium">{taskData.totalTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Completed Today:</span>
                      <span className="font-medium">
                        {taskData.completedToday}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meetings Detail */}
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-purple-600" />
                    <h4 className="font-medium">Meeting Data</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Today's Meetings:</span>
                      <span className="font-medium">
                        {meetingData.todayCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Duration:</span>
                      <span className="font-medium">
                        {meetingData.totalDuration} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Next Meeting:</span>
                      <span className="font-medium">
                        {meetingData.nextMeeting}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Free Blocks:</span>
                      <span className="font-medium">
                        {meetingData.meetingFreeBlocks.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Check-in Detail */}
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium">Check-in Data</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Check-in:</span>
                      <span className="font-medium">
                        {checkinData.lastCheckin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Current Energy:</span>
                      <span className="font-medium">
                        {checkinData.energy[0]}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Current Mood:</span>
                      <span className="font-medium">
                        {checkinData.mood[0]}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Current Focus:</span>
                      <span className="font-medium">
                        {checkinData.focus[0]}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wearable Detail */}
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-red-600" />
                    <h4 className="font-medium">Wearable Data</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sleep Quality:</span>
                      <span className="font-medium">
                        {wearableData.sleep.quality}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Recovery:</span>
                      <span className="font-medium">
                        {wearableData.recovery}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stress Level:</span>
                      <span className="font-medium">
                        {wearableData.stress}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Resting HR:</span>
                      <span className="font-medium">
                        {wearableData.heartRate.resting} bpm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Insight:</strong> Your schedule is optimized based on{" "}
                  {wearableData.sleep.quality}% sleep quality,{" "}
                  {wearableData.recovery}% recovery, and {checkinData.energy[0]}
                  /10 energy level. Your most productive time is typically 9-11
                  AM.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="schedule">Optimal Schedule</TabsTrigger>
          <TabsTrigger value="patterns">Habit Patterns</TabsTrigger>
          <TabsTrigger value="deep-work">Deep Work</TabsTrigger>
          <TabsTrigger value="meetings">Meeting Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          {/* Schedule Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Optimized Schedule
              </CardTitle>
              <CardDescription>
                AI-generated schedule based on your productivity patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optimizedSchedule.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-full text-left flex items-center gap-4 p-3 rounded-lg border bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => handleTimeSlotClick(item)}
                    aria-label={`Edit time slot: ${item.activity} at ${item.time} (${item.priority} priority)`}
                  >
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm font-medium text-slate-900">
                        {item.time}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getEnergyColor(item.energy)}`}
                        />
                        <span className="text-xs text-slate-600 ml-1">
                          {item.energy}/10
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`p-1 rounded ${getActivityColor(item.type)}`}
                        >
                          {getActivityIcon(item.type)}
                        </div>
                        <h4 className="font-semibold text-slate-900">
                          {item.activity}
                        </h4>
                        <Badge
                          variant="outline"
                          className={
                            item.priority === "high"
                              ? "border-red-200 text-red-700"
                              : item.priority === "medium"
                                ? "border-yellow-200 text-yellow-700"
                                : "border-green-200 text-green-700"
                          }
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{item.reasoning}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Deep Work Time
                    </p>
                    <p className="text-2xl font-bold text-slate-900">3.5h</p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">
                  ↗ +45min vs average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Meeting Efficiency
                    </p>
                    <p className="text-2xl font-bold text-slate-900">92%</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Optimal timing</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Energy Alignment
                    </p>
                    <p className="text-2xl font-bold text-slate-900">89%</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Well matched</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {/* Energy Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Daily Energy Patterns
              </CardTitle>
              <CardDescription>
                Your energy levels throughout the day based on historical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habitPatterns.energyLevels.map((entry) => (
                  <div
                    key={entry.timeRange}
                    className="text-center p-3 bg-white rounded-lg border"
                  >
                    <div className="text-sm font-medium text-slate-900">
                      {entry.timeRange}
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">
                      {entry.avgEnergy}/10
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {entry.activity}
                    </div>
                    <div className="text-xs text-slate-500">
                      {entry.peak}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Productivity Patterns
              </CardTitle>
              <CardDescription>
                How your productivity varies throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(habitPatterns.weeklyPatterns).map(
                  ([day, data]) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium capitalize">
                        {day}
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Productivity</span>
                            <span>{data.productivity}%</span>
                          </div>
                          <Progress value={data.productivity} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Meetings</span>
                            <span>{data.meetings}</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(data.meetings / 6) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Focus Time</span>
                            <span>{data.focusTime}h</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{
                                width: `${(data.focusTime / 6) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Task Type Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Task Type Optimization
              </CardTitle>
              <CardDescription>
                When you perform different types of work most effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habitPatterns.taskTypes.map((task) => (
                  <div
                    key={task.type}
                    className="p-4 bg-slate-50 rounded-lg border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">
                        {task.type}
                      </h4>
                      <Badge className="bg-green-100 text-green-800">
                        {task.efficiency}% efficient
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Optimal Time:</span>
                        <p className="font-medium">{task.optimalTime}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Frequency:</span>
                        <p className="font-medium">{task.frequency}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Efficiency:</span>
                        <Progress value={task.efficiency} className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deep-work" className="space-y-6">
          {/* Deep Work Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Deep Work Time Recommendations
              </CardTitle>
              <CardDescription>
                Optimal periods for focused, uninterrupted work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deepWorkSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.timeSlot}
                    className="p-4 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-900">
                            {suggestion.timeSlot}
                          </h4>
                          <p className="text-sm text-purple-700">
                            {suggestion.duration} duration
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-purple-800 mb-3">
                      {suggestion.reasoning}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.activities.map((activity) => (
                        <Badge
                          key={activity}
                          variant="outline"
                          className="text-purple-700 border-purple-300"
                        >
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Break Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                Strategic Break Scheduling
              </CardTitle>
              <CardDescription>
                Optimize your breaks to maintain peak performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-900">
                      Micro-breaks
                    </h4>
                  </div>
                  <p className="text-sm text-green-800 mb-2">
                    5-minute breaks every 25-30 minutes during deep work
                  </p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Look away from screen (20-20-20 rule)</li>
                    <li>• Light stretching or walking</li>
                    <li>• Deep breathing exercises</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">
                      Power breaks
                    </h4>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">
                    15-30 minute breaks between major work blocks
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Walk outside or change environment</li>
                    <li>• Healthy snack and hydration</li>
                    <li>• Brief meditation or mindfulness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Focus Enhancement Tips */}
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Your deep work sessions are 23% more
              effective when preceded by a 5-minute planning session. Consider
              adding brief planning blocks before major focus periods.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          {/* Meeting Optimization Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Meeting Optimization Recommendations
              </CardTitle>
              <CardDescription>
                Improve your meeting efficiency and protect focus time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetingOptimizations.map((optimization) => (
                  <div
                    key={optimization.suggestion}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">
                        {optimization.suggestion}
                      </h4>
                      <Badge className="bg-green-100 text-green-800">
                        {optimization.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-800 mb-3">
                      {optimization.reasoning}
                    </p>
                    {optimization.timeSlots && (
                      <div className="flex gap-2">
                        {optimization.timeSlots.map((slot) => (
                          <Badge
                            key={slot}
                            variant="outline"
                            className="text-blue-700 border-blue-300"
                          >
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {optimization.implementation && (
                      <p className="text-xs text-blue-700 mt-2">
                        <strong>Implementation:</strong>{" "}
                        {optimization.implementation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meeting Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Current Meeting Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Average meetings per day
                    </span>
                    <span className="font-semibold">3.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Average meeting duration
                    </span>
                    <span className="font-semibold">42 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Meeting efficiency score
                    </span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Focus time protected
                    </span>
                    <span className="font-semibold text-orange-600">65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Optimization Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Additional focus time
                    </span>
                    <span className="font-semibold text-green-600">
                      +2.3h/day
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Meeting efficiency gain
                    </span>
                    <span className="font-semibold text-green-600">+18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Context switching reduction
                    </span>
                    <span className="font-semibold text-green-600">-45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Energy alignment improvement
                    </span>
                    <span className="font-semibold text-green-600">+25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Quick Implementation Actions
              </CardTitle>
              <CardDescription>
                Start optimizing your schedule today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-auto p-4 flex flex-col gap-2 text-left">
                  <div className="flex items-center gap-2 w-full">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Block Focus Time</span>
                  </div>
                  <span className="text-xs opacity-80">
                    Protect 9-11 AM for deep work
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Batch Meetings</span>
                  </div>
                  <span className="text-xs opacity-80">
                    Move meetings to 2-5 PM
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Shorten Meetings</span>
                  </div>
                  <span className="text-xs opacity-80">
                    Default to 25/50 minute slots
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">No-Meeting Tuesday</span>
                  </div>
                  <span className="text-xs opacity-80">
                    Block entire Tuesday for focus
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Time Slot Detail Dialog */}
      <ScheduleDetail
        timeSlot={selectedTimeSlot}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSave={handleSaveTimeSlot}
        onDelete={handleDeleteTimeSlot}
      />
    </div>
  );
}
