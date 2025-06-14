import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardCheck,
  Home,
  MoreHorizontal,
  Trophy,
  Users,
  Watch,
} from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  isMore?: boolean;
}

// Primary navigation items (shown in bottom bar and main navigation)
export const primaryNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "More", href: "#more", icon: MoreHorizontal, isMore: true },
];

// Secondary navigation items (shown in More menu and desktop sidebar)
export const secondaryNavigation: NavigationItem[] = [
  { name: "Check-in", href: "/checkin", icon: ClipboardCheck },
  { name: "Meetings", href: "/meetings", icon: Users },
  { name: "Wearables", href: "/wearables", icon: Watch },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

// All navigation items for desktop view
export const allNavigation: NavigationItem[] = [
  ...primaryNavigation.filter((item) => !item.isMore),
  ...secondaryNavigation,
];

// Helper function to get user initials
export const getInitials = (email: string) => {
  return email.split("@")[0].slice(0, 2).toUpperCase();
};
