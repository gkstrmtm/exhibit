# UI Coherence Auditor Framework

## 1. Umbrella Problem

### Primary Name
Interface Coherence Failure

### Operational Symptom Name
Signal-to-Noise Collapse

### Definition
Interface coherence failure happens when a screen exposes more competing structure, controls, labels, and permanent text than the underlying task can justify, while also failing to compose those elements into one legible product surface.

This is not a style preference problem. It is a product-quality failure with three direct effects:

- the user cannot tell what matters first
- the interface leaks system effort instead of product intent
- the screen demands more interpretation than the job requires

### What This Failure Produces

- slower scanning
- weaker trust
- lower action confidence
- higher cognitive cost
- more accidental redundancy
- more UI that feels assembled instead of designed

## 2. Failure Taxonomy

### A. Composition Failure
The surface does not behave like one composed unit. Headers, controls, labels, values, and actions feel bolted together instead of structurally related.

Typical symptoms:

- header areas with repeated scope labels or repeated control meaning
- action buttons with no visible hierarchy
- labels and values fighting for the same ownership
- toolbar controls added because they exist, not because the task requires them

Detection signals:

- more than one control expressing the same scope or filter dimension
- header regions with too many control groups before the main work surface begins
- title, subtitle, filter, and CTA regions lacking a dominant visual order
- sibling controls whose semantic labels have high overlap but different interaction models

### B. Hierarchy Failure
The screen does not clearly communicate primary task, secondary context, and tertiary metadata.

Typical symptoms:

- summary cards competing with the actual working surface
- too many equal-weight headings
- labels, helper text, chips, and metrics all shouting at once
- no obvious place for the eye to begin

Detection signals:

- more than one primary-looking region above the fold
- multiple heading styles occupying the same visual tier
- primary surface area taking too little visual share relative to chrome
- emphasis density too high across the first viewport

### C. Semantic Duplication
The interface repeats meaning across labels, controls, statuses, and helper text without adding new utility.

Typical symptoms:

- "Month" next to "All months"
- repeated status language in card, chip, row, and footer text
- helper text restating what the adjacent control already says
- labels and section titles describing the same thing twice

Detection signals:

- high lexical similarity between adjacent labels, values, or controls
- duplicate domain nouns repeated in the same region with no state difference
- multiple controls binding to the same filter or slice of data
- repeated copy with low informational delta

### D. Surface Bloat
The screen contains more visible containers, panels, chips, cards, summaries, and footers than the task earns.

Typical symptoms:

- card piles around a task that should be table-first or detail-first
- too many low-value summaries above a work queue
- fragmented sections that split one job into five containers
- decorative badges and labels attached to everything

Detection signals:

- excessive container count above the fold
- weak ratio between task-bearing regions and framing chrome
- too many summary surfaces relative to actionable objects
- multiple secondary panels open by default without clear need

### E. Interaction Waste
The UI makes the user do manual filtering, clicking, choosing, or confirming that the system should reduce, automate, or eliminate.

Typical symptoms:

- dropdowns used where a tighter segmented control or inferred default would work better
- too many controls before any user can see useful data
- action flows that require repeated explicit choices for obvious defaults
- controls that exist because the implementation exposed raw state, not because users need manual command

Detection signals:

- controls with low selection entropy and highly stable default outcomes
- filter controls with little or no effect on downstream content
- dropdowns with tiny option sets or overbroad catch-all options
- repeated user steps that could be inferred from role, route, or current object

### F. Design System Drift
The surface violates shared spacing, sizing, type, token, or component behavior rules, making it feel assembled from mismatched sources.

Typical symptoms:

- inconsistent padding and gap rhythm
- mismatched chip, button, and input treatments
- mixed text sizes at the same hierarchy level
- sections that feel like they came from different design systems

Detection signals:

- token deviations from approved size, spacing, and radius scales
- more than one variant family used for the same control role in the same region
- inconsistent typography mapping for equal semantic roles
- sibling layout groups with mismatched spacing cadence

### G. Productization Failure
Internal, raw, dev-sounding, placeholder, or mechanically generated language leaks into the UI.

Typical symptoms:

- labels like "review queue controls"
- footers that narrate implementation state instead of helping the user act
- helper text that sounds like QA notes, system descriptions, or schema labels
- generic system copy that feels careless or auto-generated

Detection signals:

- copy matching internal vocabulary, implementation nouns, or placeholder phrasing
- section labels that describe container mechanics instead of user purpose
- persistent text with no directive, explanation, reassurance, or decision value
- repeated nouns that expose backend/system categories instead of product language

### H. Scan-Path and Density Breakdown
The user cannot scan the surface efficiently because density is unmanaged, grouping is weak, and the visual rhythm is noisy.

