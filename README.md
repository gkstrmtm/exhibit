# EXHIBIT — Proof-First UI Component Library

  A comprehensive UI component platform with 177 production-ready React/TypeScript/Tailwind components across 25 categories.

  ## For AI Assistants (Cursor, VS Code Copilot, etc.)

  For funnel-building and blueprint-first agent context, start with:

  - [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
  - [EXHIBIT_AGENT_HANDOFF.md](EXHIBIT_AGENT_HANDOFF.md)

  Use the structured agent endpoint first when the client can make real HTTP calls:

  ```
  https://exhibit-beta.vercel.app/api/agent
  ```

  Use this discovery file only as a crawlable fallback for tools that cannot call the structured API:

  ```
  https://exhibit-beta.vercel.app/llms.txt
  ```

  ### API Endpoints

  | Endpoint | Description |
  |---|---|
  | `GET /api/agent` | Question-router mode for surface classification and resource pull |
  | `POST /api/agent` | Structured resolution mode with normalized orchestration fields, optional AI merge, optional source hydration, and screenshot grounding |
  | `GET /api/llm/components` | All components with full source code |
  | `GET /api/llm/components?category=Loading` | Filter by category |
  | `GET /api/llm/components?q=button` | Search components |
  | `GET /api/llm/components/:slug` | Single component with full code |
  | `GET /api/llm/categories` | All 25 categories with counts |

  `POST /api/agent` is the main contract for coding agents. Use `includeAiReasoning` to merge model judgment into the static EXHIBIT packet, and `includeComponentSource` to hydrate eligible matches with real component files.

  ### Categories

  Use `GET /api/llm/categories` for the current category list and counts.

  ## Tech Stack

  - **Frontend**: React 18, TypeScript, Tailwind CSS v4, Wouter, TanStack Query
  - **Backend**: Express 5, Node.js, tsx
  - **Database**: PostgreSQL + Drizzle ORM
  - **UI**: shadcn/ui, Radix UI, Framer Motion

  ## Setup

  ```bash
  npm install
  # Copy .env.example to .env and fill in the values you need
  npm run dev
  ```

  ### Environment Variables

  Put these in a root `.env` file:

  ```bash
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exhibit
  SESSION_SECRET=replace-this-with-a-long-random-secret
  OPENAI_API_KEY=your_openai_api_key_here
  OPENAI_BASE_URL=https://api.openai.com/v1
  OPENAI_MODEL=gpt-4.1
  OPENAI_MAX_TOKENS=2400
  OPENAI_TEMPERATURE=0.2
  ```

  `OPENAI_API_KEY` is the only required AI credential. It powers screenshot grounding and optional `includeAiReasoning` merges on `POST /api/agent`. The prompt builder also exposes a live multimodal analysis action at `/prompts` that sends the generated prompt plus attached screenshots through the local server and does not store the request in the database.

## Verification

```bash
npm run verify:agent
npm run verify:agent:remote
```

- `verify:agent` runs the in-process smoke harness for static routing, source hydration, AI merge fallback, and screenshot-grounded flow.
- `verify:agent:remote` exercises the deployed `/api/agent` contract against `https://exhibit-beta.vercel.app` by default. Override with `AGENT_VERIFY_URL` if needed.

## Vercel Deployment

This repo now supports a Vercel deployment with:

- a static Vite frontend from `dist`
- a catch-all serverless Node function for `/api/*`
- a dedicated serverless function for `/llms.txt`

### Provide These In Vercel

Add these in the Vercel project settings under `Settings -> Environment Variables`:

```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=use-a-long-random-secret
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4.1
OPENAI_MAX_TOKENS=2400
OPENAI_TEMPERATURE=0.2
```

Minimum production requirements:

- `DATABASE_URL`: required for auth and session storage
- `SESSION_SECRET`: required for production session signing
- `OPENAI_API_KEY`: required only if you want live AI analysis in `/prompts`

### Before You Deploy

Make sure the target PostgreSQL database already has the `session` table and the rest of the app schema. This repo defines the schema in `shared/schema.ts`, but there is no committed migration history in the repo right now, so you need to push the schema to the deployment database before expecting auth to work.

### Deploy Flow

1. Import the repo into Vercel.
2. Let Vercel use the included `vercel.json`.
3. Add the environment variables above.
4. Deploy.

If you want me to handle CLI deployment too, the only credential you would need to provide interactively is your Vercel login context via the Vercel CLI on this machine. The app secrets themselves should stay in Vercel project environment variables, not hardcoded in the repo.
  