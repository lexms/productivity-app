"use client";

import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface UserBadgeProps {
  icon: LucideIcon;
  value: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function UserBadge({
  icon: Icon,
  value,
  variant = "default",
}: UserBadgeProps) {
  return (
    <Badge variant={variant} className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
      <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
      {value}
    </Badge>
  );
}
