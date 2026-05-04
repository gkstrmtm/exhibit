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

## Preflight and fallback

Before wiring a new client, confirm the handler is reachable:

- Hosted health check: `GET https://exhibit-beta.vercel.app/api/agent?health=1`
- Local fallback health check: `GET http://127.0.0.1:5000/api/agent?health=1`
- Local fallback API: `POST http://127.0.0.1:5000/api/agent`

If `http://127.0.0.1:5000` refuses the connection, the local EXHIBIT server is not running yet. Start it first:

```bash
npm run dev
```

The local server mirrors the same `/api/agent` contract as the hosted deployment and serves both the UI and API on port `5000`.

If a client reports `400 Bad Request` with no useful body, verify three things before assuming the endpoint is down:

1. The request is actually sending JSON, not an empty body.
2. `Content-Type` is `application/json`.
3. The client can pass through the POST body without stripping or rewriting it.

---

## When to call it

| Situation | Stage to use |
|---|---|
| Building any internal tool, ops surface, or workbench | `workflow-audit-and-iteration` |
| Improving a surface from functional to genuinely great | `elevation-audit` |
| Building a funnel, lead capture, or conversion surface | `funnel-strategy` |
| Checking whether an agent honored the prior fix list | `iteration-verify` |

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
| `whatToDeferUntilLater[]` | Safe to skip now — do not ship these in this pass |
| `scopeBoundary[]` | Hard stops for this surface — out of scope entirely, not just deferred |
| `buildMandate` | Single authoritative line the consuming agent should inject into its system prompt before building |
| `promptingOrWorkflowAdjustments[]` | How to brief the build agent better next time |

> **Usage:** Inject `buildMandate` directly into the build agent's system prompt. Pass `whatToFixInThisIteration`, `whatToDeferUntilLater`, and `scopeBoundary` verbatim into the `priorAudit` field of a later `iteration-verify` call.

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

Use before building any funnel, lead capture page, or conversion surface. Pass a `businessProfile` derived from the user's CRM record and the endpoint derives friction profile, CTA guidance, funnel pattern, positioning options, and a full-page funnel blueprint designed to move the visitor toward booking.

Canonical reference:

- [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md) is the persistent operating guide for funnel-family selection, blueprint logic, conversion tactics, anti-patterns, and agent integration posture.

Use this Stage 3 section as the API contract.
Use the playbook as the decision model.

### Layout Family Steering

The system now recognizes six high-level style families for public-facing surfaces:

| Family | Best for |
|---|---|
| `minimal-conversion` | high-clarity funnels, plain lead capture, one-CTA surfaces |
| `authority-consulting` | consulting offers, credibility-led premium service pages |
| `high-ticket-offer` | premium call-booking flows, slower high-consideration offers |
| `direct-response` | tighter response-first campaigns, repeated CTA flow |
| `editorial-premium` | advertorials, magazine-like premium storytelling, brand-forward pages |
| `precision-minimal` | sharp tool-like product or developer surfaces with near-zero decoration |

You do **not** need a dedicated field to trigger these. The router reads them from prompt language, `layoutNeeds[]`, and `constraints.visualPosture`.

Examples:

```json
{
  "stage": "funnel-strategy",
  "prompt": "Need a premium advertorial bridge that feels like a magazine, not SaaS.",
  "layoutNeeds": ["editorial premium", "less UI chrome", "serif headline"],
  "constraints": {
    "visualPosture": "warm editorial premium layout with generous spacing"
  }
}
```

```json
{
  "stage": "funnel-strategy",
  "prompt": "Need a tight direct response page with more CTA repetition and aggressive pacing.",
  "layoutNeeds": ["direct response", "repeated CTA", "tight spacing"],
  "constraints": {
    "visualPosture": "compressed aggressive conversion flow"
  }
}
```

### Typography Guardrails

- Default display font remains **Space Grotesk**.
- Body remains **Inter**.
- **Fraunces** is permitted only when the routed family is `editorial-premium`, and then only for major headlines or section anchors.
- The system should not choose fonts independently from the routed layout family.

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
| `funnelPattern` | Detected funnel family such as `direct-to-call`, `application-first`, `webinar-to-call`, `advertorial-to-application`, or `dm-to-call` |
| `designDirection` | One controlled page direction matched to the funnel pattern, such as `Event Momentum`, `Conversational Handoff`, `Selective Authority`, `Diagnostic Proof`, or `Value Exchange`, with rationale and visual rules |
| `pageFlow[]` | The six mandatory sections of the funnel in order — attention, belief builder, proof, mechanism explanation, offer + CTA, and objection handling |
| `layoutBlueprint[]` | Per-section layout shell: layout type, hierarchy, content blocks, and interaction model |
| `sequenceBlueprint[]` | Short ordered summary lines for the same vertical page flow |
| `offerPositioningVariants[]` | Candidate positioning angles matched to the detected funnel pattern |
| `conversionLogic` | Why the structure converts, where attention is controlled, where action is pushed, and how friction is reduced |

---

## Using the blueprint

`funnel-strategy` is no longer a component-shortlisting step.

Consume the response as a build brief for one full conversion page:

1. Start from `designDirection` to set the page-wide tone and guardrails.
2. Build the page vertically in the order declared by `pageFlow[]`.
3. For each section, use `layoutBlueprint[]` to decide the shell, hierarchy, content blocks, and interaction model.
4. Use `offerPositioningVariants[]` to choose the promise angle before writing copy.
5. Use `conversionLogic` to preserve the order of persuasion, action, and friction reduction during implementation.

If you want reference exhibits later, browse the catalog separately. The funnel response itself should be treated as the authoritative structural plan.

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

Fetch any of these via `/api/llm/components/<slug>`.

