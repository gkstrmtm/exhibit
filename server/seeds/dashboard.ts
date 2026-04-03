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

  // ─── New App Shells ───────────────────────────────────────────────────────

  {
    slug: "command-palette-shell",
    title: "Command Palette Shell",
    description: "Raycast/Linear-style command palette overlay with Cmd+K trigger, grouped search results, keyboard shortcut hints, and smooth open/close animation.",
    category: "App Shells",
    tags: ["app-shell", "command-palette", "keyboard", "search", "overlay"],
    style: "",
    code: `import { useState, useEffect, useRef } from "react";

const groups = [
  {
    label: "Navigation",
    items: [
      { icon: "◆", label: "Go to Dashboard", shortcut: "G D" },
      { icon: "◎", label: "Go to Analytics", shortcut: "G A" },
      { icon: "▤", label: "Go to Projects", shortcut: "G P" },
    ],
  },
  {
    label: "Actions",
    items: [
      { icon: "＋", label: "New Project", shortcut: "⌘ N" },
      { icon: "◈", label: "Invite Member", shortcut: "⌘ I" },
      { icon: "▣", label: "Export Report", shortcut: "⌘ E" },
    ],
  },
  {
    label: "Recent",
    items: [
      { icon: "◷", label: "Q4 Revenue Report", shortcut: "" },
      { icon: "◷", label: "Design System v2", shortcut: "" },
    ],
  },
];

export default function CommandPaletteShell() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = groups.flatMap(g => g.items);
  const filtered = query
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const displayGroups = filtered
    ? [{ label: "Results", items: filtered }]
    : groups;

  return (
    <div className="relative min-h-[420px] bg-neutral-100 flex flex-col">
      {/* App background */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">L</div>
            <span className="font-semibold text-sm text-neutral-800">Linear</span>
          </div>
          <button
            onClick={() => { setOpen(true); setQuery(""); }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-500 bg-white border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors"
          >
            <span>Search or jump to…</span>
            <span className="flex items-center gap-0.5 text-neutral-400">
              <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px]">⌘</kbd>
              <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px]">K</kbd>
            </span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["My Issues", "All Projects", "Inbox", "Members", "Settings", "Roadmap"].map(t => (
            <div key={t} className="bg-white rounded-lg border border-neutral-200 p-4">
              <div className="w-6 h-6 bg-neutral-100 rounded mb-2" />
              <div className="text-xs font-medium text-neutral-700">{t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="absolute inset-0 bg-black/40 flex items-start justify-center pt-16 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
              <span className="text-neutral-400 text-sm">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search or jump to..."
                className="flex-1 text-sm outline-none text-neutral-900 placeholder:text-neutral-400"
              />
              <kbd className="text-[10px] text-neutral-400 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {displayGroups.map((group, gi) => (
                <div key={gi}>
                  <div className="px-4 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">{group.label}</div>
                  {group.items.map((item, ii) => {
                    const idx = displayGroups.slice(0, gi).reduce((acc, g) => acc + g.items.length, 0) + ii;
                    return (
                      <button
                        key={ii}
                        onMouseEnter={() => setSelected(idx)}
                        className={\`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors \${selected === idx ? "bg-violet-50 text-violet-700" : "text-neutral-700 hover:bg-neutral-50"}\`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-400">{item.icon}</span>
                          {item.label}
                        </div>
                        {item.shortcut && (
                          <span className="text-[10px] text-neutral-400 font-mono">{item.shortcut}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
    htmlPreview: `<div style="background:#f5f5f5;min-height:280px;border-radius:8px;overflow:hidden;font-family:system-ui,sans-serif;position:relative">
  <div style="padding:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:28px;height:28px;background:#7c3aed;border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px">L</div>
        <span style="font-size:13px;font-weight:600;color:#1a1a1a">Linear</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:white;border:1px solid #e5e5e5;border-radius:6px;font-size:11px;color:#888">
        Search or jump to…
        <span style="font-size:10px;background:#f5f5f5;border:1px solid #e5e5e5;border-radius:3px;padding:1px 4px">⌘K</span>
      </div>
    </div>
  </div>
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:flex-start;justify-content:center;padding-top:40px">
    <div style="width:380px;background:white;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #f0f0f0">
        <span style="color:#aaa;font-size:14px">⌕</span>
        <span style="font-size:13px;color:#bbb">Search or jump to...</span>
      </div>
      <div style="padding:8px 0">
        <div style="padding:6px 16px;font-size:10px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.05em">Navigation</div>
        <div style="padding:8px 16px;font-size:13px;color:#7c3aed;background:#f5f0ff;display:flex;justify-content:space-between">
          <span>◆ Go to Dashboard</span><span style="font-size:10px;color:#aaa;font-family:monospace">G D</span>
        </div>
        <div style="padding:8px 16px;font-size:13px;color:#555;display:flex;justify-content:space-between">
          <span>◎ Go to Analytics</span><span style="font-size:10px;color:#aaa;font-family:monospace">G A</span>
        </div>
        <div style="padding:6px 16px;font-size:10px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.05em;margin-top:4px">Actions</div>
        <div style="padding:8px 16px;font-size:13px;color:#555">＋ New Project</div>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "ide-three-panel-shell",
    title: "IDE Three-Panel Shell",
    description: "VS Code-style dark three-panel layout: collapsible file explorer on the left, tabbed code editor in the center, and output/inspector panel on the right.",
    category: "App Shells",
    tags: ["app-shell", "ide", "dark", "editor", "three-panel", "vscode"],
    style: "",
    code: `import { useState } from "react";

const files = [
  { name: "src", type: "folder", children: ["App.tsx", "index.tsx", "styles.css"] },
  { name: "public", type: "folder", children: ["favicon.ico", "index.html"] },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
];

const sampleCode = \`import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col
      items-center justify-center
      min-h-screen">
      <h1 className="text-2xl font-bold">
        Count: {count}
      </h1>
      <button
        onClick={() => setCount(c => c + 1)}
        className="mt-4 px-4 py-2 bg-blue-600
          text-white rounded-md"
      >
        Increment
      </button>
    </div>
  );
}\`;

export default function IDEThreePanelShell() {
  const [activeTab, setActiveTab] = useState("App.tsx");
  const [openFolder, setOpenFolder] = useState("src");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = ["App.tsx", "index.tsx", "styles.css"];

  return (
    <div className="flex min-h-[460px] bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs overflow-hidden rounded-lg">
      {/* Activity Bar */}
      <div className="w-10 bg-[#333333] flex flex-col items-center py-3 gap-4 border-r border-[#3c3c3c]">
        {["◈", "⊞", "⌕", "◎", "⚙"].map((icon, i) => (
          <button
            key={i}
            onClick={() => i === 0 && setSidebarOpen(o => !o)}
            className={\`w-8 h-8 flex items-center justify-center rounded text-[16px] transition-colors \${i === 0 ? "text-white" : "text-[#858585] hover:text-[#cccccc]"}\`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* File Explorer */}
      {sidebarOpen && (
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
          <div className="px-3 py-2 text-[10px] font-semibold text-[#bbb] uppercase tracking-wider">Explorer</div>
          <div className="flex-1 overflow-auto">
            {files.map(f => (
              <div key={f.name}>
                <button
                  onClick={() => f.type === "folder" && setOpenFolder(openFolder === f.name ? "" : f.name)}
                  className="w-full flex items-center gap-1.5 px-3 py-1 text-[#cccccc] hover:bg-[#2a2d2e] text-left"
                >
                  <span className="text-[10px]">{f.type === "folder" ? (openFolder === f.name ? "▾" : "▸") : ""}</span>
                  <span className="text-[10px]">{f.type === "folder" ? "📁" : "📄"}</span>
                  <span className="text-xs">{f.name}</span>
                </button>
                {f.type === "folder" && openFolder === f.name && f.children?.map(child => (
                  <button
                    key={child}
                    onClick={() => setActiveTab(child)}
                    className={\`w-full flex items-center gap-1.5 pl-8 pr-3 py-1 text-left text-xs transition-colors \${activeTab === child ? "bg-[#37373d] text-white" : "text-[#9d9d9d] hover:bg-[#2a2d2e]"}\`}
                  >
                    <span className="text-[10px]">📄</span>
                    {child}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center bg-[#1e1e1e] border-b border-[#3c3c3c] overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={\`flex items-center gap-2 px-4 py-2 text-xs whitespace-nowrap border-r border-[#3c3c3c] transition-colors \${activeTab === tab ? "bg-[#1e1e1e] text-white border-t border-t-[#007acc]" : "bg-[#2d2d2d] text-[#7e7e7e] hover:text-[#cccccc]"}\`}
            >
              {tab}
              <span className="text-[#7e7e7e] hover:text-white text-[10px]">×</span>
            </button>
          ))}
        </div>
        {/* Code area */}
        <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
          <div className="flex gap-4">
            <div className="flex flex-col text-right text-[#858585] select-none min-w-[2rem]">
              {sampleCode.split("\\n").map((_, i) => (
                <span key={i} className="leading-6 text-[11px]">{i + 1}</span>
              ))}
            </div>
            <pre className="flex-1 text-[#d4d4d4] text-[11px] leading-6 overflow-x-auto">
              <code>{sampleCode}</code>
            </pre>
          </div>
        </div>
        {/* Status Bar */}
        <div className="flex items-center justify-between bg-[#007acc] px-4 py-0.5 text-[11px] text-white">
          <div className="flex items-center gap-4">
            <span>⎇ main</span>
            <span>◎ 0 ⚠ 0</span>
          </div>
          <div className="flex items-center gap-4">
            <span>TypeScript React</span>
            <span>UTF-8</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-52 bg-[#252526] border-l border-[#3c3c3c] flex flex-col">
        <div className="px-3 py-2 text-[10px] font-semibold text-[#bbb] uppercase tracking-wider border-b border-[#3c3c3c]">Output</div>
        <div className="flex-1 p-3 text-[11px] leading-5 text-[#4ec9b0]">
          <div>▸ Starting dev server...</div>
          <div className="text-[#9cdcfe]">  vite v5.0.0</div>
          <div className="text-[#4ec9b0]">  ✓ ready in 312ms</div>
          <div className="text-[#858585] mt-2">Local: http://localhost:5173</div>
          <div className="text-[#858585]">Network: http://192.168.1.5</div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:#1e1e1e;border-radius:8px;overflow:hidden;font-family:monospace;font-size:11px">
  <div style="width:36px;background:#333;display:flex;flex-direction:column;align-items:center;padding:10px 0;gap:12px">
    <div style="color:white;font-size:14px">◈</div>
    <div style="color:#666;font-size:14px">⊞</div>
    <div style="color:#666;font-size:14px">⌕</div>
    <div style="color:#666;font-size:14px">◎</div>
  </div>
  <div style="width:140px;background:#252526;border-right:1px solid #3c3c3c">
    <div style="padding:6px 10px;font-size:9px;color:#bbb;text-transform:uppercase;letter-spacing:0.05em">Explorer</div>
    <div style="padding:4px 10px;color:#ccc;font-size:11px;cursor:pointer">▾ 📁 src</div>
    <div style="padding:4px 24px;color:white;font-size:11px;background:#37373d;cursor:pointer">📄 App.tsx</div>
    <div style="padding:4px 24px;color:#9d9d9d;font-size:11px;cursor:pointer">📄 index.tsx</div>
    <div style="padding:4px 10px;color:#9d9d9d;font-size:11px;cursor:pointer">▸ 📁 public</div>
    <div style="padding:4px 10px;color:#9d9d9d;font-size:11px;cursor:pointer">📄 package.json</div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column">
    <div style="display:flex;background:#1e1e1e;border-bottom:1px solid #3c3c3c">
      <div style="padding:6px 14px;color:white;background:#1e1e1e;border-top:2px solid #007acc;font-size:11px">App.tsx</div>
      <div style="padding:6px 14px;color:#7e7e7e;background:#2d2d2d;font-size:11px">index.tsx</div>
    </div>
    <div style="flex:1;padding:12px;color:#d4d4d4;font-size:11px;line-height:1.6">
      <span style="color:#c586c0">import</span> <span style="color:#9cdcfe">&#123; useState &#125;</span> <span style="color:#c586c0">from</span> <span style="color:#ce9178">"react"</span>;<br>
      <br>
      <span style="color:#c586c0">export default function</span> <span style="color:#dcdcaa">App</span>() &#123;<br>
      <span style="padding-left:16px;display:block"><span style="color:#c586c0">return</span> &lt;<span style="color:#4ec9b0">div</span>&gt;...&lt;/<span style="color:#4ec9b0">div</span>&gt;;</span>
      &#125;
    </div>
    <div style="display:flex;justify-content:space-between;background:#007acc;padding:2px 12px;color:white;font-size:10px">
      <span>⎇ main · ◎ 0</span><span>TypeScript · Ln 1, Col 1</span>
    </div>
  </div>
  <div style="width:130px;background:#252526;border-left:1px solid #3c3c3c">
    <div style="padding:6px 10px;font-size:9px;color:#bbb;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #3c3c3c">Output</div>
    <div style="padding:10px;font-size:10px;color:#4ec9b0;line-height:1.7">
      ▸ Starting dev...<br><span style="color:#9cdcfe">vite v5.0.0</span><br><span style="color:#4ec9b0">✓ ready 312ms</span><br><span style="color:#666">localhost:5173</span>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "settings-preferences-shell",
    title: "Settings & Preferences Shell",
    description: "Clean settings page layout with grouped left-rail navigation, main content area with sectioned forms, and a sticky save bar at the bottom.",
    category: "App Shells",
    tags: ["app-shell", "settings", "preferences", "form", "navigation"],
    style: "",
    code: `import { useState } from "react";

const sections = [
  { group: "Account", items: ["Profile", "Password", "Sessions"] },
  { group: "Workspace", items: ["General", "Members", "Billing", "Integrations"] },
  { group: "Notifications", items: ["Email", "Push", "Slack"] },
];

export default function SettingsPreferencesShell() {
  const [active, setActive] = useState("Profile");
  const [dirty, setDirty] = useState(false);
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@acme.io");
  const [handle, setHandle] = useState("alexj");

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Left Rail */}
      <aside className="w-52 bg-neutral-50 border-r border-neutral-200 flex flex-col py-4 flex-shrink-0">
        <div className="px-4 mb-3">
          <span className="text-sm font-semibold text-neutral-900">Settings</span>
        </div>
        {sections.map(({ group, items }) => (
          <div key={group} className="mb-4">
            <div className="px-4 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">{group}</div>
            {items.map(item => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={\`w-full text-left px-4 py-1.5 text-sm transition-colors \${active === item ? "text-neutral-900 bg-white border-r-2 border-neutral-900 font-medium" : "text-neutral-500 hover:text-neutral-800"}\`}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-1">{active}</h2>
          <p className="text-sm text-neutral-500 mb-8">Manage your {active.toLowerCase()} settings and preferences.</p>

          {active === "Profile" && (
            <div className="space-y-6 max-w-lg">
              <div className="flex items-center gap-5 pb-6 border-b border-neutral-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  AJ
                </div>
                <div>
                  <button className="px-3 py-1.5 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors font-medium">
                    Change photo
                  </button>
                  <p className="text-xs text-neutral-400 mt-1">JPG, PNG or GIF · max 2MB</p>
                </div>
              </div>
              {[
                { label: "Full name", value: name, setter: setName },
                { label: "Email address", value: email, setter: setEmail },
                { label: "Username", value: handle, setter: setHandle },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
                  <input
                    value={value}
                    onChange={e => { setter(e.target.value); setDirty(true); }}
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  onChange={() => setDirty(true)}
                  placeholder="Tell your team about yourself..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {active !== "Profile" && (
            <div className="max-w-lg space-y-4">
              <div className="h-10 bg-neutral-100 rounded-lg w-full animate-pulse" />
              <div className="h-10 bg-neutral-100 rounded-lg w-3/4 animate-pulse" />
              <div className="h-24 bg-neutral-100 rounded-lg w-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Save Bar */}
        {dirty && (
          <div className="border-t border-neutral-200 bg-white px-8 py-4 flex items-center justify-between">
            <span className="text-sm text-neutral-500">You have unsaved changes</span>
            <div className="flex gap-3">
              <button onClick={() => setDirty(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Discard
              </button>
              <button onClick={() => setDirty(false)} className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                Save changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:white;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif">
  <div style="width:180px;background:#fafafa;border-right:1px solid #e5e5e5;padding:16px 0">
    <div style="padding:0 16px;font-size:13px;font-weight:600;color:#111;margin-bottom:12px">Settings</div>
    <div style="padding:4px 16px;font-size:10px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.05em">Account</div>
    <div style="padding:6px 16px;font-size:12px;color:#111;font-weight:500;background:white;border-right:2px solid #111">Profile</div>
    <div style="padding:6px 16px;font-size:12px;color:#888">Password</div>
    <div style="padding:6px 16px;font-size:12px;color:#888">Sessions</div>
    <div style="padding:4px 16px;font-size:10px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.05em;margin-top:8px">Workspace</div>
    <div style="padding:6px 16px;font-size:12px;color:#888">General</div>
    <div style="padding:6px 16px;font-size:12px;color:#888">Members</div>
    <div style="padding:6px 16px;font-size:12px;color:#888">Billing</div>
  </div>
  <div style="flex:1;padding:24px">
    <div style="font-size:16px;font-weight:600;color:#111;margin-bottom:4px">Profile</div>
    <div style="font-size:12px;color:#888;margin-bottom:20px">Manage your profile settings.</div>
    <div style="display:flex;align-items:center;gap:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0;margin-bottom:16px">
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px">AJ</div>
      <div>
        <div style="display:inline-block;padding:6px 12px;font-size:11px;border:1px solid #e5e5e5;border-radius:6px;color:#333;font-weight:500">Change photo</div>
        <div style="font-size:10px;color:#aaa;margin-top:4px">JPG, PNG · max 2MB</div>
      </div>
    </div>
    <div style="margin-bottom:10px">
      <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:4px">Full name</div>
      <div style="padding:7px 10px;border:1px solid #e5e5e5;border-radius:6px;font-size:12px;color:#111">Alex Johnson</div>
    </div>
    <div>
      <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:4px">Email address</div>
      <div style="padding:7px 10px;border:1px solid #e5e5e5;border-radius:6px;font-size:12px;color:#111">alex@acme.io</div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "chat-messaging-shell",
    title: "Chat & Messaging Shell",
    description: "Full messaging layout with conversation list sidebar, avatar + timestamp header, message thread with sent/received bubbles, and a fixed composer at the bottom.",
    category: "App Shells",
    tags: ["app-shell", "chat", "messaging", "conversation", "layout"],
    style: "",
    code: `import { useState } from "react";

const conversations = [
  { id: 1, name: "Design Team", avatar: "DT", preview: "Let's sync on the new components", time: "2m", unread: 3, color: "from-pink-400 to-rose-500" },
  { id: 2, name: "Marcus Chen", avatar: "MC", preview: "Can you review my PR?", time: "14m", unread: 1, color: "from-blue-400 to-cyan-500" },
  { id: 3, name: "Sarah Kim", avatar: "SK", preview: "Pushed the fix! Check it out", time: "1h", unread: 0, color: "from-violet-400 to-purple-500" },
  { id: 4, name: "Engineering", avatar: "EN", preview: "Deploy went out — all green", time: "2h", unread: 0, color: "from-emerald-400 to-teal-500" },
  { id: 5, name: "Priya Patel", avatar: "PP", preview: "Sounds good, talk tomorrow", time: "3h", unread: 0, color: "from-amber-400 to-orange-500" },
];

const messages = [
  { id: 1, from: "Marcus Chen", avatar: "MC", text: "Hey, can you take a look at the PR I opened for the auth refactor?", time: "2:14 PM", mine: false },
  { id: 2, from: "Me", text: "Sure, sending it over now. What should I focus on?", time: "2:15 PM", mine: true },
  { id: 3, from: "Marcus Chen", avatar: "MC", text: "Mostly the session handling logic and the middleware order — I moved some things around.", time: "2:15 PM", mine: false },
  { id: 4, from: "Me", text: "On it. I'll leave comments inline and we can sync async.", time: "2:16 PM", mine: true },
  { id: 5, from: "Marcus Chen", avatar: "MC", text: "Perfect, appreciate it 🙏", time: "2:17 PM", mine: false },
];

export default function ChatMessagingShell() {
  const [activeConvo, setActiveConvo] = useState(2);
  const [input, setInput] = useState("");
  const convo = conversations.find(c => c.id === activeConvo)!;

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Conversation List */}
      <aside className="w-64 border-r border-neutral-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-neutral-900">Messages</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-neutral-100 text-neutral-500">＋</button>
          </div>
          <input placeholder="Search..." className="w-full px-3 py-1.5 text-sm bg-neutral-100 rounded-lg border-none outline-none placeholder:text-neutral-400" />
        </div>
        <div className="flex-1 overflow-auto">
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConvo(c.id)}
              className={\`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors \${activeConvo === c.id ? "bg-blue-50" : "hover:bg-neutral-50"}\`}
            >
              <div className={\`w-9 h-9 rounded-full bg-gradient-to-br \${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0\`}>
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={\`text-sm font-medium truncate \${activeConvo === c.id ? "text-blue-700" : "text-neutral-900"}\`}>{c.name}</span>
                  <span className="text-[10px] text-neutral-400 flex-shrink-0 ml-1">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 truncate">{c.preview}</span>
                  {c.unread > 0 && (
                    <span className="ml-1 flex-shrink-0 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-200">
          <div className={\`w-8 h-8 rounded-full bg-gradient-to-br \${convo.color} flex items-center justify-center text-white text-xs font-bold\`}>
            {convo.avatar}
          </div>
          <div>
            <div className="text-sm font-semibold text-neutral-900">{convo.name}</div>
            <div className="text-xs text-emerald-500 font-medium">● Online</div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-neutral-400">
            <button className="hover:text-neutral-700 transition-colors">📞</button>
            <button className="hover:text-neutral-700 transition-colors">⋯</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-5 space-y-4 bg-neutral-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={\`flex items-end gap-2 \${msg.mine ? "flex-row-reverse" : ""}\`}>
              {!msg.mine && (
                <div className={\`w-7 h-7 rounded-full bg-gradient-to-br \${convo.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0\`}>
                  {msg.avatar}
                </div>
              )}
              <div className={\`max-w-[65%] \${msg.mine ? "items-end" : "items-start"} flex flex-col gap-1\`}>
                <div className={\`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed \${msg.mine ? "bg-blue-500 text-white rounded-br-sm" : "bg-white text-neutral-800 rounded-bl-sm border border-neutral-100 shadow-sm"}\`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-neutral-400">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-neutral-200 p-4 bg-white">
          <div className="flex items-center gap-3 bg-neutral-100 rounded-xl px-4 py-2.5">
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">＋</button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Design Team..."
              className="flex-1 bg-transparent text-sm outline-none text-neutral-800 placeholder:text-neutral-400"
            />
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">😊</button>
            <button
              className={\`w-8 h-8 rounded-lg flex items-center justify-center transition-colors \${input ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-400"}\`}
              onClick={() => setInput("")}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:white;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif">
  <div style="width:210px;border-right:1px solid #e5e5e5;display:flex;flex-direction:column">
    <div style="padding:14px;border-bottom:1px solid #f0f0f0">
      <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:8px">Messages</div>
      <div style="background:#f5f5f5;border-radius:8px;padding:6px 10px;font-size:11px;color:#aaa">Search...</div>
    </div>
    <div style="flex:1;overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#eff6ff">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0">MC</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:#1d4ed8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Marcus Chen</div>
          <div style="font-size:10px;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Can you review my PR?</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;padding:10px 14px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#f43f5e);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0">DT</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Design Team</div>
          <div style="font-size:10px;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Let's sync on components</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;padding:10px 14px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0">SK</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Sarah Kim</div>
          <div style="font-size:10px;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Pushed the fix!</div>
        </div>
      </div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column">
    <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #e5e5e5">
      <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:700">MC</div>
      <div><div style="font-size:12px;font-weight:600;color:#111">Marcus Chen</div><div style="font-size:10px;color:#10b981">● Online</div></div>
    </div>
    <div style="flex:1;padding:14px;background:#fafafa;display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;align-items:flex-end;gap:6px">
        <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-size:8px;font-weight:700;flex-shrink:0">MC</div>
        <div style="background:white;border:1px solid #e5e5e5;border-radius:12px;border-bottom-left-radius:3px;padding:8px 12px;font-size:11px;color:#333;max-width:60%">Can you review my PR?</div>
      </div>
      <div style="display:flex;align-items:flex-end;gap:6px;flex-direction:row-reverse">
        <div style="background:#3b82f6;border-radius:12px;border-bottom-right-radius:3px;padding:8px 12px;font-size:11px;color:white;max-width:60%">Sure, what should I focus on?</div>
      </div>
    </div>
    <div style="padding:10px 14px;border-top:1px solid #e5e5e5;background:white">
      <div style="background:#f5f5f5;border-radius:10px;padding:8px 12px;font-size:11px;color:#aaa;display:flex;align-items:center;gap:8px">
        <span>＋</span><span style="flex:1">Message Marcus Chen...</span><span style="background:#3b82f6;color:white;border-radius:6px;width:22px;height:22px;display:flex;align-items:center;justify-content:center">↑</span>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "docs-writing-shell",
    title: "Docs & Writing Shell",
    description: "Documentation layout with a hierarchical TOC sidebar, centered narrow reading column with headings and prose, and a fixed table of contents that tracks scroll position.",
    category: "App Shells",
    tags: ["app-shell", "docs", "documentation", "writing", "reading", "notion"],
    style: "",
    code: `import { useState } from "react";

const toc = [
  { id: "intro", label: "Introduction", level: 1 },
  { id: "start", label: "Getting Started", level: 1 },
  { id: "install", label: "Installation", level: 2 },
  { id: "config", label: "Configuration", level: 2 },
  { id: "usage", label: "Basic Usage", level: 2 },
  { id: "api", label: "API Reference", level: 1 },
  { id: "components", label: "Components", level: 2 },
  { id: "hooks", label: "Hooks", level: 2 },
  { id: "theming", label: "Theming", level: 1 },
  { id: "deploy", label: "Deployment", level: 1 },
];

export default function DocsWritingShell() {
  const [active, setActive] = useState("intro");

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 h-12" />

      {/* Left TOC */}
      <aside className="w-52 border-r border-neutral-100 flex flex-col py-6 flex-shrink-0 bg-white">
        <div className="px-5 mb-4">
          <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Docs</span>
        </div>
        <nav className="flex-1 overflow-auto space-y-0.5 px-3">
          {toc.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={\`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors \${item.level === 2 ? "pl-5 text-xs" : "font-medium text-sm"} \${active === item.id ? "bg-blue-50 text-blue-700" : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"}\`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Reading Column */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <span>Docs</span>
            <span>/</span>
            <span className="text-neutral-600">Introduction</span>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Introduction</h1>
          <p className="text-neutral-600 text-base leading-relaxed mb-6">
            Welcome to the documentation. This guide covers everything you need to build production-ready applications — from initial setup to advanced configuration and deployment.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5">ℹ</span>
              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">Prerequisites</div>
                <div className="text-sm text-blue-700">Node.js v18+, a package manager (npm, pnpm, or yarn), and basic knowledge of React.</div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 mb-3 mt-8">What you'll build</h2>
          <p className="text-neutral-600 text-base leading-relaxed mb-4">
            By the end of this guide, you'll have a fully functional app with authentication, a component library, and a deployment pipeline set up.
          </p>

          <div className="bg-neutral-900 rounded-lg p-4 mb-6 font-mono">
            <div className="text-neutral-400 text-xs mb-2"># Install dependencies</div>
            <div className="text-emerald-400 text-sm">npm install @acme/ui framer-motion</div>
            <div className="text-emerald-400 text-sm mt-1">npm run dev</div>
          </div>

          <ul className="space-y-2 mb-6">
            {["Zero-config setup with sensible defaults", "Full TypeScript support out of the box", "Accessible components built on Radix UI", "Tailwind CSS with a custom design system"].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
            <span className="text-sm text-neutral-400">← Previous</span>
            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Getting Started <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Mini TOC */}
      <aside className="w-44 border-l border-neutral-100 py-8 px-4 flex-shrink-0 hidden lg:block">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">On this page</div>
        <nav className="space-y-1">
          {["Overview", "Prerequisites", "What you'll build", "Features"].map(h => (
            <button key={h} className="block w-full text-left text-xs text-neutral-500 hover:text-neutral-800 py-0.5 transition-colors">
              {h}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:white;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif">
  <div style="width:170px;border-right:1px solid #f0f0f0;padding:20px 0;background:white">
    <div style="padding:0 16px;font-size:10px;font-weight:600;color:#111;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px">Docs</div>
    <div style="padding:6px 10px;margin:0 6px;border-radius:6px;background:#eff6ff;font-size:12px;color:#1d4ed8;font-weight:500">Introduction</div>
    <div style="padding:6px 10px;margin:0 6px;font-size:12px;color:#888">Getting Started</div>
    <div style="padding:4px 10px 4px 22px;margin:0 6px;font-size:11px;color:#aaa">Installation</div>
    <div style="padding:4px 10px 4px 22px;margin:0 6px;font-size:11px;color:#aaa">Configuration</div>
    <div style="padding:6px 10px;margin:0 6px;font-size:12px;color:#888">API Reference</div>
    <div style="padding:4px 10px 4px 22px;margin:0 6px;font-size:11px;color:#aaa">Components</div>
    <div style="padding:4px 10px 4px 22px;margin:0 6px;font-size:11px;color:#aaa">Hooks</div>
    <div style="padding:6px 10px;margin:0 6px;font-size:12px;color:#888">Theming</div>
  </div>
  <div style="flex:1;padding:24px 32px;overflow:hidden">
    <div style="font-size:10px;color:#aaa;margin-bottom:12px">Docs / Introduction</div>
    <div style="font-size:22px;font-weight:700;color:#111;margin-bottom:8px">Introduction</div>
    <div style="font-size:12px;color:#555;line-height:1.7;margin-bottom:14px">Welcome to the documentation. This guide covers everything you need to build production-ready applications.</div>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;margin-bottom:14px;font-size:11px;color:#1d4ed8">
      <strong>Prerequisites:</strong> Node.js v18+, basic React knowledge.
    </div>
    <div style="background:#111;border-radius:8px;padding:10px 12px;font-family:monospace;font-size:11px;color:#4ade80;line-height:1.7">npm install @acme/ui<br>npm run dev</div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "kanban-board-shell",
    title: "Kanban Board Shell",
    description: "Horizontal scrolling Kanban layout with labeled columns, card stacks with assignees and priority badges, drag-ready structure, and an add-column button.",
    category: "App Shells",
    tags: ["app-shell", "kanban", "board", "project-management", "columns"],
    style: "",
    code: `import { useState } from "react";

const initialColumns = [
  {
    id: "backlog", label: "Backlog", color: "bg-neutral-400",
    cards: [
      { id: 1, title: "Update API docs", priority: "low", assignee: "AJ", tag: "Docs" },
      { id: 2, title: "Design new onboarding flow", priority: "medium", assignee: "SK", tag: "Design" },
      { id: 3, title: "Refactor auth module", priority: "high", assignee: "MC", tag: "Dev" },
    ],
  },
  {
    id: "inprogress", label: "In Progress", color: "bg-blue-500",
    cards: [
      { id: 4, title: "Implement search filters", priority: "high", assignee: "PP", tag: "Dev" },
      { id: 5, title: "Write unit tests for billing", priority: "medium", assignee: "AJ", tag: "Dev" },
    ],
  },
  {
    id: "review", label: "In Review", color: "bg-amber-500",
    cards: [
      { id: 6, title: "Fix modal accessibility issues", priority: "high", assignee: "SK", tag: "A11y" },
    ],
  },
  {
    id: "done", label: "Done", color: "bg-emerald-500",
    cards: [
      { id: 7, title: "Set up CI/CD pipeline", priority: "medium", assignee: "MC", tag: "Infra" },
      { id: 8, title: "Launch beta invite page", priority: "high", assignee: "PP", tag: "Marketing" },
      { id: 9, title: "Migrate to Drizzle ORM", priority: "low", assignee: "AJ", tag: "Dev" },
    ],
  },
];

const priorityStyles: Record<string, string> = {
  low: "bg-neutral-100 text-neutral-500",
  medium: "bg-amber-50 text-amber-600",
  high: "bg-red-50 text-red-500",
};

const avatarColors: Record<string, string> = {
  AJ: "from-blue-400 to-cyan-500",
  SK: "from-violet-400 to-purple-500",
  MC: "from-pink-400 to-rose-500",
  PP: "from-amber-400 to-orange-500",
};

export default function KanbanBoardShell() {
  const [columns, setColumns] = useState(initialColumns);

  const addCard = (colId: string) => {
    setColumns(cols => cols.map(c =>
      c.id === colId
        ? { ...c, cards: [{ id: Date.now(), title: "New task", priority: "medium", assignee: "AJ", tag: "Dev" }, ...c.cards] }
        : c
    ));
  };

  return (
    <div className="flex flex-col min-h-[460px] bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div>
          <h2 className="font-semibold text-neutral-900">Q2 Roadmap</h2>
          <p className="text-xs text-neutral-500 mt-0.5">{columns.reduce((sum, c) => sum + c.cards.length, 0)} tasks across {columns.length} columns</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {["AJ", "SK", "MC", "PP"].map(a => (
              <div key={a} className={\`w-7 h-7 rounded-full bg-gradient-to-br \${avatarColors[a]} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold\`}>{a}</div>
            ))}
          </div>
          <button className="ml-2 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">＋ Add task</button>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-4 p-5 overflow-x-auto flex-1">
        {columns.map(col => (
          <div key={col.id} className="flex flex-col w-64 flex-shrink-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={\`w-2 h-2 rounded-full \${col.color}\`} />
                <span className="text-sm font-semibold text-neutral-700">{col.label}</span>
                <span className="text-xs text-neutral-400 font-mono">{col.cards.length}</span>
              </div>
              <button onClick={() => addCard(col.id)} className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded transition-colors text-sm">＋</button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 flex-1">
              {col.cards.map(card => (
                <div key={card.id} className="bg-white rounded-lg border border-neutral-200 p-3 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm text-neutral-800 font-medium leading-snug">{card.title}</p>
                    <span className={\`text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 \${priorityStyles[card.priority]}\`}>
                      {card.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-100 px-1.5 py-0.5 rounded">{card.tag}</span>
                    <div className={\`w-5 h-5 rounded-full bg-gradient-to-br \${avatarColors[card.assignee]} flex items-center justify-center text-white text-[8px] font-bold\`}>
                      {card.assignee}
                    </div>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="border-2 border-dashed border-neutral-200 rounded-lg h-20 flex items-center justify-center">
                  <span className="text-xs text-neutral-300">Drop here</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add column */}
        <button className="flex-shrink-0 w-52 h-12 border-2 border-dashed border-neutral-300 rounded-lg text-sm text-neutral-400 hover:border-neutral-400 hover:text-neutral-500 transition-colors flex items-center justify-center gap-2 self-start">
          ＋ Add column
        </button>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif;min-height:240px">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:white;border-bottom:1px solid #e5e5e5">
    <div>
      <div style="font-size:13px;font-weight:600;color:#111">Q2 Roadmap</div>
      <div style="font-size:10px;color:#888;margin-top:2px">13 tasks across 4 columns</div>
    </div>
    <div style="display:inline-block;padding:6px 12px;background:#111;color:white;border-radius:8px;font-size:11px;font-weight:500">＋ Add task</div>
  </div>
  <div style="display:flex;gap:14px;padding:16px;overflow:hidden">
    <div style="width:180px;flex-shrink:0">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <div style="width:8px;height:8px;border-radius:50%;background:#a3a3a3"></div>
        <span style="font-size:12px;font-weight:600;color:#555">Backlog</span>
        <span style="font-size:10px;color:#aaa">3</span>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:10px;margin-bottom:6px">
        <div style="font-size:11px;font-weight:500;color:#222;margin-bottom:6px">Update API docs</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:9px;background:#f5f5f5;border:1px solid #e5e5e5;border-radius:4px;padding:2px 6px;color:#888">Docs</span>
          <div style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-size:7px;font-weight:700">AJ</div>
        </div>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:10px;margin-bottom:6px">
        <div style="font-size:11px;font-weight:500;color:#222;margin-bottom:6px">Design onboarding flow</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:9px;background:#fffbeb;border:1px solid #fde68a;border-radius:4px;padding:2px 6px;color:#d97706">medium</span>
          <div style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:7px;font-weight:700">SK</div>
        </div>
      </div>
    </div>
    <div style="width:180px;flex-shrink:0">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <div style="width:8px;height:8px;border-radius:50%;background:#3b82f6"></div>
        <span style="font-size:12px;font-weight:600;color:#555">In Progress</span>
        <span style="font-size:10px;color:#aaa">2</span>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:10px;margin-bottom:6px">
        <div style="font-size:11px;font-weight:500;color:#222;margin-bottom:6px">Implement search filters</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:9px;background:#fef2f2;border:1px solid #fecaca;border-radius:4px;padding:2px 6px;color:#ef4444">high</span>
          <div style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#fb923c,#f97316);display:flex;align-items:center;justify-content:center;color:white;font-size:7px;font-weight:700">PP</div>
        </div>
      </div>
    </div>
    <div style="width:180px;flex-shrink:0">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <div style="width:8px;height:8px;border-radius:50%;background:#10b981"></div>
        <span style="font-size:12px;font-weight:600;color:#555">Done</span>
        <span style="font-size:10px;color:#aaa">3</span>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:10px;margin-bottom:6px;opacity:0.7">
        <div style="font-size:11px;font-weight:500;color:#222;margin-bottom:6px">Set up CI/CD pipeline</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:9px;background:#f5f5f5;border:1px solid #e5e5e5;border-radius:4px;padding:2px 6px;color:#888">Infra</span>
          <div style="width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#e11d48);display:flex;align-items:center;justify-content:center;color:white;font-size:7px;font-weight:700">MC</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "marketing-hero-shell",
    title: "Marketing Hero Shell",
    description: "Full marketing site layout: sticky top nav with logo, links, and CTA; oversized centered hero with headline, subtext, and dual action buttons; three-column feature grid below.",
    category: "App Shells",
    tags: ["app-shell", "marketing", "landing-page", "hero", "layout"],
    style: "",
    code: `export default function MarketingHeroShell() {
  return (
    <div className="min-h-[480px] bg-white font-sans overflow-hidden">
      {/* Nav */}
      <header className="border-b border-neutral-100 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-black text-xs">A</div>
            <span className="font-bold text-neutral-900 text-sm">Acme</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-500">
            {["Product", "Pricing", "Docs", "Blog", "About"].map(item => (
              <a key={item} href="#" className="hover:text-neutral-900 transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors font-medium">Sign in</button>
            <button className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors">
              Get started free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          New — Introducing AI-powered workflows
        </div>
        <h1 className="text-5xl font-black text-neutral-900 leading-tight tracking-tight mb-6">
          Build products your<br />customers will love
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Acme helps teams ship faster with better tooling, smarter automation, and a design system that scales from zero to enterprise.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-700 transition-colors">
            Start building for free
          </button>
          <button className="px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors flex items-center gap-2">
            <span className="text-neutral-400">▶</span> Watch demo
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-4">No credit card required · Free forever up to 5 users</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Lightning fast", desc: "Deploy in seconds. No infrastructure to manage. Your code ships instantly." },
            { icon: "🔒", title: "Enterprise security", desc: "SOC 2 certified, SAML SSO, audit logs, and fine-grained access controls." },
            { icon: "🧩", title: "Built to integrate", desc: "Connect to 200+ tools. GitHub, Slack, Jira, Linear — it all just works." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-5 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,
    htmlPreview: `<div style="background:white;font-family:system-ui,sans-serif;min-height:240px;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
  <div style="border-bottom:1px solid #f0f0f0;padding:0 24px;height:48px;display:flex;align-items:center;justify-content:space-between;background:white">
    <div style="display:flex;align-items:center;gap:8px">
      <div style="width:24px;height:24px;background:#111;border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:10px">A</div>
      <span style="font-weight:700;font-size:12px;color:#111">Acme</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;font-size:11px;color:#888">
      <span>Product</span><span>Pricing</span><span>Docs</span><span>Blog</span>
    </div>
    <div style="background:#111;color:white;padding:6px 14px;border-radius:8px;font-size:11px;font-weight:500">Get started free</div>
  </div>
  <div style="text-align:center;padding:28px 24px 20px">
    <div style="display:inline-block;padding:4px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;font-size:10px;color:#2563eb;margin-bottom:14px;font-weight:500">✦ New — AI-powered workflows</div>
    <div style="font-size:26px;font-weight:900;color:#111;line-height:1.2;margin-bottom:10px">Build products your<br>customers will love</div>
    <div style="font-size:12px;color:#888;max-width:360px;margin:0 auto 16px;line-height:1.6">Acme helps teams ship faster with better tooling, smarter automation, and a design system that scales.</div>
    <div style="display:flex;justify-content:center;gap:10px">
      <div style="background:#111;color:white;padding:8px 18px;border-radius:10px;font-size:11px;font-weight:600">Start building free</div>
      <div style="background:white;color:#333;padding:8px 18px;border-radius:10px;font-size:11px;font-weight:600;border:1px solid #e5e5e5">▶ Watch demo</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:0 24px 20px">
    <div style="padding:14px;background:#fafafa;border:1px solid #f0f0f0;border-radius:10px">
      <div style="font-size:18px;margin-bottom:6px">⚡</div>
      <div style="font-size:11px;font-weight:600;color:#111;margin-bottom:4px">Lightning fast</div>
      <div style="font-size:10px;color:#888;line-height:1.5">Deploy in seconds. No infrastructure to manage.</div>
    </div>
    <div style="padding:14px;background:#fafafa;border:1px solid #f0f0f0;border-radius:10px">
      <div style="font-size:18px;margin-bottom:6px">🔒</div>
      <div style="font-size:11px;font-weight:600;color:#111;margin-bottom:4px">Enterprise security</div>
      <div style="font-size:10px;color:#888;line-height:1.5">SOC 2, SAML SSO, audit logs.</div>
    </div>
    <div style="padding:14px;background:#fafafa;border:1px solid #f0f0f0;border-radius:10px">
      <div style="font-size:18px;margin-bottom:6px">🧩</div>
      <div style="font-size:11px;font-weight:600;color:#111;margin-bottom:4px">Built to integrate</div>
      <div style="font-size:10px;color:#888;line-height:1.5">Connect to 200+ tools out of the box.</div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "mobile-bottom-tab-shell",
    title: "Mobile Bottom Tab Shell",
    description: "iOS-style mobile app shell with a fixed bottom navigation bar (5 tabs with icons and labels), content area, and status bar — responsive at mobile widths.",
    category: "App Shells",
    tags: ["app-shell", "mobile", "ios", "bottom-tabs", "navigation"],
    style: "",
    code: `import { useState } from "react";

const tabs = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "search", icon: "⌕", label: "Search" },
  { id: "create", icon: "＋", label: "Create", special: true },
  { id: "activity", icon: "♡", label: "Activity" },
  { id: "profile", icon: "◎", label: "Profile" },
];

const content: Record<string, React.ReactNode> = {
  home: (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500">Good morning,</p>
          <h2 className="text-lg font-bold text-neutral-900">Alex 👋</h2>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">A</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Workouts", value: "4", sub: "this week", color: "from-blue-500 to-cyan-500" },
          { label: "Calories", value: "2,140", sub: "today", color: "from-orange-400 to-red-500" },
          { label: "Sleep", value: "7.5h", sub: "last night", color: "from-violet-500 to-purple-600" },
          { label: "Steps", value: "8,432", sub: "today", color: "from-emerald-400 to-teal-500" },
        ].map(card => (
          <div key={card.label} className={\`p-4 rounded-2xl bg-gradient-to-br \${card.color} text-white\`}>
            <p className="text-xs opacity-80 mb-1">{card.label}</p>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs opacity-70">{card.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-neutral-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-neutral-900">Recent Activity</span>
          <span className="text-xs text-blue-500 font-medium">See all</span>
        </div>
        {[
          { icon: "🏃", label: "Morning Run", time: "6:30 AM", val: "5.2 km" },
          { icon: "💪", label: "Strength Training", time: "Yesterday", val: "45 min" },
          { icon: "🧘", label: "Yoga Session", time: "Mon", val: "30 min" },
        ].map(a => (
          <div key={a.label} className="flex items-center gap-3 py-2">
            <span className="text-xl">{a.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">{a.label}</p>
              <p className="text-xs text-neutral-500">{a.time}</p>
            </div>
            <span className="text-sm font-semibold text-neutral-700">{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  search: <div className="p-4"><div className="bg-neutral-100 rounded-2xl px-4 py-3 text-neutral-400 text-sm flex items-center gap-2"><span>⌕</span> Search workouts, goals...</div></div>,
  create: <div className="p-8 text-center text-neutral-400"><div className="text-4xl mb-3">＋</div><p className="text-sm">Create new workout</p></div>,
  activity: <div className="p-4 text-center text-neutral-400 pt-20"><div className="text-4xl mb-3">♡</div><p className="text-sm">Your activity feed</p></div>,
  profile: <div className="p-4 text-center pt-8"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold">A</div><p className="font-semibold text-neutral-900">Alex Johnson</p><p className="text-xs text-neutral-500 mt-1">Member since Jan 2024</p></div>,
};

export default function MobileBottomTabShell() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex justify-center">
      <div className="w-80 h-[520px] bg-white rounded-[40px] border-4 border-neutral-200 overflow-hidden relative shadow-2xl flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 py-2 bg-white flex-shrink-0">
          <span className="text-[11px] font-semibold text-neutral-900">9:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-neutral-500">●●●</span>
            <span className="text-[11px] text-neutral-500">WiFi</span>
            <span className="text-[11px] text-neutral-900 font-semibold">100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-white">
          {content[activeTab]}
        </div>

        {/* Bottom Tab Bar */}
        <div className="flex items-end justify-around pb-2 pt-3 bg-white border-t border-neutral-100 flex-shrink-0 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              {tab.special ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl shadow-lg -mt-5 mb-1">
                  {tab.icon}
                </div>
              ) : (
                <span className={\`text-xl transition-colors \${activeTab === tab.id ? "text-blue-500" : "text-neutral-400"}\`}>
                  {tab.icon}
                </span>
              )}
              {!tab.special && (
                <span className={\`text-[9px] font-medium transition-colors \${activeTab === tab.id ? "text-blue-500" : "text-neutral-400"}\`}>
                  {tab.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;justify-content:center;font-family:system-ui,sans-serif">
  <div style="width:220px;height:340px;background:white;border-radius:32px;border:3px solid #e5e5e5;overflow:hidden;position:relative;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.15)">
    <div style="display:flex;justify-content:space-between;padding:8px 16px;background:white;font-size:10px;font-weight:600">
      <span style="color:#111">9:41</span>
      <span style="color:#888">●●● 100%</span>
    </div>
    <div style="flex:1;padding:12px;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div>
          <div style="font-size:9px;color:#888">Good morning,</div>
          <div style="font-size:14px;font-weight:700;color:#111">Alex 👋</div>
        </div>
        <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700">A</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div style="background:linear-gradient(135deg,#3b82f6,#06b6d4);border-radius:14px;padding:10px;color:white">
          <div style="font-size:8px;opacity:0.8;margin-bottom:2px">Workouts</div>
          <div style="font-size:16px;font-weight:700">4</div>
          <div style="font-size:8px;opacity:0.7">this week</div>
        </div>
        <div style="background:linear-gradient(135deg,#fb923c,#ef4444);border-radius:14px;padding:10px;color:white">
          <div style="font-size:8px;opacity:0.8;margin-bottom:2px">Calories</div>
          <div style="font-size:16px;font-weight:700">2,140</div>
          <div style="font-size:8px;opacity:0.7">today</div>
        </div>
      </div>
      <div style="background:#fafafa;border-radius:14px;padding:10px">
        <div style="font-size:10px;font-weight:600;color:#111;margin-bottom:8px">Recent Activity</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="font-size:14px">🏃</span>
          <div style="flex:1"><div style="font-size:10px;font-weight:500;color:#333">Morning Run</div><div style="font-size:9px;color:#aaa">6:30 AM</div></div>
          <span style="font-size:10px;font-weight:600;color:#555">5.2 km</span>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-around;padding:10px 8px 6px;border-top:1px solid #f0f0f0;background:white">
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <span style="font-size:16px;color:#3b82f6">⌂</span>
        <span style="font-size:8px;color:#3b82f6;font-weight:500">Home</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <span style="font-size:16px;color:#aaa">⌕</span>
        <span style="font-size:8px;color:#aaa">Search</span>
      </div>
      <div style="width:36px;height:36px;background:linear-gradient(135deg,#3b82f6,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;margin-top:-12px;box-shadow:0 4px 12px rgba(59,130,246,0.4)">＋</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <span style="font-size:16px;color:#aaa">♡</span>
        <span style="font-size:8px;color:#aaa">Activity</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <span style="font-size:16px;color:#aaa">◎</span>
        <span style="font-size:8px;color:#aaa">Profile</span>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "dark-vscode-shell",
    title: "Dark VS Code Shell",
    description: "Minimal dark editor shell inspired by VS Code: collapsible sidebar with file icons, tabbed editor with active file indicator, line-numbered code area, and a blue status bar.",
    category: "App Shells",
    tags: ["app-shell", "dark", "editor", "vscode", "code", "monospace"],
    style: "",
    code: `import { useState } from "react";

const fileTree = [
  { name: "components", type: "folder", depth: 0 },
  { name: "Button.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "Card.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "Modal.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "hooks", type: "folder", depth: 0 },
  { name: "useAuth.ts", type: "file", depth: 1, ext: "ts" },
  { name: "useTheme.ts", type: "file", depth: 1, ext: "ts" },
  { name: "index.tsx", type: "file", depth: 0, ext: "tsx" },
  { name: "tailwind.config.ts", type: "file", depth: 0, ext: "ts" },
];

const extColors: Record<string, string> = {
  tsx: "#61afef",
  ts: "#c678dd",
  js: "#e5c07b",
  css: "#56b6c2",
};

const code = \`import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        {
          default: "bg-primary text-primary-fg",
          ghost: "hover:bg-accent hover:text-accent-fg",
          outline: "border border-input hover:bg-accent",
        }[variant],
        { sm: "h-8 px-3 text-xs", md: "h-9 px-4 text-sm",
          lg: "h-11 px-6 text-base" }[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}\`;

export default function DarkVscodeShell() {
  const [activeFile, setActiveFile] = useState("Button.tsx");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState(["components"]);
  const tabs = ["Button.tsx", "Card.tsx", "useAuth.ts"];

  const toggleFolder = (name: string) =>
    setOpenFolders(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);

  const isVisible = (item: typeof fileTree[0]) => {
    if (item.depth === 0) return true;
    const parentFolder = fileTree.slice(0, fileTree.indexOf(item)).reverse().find(f => f.type === "folder" && f.depth === 0);
    return parentFolder ? openFolders.includes(parentFolder.name) : true;
  };

  const lines = code.split("\\n");

  return (
    <div className="flex min-h-[460px] bg-[#282c34] text-[#abb2bf] font-mono text-xs rounded-xl overflow-hidden border border-[#3e4451]">
      {/* Sidebar toggle strip */}
      <div className="w-10 bg-[#21252b] flex flex-col items-center py-3 gap-4 border-r border-[#3e4451]">
        <button onClick={() => setSidebarOpen(o => !o)} title="Toggle Explorer" className="w-7 h-7 flex items-center justify-center text-base text-[#abb2bf] hover:text-white transition-colors rounded">
          ◈
        </button>
        {["⌕", "⎇", "◎", "⚙"].map((icon, i) => (
          <span key={i} className="text-base text-[#4b5263] hover:text-[#abb2bf] cursor-pointer transition-colors">{icon}</span>
        ))}
      </div>

      {/* File tree */}
      {sidebarOpen && (
        <div className="w-44 bg-[#21252b] border-r border-[#3e4451] flex flex-col">
          <div className="px-3 py-2 text-[9px] uppercase tracking-widest text-[#5c6370] font-sans font-semibold border-b border-[#3e4451]">Explorer</div>
          <div className="flex-1 overflow-auto py-1">
            {fileTree.filter(isVisible).map((item, i) => (
              <div
                key={i}
                onClick={() => item.type === "folder" ? toggleFolder(item.name) : setActiveFile(item.name)}
                style={{ paddingLeft: \`\${item.depth * 12 + 10}px\` }}
                className={\`flex items-center gap-1.5 py-1 pr-3 cursor-pointer transition-colors \${item.name === activeFile ? "bg-[#2c313c] text-white" : "text-[#9da5b4] hover:bg-[#2c313a] hover:text-[#d7dae0]"}\`}
              >
                {item.type === "folder" ? (
                  <>
                    <span className="text-[10px] text-[#5c6370]">{openFolders.includes(item.name) ? "▾" : "▸"}</span>
                    <span className="text-amber-400/80 text-[12px]">📁</span>
                    <span className="text-xs">{item.name}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-transparent">▸</span>
                    <span className="text-[12px]">📄</span>
                    <span className="text-xs" style={{ color: item.ext ? extColors[item.ext] || "#abb2bf" : "#abb2bf" }}>{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center bg-[#21252b] border-b border-[#3e4451] overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFile(tab)}
              className={\`flex items-center gap-2 px-4 py-2 text-[11px] whitespace-nowrap border-r border-[#3e4451] transition-colors \${activeFile === tab ? "bg-[#282c34] text-white border-t-2 border-t-[#61afef]" : "text-[#5c6370] hover:text-[#9da5b4] bg-[#21252b]"}\`}
            >
              <span style={{ color: extColors[tab.split(".").pop() || ""] || "#abb2bf" }}>●</span>
              {tab}
            </button>
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex gap-4">
            <div className="text-right text-[#4b5263] select-none min-w-[2rem]">
              {lines.map((_, i) => (
                <div key={i} className="leading-[1.6] text-[11px]">{i + 1}</div>
              ))}
            </div>
            <pre className="flex-1 leading-[1.6] text-[11px] overflow-x-auto">
              {lines.map((line, i) => {
                const colored = line
                  .replace(/(import|export|from|interface|extends|return|function|const|let|type)/g, '<kw>$1</kw>')
                  .replace(/("[^"]*")/g, '<str>$1</str>');
                return (
                  <div key={i} className="hover:bg-[#2c313c] px-1 rounded">
                    {line.includes("import") || line.includes("export") || line.includes("return") || line.includes("const") || line.includes("interface") ? (
                      <span className="text-[#c678dd]">{line.split(" ")[0]} </span>
                    ) : null}
                    <span className="text-[#abb2bf]">{line.includes(" ") ? line.slice(line.indexOf(" ") + (["import","export","return","const","interface"].some(k => line.startsWith(k)) ? 1 : 0)) : (["import","export","return","const","interface"].some(k => line.startsWith(k)) ? "" : line)}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#61afef] px-4 py-0.5 text-[10px] text-white font-sans flex-shrink-0">
          <div className="flex items-center gap-3">
            <span>⎇ main</span>
            <span>◎ 0 errors</span>
            <span>⚠ 0 warnings</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TypeScript JSX</span>
            <span>UTF-8</span>
            <span>Spaces: 2</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:#282c34;border-radius:8px;overflow:hidden;font-family:monospace;font-size:11px;border:1px solid #3e4451">
  <div style="width:36px;background:#21252b;display:flex;flex-direction:column;align-items:center;padding:10px 0;gap:14px;border-right:1px solid #3e4451">
    <div style="color:#abb2bf;font-size:14px">◈</div>
    <div style="color:#4b5263;font-size:14px">⌕</div>
    <div style="color:#4b5263;font-size:14px">⎇</div>
  </div>
  <div style="width:148px;background:#21252b;border-right:1px solid #3e4451">
    <div style="padding:6px 10px;font-size:8px;text-transform:uppercase;letter-spacing:0.1em;color:#5c6370;border-bottom:1px solid #3e4451">Explorer</div>
    <div style="padding:6px 10px;font-size:11px;color:#e5c07b;display:flex;align-items:center;gap:4px">▾ 📁 <span style="color:#9da5b4">components</span></div>
    <div style="padding:4px 10px 4px 26px;font-size:11px;background:#2c313c;color:white;display:flex;align-items:center;gap:4px">📄 <span style="color:#61afef">Button.tsx</span></div>
    <div style="padding:4px 10px 4px 26px;font-size:11px;color:#9da5b4;display:flex;align-items:center;gap:4px">📄 <span style="color:#61afef">Card.tsx</span></div>
    <div style="padding:6px 10px;font-size:11px;color:#9da5b4;display:flex;align-items:center;gap:4px">▸ 📁 <span>hooks</span></div>
    <div style="padding:4px 10px;font-size:11px;color:#9da5b4;display:flex;align-items:center;gap:4px">📄 <span style="color:#61afef">index.tsx</span></div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column">
    <div style="display:flex;background:#21252b;border-bottom:1px solid #3e4451">
      <div style="padding:6px 14px;color:white;background:#282c34;border-top:2px solid #61afef;font-size:11px;display:flex;align-items:center;gap:5px"><span style="color:#61afef">●</span> Button.tsx</div>
      <div style="padding:6px 14px;color:#5c6370;font-size:11px;display:flex;align-items:center;gap:5px"><span style="color:#4b5263">●</span> Card.tsx</div>
    </div>
    <div style="flex:1;padding:12px;display:flex;gap:14px">
      <div style="color:#4b5263;text-align:right;line-height:1.7;font-size:10px;min-width:20px;user-select:none">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8</div>
      <pre style="flex:1;color:#abb2bf;font-size:10px;line-height:1.7;margin:0;overflow:hidden"><span style="color:#c678dd">import</span> React <span style="color:#c678dd">from</span> <span style="color:#98c379">"react"</span>;
<span style="color:#c678dd">import</span> <span style="color:#abb2bf">{ cn }</span> <span style="color:#c678dd">from</span> <span style="color:#98c379">"@/lib/utils"</span>;

<span style="color:#c678dd">interface</span> <span style="color:#e5c07b">ButtonProps</span>
  <span style="color:#c678dd">extends</span> React.<span style="color:#e5c07b">ButtonHTMLAttributes</span>&lt;<span style="color:#e5c07b">HTMLButtonElement</span>&gt; &#123;
  variant?: <span style="color:#98c379">"default"</span> | <span style="color:#98c379">"ghost"</span>;
  size?: <span style="color:#98c379">"sm"</span> | <span style="color:#98c379">"md"</span> | <span style="color:#98c379">"lg"</span>;
&#125;</pre>
    </div>
    <div style="display:flex;justify-content:space-between;background:#61afef;padding:2px 12px;color:white;font-size:9px;font-family:system-ui">
      <span>⎇ main · ◎ 0 errors</span><span>TypeScript JSX · Ln 1</span>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "ecommerce-storefront-shell",
    title: "E-commerce Storefront Shell",
    description: "Full storefront layout with a sticky top nav (logo, search, cart), left sidebar with category and filter controls, and a responsive product grid with price and quick-add actions.",
    category: "App Shells",
    tags: ["app-shell", "ecommerce", "storefront", "shop", "product-grid"],
    style: "",
    code: `import { useState } from "react";

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Shoes"];
const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#111", "#e5e5e5", "#3b82f6", "#f43f5e", "#10b981", "#f59e0b"];

const products = [
  { id: 1, name: "Essential Crew Tee", price: 42, badge: "New", rating: 4.8, reviews: 124, color: "#6b7280" },
  { id: 2, name: "Relaxed Chino Pant", price: 88, badge: "Sale", original: 120, rating: 4.6, reviews: 89, color: "#d4a373" },
  { id: 3, name: "Merino Wool Sweater", price: 145, badge: "", rating: 4.9, reviews: 203, color: "#93c5fd" },
  { id: 4, name: "Cotton Oxford Shirt", price: 76, badge: "", rating: 4.7, reviews: 67, color: "#fde68a" },
  { id: 5, name: "Slim Cargo Shorts", price: 65, badge: "Low stock", rating: 4.5, reviews: 41, color: "#6ee7b7" },
  { id: 6, name: "Lightweight Windbreaker", price: 198, badge: "New", rating: 4.8, reviews: 32, color: "#c4b5fd" },
];

export default function EcommerceStorefrontShell() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const filtered = products.filter(p =>
    (activeCategory === "All" || p.name.toLowerCase().includes(activeCategory.toLowerCase())) &&
    (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-[500px] bg-white font-sans flex flex-col border border-neutral-200 rounded-xl overflow-hidden">
      {/* Top Nav */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 h-14 gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-neutral-900 rounded-lg" />
            <span className="font-black text-neutral-900 text-base tracking-tight">STITCH</span>
          </div>
          <div className="flex-1 max-w-md relative">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 rounded-full border-none outline-none placeholder:text-neutral-400"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">⌕</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors text-lg">♡</button>
            <button
              onClick={() => {}}
              className="relative text-neutral-900 text-lg"
            >
              ⊕
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Sign in</button>
          </div>
        </div>

        {/* Category bar */}
        <div className="flex items-center gap-1 px-6 pb-3 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={\`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors \${activeCategory === cat ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="w-48 border-r border-neutral-100 p-5 flex-shrink-0">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">Filters</h3>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Price range</div>
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="300" defaultValue="150" className="w-full accent-neutral-900" />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>$0</span><span>$300</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Size</div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={\`w-8 h-8 text-xs font-medium rounded-md border transition-colors \${selectedSizes.includes(s) ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"}\`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  style={{ backgroundColor: c }}
                  className="w-5 h-5 rounded-full border border-neutral-200 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          <button className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors underline">
            Clear all filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-500">{filtered.length} products</span>
            <select className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-600 outline-none bg-white">
              <option>Sort: Featured</option>
              <option>Price: Low to high</option>
              <option>Price: High to low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-neutral-100 rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ backgroundColor: p.color }} className="w-16 h-16 rounded-full opacity-60" />
                  </div>
                  {p.badge && (
                    <div className={\`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold \${p.badge === "Sale" ? "bg-red-500 text-white" : p.badge === "Low stock" ? "bg-amber-500 text-white" : "bg-neutral-900 text-white"}\`}>
                      {p.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }}
                    className="absolute bottom-2 left-2 right-2 py-2 bg-white text-neutral-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"
                  >
                    Quick add
                  </button>
                </div>
                <p className="text-xs font-medium text-neutral-800 leading-tight">{p.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-bold text-neutral-900">\${p.price}</span>
                  {p.original && <span className="text-xs text-neutral-400 line-through">\${p.original}</span>}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-yellow-400 text-[10px]">★</span>
                  <span className="text-[10px] text-neutral-500">{p.rating} ({p.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif;background:white;min-height:240px">
  <div style="border-bottom:1px solid #e5e5e5;padding:0 20px;height:48px;display:flex;align-items:center;justify-content:space-between;gap:12px">
    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
      <div style="width:22px;height:22px;background:#111;border-radius:5px"></div>
      <span style="font-weight:900;font-size:13px;letter-spacing:-0.02em;color:#111">STITCH</span>
    </div>
    <div style="flex:1;max-width:200px;position:relative">
      <div style="background:#f5f5f5;border-radius:20px;padding:6px 12px 6px 28px;font-size:11px;color:#aaa">Search products...</div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#555;flex-shrink:0">
      <span>♡</span><span>⊕</span><span style="font-size:11px;font-weight:500">Sign in</span>
    </div>
  </div>
  <div style="display:flex;gap:8px;padding:8px 20px 10px;border-bottom:1px solid #f0f0f0;overflow:hidden">
    <div style="padding:4px 12px;background:#111;color:white;border-radius:20px;font-size:10px;font-weight:500">All</div>
    <div style="padding:4px 12px;color:#888;font-size:10px">Tops</div>
    <div style="padding:4px 12px;color:#888;font-size:10px">Bottoms</div>
    <div style="padding:4px 12px;color:#888;font-size:10px">Outerwear</div>
  </div>
  <div style="display:flex;min-height:170px">
    <div style="width:140px;border-right:1px solid #f0f0f0;padding:14px;flex-shrink:0">
      <div style="font-size:9px;font-weight:700;color:#111;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px">Filters</div>
      <div style="font-size:10px;font-weight:600;color:#444;margin-bottom:6px">Size</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">
        <div style="width:24px;height:24px;border:1px solid #e5e5e5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#555">XS</div>
        <div style="width:24px;height:24px;border:1px solid #e5e5e5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#555">S</div>
        <div style="width:24px;height:24px;background:#111;color:white;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px">M</div>
        <div style="width:24px;height:24px;border:1px solid #e5e5e5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#555">L</div>
      </div>
      <div style="font-size:10px;font-weight:600;color:#444;margin-bottom:6px">Color</div>
      <div style="display:flex;gap:4px">
        <div style="width:16px;height:16px;background:#111;border-radius:50%"></div>
        <div style="width:16px;height:16px;background:#e5e5e5;border-radius:50%;border:1px solid #ccc"></div>
        <div style="width:16px;height:16px;background:#3b82f6;border-radius:50%"></div>
        <div style="width:16px;height:16px;background:#f43f5e;border-radius:50%"></div>
      </div>
    </div>
    <div style="flex:1;padding:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="font-size:10px;color:#888">6 products</span>
        <div style="border:1px solid #e5e5e5;border-radius:6px;padding:4px 8px;font-size:10px;color:#555">Sort: Featured</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div>
          <div style="aspect-ratio:3/4;background:#f5f5f5;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;position:relative">
            <div style="width:40px;height:40px;background:#9ca3af;border-radius:50%;opacity:0.6"></div>
            <div style="position:absolute;top:6px;left:6px;background:#111;color:white;font-size:7px;font-weight:700;padding:2px 5px;border-radius:10px">New</div>
          </div>
          <div style="font-size:10px;font-weight:500;color:#222">Essential Crew Tee</div>
          <div style="font-size:10px;font-weight:700;color:#111;margin-top:2px">$42</div>
        </div>
        <div>
          <div style="aspect-ratio:3/4;background:#f5f5f5;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;position:relative">
            <div style="width:40px;height:40px;background:#d4a373;border-radius:50%;opacity:0.6"></div>
            <div style="position:absolute;top:6px;left:6px;background:#ef4444;color:white;font-size:7px;font-weight:700;padding:2px 5px;border-radius:10px">Sale</div>
          </div>
          <div style="font-size:10px;font-weight:500;color:#222">Relaxed Chino Pant</div>
          <div style="font-size:10px;font-weight:700;color:#111;margin-top:2px">$88 <span style="font-weight:400;color:#aaa;text-decoration:line-through">$120</span></div>
        </div>
        <div>
          <div style="aspect-ratio:3/4;background:#f5f5f5;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:4px">
            <div style="width:40px;height:40px;background:#93c5fd;border-radius:50%;opacity:0.6"></div>
          </div>
          <div style="font-size:10px;font-weight:500;color:#222">Merino Wool Sweater</div>
          <div style="font-size:10px;font-weight:700;color:#111;margin-top:2px">$145</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "analytics-dashboard-shell",
    title: "Analytics Dashboard Shell",
    description: "Full analytics layout with compact top nav, four KPI metric cards with trend indicators, a full-width sparkline chart area, and a recent events data table below.",
    category: "App Shells",
    tags: ["app-shell", "analytics", "dashboard", "metrics", "kpi", "charts"],
    style: "",
    code: `import { useState } from "react";

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
              <button key={tab} className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${i === 0 ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-800"}\`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-0.5">
            {["7d", "30d", "90d", "12m"].map(r => (
              <button key={r} onClick={() => setRange(r)} className={\`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors \${range === r ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}\`}>
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
                <span className={\`text-xs font-semibold \${kpi.up ? "text-emerald-500" : "text-red-500"}\`}>
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
                  style={{ height: \`\${(val / maxSparkline) * 100}%\` }}
                  className={\`w-full rounded-sm transition-all \${i === sparklines.length - 1 ? "bg-violet-500" : "bg-violet-200 hover:bg-violet-300"}\`}
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
                    <span className={\`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full \${row.status === "healthy" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}\`}>
                      <span className={\`w-1 h-1 rounded-full \${row.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"}\`} />
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
}`,
    htmlPreview: `<div style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif;min-height:240px">
  <div style="background:white;border-bottom:1px solid #e5e5e5;padding:0 20px;height:44px;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:8px">
      <div style="width:22px;height:22px;background:#7c3aed;border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:9px">A</div>
      <span style="font-size:12px;font-weight:600;color:#111">Analytics</span>
      <div style="display:flex;gap:2px;margin-left:10px">
        <div style="padding:3px 8px;background:#f5f5f5;border-radius:6px;font-size:10px;color:#111;font-weight:500">Overview</div>
        <div style="padding:3px 8px;font-size:10px;color:#888">Acquisition</div>
        <div style="padding:3px 8px;font-size:10px;color:#888">Behavior</div>
      </div>
    </div>
    <div style="display:flex;gap:6px">
      <div style="display:flex;background:#f5f5f5;border-radius:8px;padding:2px;gap:1px">
        <div style="padding:3px 8px;font-size:9px;color:#888">7d</div>
        <div style="padding:3px 8px;background:white;border-radius:6px;font-size:9px;color:#111;font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,0.1)">30d</div>
        <div style="padding:3px 8px;font-size:9px;color:#888">90d</div>
      </div>
      <div style="background:#111;color:white;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:500">Export</div>
    </div>
  </div>
  <div style="padding:14px;display:flex;flex-direction:column;gap:12px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;margin-bottom:4px">Total Revenue</div>
        <div style="font-size:18px;font-weight:700;color:#111;margin-bottom:3px">$48,291</div>
        <div style="font-size:9px;color:#10b981;font-weight:600">↑ +12.5%</div>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;margin-bottom:4px">Active Users</div>
        <div style="font-size:18px;font-weight:700;color:#111;margin-bottom:3px">9,842</div>
        <div style="font-size:9px;color:#10b981;font-weight:600">↑ +8.1%</div>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;margin-bottom:4px">Conversion Rate</div>
        <div style="font-size:18px;font-weight:700;color:#111;margin-bottom:3px">3.24%</div>
        <div style="font-size:9px;color:#ef4444;font-weight:600">↓ -0.3%</div>
      </div>
      <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;margin-bottom:4px">Avg. Session</div>
        <div style="font-size:18px;font-weight:700;color:#111;margin-bottom:3px">4m 12s</div>
        <div style="font-size:9px;color:#10b981;font-weight:600">↑ +18s</div>
      </div>
    </div>
    <div style="background:white;border:1px solid #e5e5e5;border-radius:8px;padding:14px">
      <div style="font-size:11px;font-weight:600;color:#111;margin-bottom:10px">Revenue over time</div>
      <div style="display:flex;align-items:flex-end;gap:2px;height:60px">
        <div style="flex:1;background:#ddd6fe;border-radius:2px;height:55%"></div>
        <div style="flex:1;background:#ddd6fe;border-radius:2px;height:63%"></div>
        <div style="flex:1;background:#ddd6fe;border-radius:2px;height:59%"></div>
        <div style="flex:1;background:#ddd6fe;border-radius:2px;height:70%"></div>
        <div style="flex:1;background:#ddd6fe;border-radius:2px;height:65%"></div>
        <div style="flex:1;background:#c4b5fd;border-radius:2px;height:78%"></div>
        <div style="flex:1;background:#c4b5fd;border-radius:2px;height:74%"></div>
        <div style="flex:1;background:#a78bfa;border-radius:2px;height:83%"></div>
        <div style="flex:1;background:#a78bfa;border-radius:2px;height:76%"></div>
        <div style="flex:1;background:#8b5cf6;border-radius:2px;height:89%"></div>
        <div style="flex:1;background:#8b5cf6;border-radius:2px;height:85%"></div>
        <div style="flex:1;background:#7c3aed;border-radius:2px;height:100%"></div>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "master-detail-shell",
    title: "Master / Detail Shell",
    description: "Two-panel email client-style layout: scrollable item list on the left with avatars, timestamps, and previews; full detail view on the right with header, body, and action buttons.",
    category: "App Shells",
    tags: ["app-shell", "master-detail", "email", "list", "two-panel"],
    style: "",
    code: `import { useState } from "react";

const items = [
  { id: 1, from: "Sarah Kim", avatar: "SK", color: "from-violet-400 to-purple-500", subject: "Design review feedback", preview: "Hey, I went through the latest mockups and have some thoughts on the navigation pattern you chose...", time: "10:24 AM", unread: true, tag: "Design" },
  { id: 2, from: "Marcus Chen", avatar: "MC", color: "from-blue-400 to-cyan-500", subject: "PR ready for review — auth refactor", preview: "I've finished the session handling changes. The main thing to look at is the middleware order in server/auth.ts...", time: "9:41 AM", unread: true, tag: "Dev" },
  { id: 3, from: "Design Team", avatar: "DT", color: "from-pink-400 to-rose-500", subject: "Component library v2.0 launch", preview: "We're planning to release the new component library next Tuesday. Please review the changelog before...", time: "Yesterday", unread: false, tag: "Team" },
  { id: 4, from: "Priya Patel", avatar: "PP", color: "from-amber-400 to-orange-500", subject: "Q4 budget approval needed", preview: "Hi, I need your sign-off on the Q4 marketing budget before EOD Friday. The breakdown is attached...", time: "Yesterday", unread: false, tag: "Finance" },
  { id: 5, from: "Engineering", avatar: "EN", color: "from-emerald-400 to-teal-500", subject: "Incident post-mortem: API slowdown", preview: "On Nov 12 we experienced elevated response times on the /api/exhibits endpoint. Root cause was...", time: "Mon", unread: false, tag: "Infra" },
  { id: 6, from: "Alex Johnson", avatar: "AJ", color: "from-blue-400 to-violet-500", subject: "New onboarding flow spec", preview: "Attached is the full spec for the new creator onboarding wizard. Steps 1–3 are finalized...", time: "Mon", unread: false, tag: "Product" },
];

export default function MasterDetailShell() {
  const [selected, setSelected] = useState(items[0]);
  const [starred, setStarred] = useState<number[]>([]);

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-[480px] bg-white border border-neutral-200 rounded-xl overflow-hidden font-sans">
      {/* List Panel */}
      <div className="w-72 flex flex-col border-r border-neutral-200 flex-shrink-0">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <span className="font-semibold text-sm text-neutral-900">Inbox</span>
          <div className="flex items-center gap-2 text-neutral-400">
            <button className="hover:text-neutral-700 transition-colors text-sm">⊕</button>
            <button className="hover:text-neutral-700 transition-colors text-sm">⋯</button>
          </div>
        </div>
        <div className="px-3 py-2 border-b border-neutral-100">
          <input placeholder="Search..." className="w-full px-3 py-1.5 text-xs bg-neutral-100 rounded-lg outline-none placeholder:text-neutral-400" />
        </div>
        <div className="flex-1 overflow-auto">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={\`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-neutral-50 transition-colors \${selected.id === item.id ? "bg-blue-50" : "hover:bg-neutral-50"}\`}
            >
              <div className={\`w-8 h-8 rounded-full bg-gradient-to-br \${item.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5\`}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={\`text-xs font-semibold truncate \${item.unread ? "text-neutral-900" : "text-neutral-600"}\`}>{item.from}</span>
                  <span className="text-[10px] text-neutral-400 flex-shrink-0 ml-1">{item.time}</span>
                </div>
                <div className={\`text-xs truncate mb-0.5 \${item.unread ? "text-neutral-800 font-medium" : "text-neutral-600"}\`}>{item.subject}</div>
                <div className="text-[11px] text-neutral-400 truncate">{item.preview}</div>
              </div>
              {item.unread && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Detail Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">{selected.subject}</h2>
            <div className="flex items-center gap-3">
              <div className={\`w-6 h-6 rounded-full bg-gradient-to-br \${selected.color} flex items-center justify-center text-white text-[9px] font-bold\`}>
                {selected.avatar}
              </div>
              <div className="text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">{selected.from}</span>
                <span className="text-neutral-400 ml-2">to me</span>
              </div>
              <span className="text-[11px] text-neutral-400">{selected.time}</span>
              <span className={\`text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500\`}>{selected.tag}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => toggleStar(selected.id, e)}
              className={\`text-lg transition-colors \${starred.includes(selected.id) ? "text-amber-400" : "text-neutral-300 hover:text-amber-300"}\`}
            >
              ★
            </button>
            <button className="text-neutral-400 hover:text-neutral-700 transition-colors">↩</button>
            <button className="text-neutral-400 hover:text-neutral-700 transition-colors">⋯</button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto px-6 py-5">
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            Hi there,
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            {selected.preview} the feedback is generally positive but I wanted to flag a few things that need attention before we ship.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            The main concerns are around the information hierarchy on mobile — specifically the way the navigation collapses. I've dropped some annotated screenshots in the Figma file under the "Feedback" page.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-6">
            Can we sync tomorrow to go through them? Happy to do a quick Loom walkthrough if you prefer async.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            — {selected.from}
          </p>
        </div>

        {/* Reply Bar */}
        <div className="border-t border-neutral-200 p-4">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-xs text-neutral-400 mb-2">Reply to {selected.from}...</div>
            <div className="h-14" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <button className="hover:text-neutral-700 transition-colors">📎</button>
                <button className="hover:text-neutral-700 transition-colors">😊</button>
              </div>
              <button className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-700 transition-colors">
                Send reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:flex;min-height:260px;background:white;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-family:system-ui,sans-serif">
  <div style="width:220px;border-right:1px solid #e5e5e5;display:flex;flex-direction:column;flex-shrink:0">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #f0f0f0">
      <span style="font-size:12px;font-weight:600;color:#111">Inbox</span>
      <span style="font-size:14px;color:#ccc">⊕</span>
    </div>
    <div style="padding:8px 10px;border-bottom:1px solid #f0f0f0">
      <div style="background:#f5f5f5;border-radius:8px;padding:5px 10px;font-size:10px;color:#aaa">Search...</div>
    </div>
    <div style="flex:1;overflow:hidden">
      <div style="display:flex;align-items:flex-start;gap:8px;padding:10px 12px;background:#eff6ff;border-bottom:1px solid #f0f0f0">
        <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:8px;font-weight:700;flex-shrink:0">SK</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:10px;font-weight:700;color:#111;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Sarah Kim</span>
            <span style="font-size:9px;color:#aaa;flex-shrink:0">10:24 AM</span>
          </div>
          <div style="font-size:10px;font-weight:600;color:#222;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:1px">Design review feedback</div>
          <div style="font-size:9px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Hey, I went through the latest mockups...</div>
        </div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:8px;padding:10px 12px;border-bottom:1px solid #f0f0f0">
        <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-size:8px;font-weight:700;flex-shrink:0">MC</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:10px;font-weight:700;color:#111">Marcus Chen</span>
            <span style="font-size:9px;color:#aaa">9:41 AM</span>
          </div>
          <div style="font-size:10px;font-weight:600;color:#222;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">PR ready for review</div>
          <div style="font-size:9px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">I've finished the session handling...</div>
        </div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:8px;padding:10px 12px">
        <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#f43f5e);display:flex;align-items:center;justify-content:center;color:white;font-size:8px;font-weight:700;flex-shrink:0">DT</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:10px;font-weight:500;color:#555">Design Team</span>
            <span style="font-size:9px;color:#aaa">Yesterday</span>
          </div>
          <div style="font-size:10px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Component library v2.0 launch</div>
        </div>
      </div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;min-width:0">
    <div style="padding:16px 20px;border-bottom:1px solid #e5e5e5">
      <div style="font-size:16px;font-weight:700;color:#111;margin-bottom:8px">Design review feedback</div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:7px;font-weight:700">SK</div>
        <span style="font-size:11px;font-weight:600;color:#333">Sarah Kim</span>
        <span style="font-size:10px;color:#aaa">to me · 10:24 AM</span>
        <span style="font-size:9px;background:#f5f5f5;color:#888;padding:2px 6px;border-radius:10px">Design</span>
      </div>
    </div>
    <div style="flex:1;padding:16px 20px;font-size:12px;color:#444;line-height:1.7">
      <p style="margin-bottom:10px">Hi there,</p>
      <p style="margin-bottom:10px">I went through the latest mockups and have some thoughts on the navigation pattern. The feedback is generally positive but I wanted to flag a few things before we ship.</p>
      <p>Can we sync tomorrow to go through them?</p>
    </div>
    <div style="padding:12px 16px;border-top:1px solid #e5e5e5">
      <div style="border:1px solid #e5e5e5;border-radius:8px;background:#fafafa;padding:10px">
        <div style="font-size:10px;color:#ccc;margin-bottom:24px">Reply to Sarah Kim...</div>
        <div style="display:flex;justify-content:flex-end">
          <div style="background:#111;color:white;padding:5px 14px;border-radius:8px;font-size:10px;font-weight:500">Send reply</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  // ── Foundations ──────────────────────────────────────────────────────────────
  {
    slug: "design-token-reference",
    title: "Design Token Reference",
    description: "Visual showcase of every design token in the system: color palette (neutral, semantic, interactive), typography scale (all sizes and weights), spacing ramp, border-radius steps, and elevation levels. Use as a quick-look reference when building any component.",
    category: "Foundations",
    tags: ["foundations", "tokens", "colors", "typography", "spacing", "reference", "design-system"],
    style: "",
    code: `export default function DesignTokenReference() {
  const neutrals = [
    { name: "950", hex: "#0a0a0a" }, { name: "900", hex: "#171717" },
    { name: "800", hex: "#262626" }, { name: "700", hex: "#404040" },
    { name: "600", hex: "#525252" }, { name: "500", hex: "#737373" },
    { name: "400", hex: "#a3a3a3" }, { name: "300", hex: "#d4d4d4" },
    { name: "200", hex: "#e5e5e5" }, { name: "100", hex: "#f5f5f5" },
    { name: "50",  hex: "#fafafa" },
  ];
  const semantics = [
    { name: "Success", bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
    { name: "Warning", bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
    { name: "Error",   bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
    { name: "Info",    bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    { name: "Neutral", bg: "#f5f5f5", text: "#525252", border: "#e5e5e5" },
  ];
  const typeScale = [
    { name: "xs",  px: 11, weight: 500, sample: "Table header / badge" },
    { name: "sm",  px: 13, weight: 400, sample: "Body text / nav links" },
    { name: "base",px: 14, weight: 400, sample: "Primary body / inputs" },
    { name: "lg",  px: 18, weight: 600, sample: "Card title / dialog heading" },
    { name: "xl",  px: 20, weight: 700, sample: "Section heading / KPI value" },
    { name: "2xl", px: 24, weight: 700, sample: "Page H2 / large KPI" },
    { name: "3xl", px: 30, weight: 700, sample: "Page title H1" },
  ];
  const radii = [
    { name: "rounded",    px: 4  },
    { name: "rounded-md", px: 6  },
    { name: "rounded-lg", px: 8  },
    { name: "rounded-xl", px: 12 },
    { name: "rounded-2xl",px: 16 },
    { name: "rounded-full",px: 99 },
  ];
  const shadows = [
    { name: "none",      css: "none" },
    { name: "shadow-sm", css: "0 1px 3px rgba(0,0,0,0.08)" },
    { name: "shadow-md", css: "0 4px 12px rgba(0,0,0,0.10)" },
    { name: "shadow-lg", css: "0 10px 30px rgba(0,0,0,0.12)" },
    { name: "shadow-2xl",css: "0 20px 60px rgba(0,0,0,0.18)" },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-10 font-sans text-neutral-900">
      {/* Neutral palette */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Neutral Palette</h2>
        <div className="flex gap-2 flex-wrap">
          {neutrals.map(c => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg border border-neutral-200" style={{ background: c.hex }} />
              <span className="text-[10px] text-neutral-500 font-mono">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic colors */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Semantic States</h2>
        <div className="flex gap-3 flex-wrap">
          {semantics.map(s => (
            <div key={s.name} className="px-4 py-2.5 rounded-lg border text-sm font-medium"
              style={{ background: s.bg, color: s.text, borderColor: s.border }}>
              {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Type Scale</h2>
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {typeScale.map((t, i) => (
            <div key={t.name} className={\`flex items-center gap-4 px-5 py-3 \${i < typeScale.length - 1 ? "border-b border-neutral-100" : ""}\`}>
              <span className="text-xs text-neutral-400 font-mono w-10">{t.name}</span>
              <span className="text-xs text-neutral-300 font-mono w-10">{t.px}px</span>
              <span style={{ fontSize: t.px, fontWeight: t.weight }} className="text-neutral-900 flex-1">{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Border Radius</h2>
        <div className="flex gap-4 flex-wrap items-end">
          {radii.map(r => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-neutral-200 border border-neutral-300"
                style={{ borderRadius: r.px >= 99 ? "9999px" : r.px }} />
              <span className="text-[10px] text-neutral-500 font-mono whitespace-nowrap">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Elevation</h2>
        <div className="flex gap-4 flex-wrap">
          {shadows.map(s => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-white border border-neutral-100"
                style={{ boxShadow: s.css }} />
              <span className="text-[10px] text-neutral-500 font-mono">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Spacing Scale (4px grid)</h2>
        <div className="flex gap-2 flex-wrap items-end">
          {[1,2,3,4,5,6,8,10,12].map(s => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div className="bg-blue-200 rounded" style={{ width: s * 4, height: s * 4 }} />
              <span className="text-[10px] text-neutral-500 font-mono">{s * 4}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:32px;background:#fafafa;min-height:600px;font-family:system-ui,-apple-system,sans-serif;color:#171717">

  <section style="margin-bottom:40px">
    <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:12px">Neutral Palette</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${["#0a0a0a","#171717","#262626","#404040","#525252","#737373","#a3a3a3","#d4d4d4","#e5e5e5","#f5f5f5","#fafafa"].map((hex,i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:40px;height:40px;border-radius:8px;border:1px solid #e5e5e5;background:${hex}"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">${["950","900","800","700","600","500","400","300","200","100","50"][i]}</span></div>`).join("")}
    </div>
  </section>

  <section style="margin-bottom:40px">
    <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:12px">Semantic States</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="padding:8px 16px;border-radius:8px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-size:13px;font-weight:500">Success</div>
      <div style="padding:8px 16px;border-radius:8px;border:1px solid #fde68a;background:#fffbeb;color:#b45309;font-size:13px;font-weight:500">Warning</div>
      <div style="padding:8px 16px;border-radius:8px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c;font-size:13px;font-weight:500">Error</div>
      <div style="padding:8px 16px;border-radius:8px;border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8;font-size:13px;font-weight:500">Info</div>
      <div style="padding:8px 16px;border-radius:8px;border:1px solid #e5e5e5;background:#f5f5f5;color:#525252;font-size:13px;font-weight:500">Neutral</div>
    </div>
  </section>

  <section style="margin-bottom:40px">
    <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:12px">Type Scale</div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px;border-bottom:1px solid #f5f5f5"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">xs</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">11px</span><span style="font-size:11px;font-weight:500;color:#171717">Table header / badge</span></div>
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px;border-bottom:1px solid #f5f5f5"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">sm</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">13px</span><span style="font-size:13px;font-weight:400;color:#171717">Body text / nav links</span></div>
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px;border-bottom:1px solid #f5f5f5"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">base</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">14px</span><span style="font-size:14px;font-weight:400;color:#171717">Primary body / inputs</span></div>
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px;border-bottom:1px solid #f5f5f5"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">lg</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">18px</span><span style="font-size:18px;font-weight:600;color:#171717">Card title / dialog heading</span></div>
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px;border-bottom:1px solid #f5f5f5"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">2xl</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">24px</span><span style="font-size:24px;font-weight:700;color:#171717">Page H2 / large KPI</span></div>
      <div style="display:flex;align-items:center;gap:16px;padding:10px 20px"><span style="font-size:10px;color:#a3a3a3;font-family:monospace;width:40px">3xl</span><span style="font-size:10px;color:#d4d4d4;font-family:monospace;width:40px">30px</span><span style="font-size:30px;font-weight:700;color:#171717">Page title H1</span></div>
    </div>
  </section>

  <section style="margin-bottom:40px">
    <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:12px">Elevation</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:64px;height:64px;border-radius:12px;background:white;border:1px solid #e5e5e5;box-shadow:none"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">none</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:64px;height:64px;border-radius:12px;background:white;box-shadow:0 1px 3px rgba(0,0,0,0.08)"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">sm</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:64px;height:64px;border-radius:12px;background:white;box-shadow:0 4px 12px rgba(0,0,0,0.10)"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">md</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:64px;height:64px;border-radius:12px;background:white;box-shadow:0 10px 30px rgba(0,0,0,0.12)"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">lg</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:64px;height:64px;border-radius:12px;background:white;box-shadow:0 20px 60px rgba(0,0,0,0.18)"></div><span style="font-size:10px;color:#a3a3a3;font-family:monospace">2xl</span></div>
    </div>
  </section>

</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "full-reference-dashboard",
    title: "Full Reference Dashboard",
    description: "The canonical polished admin dashboard — the visual target for any AI-generated UI. Complete layout with sidebar nav, KPI metric cards with sparklines, a data table with status badges, a chart area, and breadcrumb header. Every element follows the design foundations: correct typography, color, spacing, and component sizing.",
    category: "Foundations",
    tags: ["foundations", "reference", "dashboard", "admin", "target", "polished", "canonical"],
    style: "",
    code: `export default function FullReferenceDashboard() {
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
            <div key={item.label} className={\`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer \${
              item.active ? "bg-neutral-900 text-white font-medium" : "text-neutral-600 hover:bg-neutral-50"
            }\`}>
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
                <div className={\`text-xs font-semibold mb-3 \${k.up ? "text-emerald-600" : "text-rose-500"}\`}>{k.change}</div>
                <div className="flex items-end gap-0.5 h-8">
                  {k.bars.map((h, i) => (
                    <div key={i} className={\`flex-1 rounded-sm \${k.up ? "bg-emerald-200" : "bg-rose-200"}\`} style={{ height: \`\${h}%\` }} />
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
                  <button key={r} className={\`px-3 py-1.5 text-xs rounded-md font-medium \${
                    i === 3 ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-50"
                  }\`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-2 h-28">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm bg-neutral-900 opacity-80 transition-all"
                    style={{ height: \`\${(h / maxBar) * 100}%\` }} />
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
                      <span className={\`px-2.5 py-0.5 rounded-full text-xs font-medium \${statusStyles[row.status]}\`}>{row.status}</span>
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
}`,
    htmlPreview: `<div style="display:flex;min-height:600px;background:#fafafa;font-family:system-ui,-apple-system,sans-serif;color:#171717;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden">
  <aside style="width:208px;background:white;border-right:1px solid #e5e5e5;display:flex;flex-direction:column;flex-shrink:0">
    <div style="padding:16px 20px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;gap:8px">
      <div style="width:28px;height:28px;border-radius:8px;background:#171717;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:11px">A</div>
      <span style="font-weight:600;font-size:14px">Acme Studio</span>
    </div>
    <nav style="flex:1;padding:12px;display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;background:#171717;color:white;font-size:13px;font-weight:500;cursor:pointer"><span>◆</span>Dashboard</div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;color:#525252;font-size:13px;cursor:pointer"><span>◎</span>Analytics</div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;color:#525252;font-size:13px;cursor:pointer"><span>▤</span>Users</div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;color:#525252;font-size:13px;cursor:pointer"><span>◈</span>Revenue</div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;color:#525252;font-size:13px;cursor:pointer"><span>▣</span>Settings</div>
    </nav>
    <div style="padding:16px;border-top:1px solid #f5f5f5;display:flex;align-items:center;gap:10px">
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700">JD</div>
      <div><div style="font-size:12px;font-weight:500">Jane Doe</div><div style="font-size:11px;color:#a3a3a3">Admin</div></div>
    </div>
  </aside>
  <main style="flex:1;display:flex;flex-direction:column;overflow:hidden">
    <header style="background:white;border-bottom:1px solid #e5e5e5;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
      <div>
        <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#a3a3a3;margin-bottom:4px"><span>Home</span><span>›</span><span style="color:#404040;font-weight:500">Dashboard</span></div>
        <div style="display:flex;align-items:center;gap:10px">
          <h1 style="font-size:20px;font-weight:700;margin:0">Dashboard</h1>
          <span style="display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0"><span style="width:5px;height:5px;border-radius:50%;background:#10b981"></span>Live</span>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button style="height:36px;padding:0 16px;font-size:13px;font-weight:500;color:#404040;background:white;border:1px solid #e5e5e5;border-radius:8px;cursor:pointer;font-family:inherit">Export</button>
        <button style="height:36px;padding:0 16px;font-size:13px;font-weight:500;color:white;background:#171717;border:none;border-radius:8px;cursor:pointer;font-family:inherit">New Report</button>
      </div>
    </header>
    <div style="flex:1;padding:32px;overflow:auto">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px">
        <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)"><div style="font-size:11px;color:#737373;font-weight:500;margin-bottom:4px">Total Revenue</div><div style="font-size:22px;font-weight:700;margin-bottom:4px">$48,291</div><div style="font-size:11px;font-weight:600;color:#059669;margin-bottom:10px">+12.5%</div><div style="display:flex;align-items:flex-end;gap:2px;height:28px"><div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:35%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:70%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:65%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:80%"></div></div></div>
        <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)"><div style="font-size:11px;color:#737373;font-weight:500;margin-bottom:4px">Active Users</div><div style="font-size:22px;font-weight:700;margin-bottom:4px">9,842</div><div style="font-size:11px;font-weight:600;color:#059669;margin-bottom:10px">+8.1%</div><div style="display:flex;align-items:flex-end;gap:2px;height:28px"><div style="flex:1;border-radius:2px;background:#a7f3d0;height:30%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:50%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:70%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:75%"></div></div></div>
        <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)"><div style="font-size:11px;color:#737373;font-weight:500;margin-bottom:4px">Conversion</div><div style="font-size:22px;font-weight:700;margin-bottom:4px">3.24%</div><div style="font-size:11px;font-weight:600;color:#e11d48;margin-bottom:10px">-0.3%</div><div style="display:flex;align-items:flex-end;gap:2px;height:28px"><div style="flex:1;border-radius:2px;background:#fecdd3;height:70%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:60%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:65%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:50%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:55%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:40%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:45%"></div><div style="flex:1;border-radius:2px;background:#fecdd3;height:35%"></div></div></div>
        <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)"><div style="font-size:11px;color:#737373;font-weight:500;margin-bottom:4px">Avg Session</div><div style="font-size:22px;font-weight:700;margin-bottom:4px">4m 12s</div><div style="font-size:11px;font-weight:600;color:#059669;margin-bottom:10px">+18s</div><div style="display:flex;align-items:flex-end;gap:2px;height:28px"><div style="flex:1;border-radius:2px;background:#a7f3d0;height:35%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:40%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:50%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:45%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:55%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:60%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:58%"></div><div style="flex:1;border-radius:2px;background:#a7f3d0;height:65%"></div></div></div>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:24px">
        <div style="font-size:14px;font-weight:600;margin-bottom:4px">Revenue Overview</div>
        <div style="font-size:11px;color:#a3a3a3;margin-bottom:20px">Last 12 months</div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:80px;margin-bottom:8px">
          ${[65,80,55,90,70,95,85,100,78,88,72,110].map(h => `<div style="flex:1;border-radius:3px 3px 0 0;background:#171717;opacity:0.8;height:${Math.round(h/110*100)}%"></div>`).join("")}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#a3a3a3;font-family:monospace">
          ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => `<span>${m}</span>`).join("")}
        </div>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden">
        <div style="padding:16px 24px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:13px;font-weight:600">Recent Customers</div>
          <div style="font-size:12px;color:#2563eb;font-weight:500;cursor:pointer">View all</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="border-bottom:1px solid #f5f5f5;background:#fafafa">
            <th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Customer</th>
            <th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Plan</th>
            <th style="text-align:right;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Revenue</th>
            <th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Status</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:12px 24px"><div style="font-weight:500;color:#171717">Sarah Chen</div><div style="font-size:11px;color:#a3a3a3">sarah@acme.co</div></td><td style="padding:12px 24px;color:#525252">Pro</td><td style="padding:12px 24px;text-align:right;font-family:monospace;font-weight:500">$1,240</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:12px 24px"><div style="font-weight:500;color:#171717">Marcus Rivera</div><div style="font-size:11px;color:#a3a3a3">m.rivera@acme.co</div></td><td style="padding:12px 24px;color:#525252">Team</td><td style="padding:12px 24px;text-align:right;font-family:monospace;font-weight:500">$3,800</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:12px 24px"><div style="font-weight:500;color:#171717">Emily Park</div><div style="font-size:11px;color:#a3a3a3">e.park@acme.co</div></td><td style="padding:12px 24px;color:#525252">Starter</td><td style="padding:12px 24px;text-align:right;font-family:monospace;font-weight:500">$240</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#eff6ff;color:#1d4ed8">Trial</span></td></tr>
            <tr><td style="padding:12px 24px"><div style="font-weight:500;color:#171717">David Kim</div><div style="font-size:11px;color:#a3a3a3">d.kim@acme.co</div></td><td style="padding:12px 24px;color:#525252">Pro</td><td style="padding:12px 24px;text-align:right;font-family:monospace;font-weight:500">$1,240</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#f5f5f5;color:#525252">Churned</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "typography-system",
    title: "Typography System",
    description: "Every text style in the design system shown in context with annotations: heading hierarchy (H1–H4), body sizes (base, sm, xs), label and caption variants, monospace code style, uppercase table headers, and link states. Each sample is annotated with the exact size, weight, and Tailwind class to use.",
    category: "Foundations",
    tags: ["foundations", "typography", "type-scale", "reference", "headings", "body-text"],
    style: "",
    code: `export default function TypographySystem() {
  const sections = [
    {
      label: "Display / Headings",
      items: [
        { name: "H1 — Page Title", size: "30px", weight: 700, class: "text-3xl font-bold", sample: "Analytics Dashboard" },
        { name: "H2 — Section Heading", size: "24px", weight: 700, class: "text-2xl font-bold", sample: "Revenue Overview" },
        { name: "H3 — Card Title / Dialog", size: "18px", weight: 600, class: "text-lg font-semibold", sample: "Recent Transactions" },
        { name: "H4 — Sub-section", size: "16px", weight: 600, class: "text-base font-semibold", sample: "Filter by Status" },
      ],
    },
    {
      label: "Body",
      items: [
        { name: "Body — Primary", size: "14px", weight: 400, class: "text-sm", sample: "The dashboard provides an overview of your key metrics and recent activity. Use the filters above to narrow the results." },
        { name: "Body — Secondary", size: "13px", weight: 400, class: "text-sm text-neutral-500", sample: "Last updated 2 minutes ago · Synced from Stripe and Mixpanel" },
        { name: "Label — Strong", size: "14px", weight: 500, class: "text-sm font-medium", sample: "Display Name" },
        { name: "Caption / Meta", size: "12px", weight: 400, class: "text-xs text-neutral-400", sample: "Created Jan 15, 2024 · Modified by Sarah Chen" },
      ],
    },
    {
      label: "Functional",
      items: [
        { name: "Table Column Header", size: "11px", weight: 600, class: "text-xs font-semibold uppercase tracking-wider text-neutral-500", sample: "CUSTOMER NAME" },
        { name: "Badge / Tag", size: "11px", weight: 500, class: "text-xs font-medium", sample: "Pro Plan" },
        { name: "Button — Medium", size: "13px", weight: 500, class: "text-sm font-medium", sample: "Save Changes" },
        { name: "Monospace / Code", size: "13px", weight: 400, class: "text-sm font-mono", sample: "user_id: usr_01j9a4f5k2..." },
        { name: "Link", size: "13px", weight: 500, class: "text-sm font-medium text-blue-600 underline", sample: "View full report →" },
      ],
    },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-10 font-sans">
      {sections.map(section => (
        <section key={section.label}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">{section.label}</h2>
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            {section.items.map((item, i) => (
              <div key={item.name}
                className={\`flex items-start gap-0 \${i < section.items.length - 1 ? "border-b border-neutral-100" : ""}\`}>
                {/* Annotation */}
                <div className="w-52 flex-shrink-0 px-5 py-4 border-r border-neutral-100 bg-neutral-50/50">
                  <div className="text-xs font-medium text-neutral-700 mb-1">{item.name}</div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{item.size}</span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{item.weight}</span>
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-blue-400 break-all">{item.class}</div>
                </div>
                {/* Live sample */}
                <div className="flex-1 px-6 py-4 flex items-center">
                  <span className={item.class}>{item.sample}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Pairing rules */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Font Pairing Rules</h2>
        <div className="bg-white rounded-xl border border-neutral-200 p-6 grid grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Display</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Space Grotesk</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">H1, H2, hero headlines</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Body</div>
            <div className="text-2xl font-bold">Inter</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">All UI text, labels, prose</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-2">Code / Data</div>
            <div className="text-2xl font-bold font-mono">JetBrains Mono</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">Code, IDs, timestamps</div>
          </div>
        </div>
      </section>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:32px;background:#fafafa;min-height:600px;font-family:system-ui,-apple-system,sans-serif">

  <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:16px">Display / Headings</div>
  <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;margin-bottom:32px">
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">H1 — Page Title</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">30px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">700</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:30px;font-weight:700;color:#171717">Analytics Dashboard</span></div>
    </div>
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">H2 — Section Heading</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">24px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">700</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:24px;font-weight:700;color:#171717">Revenue Overview</span></div>
    </div>
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">H3 — Card Title</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">18px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">600</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:18px;font-weight:600;color:#171717">Recent Transactions</span></div>
    </div>
    <div style="display:flex;align-items:center">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">H4 — Sub-section</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">16px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">600</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:16px;font-weight:600;color:#171717">Filter by Status</span></div>
    </div>
  </div>

  <div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;margin-bottom:16px">Body & Functional</div>
  <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;margin-bottom:32px">
    <div style="display:flex;align-items:flex-start;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">Body — Primary</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">14px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">400</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:14px;color:#171717;line-height:1.5">The dashboard provides an overview of your key metrics and recent activity.</span></div>
    </div>
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">Label — Strong</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">14px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">500</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:14px;font-weight:500;color:#171717">Display Name</span></div>
    </div>
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">Table Column Header</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">11px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">600</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#737373">CUSTOMER NAME</span></div>
    </div>
    <div style="display:flex;align-items:center;border-bottom:1px solid #f5f5f5">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">Monospace / Code</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">13px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">400</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:13px;font-family:monospace;color:#171717">user_id: usr_01j9a4f5k2...</span></div>
    </div>
    <div style="display:flex;align-items:center">
      <div style="width:200px;flex-shrink:0;padding:16px 20px;border-right:1px solid #f5f5f5;background:#fafafa"><div style="font-size:11px;font-weight:500;color:#404040;margin-bottom:4px">Caption / Meta</div><div style="display:flex;gap:6px"><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">12px</span><span style="font-size:10px;font-family:monospace;color:#a3a3a3;background:#f5f5f5;padding:2px 6px;border-radius:3px">400</span></div></div>
      <div style="flex:1;padding:16px 24px"><span style="font-size:12px;color:#a3a3a3">Created Jan 15, 2024 · Modified by Sarah Chen</span></div>
    </div>
  </div>

  <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
    <div><div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a3a3a3;margin-bottom:8px">Display</div><div style="font-size:22px;font-weight:700;color:#171717">Space Grotesk</div><div style="font-size:10px;color:#a3a3a3;margin-top:4px;font-family:monospace">H1, H2, hero headlines</div></div>
    <div><div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a3a3a3;margin-bottom:8px">Body</div><div style="font-size:22px;font-weight:700;color:#171717">Inter</div><div style="font-size:10px;color:#a3a3a3;margin-top:4px;font-family:monospace">All UI text, labels, prose</div></div>
    <div><div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a3a3a3;margin-bottom:8px">Code / Data</div><div style="font-size:20px;font-weight:700;color:#171717;font-family:monospace">JetBrains Mono</div><div style="font-size:10px;color:#a3a3a3;margin-top:4px;font-family:monospace">Code, IDs, timestamps</div></div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "density-and-layout-guide",
    title: "Density & Layout Guide",
    description: "Side-by-side comparison of compact, default, and comfortable density modes applied to the same user table. Shows how row height, font size, padding, and spacing change between modes. Use to decide which density is right for your context before building.",
    category: "Foundations",
    tags: ["foundations", "density", "layout", "compact", "comfortable", "tables", "reference"],
    style: "",
    code: `export default function DensityAndLayoutGuide() {
  const users = [
    { name: "Sarah Chen", role: "Admin", status: "Active" },
    { name: "Marcus Rivera", role: "Editor", status: "Active" },
    { name: "Emily Park", role: "Viewer", status: "Trial" },
    { name: "David Kim", role: "Editor", status: "Churned" },
  ];

  const statusStyles: Record<string, string> = {
    Active:  "bg-emerald-50 text-emerald-700",
    Trial:   "bg-blue-50 text-blue-700",
    Churned: "bg-neutral-100 text-neutral-500",
  };

  const modes = [
    {
      name: "Compact",
      desc: "Data-heavy admin, log viewers, dense analytics",
      rowH: "h-8",
      cellPad: "px-4 py-1.5",
      headPad: "px-4 py-2",
      textSize: "text-xs",
      nameSize: "text-xs",
    },
    {
      name: "Default",
      desc: "Standard dashboards, CRM, settings pages",
      rowH: "h-11",
      cellPad: "px-5 py-3",
      headPad: "px-5 py-2.5",
      textSize: "text-sm",
      nameSize: "text-sm",
    },
    {
      name: "Comfortable",
      desc: "Consumer apps, onboarding, marketing dashboards",
      rowH: "h-14",
      cellPad: "px-6 py-4",
      headPad: "px-6 py-3",
      textSize: "text-sm",
      nameSize: "text-base",
    },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-8 font-sans">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Density Modes</h2>
        <p className="text-sm text-neutral-500">Pick one density per layout and use it consistently. Never mix compact and comfortable in the same view.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {modes.map(mode => (
          <div key={mode.name} className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-900">{mode.name}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{mode.desc}</div>
              </div>
              <div className={\`px-2 py-0.5 rounded-full text-xs font-medium \${
                mode.name === "Compact" ? "bg-violet-50 text-violet-700" :
                mode.name === "Default" ? "bg-blue-50 text-blue-700" :
                "bg-amber-50 text-amber-700"
              }\`}>{mode.name}</div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className={\`text-left \${mode.headPad} text-xs font-semibold uppercase tracking-wider text-neutral-500\`}>Name</th>
                    <th className={\`text-left \${mode.headPad} text-xs font-semibold uppercase tracking-wider text-neutral-500\`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className={\`\${mode.rowH} border-b border-neutral-100 last:border-0\`}>
                      <td className={\`\${mode.cellPad}\`}>
                        <div className={\`\${mode.nameSize} font-medium text-neutral-900\`}>{u.name}</div>
                        <div className="text-xs text-neutral-400">{u.role}</div>
                      </td>
                      <td className={\`\${mode.cellPad}\`}>
                        <span className={\`px-2 py-0.5 rounded-full text-xs font-medium \${statusStyles[u.status]}\`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-3 text-xs font-mono text-neutral-400 space-y-0.5">
              <div>row: <span className="text-blue-500">{mode.rowH.replace("h-", "") + " × 4px"}</span></div>
              <div>cell: <span className="text-blue-500">{mode.cellPad}</span></div>
              <div>text: <span className="text-blue-500">{mode.nameSize}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacing reminder */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold mb-4">Spacing Rules</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">All spacing is 4px grid</div>
            <div className="text-neutral-400">p-1=4px · p-2=8px · p-3=12px · p-4=16px · p-6=24px · p-8=32px</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">Page padding</div>
            <div className="text-neutral-400">Mobile: 24px · Tablet: 32px · Desktop: 48px</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">Card padding</div>
            <div className="text-neutral-400">Compact: p-4 (16px) · Default: p-5–p-6 · Spacious: p-8 (32px)</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:32px;background:#fafafa;min-height:600px;font-family:system-ui,-apple-system,sans-serif">
  <h2 style="font-size:20px;font-weight:700;color:#171717;margin:0 0 4px">Density Modes</h2>
  <p style="font-size:13px;color:#a3a3a3;margin:0 0 32px">Pick one density per layout. Never mix compact and comfortable in the same view.</p>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:32px">
    <!-- Compact -->
    <div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
        <div><div style="font-size:13px;font-weight:600;color:#171717">Compact</div><div style="font-size:11px;color:#a3a3a3;margin-top:2px">Data-heavy admin, log viewers</div></div>
        <span style="padding:2px 8px;border-radius:9999px;font-size:10px;font-weight:500;background:#f5f3ff;color:#7c3aed">Compact</span>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="border-bottom:1px solid #f5f5f5;background:#fafafa"><th style="text-align:left;padding:8px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Name</th><th style="text-align:left;padding:8px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Status</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;height:32px"><td style="padding:6px 16px"><div style="font-size:11px;font-weight:500;color:#171717">Sarah Chen</div><div style="font-size:10px;color:#a3a3a3">Admin</div></td><td style="padding:6px 16px"><span style="padding:1px 6px;border-radius:9999px;font-size:10px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:32px"><td style="padding:6px 16px"><div style="font-size:11px;font-weight:500;color:#171717">Marcus Rivera</div><div style="font-size:10px;color:#a3a3a3">Editor</div></td><td style="padding:6px 16px"><span style="padding:1px 6px;border-radius:9999px;font-size:10px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:32px"><td style="padding:6px 16px"><div style="font-size:11px;font-weight:500;color:#171717">Emily Park</div><div style="font-size:10px;color:#a3a3a3">Viewer</div></td><td style="padding:6px 16px"><span style="padding:1px 6px;border-radius:9999px;font-size:10px;font-weight:500;background:#eff6ff;color:#1d4ed8">Trial</span></td></tr>
            <tr style="height:32px"><td style="padding:6px 16px"><div style="font-size:11px;font-weight:500;color:#171717">David Kim</div><div style="font-size:10px;color:#a3a3a3">Editor</div></td><td style="padding:6px 16px"><span style="padding:1px 6px;border-radius:9999px;font-size:10px;font-weight:500;background:#f5f5f5;color:#525252">Churned</span></td></tr>
          </tbody>
        </table>
      </div>
      <div style="background:white;border-radius:8px;border:1px solid #e5e5e5;padding:10px 12px;margin-top:10px;font-family:monospace;font-size:10px;color:#a3a3a3;line-height:1.8">row: <span style="color:#2563eb">8 × 4px = 32px</span><br/>cell: <span style="color:#2563eb">px-4 py-1.5</span><br/>text: <span style="color:#2563eb">text-xs</span></div>
    </div>
    <!-- Default -->
    <div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
        <div><div style="font-size:13px;font-weight:600;color:#171717">Default</div><div style="font-size:11px;color:#a3a3a3;margin-top:2px">Standard dashboards, CRM</div></div>
        <span style="padding:2px 8px;border-radius:9999px;font-size:10px;font-weight:500;background:#eff6ff;color:#1d4ed8">Default</span>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="border-bottom:1px solid #f5f5f5;background:#fafafa"><th style="text-align:left;padding:10px 20px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Name</th><th style="text-align:left;padding:10px 20px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Status</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;height:44px"><td style="padding:12px 20px"><div style="font-size:13px;font-weight:500;color:#171717">Sarah Chen</div><div style="font-size:11px;color:#a3a3a3">Admin</div></td><td style="padding:12px 20px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:44px"><td style="padding:12px 20px"><div style="font-size:13px;font-weight:500;color:#171717">Marcus Rivera</div><div style="font-size:11px;color:#a3a3a3">Editor</div></td><td style="padding:12px 20px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:44px"><td style="padding:12px 20px"><div style="font-size:13px;font-weight:500;color:#171717">Emily Park</div><div style="font-size:11px;color:#a3a3a3">Viewer</div></td><td style="padding:12px 20px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#eff6ff;color:#1d4ed8">Trial</span></td></tr>
            <tr style="height:44px"><td style="padding:12px 20px"><div style="font-size:13px;font-weight:500;color:#171717">David Kim</div><div style="font-size:11px;color:#a3a3a3">Editor</div></td><td style="padding:12px 20px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#f5f5f5;color:#525252">Churned</span></td></tr>
          </tbody>
        </table>
      </div>
      <div style="background:white;border-radius:8px;border:1px solid #e5e5e5;padding:10px 12px;margin-top:10px;font-family:monospace;font-size:10px;color:#a3a3a3;line-height:1.8">row: <span style="color:#2563eb">11 × 4px = 44px</span><br/>cell: <span style="color:#2563eb">px-5 py-3</span><br/>text: <span style="color:#2563eb">text-sm</span></div>
    </div>
    <!-- Comfortable -->
    <div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
        <div><div style="font-size:13px;font-weight:600;color:#171717">Comfortable</div><div style="font-size:11px;color:#a3a3a3;margin-top:2px">Consumer apps, onboarding</div></div>
        <span style="padding:2px 8px;border-radius:9999px;font-size:10px;font-weight:500;background:#fffbeb;color:#b45309">Comfortable</span>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="border-bottom:1px solid #f5f5f5;background:#fafafa"><th style="text-align:left;padding:12px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Name</th><th style="text-align:left;padding:12px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Status</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;height:56px"><td style="padding:16px 24px"><div style="font-size:15px;font-weight:500;color:#171717">Sarah Chen</div><div style="font-size:12px;color:#a3a3a3">Admin</div></td><td style="padding:16px 24px"><span style="padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:56px"><td style="padding:16px 24px"><div style="font-size:15px;font-weight:500;color:#171717">Marcus Rivera</div><div style="font-size:12px;color:#a3a3a3">Editor</div></td><td style="padding:16px 24px"><span style="padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;height:56px"><td style="padding:16px 24px"><div style="font-size:15px;font-weight:500;color:#171717">Emily Park</div><div style="font-size:12px;color:#a3a3a3">Viewer</div></td><td style="padding:16px 24px"><span style="padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:500;background:#eff6ff;color:#1d4ed8">Trial</span></td></tr>
            <tr style="height:56px"><td style="padding:16px 24px"><div style="font-size:15px;font-weight:500;color:#171717">David Kim</div><div style="font-size:12px;color:#a3a3a3">Editor</div></td><td style="padding:16px 24px"><span style="padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:500;background:#f5f5f5;color:#525252">Churned</span></td></tr>
          </tbody>
        </table>
      </div>
      <div style="background:white;border-radius:8px;border:1px solid #e5e5e5;padding:10px 12px;margin-top:10px;font-family:monospace;font-size:10px;color:#a3a3a3;line-height:1.8">row: <span style="color:#2563eb">14 × 4px = 56px</span><br/>cell: <span style="color:#2563eb">px-6 py-4</span><br/>text: <span style="color:#2563eb">text-base</span></div>
    </div>
  </div>

  <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
    <div><div style="font-size:12px;font-weight:600;color:#404040;margin-bottom:6px">4px spacing grid</div><div style="font-size:11px;color:#a3a3a3;line-height:1.7">p-1=4px · p-2=8px · p-3=12px · p-4=16px · p-6=24px · p-8=32px</div></div>
    <div><div style="font-size:12px;font-weight:600;color:#404040;margin-bottom:6px">Page padding</div><div style="font-size:11px;color:#a3a3a3;line-height:1.7">Mobile: 24px · Tablet: 32px · Desktop: 48px</div></div>
    <div><div style="font-size:12px;font-weight:600;color:#404040;margin-bottom:6px">Card padding</div><div style="font-size:11px;color:#a3a3a3;line-height:1.7">Compact: p-4 (16px) · Default: p-5–p-6 · Spacious: p-8 (32px)</div></div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },

  {
    slug: "anti-pattern-contrast",
    title: "Anti-Pattern Contrast",
    description: "Side-by-side before/after showing the most common AI-generated UI mistakes vs their corrected versions. Left: raw browser-default styling, unstyled HTML, no typography hierarchy, missing semantic colors. Right: correct implementation following design foundations. A diagnostic reference for identifying and fixing low-quality output.",
    category: "Foundations",
    tags: ["foundations", "anti-patterns", "before-after", "contrast", "mistakes", "reference", "quality"],
    style: "",
    code: `export default function AntiPatternContrast() {
  const rows = [
    { name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active" },
    { name: "Marcus Rivera", email: "m.rivera@example.com", role: "Editor", status: "Inactive" },
    { name: "Emily Park", email: "e.park@example.com", role: "Viewer", status: "Active" },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[700px] font-sans">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Anti-Pattern Contrast</h2>
        <p className="text-sm text-neutral-500">The same UI built wrong (left) vs right (right). Every difference is intentional.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* ── WRONG ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">✗</span>
            </div>
            <span className="text-sm font-semibold text-red-700">Common Mistakes</span>
          </div>
          <div style={{ fontFamily: "Times New Roman, serif" }} className="border border-gray-400 bg-white p-4">
            <h1 style={{ fontSize: "2em" }}>User Management</h1>
            <p style={{ color: "gray" }}>manage your users here</p>
            <input type="text" placeholder="search..." style={{ border: "1px solid gray", padding: "2px", width: "100%", marginBottom: "8px" }} />
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
              <thead>
                <tr style={{ background: "gray", color: "white" }}>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Name</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Email</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Role</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Status</td>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#f9f9f9" : "white" }}>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.email}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.role}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px", color: r.status === "Active" ? "green" : "red" }}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "8px", display: "flex", gap: "4px" }}>
              <button style={{ border: "1px solid gray", padding: "4px 8px", background: "white" }}>Cancel</button>
              <button style={{ border: "none", padding: "4px 8px", background: "blue", color: "white" }}>SAVE CHANGES</button>
            </div>
          </div>
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-4 space-y-1.5">
            {[
              "Wrong font: Times New Roman (should be Inter)",
              "Unstyled h1 tag — no size/weight/color specification",
              "Input: no height, no border-radius, no focus state",
              "Table: raw border collapse with visible black borders",
              "Alternating gray rows — visual noise without purpose",
              "Status: color only, no semantic badge (color-blind failure)",
              "Button: raw blue (#0000ff), ALL CAPS label",
              "Content gap missing between title area and table",
            ].map(note => (
              <div key={note} className="flex items-start gap-2 text-xs text-red-700">
                <span className="mt-0.5 flex-shrink-0">✗</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CORRECT ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">✓</span>
            </div>
            <span className="text-sm font-semibold text-emerald-700">Correct Implementation</span>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100">
              <h1 className="text-xl font-bold text-neutral-900">User Management</h1>
              <p className="text-sm text-neutral-400 mt-0.5">Manage access and roles for your team.</p>
            </div>
            <div className="px-6 py-3 border-b border-neutral-100">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full h-9 px-3 text-sm border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-neutral-900">{r.name}</td>
                    <td className="px-6 py-3 text-neutral-500">{r.email}</td>
                    <td className="px-6 py-3 text-neutral-600">{r.role}</td>
                    <td className="px-6 py-3">
                      <span className={\`px-2.5 py-0.5 rounded-full text-xs font-medium \${
                        r.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }\`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-neutral-100 flex justify-end gap-3">
              <button className="h-9 px-4 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">Cancel</button>
              <button className="h-9 px-4 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-700 transition-colors">Save Changes</button>
            </div>
          </div>
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-1.5">
            {[
              "Font: Inter (system-ui fallback) — clean and consistent",
              "H1: text-xl font-bold text-neutral-900 — explicit hierarchy",
              "Input: h-9, rounded-lg, focus ring, transition",
              "Table: border-neutral-100 dividers only — no box borders",
              "Rows: hover state, last:border-0 — intentional detail",
              "Status: semantic badge (color + text) — accessible",
              "Button: neutral-900 primary, sentence case label",
              "Spacing: consistent 24px gutter throughout",
            ].map(note => (
              <div key={note} className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="mt-0.5 flex-shrink-0">✓</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:32px;background:#fafafa;min-height:700px;font-family:system-ui,-apple-system,sans-serif">
  <h2 style="font-size:20px;font-weight:700;color:#171717;margin:0 0 4px">Anti-Pattern Contrast</h2>
  <p style="font-size:13px;color:#a3a3a3;margin:0 0 32px">The same UI built wrong (left) vs right (right). Every difference is intentional.</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <!-- WRONG -->
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:20px;height:20px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#b91c1c">✗</div>
        <span style="font-size:13px;font-weight:600;color:#b91c1c">Common Mistakes</span>
      </div>
      <div style="font-family:Times New Roman,serif;border:1px solid #aaa;background:white;padding:16px">
        <h1 style="font-size:2em;margin:0 0 4px">User Management</h1>
        <p style="color:gray;margin:0 0 8px;font-size:14px">manage your users here</p>
        <input type="text" placeholder="search..." style="border:1px solid gray;padding:2px;width:100%;box-sizing:border-box;margin-bottom:8px;font-family:inherit" />
        <table style="width:100%;border-collapse:collapse;border:1px solid black;font-size:13px">
          <thead><tr style="background:gray;color:white"><td style="border:1px solid black;padding:4px">Name</td><td style="border:1px solid black;padding:4px">Email</td><td style="border:1px solid black;padding:4px">Role</td><td style="border:1px solid black;padding:4px">Status</td></tr></thead>
          <tbody>
            <tr style="background:#f9f9f9"><td style="border:1px solid #ccc;padding:4px">Sarah Chen</td><td style="border:1px solid #ccc;padding:4px">sarah@example.com</td><td style="border:1px solid #ccc;padding:4px">Admin</td><td style="border:1px solid #ccc;padding:4px;color:green">Active</td></tr>
            <tr style="background:white"><td style="border:1px solid #ccc;padding:4px">Marcus Rivera</td><td style="border:1px solid #ccc;padding:4px">m.rivera@example.com</td><td style="border:1px solid #ccc;padding:4px">Editor</td><td style="border:1px solid #ccc;padding:4px;color:red">Inactive</td></tr>
            <tr style="background:#f9f9f9"><td style="border:1px solid #ccc;padding:4px">Emily Park</td><td style="border:1px solid #ccc;padding:4px">e.park@example.com</td><td style="border:1px solid #ccc;padding:4px">Viewer</td><td style="border:1px solid #ccc;padding:4px;color:green">Active</td></tr>
          </tbody>
        </table>
        <div style="margin-top:8px;display:flex;gap:4px">
          <button style="border:1px solid gray;padding:4px 8px;background:white;font-family:inherit;cursor:pointer">Cancel</button>
          <button style="border:none;padding:4px 8px;background:blue;color:white;font-family:inherit;cursor:pointer">SAVE CHANGES</button>
        </div>
      </div>
      <div style="margin-top:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px">
        ${["Wrong font: Times New Roman", "Unstyled h1 — no size/weight/color", "Input: no height, no border-radius", "Table: raw black borders", "Alt gray rows — visual noise", "Status: color only, no badge", "Button: raw blue, ALL CAPS", "Missing spacing between sections"].map(n => `<div style="display:flex;gap:8px;font-size:11px;color:#b91c1c;margin-bottom:4px"><span style="flex-shrink:0">✗</span><span>${n}</span></div>`).join("")}
      </div>
    </div>

    <!-- CORRECT -->
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:20px;height:20px;border-radius:50%;background:#d1fae5;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#047857">✓</div>
        <span style="font-size:13px;font-weight:600;color:#047857">Correct Implementation</span>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden">
        <div style="padding:20px 24px;border-bottom:1px solid #f5f5f5">
          <div style="font-size:20px;font-weight:700;color:#171717;margin-bottom:2px">User Management</div>
          <div style="font-size:13px;color:#a3a3a3">Manage access and roles for your team.</div>
        </div>
        <div style="padding:12px 24px;border-bottom:1px solid #f5f5f5">
          <input type="text" placeholder="Search users..." style="width:100%;height:36px;padding:0 12px;font-size:13px;border:1px solid #e5e5e5;border-radius:8px;background:#fafafa;box-sizing:border-box;font-family:inherit;outline:none" />
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr style="border-bottom:1px solid #f5f5f5;background:#fafafa"><th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Name</th><th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Email</th><th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Role</th><th style="text-align:left;padding:10px 24px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Status</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:12px 24px;font-weight:500;color:#171717">Sarah Chen</td><td style="padding:12px 24px;color:#737373">sarah@example.com</td><td style="padding:12px 24px;color:#525252">Admin</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
            <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:12px 24px;font-weight:500;color:#171717">Marcus Rivera</td><td style="padding:12px 24px;color:#737373">m.rivera@example.com</td><td style="padding:12px 24px;color:#525252">Editor</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#f5f5f5;color:#525252">Inactive</span></td></tr>
            <tr><td style="padding:12px 24px;font-weight:500;color:#171717">Emily Park</td><td style="padding:12px 24px;color:#737373">e.park@example.com</td><td style="padding:12px 24px;color:#525252">Viewer</td><td style="padding:12px 24px"><span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;background:#ecfdf5;color:#047857">Active</span></td></tr>
          </tbody>
        </table>
        <div style="padding:16px 24px;border-top:1px solid #f5f5f5;display:flex;justify-content:flex-end;gap:12px">
          <button style="height:36px;padding:0 16px;font-size:13px;font-weight:500;color:#404040;background:white;border:1px solid #e5e5e5;border-radius:8px;cursor:pointer;font-family:inherit">Cancel</button>
          <button style="height:36px;padding:0 16px;font-size:13px;font-weight:500;color:white;background:#171717;border:none;border-radius:8px;cursor:pointer;font-family:inherit">Save Changes</button>
        </div>
      </div>
      <div style="margin-top:12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:16px">
        ${["Font: Inter — clean, consistent", "H1: explicit size, weight, color", "Input: h-9, rounded-lg, focus ring", "Table: subtle dividers only", "Rows: hover state, intentional spacing", "Status: semantic badge (color + text)", "Button: neutral-900, sentence case", "Spacing: 24px gutter throughout"].map(n => `<div style="display:flex;gap:8px;font-size:11px;color:#047857;margin-bottom:4px"><span style="flex-shrink:0">✓</span><span>${n}</span></div>`).join("")}
      </div>
    </div>
  </div>
</div>`,
    techStack: ["react", "tailwind"],
    licenseType: "free",
  },
];
