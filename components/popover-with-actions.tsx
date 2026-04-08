/**
 * Popover with Actions
 * Category: Feedback
 * Tags: popover, actions, menu, outside-click, overlay
 * Description: A button-triggered popover panel containing a list of contextual actions. Clicking outside or pressing Escape closes the popover. Actions include Share, Copy link, Rename, and Delete (danger-styled). The trigger button shows an active ring while the popover is open.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/popover-with-actions.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Share2, Link2, Pencil, Trash2, ChevronRight } from "lucide-react";

const ACTIONS = [
  { icon: Share2, label: "Share", shortcut: "⌘S" },
  { icon: Link2, label: "Copy link", shortcut: "⌘C" },
  { icon: Pencil, label: "Rename", shortcut: "F2" },
  { divider: true },
  { icon: Trash2, label: "Delete", shortcut: "⌫", danger: true },
] as const;

export default function PopoverWithActions() {
  const [open, setOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", keyHandler); };
  }, [open]);

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <div className="text-xs font-medium text-neutral-700">Project actions</div>
        <div className="text-[10px] text-neutral-400">Click the button to open the menu</div>
      </div>

      <div ref={containerRef} className="relative">
        <button
          onClick={() => setOpen(v => !v)}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${open ? "border-neutral-400 bg-white ring-2 ring-neutral-200" : "border-neutral-200 bg-white hover:bg-neutral-50"}`}
        >
          <MoreHorizontal size={14} className="text-neutral-600" strokeWidth={1.5} />
        </button>

        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-20">
            {ACTIONS.map((action, i) => {
              if ("divider" in action) return <div key={i} className="my-1 border-t border-neutral-100" />;
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onMouseDown={() => { setLastClicked(action.label); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] transition-colors ${action.danger ? "text-red-500 hover:bg-red-50" : "text-neutral-700 hover:bg-neutral-50"}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={11} strokeWidth={1.5} />
                    {action.label}
                  </span>
                  <kbd className={`text-[9px] font-mono ${action.danger ? "text-red-400" : "text-neutral-400"}`}>{action.shortcut}</kbd>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {lastClicked && (
        <div className="text-[10px] text-neutral-500 bg-white border border-neutral-200 rounded-lg px-2.5 py-1">
          Clicked: <span className="font-medium text-neutral-700">{lastClicked}</span>
        </div>
      )}
    </div>
  );
}
