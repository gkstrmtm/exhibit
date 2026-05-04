# EXHIBIT Design Foundations

> **For AI agents:** Fetch `design-foundations.json` for the machine-readable version.  
> URL: `https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.json`

Pass this document as context before any UI task. It defines what **correct** looks and feels like — typography, color, spacing, layout, component sizing, density, and the patterns to avoid.

---

## Fonts

| Role | Family | Use for |
|------|--------|---------|
| **Display** | Space Grotesk | Default page titles, hero headlines, card headings, H1/H2 |
| **Body** | Inter | All prose, labels, table content, form text, nav, captions |
| **Mono** | JetBrains Mono | Code, slugs, IDs, numeric data, timestamps |
| **Editorial Display** | Fraunces | Editorial / premium marketing layouts only |

**Rule:** Never use system-ui, Arial, or Times New Roman in product UI. Body is always Inter. Display headings use Space Grotesk unless the chosen layout family explicitly permits Fraunces for editorial headline use.

### Font Routing Rules

- Default display font is **Space Grotesk**.
- **Fraunces** is allowed only for the **Editorial / Premium Layout** and only for large headlines or section anchors.
- Do not randomly switch headline fonts inside one surface.
- Do not use serif display on operational, SaaS, or utility-first layouts.

---

## Type Scale

| Name | Size | Weight | Use |
|------|------|--------|-----|
| xs | 11px | 500–600 | Table column headers (uppercase only), badge labels |
| sm | 13px | 400–500 | Body text, nav links, table rows, secondary info |
| base | 14px | 400–500 | Primary body text, card descriptions, inputs |
| md | 16px | 500–600 | Section intros, prominent labels, sidebar headings |
| lg | 18px | 600 | Card titles, dialog headings |
| xl | 20px | 700 | Section headings, KPI values |
| 2xl | 24px | 700 | Page H2, large KPI numbers |
| 3xl | 30px | 700–800 | Page H1 title |
| 4xl+ | 36px+ | 800 | Marketing hero only |

**Rules:**
- Never mix more than 3 font weights in one component
- Never ALL-CAPS body or description text (uppercase is only for 10–11px table column headers)
- Never use font-weight 400 for buttons, nav items, or interactive labels

---

## Colors

### Backgrounds
| Token | Hex | Use |
|-------|-----|-----|
| page | `#ffffff` | Main page background |
| panel | `#fafafa` | Sidebar, aside, secondary panels |
| subtle | `#f5f5f5` | Table headers, hover states |
| dark | `#1e1e1e` | Dark mode page |
| dark-panel | `#252526` | Dark mode sidebar |

### Text
| Token | Hex | Use |
|-------|-----|-----|
| primary | `#0a0a0a` | Headings, primary values |
| secondary | `#404040` | Sub-headings, strong body |
| muted | `#737373` | Secondary labels, metadata |
| subtle | `#a3a3a3` | Placeholders, disabled, hints |

### Borders
| Token | Hex | Use |
|-------|-----|-----|
| default | `#e5e5e5` | Cards, inputs, dividers |
| strong | `#d4d4d4` | Focused inputs |
| subtle | `#f0f0f0` | Row dividers |

### Semantic States
| State | Background | Text | Border |
|-------|-----------|------|--------|
| success | `#ecfdf5` | `#047857` | `#a7f3d0` |
| warning | `#fffbeb` | `#b45309` | `#fde68a` |
| error | `#fef2f2` | `#b91c1c` | `#fecaca` |
| info | `#eff6ff` | `#1d4ed8` | `#bfdbfe` |
| neutral | `#f5f5f5` | `#525252` | `#e5e5e5` |

### Interactive
| Variant | Background | Text |
|---------|-----------|------|
| primary | `#171717` | `#ffffff` |
| secondary | `#ffffff` + border | `#171717` |
| ghost | transparent | `#404040` |
| link | — | `#2563eb` |
| danger | `#fef2f2` | `#b91c1c` |

---

## Spacing (4px grid)

All spacing uses a 4px base unit. Never use arbitrary values.

