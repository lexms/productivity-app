"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  Clock,
  Copy,
  Download,
  Edit,
  FileText,
  ListTodo,
  Mic,
  Save,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface MeetingDetailProps {
  meetingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingDetail({
  meetingId,
  open,
  onOpenChange,
}: MeetingDetailProps) {
  // Mock meeting data - in a real app, you would fetch this based on meetingId
  const [meeting, setMeeting] = useState({
    id: meetingId,
    title: "Q1 Project Planning",
    date: "2024-01-15",
    startTime: "10:00",
    endTime: "10:45",
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
      {
        id: "a4",
        text: "Draft initial project requirements",
        assignee: "Emma Davis",
        status: "pending",
        priority: "high",
        convertedToTask: false,
      },
    ],
    summary:
      "Discussed Q1 project goals and timeline. Team agreed on agile approach with 2-week sprints. Key challenges identified: resource constraints and tight deadline. Next steps include finalizing requirements and setting up project tracking.",
    keyPoints: [
      "Project deadline set for March 31st",
      "Budget approved at $75,000",
      "Need to hire one additional developer",
      "Weekly status updates required",
      "Client demo scheduled for February 15th",
    ],
    decisions: [
      "Use Agile methodology with 2-week sprints",
      "Sarah will be the project lead",
      "Development starts January 22nd",
      "Weekly team meetings on Mondays at 10 AM",
    ],
    transcript: `
Alex: Good morning everyone, thanks for joining our Q1 project planning session.
Sarah: Morning! I've prepared some initial thoughts on the timeline.
Alex: Great, let's start by discussing our main goals for Q1.
Mike: I think we should prioritize the new feature set we discussed last month.
Emma: Agreed, especially the reporting functionality that clients have been requesting.
Alex: Good point. Let's set a timeline for that. Sarah, what are your thoughts?
Sarah: I believe we can complete the core features by mid-February, which gives us time for testing before the end of Q1.
Mike: That seems ambitious. Do we have enough resources?
Alex: Valid concern. We might need to bring on another developer.
Emma: I can help with the UI design to speed things up.
Sarah: Thanks Emma. Let's plan for 2-week sprints, with our first milestone on January 29th.
Alex: Sounds good. Let's also discuss budget constraints...
[Meeting continues for 30 more minutes]
`,
    metrics: {
      speakingDistribution: [
        { name: "Alex Johnson", percentage: 35 },
        { name: "Sarah Chen", percentage: 28 },
        { name: "Mike Wilson", percentage: 22 },
        { name: "Emma Davis", percentage: 15 },
      ],
      topicsDiscussed: [
        { topic: "Timeline", duration: 12 },
        { topic: "Resources", duration: 8 },
        { topic: "Features", duration: 15 },
        { topic: "Budget", duration: 10 },
      ],
      sentimentScore: 78,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedMeeting, setEditedMeeting] = useState({ ...meeting });
  const [newActionItem, setNewActionItem] = useState({
    text: "",
    assignee: "",
    priority: "medium",
  });

  const handleSave = () => {
    setMeeting(editedMeeting);
    setIsEditing(false);
  };

  const handleAddActionItem = () => {
    if (!newActionItem.text || !newActionItem.assignee) return;

    const actionItem = {
      id: `a${Date.now()}`,
      text: newActionItem.text,
      assignee: newActionItem.assignee,
      status: "pending",
      priority: newActionItem.priority,
      convertedToTask: false,
    };

    setMeeting({
      ...meeting,
      actionItems: [...meeting.actionItems, actionItem],
    });

    setNewActionItem({
      text: "",
      assignee: "",
      priority: "medium",
    });
  };

  const toggleActionItemStatus = (actionItemId: string) => {
    setMeeting({
      ...meeting,
      actionItems: meeting.actionItems.map((item) =>
        item.id === actionItemId
          ? {
              ...item,
              status: item.status === "completed" ? "pending" : "completed",
            }
          : item,
      ),
    });
  };

  const convertToTask = (actionItemId: string) => {
    setMeeting({
      ...meeting,
      actionItems: meeting.actionItems.map((item) =>
        item.id === actionItemId ? { ...item, convertedToTask: true } : item,
      ),
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return "text-green-600";
    if (efficiency >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {isEditing ? "Edit Meeting" : meeting.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {!isEditing && (
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
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogDescription>
            {isEditing
              ? "Make changes to this meeting"
              : "Meeting details and analysis"}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Meeting Title
              </label>
              <Input
                id="title"
                value={editedMeeting.title}
                onChange={(e) =>
                  setEditedMeeting({ ...editedMeeting, title: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={editedMeeting.date}
                  onChange={(e) =>
                    setEditedMeeting({ ...editedMeeting, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Start Time
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={editedMeeting.startTime}
                  onChange={(e) =>
                    setEditedMeeting({
                      ...editedMeeting,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  End Time
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={editedMeeting.endTime}
                  onChange={(e) =>
                    setEditedMeeting({
                      ...editedMeeting,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="participants" className="text-sm font-medium">
                Participants (comma separated)
              </label>
              <Input
                id="participants"
                value={editedMeeting.participants.join(", ")}
                onChange={(e) =>
                  setEditedMeeting({
                    ...editedMeeting,
                    participants: e.target.value
                      .split(",")
                      .map((p) => p.trim()),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="summary" className="text-sm font-medium">
                Meeting Summary
              </label>
              <Textarea
                id="summary"
                value={editedMeeting.summary}
                onChange={(e) =>
                  setEditedMeeting({
                    ...editedMeeting,
                    summary: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="action-items">Action Items</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">
                    {formatDate(meeting.date)}
                  </span>
                  <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">
                    {meeting.startTime} - {meeting.endTime} ({meeting.duration}{" "}
                    min)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">
                    {meeting.participants.length} participants
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">
                    Meeting Summary
                  </h3>
                  <p className="text-sm text-slate-700 bg-white p-3 rounded-md border">
                    {meeting.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Key Points</h3>
                    <ul className="space-y-2">
                      {meeting.keyPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <div className="mt-1 min-w-[12px]">•</div>
                          <span className="text-sm text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Decisions Made
                    </h3>
                    <ul className="space-y-2">
                      {meeting.decisions.map((decision) => (
                        <li key={decision} className="flex items-start gap-2">
                          <div className="mt-1 min-w-[12px]">•</div>
                          <span className="text-sm text-slate-700">{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Participants</h3>
                  <div className="flex flex-wrap gap-2">
                    {meeting.participants.map((participant) => (
                      <Badge key={participant} variant="outline">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Meeting Efficiency
                  </h3>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">
                      Overall Score
                    </span>
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
            </TabsContent>

            <TabsContent value="action-items" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    Add New Action Item
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="action-text"
                        className="text-xs font-medium text-blue-800"
                      >
                        Action Item
                      </label>
                      <Input
                        id="action-text"
                        placeholder="Enter action item..."
                        value={newActionItem.text}
                        onChange={(e) =>
                          setNewActionItem({
                            ...newActionItem,
                            text: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="assignee"
                          className="text-xs font-medium text-blue-800"
                        >
                          Assignee
                        </label>
                        <Input
                          id="assignee"
                          placeholder="Who is responsible?"
                          value={newActionItem.assignee}
                          onChange={(e) =>
                            setNewActionItem({
                              ...newActionItem,
                              assignee: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="priority"
                          className="text-xs font-medium text-blue-800"
                        >
                          Priority
                        </label>
                        <select
                          id="priority"
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          value={newActionItem.priority}
                          onChange={(e) =>
                            setNewActionItem({
                              ...newActionItem,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={handleAddActionItem} className="w-full">
                      Add Action Item
                    </Button>
                  </div>
                </div>

                <h3 className="text-sm font-semibold">
                  Action Items ({meeting.actionItems.length})
                </h3>
                <div className="space-y-3">
                  {meeting.actionItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-3 rounded-md bg-white border"
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <Checkbox
                            checked={item.status === "completed"}
                            onCheckedChange={() =>
                              toggleActionItemStatus(item.id)
                            }
                          />
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
                          onClick={() => convertToTask(item.id)}
                        >
                          <ListTodo className="w-3 h-3 mr-1" />
                          Convert to Task
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-600">
                    Completion Progress
                  </span>
                  <span className="text-sm font-medium">
                    {
                      meeting.actionItems.filter(
                        (item) => item.status === "completed",
                      ).length
                    }
                    /{meeting.actionItems.length}
                  </span>
                </div>
                <Progress
                  value={
                    (meeting.actionItems.filter(
                      (item) => item.status === "completed",
                    ).length /
                      meeting.actionItems.length) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Meeting Transcript</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border overflow-auto max-h-[400px]">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">
                  {meeting.transcript}
                </pre>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This transcript was automatically
                  generated and may contain errors. You can edit it by clicking
                  the Edit button above.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Speaking Distribution
                  </h3>
                  <div className="space-y-3">
                    {meeting.metrics.speakingDistribution.map((person) => (
                      <div key={person.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{person.name}</span>
                          <span>{person.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${person.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Topics Discussed
                  </h3>
                  <div className="space-y-3">
                    {meeting.metrics.topicsDiscussed.map((topic) => (
                      <div key={topic.topic}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{topic.topic}</span>
                          <span>{topic.duration} min</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(topic.duration / 60) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3">
                  Meeting Sentiment
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative">
                    <div
                      className="absolute w-4 h-4 bg-white rounded-full transform -translate-y-1/2"
                      style={{
                        left: `${meeting.metrics.sentimentScore}%`,
                        top: "50%",
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {meeting.metrics.sentimentScore}/100
                    </p>
                    <p className="text-sm text-slate-600">
                      Overall Positive Sentiment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">
                  Meeting Efficiency Insights
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-[12px]">•</div>
                    <span>
                      This meeting was <strong>12% more efficient</strong> than
                      your average meetings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-[12px]">•</div>
                    <span>
                      <strong>Speaking balance</strong> was better than 75% of
                      your meetings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-[12px]">•</div>
                    <span>
                      <strong>Action item clarity</strong> was excellent (4.5/5)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-[12px]">•</div>
                    <span>
                      Meeting could have been <strong>5 minutes shorter</strong>{" "}
                      based on content
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Meeting Summary</h3>
                      <p className="text-sm text-slate-600">
                        Concise overview with key points
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Summary
                  </Button>
                </div>

                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckSquare className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-medium">Action Items</h3>
                      <p className="text-sm text-slate-600">
                        List of tasks and assignments
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Action Items
                  </Button>
                </div>

                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Mic className="w-8 h-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Full Transcript</h3>
                      <p className="text-sm text-slate-600">
                        Complete meeting conversation
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Transcript
                  </Button>
                </div>

                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="font-medium">Meeting Analytics</h3>
                      <p className="text-sm text-slate-600">
                        Detailed metrics and insights
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Share Meeting</h3>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter email addresses..."
                    className="flex-1"
                  />
                  <Button>Share</Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Recipients will receive a link to view this meeting summary
                  and action items
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
