import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Base table configuration with common columns
const baseTable = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
} as const;

// Users table
export const users = pgTable("users", {
  ...baseTable,
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  avatar: text("avatar"),
  timezone: varchar("timezone", { length: 50 }).default("UTC"),
  preferences: jsonb("preferences")
    .$type<{
      autoScheduling: boolean;
      deepWorkPreference: boolean;
      meetingBatching: boolean;
      notificationsEnabled: boolean;
      theme: "light" | "dark" | "system";
    }>()
    .default({
      autoScheduling: true,
      deepWorkPreference: true,
      meetingBatching: true,
      notificationsEnabled: true,
      theme: "system",
    }),
});

// Teams table for collaboration
export const teams = pgTable("teams", {
  ...baseTable,
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
});

// Team memberships
export const teamMembers = pgTable("team_members", {
  ...baseTable,
  teamId: uuid("team_id")
    .references(() => teams.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  role: varchar("role", { length: 50 }).default("member"), // 'owner', 'admin', 'member'
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: varchar("priority", { length: 10 }).default("medium"), // 'low', 'medium', 'high'
  status: varchar("status", { length: 20 }).default("pending"), // 'pending', 'in-progress', 'completed', 'skipped'
  category: varchar("category", { length: 100 }).default("General"),
  estimatedDuration: integer("estimated_duration"), // in minutes
  actualDuration: integer("actual_duration"), // in minutes
  points: integer("points").default(0),
  scheduledDate: date("scheduled_date"),
  dueDate: date("due_date"),
  completedAt: timestamp("completed_at"),
  tags: jsonb("tags").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<{
    timerActive?: boolean;
    timerSeconds?: number;
    convertedFromMeeting?: boolean;
    meetingId?: string;
  }>(),
});

// Subtasks
export const subtasks = pgTable("subtasks", {
  ...baseTable,
  taskId: uuid("task_id")
    .references(() => tasks.id)
    .notNull(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false),
  order: integer("order").default(0),
});

// Task comments
export const taskComments = pgTable("task_comments", {
  ...baseTable,
  taskId: uuid("task_id")
    .references(() => tasks.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  text: text("text").notNull(),
});

// Daily check-ins
export const dailyCheckins = pgTable("daily_checkins", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(),
  type: varchar("type", { length: 10 }).notNull(), // 'morning', 'evening'
  energy: integer("energy"), // 1-10 scale
  mood: integer("mood"), // 1-10 scale
  focus: integer("focus"), // 1-10 scale
  goals: text("goals"),
  priorities: text("priorities"),
  achievements: text("achievements"),
  challenges: text("challenges"),
  reflections: text("reflections"),
  gratitude: text("gratitude"),
  tomorrow: text("tomorrow"),
});

// Meetings
export const meetings = pgTable("meetings", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  date: date("date").notNull(),
  startTime: varchar("start_time", { length: 5 }).notNull(), // HH:MM format
  endTime: varchar("end_time", { length: 5 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  participants: jsonb("participants").$type<string[]>().default([]),
  status: varchar("status", { length: 20 }).default("pending"), // 'pending', 'analyzed', 'in-progress'
  efficiency: integer("efficiency"), // 0-100 percentage
  summary: text("summary"),
  keyPoints: jsonb("key_points").$type<string[]>().default([]),
  decisions: jsonb("decisions").$type<string[]>().default([]),
  transcript: text("transcript"),
  metrics: jsonb("metrics").$type<{
    speakingDistribution: Array<{ name: string; percentage: number }>;
    topicsDiscussed: Array<{ topic: string; duration: number }>;
    sentimentScore: number;
  }>(),
});

// Meeting action items
export const meetingActionItems = pgTable("meeting_action_items", {
  ...baseTable,
  meetingId: uuid("meeting_id")
    .references(() => meetings.id)
    .notNull(),
  text: text("text").notNull(),
  assignee: varchar("assignee", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // 'pending', 'completed'
  priority: varchar("priority", { length: 10 }).default("medium"), // 'low', 'medium', 'high'
  convertedToTask: boolean("converted_to_task").default(false),
  taskId: uuid("task_id").references(() => tasks.id),
});

// Wearable devices
export const wearableDevices = pgTable("wearable_devices", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'smartwatch', 'ring', 'fitness'
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  connected: boolean("connected").default(false),
  lastSync: timestamp("last_sync"),
  settings: jsonb("settings").$type<{
    syncFrequency: number; // in minutes
    dataTypes: string[];
  }>(),
});

// Wearable data
export const wearableData = pgTable("wearable_data", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  deviceId: uuid("device_id")
    .references(() => wearableDevices.id)
    .notNull(),
  date: date("date").notNull(),
  dataType: varchar("data_type", { length: 50 }).notNull(), // 'sleep', 'heart_rate', 'steps', 'stress', 'recovery'
  value: decimal("value", { precision: 10, scale: 2 }),
  metadata: jsonb("metadata").$type<{
    sleepStages?: {
      deep: number;
      light: number;
      rem: number;
    };
    heartRateZones?: {
      resting: number;
      fat_burn: number;
      cardio: number;
      peak: number;
    };
    stressLevels?: Array<{
      time: string;
      level: number;
      activity: string;
    }>;
  }>(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Schedule optimization
export const scheduleOptimizations = pgTable("schedule_optimizations", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(),
  schedule: jsonb("schedule")
    .$type<
      Array<{
        id: string;
        time: string;
        activity: string;
        type: string;
        priority: string;
        energy: number;
        reasoning: string;
      }>
    >()
    .notNull(),
  dataSourcesUsed: jsonb("data_sources_used")
    .$type<{
      tasks: boolean;
      meetings: boolean;
      checkins: boolean;
      wearables: boolean;
    }>()
    .default({
      tasks: true,
      meetings: true,
      checkins: true,
      wearables: false,
    }),
  optimizationScore: integer("optimization_score"), // 0-100
  adherenceScore: integer("adherence_score"), // 0-100, how well user followed the schedule
  feedback: text("feedback"),
});

// Habit patterns (derived data)
export const habitPatterns = pgTable("habit_patterns", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  patternType: varchar("pattern_type", { length: 50 }).notNull(), // 'energy', 'productivity', 'focus'
  timeframe: varchar("timeframe", { length: 20 }).notNull(), // 'daily', 'weekly', 'monthly'
  data: jsonb("data")
    .$type<{
      energyLevels?: Array<{
        timeRange: string;
        avgEnergy: number;
        activity: string;
        peak: string;
      }>;
      weeklyPatterns?: Record<
        string,
        {
          productivity: number;
          meetings: number;
          focusTime: number;
        }
      >;
      taskTypes?: Array<{
        type: string;
        optimalTime: string;
        efficiency: number;
        frequency: string;
      }>;
    }>()
    .notNull(),
  confidence: integer("confidence"), // 0-100, how confident we are in this pattern
  lastCalculated: timestamp("last_calculated").defaultNow().notNull(),
});

// Analytics data
export const analyticsData = pgTable("analytics_data", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(),
  metricType: varchar("metric_type", { length: 50 }).notNull(), // 'productivity', 'focus', 'tasks', 'meetings'
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  metadata: jsonb("metadata").$type<{
    breakdown?: Record<string, number>;
    trends?: Array<{ period: string; value: number }>;
    insights?: string[];
  }>(),
});

// Achievements and gamification
export const achievements = pgTable("achievements", {
  ...baseTable,
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 10 }).notNull(), // emoji
  category: varchar("category", { length: 50 }).notNull(),
  criteria: jsonb("criteria")
    .$type<{
      type: string; // 'streak', 'count', 'percentage'
      target: number;
      timeframe?: string;
    }>()
    .notNull(),
  points: integer("points").default(0),
  rarity: varchar("rarity", { length: 20 }).default("common"), // 'common', 'rare', 'epic', 'legendary'
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  achievementId: uuid("achievement_id")
    .references(() => achievements.id)
    .notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  progress: integer("progress").default(0), // for tracking partial progress
});

