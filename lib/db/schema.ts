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
  pgEnum,
} from "drizzle-orm/pg-core";

// Base table configuration with common columns
const baseTable = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
} as const;

/**
 * Users
 */
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

/**
 * Checkin types
 */
export const checkinType = pgEnum("checkinType", ["morning", "evening"]);
type Scale1To10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const dailyCheckins = pgTable("dailyCheckins", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  type: checkinType("type").notNull(),
  energy: integer("energy").$type<Scale1To10>(),
  mood: integer("mood").$type<Scale1To10>(),
  focus: integer("focus").$type<Scale1To10>(),
});

/**
 * Tasks
 */
export const taskStatus = pgEnum("taskStatus", [
  "pending",
  "inProgress",
  "completed",
  "skipped",
]);

export const taskPriority = pgEnum("taskPriority", ["low", "medium", "high"]);

export const taskCategory = pgEnum("taskCategory", [
  "work",
  "personal",
  "health",
  "finance",
  "shopping",
  "education",
  "home",
  "projects",
  "meetings",
  "family",
  "travel",
  "fitness",
  "hobbies",
  "social",
  "reading",
  "entertainment",
]);

export const tasks = pgTable("tasks", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: taskPriority("priority").default("medium"),
  status: taskStatus("status").default("pending"),
  category: taskCategory("category").default("work"),
  dueDate: date("dueDate"),
  completedAt: timestamp("completedAt"),
});

/**
 * Meetings
 */
export const meetings = pgTable("meetings", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  startTime: varchar("startTime", { length: 5 }).notNull(),
  endTime: varchar("endTime", { length: 5 }).notNull(),
  duration: integer("duration").notNull(),
  participants: jsonb("participants").$type<string[]>().default([]),
  efficiency: integer("efficiency"),
  summary: text("summary"),
  keyPoints: jsonb("keyPoints").$type<string[]>().default([]),
  decisions: jsonb("decisions").$type<string[]>().default([]),
  transcript: text("transcript"),
  metrics: jsonb("metrics").$type<{
    speakingDistribution: Array<{ name: string; percentage: number }>;
    topicsDiscussed: Array<{ topic: string; duration: number }>;
    sentimentScore: number;
  }>(),
});

/**
 * Meeting action items
 */
export const meetingActionItems = pgTable("meetingActionItems", {
  ...baseTable,
  meetingId: uuid("meetingId")
    .references(() => meetings.id)
    .notNull(),
  text: text("text").notNull(),
  priority: taskPriority("priority").default("medium"),
  convertedToTask: boolean("convertedToTask").default(false),
  taskId: uuid("taskId").references(() => tasks.id),
});

export const wearableBrand = pgEnum("wearableBrand", [
  "whoop",
  "garmin",
  "appleWatch",
]);

/**
 * Wearable devices
 */
export const wearableDevices = pgTable("wearableDevices", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  brand: wearableBrand("brand").notNull(),
  model: varchar("model", { length: 100 }),
  lastSync: timestamp("lastSync"),
});

/**
 * Wearable data
 */
