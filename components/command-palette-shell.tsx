/**
 * Command Palette Shell
 * Category: App Shells
 * Tags: app-shell, command-palette, keyboard, search, overlay
 * Description: Raycast/Linear-style command palette overlay with Cmd+K trigger, grouped search results, keyboard shortcut hints, and smooth open/close animation.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/command-palette-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState, useEffect, useRef } from "react";

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
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${selected === idx ? "bg-violet-50 text-violet-700" : "text-neutral-700 hover:bg-neutral-50"}`}
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
}