// Leaderboard entries
export const leaderboardEntries = pgTable("leaderboard_entries", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  teamId: uuid("team_id").references(() => teams.id),
  period: varchar("period", { length: 20 }).notNull(), // 'daily', 'weekly', 'monthly', 'all-time'
  metricType: varchar("metric_type", { length: 50 }).notNull(), // 'points', 'tasks_completed', 'streak'
  value: integer("value").notNull(),
  rank: integer("rank"),
  date: date("date").notNull(),
});

// Notifications
export const notifications = pgTable("notifications", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'task_reminder', 'meeting_reminder', 'achievement', 'insight'
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  data: jsonb("data").$type<{
    taskId?: string;
    meetingId?: string;
    achievementId?: string;
    actionUrl?: string;
  }>(),
  read: boolean("read").default(false),
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
});

// AI insights and recommendations
export const aiInsights = pgTable("ai_insights", {
  ...baseTable,
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'productivity_tip', 'schedule_optimization', 'habit_suggestion'
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  confidence: integer("confidence"), // 0-100
  dataPoints: jsonb("data_points").$type<string[]>().default([]), // what data was used to generate this insight
  actionable: boolean("actionable").default(false),
  implemented: boolean("implemented").default(false),
  feedback: varchar("feedback", { length: 20 }), // 'helpful', 'not_helpful', 'irrelevant'
  expiresAt: timestamp("expires_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  dailyCheckins: many(dailyCheckins),
  meetings: many(meetings),
  wearableDevices: many(wearableDevices),
  wearableData: many(wearableData),
  scheduleOptimizations: many(scheduleOptimizations),
  habitPatterns: many(habitPatterns),
  analyticsData: many(analyticsData),
  userAchievements: many(userAchievements),
  leaderboardEntries: many(leaderboardEntries),
  notifications: many(notifications),
  aiInsights: many(aiInsights),
  teamMemberships: many(teamMembers),
  ownedTeams: many(teams),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  owner: one(users, {
    fields: [teams.ownerId],
    references: [users.id],
  }),
  members: many(teamMembers),
  leaderboardEntries: many(leaderboardEntries),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
  subtasks: many(subtasks),
  comments: many(taskComments),
  meetingActionItem: one(meetingActionItems, {
    fields: [tasks.id],
    references: [meetingActionItems.taskId],
  }),
}));

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}));

