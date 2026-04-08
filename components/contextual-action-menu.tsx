/**
 * Contextual Action Menu
 * Category: Navigation
 * Tags: context menu, popover, 3-dot, actions, dropdown
 * Description: A 3-dot overflow menu attached to a list item that exposes contextual actions. The menu opens below the trigger, traps clicks outside to close, and supports disabled items. Demonstrates the canonical per-row action menu pattern used in data lists and tables.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/contextual-action-menu.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useRef, useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Copy, Share2, Archive, Trash2 } from "lucide-react";

const ITEMS = [
  { id: 1, name: "Homepage redesign", status: "Active" },
  { id: 2, name: "Mobile nav audit", status: "Draft" },
  { id: 3, name: "API rate limiting", status: "Active" },
];

const ACTIONS = [
  { label: "Edit", icon: Pencil },
  { label: "Duplicate", icon: Copy },
  { label: "Share", icon: Share2 },
  { label: "Archive", icon: Archive },
  { label: "Delete", icon: Trash2, danger: true },
];

function ActionMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 w-36"
    >
      {ACTIONS.map(({ label, icon: Icon, danger }) => (
        <button
          key={label}
          onClick={onClose}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors
            ${danger
              ? "text-red-600 hover:bg-red-50"
              : "text-neutral-700 hover:bg-neutral-50"
            }`}
        >
          <Icon size={12} strokeWidth={1.5} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function ContextualActionMenu() {
  const [openId, setOpenId] = useState<number | null>(null);

  function toggle(id: number) {
    setOpenId((v) => (v === id ? null : id));
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-visible w-full max-w-xs">
      {ITEMS.map((item) => (
        <div key={item.id} className="relative flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50">
          <div>
            <div className="text-xs font-medium text-neutral-800">{item.name}</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">{item.status}</div>
          </div>

          <button
            onClick={() => toggle(item.id)}
            className={`p-1 rounded transition-colors ${openId === item.id ? "bg-neutral-200 text-neutral-800" : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"}`}
          >
            <MoreHorizontal size={14} />
          </button>

          {openId === item.id && <ActionMenu onClose={() => setOpenId(null)} />}
        </div>
      ))}
    </div>
  );
}
