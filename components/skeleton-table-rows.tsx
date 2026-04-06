/**
 * Skeleton Table Rows
 * Category: Loading
 * Tags: skeleton, table, loading, shimmer, rows
 * Description: Skeleton loading state for a data table. Five rows of animated shimmer placeholders maintain the table's column structure while data loads.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-table-rows.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SkeletonTableRows() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 gap-4 px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
        {["Name","Status","Date","Actions"].map(h => (
          <div key={h} className="text-xs font-medium text-neutral-400 uppercase tracking-wide">{h}</div>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3.5 border-b border-neutral-50 items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-neutral-100 animate-pulse shrink-0" />
            <div className="h-2.5 bg-neutral-100 rounded-full w-24 animate-pulse" />
          </div>
          <div className="h-5 bg-neutral-100 rounded-full w-16 animate-pulse" />
          <div className="h-2.5 bg-neutral-100 rounded-full w-20 animate-pulse" />
          <div className="h-2.5 bg-neutral-100 rounded-full w-12 animate-pulse" />
        </div>
      ))}
    </div>
  );
}