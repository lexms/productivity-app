"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Globe,
  Medal,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export function Leaderboard() {
  const personalStats = {
    rank: 3,
    points: 2847,
    streak: 12,
    weeklyGoal: 3000,
    achievements: 24,
  };

  const teamLeaderboard = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 3245,
      streak: 18,
      rank: 1,
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2891,
      streak: 15,
      rank: 2,
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2847,
      streak: 12,
      rank: 3,
      isCurrentUser: true,
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2634,
      streak: 9,
      rank: 4,
    },
    {
      id: 5,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 2456,
      streak: 7,
      rank: 5,
    },
  ];

  const globalLeaderboard = [
    {
      id: 1,
      name: "ProductivityPro",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 8945,
      streak: 45,
      rank: 1,
    },
    {
      id: 2,
      name: "FocusedMind",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 8234,
      streak: 38,
      rank: 2,
    },
    {
      id: 3,
      name: "TaskMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7891,
      streak: 32,
      rank: 3,
    },
    {
      id: 4,
      name: "EfficiencyExpert",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7456,
      streak: 28,
      rank: 4,
    },
    {
      id: 5,
      name: "GoalGetter",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 7123,
      streak: 25,
      rank: 5,
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "Early Bird",
      description: "Complete morning check-in 7 days in a row",
      icon: "🌅",
      unlocked: true,
    },
    {
      id: 2,
      name: "Focus Master",
      description: "Maintain focus for 4+ hours in a day",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: 3,
      name: "Streak Warrior",
      description: "Maintain a 10-day completion streak",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: 4,
      name: "Task Crusher",
      description: "Complete 50 tasks in a week",
      icon: "💪",
      unlocked: false,
    },
    {
      id: 5,
      name: "Consistency King",
      description: "Complete daily goals for 30 days",
      icon: "👑",
      unlocked: false,
    },
    {
      id: 6,
      name: "Team Player",
      description: "Help 5 team members achieve their goals",
      icon: "🤝",
      unlocked: false,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-slate-600">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Leaderboard & Achievements
        </h2>
        <p className="text-slate-600">
          Track your progress and compete with others
        </p>
      </div>

      {/* Personal Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Performance
          </CardTitle>
          <CardDescription>Your current standing and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getRankIcon(personalStats.rank)}
              </div>
              <p className="text-2xl font-bold text-slate-900">
                #{personalStats.rank}
              </p>
              <p className="text-sm text-slate-600">Team Rank</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {personalStats.points}
              </p>
              <p className="text-sm text-slate-600">Total Points</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {personalStats.streak}
              </p>
              <p className="text-sm text-slate-600">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {personalStats.achievements}
              </p>
              <p className="text-sm text-slate-600">Achievements</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Weekly Goal Progress</span>
              <span>
                {personalStats.points}/{personalStats.weeklyGoal} points
              </span>
            </div>
            <Progress
              value={(personalStats.points / personalStats.weeklyGoal) * 100}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Global
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
              <CardDescription>Compete with your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamLeaderboard.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      user.isCurrentUser
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="ml-2">
                              You
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {user.points} points
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {user.streak} days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top performers worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalLeaderboard.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-white border-slate-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center">
                          {user.name}
                        </div>
                        <p className="text-sm text-slate-600">
                          {user.points} points
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {user.streak} days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center">
                <p className="text-sm text-slate-600 mb-2">Your Global Rank</p>
                <p className="text-2xl font-bold text-slate-900">#1,247</p>
                <p className="text-xs text-slate-500">Out of 50,000+ users</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>
                Unlock badges by completing challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`text-2xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`font-semibold ${achievement.unlocked ? "text-slate-900" : "text-slate-500"}`}
                          >
                            {achievement.name}
                          </h4>
                          {achievement.unlocked && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`text-sm ${achievement.unlocked ? "text-slate-600" : "text-slate-400"}`}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
