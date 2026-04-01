/**
 * Dashboard Header
 * Category: Dashboard
 * Tags: header, dashboard, breadcrumbs, actions, status
 * Description: Header with title, breadcrumbs, action buttons, and a live status chip. Essential for any analytics or admin dashboard.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dashboard-header-pattern.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DashboardHeader() {
  return (
    <div className="min-h-[300px] bg-white border border-neutral-200 rounded-lg overflow-hidden">
      <div className="border-b border-neutral-200 bg-white px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
          <span className="hover:text-neutral-600 cursor-pointer">Home</span>
          <span>›</span>
          <span className="hover:text-neutral-600 cursor-pointer">Dashboard</span>
          <span>›</span>
          <span className="text-neutral-700 font-medium">Analytics</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">Analytics Overview</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              New Report
            </button>
          </div>
        </div>
      </div>
      <div className="p-8 bg-neutral-50 flex-1">
        <div className="text-sm text-neutral-400">Dashboard content goes here</div>
      </div>
    </div>
  );
}