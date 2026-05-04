# EXHIBIT Funnel Intelligence Playbook

This document is the persistent agent-facing operating model for funnel work in EXHIBIT.

Use it when an agent needs to:

- choose the right funnel family for a business, offer, and traffic source
- generate a full conversion page instead of isolated UI pieces
- map funnel intent to EXHIBIT Stage 3 inputs and outputs
- decide how to use proof, qualification, urgency, objections, and post-conversion continuation
- connect EXHIBIT to an application, asset pool, funnel builder, or internal library

This is not a design system and not a component catalog.

The primary abstraction is a conversion blueprint: one vertical page or sequence that turns attention into the next committed action.

---

## What EXHIBIT Does

EXHIBIT is designed to help an agent reason about funnel structure before it reasons about visual styling.

Its funnel capability should be understood as five layers:

1. Funnel classification
   Determine the right funnel family based on traffic temperature, commitment threshold, trust deficit, proof burden, and buying context.
2. Full-page blueprint generation
   Output a complete vertical page structure with ordered sections, layout shells, hierarchy, and interaction logic.
3. Conversion-logic explanation
   Explain why the page is sequenced as it is, where attention is controlled, where the ask is made, and how friction is reduced.
4. Style-family steering
   Apply one intentional page direction across the whole funnel, rather than randomly styling sections.
5. Asset and exhibit alignment
   Allow future agents to map funnel roles to reference exhibits, asset pools, and reusable structural patterns without collapsing back into component-first thinking.

---

## Core Philosophy

### 1. A funnel is a persuasion system, not a layout collection

The job of a funnel is not to look impressive.

The job is to move a visitor from current belief to next action with the minimum necessary confusion.

That means the agent should think in terms of:

- what belief is missing
- what trust has not yet been earned
- what proof is required to justify the ask
- what friction is appropriate for the value and commitment level
- what should happen immediately after the conversion

### 2. Friction should match commitment, not disappear blindly

Low friction is not always better.

If the offer is high-ticket, selective, implementation-heavy, or sales-assisted, the funnel often needs structured friction.

Examples:

- cold traffic to a premium consulting call often needs more proof and qualification before booking
- warm conversational traffic may need less page depth and more continuity of tone
- skeptical or story-driven traffic may need a longer narrative bridge before application

The correct question is not "How do we remove friction?"

The correct question is "What amount and type of friction improves fit, trust, and close quality?"

### 3. Offer strength beats page polish

If the offer is weak, unclear, or undifferentiated, the page will compensate badly.

The funnel should force clarity around:

- the outcome promised
- the mechanism that makes the outcome believable
- the person or business this is for
- the person or business this is not for
- the risk reversal, guarantee, or qualification logic
- the reason to act now, if one genuinely exists

### 4. Proof belongs where skepticism peaks

Proof should not be sprayed everywhere because it feels persuasive.

It should be placed:

- beside major claims
- before a major commitment jump
- near the CTA when the internal question becomes "Why should I trust this?"
- in the format most relevant to the buyer's objection

### 5. Post-conversion is part of the funnel

Booking, application, signup, or registration is not the end of the page logic.

The thank-you state, confirmation state, or pre-call conditioning step is part of the funnel because it protects conversion quality, show rate, and downstream close rate.

---

## Research Grounding

This model is grounded in recurring public conversion principles rather than one personality's branding.

The external influences that map most clearly into EXHIBIT are:

- offer-first, value-equation, guarantee, scarcity, and qualification thinking common in Acquisition / Hormozi-style training
- high-ticket lead quality, show-rate, and appointment-setting posture common in Jeremy Haynes-style sales funnels
- messaging, differentiation, and narrative architecture thinking common in Copyhackers-style positioning work
- practical CRO guidance from mainstream operators and educators such as Shopify and HubSpot on value clarity, proof placement, friction management, and testing

EXHIBIT should translate those influences into product rules:

- use honest urgency, not fake scarcity
- use qualification when it improves sales quality, not just because applications look premium
- use proof to answer skeptical claims, not to decorate the page
- treat the page as a working asset that should be tested, measured, and refined

---

## Decision Variables

Before choosing a funnel family, the agent should classify the job using these variables.

### Offer variables

- Price point: free, low, medium, high, enterprise
- Commitment required: none, email, trial, purchase, application, booked appointment
- Offer clarity: clear, partial, weak
- Mechanism clarity: obvious, explainable, unclear
- Differentiation strength: strong, moderate, weak
- Sales involvement: self-serve, hybrid, sales-assisted, founder-led

### Audience variables

