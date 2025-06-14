"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "pending" | "in-progress" | "completed" | "skipped";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    pending: "bg-slate-100 text-slate-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    skipped: "bg-gray-100 text-gray-800",
  };

  return <Badge className={colors[status]}>{status.replace("-", " ")}</Badge>;
}
