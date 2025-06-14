"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Profile {
  id?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  timezone?: string;
  level?: number;
  total_points?: number;
  current_streak?: number;
  work_hours_start?: string;
  work_hours_end?: string;
  daily_goal_tasks?: number;
  daily_goal_points?: number;
}

interface ProfileFormProps {
  user: User;
  profile: Profile | null;
}

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    timezone: profile?.timezone || "America/New_York",
    work_hours_start: profile?.work_hours_start || "09:00",
    work_hours_end: profile?.work_hours_end || "17:00",
    daily_goal_tasks: profile?.daily_goal_tasks || 5,
    daily_goal_points: profile?.daily_goal_points || 100,
  });

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        ...formData,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            value={formData.timezone}
            onValueChange={(value) =>
              setFormData({ ...formData, timezone: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="work_hours_start">Work Hours Start</Label>
          <Input
            id="work_hours_start"
            type="time"
            value={formData.work_hours_start}
            onChange={(e) =>
              setFormData({ ...formData, work_hours_start: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="work_hours_end">Work Hours End</Label>
          <Input
            id="work_hours_end"
            type="time"
            value={formData.work_hours_end}
            onChange={(e) =>
              setFormData({ ...formData, work_hours_end: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="daily_goal_tasks">Daily Task Goal</Label>
          <Input
            id="daily_goal_tasks"
            type="number"
            min="1"
            max="50"
            value={formData.daily_goal_tasks}
            onChange={(e) =>
              setFormData({
                ...formData,
                daily_goal_tasks: Number.parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="daily_goal_points">Daily Points Goal</Label>
          <Input
            id="daily_goal_points"
            type="number"
            min="10"
            max="1000"
            step="10"
            value={formData.daily_goal_points}
            onChange={(e) =>
              setFormData({
                ...formData,
                daily_goal_points: Number.parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}
