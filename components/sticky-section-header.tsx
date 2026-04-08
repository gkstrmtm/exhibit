/**
 * Sticky Section Header
 * Category: Layout
 * Tags: sticky, header, scroll, list, alphabet, grouping
 * Description: A scrollable list with sticky category/letter headers. As the user scrolls, the current section header stays pinned at the top of the container until the next section pushes it out. Uses native position:sticky within an overflow container. Demonstrates the common contacts-list / docs-index sticky header pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sticky-section-header.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const SECTIONS = [
  { letter: "A", items: ["Acme Corp", "Altera Systems", "Apex Analytics", "Arroyo Media"] },
  { letter: "B", items: ["Beacon Labs", "Blue Horizon", "Bravo Ventures"] },
  { letter: "C", items: ["Cascade Group", "Centric AI", "Cobalt Tech", "Codex Inc", "Copperfield Co"] },
  { letter: "D", items: ["Data Foundry", "Devlin Partners", "Dune Capital"] },
  { letter: "E", items: ["Elevate Studio", "Envoy Digital", "Epoch Systems"] },
  { letter: "F", items: ["Fabric AI", "Field Works", "Forthright Media"] },
];

export default function StickySectionHeader() {
  return (
    <div className="rounded-xl border border-neutral-200 overflow-hidden w-full max-w-xs">
      <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2">
        <span className="text-xs font-semibold text-neutral-600">Companies (22)</span>
      </div>

      <div className="h-64 overflow-y-auto relative">
        {SECTIONS.map(({ letter, items }) => (
          <div key={letter}>
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-neutral-100 border-b border-neutral-200 px-4 py-1 flex items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{letter}</span>
              <span className="text-[9px] text-neutral-400">{items.length}</span>
            </div>

            {/* Items */}
            {items.map((name) => (
              <button
                key={name}
                className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
