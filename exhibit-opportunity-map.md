# Exhibit Opportunity Map

## Purpose

This document defines the next wave of exhibit families that are strategically valuable for EXHIBIT.

The goal is not to add more random components. The goal is to add exhibits that break real product bottlenecks:

- patterns users struggle to describe clearly
- patterns agents struggle to invent or compose correctly from scratch
- patterns that improve `/api/agent` routing, repair guidance, and implementation usefulness
- patterns that make the UI coherence auditor concrete instead of theoretical

## Selection Lens

Each exhibit family is judged on three axes.

### 1. Agent Construction Difficulty
How hard it is for an agent to design the pattern correctly without strong precedent.

### 2. User Articulation Difficulty
How hard it is for a user to explain what they need in plain language without already knowing UI system vocabulary.

### 3. Product Leverage
How much the family improves the value of EXHIBIT as a system, not just as a gallery.

## Scoring

- `High`: core bottleneck
- `Medium`: meaningful gap
- `Low`: useful but not urgent

## Tier 1: Immediate Build Families

These are the highest-value exhibit families because they block strong agent output right now.

### 1. Async Tab Transition Patterns

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users say things like "tab switch blanks the pane" or "it reloads weird" without naming the structural issue.
- Agents routinely fail to specify whether a tab swap should show stale content, skeletons, partial loading, or full reset.

What to build:

- segmented tabs with stale-content preservation
- segmented tabs with panel skeleton replacement
- async tab rail with focus preservation
- wrong-vs-right tab loading comparison

### 2. Dropdown vs Segmented Control Decision Patterns

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- This is one of the clearest coherence failures across AI-generated UI.
- Users can feel the problem immediately, but usually describe it as "clunky" or "too much clicking".

What to build:

- anti-pattern comparison for dropdown over visible mode switching
- segmented control for high-frequency state switching
- visible filter ownership patterns
- compact decision matrix for when dropdowns are still justified

### 3. Loading Transition Timing Systems

- Agent construction difficulty: High
- User articulation difficulty: Medium
- Product leverage: High

Why it matters:

- Agents rarely know when to use instant swap, inline skeleton, stale-while-refreshing, blocking spinner, or queued retry.
- This is one of the biggest hidden quality gaps in real software output.

What to build:

- timing ladder exhibit: instant, light delay, sustained load, failed load
- stale-content plus refresh indicator pattern
- skeleton threshold examples for table, inspector, and thread surfaces
- blocking vs non-blocking loading comparison

### 4. Optimistic UI and Rollback Patterns

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users usually describe these as trust failures: "it said it worked but then it didn’t".
- Agents often skip rollback rules, retry posture, and temporary state communication.

What to build:

- optimistic row update with rollback
- optimistic save button with pending and failure states
- async approval with status reversal
- mutation timeline showing pending, committed, and failed branches

### 5. Focus and Scroll Preservation Systems

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users rarely say "focus management". They say "it jumps around" or "I lost my place".
- This is critical for chat, queues, inspectors, tables, and inline edits.

What to build:

- right rail refresh with preserved scroll
- list-to-detail interaction with stable viewport
- modal close focus return pattern
- async panel replacement without context loss

### 6. Duplicate Control Anti-Pattern Gallery

- Agent construction difficulty: Medium
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- This is central to the UI coherence auditor.
- Agents need explicit negative references, not just positive examples.

What to build:

- duplicate scope controls
- repeated filter meaning across chips and dropdowns
- redundant status language across header, chip, and footer
- conflicting global vs local sort or mode controls

## Tier 2: Structural Intelligence Families

These families teach harder mental models and make the agent system more durable.

### 7. Async State Machine Exhibits

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users describe symptoms, not transitions.
- Agents need explicit examples of how states connect, not just snapshots.

What to build:

- queue review state machine
- thread loading and send state machine
- form submit and retry state machine
- export generation state machine

### 8. Inline Editing Systems

- Agent construction difficulty: High
- User articulation difficulty: Medium
- Product leverage: High

Why it matters:

- Inline edit is easy to do badly and hard to describe precisely.
- It forces agents to think about hover, focus, dirty state, save, cancel, validation, and async save behavior together.

What to build:

- editable data row
- editable detail rail section
- inline title edit with save and rollback
- inline field validation under live constraints

### 9. Async Confirmation Flows

- Agent construction difficulty: Medium
- User articulation difficulty: Medium
- Product leverage: High

Why it matters:

- Agents often stop at a modal and forget submitting, result, partial failure, and recovery.

What to build:

- destructive confirmation with submitting state
- bulk approve confirmation with async outcome
- irreversible action with typed confirmation
- post-confirm failure recovery path

### 10. Error Recovery Systems Beyond Toasts

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Toast-only recovery is weak product behavior.
- Users need contextual recovery, but they rarely know how to ask for it.

What to build:

- inline recoverable form error
- partial table failure with row-level retry
- failed background sync with manual retry
- fatal panel error with preserved context and escape path

### 11. Bulk Operation Coordination Patterns

