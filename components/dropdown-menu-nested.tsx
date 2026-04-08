/**
 * Dropdown Menu Nested
 * Category: Navigation
 * Tags: dropdown, nested, submenu, menu, chevron
 * Description: A single-level dropdown menu where one item ("Move to") opens a second-level submenu on hover. The submenu appears to the right of the parent item. Clicking outside closes both levels. Menu items include icons and keyboard shortcuts.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dropdown-menu-nested.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, Copy, Edit3, Folder, FolderOpen, Archive, Trash2, ChevronDown } from "lucide-react";

const FOLDERS = ["Design System", "Archive", "Drafts", "Templates", "Shared"];

export default function DropdownMenuNested() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) { setOpen(false); setSubOpen(false); }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const pick = (label: string) => { setResult(label); setOpen(false); setSubOpen(false); };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="text-[10px] text-neutral-400 text-center">Dropdown with nested submenu</div>

      <div ref={ref} className="relative">
        <button
          onClick={() => { setOpen(v => !v); if (open) setSubOpen(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${open ? "bg-white border-neutral-300 text-neutral-800" : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"}`}
        >
          Actions
          <ChevronDown size={11} strokeWidth={1.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-20">
            <button onMouseDown={() => pick("Duplicate")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-50">
              <Copy size={11} strokeWidth={1.5} className="text-neutral-400" />Duplicate
              <kbd className="ml-auto text-[9px] font-mono text-neutral-400">⌘D</kbd>
            </button>
            <button onMouseDown={() => pick("Rename")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-50">
              <Edit3 size={11} strokeWidth={1.5} className="text-neutral-400" />Rename
              <kbd className="ml-auto text-[9px] font-mono text-neutral-400">F2</kbd>
            </button>

            {/* Nested trigger */}
            <div
              className="relative"
              onMouseEnter={() => setSubOpen(true)}
              onMouseLeave={() => setSubOpen(false)}
            >
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-50">
                <FolderOpen size={11} strokeWidth={1.5} className="text-neutral-400" />Move to
                <ChevronRight size={10} strokeWidth={1.5} className="ml-auto text-neutral-400" />
              </button>

              {subOpen && (
                <div className="absolute top-0 left-full ml-1 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-30">
                  {FOLDERS.map(f => (
                    <button
                      key={f}
                      onMouseDown={() => pick("Moved to " + f)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-50"
                    >
                      <Folder size={10} strokeWidth={1.5} className="text-neutral-400" />
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="my-1 border-t border-neutral-100" />
            <button onMouseDown={() => pick("Archive")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-50">
              <Archive size={11} strokeWidth={1.5} className="text-neutral-400" />Archive
            </button>
            <button onMouseDown={() => pick("Delete")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-red-500 hover:bg-red-50">
              <Trash2 size={11} strokeWidth={1.5} />Delete
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className="text-[10px] text-neutral-500 bg-white border border-neutral-200 rounded-lg px-2.5 py-1">
          Action: <span className="font-medium text-neutral-700">{result}</span>
        </div>
      )}
    </div>
  );
}