---

## Stage 4 — Iteration Verify

Use after any build pass to check whether the agent honored the prior audit. Closes the accountability loop. Call it with the `priorAudit` output from the previous `workflow-audit-and-iteration` response and a `shipped.changes` array describing what the agent actually built.

### Request
```json
{
  "stage": "iteration-verify",
  "prompt": "Describe what this pass was supposed to accomplish.",
  "priorAudit": {
    "whatToFixInThisIteration": ["..."],
    "whatToDeferUntilLater": ["..."],
    "scopeBoundary": ["..."],
    "buildMandate": "..."
  },
  "shipped": {
    "changes": ["removed duplicate tab controls", "replaced card grid with queue table"],
    "description": "Optional free-text summary of what was built."
  },
  "context": {
    "knownProblems": ["any new issues noticed during the build"]
  }
}
```

**`priorAudit`:** Pass the `whatToFixInThisIteration`, `whatToDeferUntilLater`, `scopeBoundary`, and `buildMandate` fields directly from the previous `workflow-audit-and-iteration` response.  
**`shipped.changes`:** One string per distinct change the agent made. Plain language.

### Response fields
| Field | Description |
|---|---|
| `verificationStatus` | `pass` / `partial` / `drift-detected` / `scope-violation` |
| `verificationVerdict` | Single plain-language summary of the pass result |
| `verificationMethod` | `"intent-classification"` — items are matched by design intent category, not keyword |
| `honoredItems[]` | Items from `whatToFixInThisIteration` that were addressed |
| `missedItems[]` | Items from `whatToFixInThisIteration` that were not addressed |
| `deferredViolations[]` | Items from `whatToDeferUntilLater` or `scopeBoundary` that were shipped anyway |
| `driftSignals[]` | New structural problems introduced during the pass |
| `persistentWeakSpots[]` | Intent categories that kept getting missed — feed these back into the next audit prompt |
| `intentMap` | Per-item breakdown of how each item was classified (`honored[].intents`, `missed[].intents`) — use to debug mismatches |
| `nextPassBrief` | Plain summary of what carries forward to the next pass |
| `buildMandate` | Authoritative contract for the next pass — inject into the build agent's system prompt |

> **Rule:** If `verificationStatus` is `"scope-violation"` — stop. Resolve the scope violation before the next pass.  
> **Rule:** If `deferredViolations[]` is non-empty — audit scope debt before adding any new structure.  
> **Rule:** Use `buildMandate` from this response (not the prior audit) to brief the next build pass.

---

## Hard rules for consuming the response

1. `elevationReadiness: "fix_structure_first"` — do not proceed with elevation. Resolve the structural gap first.
2. `dataIntegrityRisks[]` non-empty — do not design data-heavy regions. Declare real data sources first.
3. `architectureRisks[]` non-empty — do not surface detail-level data on the current screen. Move it behind a drill-down, drawer, or secondary route first.
4. Use `whatToFixInThisIteration[]` as the build brief for the **current pass only** — not the whole project.
5. Treat `pageFlow[]` and `layoutBlueprint[]` as the authoritative build brief for the full page, not as optional inspiration.
6. Do not invent structure the prompt does not earn. If the primary object, data source, or lifecycle is unclear, call `workflow-audit-and-iteration` before building anything.
7. After every `iteration-verify` call, POST the `intentMap`, `route`, and `verificationStatus` to `/api/agent/feedback`. The resolver uses accumulated feedback to reorder the fix list by historical miss rate on the next audit call.

---

## Feedback endpoint (learning loop)

After each `iteration-verify` response, report the result to close the learning loop. The resolver reads this signal and reorders `whatToFixInThisIteration` — intent categories that are frequently missed on a given route move to the top of the fix list automatically.

**POST** `https://exhibit-beta.vercel.app/api/agent/feedback`

```json
{
  "route": "operational-workbench",
  "verificationStatus": "partial",
  "intentMap": {
    "honored": [{ "item": "...", "intents": ["hierarchy"], "method": "intent" }],
    "missed":  [{ "item": "...", "intents": ["state-continuity"] }]
  }
}
```

Pass the `intentMap`, `verificationStatus`, and `route` fields directly from the `iteration-verify` response. The `route` comes from the `workflow-audit-and-iteration` response field `feedbackIntelligence.route`.

**GET** `https://exhibit-beta.vercel.app/api/agent/feedback?route=operational-workbench`

Returns the current boost table for a route — `topMissedCategories`, `topHonoredCategories`, `sampleSize`, and `boosts` (missRate per intent category).

### How boosts work

| Field in workflow-audit response | Meaning |
|---|---|
| `feedbackIntelligence.boostActive` | `true` when historical signal has reordered the fix list |
| `feedbackIntelligence.priorityFocus[]` | Intent categories with ≥50% miss rate on this route — currently boosted |
| `feedbackIntelligence.note` | Human-readable explanation of whether boost is active |

Boosts activate after **5 DB samples** (or 3 in-memory on a warm instance). Below that threshold the fix list is static. Boosts affect ordering only — they do not remove or add items.

---

## Discovery endpoints

| URL | Purpose |
|---|---|
| `https://exhibit-beta.vercel.app/for-ai` | Human-readable docs for AI agents |
| `https://exhibit-beta.vercel.app/llms.txt` | Machine-readable catalog summary |
| `https://exhibit-beta.vercel.app/api/openapi` | OpenAPI schema |
| `https://exhibit-beta.vercel.app/api/categories` | Full category list |
| `https://exhibit-beta.vercel.app/api/exhibits` | Component catalog |
| `https://exhibit-beta.vercel.app/api/agent/feedback` | Feedback endpoint — report verify results, read route boost stats |
