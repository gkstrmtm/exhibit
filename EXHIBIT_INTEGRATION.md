# EXHIBIT Design Intelligence — Integration Guide

> Drop this file into any agent system prompt, project README, or integration doc.  
> No prior context about EXHIBIT required.

---

## What this is

EXHIBIT exposes a design intelligence API that classifies UI surfaces, catches structural problems, and returns actionable guidance **before or during any UI build step**.

It does not generate UI. It governs the quality of what gets built.

**Endpoint:** `POST https://exhibit-beta.vercel.app/api/agent`  
**Content-Type:** `application/json`  
**Auth:** None required  
**Latency:** ~80–200ms (deterministic, no LLM)  
**Scale:** Safe for hundreds of concurrent requests

---

## When to call it

| Situation | Stage to use |
|---|---|
| Building any internal tool, ops surface, or workbench | `workflow-audit-and-iteration` |
| Improving a surface from functional to genuinely great | `elevation-audit` |
| Building a funnel, lead capture, or conversion surface | `funnel-strategy` |

---

## Stage 1 — Workflow Audit

Use before building or iterating any operational or internal tool surface.

### Request
```json
{
  "stage": "workflow-audit-and-iteration",
  "route": "operational-workbench",
  "prompt": "Describe the surface: primary user, primary object, data sources, allowed actions, lifecycle stages, what works, what is broken.",
  "context": {
    "primaryObject": "e.g. client record",
    "userRoles": ["manager"],
    "dataSources": ["CRM", "task queue"],
    "mutations": ["assign", "update status", "move stage"],
    "existingSurfaceSignals": ["client table", "status drawer"],
    "knownProblems": ["cards feel heavier than the work they govern"]
  }
}
```

### Response fields
| Field | Description |
|---|---|
| `currentDirectionToPreserve[]` | What not to change — preserve this |
| `majorPitfallsOrWorkflowFlaws[]` | Structural problems and drift risks |
| `whatToFixInThisIteration[]` | Ordered fix list for this build pass |
| `whatToDeferUntilLater[]` | Safe to skip now |
| `promptingOrWorkflowAdjustments[]` | How to brief the build agent better next time |

---

## Stage 2 — Elevation Audit

Use when a surface is functional but generic. Returns what separates good from great for this specific surface.

### Request
```json
{
  "stage": "elevation-audit",
  "route": "operational-workbench",
  "prompt": "Describe the surface including what already works and what feels generic or assembled.",
  "context": {
    "primaryObject": "e.g. client record",
    "userRoles": ["operations manager"],
    "dataSources": ["CRM", "scheduling API"],
    "mutations": ["assign", "update status"],
    "existingSurfaceSignals": ["client queue", "task panel"],
    "userComplaint": "Cards everywhere, kebab menus on every row, labels all say Dashboard."
  }
}
```

### Response fields
| Field | Description |
|---|---|
| `elevationReadiness` | `"ready_to_elevate"` or `"fix_structure_first"` — hard stop if surface has unresolved structural gaps |
| `whatIsAlreadyGood[]` | Preserve these — do not change |
| `genericTraps[]` | Assembled or filler patterns to remove |
| `frictionCuts[]` | Highest-leverage friction reductions |
| `differentiatingMoves[]` | What separates this surface from generic software |
| `elevationSequence[]` | Ordered 6-step execution plan |
| `dataIntegrityRisks[]` | Present when placeholder vocabulary or missing data sources are detected |

> **Rule:** If `elevationReadiness` is `"fix_structure_first"` — stop. Do not proceed with elevation until structural gaps are resolved.  
> **Rule:** If `dataIntegrityRisks[]` is non-empty — do not design data-heavy regions until real sources are declared.

---

## Stage 3 — Funnel Strategy

Use before building any funnel, lead capture page, or conversion surface. Pass a `businessProfile` derived from the user's CRM record and the endpoint derives friction profile, CTA guidance, and a component plan.

### Request
```json
{
  "stage": "funnel-strategy",
  "prompt": "Describe the funnel or conversion surface being built.",
  "funnelContext": {
    "audienceWarmth": "cold",
    "commitmentRequired": "email",
    "pricePoint": "low",
    "businessProfile": {
      "businessType": "local service",
      "industry": "home services",
      "targetAudience": "homeowners in metro area"
    }
  }
}
```

