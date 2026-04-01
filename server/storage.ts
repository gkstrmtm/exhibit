import {
  type Exhibit, type InsertExhibit, exhibits,
  type User, type InsertUser, users,
  type CreatorProfile, type InsertCreatorProfile, creatorProfiles,
  type Collection, type InsertCollection, collections,
  type InsertCollectionItem, collectionItems,
  type Save, type InsertSave, saves,
  type Vote, type InsertVote, votes,
  type Challenge, type InsertChallenge, challenges,
  type ChallengeEntry, type InsertChallengeEntry, challengeEntries,
  type Pack, type InsertPack, packs,
  packItems,
  type Purchase, type InsertPurchase, purchases,
  type Report, type InsertReport, reports,
  type ScoutRequest, type InsertScoutRequest, scoutRequests,
  type ExhibitVersion, type InsertExhibitVersion, exhibitVersions,
  type Testimonial, type InsertTestimonial, testimonials,
  reputationSignals,
  follows, blocks, auditLogs, badges, exhibitBadges,
} from "@shared/schema";
import { eq, ilike, or, sql, and, desc, asc, inArray, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export interface IStorage {
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;

  // Creator Profiles
  getCreatorProfile(userId: number): Promise<CreatorProfile | undefined>;
  upsertCreatorProfile(profile: InsertCreatorProfile): Promise<CreatorProfile>;
  getCreatorProfiles(filters?: { skills?: string[]; available?: boolean }): Promise<(CreatorProfile & { user: Pick<User, "id" | "displayName" | "avatarUrl"> })[]>;

  // Exhibits
  getAllExhibits(): Promise<Exhibit[]>;
  getExhibitById(id: number): Promise<Exhibit | undefined>;
  getExhibitBySlug(slug: string): Promise<Exhibit | undefined>;
  getExhibitsByCategory(category: string): Promise<Exhibit[]>;
  getExhibitsByCreator(creatorId: number): Promise<Exhibit[]>;
  searchExhibits(query: string): Promise<Exhibit[]>;
  createExhibit(exhibit: InsertExhibit): Promise<Exhibit>;
  updateExhibit(id: number, data: Partial<InsertExhibit>): Promise<Exhibit | undefined>;
  deleteExhibit(id: number): Promise<boolean>;
  incrementViewCount(id: number): Promise<void>;
  getCategories(): Promise<string[]>;
  getExhibitRemixes(parentId: number): Promise<Exhibit[]>;

  // Exhibit Versions
  createExhibitVersion(version: InsertExhibitVersion): Promise<ExhibitVersion>;
  getExhibitVersions(exhibitId: number): Promise<ExhibitVersion[]>;

  // Collections
  createCollection(collection: InsertCollection): Promise<Collection>;
  getUserCollections(userId: number): Promise<Collection[]>;
  getCollectionWithItems(id: number): Promise<{ collection: Collection; items: Exhibit[] } | undefined>;
  addToCollection(item: InsertCollectionItem): Promise<void>;
  removeFromCollection(collectionId: number, exhibitId: number): Promise<void>;
  deleteCollection(id: number): Promise<boolean>;

  // Saves
  saveExhibit(save: InsertSave): Promise<Save>;
  unsaveExhibit(userId: number, exhibitId: number): Promise<void>;
  getUserSaves(userId: number): Promise<Exhibit[]>;
  isExhibitSaved(userId: number, exhibitId: number): Promise<boolean>;

  // Votes
  voteOnExhibit(vote: InsertVote): Promise<Vote>;
  removeVote(userId: number, exhibitId: number): Promise<void>;
  getExhibitVoteCount(exhibitId: number): Promise<number>;

  // Challenges
  getChallenges(status?: string): Promise<Challenge[]>;
  getChallengeById(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  submitChallengeEntry(entry: InsertChallengeEntry): Promise<ChallengeEntry>;
  getChallengeEntries(challengeId: number): Promise<(ChallengeEntry & { exhibit: Exhibit })[]>;

  // Packs
  createPack(pack: InsertPack): Promise<Pack>;
  getPacks(filters?: { status?: string }): Promise<Pack[]>;
  getPackById(id: number): Promise<Pack | undefined>;
  getPackBySlug(slug: string): Promise<Pack | undefined>;
  addPackItem(packId: number, exhibitId: number): Promise<void>;
  getPackItems(packId: number): Promise<Exhibit[]>;

  // Purchases
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  updatePurchaseStatus(id: number, status: string, stripePaymentIntentId?: string): Promise<void>;
  getUserPurchases(userId: number): Promise<(Purchase & { pack: Pack })[]>;
  hasUserPurchasedPack(userId: number, packId: number): Promise<boolean>;

  // Reports
  createReport(report: InsertReport): Promise<Report>;
  getReports(status?: string): Promise<Report[]>;
  resolveReport(id: number, resolvedBy: number, resolution: string): Promise<void>;

  // Scout Requests
  createScoutRequest(request: InsertScoutRequest): Promise<ScoutRequest>;
  getScoutRequestsForUser(userId: number): Promise<ScoutRequest[]>;
  getScoutRequestsByUser(userId: number): Promise<ScoutRequest[]>;
  updateScoutRequestStatus(id: number, status: string): Promise<void>;

  // Follows
  followUser(followerId: number, followingId: number): Promise<void>;
  unfollowUser(followerId: number, followingId: number): Promise<void>;
  getFollowers(userId: number): Promise<User[]>;
  getFollowing(userId: number): Promise<User[]>;
  isFollowing(followerId: number, followingId: number): Promise<boolean>;

  // Testimonials
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonialsForUser(userId: number): Promise<(Testimonial & { author: Pick<User, "id" | "displayName" | "avatarUrl"> })[]>;
  approveTestimonial(id: number): Promise<void>;
  deleteTestimonial(id: number): Promise<void>;

  // Reputation
  addReputationSignal(userId: number, signalType: string, value: number, sourceId?: number, sourceType?: string): Promise<void>;
  getReputationBreakdown(userId: number): Promise<{ signalType: string; total: number; count: number }[]>;
  recalculateProfileStrength(userId: number): Promise<number>;
  recalculateReputation(userId: number): Promise<number>;

  // Enhanced profile
  getFullProfile(userId: number): Promise<any>;
  updateProfileCustomization(userId: number, data: Partial<InsertCreatorProfile>): Promise<CreatorProfile>;
  getUserByHandle(handle: string): Promise<User | undefined>;
  getChallengeHistoryForUser(userId: number): Promise<(ChallengeEntry & { challenge: Challenge })[]>;
  getPacksByCreator(creatorId: number): Promise<Pack[]>;

  // Admin
  getAuditLogs(limit?: number): Promise<any[]>;
  createAuditLog(userId: number, action: string, targetType: string, targetId?: number, metadata?: any): Promise<void>;
  getStats(): Promise<{ users: number; exhibits: number; challenges: number; packs: number; purchases: number }>;
}

export class DatabaseStorage implements IStorage {
  // ─── Users ───────────────────────────────────────────
  async createUser(user: InsertUser): Promise<User> {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return result;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [result] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result;
  }

  // ─── Creator Profiles ────────────────────────────────
  async getCreatorProfile(userId: number): Promise<CreatorProfile | undefined> {
    const [result] = await db.select().from(creatorProfiles).where(eq(creatorProfiles.userId, userId));
    return result;
  }

  async upsertCreatorProfile(profile: InsertCreatorProfile): Promise<CreatorProfile> {
    const existing = await this.getCreatorProfile(profile.userId);
    if (existing) {
      const [result] = await db.update(creatorProfiles).set(profile).where(eq(creatorProfiles.userId, profile.userId)).returning();
      return result;
    }
    const [result] = await db.insert(creatorProfiles).values(profile).returning();
    return result;
  }

  async getCreatorProfiles(filters?: { skills?: string[]; available?: boolean }): Promise<(CreatorProfile & { user: Pick<User, "id" | "displayName" | "avatarUrl"> })[]> {
    let query = db.select({
      ...Object.fromEntries(Object.keys(creatorProfiles).map(k => [k, (creatorProfiles as any)[k]])),
      user: {
        id: users.id,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
    }).from(creatorProfiles).innerJoin(users, eq(creatorProfiles.userId, users.id));

    const results = await query;
    let filtered = results as any[];
    if (filters?.available) {
      filtered = filtered.filter((r: any) => r.hireAvailable);
    }
    return filtered;
  }

  // ─── Exhibits ────────────────────────────────────────
  async getAllExhibits(): Promise<Exhibit[]> {
    return db.select().from(exhibits).where(eq(exhibits.status, "published")).orderBy(desc(exhibits.createdAt));
  }

  async getExhibitById(id: number): Promise<Exhibit | undefined> {
    const [result] = await db.select().from(exhibits).where(eq(exhibits.id, id));
    return result;
  }

  async getExhibitBySlug(slug: string): Promise<Exhibit | undefined> {
    const [result] = await db.select().from(exhibits).where(eq(exhibits.slug, slug));
    return result;
  }

  async getExhibitsByCategory(category: string): Promise<Exhibit[]> {
    return db.select().from(exhibits).where(and(ilike(exhibits.category, category), eq(exhibits.status, "published"))).orderBy(desc(exhibits.createdAt));
  }

  async getExhibitsByCreator(creatorId: number): Promise<Exhibit[]> {
    return db.select().from(exhibits).where(eq(exhibits.creatorId, creatorId)).orderBy(desc(exhibits.createdAt));
  }

  async searchExhibits(query: string): Promise<Exhibit[]> {
    const pattern = `%${query}%`;
    return db.select().from(exhibits).where(
      and(
        eq(exhibits.status, "published"),
        or(
          ilike(exhibits.title, pattern),
          ilike(exhibits.description, pattern),
          ilike(exhibits.category, pattern),
          sql`array_to_string(${exhibits.tags}, ',') ILIKE ${pattern}`
        )
      )
    ).orderBy(desc(exhibits.createdAt));
  }

  async createExhibit(exhibit: InsertExhibit): Promise<Exhibit> {
    const [result] = await db.insert(exhibits).values(exhibit).returning();
    return result;
  }

  async updateExhibit(id: number, data: Partial<InsertExhibit>): Promise<Exhibit | undefined> {
    const [result] = await db.update(exhibits).set({ ...data, updatedAt: new Date() }).where(eq(exhibits.id, id)).returning();
    return result;
  }

  async deleteExhibit(id: number): Promise<boolean> {
    const result = await db.delete(exhibits).where(eq(exhibits.id, id));
    return true;
  }

  async incrementViewCount(id: number): Promise<void> {
    await db.update(exhibits).set({ viewCount: sql`${exhibits.viewCount} + 1` }).where(eq(exhibits.id, id));
  }

  async getCategories(): Promise<string[]> {
    const rows = await db.selectDistinct({ category: exhibits.category }).from(exhibits).where(eq(exhibits.status, "published")).orderBy(exhibits.category);
    return rows.map(r => r.category);
  }

  async getExhibitRemixes(parentId: number): Promise<Exhibit[]> {
    return db.select().from(exhibits).where(eq(exhibits.parentExhibitId, parentId)).orderBy(desc(exhibits.createdAt));
  }

  // ─── Exhibit Versions ────────────────────────────────
  async createExhibitVersion(version: InsertExhibitVersion): Promise<ExhibitVersion> {
    const [result] = await db.insert(exhibitVersions).values(version).returning();
    return result;
  }

  async getExhibitVersions(exhibitId: number): Promise<ExhibitVersion[]> {
    return db.select().from(exhibitVersions).where(eq(exhibitVersions.exhibitId, exhibitId)).orderBy(desc(exhibitVersions.createdAt));
  }

  // ─── Collections ─────────────────────────────────────
  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [result] = await db.insert(collections).values(collection).returning();
    return result;
  }

  async getUserCollections(userId: number): Promise<Collection[]> {
    return db.select().from(collections).where(eq(collections.userId, userId)).orderBy(desc(collections.createdAt));
  }

  async getCollectionWithItems(id: number): Promise<{ collection: Collection; items: Exhibit[] } | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.id, id));
    if (!collection) return undefined;
    const items = await db.select({ exhibit: exhibits }).from(collectionItems)
      .innerJoin(exhibits, eq(collectionItems.exhibitId, exhibits.id))
      .where(eq(collectionItems.collectionId, id));
    return { collection, items: items.map(i => i.exhibit) };
  }

  async addToCollection(item: InsertCollectionItem): Promise<void> {
    await db.insert(collectionItems).values(item);
  }

  async removeFromCollection(collectionId: number, exhibitId: number): Promise<void> {
    await db.delete(collectionItems).where(and(eq(collectionItems.collectionId, collectionId), eq(collectionItems.exhibitId, exhibitId)));
  }

  async deleteCollection(id: number): Promise<boolean> {
    await db.delete(collectionItems).where(eq(collectionItems.collectionId, id));
    await db.delete(collections).where(eq(collections.id, id));
    return true;
  }

  // ─── Saves ───────────────────────────────────────────
  async saveExhibit(save: InsertSave): Promise<Save> {
    const [result] = await db.insert(saves).values(save).returning();
    await db.update(exhibits).set({ saveCount: sql`${exhibits.saveCount} + 1` }).where(eq(exhibits.id, save.exhibitId));
    return result;
  }

  async unsaveExhibit(userId: number, exhibitId: number): Promise<void> {
    await db.delete(saves).where(and(eq(saves.userId, userId), eq(saves.exhibitId, exhibitId)));
    await db.update(exhibits).set({ saveCount: sql`GREATEST(${exhibits.saveCount} - 1, 0)` }).where(eq(exhibits.id, exhibitId));
  }

  async getUserSaves(userId: number): Promise<Exhibit[]> {
    const results = await db.select({ exhibit: exhibits }).from(saves)
      .innerJoin(exhibits, eq(saves.exhibitId, exhibits.id))
      .where(eq(saves.userId, userId));
    return results.map(r => r.exhibit);
  }

  async isExhibitSaved(userId: number, exhibitId: number): Promise<boolean> {
    const [result] = await db.select().from(saves).where(and(eq(saves.userId, userId), eq(saves.exhibitId, exhibitId)));
    return !!result;
  }

  // ─── Votes ───────────────────────────────────────────
  async voteOnExhibit(vote: InsertVote): Promise<Vote> {
    const [result] = await db.insert(votes).values(vote).returning();
    return result;
  }

  async removeVote(userId: number, exhibitId: number): Promise<void> {
    await db.delete(votes).where(and(eq(votes.userId, userId), eq(votes.exhibitId, exhibitId)));
  }

  async getExhibitVoteCount(exhibitId: number): Promise<number> {
    const [result] = await db.select({ total: sql<number>`COALESCE(SUM(${votes.value}), 0)` }).from(votes).where(eq(votes.exhibitId, exhibitId));
    return result?.total || 0;
  }

  // ─── Challenges ──────────────────────────────────────
  async getChallenges(status?: string): Promise<Challenge[]> {
    if (status) {
      return db.select().from(challenges).where(eq(challenges.status, status)).orderBy(desc(challenges.startAt));
    }
    return db.select().from(challenges).orderBy(desc(challenges.startAt));
  }

  async getChallengeById(id: number): Promise<Challenge | undefined> {
    const [result] = await db.select().from(challenges).where(eq(challenges.id, id));
    return result;
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const [result] = await db.insert(challenges).values(challenge).returning();
    return result;
  }

  async submitChallengeEntry(entry: InsertChallengeEntry): Promise<ChallengeEntry> {
    const [result] = await db.insert(challengeEntries).values(entry).returning();
    return result;
  }

  async getChallengeEntries(challengeId: number): Promise<(ChallengeEntry & { exhibit: Exhibit })[]> {
    const results = await db.select().from(challengeEntries)
      .innerJoin(exhibits, eq(challengeEntries.exhibitId, exhibits.id))
      .where(eq(challengeEntries.challengeId, challengeId))
      .orderBy(desc(challengeEntries.score));
    return results.map(r => ({ ...r.challenge_entries, exhibit: r.exhibits }));
  }

  // ─── Packs ───────────────────────────────────────────
  async createPack(pack: InsertPack): Promise<Pack> {
    const [result] = await db.insert(packs).values(pack).returning();
    return result;
  }

  async getPacks(filters?: { status?: string }): Promise<Pack[]> {
    if (filters?.status) {
      return db.select().from(packs).where(eq(packs.status, filters.status)).orderBy(desc(packs.createdAt));
    }
    return db.select().from(packs).where(eq(packs.status, "published")).orderBy(desc(packs.createdAt));
  }

  async getPackById(id: number): Promise<Pack | undefined> {
    const [result] = await db.select().from(packs).where(eq(packs.id, id));
    return result;
  }

  async getPackBySlug(slug: string): Promise<Pack | undefined> {
    const [result] = await db.select().from(packs).where(eq(packs.slug, slug));
    return result;
  }

  async addPackItem(packId: number, exhibitId: number): Promise<void> {
    await db.insert(packItems).values({ packId, exhibitId });
  }

  async getPackItems(packId: number): Promise<Exhibit[]> {
    const results = await db.select({ exhibit: exhibits }).from(packItems)
      .innerJoin(exhibits, eq(packItems.exhibitId, exhibits.id))
      .where(eq(packItems.packId, packId));
    return results.map(r => r.exhibit);
  }

  // ─── Purchases ───────────────────────────────────────
  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const [result] = await db.insert(purchases).values(purchase).returning();
    return result;
  }

  async updatePurchaseStatus(id: number, status: string, stripePaymentIntentId?: string): Promise<void> {
    const data: any = { status };
    if (stripePaymentIntentId) data.stripePaymentIntentId = stripePaymentIntentId;
    await db.update(purchases).set(data).where(eq(purchases.id, id));
  }

  async getUserPurchases(userId: number): Promise<(Purchase & { pack: Pack })[]> {
    const results = await db.select().from(purchases)
      .innerJoin(packs, eq(purchases.packId, packs.id))
      .where(eq(purchases.userId, userId))
      .orderBy(desc(purchases.createdAt));
    return results.map(r => ({ ...r.purchases, pack: r.packs }));
  }

  async hasUserPurchasedPack(userId: number, packId: number): Promise<boolean> {
    const [result] = await db.select().from(purchases).where(and(eq(purchases.userId, userId), eq(purchases.packId, packId), eq(purchases.status, "completed")));
    return !!result;
  }

  // ─── Reports ─────────────────────────────────────────
  async createReport(report: InsertReport): Promise<Report> {
    const [result] = await db.insert(reports).values(report).returning();
    return result;
  }

  async getReports(status?: string): Promise<Report[]> {
    if (status) {
      return db.select().from(reports).where(eq(reports.status, status)).orderBy(desc(reports.createdAt));
    }
    return db.select().from(reports).orderBy(desc(reports.createdAt));
  }

  async resolveReport(id: number, resolvedBy: number, resolution: string): Promise<void> {
    await db.update(reports).set({ status: "resolved", resolvedBy, resolution, resolvedAt: new Date() }).where(eq(reports.id, id));
  }

  // ─── Scout Requests ──────────────────────────────────
  async createScoutRequest(request: InsertScoutRequest): Promise<ScoutRequest> {
    const [result] = await db.insert(scoutRequests).values(request).returning();
    return result;
  }

  async getScoutRequestsForUser(userId: number): Promise<ScoutRequest[]> {
    return db.select().from(scoutRequests).where(eq(scoutRequests.toUserId, userId)).orderBy(desc(scoutRequests.createdAt));
  }

  async getScoutRequestsByUser(userId: number): Promise<ScoutRequest[]> {
    return db.select().from(scoutRequests).where(eq(scoutRequests.fromUserId, userId)).orderBy(desc(scoutRequests.createdAt));
  }

  async updateScoutRequestStatus(id: number, status: string): Promise<void> {
    await db.update(scoutRequests).set({ status }).where(eq(scoutRequests.id, id));
  }

  // ─── Follows ─────────────────────────────────────────
  async followUser(followerId: number, followingId: number): Promise<void> {
    await db.insert(follows).values({ followerId, followingId });
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    await db.delete(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
  }

  async getFollowers(userId: number): Promise<User[]> {
    const results = await db.select({ user: users }).from(follows)
      .innerJoin(users, eq(follows.followerId, users.id))
      .where(eq(follows.followingId, userId));
    return results.map(r => r.user);
  }

  async getFollowing(userId: number): Promise<User[]> {
    const results = await db.select({ user: users }).from(follows)
      .innerJoin(users, eq(follows.followingId, users.id))
      .where(eq(follows.followerId, userId));
    return results.map(r => r.user);
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const [result] = await db.select().from(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    return !!result;
  }

  // ─── Admin ───────────────────────────────────────────
  async getAuditLogs(limit = 50): Promise<any[]> {
    return db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit);
  }

  async createAuditLog(userId: number, action: string, targetType: string, targetId?: number, metadata?: any): Promise<void> {
    await db.insert(auditLogs).values({ userId, action, targetType, targetId, metadata });
  }

  async getStats(): Promise<{ users: number; exhibits: number; challenges: number; packs: number; purchases: number }> {
    const [userCount] = await db.select({ c: count() }).from(users);
    const [exhibitCount] = await db.select({ c: count() }).from(exhibits);
    const [challengeCount] = await db.select({ c: count() }).from(challenges);
    const [packCount] = await db.select({ c: count() }).from(packs);
    const [purchaseCount] = await db.select({ c: count() }).from(purchases);
    return {
      users: userCount.c,
      exhibits: exhibitCount.c,
      challenges: challengeCount.c,
      packs: packCount.c,
      purchases: purchaseCount.c,
    };
  }

  // ─── Testimonials ─────────────────────────────────────
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db.insert(testimonials).values(testimonial).returning();
    return result;
  }

  async getTestimonialsForUser(userId: number): Promise<(Testimonial & { author: Pick<User, "id" | "displayName" | "avatarUrl"> })[]> {
    const results = await db.select({
      testimonial: testimonials,
      author: {
        id: users.id,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
    }).from(testimonials)
      .innerJoin(users, eq(testimonials.authorId, users.id))
      .where(and(eq(testimonials.profileUserId, userId), eq(testimonials.approved, true)))
      .orderBy(desc(testimonials.createdAt));
    return results.map(r => ({ ...r.testimonial, author: r.author }));
  }

  async approveTestimonial(id: number): Promise<void> {
    await db.update(testimonials).set({ approved: true }).where(eq(testimonials.id, id));
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // ─── Reputation ───────────────────────────────────────
  async addReputationSignal(userId: number, signalType: string, value: number, sourceId?: number, sourceType?: string): Promise<void> {
    await db.insert(reputationSignals).values({ userId, signalType, value, sourceId, sourceType });
  }

  async getReputationBreakdown(userId: number): Promise<{ signalType: string; total: number; count: number }[]> {
    const results = await db.select({
      signalType: reputationSignals.signalType,
      total: sql<number>`COALESCE(SUM(${reputationSignals.value}), 0)`,
      count: sql<number>`COUNT(*)`,
    }).from(reputationSignals)
      .where(eq(reputationSignals.userId, userId))
      .groupBy(reputationSignals.signalType);
    return results.map(r => ({ signalType: r.signalType, total: Number(r.total), count: Number(r.count) }));
  }

  async recalculateProfileStrength(userId: number): Promise<number> {
    const profile = await this.getCreatorProfile(userId);
    const user = await this.getUserById(userId);
    if (!profile || !user) return 0;

    let strength = 0;
    if (user.avatarUrl) strength += 10;
    if (profile.coverPhotoUrl) strength += 10;
    if (profile.bio && profile.bio.length > 10) strength += 10;
    if (profile.headline) strength += 10;
    if (profile.signatureStampText) strength += 10;
    if ((profile.skillTags || []).length > 0) strength += 10;
    if (profile.website) strength += 5;
    if (profile.location) strength += 5;

    const exhibitCount = await db.select({ c: count() }).from(exhibits).where(eq(exhibits.creatorId, userId));
    if (exhibitCount[0]?.c > 0) strength += 15;

    const challengeCount = await db.select({ c: count() }).from(challengeEntries).where(eq(challengeEntries.userId, userId));
    if (challengeCount[0]?.c > 0) strength += 10;

    const packCount = await db.select({ c: count() }).from(packs).where(eq(packs.creatorId, userId));
    if (packCount[0]?.c > 0) strength += 5;

    strength = Math.min(strength, 100);

    await db.update(creatorProfiles).set({ profileStrength: strength }).where(eq(creatorProfiles.userId, userId));
    return strength;
  }

  async recalculateReputation(userId: number): Promise<number> {
    const breakdown = await this.getReputationBreakdown(userId);
    const weights: Record<string, number> = {
      quality_check: 3,
      save: 2,
      remix_adoption: 4,
      challenge_placement: 5,
      verified: 3,
      founder_interest: 2,
      exhibit_published: 1,
      vote_received: 1,
    };

    let score = 0;
    for (const signal of breakdown) {
      const weight = weights[signal.signalType] || 1;
      score += signal.total * weight;
    }

    score = Math.round(score * 10) / 10;

    let level = 1;
    let title = "Newcomer";
    if (score >= 500) { level = 10; title = "Legend"; }
    else if (score >= 300) { level = 8; title = "Master Builder"; }
    else if (score >= 200) { level = 7; title = "Systems Builder"; }
    else if (score >= 150) { level = 6; title = "Expert Craftsman"; }
    else if (score >= 100) { level = 5; title = "Senior Creator"; }
    else if (score >= 60) { level = 4; title = "Skilled Maker"; }
    else if (score >= 30) { level = 3; title = "Active Creator"; }
    else if (score >= 10) { level = 2; title = "Contributor"; }

    const perks: string[] = [];
    if (level >= 2) perks.push("extended_uploads");
    if (level >= 3) perks.push("publish_packs");
    if (level >= 4) perks.push("custom_signature");
    if (level >= 5) perks.push("higher_discovery");
    if (level >= 6) perks.push("banner_layouts");
    if (level >= 7) perks.push("pinned_sections");
    if (level >= 8) perks.push("host_challenges");

    await db.update(creatorProfiles).set({
      reputationScore: score,
      level,
      title,
      perksUnlocked: perks,
    }).where(eq(creatorProfiles.userId, userId));

    return score;
  }

  // ─── Enhanced Profile ─────────────────────────────────
  async getFullProfile(userId: number): Promise<any> {
    const user = await this.getUserById(userId);
    if (!user) return null;
    const profile = await this.getCreatorProfile(userId);
    const userExhibits = await this.getExhibitsByCreator(userId);
    const userPacks = await this.getPacksByCreator(userId);
    const challengeHistory = await this.getChallengeHistoryForUser(userId);
    const userTestimonials = await this.getTestimonialsForUser(userId);
    const reputationBreakdown = profile ? await this.getReputationBreakdown(userId) : [];
    const [followerCount] = await db.select({ c: count() }).from(follows).where(eq(follows.followingId, userId));
    const [followingCount] = await db.select({ c: count() }).from(follows).where(eq(follows.followerId, userId));

    const pinnedExhibits = profile?.pinnedExhibitIds?.length
      ? userExhibits.filter(e => profile.pinnedExhibitIds.includes(e.id))
      : [];

    const remixHighlights = userExhibits.filter(e => e.remixCount > 0).sort((a, b) => b.remixCount - a.remixCount).slice(0, 5);

    return {
      user: {
        id: user.id,
        displayName: user.displayName,
        handle: user.handle,
        avatarUrl: user.avatarUrl,
        role: user.role,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt,
      },
      profile,
      exhibits: userExhibits,
      pinnedExhibits,
      packs: userPacks,
      challengeHistory,
      testimonials: userTestimonials,
      reputationBreakdown,
      remixHighlights,
      exhibitCount: userExhibits.length,
      followerCount: followerCount.c,
      followingCount: followingCount.c,
    };
  }

  async updateProfileCustomization(userId: number, data: Partial<InsertCreatorProfile>): Promise<CreatorProfile> {
    const existing = await this.getCreatorProfile(userId);
    if (existing) {
      const [result] = await db.update(creatorProfiles).set(data).where(eq(creatorProfiles.userId, userId)).returning();
      return result;
    }
    const [result] = await db.insert(creatorProfiles).values({ userId, ...data } as InsertCreatorProfile).returning();
    return result;
  }

  async getUserByHandle(handle: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.handle, handle.toLowerCase()));
    return result;
  }

  async getChallengeHistoryForUser(userId: number): Promise<(ChallengeEntry & { challenge: Challenge })[]> {
    const results = await db.select().from(challengeEntries)
      .innerJoin(challenges, eq(challengeEntries.challengeId, challenges.id))
      .where(eq(challengeEntries.userId, userId))
      .orderBy(desc(challengeEntries.createdAt));
    return results.map(r => ({ ...r.challenge_entries, challenge: r.challenges }));
  }

  async getPacksByCreator(creatorId: number): Promise<Pack[]> {
    return db.select().from(packs).where(eq(packs.creatorId, creatorId)).orderBy(desc(packs.createdAt));
  }
}

export const storage = new DatabaseStorage();
