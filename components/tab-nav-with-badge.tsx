/**
 * Tab Nav with Badge
 * Category: Navigation
 * Tags: tabs, badge, notification, dot, count
 * Description: A horizontal tab navigation bar where individual tabs can carry notification count badges or dot indicators. Selecting a tab updates the shown content. Demonstrates the common tabbed UI enhancement for surfacing unread counts or pending items.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-nav-with-badge.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";

const TABS = [
  { label: "Overview" },
  { label: "Activity", badge: 12 },
  { label: "Deployments", dot: true },
  { label: "Settings" },
];

const CONTENT: Record<string, string> = {
  Overview: "Project overview, summary stats, and recent highlights appear here.",
  Activity: "12 new activity events since last visit — comments, commits, and status changes.",
  Deployments: "New deployment running — view status and logs.",
  Settings: "Project name, integrations, and access control.",
};

export default function TabNavWithBadge() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-sm">
      {/* Tab bar */}
      <div className="flex border-b border-neutral-200 overflow-x-auto">
        {TABS.map(({ label, badge, dot }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors shrink-0
                ${isActive
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
            >
              {label}
              {badge !== undefined && (
                <span className={`text-[9px] font-semibold rounded-full px-1.5 min-w-[18px] text-center
                  ${isActive ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"}`}>
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
              {dot && (
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-neutral-900" : "bg-amber-400"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-neutral-600 leading-relaxed">{CONTENT[active]}</p>
      </div>
    </div>
  );
}
