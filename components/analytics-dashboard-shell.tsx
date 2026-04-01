/**
 * Analytics Dashboard Shell
 * Category: App Shells
 * Tags: app-shell, analytics, dashboard, metrics, kpi, charts
 * Description: Full analytics layout with compact top nav, four KPI metric cards with trend indicators, a full-width sparkline chart area, and a recent events data table below.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/analytics-dashboard-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const kpis = [
  { label: "Total Revenue", value: "$48,291", change: "+12.5%", up: true, sub: "vs. last month" },
  { label: "Active Users", value: "9,842", change: "+8.1%", up: true, sub: "vs. last month" },
  { label: "Conversion Rate", value: "3.24%", change: "-0.3%", up: false, sub: "vs. last month" },
  { label: "Avg. Session", value: "4m 12s", change: "+18s", up: true, sub: "vs. last month" },
];

const sparklines = [65, 72, 68, 80, 75, 90, 85, 95, 88, 102, 98, 115, 108, 122, 118];

const events = [
  { page: "/dashboard", users: 4821, bounce: "24%", duration: "5m 42s", status: "healthy" },
  { page: "/pricing", users: 2103, bounce: "41%", duration: "3m 18s", status: "healthy" },
  { page: "/sign-up", users: 1847, bounce: "18%", duration: "2m 05s", status: "healthy" },
  { page: "/blog", users: 1204, bounce: "68%", duration: "1m 52s", status: "warning" },
  { page: "/docs/api", users: 893, bounce: "31%", duration: "7m 14s", status: "healthy" },
];

export default function AnalyticsDashboardShell() {
  const [range, setRange] = useState("30d");
  const maxSparkline = Math.max(...sparklines);

  return (
    <div className="min-h-[500px] bg-neutral-50 flex flex-col rounded-xl border border-neutral-200 overflow-hidden font-sans">
      {/* Nav */}
      <header className="bg-white border-b border-neutral-200 px-6 h-12 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center text-white font-black text-xs">A</div>
            <span className="font-semibold text-sm text-neutral-900">Analytics</span>
          </div>
          <div className="hidden md:flex items-center gap-1 ml-4">
            {["Overview", "Acquisition", "Behavior", "Conversions"].map((tab, i) => (
              <button key={tab} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${i === 0 ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-800"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-0.5">
            {["7d", "30d", "90d", "12m"].map(r => (
              <button key={r} onClick={() => setRange(r)} className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${range === r ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}>
                {r}
              </button>
            ))}
          </div>
          <button className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg">Export</button>
        </div>
      </header>

      <div className="flex-1 p-5 space-y-4 overflow-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl border border-neutral-200 p-4">
              <div className="text-xs text-neutral-500 mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">{kpi.value}</div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-semibold ${kpi.up ? "text-emerald-500" : "text-red-500"}`}>
                  {kpi.up ? "↑" : "↓"} {kpi.change}
                </span>
                <span className="text-[10px] text-neutral-400">{kpi.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">Revenue over time</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Daily totals for the last {range}</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-violet-500" /><span className="text-neutral-500">Revenue</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-400" /><span className="text-neutral-500">Sessions</span></div>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {sparklines.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  style={{ height: `${(val / maxSparkline) * 100}%` }}
                  className={`w-full rounded-sm transition-all ${i === sparklines.length - 1 ? "bg-violet-500" : "bg-violet-200 hover:bg-violet-300"}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-neutral-400">
            <span>Day 1</span><span>Day {sparklines.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100">
            <h3 className="text-sm font-semibold text-neutral-900">Top pages</h3>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors">View full report →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-neutral-100">
                {["Page", "Visitors", "Bounce rate", "Avg. duration", "Status"].map(h => (
                  <th key={h} className="px-5 py-2.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((row, i) => (
                <tr key={i} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-neutral-700 font-medium">{row.page}</td>
                  <td className="px-5 py-3 text-xs text-neutral-700">{row.users.toLocaleString()}</td>
                  <td className="px-5 py-3 text-xs text-neutral-700">{row.bounce}</td>
                  <td className="px-5 py-3 text-xs text-neutral-700">{row.duration}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.status === "healthy" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      <span className={`w-1 h-1 rounded-full ${row.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}