- Traffic temperature: cold, warm, hot
- Traffic source: ads, organic search, email, referral, retargeting, social inbound, DM, community
- Trust deficit: low, medium, high
- Proof burden: low, medium, high
- Buyer awareness: problem-aware, solution-aware, offer-aware
- Common objections: time, cost, legitimacy, complexity, relevance, urgency, implementation readiness

### Commercial variables

- Sales bandwidth: low, medium, high
- Need for qualification: low, medium, high
- Show-rate sensitivity: low, medium, high
- Close-rate sensitivity: low, medium, high
- Post-conversion path: instant fulfillment, nurture, calendar, application review, onboarding, pre-call conditioning

### Structural variables

- Required page depth: short, medium, long
- CTA repetition needed: low, medium, high
- Narrative burden: low, medium, high
- Proof density needed: low, medium, high

---

## Funnel Taxonomy

These are the core funnel families EXHIBIT should reason about.

Each one is defined by conversion job, trust deficit, and action threshold.

### 1. Direct-to-Call

Best fit:

- warm or hot traffic
- strong authority already exists
- the buyer already understands the problem
- the main job is to get a booked appointment quickly

Bad fit:

- cold skeptical traffic
- offers requiring mechanism education before the call feels deserved
- low trust categories without proof depth

Primary logic:

- compress the path from interest to booking
- keep proof near the CTA
- avoid unnecessary section bloat

### 2. VSL-to-Call

Best fit:

- higher-ticket offers where authority and explanation must precede booking
- cold or mixed traffic that still needs persuasion
- founder-led or operator-led sales motion

Bad fit:

- buyers who already want the call and do not need a video gate
- offers whose real bottleneck is qualification rather than belief

Primary logic:

- use a VSL to install the problem, mechanism, and credibility
- place booking only after enough belief has been created

### 3. VSL-to-Application-to-Calendar

Best fit:

- premium or selective offers
- call quality matters more than raw appointment volume
- the sales team needs fit context before the call

Bad fit:

- low-ticket or impulsive offers
- low-friction list-building campaigns

Primary logic:

- belief first
- qualification second
- booking only after fit is clear

### 4. Application-First

Best fit:

- premium consulting, agency, service, or coaching offers
- strong intent traffic
- situations where screening is part of the promise

Bad fit:

- cold traffic that still needs explanation
- offers that have not yet earned enough proof to justify the form

Primary logic:

- use selectivity as a trust signal
- make the form feel diagnostic, not bureaucratic

### 5. Webinar-to-Call

Best fit:

- colder traffic that needs education before sales conversation
- offers that convert better through teaching than through direct claim
- scenarios where live engagement is itself a qualifier

Bad fit:

- buyers already near decision
- businesses without the operational follow-through to run the event and follow-up sequence

Primary logic:

- capture registration with a clear learning promise
- use the teaching event to create belief and self-diagnosis
- move the most engaged attendees into booked appointments

### 6. Advertorial-to-Application

Best fit:

- skeptical traffic that needs narrative proof and mechanism depth
- buyers who will not convert from short-form claim-driven pages
- editorial or story-led acquisition channels

Bad fit:

- warm audiences that already understand the offer
- businesses without a real story, case narrative, or mechanism to develop

Primary logic:

- let long-form narrative do the persuasion
- place the application only after belief has been earned

### 7. DM-to-Call

Best fit:

- inbound social or community traffic
- high-context warm leads already in conversation
- setter or founder-led conversational sales motion

Bad fit:

- cold paid traffic
- situations where chat is not the actual acquisition path

Primary logic:

- preserve continuity of tone from conversation to booking
- make the call feel like the natural continuation of the thread

### 8. Pre-Call Conditioning

Best fit:

- already-booked calls with weak show rates or low buyer preparedness
- high-ticket sales teams that lose time re-educating buyers on the call

Bad fit:

- funnels that do not yet have a booking problem

Primary logic:

- confirm the appointment clearly
- install context, expectations, and seriousness before the call begins

### 9. Case-Study-to-Demo

Best fit:

- structured B2B consideration funnels
- product or service evaluation driven by credibility and use-case proof

Bad fit:

- purely emotional, impulsive, or personal-brand offers

Primary logic:

- lead with evidence and buyer context
- use demo request only after trust and relevance are established

---

## Blueprint Rules

Every full-page appointment funnel should resolve the same six structural jobs in sequence.

### Section 1: Attention

Purpose:

- stop the scroll
- establish relevance fast
- make the visitor understand what this page is about and what kind of next step it leads to

What dominates:

- headline
- subhead or one-line framing
- immediate action path or CTA visibility

What supports:

- credibility anchor
- media entry point if needed
- one proof or selectivity cue