**`audienceWarmth`:** `"cold"` | `"warm"` | `"hot"`  
**`commitmentRequired`:** `"none"` | `"email"` | `"trial"` | `"purchase"` | `"application"`  
**`pricePoint`:** `"free"` | `"low"` | `"medium"` | `"high"` | `"enterprise"`  
**`businessType`** (most common): `"local service"` | `"coaching"` | `"saas"` | `"agency"` | `"enterprise"`

All fields are optional. The endpoint falls back gracefully on any missing input.

### Response fields
| Field | Description |
|---|---|
| `frictionProfile` | `frictionless` / `light-touch` / `structured` / `high-commitment` |
| `conversionMechanism` | `email-capture` / `trial-signup` / `purchase` / `application-submit` |
| `tensionStrategy[]` | Copy and structural tactics matched to the friction level |
| `ctaGuidance` | Primary CTA, secondary CTA, timing, copy direction |
| `dataCollectionOrder[]` | What to ask for and in what sequence |
| `dropoffRisks[]` | Where this funnel type loses visitors and why |
| `progressionAnchors[]` | Structural moves that keep visitors moving forward |
| `trustSignalPlacement[]` | Where trust signals belong and what type |
| `timingMap[]` | Per-moment visitor journey — `deliverNow` vs `deferUntil` at each stage (0–3s, 3–15s, 15–40s, etc.) |
| `componentSuggestions[]` | Ordered list of component slugs — pass to catalog to retrieve source |

---

## Fetching components

After a `funnel-strategy` call, retrieve component source code by slug:

```
GET https://exhibit-beta.vercel.app/api/exhibits?slug=<slug>
```

Example: if `componentSuggestions[0]` is `"marketing-hero-shell"`:

```
GET https://exhibit-beta.vercel.app/api/exhibits?slug=marketing-hero-shell
```

Returns the full component record including source, tags, category, and design profile.

---

## CRM mapping reference

For `funnelContext.businessProfile`, map directly from a CRM contact or account record:

| CRM field | businessProfile field |
|---|---|
| Contact type / industry tag | `businessType` |
| Industry vertical | `industry` |
| Target market / ideal customer | `targetAudience` |
| Product category | `productCategory` |
| Pipeline stages | `existingPipelineStages[]` |

---

## Admin & integration components

Four components in the **Admin** category represent the integration surface for platforms that consume this API:

| Slug | Purpose |
|---|---|
| `api-key-panel` | API credential management — masked key display, copy, rotate, scopes, last-used timestamp |
| `data-source-connection-card` | Connected data source list with field schema — maps directly to `context.dataSources[]` |
| `webhook-config-row` | Webhook endpoint configuration — event type badges, active toggle, mono URL |
| `agent-run-log-row` | Agent execution log — stage name, input hash, latency, status badge (ok / gated) |

Fetch any of these via `/api/exhibits?slug=<slug>`.

---

## Hard rules for consuming the response

1. `elevationReadiness: "fix_structure_first"` — do not proceed with elevation. Resolve the structural gap first.
2. `dataIntegrityRisks[]` non-empty — do not design data-heavy regions. Declare real data sources first.
3. `architectureRisks[]` non-empty — do not surface detail-level data on the current screen. Move it behind a drill-down, drawer, or secondary route first.
4. Use `whatToFixInThisIteration[]` as the build brief for the **current pass only** — not the whole project.
5. `componentSuggestions[]` is ordered by fit — start from index 0.
6. Do not invent structure the prompt does not earn. If the primary object, data source, or lifecycle is unclear, call `workflow-audit-and-iteration` before building anything.

---

## Discovery endpoints

| URL | Purpose |
|---|---|
| `https://exhibit-beta.vercel.app/for-ai` | Human-readable docs for AI agents |
| `https://exhibit-beta.vercel.app/llms.txt` | Machine-readable catalog summary |
| `https://exhibit-beta.vercel.app/api/openapi` | OpenAPI schema |
| `https://exhibit-beta.vercel.app/api/categories` | Full category list |
| `https://exhibit-beta.vercel.app/api/exhibits` | Component catalog |
