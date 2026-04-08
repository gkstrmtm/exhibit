/**
 * Command Palette Trigger
 * Category: Navigation
 * Tags: command palette, search, keyboard shortcut, Cmd+K, overlay
 * Description: A Cmd+K triggered command palette with fuzzy filtering. A trigger bar at the top shows the keyboard shortcut hint. Pressing the trigger or clicking opens an overlay with a search input and filtered command list. Escape closes. Demonstrates the keyboard-first command palette pattern used in developer tools.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/command-palette-trigger.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, LayoutDashboard, FolderOpen, Settings, BarChart2, HelpCircle, LogOut } from "lucide-react";

const COMMANDS = [
  { label: "Go to Dashboard", group: "Navigate", icon: LayoutDashboard },
  { label: "Open Projects", group: "Navigate", icon: FolderOpen },
  { label: "View Analytics", group: "Navigate", icon: BarChart2 },
  { label: "Account Settings", group: "Navigate", icon: Settings },
  { label: "Help & Documentation", group: "Support", icon: HelpCircle },
  { label: "Sign out", group: "Account", icon: LogOut },
];

export default function CommandPaletteTrigger() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group filtered results
  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  return (
    <div className="relative bg-neutral-100 border border-neutral-200 rounded-xl p-4 w-full max-w-xs">
      {/* Trigger bar */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-400 hover:border-neutral-400 transition-colors"
      >
        <Search size={12} strokeWidth={1.5} />
        <span className="flex-1 text-left">Search commands…</span>
        <span className="flex items-center gap-0.5">
          <kbd className="text-[9px] font-medium bg-neutral-100 border border-neutral-200 rounded px-1 py-0.5">⌘</kbd>
          <kbd className="text-[9px] font-medium bg-neutral-100 border border-neutral-200 rounded px-1 py-0.5">K</kbd>
        </span>
      </button>

      <p className="text-[10px] text-neutral-400 mt-2 text-center">Click the bar or press ⌘K to open</p>

      {/* Palette overlay */}
      {open && (
        <div className="absolute inset-x-0 top-0 z-30">
          {/* Backdrop */}
          <div className="fixed inset-0" onClick={() => setOpen(false)} />

          <div className="relative bg-white rounded-xl border border-neutral-200 shadow-2xl overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-neutral-100">
              <Search size={12} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                className="flex-1 text-xs text-neutral-900 placeholder-neutral-400 outline-none bg-transparent"
                placeholder="Type a command…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="text-[9px] text-neutral-400 border border-neutral-200 rounded px-1 py-0.5">Esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-48 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-xs text-neutral-400">No commands found</div>
              ) : (
                groups.map((group) => (
                  <div key={group}>
                    <div className="px-3 py-1 text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{group}</div>
                    {filtered.filter((c) => c.group === group).map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => { setOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        <Icon size={12} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