export const taskCommentsRelations = relations(taskComments, ({ one }) => ({
  task: one(tasks, {
    fields: [taskComments.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [taskComments.userId],
    references: [users.id],
  }),
}));

export const dailyCheckinsRelations = relations(dailyCheckins, ({ one }) => ({
  user: one(users, {
    fields: [dailyCheckins.userId],
    references: [users.id],
  }),
}));

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
  user: one(users, {
    fields: [meetings.userId],
    references: [users.id],
  }),
  actionItems: many(meetingActionItems),
}));

export const meetingActionItemsRelations = relations(
  meetingActionItems,
  ({ one }) => ({
    meeting: one(meetings, {
      fields: [meetingActionItems.meetingId],
      references: [meetings.id],
    }),
    task: one(tasks, {
      fields: [meetingActionItems.taskId],
      references: [tasks.id],
    }),
  }),
);

export const wearableDevicesRelations = relations(
  wearableDevices,
  ({ one, many }) => ({
    user: one(users, {
      fields: [wearableDevices.userId],
      references: [users.id],
    }),
    data: many(wearableData),
  }),
);

export const wearableDataRelations = relations(wearableData, ({ one }) => ({
  user: one(users, {
    fields: [wearableData.userId],
    references: [users.id],
  }),
  device: one(wearableDevices, {
    fields: [wearableData.deviceId],
    references: [wearableDevices.id],
  }),
}));

export const scheduleOptimizationsRelations = relations(
  scheduleOptimizations,
  ({ one }) => ({
    user: one(users, {
      fields: [scheduleOptimizations.userId],
      references: [users.id],
    }),
  }),
);

export const habitPatternsRelations = relations(habitPatterns, ({ one }) => ({
  user: one(users, {
    fields: [habitPatterns.userId],
    references: [users.id],
  }),
}));

export const analyticsDataRelations = relations(analyticsData, ({ one }) => ({
  user: one(users, {
    fields: [analyticsData.userId],
    references: [users.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [userAchievements.userId],
      references: [users.id],
    }),
    achievement: one(achievements, {
      fields: [userAchievements.achievementId],
      references: [achievements.id],
    }),
  }),
);

export const leaderboardEntriesRelations = relations(
  leaderboardEntries,
  ({ one }) => ({
    user: one(users, {
      fields: [leaderboardEntries.userId],
      references: [users.id],
    }),
    team: one(teams, {
      fields: [leaderboardEntries.teamId],
      references: [teams.id],
    }),
  }),
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const aiInsightsRelations = relations(aiInsights, ({ one }) => ({
  user: one(users, {
    fields: [aiInsights.userId],
    references: [users.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type Meeting = typeof meetings.$inferSelect;
export type NewMeeting = typeof meetings.$inferInsert;
export type DailyCheckin = typeof dailyCheckins.$inferSelect;
export type NewDailyCheckin = typeof dailyCheckins.$inferInsert;
export type WearableDevice = typeof wearableDevices.$inferSelect;
export type NewWearableDevice = typeof wearableDevices.$inferInsert;
export type WearableData = typeof wearableData.$inferSelect;
export type NewWearableData = typeof wearableData.$inferInsert;
export type ScheduleOptimization = typeof scheduleOptimizations.$inferSelect;
export type NewScheduleOptimization = typeof scheduleOptimizations.$inferInsert;
export type HabitPattern = typeof habitPatterns.$inferSelect;
export type NewHabitPattern = typeof habitPatterns.$inferInsert;
export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type NewLeaderboardEntry = typeof leaderboardEntries.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type AIInsight = typeof aiInsights.$inferSelect;
export type NewAIInsight = typeof aiInsights.$inferInsert;
