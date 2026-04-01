/**
 * Filter Bar with Chips
 * Category: Data Density
 * Tags: filter, chips, search, toolbar, data-density
 * Description: Dense filter bar combining search, removable filter chips, clear-all action, and saved views dropdown with live result count.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/filter-bar-chips.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function FilterBarChips() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex flex-col gap-4">
      <div className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-1.5 bg-white min-w-[200px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search..." className="border-none outline-none text-sm flex-1 bg-transparent" />
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium">Status: Active <button className="hover:text-blue-900">×</button></span>
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs font-medium">Type: Enterprise <button className="hover:text-purple-900">×</button></span>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium">Region: US <button className="hover:text-amber-900">×</button></span>
          <button className="text-xs text-neutral-500 hover:text-neutral-700 ml-1">Clear all</button>
        </div>
        <button className="flex items-center gap-1.5 border border-neutral-300 rounded-md px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50">
          Saved Views ▾
        </button>
      </div>
      <div className="text-sm text-neutral-500 px-1">Showing <strong className="text-neutral-800">147</strong> of 2,841 results</div>
    </div>
  );
}