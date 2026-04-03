/**
 * Full Reference Dashboard
 * Category: Foundations
 * Tags: foundations, reference, dashboard, admin, target, polished, canonical
 * Description: The canonical polished admin dashboard — the visual target for any AI-generated UI. Complete layout with sidebar nav, KPI metric cards with sparklines, a data table with status badges, a chart area, and breadcrumb header. Every element follows the design foundations: correct typography, color, spacing, and component sizing.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/full-reference-dashboard.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function FullReferenceDashboard() {
  const navItems = [
    { icon: "◆", label: "Dashboard", active: true },
    { icon: "◎", label: "Analytics" },
    { icon: "▤", label: "Users" },
    { icon: "◈", label: "Revenue" },
    { icon: "▣", label: "Settings" },
  ];
  const kpis = [
    { label: "Total Revenue", value: "$48,291", change: "+12.5%", up: true, bars: [40,55,35,60,45,70,65,80] },
    { label: "Active Users", value: "9,842", change: "+8.1%", up: true, bars: [30,45,50,40,60,55,70,75] },
    { label: "Conversion", value: "3.24%", change: "-0.3%", up: false, bars: [70,60,65,50,55,40,45,35] },
    { label: "Avg Session", value: "4m 12s", change: "+18s", up: true, bars: [35,40,50,45,55,60,58,65] },
  ];
  const rows = [
    { name: "Sarah Chen", email: "sarah@acme.co", plan: "Pro", revenue: "$1,240", status: "Active" },
    { name: "Marcus Rivera", email: "m.rivera@acme.co", plan: "Team", revenue: "$3,800", status: "Active" },
    { name: "Emily Park", email: "e.park@acme.co", plan: "Starter", revenue: "$240", status: "Trial" },
    { name: "David Kim", email: "d.kim@acme.co", plan: "Pro", revenue: "$1,240", status: "Churned" },
  ];
  const statusStyles: Record<string, string> = {
    Active:  "bg-emerald-50 text-emerald-700",
    Trial:   "bg-blue-50 text-blue-700",
    Churned: "bg-neutral-100 text-neutral-500",
  };
  const chartBars = [65,80,55,90,70,95,85,100,78,88,72,110];
  const maxBar = Math.max(...chartBars);

  return (
    <div className="flex min-h-[600px] bg-neutral-50 font-sans text-neutral-900 rounded-xl border border-neutral-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-neutral-200 flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-xs">A</div>
          <span className="font-semibold text-sm">Acme Studio</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-0.5">
          {navItems.map(item => (
            <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              item.active ? "bg-neutral-900 text-white font-medium" : "text-neutral-600 hover:bg-neutral-50"
            }`}>
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">Jane Doe</div>
            <div className="text-xs text-neutral-400 truncate">Admin</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <span>Home</span><span>›</span><span className="text-neutral-700 font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Live
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50">Export</button>
            <button className="h-9 px-4 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-700">New Report</button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpis.map(k => (
              <div key={k.label} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                <div className="text-xs text-neutral-500 font-medium mb-1">{k.label}</div>
                <div className="text-2xl font-bold mb-1">{k.value}</div>
                <div className={`text-xs font-semibold mb-3 ${k.up ? "text-emerald-600" : "text-rose-500"}`}>{k.change}</div>
                <div className="flex items-end gap-0.5 h-8">
                  {k.bars.map((h, i) => (
                    <div key={i} className={`flex-1 rounded-sm ${k.up ? "bg-emerald-200" : "bg-rose-200"}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold">Revenue Overview</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Last 12 months</p>
              </div>
              <div className="flex gap-1">
                {["7d","30d","90d","1y"].map((r, i) => (
                  <button key={r} className={`px-3 py-1.5 text-xs rounded-md font-medium ${
                    i === 3 ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-50"
                  }`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-2 h-28">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm bg-neutral-900 opacity-80 transition-all"
                    style={{ height: `${(h / maxBar) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-400 font-mono">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent Customers</h2>
              <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View all</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Plan</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Revenue</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="font-medium text-neutral-900">{row.name}</div>
                      <div className="text-xs text-neutral-400">{row.email}</div>
                    </td>
                    <td className="px-6 py-3 text-neutral-600">{row.plan}</td>
                    <td className="px-6 py-3 text-right font-mono font-medium text-neutral-900">{row.revenue}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}