Typical symptoms:

- cramped toolbars attached to loose empty sections
- dense tables mixed with spacious cards and oversized helper blocks
- too many chips, badges, and secondary labels competing with row content
- visual attention pulled sideways before the main task is understood

Detection signals:

- density mode mixed within a single view
- first-viewport gaze map containing too many competing anchors
- low whitespace discipline around primary group boundaries
- information scent spread across too many small visual stops

## 3. Detection Model

The auditor should not rely on one source. This problem only becomes detectable when structure, language, styling, and interaction are evaluated together.

### Required Inputs

- DOM or component tree with semantic roles
- layout geometry from rendered UI
- screenshot or image snapshot for visual composition checks
- copy inventory for every visible string
- design-token usage map for typography, spacing, color, radius, and sizing
- interaction model map for controls, actions, filters, and navigation
- optional telemetry for actual control usage, abandonment, and repeated toggles

### Core Detection Primitives

#### 1. Region Graph
Build a model of the screen as regions: header, toolbar, navigation, primary surface, secondary surface, footer, modal, rail.

Why it matters:

- coherence problems are usually region problems before they are component problems

#### 2. Semantic Graph
Normalize visible nouns, verbs, and scopes across labels, headings, controls, statuses, and helper text.

Why it matters:

- duplication and weak wording are semantic failures, not just copy failures

#### 3. Token Conformance Map
Compare actual style values against approved design foundations.

Why it matters:

- drift is measurable only when token use is explicit

#### 4. Interaction Burden Map
Count decisions, controls, and steps required before the user reaches the primary task.

Why it matters:

- a screen can be visually neat and still overwork the user

#### 5. Attention Map
Estimate how many distinct focal points exist above the fold and whether one dominant task region actually wins.

Why it matters:

- signal-to-noise collapse is fundamentally an attention-allocation failure

## 4. Audit Framework

### Coherence Score
Score each screen from 0 to 100.

Use weighted dimensions instead of a single soft opinion.

| Dimension | Weight | What It Measures |
|---|---:|---|
| Composition integrity | 20 | Whether the screen reads as one deliberate surface |
| Hierarchy clarity | 15 | Whether the user can tell what matters first |
| Semantic economy | 15 | Whether the UI avoids duplicate meaning |
| Surface economy | 15 | Whether visible structure is justified by the task |
| Interaction appropriateness | 15 | Whether controls match the job and reduce manual work |
| Design system conformance | 10 | Whether spacing, type, and component treatment stay consistent |
| Product-language quality | 5 | Whether copy feels productized rather than internal |
| Scanability and density discipline | 5 | Whether the screen is easy to scan without overload |

### Severity Model

- Critical: blocks shipping; creates direct task confusion, contradictory control meaning, severe bloat, or strong internal-language leakage in primary UI
- Major: should block merge unless explicitly waived; harms clarity, trust, or workflow speed
- Moderate: should be fixed in the next pass; adds noticeable friction or inconsistency
- Minor: polish issue; visible but not structurally damaging alone

### Release Gates

- 85 to 100: pass
- 70 to 84: review required
- 50 to 69: hold
- below 50: block

Any critical violation can block even when the overall score is high.

## 5. Example Heuristics and Checks

### Header Incoherence

- Flag when header contains more than one control targeting the same scope dimension
- Flag when title nouns overlap heavily with adjacent filter labels without changing meaning
- Flag when more than one primary action appears visually equivalent in the same header band
- Flag when the header region contains more controls than the first task row or object preview can justify

### Redundant or Low-Value Text

- Flag persistent copy blocks that do not contain instruction, warning, decision support, or state explanation
- Flag helper text with more than 70% lexical overlap with the associated label or placeholder
- Flag footer or caption text that narrates system mechanics instead of user consequence
- Flag sections where multiple labels restate already-visible state

### Visual Inconsistency

- Flag sibling cards using inconsistent padding tiers in the same cluster
- Flag controls serving the same role with different heights, radii, or font weights
- Flag regions where heading levels and body sizes are not mapped consistently
- Flag local spacing values that break the approved 4px rhythm without explicit exemption

### Surface Bloat

- Flag views with too many containers above the fold relative to the number of actionable objects
- Flag summary-card rows that compete with a queue, table, or editor that should dominate
- Flag when decorative chips outnumber decision-bearing controls
- Flag when more than one secondary panel is expanded by default without role-based need

### Interaction Misuse

- Flag dropdowns with very small option sets that should be tabs, segmented controls, or toggles
- Flag filters with low behavioral effect on the result set
- Flag controls that repeat what the route, role, or current object already determines
- Flag manual task steps that could be inferred from context or automated safely

### Product-Language Quality

