# EXHIBIT — Proof-First UI Component Library

  A comprehensive UI component platform with 69 production-ready React/TypeScript/Tailwind components across 24 categories.

  ## For AI Assistants (Cursor, VS Code Copilot, etc.)

  Drop this URL into your AI assistant to access the full component library:

  ```
  https://exhibit.replit.app/llms.txt
  ```

  ### API Endpoints

  | Endpoint | Description |
  |---|---|
  | `GET /api/llm/components` | All components with full source code |
  | `GET /api/llm/components?category=Loading` | Filter by category |
  | `GET /api/llm/components?q=button` | Search components |
  | `GET /api/llm/components/:slug` | Single component with full code |
  | `GET /api/llm/categories` | All 24 categories with counts |

  ### Categories

  Account · Admin · App Shells · Authentication · Billing · Buttons · Cards · Commerce · Communication · Dashboard · Data Density · Data Display · Empty States · Feedback · Gamification · Inputs · Layout · Loading · Marketplace · Navigation · Onboarding · Pricing · Style Families · Tables

  ## Tech Stack

  - **Frontend**: React 18, TypeScript, Tailwind CSS v4, Wouter, TanStack Query
  - **Backend**: Express 5, Node.js, tsx
  - **Database**: PostgreSQL + Drizzle ORM
  - **UI**: shadcn/ui, Radix UI, Framer Motion

  ## Setup

  ```bash
  npm install
  # Set DATABASE_URL env var to a PostgreSQL connection string
  npm run dev
  ```
  