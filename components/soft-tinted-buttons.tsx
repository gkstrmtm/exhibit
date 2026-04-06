/**
 * Soft / Tinted Buttons
 * Category: Buttons
 * Tags: soft, tinted, pastel, 60-30-10, secondary, modern
 * Description: Subtle background tint with matching text — not solid, not ghost. The 60-30-10 sweet spot for secondary hierarchy. Heavy use in Notion, Linear, and modern admin tools.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/soft-tinted-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SoftTintedButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">Default</button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">Blue</button>
      </div>
    </div>
  );
}