### Section 2: Belief Builder

Purpose:

- shift the visitor from surface curiosity into deeper agreement
- name the current failure mode or missing mechanism

What dominates:

- one core thesis or belief shift

What supports:

- short explanatory blocks
- contrast between current state and corrected path

### Section 3: Proof

Purpose:

- make the major claims believable
- answer the internal question: "Has this worked in a situation like mine?"

What dominates:

- one named outcome or case result

What supports:

- secondary metrics
- buyer context
- proof snapshots or selected testimonials

### Section 4: Mechanism Explanation

Purpose:

- explain why the funnel or process works
- reduce the need for blind faith

What dominates:

- sequence or mechanism itself

What supports:

- failure points in the old path
- why the new structure fixes them

### Section 5: Offer + CTA

Purpose:

- present the next step as a natural continuation of belief and proof
- turn persuasion into action

What dominates:

- offer framing and primary CTA

What supports:

- what happens next
- fit criteria
- booking or application details
- click triggers

### Section 6: Reinforcement / Objection Handling

Purpose:

- resolve the final hesitations after the ask is already visible
- prevent drop-off among qualified visitors close to acting

What dominates:

- top objections directly related to conversion

What supports:

- short answers
- risk reversal
- final CTA repetition

---

## Conversion Tactics Library

These tactics should be selected based on friction level and proof burden.

### Offer construction tactics

- clarify the outcome before expanding the process
- make the mechanism defensible, not mysterious
- use bonuses only when they deepen value, reduce delay, or remove a common implementation blocker
- use guarantees only when they are operationally real and commercially tolerable

### Proof tactics

- named case outcomes
- before/after business context
- proof snapshots for fast scanners
- testimonial excerpts tied to real objections
- authority markers such as press, recognizable clients, certifications, or operator track record

Rule:

Use the minimum proof needed to answer the current skepticism. Do not add proof clutter.

### Qualification tactics

- form gating for high-ticket or low-fit tolerance offers
- selective language to raise seriousness
- field reduction for top-of-funnel or colder traffic
- progressive profiling when more detail is needed later, not immediately

Rule:

Only ask for information that changes routing, close quality, or follow-up quality.

### Urgency and scarcity tactics

- real deadlines
- real capacity limits
- real event dates
- real application windows
- real availability constraints tied to operational limits

Rule:

Do not fabricate urgency. If the urgency is not defensible, remove it and strengthen the offer or proof instead.

### CTA tactics

- make the CTA complete the user's sentence
- use specific action language tied to the promised next step
- repeat the CTA only when the structure has earned repetition
- keep the main CTA visually dominant and behaviorally obvious

Examples of stronger framing:

- Book the breakdown
- See if you qualify
- Reserve your spot
- Start the application
- Pick a time to map it out

### Objection tactics

Source objections from:

- support tickets
- sales calls
- chat logs
- FAQ usage
- comments and survey responses

Handle objections by type:

- legitimacy: use proof and authority
- fit: use qualification and best-fit language
- time: use speed, clarity, and what-happens-next explanation
- complexity: use mechanism explanation and reduced perceived effort
- commitment: use risk reversal and expectation setting

### Post-conversion tactics

- thank-you page that continues the journey
- calendar confirmation that explains what happens next
- pre-call video or checklist for booked appointments
- nurture sequence aligned with what was just consumed

Rule:

Never end the journey with a dead confirmation state if momentum needs to continue.

---

## Matching Tactics To Friction

### Frictionless

Use when:

- the ask is light
- the audience is already fairly ready

Prioritize:

- speed
- clarity
- reduced fields
- early CTA visibility

### Light-touch

Use when:

- the offer needs some explanation but not heavy qualification

Prioritize:

- outcome clarity
- moderate proof
- short supportive details
- clear thank-you continuation

### Structured

Use when:

- the buyer needs more confidence and evaluation structure

Prioritize:

- proof sequencing
- mechanism explanation
- clear fit language
- stronger objection handling

### High-commitment

Use when:

- the offer is expensive, selective, sales-assisted, or operationally heavy

Prioritize:

- authority
- selectivity
- qualification
- proof density matched to skepticism
- pre-call or post-application continuation

---

## Pattern Selection Logic

When choosing a funnel family, the agent should follow this order:

1. Determine the next action.
   Is the goal email capture, event registration, application, trial, or booked appointment?
2. Determine the trust deficit.
   Does the visitor already believe the problem, solution, and authority claim?
3. Determine the proof burden.
   How much evidence is needed before the next action feels justified?
4. Determine the qualification need.
   Does screening improve downstream outcomes?
