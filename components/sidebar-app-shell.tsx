/**
 * Sidebar App Shell
 * Category: App Shells
 * Tags: sidebar, app-shell, layout, navigation, admin
 * Description: A complete sidebar layout with logo area, navigation items with icons, user avatar at bottom, and main content area. Clean minimal style perfect for admin panels and dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sidebar-app-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

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
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active === item.label
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
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
}