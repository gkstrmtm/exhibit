/**
 * Soft / Tinted Buttons
 * Category: Buttons
 * Tags: soft, tinted, pastel, 60-30-10, secondary, modern
 * Description: Subtle background tint with matching text — not solid, not ghost. The 60-30-10 sweet spot for secondary hierarchy. Heavy use in Notion, Linear, and modern admin tools. Softer than solid, stronger than ghost.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/soft-tinted-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SoftTintedButtons() {
  const variants = [
    { label: "Default",   bg: "bg-neutral-100",  text: "text-neutral-700",  hover: "hover:bg-neutral-200" },
    { label: "Blue",      bg: "bg-blue-50",      text: "text-blue-700",     hover: "hover:bg-blue-100" },
    { label: "Violet",    bg: "bg-violet-50",    text: "text-violet-700",   hover: "hover:bg-violet-100" },
    { label: "Emerald",   bg: "bg-emerald-50",   text: "text-emerald-700",  hover: "hover:bg-emerald-100" },
    { label: "Amber",     bg: "bg-amber-50",     text: "text-amber-700",    hover: "hover:bg-amber-100" },
    { label: "Rose",      bg: "bg-rose-50",      text: "text-rose-700",     hover: "hover:bg-rose-100" },
  ];
  return (
    <div className="p-8 bg-white flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        {variants.map(v => (
          <button key={v.label} className={`px-4 py-2 text-sm font-medium rounded-lg ${v.bg} ${v.text} ${v.hover} transition-colors`}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {variants.map(v => (
          <button key={v.label} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${v.bg} ${v.text} ${v.hover} transition-colors`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {variants.slice(0, 4).map(v => (
          <button key={v.label} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg ${v.bg} ${v.text} ${v.hover} transition-colors`}>
            ✦ {v.label} action
          </button>
        ))}
      </div>
    </div>
  );
}