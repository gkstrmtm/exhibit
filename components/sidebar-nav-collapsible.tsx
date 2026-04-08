/**
 * Sidebar Nav Collapsible
 * Category: Layout
 * Tags: sidebar, navigation, collapse, icon-only, tooltip
 * Description: A sidebar navigation panel that collapses to icon-only mode. When collapsed the nav labels disappear and icons remain; a tooltip stands in for the label. A chevron toggle in the header controls the state. Demonstrates the canonical collapsible sidebar pattern used in dense productivity tools.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sidebar-nav-collapsible.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import {
  LayoutDashboard, FolderOpen, BarChart2, Settings,
  MessageSquare, ChevronLeft, ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderOpen },
  { label: "Analytics", icon: BarChart2 },
  { label: "Messages", icon: MessageSquare, badge: 3 },
  { label: "Settings", icon: Settings },
];

export default function SidebarNavCollapsible() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-72 rounded-xl overflow-hidden border border-neutral-200 w-full max-w-sm">
      {/* Sidebar */}
      <div
        className="flex flex-col bg-neutral-900 transition-all duration-200"
        style={{ width: collapsed ? 48 : 176 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-neutral-800 h-9 shrink-0">
          {!collapsed && (
            <span className="text-xs font-semibold text-white px-1 truncate">Workspace</span>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="ml-auto p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-1.5 space-y-px overflow-hidden">
          {NAV_ITEMS.map(({ label, icon: Icon, badge }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                title={collapsed ? label : undefined}
                onClick={() => setActive(label)}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded mx-1 transition-colors text-left
                  ${isActive
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                  }`}
                style={{ width: collapsed ? 40 : "calc(100% - 8px)" }}
              >
                <Icon size={14} className="shrink-0" strokeWidth={1.5} />
                {!collapsed && (
                  <>
                    <span className="text-xs flex-1 truncate">{label}</span>
                    {badge !== undefined && (
                      <span className="text-[9px] font-semibold bg-blue-600 text-white rounded-full px-1 min-w-[16px] text-center">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="border-b border-neutral-100 px-4 h-9 flex items-center">
          <span className="text-xs font-medium text-neutral-800">{active}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-neutral-400">
            {active} content area
          </span>
        </div>
      </div>
    </div>
  );
}
