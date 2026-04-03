/**
 * 60-30-10 Button Hierarchy
 * Category: Buttons
 * Tags: 60-30-10, hierarchy, system, primary, secondary, tertiary, design-rule
 * Description: A complete button system built on the 60-30-10 rule: 60% dominant neutral (text + ghost), 30% secondary (outlined, tinted), 10% accent (solid filled CTAs). One primary button per view — everything else recedes.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/60-30-10-button-system.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ButtonHierarchySystem() {
  return (
    <div className="p-8 bg-white">
      <div className="mb-6">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">The 60-30-10 button rule</div>
        <p className="text-sm text-neutral-500 max-w-md">60% of your interface actions should be subtle. 30% secondary. Only 10% — one CTA — should demand full attention.</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-24 shrink-0">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">10% — CTA</div>
            <div className="text-[10px] text-neutral-300 mt-0.5">1 per view max</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Start free trial</button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-700 transition-colors">Deploy now</button>
          </div>
        </div>
        <div className="h-px bg-neutral-100" />
        <div className="flex items-start gap-4">
          <div className="w-24 shrink-0">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">30% — Secondary</div>
            <div className="text-[10px] text-neutral-300 mt-0.5">Ghost + Tinted</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">Learn more</button>
            <button className="px-4 py-2 text-sm font-medium border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">View docs</button>
            <button className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">Export</button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">Upgrade</button>
          </div>
        </div>
        <div className="h-px bg-neutral-100" />
        <div className="flex items-start gap-4">
          <div className="w-24 shrink-0">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">60% — Tertiary</div>
            <div className="text-[10px] text-neutral-300 mt-0.5">Text only</div>
          </div>
          <div className="flex flex-wrap gap-1">
            <button className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-all">Cancel</button>
            <button className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-all">Dismiss</button>
            <button className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all">See all →</button>
            <button className="px-3 py-2 text-sm text-neutral-400 hover:text-neutral-700 rounded-lg transition-all">Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
}