export const wearableData = pgTable("wearableData", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  deviceId: uuid("deviceId")
    .references(() => wearableDevices.id)
    .notNull(),
  metadata: jsonb("metadata").$type<{
    // WHOOP-specific sleep data
    whoopSleep?: {
      totalInBedTimeMilli: number;
      totalLightSleepTimeMilli: number;
      totalSlowWaveSleepTimeMilli: number;
      totalRemSleepTimeMilli: number;
      sleepPerformancePercentage: number;
      sleepEfficiencyPercentage: number;
    };

    // WHOOP-specific recovery data
    whoopRecovery?: {
      recoveryScore: number;
      restingHeartRate: number;
      hrvRmssdMilli: number;
    };

    // WHOOP-specific strain/cycle data
    whoopStrain?: {
      strain: number;
      averageHeartRate: number;
    };

    // Garmin-specific data
    garmin?: {
      steps: number;
      distance: number;
      calories: number;
      floors: number;
    };

    // Apple Watch-specific data
    appleWatch?: {
      steps: number;
      distance: number;
      calories: number;
      floors: number;
    };
  }>(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

/**
 * Schedule optimization
 */
export const scheduleOptimizations = pgTable("scheduleOptimizations", {
  ...baseTable,
  userId: uuid("userId")
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
  dataSourcesUsed: jsonb("dataSourcesUsed")
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
  optimizationScore: integer("optimizationScore"),
  adherenceScore: integer("adherenceScore"),
  feedback: text("feedback"),
  // Additional metrics for frontend support
  deepWorkTime: decimal("deepWorkTime", { precision: 4, scale: 2 }),
  meetingEfficiency: integer("meetingEfficiency"),
  energyAlignment: integer("energyAlignment"),
  actualAdherence: integer("actualAdherence"),
});

/**
 * Habit patterns (derived data)
 */
export const habitPatterns = pgTable("habitPatterns", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  patternType: varchar("patternType", { length: 50 }).notNull(),
  timeframe: varchar("timeframe", { length: 20 }).notNull(),
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
  confidence: integer("confidence"),
  lastCalculated: timestamp("lastCalculated").defaultNow().notNull(),
});

/**
 * Analytics data
 */
export const analyticsData = pgTable("analyticsData", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(),
  metricType: varchar("metricType", { length: 50 }).notNull(),
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  metadata: jsonb("metadata").$type<{
    breakdown?: Record<string, number>;
    trends?: Array<{ period: string; value: number }>;
    insights?: string[];
  }>(),
});

/**
 * Daily productivity summary for analytics
 */
export const dailyProductivity = pgTable("dailyProductivity", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(),
  tasksCompleted: integer("tasksCompleted").default(0),
  totalTasks: integer("totalTasks").default(0),
  focusTimeHours: decimal("focusTimeHours", { precision: 4, scale: 2 }).default(
    "0",
  ),
  efficiency: integer("efficiency").default(0),
  streakDays: integer("streakDays").default(0),
  pointsEarned: integer("pointsEarned").default(0),
  categoryBreakdown:
    jsonb("categoryBreakdown").$type<
      Record<string, { completed: number; total: number }>
    >(),
});

/**
 * AI insights and recommendations
 */
export const aiInsights = pgTable("aiInsights", {
  ...baseTable,
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  confidence: integer("confidence"),
  dataPoints: jsonb("dataPoints").$type<string[]>().default([]),
  actionable: boolean("actionable").default(false),
  implemented: boolean("implemented").default(false),
  feedback: varchar("feedback", { length: 20 }),
  expiresAt: timestamp("expiresAt"),
});

/**
 * Relations
 */
export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  dailyCheckins: many(dailyCheckins),
  meetings: many(meetings),
  wearableDevices: many(wearableDevices),
  wearableData: many(wearableData),
  scheduleOptimizations: many(scheduleOptimizations),
  habitPatterns: many(habitPatterns),
  analyticsData: many(analyticsData),
  dailyProductivity: many(dailyProductivity),
  aiInsights: many(aiInsights),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
  meetingActionItem: one(meetingActionItems, {
    fields: [tasks.id],
    references: [meetingActionItems.taskId],
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

export const dailyProductivityRelations = relations(
  dailyProductivity,
  ({ one }) => ({
    user: one(users, {
      fields: [dailyProductivity.userId],
      references: [users.id],
    }),
  }),
);

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
export type DailyProductivity = typeof dailyProductivity.$inferSelect;
export type NewDailyProductivity = typeof dailyProductivity.$inferInsert;
export type AnalyticsData = typeof analyticsData.$inferSelect;
export type NewAnalyticsData = typeof analyticsData.$inferInsert;
export type AIInsight = typeof aiInsights.$inferSelect;
export type NewAIInsight = typeof aiInsights.$inferInsert;
