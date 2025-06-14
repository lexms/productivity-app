"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Clock,
  FileAudio,
  FileText,
  FileTextIcon,
  ListTodo,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Plus,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: string[];
  status: "analyzed" | "pending" | "in-progress";
  efficiency: number;
  actionItems: ActionItem[];
  summary: string;
  transcript?: string;
}

interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  convertedToTask: boolean;
}

export function MeetingManagement() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Q1 Project Planning",
      date: "2024-01-15",
      duration: 45,
      participants: ["Alex Johnson", "Sarah Chen", "Mike Wilson", "Emma Davis"],
      status: "analyzed",
      efficiency: 87,
      actionItems: [
        {
          id: "a1",
          text: "Create project timeline document by Friday",
          assignee: "Alex Johnson",
          status: "pending",
          priority: "high",
          convertedToTask: true,
        },
        {
          id: "a2",
          text: "Schedule follow-up meeting with design team",
          assignee: "Sarah Chen",
          status: "completed",
          priority: "medium",
          convertedToTask: true,
        },
        {
          id: "a3",
          text: "Research competitor products and compile findings",
          assignee: "Mike Wilson",
          status: "pending",
          priority: "medium",
          convertedToTask: false,
        },
      ],
      summary:
        "Discussed Q1 project goals and timeline. Team agreed on agile approach with 2-week sprints. Key challenges identified: resource constraints and tight deadline. Next steps include finalizing requirements and setting up project tracking.",
    },
    {
      id: "2",
      title: "Weekly Team Standup",
      date: "2024-01-17",
      duration: 25,
      participants: [
        "Alex Johnson",
        "Sarah Chen",
        "Mike Wilson",
        "Emma Davis",
        "David Lee",
      ],
      status: "analyzed",
      efficiency: 92,
      actionItems: [
        {
          id: "a4",
          text: "Fix bug in login flow",
          assignee: "Emma Davis",
          status: "pending",
          priority: "high",
          convertedToTask: true,
        },
        {
          id: "a5",
          text: "Share updated analytics dashboard with team",
          assignee: "David Lee",
          status: "pending",
          priority: "low",
          convertedToTask: false,
        },
      ],
      summary:
        "Quick progress updates from all team members. Emma reported login issues affecting some users. David completed the analytics dashboard. All other projects on track. No major blockers identified.",
    },
    {
      id: "3",
      title: "Client Feedback Session",
      date: "2024-01-18",
      duration: 60,
      participants: [
        "Alex Johnson",
        "Sarah Chen",
        "Client: John Smith",
        "Client: Lisa Wong",
      ],
      status: "pending",
      efficiency: 0,
      actionItems: [],
      summary: "",
    },
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"transcript" | "recording">(
    "transcript",
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setUploadDialogOpen(false);
      setUploadFile(null);

      // Update the meeting with mock analysis results
      if (selectedMeeting) {
        const updatedMeetings = meetings.map((meeting) => {
          if (meeting.id === selectedMeeting.id) {
            return {
              ...meeting,
              status: "analyzed" as const,
              efficiency: 78,
              actionItems: [
                ...meeting.actionItems,
                {
                  id: `a${Date.now()}`,
                  text: "Update client on new feature timeline",
                  assignee: "Alex Johnson",
                  status: "pending",
                  priority: "high",
                  convertedToTask: false,
                },
                {
                  id: `a${Date.now() + 1}`,
                  text: "Revise design based on client feedback",
                  assignee: "Sarah Chen",
                  status: "pending",
                  priority: "medium",
                  convertedToTask: false,
                },
              ],
              summary:
                "Client provided feedback on the latest prototype. They liked the overall direction but requested changes to the navigation and color scheme. Timeline concerns were raised regarding the delivery of the reporting feature. Team committed to providing an updated timeline by next week.",
            };
          }
          return meeting;
        });
        setMeetings(updatedMeetings);
      }
    }, 3000);
  };

  const handleConvertToTask = (meetingId: string, actionItemId: string) => {
    const updatedMeetings = meetings.map((meeting) => {
      if (meeting.id === meetingId) {
        const updatedActionItems = meeting.actionItems.map((item) => {
          if (item.id === actionItemId) {
            return { ...item, convertedToTask: true };
          }
          return item;
        });
        return { ...meeting, actionItems: updatedActionItems };
      }
      return meeting;
    });
    setMeetings(updatedMeetings);
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return "text-green-600";
    if (efficiency >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 85) return "bg-green-100 text-green-800";
    if (efficiency >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-2 py-1">
            <FileText className="w-3 h-3 mr-1" />
            {meetings.length} Meetings
          </Badge>
          <Badge variant="outline" className="px-2 py-1">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {meetings.filter((m) => m.status === "analyzed").length} Analyzed
          </Badge>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Meeting</DialogTitle>
              <DialogDescription>
                Create a new meeting record to analyze later
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input id="title" placeholder="Enter meeting title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input id="duration" type="number" placeholder="30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Participants</Label>
                <Input
                  id="participants"
                  placeholder="Enter names separated by commas"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Meeting</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Meetings</TabsTrigger>
          <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
          <TabsTrigger value="pending">Pending Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onSelect={() => setSelectedMeeting(meeting)}
              onUpload={() => {
                setSelectedMeeting(meeting);
                setUploadDialogOpen(true);
              }}
              onConvertToTask={handleConvertToTask}
              getEfficiencyColor={getEfficiencyColor}
              getEfficiencyBadge={getEfficiencyBadge}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="analyzed" className="space-y-4">
          {meetings
            .filter((m) => m.status === "analyzed")
            .map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onSelect={() => setSelectedMeeting(meeting)}
                onUpload={() => {
                  setSelectedMeeting(meeting);
                  setUploadDialogOpen(true);
                }}
                onConvertToTask={handleConvertToTask}
                getEfficiencyColor={getEfficiencyColor}
                getEfficiencyBadge={getEfficiencyBadge}
                getPriorityColor={getPriorityColor}
              />
            ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {meetings
            .filter((m) => m.status !== "analyzed")
            .map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onSelect={() => setSelectedMeeting(meeting)}
                onUpload={() => {
                  setSelectedMeeting(meeting);
                  setUploadDialogOpen(true);
                }}
                onConvertToTask={handleConvertToTask}
                getEfficiencyColor={getEfficiencyColor}
                getEfficiencyBadge={getEfficiencyBadge}
                getPriorityColor={getPriorityColor}
              />
            ))}
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Meeting Content</DialogTitle>
            <DialogDescription>
              Upload a transcript or recording to analyze and extract action
              items
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex space-x-2">
              <Button
                variant={uploadType === "transcript" ? "default" : "outline"}
                onClick={() => setUploadType("transcript")}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                Transcript
              </Button>
              <Button
                variant={uploadType === "recording" ? "default" : "outline"}
                onClick={() => setUploadType("recording")}
                className="flex-1"
              >
                <Mic className="w-4 h-4 mr-2" />
                Recording
              </Button>
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {uploadFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    {uploadType === "transcript" ? (
                      <FileTextIcon className="h-8 w-8 text-blue-500" />
                    ) : (
                      <FileAudio className="h-8 w-8 text-purple-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium">{uploadFile.name}</p>
                  <p className="text-xs text-slate-500">
                    {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drag and drop your{" "}
                      {uploadType === "transcript"
                        ? "transcript file"
                        : "audio recording"}{" "}
                      or click to browse
                    </p>
                    <p className="text-xs text-slate-500">
                      {uploadType === "transcript"
                        ? "Supports TXT, DOCX, PDF (max 10MB)"
                        : "Supports MP3, WAV, M4A (max 50MB)"}
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept={
                        uploadType === "transcript"
                          ? ".txt,.docx,.pdf"
                          : "audio/mp3,audio/wav,audio/m4a"
                      }
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        type="button"
                      >
                        Browse Files
                      </Button>
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!uploadFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full" />
                  Analyzing...
                </>
              ) : (
                <>Upload & Analyze</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MeetingCardProps {
  meeting: Meeting;
  onSelect?: () => void;
  onUpload: () => void;
  onConvertToTask: (meetingId: string, actionItemId: string) => void;
  getEfficiencyColor: (efficiency: number) => string;
  getEfficiencyBadge: (efficiency: number) => string;
  getPriorityColor: (priority: string) => string;
}

function MeetingCard({
  meeting,
  onSelect,
  onUpload,
  onConvertToTask,
  getEfficiencyColor,
  getEfficiencyBadge,
  getPriorityColor,
}: MeetingCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{meeting.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3" />
              {formatDate(meeting.date)}
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
              <Clock className="w-3 h-3" />
              {meeting.duration} min
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
              <Users className="w-3 h-3" />
              {meeting.participants.length} participants
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {meeting.status === "analyzed" ? (
              <Badge className={getEfficiencyBadge(meeting.efficiency)}>
                <BarChart3 className="w-3 h-3 mr-1" />
                {meeting.efficiency}% Efficient
              </Badge>
            ) : (
              <Badge variant="outline">Pending Analysis</Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {meeting.status !== "analyzed" && (
                  <DropdownMenuItem onClick={onUpload}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Transcript
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {meeting.status === "analyzed" && (
        <CardContent className="pb-3">
          <div className="space-y-4">
            {/* Summary */}
            <div>
              <h4 className="text-sm font-semibold mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-1" /> Meeting Summary
              </h4>
              <p className="text-sm text-slate-600">{meeting.summary}</p>
            </div>

            {/* Action Items */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <CheckSquare className="w-4 h-4 mr-1" /> Action Items (
                {meeting.actionItems.length})
              </h4>
              <div className="space-y-2">
                {expanded
                  ? meeting.actionItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-2 rounded-md bg-slate-50 border"
                      >
                        <div className="flex items-start gap-2">
                          <div className="pt-0.5">
                            {item.status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <CheckSquare className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-sm ${
                                item.status === "completed"
                                  ? "line-through text-slate-500"
                                  : "text-slate-900"
                              }`}
                            >
                              {item.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs py-0 px-1"
                              >
                                {item.assignee}
                              </Badge>
                              <Badge
                                className={`text-xs py-0 px-1 ${getPriorityColor(item.priority)}`}
                              >
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {!item.convertedToTask && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() => onConvertToTask(meeting.id, item.id)}
                          >
                            <ListTodo className="w-3 h-3 mr-1" />
                            Convert to Task
                          </Button>
                        )}
                      </div>
                    ))
                  : meeting.actionItems.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-2 rounded-md bg-slate-50 border"
                      >
                        <div className="flex items-start gap-2">
                          <div className="pt-0.5">
                            {item.status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <CheckSquare className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-sm ${
                                item.status === "completed"
                                  ? "line-through text-slate-500"
                                  : "text-slate-900"
                              }`}
                            >
                              {item.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs py-0 px-1"
                              >
                                {item.assignee}
                              </Badge>
                              <Badge
                                className={`text-xs py-0 px-1 ${getPriorityColor(item.priority)}`}
                              >
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {!item.convertedToTask && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() => onConvertToTask(meeting.id, item.id)}
                          >
                            <ListTodo className="w-3 h-3 mr-1" />
                            Convert to Task
                          </Button>
                        )}
                      </div>
                    ))}

                {meeting.actionItems.length > 2 && !expanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setExpanded(true)}
                  >
                    Show {meeting.actionItems.length - 2} more action items
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                )}

                {expanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setExpanded(false)}
                  >
                    Show less
                  </Button>
                )}
              </div>
            </div>

            {/* Meeting Efficiency */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" /> Meeting Efficiency
                </h4>
                <span
                  className={`text-sm font-medium ${getEfficiencyColor(meeting.efficiency)}`}
                >
                  {meeting.efficiency}%
                </span>
              </div>
              <Progress value={meeting.efficiency} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="pt-0">
        {meeting.status === "analyzed" ? (
          <div className="w-full flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <FileText className="w-4 h-4 mr-1" />
              View Transcript
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ListTodo className="w-4 h-4 mr-1" />
              Convert All to Tasks
            </Button>
          </div>
        ) : (
          <Button onClick={onUpload} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Upload & Analyze
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
