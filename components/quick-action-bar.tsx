/**
 * Quick Action Bar
 * Category: Dashboard
 * Tags: quick actions, shortcuts, toolbar, buttons, action bar
 * Description: A horizontal bar of primary action shortcuts displayed prominently on a dashboard. Each action has an icon, a label, and an optional keyboard shortcut hint. Actions can be in a default or active state. Demonstrates the quick-action / shortcuts bar pattern that reduces navigation depth for frequent tasks.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/quick-action-bar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Plus, Upload, Download, RefreshCw, Send } from "lucide-react";

const ACTIONS = [
  { label: "New", icon: Plus, shortcut: "N" },
  { label: "Import", icon: Upload, shortcut: "I" },
  { label: "Export", icon: Download, shortcut: "E" },
  { label: "Sync", icon: RefreshCw, shortcut: "S" },
  { label: "Publish", icon: Send, shortcut: "P", primary: true },
];

export default function QuickActionBar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-lg space-y-4">
      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Quick actions</div>

      {/* Action bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {ACTIONS.map(({ label, icon: Icon, shortcut, primary }) => (
          <button
            key={label}
            onClick={() => setActive((v) => (v === label ? null : label))}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border
              ${primary
                ? active === label
                  ? "bg-neutral-700 text-white border-neutral-700"
                  : "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-700"
                : active === label
                  ? "bg-neutral-100 text-neutral-900 border-neutral-300"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300"
              }`}
          >
            <Icon size={12} strokeWidth={1.5} />
            {label}
            <kbd className={`text-[9px] border rounded px-1 py-0.5 leading-none ${primary ? "border-white/30 text-white/70" : "border-neutral-200 text-neutral-400"}`}>
              {shortcut}
            </kbd>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {active && (
        <div className="text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 rounded px-3 py-2">
          "{active}" action triggered — click again to reset.
        </div>
      )}
    </div>
  );
}
