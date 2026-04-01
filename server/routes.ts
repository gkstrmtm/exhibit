import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth, requireRole, hashPassword } from "./auth";
import {
  insertExhibitSchema, registerSchema, loginSchema,
  insertCollectionSchema, insertReportSchema, insertScoutRequestSchema,
  insertChallengeSchema, insertPackSchema,
  creatorOnboardingSchema, founderOnboardingSchema, profileUpdateSchema,
  insertTestimonialSchema,
} from "@shared/schema";
import passport from "passport";

function paramStr(val: string | string[] | undefined): string {
  if (Array.isArray(val)) return val[0] || "";
  return val || "";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  // ─── Auth Routes ─────────────────────────────────────
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid registration data", errors: parsed.error.flatten() });
      }

      const existing = await storage.getUserByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ message: "Email already registered" });
      }

      const passwordHash = await hashPassword(parsed.data.password);
      const user = await storage.createUser({
        email: parsed.data.email.toLowerCase(),
        passwordHash,
        displayName: parsed.data.displayName,
        role: "user",
        emailVerified: false,
      });

      req.login(
        { id: user.id, email: user.email, displayName: user.displayName, role: user.role, avatarUrl: user.avatarUrl },
        (err) => {
          if (err) return res.status(500).json({ message: "Registration succeeded but login failed" });
          return res.status(201).json({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            avatarUrl: user.avatarUrl,
          });
        }
      );
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });
      req.login(user, (loginErr) => {
        if (loginErr) return res.status(500).json({ message: "Login failed" });
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  // ─── Exhibit Routes ──────────────────────────────────
  app.get("/api/exhibits", async (req, res) => {
    try {
      const { category, q, creator, sort } = req.query;
      let results;
      if (q && typeof q === "string") {
        results = await storage.searchExhibits(q);
      } else if (category && typeof category === "string") {
        results = await storage.getExhibitsByCategory(category);
      } else if (creator && typeof creator === "string") {
        results = await storage.getExhibitsByCreator(parseInt(creator));
      } else {
        results = await storage.getAllExhibits();
      }

      const creatorIds = [...new Set(results.filter(e => e.creatorId).map(e => e.creatorId!))];
      const creatorMap: Record<number, string> = {};
      for (const cid of creatorIds) {
        const u = await storage.getUserById(cid);
        if (u) creatorMap[cid] = u.displayName;
      }

      const enriched = results.map(e => ({
        ...e,
        creatorName: e.creatorId ? creatorMap[e.creatorId] || null : null,
      }));

      res.json(enriched);
    } catch (err) {
      console.error("Error fetching exhibits:", err);
      res.status(500).json({ message: "Failed to fetch exhibits" });
    }
  });

  app.get("/api/exhibits/:slug", async (req, res) => {
    try {
      const exhibit = await storage.getExhibitBySlug(paramStr(req.params.slug));
      if (!exhibit) {
        return res.status(404).json({ message: "Exhibit not found" });
      }
      await storage.incrementViewCount(exhibit.id);
      res.json(exhibit);
    } catch (err) {
      console.error("Error fetching exhibit:", err);
      res.status(500).json({ message: "Failed to fetch exhibit" });
    }
  });

  app.post("/api/exhibits", requireAuth, async (req, res) => {
    try {
      const parsed = insertExhibitSchema.safeParse({ ...req.body, creatorId: req.user!.id });
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid exhibit data", errors: parsed.error.flatten() });
      }
      const exhibit = await storage.createExhibit(parsed.data);
      await storage.createAuditLog(req.user!.id, "create_exhibit", "exhibit", exhibit.id);
      res.status(201).json(exhibit);
    } catch (err) {
      console.error("Error creating exhibit:", err);
      res.status(500).json({ message: "Failed to create exhibit" });
    }
  });

  app.put("/api/exhibits/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(paramStr(req.params.id));
      const exhibit = await storage.getExhibitById(id);
      if (!exhibit) return res.status(404).json({ message: "Exhibit not found" });
      if (exhibit.creatorId !== req.user!.id && req.user!.role !== "admin") {
        return res.status(403).json({ message: "Not authorized" });
      }
      const updated = await storage.updateExhibit(id, req.body);
      res.json(updated);
    } catch (err) {
      console.error("Error updating exhibit:", err);
      res.status(500).json({ message: "Failed to update exhibit" });
    }
  });

  app.delete("/api/exhibits/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(paramStr(req.params.id));
      const exhibit = await storage.getExhibitById(id);
      if (!exhibit) return res.status(404).json({ message: "Exhibit not found" });
      if (exhibit.creatorId !== req.user!.id && req.user!.role !== "admin") {
        return res.status(403).json({ message: "Not authorized" });
      }
      await storage.deleteExhibit(id);
      await storage.createAuditLog(req.user!.id, "delete_exhibit", "exhibit", id);
      res.json({ message: "Deleted" });
    } catch (err) {
      console.error("Error deleting exhibit:", err);
      res.status(500).json({ message: "Failed to delete exhibit" });
    }
  });

  app.post("/api/exhibits/:id/remix", requireAuth, async (req, res) => {
    try {
      const parentId = parseInt(paramStr(req.params.id));
      const parent = await storage.getExhibitById(parentId);
      if (!parent) return res.status(404).json({ message: "Parent exhibit not found" });

      const slug = `${parent.slug}-remix-${Date.now()}`;
      const remix = await storage.createExhibit({
        ...req.body,
        slug,
        parentExhibitId: parentId,
        creatorId: req.user!.id,
        status: "published",
      });

      await storage.updateExhibit(parentId, { remixCount: (parent.remixCount || 0) + 1 } as any);
      await storage.createAuditLog(req.user!.id, "remix_exhibit", "exhibit", remix.id, { parentId });
      res.status(201).json(remix);
    } catch (err) {
      console.error("Error remixing exhibit:", err);
      res.status(500).json({ message: "Failed to remix exhibit" });
    }
  });

  app.get("/api/exhibits/:id/remixes", async (req, res) => {
    try {
      const remixes = await storage.getExhibitRemixes(parseInt(paramStr(req.params.id)));
      res.json(remixes);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch remixes" });
    }
  });

  app.get("/api/exhibits/:id/versions", async (req, res) => {
    try {
      const versions = await storage.getExhibitVersions(parseInt(paramStr(req.params.id)));
      res.json(versions);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch versions" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // ─── Save / Bookmark Routes ──────────────────────────
  app.post("/api/saves/:exhibitId", requireAuth, async (req, res) => {
    try {
      const exhibitId = parseInt(paramStr(req.params.exhibitId));
      const already = await storage.isExhibitSaved(req.user!.id, exhibitId);
      if (already) return res.json({ saved: true });
      await storage.saveExhibit({ userId: req.user!.id, exhibitId });
      res.json({ saved: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to save exhibit" });
    }
  });

  app.delete("/api/saves/:exhibitId", requireAuth, async (req, res) => {
    try {
      await storage.unsaveExhibit(req.user!.id, parseInt(paramStr(req.params.exhibitId)));
      res.json({ saved: false });
    } catch (err) {
      res.status(500).json({ message: "Failed to unsave exhibit" });
    }
  });

  app.get("/api/saves", requireAuth, async (req, res) => {
    try {
      const saved = await storage.getUserSaves(req.user!.id);
      res.json(saved);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch saves" });
    }
  });

  app.get("/api/saves/:exhibitId/status", requireAuth, async (req, res) => {
    try {
      const saved = await storage.isExhibitSaved(req.user!.id, parseInt(paramStr(req.params.exhibitId)));
      res.json({ saved });
    } catch (err) {
      res.status(500).json({ message: "Failed to check save status" });
    }
  });

  // ─── Collection Routes ───────────────────────────────
  app.get("/api/collections", requireAuth, async (req, res) => {
    try {
      const collections = await storage.getUserCollections(req.user!.id);
      res.json(collections);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  app.post("/api/collections", requireAuth, async (req, res) => {
    try {
      const parsed = insertCollectionSchema.safeParse({ ...req.body, userId: req.user!.id });
      if (!parsed.success) return res.status(400).json({ message: "Invalid collection data" });
      const collection = await storage.createCollection(parsed.data);
      res.status(201).json(collection);
    } catch (err) {
      res.status(500).json({ message: "Failed to create collection" });
    }
  });

  app.get("/api/collections/:id", async (req, res) => {
    try {
      const result = await storage.getCollectionWithItems(parseInt(paramStr(req.params.id)));
      if (!result) return res.status(404).json({ message: "Collection not found" });
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  app.post("/api/collections/:id/items", requireAuth, async (req, res) => {
    try {
      await storage.addToCollection({ collectionId: parseInt(paramStr(req.params.id)), exhibitId: req.body.exhibitId });
      res.json({ added: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to add to collection" });
    }
  });

  app.delete("/api/collections/:id/items/:exhibitId", requireAuth, async (req, res) => {
    try {
      await storage.removeFromCollection(parseInt(paramStr(req.params.id)), parseInt(paramStr(req.params.exhibitId)));
      res.json({ removed: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to remove from collection" });
    }
  });

  app.delete("/api/collections/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteCollection(parseInt(paramStr(req.params.id)));
      res.json({ deleted: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete collection" });
    }
  });

  // ─── Profile Routes ──────────────────────────────────
  app.get("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(paramStr(req.params.userId));
      const fullProfile = await storage.getFullProfile(userId);
      if (!fullProfile) return res.status(404).json({ message: "User not found" });
      res.json(fullProfile);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profiles", requireAuth, async (req, res) => {
    try {
      const parsed = profileUpdateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });

      const { displayName, handle, avatarUrl, ...profileData } = parsed.data;

      if (displayName || handle || avatarUrl !== undefined) {
        const userData: any = {};
        if (displayName) userData.displayName = displayName;
        if (handle) {
          const existing = await storage.getUserByHandle(handle);
          if (existing && existing.id !== req.user!.id) return res.status(409).json({ message: "Handle already taken" });
          userData.handle = handle.toLowerCase();
        }
        if (avatarUrl !== undefined) userData.avatarUrl = avatarUrl;
        if (Object.keys(userData).length > 0) await storage.updateUser(req.user!.id, userData);
      }

      const profile = await storage.updateProfileCustomization(req.user!.id, profileData);
      await storage.recalculateProfileStrength(req.user!.id);
      const fullProfile = await storage.getFullProfile(req.user!.id);
      res.json(fullProfile);
    } catch (err) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.get("/api/profiles/:userId/reputation", async (req, res) => {
    try {
      const userId = parseInt(paramStr(req.params.userId));
      const breakdown = await storage.getReputationBreakdown(userId);
      const profile = await storage.getCreatorProfile(userId);
      res.json({
        breakdown,
        score: profile?.reputationScore || 0,
        level: profile?.level || 1,
        title: profile?.title || "Newcomer",
        perksUnlocked: profile?.perksUnlocked || [],
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch reputation" });
    }
  });

  app.get("/api/profiles/:userId/strength", async (req, res) => {
    try {
      const userId = parseInt(paramStr(req.params.userId));
      const strength = await storage.recalculateProfileStrength(userId);
      const profile = await storage.getCreatorProfile(userId);
      const user = await storage.getUserById(userId);

      const nextActions: string[] = [];
      if (!user?.avatarUrl) nextActions.push("Add avatar");
      if (!profile?.coverPhotoUrl) nextActions.push("Add cover photo");
      if (!profile?.bio || profile.bio.length < 10) nextActions.push("Write a bio");
      if (!profile?.headline) nextActions.push("Add a headline");
      if (!profile?.signatureStampText) nextActions.push("Set a signature stamp");
      if (!(profile?.skillTags?.length)) nextActions.push("Add skill tags");
      if (!profile?.website) nextActions.push("Add website link");

      res.json({ strength, nextActions });
    } catch (err) {
      res.status(500).json({ message: "Failed to get profile strength" });
    }
  });

  // ─── Onboarding Routes ────────────────────────────────
  app.post("/api/onboarding/creator", requireAuth, async (req, res) => {
    try {
      const parsed = creatorOnboardingSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });

      const { creatorRole, skillTags, stackTags, avatarUrl, coverPhotoUrl, themeAccent, signatureStampText, handle, headline, bio } = parsed.data;

      const userData: any = { onboardingCompleted: true };
      if (avatarUrl) userData.avatarUrl = avatarUrl;
      if (handle) {
        const existing = await storage.getUserByHandle(handle);
        if (existing && existing.id !== req.user!.id) return res.status(409).json({ message: "Handle already taken" });
        userData.handle = handle.toLowerCase();
      }
      await storage.updateUser(req.user!.id, userData);

      const profileData: any = {
        userId: req.user!.id,
        creatorRole,
        skillTags,
        stackTags: stackTags || [],
        onboardingCompleted: true,
      };
      if (coverPhotoUrl) profileData.coverPhotoUrl = coverPhotoUrl;
      if (themeAccent) profileData.themeAccent = themeAccent;
      if (signatureStampText) profileData.signatureStampText = signatureStampText;
      if (headline) profileData.headline = headline;
      if (bio) profileData.bio = bio;

      await storage.upsertCreatorProfile(profileData);
      await storage.recalculateProfileStrength(req.user!.id);
      const fullProfile = await storage.getFullProfile(req.user!.id);
      res.json(fullProfile);
    } catch (err) {
      res.status(500).json({ message: "Failed to complete onboarding" });
    }
  });

  app.post("/api/onboarding/founder", requireAuth, async (req, res) => {
    try {
      const parsed = founderOnboardingSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });

      await storage.updateUser(req.user!.id, { founderOnboarded: true } as any);
      res.json({ success: true, data: parsed.data });
    } catch (err) {
      res.status(500).json({ message: "Failed to complete founder onboarding" });
    }
  });

  // ─── Testimonials Routes ──────────────────────────────
  app.get("/api/profiles/:userId/testimonials", async (req, res) => {
    try {
      const userId = parseInt(paramStr(req.params.userId));
      const results = await storage.getTestimonialsForUser(userId);
      res.json(results);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/profiles/:userId/testimonials", requireAuth, async (req, res) => {
    try {
      const profileUserId = parseInt(paramStr(req.params.userId));
      if (profileUserId === req.user!.id) return res.status(400).json({ message: "Cannot endorse yourself" });
      const testimonial = await storage.createTestimonial({
        profileUserId,
        authorId: req.user!.id,
        content: req.body.content,
        rating: req.body.rating || 5,
      });
      res.json(testimonial);
    } catch (err) {
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id/approve", requireAuth, async (req, res) => {
    try {
      await storage.approveTestimonial(parseInt(paramStr(req.params.id)));
      res.json({ approved: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to approve testimonial" });
    }
  });

  app.get("/api/creators", async (req, res) => {
    try {
      const { available } = req.query;
      const profiles = await storage.getCreatorProfiles({
        available: available === "true",
      });
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  // ─── Follow Routes ───────────────────────────────────
  app.post("/api/follow/:userId", requireAuth, async (req, res) => {
    try {
      const targetId = parseInt(paramStr(req.params.userId));
      if (targetId === req.user!.id) return res.status(400).json({ message: "Cannot follow yourself" });
      await storage.followUser(req.user!.id, targetId);
      res.json({ following: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to follow" });
    }
  });

  app.delete("/api/follow/:userId", requireAuth, async (req, res) => {
    try {
      await storage.unfollowUser(req.user!.id, parseInt(paramStr(req.params.userId)));
      res.json({ following: false });
    } catch (err) {
      res.status(500).json({ message: "Failed to unfollow" });
    }
  });

  app.get("/api/follow/:userId/status", requireAuth, async (req, res) => {
    try {
      const following = await storage.isFollowing(req.user!.id, parseInt(paramStr(req.params.userId)));
      res.json({ following });
    } catch (err) {
      res.status(500).json({ message: "Failed to check follow status" });
    }
  });

  // ─── Challenge Routes ────────────────────────────────
  app.get("/api/challenges", async (req, res) => {
    try {
      const { status } = req.query;
      const result = await storage.getChallenges(status as string);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const challenge = await storage.getChallengeById(parseInt(paramStr(req.params.id)));
      if (!challenge) return res.status(404).json({ message: "Challenge not found" });
      const entries = await storage.getChallengeEntries(challenge.id);
      res.json({ challenge, entries });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch challenge" });
    }
  });

  app.post("/api/challenges", requireRole("admin"), async (req, res) => {
    try {
      const parsed = insertChallengeSchema.safeParse({ ...req.body, createdBy: req.user!.id });
      if (!parsed.success) return res.status(400).json({ message: "Invalid challenge data", errors: parsed.error.flatten() });
      const challenge = await storage.createChallenge(parsed.data);
      res.status(201).json(challenge);
    } catch (err) {
      res.status(500).json({ message: "Failed to create challenge" });
    }
  });

  app.post("/api/challenges/:id/entries", requireAuth, async (req, res) => {
    try {
      const entry = await storage.submitChallengeEntry({
        challengeId: parseInt(paramStr(req.params.id)),
        exhibitId: req.body.exhibitId,
        userId: req.user!.id,
      });
      res.status(201).json(entry);
    } catch (err) {
      res.status(500).json({ message: "Failed to submit entry" });
    }
  });

  // ─── Pack / Marketplace Routes ───────────────────────
  app.get("/api/packs", async (_req, res) => {
    try {
      const result = await storage.getPacks();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch packs" });
    }
  });

  app.get("/api/packs/:slug", async (req, res) => {
    try {
      const pack = await storage.getPackBySlug(paramStr(req.params.slug));
      if (!pack) return res.status(404).json({ message: "Pack not found" });
      const items = await storage.getPackItems(pack.id);
      res.json({ pack, items });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch pack" });
    }
  });

  app.post("/api/packs", requireAuth, async (req, res) => {
    try {
      const parsed = insertPackSchema.safeParse({ ...req.body, creatorId: req.user!.id });
      if (!parsed.success) return res.status(400).json({ message: "Invalid pack data", errors: parsed.error.flatten() });
      const pack = await storage.createPack(parsed.data);
      res.status(201).json(pack);
    } catch (err) {
      res.status(500).json({ message: "Failed to create pack" });
    }
  });

  // ─── Report Routes ───────────────────────────────────
  app.post("/api/reports", requireAuth, async (req, res) => {
    try {
      const parsed = insertReportSchema.safeParse({ ...req.body, reporterId: req.user!.id });
      if (!parsed.success) return res.status(400).json({ message: "Invalid report data" });
      const report = await storage.createReport(parsed.data);
      res.status(201).json(report);
    } catch (err) {
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // ─── Scout Request Routes ────────────────────────────
  app.post("/api/scout-requests", requireAuth, async (req, res) => {
    try {
      const parsed = insertScoutRequestSchema.safeParse({ ...req.body, fromUserId: req.user!.id });
      if (!parsed.success) return res.status(400).json({ message: "Invalid request data" });
      const request = await storage.createScoutRequest(parsed.data);
      res.status(201).json(request);
    } catch (err) {
      res.status(500).json({ message: "Failed to create scout request" });
    }
  });

  app.get("/api/scout-requests/received", requireAuth, async (req, res) => {
    try {
      const requests = await storage.getScoutRequestsForUser(req.user!.id);
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch scout requests" });
    }
  });

  app.put("/api/scout-requests/:id/status", requireAuth, async (req, res) => {
    try {
      await storage.updateScoutRequestStatus(parseInt(paramStr(req.params.id)), req.body.status);
      res.json({ updated: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to update scout request" });
    }
  });

  // ─── Admin Routes ────────────────────────────────────
  app.get("/api/admin/stats", requireRole("admin"), async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/reports", requireRole("admin"), async (req, res) => {
    try {
      const { status } = req.query;
      const result = await storage.getReports(status as string);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.put("/api/admin/reports/:id/resolve", requireRole("admin"), async (req, res) => {
    try {
      await storage.resolveReport(parseInt(paramStr(req.params.id)), req.user!.id, req.body.resolution);
      await storage.createAuditLog(req.user!.id, "resolve_report", "report", parseInt(paramStr(req.params.id)));
      res.json({ resolved: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to resolve report" });
    }
  });

  app.get("/api/admin/audit-logs", requireRole("admin"), async (_req, res) => {
    try {
      const logs = await storage.getAuditLogs();
      res.json(logs);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  app.put("/api/admin/exhibits/:id/verify", requireRole("admin"), async (req, res) => {
    try {
      const id = parseInt(paramStr(req.params.id));
      await storage.updateExhibit(id, { verified: true });
      await storage.createAuditLog(req.user!.id, "verify_exhibit", "exhibit", id);
      res.json({ verified: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to verify exhibit" });
    }
  });

  app.put("/api/admin/exhibits/:id/status", requireRole("admin"), async (req, res) => {
    try {
      const id = parseInt(paramStr(req.params.id));
      await storage.updateExhibit(id, { status: req.body.status });
      await storage.createAuditLog(req.user!.id, "change_status", "exhibit", id, { status: req.body.status });
      res.json({ updated: true });
    } catch (err) {
      res.status(500).json({ message: "Failed to update exhibit status" });
    }
  });

  // ─── Vote Routes ─────────────────────────────────────
  app.post("/api/votes/:exhibitId", requireAuth, async (req, res) => {
    try {
      const exhibitId = parseInt(paramStr(req.params.exhibitId));
      await storage.voteOnExhibit({ userId: req.user!.id, exhibitId, value: 1 });
      const count = await storage.getExhibitVoteCount(exhibitId);
      res.json({ voted: true, count });
    } catch (err) {
      res.status(500).json({ message: "Failed to vote" });
    }
  });

  app.delete("/api/votes/:exhibitId", requireAuth, async (req, res) => {
    try {
      const exhibitId = parseInt(paramStr(req.params.exhibitId));
      await storage.removeVote(req.user!.id, exhibitId);
      const count = await storage.getExhibitVoteCount(exhibitId);
      res.json({ voted: false, count });
    } catch (err) {
      res.status(500).json({ message: "Failed to remove vote" });
    }
  });

  // ─── AI / LLM Accessible Routes ─────────────────────
  // Discovery file — drop this URL into Cursor, VS Code, or any AI assistant
  app.get("/llms.txt", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      const allExhibits = await storage.getAllExhibits();

      const categorySummary = categories.map(cat => {
        const count = allExhibits.filter(e => e.category === cat).length;
        const slug = cat.toLowerCase().replace(/\s+/g, "-");
        return `- ${cat} (${count} components): /api/llm/components?category=${encodeURIComponent(cat)}`;
      }).join("\n");

      const txt = `# EXHIBIT — UI Component Library for AI Assistants

> EXHIBIT is a proof-first UI component library with ${allExhibits.length} production-ready React components across ${categories.length} categories.
> All components include full source code (React/TypeScript/Tailwind CSS).

## How to use this library

Fetch any component by category or name and paste the code directly into your project.

### Get all components in a category
GET /api/llm/components?category=<CategoryName>

### Search for components by keyword
GET /api/llm/components?q=<search term>

### Get a single component with full code
GET /api/llm/components/<slug>

### List all categories with component counts
GET /api/llm/categories

### Get all components (full library)
GET /api/llm/components

## Component Categories (${categories.length} total)

${categorySummary}

## Response Format

Each component includes:
- slug: unique identifier
- title: component name
- description: what it does
- category: which category it belongs to
- tags: relevant keywords
- code: full React/TypeScript source code
- techStack: dependencies used (e.g. ["react", "tailwind", "framer-motion"])
- licenseType: "free" or "premium"

## Example Usage in an AI Assistant

"Fetch /api/llm/components?category=Loading and give me the skeleton loader"
"Get /api/llm/components/stat-cards-with-trends and use it in my dashboard"
"Search /api/llm/components?q=button and show me the variants"

## Source

Full component browser: https://exhibit.replit.app
API base: /api/llm/
`;

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(txt);
    } catch (err) {
      res.status(500).send("# EXHIBIT\nFailed to generate index.");
    }
  });

  // All components — supports ?category= and ?q= filtering
  app.get("/api/llm/components", async (req, res) => {
    try {
      const { category, q } = req.query;
      let results;
      if (q && typeof q === "string") {
        results = await storage.searchExhibits(q);
      } else if (category && typeof category === "string") {
        results = await storage.getExhibitsByCategory(category);
      } else {
        results = await storage.getAllExhibits();
      }

      const payload = results.map(e => ({
        slug: e.slug,
        title: e.title,
        description: e.description,
        category: e.category,
        tags: e.tags,
        techStack: e.techStack,
        licenseType: e.licenseType,
        version: e.version,
        code: e.code,
      }));

      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({
        total: payload.length,
        filter: { category: category || null, q: q || null },
        components: payload,
      });
    } catch (err) {
      console.error("LLM components error:", err);
      res.status(500).json({ message: "Failed to fetch components" });
    }
  });

  // Single component by slug — returns full code
  app.get("/api/llm/components/:slug", async (req, res) => {
    try {
      const exhibit = await storage.getExhibitBySlug(paramStr(req.params.slug));
      if (!exhibit) {
        return res.status(404).json({ message: "Component not found", hint: "GET /api/llm/components to see all slugs" });
      }

      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({
        slug: exhibit.slug,
        title: exhibit.title,
        description: exhibit.description,
        category: exhibit.category,
        tags: exhibit.tags,
        techStack: exhibit.techStack,
        licenseType: exhibit.licenseType,
        version: exhibit.version,
        verified: exhibit.verified,
        accessible: exhibit.accessible,
        productionReady: exhibit.productionReady,
        code: exhibit.code,
        htmlPreview: exhibit.htmlPreview,
      });
    } catch (err) {
      console.error("LLM component detail error:", err);
      res.status(500).json({ message: "Failed to fetch component" });
    }
  });

  // Categories with component counts and slugs
  app.get("/api/llm/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      const allExhibits = await storage.getAllExhibits();

      const result = categories.map(cat => {
        const components = allExhibits.filter(e => e.category === cat);
        return {
          name: cat,
          slug: cat.toLowerCase().replace(/\s+/g, "-"),
          count: components.length,
          apiUrl: `/api/llm/components?category=${encodeURIComponent(cat)}`,
          components: components.map(e => ({ slug: e.slug, title: e.title, description: e.description, tags: e.tags })),
        };
      });

      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({
        total: categories.length,
        componentTotal: allExhibits.length,
        categories: result,
      });
    } catch (err) {
      console.error("LLM categories error:", err);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  return httpServer;
}
