# Overview

EXHIBIT is a comprehensive proof-first UI component platform featuring authentication, creator profiles with gamification (levels, titles, reputation), exhibit publishing with versioning/remix, collections, challenges with ranking, marketplace for component packs, founder scouting/hiring, and admin moderation. Includes enhanced profile customization (cover photos, handles, signature stamps, theme accents), onboarding flows for creators and founders, profile strength meter, multi-signal reputation system, and social proof elements throughout.

Also serves as an AI-accessible component library: developers can drop `/llms.txt` or `/api/llm/components` into any AI coding assistant (Cursor, VS Code Copilot, Claude, etc.) to fetch real component source code by category or slug.

## Component Library (69 exhibits across 24 categories)
- **Seed data** lives in `server/seeds/` directory with category-specific files: dashboard.ts, onboarding-auth.ts, commerce.ts, data-admin.ts, marketplace-social.ts, feedback-styles.ts
- **Categories**: Account, Admin, App Shells, Authentication, Billing, Buttons, Cards, Commerce, Communication, Dashboard, Data Density, Data Display, Empty States, Feedback, Gamification, Inputs, Layout, Loading, Marketplace, Navigation, Onboarding, Pricing, Style Families, Tables
- **Style Families**: Clean Minimal, Dark Premium, Glass Frost, Bold Editorial, Dense Pro UI
- **Category slug mapping**: sidebar generates URL slugs from category names (e.g., "App Shells" → "app-shells"), home page resolves them back via /api/categories

The app follows a full-stack TypeScript architecture with a React frontend and Express backend, backed by a PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend (client/)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin) with CSS variables for theming
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Fonts**: Inter (body), Space Grotesk (display headings), JetBrains Mono (code)
- **Code Highlighting**: prism-react-renderer for syntax highlighting in code blocks
- **Animations**: Framer Motion for component transitions
- **Build Tool**: Vite with React plugin

The frontend renders exhibit cards with a preview/code toggle. Previews use raw HTML injection (`innerHTML`) from the database's `htmlPreview` field, while the code tab shows syntax-highlighted React source code. There's also a local component registry (`client/src/lib/registry.tsx`) that maps exhibit components for potential live rendering.

The layout has a sidebar navigation with category links and a responsive mobile menu.

## Backend (server/)
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, executed via `tsx`
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Key Endpoints**:
  - `GET /api/exhibits` — list all exhibits, with optional `?category=` or `?q=` query params
  - `GET /api/exhibits/:slug` — get a single exhibit by slug
  - `GET /api/categories` — get distinct category names
- **Dev Server**: Vite dev server is integrated as middleware for HMR during development
- **Production**: Static files served from `dist/public/` with SPA fallback

## Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema validation
- **Schema** (in `shared/schema.ts`): Multiple tables including:
  - `users` — authentication, roles, handles, onboarding state
  - `exhibits` — components with versioning, remix chain, quality badges
  - `creatorProfiles` — profile customization, gamification (level, title, reputation), skills/stack tags, signature stamps
  - `testimonials` — endorsements with approval flow
  - `reputationSignals` — multi-signal reputation tracking (quality_check, save, remix_adoption, etc.)
  - `collections`, `collectionItems` — user curated collections
  - `saves`, `votes` — exhibit engagement
  - `challenges`, `challengeEntries` — community challenges with ranking
  - `packs`, `packItems`, `purchases` — marketplace for component packs
  - `follows`, `blocks` — social connections
  - `reports`, `scoutRequests` — moderation and hiring
  - `auditLogs`, `badges`, `exhibitVersions` — admin and versioning
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Seeding**: `server/seed.ts` contains initial exhibit data

## Shared Code (shared/)
- `shared/schema.ts` contains database schema and Zod validation types shared between frontend and backend
- Path alias `@shared/*` resolves to this directory

## Build Process
- **Development**: `npm run dev` starts the Express server with Vite middleware for HMR
- **Production Build**: `npm run build` runs a custom build script (`script/build.ts`) that:
  1. Builds the client with Vite (output to `dist/public/`)
  2. Bundles the server with esbuild (output to `dist/index.cjs`), externalizing most dependencies except an allowlist
- **Production Start**: `npm start` runs `node dist/index.cjs`

## Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

# External Dependencies

## Required Services
- **PostgreSQL Database**: Required. Connection string must be provided via `DATABASE_URL` environment variable. Used with `pg` (node-postgres) driver and Drizzle ORM.

## Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: Database ORM and migration tooling
- **express** v5: HTTP server framework
- **@tanstack/react-query**: Client-side data fetching and caching
- **wouter**: Lightweight client-side routing
- **prism-react-renderer**: Code syntax highlighting
- **framer-motion**: Animation library
- **Radix UI**: Accessible UI primitives (dialog, tooltip, tabs, etc.)
- **shadcn/ui**: Pre-built component library using Radix + Tailwind
- **connect-pg-simple**: PostgreSQL session store (available but may not be actively used)
- **vaul**: Drawer component
- **embla-carousel-react**: Carousel functionality
- **recharts**: Charting library (available via chart component)

## Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling (dev only)
- `@replit/vite-plugin-dev-banner`: Development banner (dev only)
- Custom `vite-plugin-meta-images`: Updates OpenGraph meta tags with Replit deployment URLs