/**
 * Floating Action Menu
 * Category: Navigation
 * Tags: fab, floating, menu, material, action
 * Description: Expandable floating action button with radial menu. Inspired by Material Design 3 elevation.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/floating-action-menu.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

export default function FloatingActionMenu() {
  const [open, setOpen] = useState(false);
  const actions = [
    { icon: "✏️", label: "Edit" },
    { icon: "📎", label: "Attach" },
    { icon: "📤", label: "Share" },
  ];

  return (
    <div className="relative p-12 bg-slate-50 flex items-end justify-end min-h-[300px]">
      <div className="relative">
        {actions.map((action, i) => (
          <button
            key={action.label}
            className={`absolute bottom-16 right-1 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-sm transition-all duration-300 ${
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50 pointer-events-none"
            }`}
            style={{
              transform: open ? `translateY(-${(i + 1) * 52}px)` : "translateY(0)",
              transitionDelay: `${i * 50}ms`,
            }}
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center text-2xl transition-transform duration-300 hover:bg-blue-700 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}