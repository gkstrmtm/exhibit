# EXHIBIT Agent Handoff

This document explains exactly what should be delivered into another repository so a separate coding or product agent can understand and use the funnel intelligence developed in EXHIBIT.

Use this as the transfer checklist, ingestion guide, and implementation roadmap.

---

## What To Deliver

If you want the other agent to understand the full funnel capability, deliver these markdown files in this priority order.

### Tier 1: Required

These are the minimum files the receiving repo should ingest.

1. [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
   This is the canonical funnel-brain document.
   It explains funnel philosophy, decision variables, funnel families, blueprint rules, tactics, anti-patterns, and how agents should use EXHIBIT Stage 3.

2. [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
   This is the API and integration contract.
   It explains Stage 3 request/response shape, layout-family steering, and how to consume the blueprint output operationally.

### Tier 2: Recommended

These make the receiving agent more consistent and more aligned with EXHIBIT’s broader visual and structural system.

3. [design-foundations.md](design-foundations.md)
   Human-readable design rules, typography rules, spacing logic, and layout-family descriptions.

4. [design-foundations.json](design-foundations.json)
   Machine-readable version of the design foundations.
   Use this if the receiving repo has structured ingestion, rule validation, or prompt assembly.

### Tier 3: Optional Context

These are useful if the receiving agent also needs to understand where EXHIBIT is going next or how it thinks about broader UI quality.

5. [README.md](README.md)
   Useful for endpoint discovery, deployment shape, and general platform setup.

6. [ui-coherence-auditor-framework.md](ui-coherence-auditor-framework.md)
   Useful if the receiving system also wants EXHIBIT’s failure taxonomy for UI coherence and audit logic.

7. [exhibit-opportunity-map.md](exhibit-opportunity-map.md)
   Useful for long-term catalog and capability planning, not required for funnel execution.

---

## Best Placement In The Target Repo

If the receiving repository has no existing documentation conventions, use this structure:

```text
/docs/exhibit/FUNNEL_INTELLIGENCE_PLAYBOOK.md
/docs/exhibit/EXHIBIT_INTEGRATION.md
/docs/exhibit/design-foundations.md
/docs/exhibit/design-foundations.json
/docs/exhibit/EXHIBIT_AGENT_HANDOFF.md
```

If the receiving repository already has an agent or prompting area, use this structure instead:

```text
/agent-context/exhibit/FUNNEL_INTELLIGENCE_PLAYBOOK.md
/agent-context/exhibit/EXHIBIT_INTEGRATION.md
/agent-context/exhibit/design-foundations.md
/agent-context/exhibit/design-foundations.json
/agent-context/exhibit/EXHIBIT_AGENT_HANDOFF.md
```

Do not bury the playbook in a generic notes folder.
It should live somewhere agents, prompt assembly, or retrieval systems can access intentionally.

---

## Which Document Is The Source Of Truth

Treat the docs this way:

- [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md): source of truth for funnel reasoning and funnel-building philosophy
- [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md): source of truth for the Stage 3 request/response contract
- [design-foundations.json](design-foundations.json): source of truth for machine-readable style and layout-family rules
- [design-foundations.md](design-foundations.md): human-readable explanation of those design rules

Do not let the receiving repo treat EXHIBIT as a component library first.
The funnel playbook should remain the top conceptual layer.

---

## How The Receiving Agent Should Use These Docs

### If The Agent Is Building Funnels

Always read these in order:

1. [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
2. [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
3. [design-foundations.md](design-foundations.md)

The playbook tells the agent what kind of funnel to build.
The integration doc tells the agent how to talk to EXHIBIT.
The design foundations tell the agent how to keep the result visually disciplined.

### If The Agent Is Wiring EXHIBIT Into A Product

Prioritize:

1. [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
2. [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
3. [README.md](README.md)

That gives the receiving repo:

- the API contract
- the decision model behind the contract
- the endpoint and runtime context

### If The Agent Is Building A Funnel Builder Or Asset Library

It must treat EXHIBIT as a blueprint generator first and an asset-reference system second.

That means:

1. use Stage 3 to classify funnel family and generate page flow
2. use the playbook to understand why the blueprint is correct
3. only after that, map the resulting sections to internal assets, page templates, blocks, or exhibits

---

## What “Sticks” Right Now

These are the parts of the system that should be considered stable enough to port immediately.

### Stable Concepts

- funnel families should be selected by conversion job and friction, not by visual mood alone
- every serious funnel should be treated as a full-page persuasion system
- the required page jobs are:
  attention, belief builder, proof, mechanism explanation, offer plus CTA, reinforcement or objection handling
- design direction should be controlled at the page level, not improvised section by section
- proof, qualification, urgency, and CTA repetition should be matched to trust deficit and commitment threshold
- post-conversion continuity matters for call quality, show rate, and downstream conversion

### Stable Documents

- [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
- [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
- [design-foundations.md](design-foundations.md)
- [design-foundations.json](design-foundations.json)

### Stable Product Direction

- EXHIBIT Stage 3 is blueprint-first
- the receiving agent should not default back into component-picking behavior
- future intelligence expansion should deepen inputs, not replace the blueprint model

---

## Full Implementation Roadmap

This is the end-to-end plan so the work can move in one coherent pass instead of being reopened repeatedly.

### Phase 1: Documentation Transfer

Goal:

- place the required EXHIBIT docs in the target repository
- establish which file is authoritative for which layer

Deliverables:

- [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
- [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
- [design-foundations.md](design-foundations.md)
- [design-foundations.json](design-foundations.json)
- [EXHIBIT_AGENT_HANDOFF.md](EXHIBIT_AGENT_HANDOFF.md)

Exit condition:

- the receiving repo can read the docs and understand what EXHIBIT does without reading EXHIBIT server code

### Phase 2: Agent Ingestion And Prompt Wiring

Goal:

- make the receiving agent consistently consult the right docs for the right job

Implementation shape:

- use [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md) as the high-level funnel reasoning context
- use [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md) for Stage 3 request/response usage
- use [design-foundations.md](design-foundations.md) or [design-foundations.json](design-foundations.json) for style-family and layout-family discipline

Exit condition:

- the receiving agent can classify the funnel job, choose a funnel family, and reason about the page structure before generating UI

### Phase 3: Product-Level EXHIBIT Wiring

Goal:

- connect the receiving product to EXHIBIT Stage 3 as a live funnel planning service

Implementation shape:

- send `stage: "funnel-strategy"`
- pass `funnelContext` with audience warmth, commitment required, price point, and business profile
- optionally pass `layoutNeeds[]` and `constraints.visualPosture`
- consume `pageFlow[]`, `layoutBlueprint[]`, `designDirection`, `offerPositioningVariants[]`, and `conversionLogic`

Exit condition:

- the receiving product can use EXHIBIT as a funnel blueprint engine, not just as a reference library

### Phase 4: Asset And Builder Alignment

Goal:

- make the receiving repo’s funnel builder or asset pool map to EXHIBIT’s structural logic

Implementation shape:

- tag internal assets by funnel role:
  attention, proof, mechanism, CTA, qualification, reinforcement, confirmation, pre-call
- map those internal assets to Stage 3 page sections rather than selecting them by visual style alone
- preserve one design direction across the whole generated page

Exit condition:

- the receiving builder assembles coherent funnels intentionally instead of producing mixed-style block stacks

### Phase 5: Intelligence Expansion

Goal:

- make the funnel reasoning materially smarter over time

Recommended new inputs:

- traffic source
- buyer persona
- objection patterns
- offer uniqueness and competitive context
- economics: CPA, LTV, sales bandwidth
- post-conversion activation model
- historical test results

Exit condition:

- the receiving system can choose among variants more intelligently based on real commercial context, not just broad funnel categories

---

## What To Tell Your Other Agent

If you want one direct instruction to give the receiving agent, use this:

"Treat EXHIBIT as a funnel-intelligence and blueprint system, not as a component library. Ingest `FUNNEL_INTELLIGENCE_PLAYBOOK.md` as the primary reasoning document, `EXHIBIT_INTEGRATION.md` as the Stage 3 contract, and `design-foundations.md` plus `design-foundations.json` as the layout and style discipline layer. Use Stage 3 to generate complete conversion-page blueprints, then map those blueprints into the target app’s templates, assets, or builder blocks intentionally."

---

## If You Only Transfer One Markdown File

If you only want to hand over one markdown file at first, make it:

- [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)

That is the highest-signal file for another agent to understand what has been developed.

If you can transfer two, add:

- [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)

That combination is the minimum serious package.

---

## Current Recommendation

For the next repo you bring into the environment, the first pass should be:

1. copy [FUNNEL_INTELLIGENCE_PLAYBOOK.md](FUNNEL_INTELLIGENCE_PLAYBOOK.md)
2. copy [EXHIBIT_INTEGRATION.md](EXHIBIT_INTEGRATION.md)
3. copy [design-foundations.md](design-foundations.md)
4. copy [design-foundations.json](design-foundations.json)
5. copy [EXHIBIT_AGENT_HANDOFF.md](EXHIBIT_AGENT_HANDOFF.md)

Then wire the receiving agent to read the playbook first whenever the job involves:

- funnel planning
- appointment-setting pages
- funnel builders
- page sequencing
- proof/qualification/CTA logic
- asset-pool or exhibit selection for a conversion surface