- Agent construction difficulty: High
- User articulation difficulty: Medium
- Product leverage: Medium

Why it matters:

- Bulk actions require selection logic, button gating, async feedback, and success/failure aggregation.

What to build:

- selection bar with multi-state feedback
- bulk reassignment flow
- bulk export flow with progress
- partial success after batch operation

### 12. Lazy Loading and Pagination Systems

- Agent construction difficulty: Medium
- User articulation difficulty: Medium
- Product leverage: Medium

Why it matters:

- Agents default to either endless scrolling or generic pagination without considering task type.

What to build:

- infinite scroll with append skeletons
- load-more list pattern
- strict pagination for auditable tables
- hybrid pattern for search results

## Tier 3: Hard-To-Describe Product Surfaces

These families matter because users often know the business problem but cannot translate it into usable UI structure.

### 13. Search Results and Relevance Surfaces

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: Medium

Why it matters:

- Users ask for "better search" without being able to specify ranking signals, grouping, faceting, or result explanation.

What to build:

- relevance-ranked result list
- grouped results by object type
- faceted refinement sidebar
- no-result and low-confidence result states

### 14. Multi-Step Form Systems With Async Friction

- Agent construction difficulty: High
- User articulation difficulty: Medium
- Product leverage: Medium

Why it matters:

- Users describe these as onboarding or setup pain, not state management.

What to build:

- step-by-step setup flow with async validation
- interrupted step recovery
- permission-dependent step gating
- review step with missing requirements

### 15. Permission-Shaped Surfaces

- Agent construction difficulty: Medium
- User articulation difficulty: High
- Product leverage: Medium

Why it matters:

- Users often ask for "different views for different roles" but the real challenge is shaping the surface without leaking broken or dead UI.

What to build:

- same route, different role surface
- hidden vs disabled vs explanatory permission treatment
- admin-overrides-member comparison
- partial access workbench

### 16. Cross-Surface Hand-Off Patterns

- Agent construction difficulty: High
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Many products break when the user must move from queue to detail, from assistant to artifact, from notification to task, or from summary to execution.

What to build:

- queue to inspector to confirm flow
- assistant prompt to routed workspace flow
- alert to exact failing object flow
- export setup to result artifact flow

## Tier 4: Coherence Auditor Teaching Families

These exhibits make the auditor more operational by giving it grounded examples of what to praise and what to flag.

### 17. Header Composition Patterns

- Agent construction difficulty: Medium
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Header incoherence is one of the most common recurring failures.

What to build:

- strong task-owned operational header
- broken redundant header comparison
- summary plus action balance patterns
- title, status, scope, and CTA ownership rules

### 18. Persistent Text Value Tests

- Agent construction difficulty: Medium
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users feel text noise immediately but do not describe it precisely.
- The coherence auditor needs concrete examples of low-value persistent text and high-value persistent text.

What to build:

- useless footer copy vs useful state copy
- redundant helper text vs clarifying helper text
- internal system language vs productized language
- status narration vs action-supporting guidance

### 19. Density Discipline Comparisons

- Agent construction difficulty: Medium
- User articulation difficulty: Medium
- Product leverage: High

Why it matters:

- Density mismanagement is structural, not cosmetic.

What to build:

- one task in compact, default, and broken mixed-density form
- dense queue with correct rhythm
- bloated card-heavy version of the same screen
- density decisions by task class

### 20. Surface Bloat Reduction Patterns

- Agent construction difficulty: Medium
- User articulation difficulty: High
- Product leverage: High

Why it matters:

- Users say "too much stuff". Agents need explicit reduction examples.

What to build:

- too many panels vs one dominant work surface
- excessive summary cards vs compressed status line
- noisy label stacks vs semantic economy pass
- fragmented modules vs recomposed shell

## Recommended Build Sequence

### Phase 1: Agent Infrastructure Blockers

Build first:

- async tab transition patterns
- dropdown vs segmented control decision patterns
- loading transition timing systems
- optimistic UI and rollback patterns
- focus and scroll preservation systems
- duplicate control anti-pattern gallery

### Phase 2: Structural State Intelligence

Build next:

- async state machine exhibits
- inline editing systems
- async confirmation flows
- error recovery systems beyond toasts

### Phase 3: Product Surface Complexity

Build next:

- bulk operation coordination patterns
- lazy loading and pagination systems
- search results and relevance surfaces
- multi-step form systems with async friction
- permission-shaped surfaces
- cross-surface hand-off patterns

### Phase 4: Auditor Teaching Set

Build next:

- header composition patterns
- persistent text value tests
- density discipline comparisons
- surface bloat reduction patterns

## Bottom Line

The next value in EXHIBIT is not just more polished UI. It is better coverage of the patterns that are hardest to design correctly without help.

That means the next exhibits should bias toward:

- state choreography
- interaction-model judgment
- context preservation
- composition clarity
- negative references for coherence failures

Those are the patterns that unlock stronger local iteration, stronger `/api/agent` guidance, and a more useful coherence auditor.