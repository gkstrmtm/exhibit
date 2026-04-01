import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Users ───────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  handle: varchar("handle", { length: 40 }).unique(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  avatarUrl: text("avatar_url"),
  oauthProvider: varchar("oauth_provider", { length: 20 }),
  oauthId: varchar("oauth_id", { length: 255 }),
  emailVerified: boolean("email_verified").notNull().default(false),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  founderOnboarded: boolean("founder_onboarded").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ─── Sessions ────────────────────────────────────────────
export const sessions = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

// ─── Creator Profiles ────────────────────────────────────
export const creatorProfiles = pgTable("creator_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  handle: varchar("handle", { length: 40 }).unique(),
  bio: text("bio").default(""),
  website: text("website").default(""),
  location: varchar("location", { length: 100 }).default(""),
  headline: varchar("headline", { length: 200 }).default(""),
  coverPhotoUrl: text("cover_photo_url").default(""),
  socialLinks: jsonb("social_links").default({}),
  skillTags: text("skill_tags").array().notNull().default(sql`'{}'::text[]`),
  stackTags: text("stack_tags").array().notNull().default(sql`'{}'::text[]`),
  hireAvailable: boolean("hire_available").notNull().default(false),
  availabilityStatus: varchar("availability_status", { length: 30 }).default("none"),
  preferredWorkType: varchar("preferred_work_type", { length: 50 }).default(""),
  timezone: varchar("timezone", { length: 50 }).default(""),
  rateCard: text("rate_card").default(""),
  signatureStampText: varchar("signature_stamp_text", { length: 40 }).default(""),
  signatureStampEnabled: boolean("signature_stamp_enabled").notNull().default(false),
  themeAccent: varchar("theme_accent", { length: 20 }).default("#2563eb"),
  showcaseLayout: varchar("showcase_layout", { length: 20 }).notNull().default("grid"),
  pinnedExhibitIds: integer("pinned_exhibit_ids").array().notNull().default(sql`'{}'::int[]`),
  creatorRole: varchar("creator_role", { length: 20 }).default("both"),
  level: integer("level").notNull().default(1),
  title: varchar("title", { length: 80 }).default("Newcomer"),
  profileStrength: integer("profile_strength").notNull().default(0),
  reputationScore: real("reputation_score").notNull().default(0),
  reliabilityScore: real("reliability_score").notNull().default(0),
  perksUnlocked: jsonb("perks_unlocked").notNull().default(sql`'[]'::jsonb`),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCreatorProfileSchema = createInsertSchema(creatorProfiles).omit({
  id: true,
  createdAt: true,
  reputationScore: true,
  reliabilityScore: true,
  level: true,
  title: true,
  profileStrength: true,
  perksUnlocked: true,
});
export type InsertCreatorProfile = z.infer<typeof insertCreatorProfileSchema>;
export type CreatorProfile = typeof creatorProfiles.$inferSelect;

// ─── Testimonials ───────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  profileUserId: integer("profile_user_id").notNull().references(() => users.id),
  authorId: integer("author_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  approved: true,
  createdAt: true,
});
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// ─── Reputation Signals ─────────────────────────────────
export const reputationSignals = pgTable("reputation_signals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  signalType: varchar("signal_type", { length: 40 }).notNull(),
  value: real("value").notNull().default(1),
  sourceId: integer("source_id"),
  sourceType: varchar("source_type", { length: 30 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Exhibits ────────────────────────────────────────────
export const exhibits = pgTable("exhibits", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  code: text("code").notNull(),
  htmlPreview: text("html_preview").notNull(),
  style: text("style").default(""),
  creatorId: integer("creator_id").references(() => users.id),
  techStack: text("tech_stack").array().notNull().default(sql`'{}'::text[]`),
  licenseType: varchar("license_type", { length: 30 }).notNull().default("free"),
  version: varchar("version", { length: 20 }).notNull().default("1.0.0"),
  parentExhibitId: integer("parent_exhibit_id"),
  viewCount: integer("view_count").notNull().default(0),
  saveCount: integer("save_count").notNull().default(0),
  remixCount: integer("remix_count").notNull().default(0),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  verified: boolean("verified").notNull().default(false),
  accessible: boolean("accessible").notNull().default(false),
  productionReady: boolean("production_ready").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertExhibitSchema = createInsertSchema(exhibits).omit({
  id: true,
  viewCount: true,
  saveCount: true,
  remixCount: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertExhibit = z.infer<typeof insertExhibitSchema>;
export type Exhibit = typeof exhibits.$inferSelect;

// ─── Exhibit Versions ────────────────────────────────────
export const exhibitVersions = pgTable("exhibit_versions", {
  id: serial("id").primaryKey(),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
  version: varchar("version", { length: 20 }).notNull(),
  code: text("code").notNull(),
  htmlPreview: text("html_preview").notNull(),
  changelog: text("changelog").default(""),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExhibitVersionSchema = createInsertSchema(exhibitVersions).omit({
  id: true,
  createdAt: true,
});
export type InsertExhibitVersion = z.infer<typeof insertExhibitVersionSchema>;
export type ExhibitVersion = typeof exhibitVersions.$inferSelect;

// ─── Collections ─────────────────────────────────────────
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").default(""),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
});
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = typeof collections.$inferSelect;

export const collectionItems = pgTable("collection_items", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull().references(() => collections.id),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const insertCollectionItemSchema = createInsertSchema(collectionItems).omit({
  id: true,
  addedAt: true,
});
export type InsertCollectionItem = z.infer<typeof insertCollectionItemSchema>;
export type CollectionItem = typeof collectionItems.$inferSelect;

// ─── Saves / Bookmarks ──────────────────────────────────
export const saves = pgTable("saves", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSaveSchema = createInsertSchema(saves).omit({
  id: true,
  createdAt: true,
});
export type InsertSave = z.infer<typeof insertSaveSchema>;
export type Save = typeof saves.$inferSelect;

// ─── Votes ───────────────────────────────────────────────
export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  exhibitId: integer("exhibit_id").references(() => exhibits.id),
  challengeEntryId: integer("challenge_entry_id"),
  value: integer("value").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  createdAt: true,
});
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

// ─── Challenges ──────────────────────────────────────────
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  rules: text("rules").default(""),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),
  votingEndAt: timestamp("voting_end_at").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("upcoming"),
  prizeDescription: text("prize_description").default(""),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true,
});
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;

export const challengeEntries = pgTable("challenge_entries", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
  userId: integer("user_id").notNull().references(() => users.id),
  score: real("score").notNull().default(0),
  rank: integer("rank"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChallengeEntrySchema = createInsertSchema(challengeEntries).omit({
  id: true,
  score: true,
  rank: true,
  createdAt: true,
});
export type InsertChallengeEntry = z.infer<typeof insertChallengeEntrySchema>;
export type ChallengeEntry = typeof challengeEntries.$inferSelect;

// ─── Badges ──────────────────────────────────────────────
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 10 }).notNull().default("🏅"),
  criteria: text("criteria").default(""),
});

export const exhibitBadges = pgTable("exhibit_badges", {
  id: serial("id").primaryKey(),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
  badgeId: integer("badge_id").notNull().references(() => badges.id),
  grantedBy: integer("granted_by").references(() => users.id),
  grantedAt: timestamp("granted_at").notNull().defaultNow(),
});

// ─── Marketplace Packs ───────────────────────────────────
export const packs = pgTable("packs", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull().default(0),
  licenseType: varchar("license_type", { length: 30 }).notNull().default("personal"),
  previewImageUrl: text("preview_image_url").default(""),
  documentation: text("documentation").default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPackSchema = createInsertSchema(packs).omit({
  id: true,
  downloadCount: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertPack = z.infer<typeof insertPackSchema>;
export type Pack = typeof packs.$inferSelect;

export const packItems = pgTable("pack_items", {
  id: serial("id").primaryKey(),
  packId: integer("pack_id").notNull().references(() => packs.id),
  exhibitId: integer("exhibit_id").notNull().references(() => exhibits.id),
});

// ─── Purchases ───────────────────────────────────────────
export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  packId: integer("pack_id").notNull().references(() => packs.id),
  priceCents: integer("price_cents").notNull(),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPurchaseSchema = createInsertSchema(purchases).omit({
  id: true,
  createdAt: true,
});
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Purchase = typeof purchases.$inferSelect;

// ─── Reports ─────────────────────────────────────────────
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  reporterId: integer("reporter_id").notNull().references(() => users.id),
  targetType: varchar("target_type", { length: 20 }).notNull(),
  targetId: integer("target_id").notNull(),
  category: varchar("category", { length: 30 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("open"),
  resolvedBy: integer("resolved_by").references(() => users.id),
  resolution: text("resolution").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  status: true,
  resolvedBy: true,
  resolution: true,
  createdAt: true,
  resolvedAt: true,
});
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

// ─── Audit Logs ──────────────────────────────────────────
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: varchar("action", { length: 50 }).notNull(),
  targetType: varchar("target_type", { length: 30 }).notNull(),
  targetId: integer("target_id"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Follows ─────────────────────────────────────────────
export const follows = pgTable("follows", {
  id: serial("id").primaryKey(),
  followerId: integer("follower_id").notNull().references(() => users.id),
  followingId: integer("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Scout / Hiring Requests ─────────────────────────────
export const scoutRequests = pgTable("scout_requests", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull().references(() => users.id),
  toUserId: integer("to_user_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  role: varchar("role", { length: 100 }).default(""),
  budgetRange: varchar("budget_range", { length: 50 }).default(""),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertScoutRequestSchema = createInsertSchema(scoutRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});
export type InsertScoutRequest = z.infer<typeof insertScoutRequestSchema>;
export type ScoutRequest = typeof scoutRequests.$inferSelect;

// ─── Blocks ──────────────────────────────────────────────
export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  blockerId: integer("blocker_id").notNull().references(() => users.id),
  blockedId: integer("blocked_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Validation schemas for auth ─────────────────────────
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const creatorOnboardingSchema = z.object({
  creatorRole: z.enum(["designer", "developer", "both"]),
  skillTags: z.array(z.string()).min(1).max(10),
  stackTags: z.array(z.string()).max(10).optional(),
  avatarUrl: z.string().optional(),
  coverPhotoUrl: z.string().optional(),
  themeAccent: z.string().optional(),
  signatureStampText: z.string().max(40).optional(),
  handle: z.string().min(2).max(40).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  headline: z.string().max(200).optional(),
  bio: z.string().optional(),
});

export const founderOnboardingSchema = z.object({
  buildingDescription: z.string().min(1),
  stylePreferences: z.array(z.string()).optional(),
  stackPreferences: z.array(z.string()).optional(),
  timelineRange: z.string().optional(),
  budgetRange: z.string().optional(),
});

export const profileUpdateSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  handle: z.string().min(2).max(40).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  avatarUrl: z.string().optional(),
  coverPhotoUrl: z.string().optional(),
  bio: z.string().optional(),
  headline: z.string().max(200).optional(),
  website: z.string().optional(),
  location: z.string().max(100).optional(),
  timezone: z.string().max(50).optional(),
  socialLinks: z.record(z.string()).optional(),
  skillTags: z.array(z.string()).max(10).optional(),
  stackTags: z.array(z.string()).max(10).optional(),
  hireAvailable: z.boolean().optional(),
  availabilityStatus: z.enum(["none", "open_to_work", "freelance", "collab"]).optional(),
  preferredWorkType: z.string().optional(),
  rateCard: z.string().optional(),
  signatureStampText: z.string().max(40).optional(),
  signatureStampEnabled: z.boolean().optional(),
  themeAccent: z.string().max(20).optional(),
  showcaseLayout: z.enum(["grid", "curated"]).optional(),
  pinnedExhibitIds: z.array(z.number()).max(6).optional(),
  creatorRole: z.enum(["designer", "developer", "both"]).optional(),
});