| Scale | px | Use |
|-------|----|-----|
| p-1 | 4px | Micro gaps |
| p-2 | 8px | Inline gaps, tight padding |
| p-3 | 12px | Badge padding, compact items |
| p-4 | 16px | Card padding (compact), buttons |
| p-5 | 20px | Card padding (comfortable) |
| p-6 | 24px | Card padding (default), dialog |
| p-8 | 32px | Page padding, section padding |
| p-12 | 48px | Large sections |

Page padding: **24px mobile, 32px tablet, 48px desktop**

---

## Layout

| Dimension | px | Tailwind |
|-----------|-----|---------|
| Max content width | 1200px | max-w-6xl |
| Max reading width | 768px | max-w-3xl |
| Sidebar standard | 220px | w-56 |
| Sidebar icon-only | 48px | w-12 |
| Top nav height | 56px | h-14 |
| Mobile bottom tab | 64px | h-16 |

### Border Radius
| Size | px | Use |
|------|----|-----|
| rounded | 4px | Compact badges, chips |
| rounded-md | 6px | Buttons, inputs |
| rounded-lg | 8px | Cards, panels |
| rounded-xl | 12px | Large cards, modals |
| rounded-2xl | 16px | Hero cards, mobile cards |
| rounded-full | 9999px | Pills, avatars, toggles |

**Rule:** Never mix border-radius sizes within a single card.

### Preview-Safe Layout Rules

- In gallery, iframe, or scaled preview contexts, default to one column until the layout has genuinely ample width.
- Do not introduce a page-level sidebar and then immediately split the main content into more narrow rails unless the viewport is extremely wide.
- If a surface already has one dominant sidebar or booking rail, inner supporting content should usually stack instead of creating a second or third narrow column.
- Text-heavy blocks, checklists, proof notes, and agenda lists should stay single-column until there is obvious room for multi-column presentation.
- If a component looks acceptable only at its full desktop width, it is not structurally solved yet.

### Conversation Bubble Rules

- Never align chat bubbles with margin offsets alone.
- Use an explicit row wrapper with left or right justification for each message.
- Message bubbles should use a stable width rule such as `w-full` plus a bounded `max-w-*`; do not let them shrink to ultra-narrow fit-content columns.
- Conversation surfaces must preserve readable line length in preview as well as full-page mode.

## Layout Families

These are the canonical high-level layout modes the system should choose from before composing sections. Pick one family on purpose. Do not drift into a generic hybrid unless the task explicitly demands it.

### 1. Minimal Conversion Layout

- Plain or nearly plain background
- Left-aligned text block
- Single primary CTA
- Almost no decoration
- Tight visual vocabulary, low chrome, low proof density

Use for:
- High-clarity funnels
- Simple lead capture
- Low-friction conversion asks

Rules:
- Default to one column before adding side rails
- Keep proof short and subordinate
- Avoid gradients, ornamental cards, or icon clusters

### 2. Authority / Consulting Layout

- Strong headline
- Dark plus light contrast panel split
- Structured proof blocks
- Restrained typography and restrained CTA behavior

Use for:
- Consulting offers
- Premium service authority pages
- PureStay-style credibility-led conversion surfaces

Rules:
- Let the contrast panel create authority, not decorative effects
- Use proof in disciplined blocks rather than testimonial clutter
- Avoid startup-style gradient marketing chrome

### 3. High-Ticket Offer Layout

- More whitespace
- Slower pacing
- Fewer sections
- Stronger typography hierarchy
- Intentional proof placement instead of proof overload

Use for:
- Premium offer pages
- High-consideration call booking
- Founder-led sales narratives

Rules:
- Reduce section count before adding more cards
- Let the headline and sequence do the persuasion work
- Keep the CTA obvious without turning the page into direct-response spam

### 4. Direct Response Layout

- Tighter spacing
- More repeated CTA presence
- More aggressive flow
- Faster proof-to-action pacing

Use for:
- Hard offer pages
- Performance-driven funnels
- Response-first promotions

Rules:
- Compress vertical rhythm on purpose
- Repeat the CTA because the structure earns it, not because the page is under-designed
- Keep proof and urgency active throughout the scroll path