- Flag internal or implementation-sounding nouns in user-facing headers, footers, and section titles
- Flag labels built from container names instead of user jobs
- Flag placeholder-style phrasing such as generic system status or vague section summaries
- Flag repeated terms that make the interface sound generated rather than productized

## 6. Correction Paths

Every violation should produce an action path, not just a complaint.

### Correction Output Shape

- what is wrong
- why it is harmful
- evidence the system saw
- recommended fix direction
- severity
- confidence

### Example Fix Directions

- Merge duplicate scope controls into one owned control group
- Remove persistent text that does not change action or understanding
- Collapse decorative summary cards into one compact status line
- Replace raw dropdown with a tighter interaction model or a stronger default
- Rename internal labels in terms of user goal, object, or decision
- Normalize spacing and control sizing back to token rules

## 7. Platform Capability Architecture

### Product Name
UI Coherence Auditor

### Core Services

#### 1. Surface Intake Service
Accepts route URLs, screenshots, DOM snapshots, Storybook stories, Figma exports, or component trees.

#### 2. UI Parsing Layer
Builds a region graph, text inventory, token map, and interaction map.

#### 3. Rule Engine
Runs deterministic checks for duplication, token drift, container count, density violations, copy leaks, and control misuse.

#### 4. Reasoning Layer
Uses model-based judgment only where deterministic rules are insufficient: awkward phrasing, weak section naming, header composition, productization quality, and task-to-control mismatch.

#### 5. Scoring and Policy Layer
Combines rule hits into severity, weighted dimension scores, block decisions, and repair priorities.

#### 6. Reporting Layer
Returns a structured report for PR checks, design review, QA, and route audits.

## 8. Recommended API Shape

### Input

```json
{
  "route": "/claims/review",
  "screenId": "claims-review-default",
  "domSnapshot": "...",
  "screenshotUrl": "https://...",
  "tokenUsage": { "spacing": [], "typography": [], "radii": [] },
  "copyInventory": [],
  "interactionMap": [],
  "context": {
    "primaryTask": "review and disposition claims",
    "primaryActor": "claims reviewer",
    "surfaceType": "operational-workbench"
  }
}
```

### Output

```json
{
  "score": 62,
  "outcome": "hold",
  "dimensions": [
    {
      "id": "semantic-economy",
      "score": 44,
      "severity": "major"
    }
  ],
  "violations": [
    {
      "id": "duplicate-scope-controls",
      "severity": "critical",
      "title": "Header duplicates month scope",
      "evidence": ["Month", "All months"],
      "whyItMatters": "The header repeats scope meaning and weakens decision clarity.",
      "recommendation": "Keep one owned scope control and remove the duplicate phrasing."
    }
  ],
  "repairPlan": [
    "Reduce header controls to one scope cluster and one primary action.",
    "Remove persistent footer copy that does not change user action.",
    "Normalize toolbar padding and button sizing to token rules."
  ],
  "shipBlockers": ["duplicate-scope-controls"]
}
```

## 9. Workflow Integration

### Design Workflow

- run as a Figma preflight on high-value frames
- surface violations before design review
- let design leads waive only explicitly, with rationale

### Component Workflow

- run on Storybook stories and local component states
- fail when token drift or raw/internal language is introduced
- compare new variants against approved role behavior

### Product Workflow

- run route audits on staging for top product surfaces
- track screen scores over time, not just one-off snapshots
- show regressions by route, team, and failure category

### Release Workflow

- block release on critical coherence failures
- require review when a route score drops beyond threshold
- attach repair plans directly to PRs or QA tickets

## 10. Practical Build Path

### Phase 1: Deterministic Auditor
Build a rule-first checker using DOM, tokens, copy inventory, and screenshots.

Ship first:

- token drift detection
- duplicate control meaning detection
- low-value persistent text checks
- container-count and surface-bloat checks
- basic internal-language leak detection

### Phase 2: Reasoned Audit Layer
Add model-assisted checks for awkward naming, composition quality, and productization judgment.

Ship next:

- header coherence review
- semantic duplication review
- product-language quality review
- interaction-model mismatch review

### Phase 3: Workflow Enforcement
Integrate into PRs, Storybook, route crawls, and design review systems.

Ship next:

- route score history
- team-level failure trends
- waiver system with owner and expiration
- blocking policies for repeated failure classes

## 11. Bottom Line

The category you are describing is real. The clean umbrella name is interface coherence failure. The operational symptom is signal-to-noise collapse.

The platform capability should not be a vague design critic. It should be a UI coherence auditor that:

- measures structure, language, interaction, and visual discipline together
- reports violations in sharp product language
- recommends concrete correction paths
- blocks weak UI when the failures are severe enough

That turns repeated UI sloppiness into something measurable, reviewable, and eventually preventable.