export const dashboardExhibits = [
  {
    slug: "sidebar-app-shell",
    title: "Sidebar App Shell",
    description: "A complete sidebar layout with logo area, navigation items with icons, user avatar at bottom, and main content area. Clean minimal style perfect for admin panels and dashboards.",
    category: "App Shells",
    tags: ["sidebar", "app-shell", "layout", "navigation", "admin"],
    style: "",
    code: `import { useState } from "react";

export default function SidebarAppShell() {
  const [active, setActive] = useState("Dashboard");
  const navItems = [
    { icon: "◆", label: "Dashboard" },
    { icon: "◎", label: "Analytics" },
    { icon: "▤", label: "Projects" },
    { icon: "◈", label: "Settings" },
    { icon: "▣", label: "Files" },
  ];

  return (
    <div className="flex min-h-[400px] bg-white border border-neutral-200 rounded-lg overflow-hidden">
      <aside className="w-56 bg-neutral-50 border-r border-neutral-200 flex flex-col">
        <div className="p-5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-semibold text-sm text-neutral-900">Acme Studio</span>
          </div>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={\`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors \${
                active === item.label
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              }\`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">JD</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900 truncate">Jane Doe</div>
            <div className="text-xs text-neutral-500 truncate">jane@acme.co</div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-500 text-sm mb-6">Welcome back, Jane. Here's what's happening.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
            <div className="text-xs text-neutral-500 mb-1">Total Revenue</div>
            <div className="text-xl font-semibold">$12,400</div>
          </div>
          <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
            <div className="text-xs text-neutral-500 mb-1">Active Users</div>
            <div className="text-xl font-semibold">1,204</div>
          </div>
        </div>
      </main>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:400px;background:white;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;font-family:system-ui,-apple-system,sans-serif">
  <aside style="width:220px;background:#fafafa;border-right:1px solid #e5e5e5;display:flex;flex-direction:column">
    <div style="padding:20px;border-bottom:1px solid #e5e5e5">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:32px;height:32px;border-radius:8px;background:#2563eb;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px">A</div>
        <span style="font-weight:600;font-size:14px;color:#171717">Acme Studio</span>
      </div>
    </div>
    <nav style="flex:1;padding:12px;display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:13px;background:#eff6ff;color:#1d4ed8;font-weight:500;cursor:pointer"><span style="font-size:14px">◆</span> Dashboard</div>
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:13px;color:#525252;cursor:pointer"><span style="font-size:14px">◎</span> Analytics</div>
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:13px;color:#525252;cursor:pointer"><span style="font-size:14px">▤</span> Projects</div>
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:13px;color:#525252;cursor:pointer"><span style="font-size:14px">◈</span> Settings</div>
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:13px;color:#525252;cursor:pointer"><span style="font-size:14px">▣</span> Files</div>
    </nav>
    <div style="padding:16px;border-top:1px solid #e5e5e5;display:flex;align-items:center;gap:10px">
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#c084fc,#f472b6);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700">JD</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:500;color:#171717;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Jane Doe</div>
        <div style="font-size:11px;color:#a3a3a3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">jane@acme.co</div>
      </div>
    </div>
  </aside>
  <main style="flex:1;padding:32px">
    <h1 style="font-size:24px;font-weight:700;color:#171717;margin:0 0 6px 0">Dashboard</h1>
    <p style="color:#a3a3a3;font-size:14px;margin:0 0 24px 0">Welcome back, Jane. Here's what's happening.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="background:#fafafa;border-radius:8px;padding:16px;border:1px solid #e5e5e5">
        <div style="font-size:11px;color:#a3a3a3;margin-bottom:4px">Total Revenue</div>
        <div style="font-size:20px;font-weight:600;color:#171717">$12,400</div>
      </div>
      <div style="background:#fafafa;border-radius:8px;padding:16px;border:1px solid #e5e5e5">
        <div style="font-size:11px;color:#a3a3a3;margin-bottom:4px">Active Users</div>
        <div style="font-size:20px;font-weight:600;color:#171717">1,204</div>
      </div>
    </div>
  </main>
</div>`,
  },
  {
    slug: "top-nav-app-shell",
    title: "Top Nav App Shell",
    description: "Horizontal navigation bar with logo, nav links, search input, and user dropdown. Classic layout for SaaS applications and marketing dashboards.",
    category: "App Shells",
    tags: ["topnav", "app-shell", "layout", "navigation", "horizontal"],
    style: "",
    code: `export default function TopNavAppShell() {
  const links = ["Dashboard", "Projects", "Teams", "Reports"];

  return (
    <div className="min-h-[400px] bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">W</div>
            <span className="font-semibold text-sm">Workspace</span>
          </div>
          <nav className="flex gap-1">
            {links.map((link, i) => (
              <button
                key={link}
                className={\`px-3 py-2 text-sm rounded-md transition-colors \${
                  i === 0 ? "bg-neutral-100 text-neutral-900 font-medium" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                }\`}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-48 px-3 py-1.5 text-sm border border-neutral-200 rounded-md bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            MK
          </div>
        </div>
      </header>
      <main className="flex-1 p-8 bg-neutral-50">
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">Good morning, Marcus</h2>
        <p className="text-sm text-neutral-500 mb-6">You have 3 pending tasks and 2 new messages.</p>
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="text-sm text-neutral-400">Content area</div>
        </div>
      </main>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:white;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;font-family:system-ui,-apple-system,sans-serif">
  <header style="background:white;border-bottom:1px solid #e5e5e5;padding:12px 24px;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:32px">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:28px;height:28px;border-radius:4px;background:#4f46e5;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:11px">W</div>
        <span style="font-weight:600;font-size:14px;color:#171717">Workspace</span>
      </div>
      <nav style="display:flex;gap:4px">
        <span style="padding:6px 12px;font-size:13px;border-radius:6px;background:#f5f5f5;color:#171717;font-weight:500;cursor:pointer">Dashboard</span>
        <span style="padding:6px 12px;font-size:13px;border-radius:6px;color:#737373;cursor:pointer">Projects</span>
        <span style="padding:6px 12px;font-size:13px;border-radius:6px;color:#737373;cursor:pointer">Teams</span>
        <span style="padding:6px 12px;font-size:13px;border-radius:6px;color:#737373;cursor:pointer">Reports</span>
      </nav>
    </div>
    <div style="display:flex;align-items:center;gap:16px">
      <input type="text" placeholder="Search..." style="width:180px;padding:6px 12px;font-size:13px;border:1px solid #e5e5e5;border-radius:6px;background:#fafafa;outline:none;font-family:inherit;color:#525252" />
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#34d399,#14b8a6);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;cursor:pointer">MK</div>
    </div>
  </header>
  <main style="flex:1;padding:32px;background:#fafafa">
    <h2 style="font-size:18px;font-weight:600;color:#171717;margin:0 0 4px 0">Good morning, Marcus</h2>
    <p style="font-size:14px;color:#a3a3a3;margin:0 0 24px 0">You have 3 pending tasks and 2 new messages.</p>
    <div style="background:white;border-radius:8px;border:1px solid #e5e5e5;padding:24px">
      <div style="font-size:13px;color:#d4d4d4">Content area</div>
    </div>
  </main>
</div>`,
  },
  {
    slug: "dashboard-header-pattern",
    title: "Dashboard Header",
    description: "Header with title, breadcrumbs, action buttons, and a live status chip. Essential for any analytics or admin dashboard.",
    category: "Dashboard",
    tags: ["header", "dashboard", "breadcrumbs", "actions", "status"],
    style: "",
    code: `export default function DashboardHeader() {
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
}`,
    htmlPreview: `<div style="min-height:300px;background:white;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;font-family:system-ui,-apple-system,sans-serif">
  <div style="border-bottom:1px solid #e5e5e5;background:white;padding:24px 32px">
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#a3a3a3;margin-bottom:16px">
      <span style="cursor:pointer">Home</span>
      <span>›</span>
      <span style="cursor:pointer">Dashboard</span>
      <span>›</span>
      <span style="color:#404040;font-weight:500">Analytics</span>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:12px">
        <h1 style="font-size:24px;font-weight:700;color:#171717;margin:0">Analytics Overview</h1>
        <span style="display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:9999px;font-size:12px;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0">
          <span style="width:6px;height:6px;border-radius:50%;background:#10b981"></span>
          Live
        </span>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <button style="padding:8px 16px;font-size:13px;font-weight:500;color:#404040;background:white;border:1px solid #e5e5e5;border-radius:8px;cursor:pointer;font-family:inherit">Export</button>
        <button style="padding:8px 16px;font-size:13px;font-weight:500;color:white;background:#2563eb;border:none;border-radius:8px;cursor:pointer;font-family:inherit">New Report</button>
      </div>
    </div>
  </div>
  <div style="padding:32px;background:#fafafa;min-height:150px">
    <div style="font-size:13px;color:#d4d4d4">Dashboard content goes here</div>
  </div>
</div>`,
  },
  {
    slug: "stat-cards-with-trends",
    title: "Stat Cards with Trends",
    description: "Four stat cards displaying key metrics with percentage change indicators and inline CSS sparkline charts. Perfect for dashboard overview sections.",
    category: "Dashboard",
    tags: ["stats", "cards", "dashboard", "metrics", "sparkline", "trends"],
    style: "",
    code: `export default function StatCardsWithTrends() {
  const stats = [
    { label: "Revenue", value: "$48.2k", change: "+12.5%", up: true, bars: [40, 55, 35, 60, 45, 70, 65, 80] },
    { label: "Users", value: "2,847", change: "+8.1%", up: true, bars: [30, 45, 50, 40, 60, 55, 70, 75] },
    { label: "Bounce Rate", value: "24.3%", change: "-3.2%", up: false, bars: [70, 60, 65, 50, 55, 40, 45, 35] },
    { label: "Avg Session", value: "4m 32s", change: "+1.2%", up: true, bars: [35, 40, 50, 45, 55, 60, 58, 65] },
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-[300px] flex items-center">
      <div className="grid grid-cols-4 gap-4 w-full">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="text-xs text-neutral-500 font-medium mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
            <div className={\`text-xs font-medium mb-3 \${stat.up ? "text-emerald-600" : "text-rose-500"}\`}>
              {stat.change}
            </div>
            <div className="flex items-end gap-1 h-8">
              {stat.bars.map((h, i) => (
                <div
                  key={i}
                  className={\`flex-1 rounded-sm \${stat.up ? "bg-emerald-200" : "bg-rose-200"}\`}
                  style={{ height: \`\${h}%\` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:24px;background:#fafafa;min-height:300px;display:flex;align-items:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:100%">
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px">
      <div style="font-size:12px;color:#737373;font-weight:500;margin-bottom:4px">Revenue</div>
      <div style="font-size:24px;font-weight:700;color:#171717;margin-bottom:4px">$48.2k</div>
      <div style="font-size:12px;font-weight:500;color:#059669;margin-bottom:12px">+12.5%</div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:32px">
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:35%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:70%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:65%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:80%"></div>
      </div>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px">
      <div style="font-size:12px;color:#737373;font-weight:500;margin-bottom:4px">Users</div>
      <div style="font-size:24px;font-weight:700;color:#171717;margin-bottom:4px">2,847</div>
      <div style="font-size:12px;font-weight:500;color:#059669;margin-bottom:12px">+8.1%</div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:32px">
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:30%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:50%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:70%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:75%"></div>
      </div>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px">
      <div style="font-size:12px;color:#737373;font-weight:500;margin-bottom:4px">Bounce Rate</div>
      <div style="font-size:24px;font-weight:700;color:#171717;margin-bottom:4px">24.3%</div>
      <div style="font-size:12px;font-weight:500;color:#e11d48;margin-bottom:12px">-3.2%</div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:32px">
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:70%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:60%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:65%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:50%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:55%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:40%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:45%"></div>
        <div style="flex:1;border-radius:2px;background:#fecdd3;height:35%"></div>
      </div>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px">
      <div style="font-size:12px;color:#737373;font-weight:500;margin-bottom:4px">Avg Session</div>
      <div style="font-size:24px;font-weight:700;color:#171717;margin-bottom:4px">4m 32s</div>
      <div style="font-size:12px;font-weight:500;color:#059669;margin-bottom:12px">+1.2%</div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:32px">
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:35%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:50%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:58%"></div>
        <div style="flex:1;border-radius:2px;background:#a7f3d0;height:65%"></div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "data-table-with-actions",
    title: "Data Table with Actions",
    description: "A sortable data table with checkboxes, status badges, action menus, and pagination. Essential for any admin or CRM dashboard.",
    category: "Tables",
    tags: ["table", "data", "actions", "pagination", "admin", "crud"],
    style: "",
    code: `export default function DataTableWithActions() {
  const users = [
    { name: "Sarah Chen", email: "sarah.chen@company.com", role: "Admin", status: "Active" },
    { name: "Marcus Johnson", email: "m.johnson@company.com", role: "Editor", status: "Active" },
    { name: "Emily Rodriguez", email: "e.rodriguez@company.com", role: "Viewer", status: "Inactive" },
    { name: "David Kim", email: "d.kim@company.com", role: "Editor", status: "Active" },
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-[300px]">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="w-12 p-3"><input type="checkbox" /></th>
              <th className="text-left p-3 font-medium text-neutral-500">Name</th>
              <th className="text-left p-3 font-medium text-neutral-500">Email</th>
              <th className="text-left p-3 font-medium text-neutral-500">Role</th>
              <th className="text-left p-3 font-medium text-neutral-500">Status</th>
              <th className="w-12 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-center"><input type="checkbox" /></td>
                <td className="p-3 font-medium text-neutral-900">{user.name}</td>
                <td className="p-3 text-neutral-500">{user.email}</td>
                <td className="p-3 text-neutral-700">{user.role}</td>
                <td className="p-3">
                  <span className={\`px-2 py-0.5 rounded-full text-xs font-medium \${
                    user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                  }\`}>{user.status}</span>
                </td>
                <td className="p-3 text-center text-neutral-400 cursor-pointer">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-500">
          <span>Showing 1-4 of 24</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">Previous</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs bg-blue-600 text-white border-blue-600">1</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">2</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:24px;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
    <table style="width:100%;font-size:13px;border-collapse:collapse">
      <thead>
        <tr style="border-bottom:1px solid #e5e5e5;background:#fafafa">
          <th style="width:40px;padding:12px;text-align:center"><input type="checkbox" style="cursor:pointer" /></th>
          <th style="text-align:left;padding:12px;font-weight:500;color:#737373">Name</th>
          <th style="text-align:left;padding:12px;font-weight:500;color:#737373">Email</th>
          <th style="text-align:left;padding:12px;font-weight:500;color:#737373">Role</th>
          <th style="text-align:left;padding:12px;font-weight:500;color:#737373">Status</th>
          <th style="width:40px;padding:12px"></th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #f5f5f5">
          <td style="padding:12px;text-align:center"><input type="checkbox" style="cursor:pointer" /></td>
          <td style="padding:12px;font-weight:500;color:#171717">Sarah Chen</td>
          <td style="padding:12px;color:#737373">sarah.chen@company.com</td>
          <td style="padding:12px;color:#404040">Admin</td>
          <td style="padding:12px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td>
          <td style="padding:12px;text-align:center;color:#a3a3a3;cursor:pointer;font-size:16px">⋯</td>
        </tr>
        <tr style="border-bottom:1px solid #f5f5f5">
          <td style="padding:12px;text-align:center"><input type="checkbox" style="cursor:pointer" /></td>
          <td style="padding:12px;font-weight:500;color:#171717">Marcus Johnson</td>
          <td style="padding:12px;color:#737373">m.johnson@company.com</td>
          <td style="padding:12px;color:#404040">Editor</td>
          <td style="padding:12px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td>
          <td style="padding:12px;text-align:center;color:#a3a3a3;cursor:pointer;font-size:16px">⋯</td>
        </tr>
        <tr style="border-bottom:1px solid #f5f5f5">
          <td style="padding:12px;text-align:center"><input type="checkbox" style="cursor:pointer" /></td>
          <td style="padding:12px;font-weight:500;color:#171717">Emily Rodriguez</td>
          <td style="padding:12px;color:#737373">e.rodriguez@company.com</td>
          <td style="padding:12px;color:#404040">Viewer</td>
          <td style="padding:12px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#f5f5f5;color:#737373">Inactive</span></td>
          <td style="padding:12px;text-align:center;color:#a3a3a3;cursor:pointer;font-size:16px">⋯</td>
        </tr>
        <tr>
          <td style="padding:12px;text-align:center"><input type="checkbox" style="cursor:pointer" /></td>
          <td style="padding:12px;font-weight:500;color:#171717">David Kim</td>
          <td style="padding:12px;color:#737373">d.kim@company.com</td>
          <td style="padding:12px;color:#404040">Editor</td>
          <td style="padding:12px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td>
          <td style="padding:12px;text-align:center;color:#a3a3a3;cursor:pointer;font-size:16px">⋯</td>
        </tr>
      </tbody>
    </table>
    <div style="padding:12px 16px;border-top:1px solid #e5e5e5;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#737373">
      <span>Showing 1-4 of 24</span>
      <div style="display:flex;gap:6px">
        <button style="padding:4px 12px;border:1px solid #e5e5e5;border-radius:4px;font-size:12px;background:white;cursor:pointer;color:#737373;font-family:inherit">Previous</button>
        <button style="padding:4px 12px;border:1px solid #2563eb;border-radius:4px;font-size:12px;background:#2563eb;color:white;cursor:pointer;font-family:inherit">1</button>
        <button style="padding:4px 12px;border:1px solid #e5e5e5;border-radius:4px;font-size:12px;background:white;cursor:pointer;color:#737373;font-family:inherit">2</button>
        <button style="padding:4px 12px;border:1px solid #e5e5e5;border-radius:4px;font-size:12px;background:white;cursor:pointer;color:#737373;font-family:inherit">Next</button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "empty-state-first-run",
    title: "Empty State - First Run",
    description: "Centered empty state with a CSS-drawn document icon, heading, description, and primary/secondary action buttons. Ideal for onboarding and first-run experiences.",
    category: "Empty States",
    tags: ["empty", "state", "onboarding", "first-run", "placeholder"],
    style: "",
    code: `export default function EmptyStateFirstRun() {
  return (
    <div className="min-h-[400px] bg-white border border-neutral-200 rounded-lg flex items-center justify-center p-12">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-10 border-2 border-neutral-400 rounded-sm bg-white" />
            <div className="absolute top-2 left-1.5 w-5 h-0.5 bg-neutral-300 rounded" />
            <div className="absolute top-3.5 left-1.5 w-3 h-0.5 bg-neutral-300 rounded" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects yet</h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Get started by creating your first project. You can also import existing projects from your local machine or a Git repository.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Create your first project
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Import
          </button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:white;border:1px solid #e5e5e5;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:48px;font-family:system-ui,-apple-system,sans-serif">
  <div style="text-align:center;max-width:360px">
    <div style="margin:0 auto 24px auto;width:80px;height:80px;border-radius:16px;background:#f5f5f5;border:2px dashed #d4d4d4;display:flex;align-items:center;justify-content:center">
      <div style="position:relative">
        <div style="width:32px;height:40px;border:2px solid #a3a3a3;border-radius:3px;background:white"></div>
        <div style="position:absolute;top:8px;left:6px;width:20px;height:2px;background:#d4d4d4;border-radius:1px"></div>
        <div style="position:absolute;top:14px;left:6px;width:12px;height:2px;background:#d4d4d4;border-radius:1px"></div>
        <div style="position:absolute;bottom:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#2563eb;display:flex;align-items:center;justify-content:center">
          <span style="color:white;font-size:11px;font-weight:700;line-height:1">+</span>
        </div>
      </div>
    </div>
    <h3 style="font-size:18px;font-weight:600;color:#171717;margin:0 0 8px 0">No projects yet</h3>
    <p style="font-size:14px;color:#737373;margin:0 0 24px 0;line-height:1.6">Get started by creating your first project. You can also import existing projects from your local machine or a Git repository.</p>
    <div style="display:flex;align-items:center;justify-content:center;gap:12px">
      <button style="padding:10px 20px;font-size:13px;font-weight:500;color:white;background:#2563eb;border:none;border-radius:8px;cursor:pointer;font-family:inherit">Create your first project</button>
      <button style="padding:10px 20px;font-size:13px;font-weight:500;color:#404040;background:white;border:1px solid #e5e5e5;border-radius:8px;cursor:pointer;font-family:inherit">Import</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "skeleton-loading-cards",
    title: "Skeleton Loading Cards",
    description: "Three cards showing skeleton/shimmer loading placeholders with animated gradient effect. Use while content is being fetched asynchronously.",
    category: "Loading",
    tags: ["skeleton", "loading", "shimmer", "placeholder", "animation"],
    style: "",
    code: `export default function SkeletonLoadingCards() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center">
      <div className="grid grid-cols-3 gap-6 w-full">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-neutral-100 rounded animate-pulse w-full" />
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />
                <div className="h-3 bg-neutral-200 rounded animate-pulse w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<style>
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
</style>
<div style="padding:32px;background:#fafafa;min-height:300px;display:flex;align-items:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;width:100%">
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:140px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear"></div>
      <div style="padding:20px">
        <div style="height:16px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;border-radius:4px;width:75%;margin-bottom:12px"></div>
        <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;border-radius:4px;width:100%;margin-bottom:16px"></div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear"></div>
          <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;border-radius:4px;width:80px"></div>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:140px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.2s"></div>
      <div style="padding:20px">
        <div style="height:16px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.2s;border-radius:4px;width:75%;margin-bottom:12px"></div>
        <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.2s;border-radius:4px;width:100%;margin-bottom:16px"></div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.2s"></div>
          <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.2s;border-radius:4px;width:80px"></div>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:140px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.4s"></div>
      <div style="padding:20px">
        <div style="height:16px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.4s;border-radius:4px;width:75%;margin-bottom:12px"></div>
        <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.4s;border-radius:4px;width:100%;margin-bottom:16px"></div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.4s"></div>
          <div style="height:12px;background:linear-gradient(90deg,#e5e5e5 25%,#f0f0f0 50%,#e5e5e5 75%);background-size:800px 100%;animation:shimmer 1.5s infinite linear;animation-delay:0.4s;border-radius:4px;width:80px"></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "split-nav-shell",
    title: "Split Navigation Shell",
    description: "Narrow icon-only sidebar with an expanded secondary panel for section details. Dark sidebar theme with a spacious main content area. Great for complex applications.",
    category: "App Shells",
    tags: ["split", "navigation", "sidebar", "app-shell", "dark", "panel"],
    style: "",
    code: `import { useState } from "react";

export default function SplitNavShell() {
  const [active, setActive] = useState(0);
  const icons = ["◆", "◎", "▤", "◈", "▣"];
  const sections = [
    { title: "Dashboard", items: ["Overview", "Analytics", "Reports", "Live View"] },
    { title: "Projects", items: ["All Projects", "Starred", "Archived", "Templates"] },
    { title: "Files", items: ["Documents", "Images", "Videos", "Shared"] },
    { title: "Settings", items: ["General", "Security", "Billing", "API Keys"] },
    { title: "Storage", items: ["Buckets", "CDN", "Backups", "Logs"] },
  ];

  return (
    <div className="flex min-h-[400px] border border-neutral-200 rounded-lg overflow-hidden">
      <div className="w-12 bg-neutral-900 flex flex-col items-center py-4 gap-3">
        {icons.map((icon, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={\`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-colors \${
              active === i ? "bg-white/15 text-white" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
            }\`}
          >
            {icon}
          </button>
        ))}
      </div>
      <div className="w-[200px] bg-neutral-800 border-r border-neutral-700 p-4">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{sections[active].title}</h3>
        <div className="flex flex-col gap-1">
          {sections[active].items.map((item, i) => (
            <button
              key={item}
              className={\`text-left px-3 py-2 rounded-md text-sm transition-colors \${
                i === 0 ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"
              }\`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <main className="flex-1 bg-white p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Overview</h2>
        <p className="text-sm text-neutral-500">Main content area with full-width workspace.</p>
      </main>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:400px;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:48px;background:#171717;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:8px">
    <div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;background:rgba(255,255,255,0.15);color:white;cursor:pointer">◆</div>
    <div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#737373;cursor:pointer">◎</div>
    <div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#737373;cursor:pointer">▤</div>
    <div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#737373;cursor:pointer">◈</div>
    <div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#737373;cursor:pointer">▣</div>
  </div>
  <div style="width:200px;background:#262626;border-right:1px solid #404040;padding:16px">
    <h3 style="font-size:11px;font-weight:600;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px 0">Dashboard</h3>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="text-align:left;padding:8px 12px;border-radius:6px;font-size:13px;background:rgba(255,255,255,0.1);color:white;cursor:pointer">Overview</div>
      <div style="text-align:left;padding:8px 12px;border-radius:6px;font-size:13px;color:#a3a3a3;cursor:pointer">Analytics</div>
      <div style="text-align:left;padding:8px 12px;border-radius:6px;font-size:13px;color:#a3a3a3;cursor:pointer">Reports</div>
      <div style="text-align:left;padding:8px 12px;border-radius:6px;font-size:13px;color:#a3a3a3;cursor:pointer">Live View</div>
    </div>
  </div>
  <main style="flex:1;background:white;padding:32px">
    <h2 style="font-size:20px;font-weight:700;color:#171717;margin:0 0 8px 0">Overview</h2>
    <p style="font-size:14px;color:#a3a3a3;margin:0">Main content area with full-width workspace.</p>
  </main>
</div>`,
  },
];