### 5. Editorial / Premium Layout

- Serif headline allowed here
- More spacing
- Less UI chrome
- Feels like a magazine, not SaaS

Use for:
- Premium storytelling surfaces
- Advertorials
- Brand-forward editorial conversion pages

Rules:
- Use **Fraunces** for major headlines only when the page is clearly editorial/premium
- Strip UI chrome before adding more decorative sections
- Build atmosphere with pacing, typography, and composition rather than dashboard modules

### 6. Event-Driven Layout

- Registration-first hero
- Agenda and timebox treated as core visual material
- Clear event checkpoints instead of generic repeated CTA slabs
- Feels like a live training invite, not a SaaS landing page

Use for:
- Webinars
- Workshops
- Registration funnels that need momentum and schedule clarity

Rules:
- Put the promise, time commitment, and registration action in the first screen
- Use agenda rhythm and speaker proof before adding deeper qualification language
- Treat repeated CTA moments as event checkpoints, not generic conversion strips

### 7. Conversational Sales Layout

- Compact sections
- Short paragraphs
- Operator-led handoff framing
- Booking modules that feel attached to the existing conversation

Use for:
- DM-to-call flows
- Warm inbound booking
- Chat-led service selling

Rules:
- Preserve conversational continuity instead of restarting with a broad marketing hero
- Use proof snippets and call expectations over long-form persuasion blocks
- Keep the booking zone feeling like a handoff, not a new campaign surface
- Keep message rows readable: use explicit left/right alignment wrappers and bounded bubble widths instead of offsetting narrow cards with margins
- Do not add secondary side rails inside the conversation area unless the page is wide enough that the thread still reads as a real conversation

### 8. Diagnostic Proof Layout

- Analytical headline treatment
- Evidence-led proof stack
- Boardroom-clear demo or consultation framing
- Structured case narrative over decorative social proof

Use for:
- Case-study-to-demo funnels
- B2B diagnostic offers
- Proof-heavy consideration pages

Rules:
- Let one primary case narrative carry the page before adding more proof modules
- Use metrics, workflow specificity, and evaluation context to earn the CTA
- Keep layouts structured and explicit rather than cinematic or hype-heavy

### 9. Selective Intake Layout

- Qualification comes before access
- Calm but firm process framing
- Clear fit, disqualification, and next-step logic
- Intake shell feels finite and serious

Use for:
- Application-first funnels
- Selective high-ticket enrollment
- Qualification before calendar access

Rules:
- Front-load fit criteria and what happens after approval
- Use proof to justify why the screening step exists
- Keep the form shell visibly finite and avoid bloated lead-form styling

### 10. Utility Reassurance Layout

- Confirmation state over persuasion theatrics
- Checklist and next-step blocks
- Calm hierarchy with practical emphasis
- Minimal decorative variation

Use for:
- Pre-call conditioning
- Onboarding and confirmation surfaces
- Show-rate protection pages

Rules:
- Lead with confirmation, prep, and next-step clarity before any resell language
- Prefer utility blocks and dividers over hero cards and promo banners
- Make the prep path dominant throughout the page

### Selection Guardrails

- Do not default to gradient-heavy SaaS layouts when a simpler family would solve the job.
- Do not choose fonts independently from the layout family.
- Make the layout family an explicit decision before section composition begins.
- When in doubt between families, resolve the page's persuasion model first: clarity, authority, premium pacing, direct response, editorial narrative, event momentum, conversational handoff, diagnostic proof, selective intake, or utility reassurance.

---

## Elevation

| Level | CSS Shadow | Tailwind | Use |
|-------|-----------|---------|-----|
| 0 | none | — | Flat panels, table rows |
| 1 | 0 1px 3px rgba(0,0,0,0.08) | shadow-sm | Cards on neutral backgrounds |
| 2 | 0 4px 12px rgba(0,0,0,0.10) | shadow-md | Dropdowns, popovers |
| 3 | 0 10px 30px rgba(0,0,0,0.12) | shadow-lg | Floating menus |
| 4 | 0 20px 60px rgba(0,0,0,0.18) | shadow-2xl | Modals, full overlays |

