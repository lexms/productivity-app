"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { User } from "@supabase/supabase-js"
import { Calendar, Mail, MapPin } from "lucide-react"

interface ProfileHeaderProps {
  user: User
  profile: any
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User"

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} />
            <AvatarFallback className="text-lg">{getInitials(displayName)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              {profile?.timezone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{profile.timezone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Badge variant="secondary">Level {profile?.level || 1}</Badge>
              <Badge variant="outline">{profile?.total_points || 0} Points</Badge>
              {profile?.current_streak && profile.current_streak > 0 && (
                <Badge variant="default">{profile.current_streak} Day Streak</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