5. Determine the narrative burden.
   Does the buyer need a story or explanation before the ask appears?
6. Determine the continuity requirement.
   Does the post-conversion state need to actively protect quality or show rate?

Use the answers to route:

- low trust deficit + booked appointment goal -> Direct-to-Call or VSL-to-Call
- high trust deficit + premium offer -> VSL-to-Application-to-Calendar or Advertorial-to-Application
- warm conversation-led lead source -> DM-to-Call
- event-led education model -> Webinar-to-Call
- already-booked but low-quality downstream -> Pre-Call Conditioning

---

## Style Direction Rules

The page style should be chosen after the funnel family is chosen, not before.

EXHIBIT currently uses these layout families for public-facing funnel work:

- `minimal-conversion`
- `authority-consulting`
- `high-ticket-offer`
- `direct-response`
- `editorial-premium`
- `event-driven`
- `conversational-sales`
- `diagnostic-proof`
- `selective-intake`
- `utility-reassurance`

Recommended mapping:

- direct response, compressed CTA pacing -> `direct-response`
- consultant or operator authority, high trust, sharper credibility -> `authority-consulting`
- premium high-ticket booking or selective enrollment -> `high-ticket-offer`
- long-form narrative bridge or magazine-like proof -> `editorial-premium`
- very tight single-goal lead capture -> `minimal-conversion`
- webinar or live-training registration surfaces -> `event-driven`
- DM-to-call or chat-led booking handoffs -> `conversational-sales`
- case-study, boardroom, or demo-request persuasion -> `diagnostic-proof`
- application-led qualification sequences -> `selective-intake`
- booked-call prep, onboarding, and reassurance states -> `utility-reassurance`

`designDirection` can be more specific than the chosen family. The family sets the overall composition rules; the direction specializes the page for the actual funnel pattern.

Style direction must never override conversion structure.

---

## Anti-Patterns

Do not let the agent fall into these failure modes:

- designing a funnel as a pile of cards
- selecting components before choosing a funnel family
- asking for a call before enough trust or context exists
- using false scarcity or vague urgency
- over-forming cold traffic without enough proof
- using decorative testimonials that do not answer real objections
- treating the thank-you page as a dead end
- making style decisions before deciding the persuasion path
- repeating CTAs because the page feels empty rather than because the structure earned repetition
- substituting generic polish for offer clarity

---

## How Agents Should Use EXHIBIT Stage 3

When an agent integrates EXHIBIT into an application or funnel builder, Stage 3 should be treated as the authoritative funnel-planning step.

### What to send

At minimum:

- `stage: "funnel-strategy"`
- a prompt that describes the business, traffic, offer, and desired next step
- `funnelContext.audienceWarmth`
- `funnelContext.commitmentRequired`
- `funnelContext.pricePoint`
- `funnelContext.businessProfile`

When known, also send:

- `layoutNeeds[]`
- `constraints.visualPosture`

### What to read from the response

Treat these as the highest-value fields:

- `funnelPattern`
- `designDirection`
- `pageFlow[]`
- `layoutBlueprint[]`
- `conversionLogic`
- `offerPositioningVariants[]`

Use these as supporting intelligence:

- `frictionProfile`
- `timingMap[]`
- `tensionStrategy[]`
- `dropoffRisks[]`
- `trustSignalPlacement[]`

### How to build from it

1. Pick one positioning angle.
2. Commit to one design direction.
3. Build the page vertically in the exact order given by `pageFlow[]`.
4. Use `layoutBlueprint[]` to determine shell, hierarchy, content blocks, and interaction.
5. Use `conversionLogic` to keep the page honest about why each section exists.
6. Only then pull assets, exhibits, examples, or library references if needed.

---

## Future Intelligence Expansion

The current system is structurally sound, but the next meaningful gains will come from richer inputs.

Recommended future dimensions:

- traffic source, not just warmth
- buyer persona and decision criteria
- objection patterns by market
- unique mechanism and competitive context
- economics such as CPA tolerance, LTV, and sales bandwidth
- post-conversion activation model
- historical testing and learned performance signals

These should remain optional inputs so the system can still degrade gracefully.

---

## Agent Summary

If an agent remembers only a few rules from this document, they should be these:

1. Choose the funnel family before choosing the style.
2. Build one full conversion page, not a set of components.
3. Match friction to commitment and sales reality.
4. Put proof where skepticism is highest.
5. Use qualification when it improves fit and downstream quality.
6. Treat post-conversion continuation as part of the funnel.
7. Use EXHIBIT Stage 3 as the blueprint generator, then use the rest of the platform to execute and refine.