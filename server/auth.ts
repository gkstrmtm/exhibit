import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import MemoryStoreFactory from "memorystore";
import bcrypt from "bcryptjs";
import type { Express, Request, Response, NextFunction } from "express";
import { db } from "./storage.js";
import { users } from "../shared/schema.js";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      displayName: string;
      role: string;
      avatarUrl: string | null;
    }
  }
}

export function setupAuth(app: Express) {
  const PgSession = connectPgSimple(session);
  const MemoryStore = MemoryStoreFactory(session);
  const isProduction = process.env.NODE_ENV === "production";
  const sessionSecret = process.env.SESSION_SECRET?.trim();
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!sessionSecret && isProduction) {
    throw new Error("Missing SESSION_SECRET. Set it in the Vercel project environment variables before deploying.");
  }

  if (!databaseUrl && isProduction) {
    throw new Error("Missing DATABASE_URL. Production auth requires a PostgreSQL database for session storage.");
  }

  const store = databaseUrl
    ? new PgSession({
        conString: databaseUrl,
        tableName: "session",
        createTableIfMissing: false,
      })
    : new MemoryStore({
        checkPeriod: 24 * 60 * 60 * 1000,
      });

  app.use(
    session({
      proxy: isProduction,
      store,
      secret: sessionSecret || "ui-atelier-dev-secret-change-in-prod",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email.toLowerCase()));

          if (!user || !user.passwordHash) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const isMatch = await bcrypt.compare(password, user.passwordHash);
          if (!isMatch) {
            return done(null, false, { message: "Invalid email or password" });
          }

          return done(null, {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            avatarUrl: user.avatarUrl,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const [user] = await db
        .select({
          id: users.id,
          email: users.email,
          displayName: users.displayName,
          role: users.role,
          avatarUrl: users.avatarUrl,
        })
        .from(users)
        .where(eq(users.id, id));

      done(null, user || null);
    } catch (err) {
      done(err);
    }
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (!roles.includes(req.user!.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
