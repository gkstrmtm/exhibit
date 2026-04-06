/**
 * Empty Search Results
 * Category: Empty States
 * Tags: empty state, search, no results, zero state
 * Description: No-results state for a filtered search. Shows a magnifier icon, clear headline, suggestion copy, and a ghost 'Clear filters' button.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-search.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptySearchResults() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-base font-semibold text-neutral-900 mb-1">No results for "dark button"</h3>
      <p className="text-sm text-neutral-500 max-w-xs mb-5">Try a different keyword or remove some filters to see more components.</p>
      <button className="px-4 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">Clear filters</button>
    </div>
  );
}