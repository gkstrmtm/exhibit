/**
 * Archival Stats Grid
 * Category: Data Display
 * Tags: stats, dashboard, data, grid, numbers
 * Description: Clean data display with tabular numbers, directional indicators, and 1px grid gaps.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/minimal-stats-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MinimalStats() {
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Revenue</span>
          <span className="text-emerald-600">↗</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">$24.5k</span>
          <span className="text-xs font-medium text-emerald-600">+12%</span>
        </div>
      </div>
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Bounce Rate</span>
          <span className="text-rose-600">↘</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">42.8%</span>
          <span className="text-xs font-medium text-rose-600">-2.1%</span>
        </div>
      </div>
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Active Users</span>
          <span className="text-blue-600">●</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">1,204</span>
          <span className="text-xs font-medium text-neutral-400">Live</span>
        </div>
      </div>
    </div>
  );
}