---

## Component Sizing

### Buttons
| Size | Height | Padding | Font |
|------|--------|---------|------|
| sm | 32px | px-3 | text-xs |
| md | 36px | px-4 | text-sm |
| lg | 40px | px-5 | text-sm |
| xl | 48px | px-6 | text-base |

Always `font-medium` or heavier. Minimum 80px wide.

### Inputs
- Height: 36px default, 32px compact, 40px prominent
- Border: `1px solid #e5e5e5` → `border-neutral-200`
- Focus: 2px ring at 10% accent opacity
- Border-radius: `rounded-lg` (8px)
- Font: 14px Inter

### Tables
- Row height: 36px compact, 44px default, 56px comfortable
- Header: `text-xs font-semibold uppercase tracking-wider text-neutral-500`
- Body: `text-sm font-normal text-neutral-700`
- Always right-align numeric columns

### Avatars
- xs: 24px — stacks, compact lists
- sm: 32px — table rows, sidebar
- md: 40px — profile cards
- lg: 48px — profile pages
- xl: 64px — creator pages, hero profiles
- **Always rounded-full. Never square.**

---

## Density

| Mode | Row Height | Font Size | Padding | Use |
|------|-----------|-----------|---------|-----|
| Compact | 32–36px | 12–13px | 8–12px | Admin tables, log viewers |
| Default | 44px | 13–14px | 16px | Standard dashboards |
| Comfortable | 56–64px | 14–16px | 20–24px | Consumer apps, marketing |

**Rule:** Pick one density per layout. Never mix compact and comfortable in the same view.

---

## KPI Cards

- Max 4 per row
- Label: 11–12px, `text-neutral-500`, `font-medium`
- Value: 24–28px, `font-bold`, `text-neutral-900`
- Trend: 12px, `font-semibold`, emerald-600 (positive), red-500 (negative)

---

## Anti-Patterns: What NOT to Do

### Typography
- Raw browser default fonts
- Unstyled h1/h2 tags
- Mixed font sizes at the same hierarchy level
- Line-height below 1.25 for readable text
- ALL CAPS body copy or descriptions

### Color
- Raw blue links (`#0000ff`)
- Color as the only status differentiator (color-blind failure)
- Low contrast gray on gray
- More than 2 competing accent colors per component

### Layout
- Content against viewport edges with no padding
- Inconsistent gutters in the same grid
- Fixed pixel heights on expandable containers
- Reading columns wider than 768px

### Data Display
- Left-aligned numbers in table columns
- Truncated text without a tooltip
- Charts without titles or axis labels
- Empty tables with no empty state explanation
- More than 8 columns without horizontal scroll

### Raw HTML / No Styling
- Unstyled `<select>` elements
- Browser-default checkboxes and radio buttons
- Tables without border-collapse or intentional border treatment
- Forms with inconsistent input heights
- Mixing outline and solid buttons randomly

---

## Reference Components

These are the canonical correct implementations — use them as visual anchors:

| Component | What it shows | URL |
|-----------|--------------|-----|
| `full-reference-dashboard` | Complete polished admin dashboard | [fetch](https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/full-reference-dashboard.tsx) |
| `design-token-reference` | All colors, type sizes, spacing, elevation | [fetch](https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/design-token-reference.tsx) |
| `typography-system` | Every text style in context with annotations | [fetch](https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/typography-system.tsx) |
| `anti-pattern-contrast` | Raw/wrong UI vs corrected side-by-side | [fetch](https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/anti-pattern-contrast.tsx) |
| `density-and-layout-guide` | Compact/default/comfortable modes shown | [fetch](https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/density-and-layout-guide.tsx) |

---

## For AI Agents: How to Use This

**At the start of any UI task, tell your agent:**

> Fetch `https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.json` and use it as your design system reference. Follow its typography, color, spacing, and component rules strictly. Then fetch the component you need from `https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json`.

**For a full dashboard target:**

> Fetch `https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/full-reference-dashboard.tsx` as the visual target for this dashboard. Match its quality, spacing, and typography exactly.
