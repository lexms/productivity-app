"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardCheck,
  Home,
  MoreHorizontal,
  Trophy,
  User,
  Users,
  Watch,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Primary navigation items (shown in bottom bar)
const primaryNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Check-in", href: "/checkin", icon: ClipboardCheck },
  { name: "More", href: "#more", icon: MoreHorizontal, isMore: true },
];

// Secondary navigation items (shown in More menu)
const secondaryNavigation = [
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Meetings", href: "/meetings", icon: Users },
  { name: "Wearables", href: "/wearables", icon: Watch },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

// All navigation items for desktop
const allNavigation = [
  ...primaryNavigation.filter((item) => !item.isMore),
  ...secondaryNavigation,
];

export function Navigation() {
  const pathname = usePathname();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  // Don't render navigation on auth pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth/")
  ) {
    return null;
  }

  // Don't render if still loading auth state
  if (loading) {
    return null;
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const getInitials = (email: string) => {
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Desktop Navigation - Icon Only with Tooltips */}
      <nav className="hidden md:flex flex-col fixed h-full w-16 bg-white border-r border-gray-200 z-30">
        <div className="p-4">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 pb-6 overflow-y-auto">
          <ul className="flex flex-col gap-3">
            {allNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-blue-100 text-blue-700 shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Avatar and Logout */}
        <div className="p-2 border-t border-gray-200">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/profile"
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 mb-2",
                    pathname === "/profile"
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.email || "U")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Profile
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <LogoutButton variant="ghost" size="sm" showText={false} />
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 gap-1">
          {primaryNavigation.map((item) => {
            const isActive = item.isMore ? false : pathname === item.href;

            // Special handling for More button
            if (item.isMore) {
              return (
                <Sheet
                  key={item.name}
                  open={moreMenuOpen}
                  onOpenChange={setMoreMenuOpen}
                >
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex flex-col items-center justify-center py-2 px-1 text-xs font-medium rounded-md transition-colors",
                        moreMenuOpen
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600",
                      )}
                    >
                      <item.icon className="h-5 w-5 mb-1" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="h-auto max-h-[70vh] pb-safe"
                  >
                    <SheetTitle className="sr-only">More Options</SheetTitle>
                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-4 px-2">
                        More Options
                      </h3>
                      <ul className="flex flex-col gap-1">
                        {secondaryNavigation.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                onClick={() => setMoreMenuOpen(false)}
                                className={cn(
                                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                  isSubActive
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                )}
                              >
                                <subItem.icon className="mr-3 h-5 w-5" />
                                {subItem.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Link
                          href="/profile"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 mb-2 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                user.user_metadata?.avatar_url ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(user.email || "U")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.email}
                            </p>
                          </div>
                        </Link>
                        <div className="px-4">
                          <LogoutButton variant="outline" size="sm" />
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              );
            }

            // Regular navigation items
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 text-xs font-medium rounded-md transition-colors",
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-600",
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
