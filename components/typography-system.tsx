/**
 * Typography System
 * Category: Foundations
 * Tags: foundations, typography, type-scale, reference, headings, body-text
 * Description: Every text style in the design system shown in context with annotations: heading hierarchy (H1–H4), body sizes (base, sm, xs), label and caption variants, monospace code style, uppercase table headers, and link states. Each sample is annotated with the exact size, weight, and Tailwind class to use.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/typography-system.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TypographySystem() {
  const sections = [
    {
      label: "Display / Headings",
      items: [
        { name: "H1 — Page Title", size: "30px", weight: 700, class: "text-3xl font-bold", sample: "Analytics Dashboard" },
        { name: "H2 — Section Heading", size: "24px", weight: 700, class: "text-2xl font-bold", sample: "Revenue Overview" },
        { name: "H3 — Card Title / Dialog", size: "18px", weight: 600, class: "text-lg font-semibold", sample: "Recent Transactions" },
        { name: "H4 — Sub-section", size: "16px", weight: 600, class: "text-base font-semibold", sample: "Filter by Status" },
      ],
    },
    {
      label: "Body",
      items: [
        { name: "Body — Primary", size: "14px", weight: 400, class: "text-sm", sample: "The dashboard provides an overview of your key metrics and recent activity. Use the filters above to narrow the results." },
        { name: "Body — Secondary", size: "13px", weight: 400, class: "text-sm text-neutral-500", sample: "Last updated 2 minutes ago · Synced from Stripe and Mixpanel" },
        { name: "Label — Strong", size: "14px", weight: 500, class: "text-sm font-medium", sample: "Display Name" },
        { name: "Caption / Meta", size: "12px", weight: 400, class: "text-xs text-neutral-400", sample: "Created Jan 15, 2024 · Modified by Sarah Chen" },
      ],
    },
    {
      label: "Functional",
      items: [
        { name: "Table Column Header", size: "11px", weight: 600, class: "text-xs font-semibold uppercase tracking-wider text-neutral-500", sample: "CUSTOMER NAME" },
        { name: "Badge / Tag", size: "11px", weight: 500, class: "text-xs font-medium", sample: "Pro Plan" },
        { name: "Button — Medium", size: "13px", weight: 500, class: "text-sm font-medium", sample: "Save Changes" },
        { name: "Monospace / Code", size: "13px", weight: 400, class: "text-sm font-mono", sample: "user_id: usr_01j9a4f5k2..." },
        { name: "Link", size: "13px", weight: 500, class: "text-sm font-medium text-blue-600 underline", sample: "View full report →" },
      ],
    },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-10 font-sans">
      {sections.map(section => (
        <section key={section.label}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">{section.label}</h2>
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            {section.items.map((item, i) => (
              <div key={item.name}
                className={`flex items-start gap-0 ${i < section.items.length - 1 ? "border-b border-neutral-100" : ""}`}>
                {/* Annotation */}
                <div className="w-52 flex-shrink-0 px-5 py-4 border-r border-neutral-100 bg-neutral-50/50">
                  <div className="text-xs font-medium text-neutral-700 mb-1">{item.name}</div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{item.size}</span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{item.weight}</span>
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-blue-400 break-all">{item.class}</div>
                </div>
                {/* Live sample */}
                <div className="flex-1 px-6 py-4 flex items-center">
                  <span className={item.class}>{item.sample}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Pairing rules */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Font Pairing Rules</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-6 grid grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Display</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Space Grotesk</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">H1, H2, hero headlines</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Body</div>
            <div className="text-2xl font-bold">Inter</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">All UI text, labels, prose</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Code / Data</div>
            <div className="text-2xl font-bold font-mono">JetBrains Mono</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">Code, IDs, timestamps</div>
          </div>
        </div>
      </section>
    </div>
  );
}