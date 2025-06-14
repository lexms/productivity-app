"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export function AiCoachCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          AI Productivity Coach
        </CardTitle>
        <CardDescription>
          Get personalized insights and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 mb-3">
            💡 <strong>Coach Tip:</strong> Your focus time peaks around 10 AM.
            Consider scheduling your most important tasks then!
          </p>
          <Button size="sm" variant="outline">
            Chat with Coach
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
