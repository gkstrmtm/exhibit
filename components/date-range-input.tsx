/**
 * Date Range Picker
 * Category: Inputs
 * Tags: date, date range, input, picker, form
 * Description: Start and end date inputs in a connected inline layout with a dash separator. Clear labeling, focus states, and a consistent border group.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/date-range-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DateRangeInput() {
  return (
    <div className="max-w-sm p-6 space-y-2">
      <label className="block text-xs font-medium text-neutral-600">Date range</label>
      <div className="flex items-center gap-2">
        <input type="date" defaultValue="2026-04-01" className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-400 text-neutral-700" />
        <span className="text-neutral-400 text-sm shrink-0">→</span>
        <input type="date" defaultValue="2026-04-30" className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-400 text-neutral-700" />
      </div>
    </div>
  );
}