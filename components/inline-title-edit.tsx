/**
 * Inline Title Edit
 * Category: Layout
 * Tags: inline-edit, title, heading, click-to-edit, text, rename
 * Description: A page-title area where the heading is click-to-edit. Clicking the title or a small pencil icon switches to an underline-style input in place. Pressing Enter or blurring saves. Pressing Escape cancels. A small "click to rename" hint appears on hover. Demonstrates the minimal click-to-rename heading pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/inline-title-edit.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

export default function InlineTitleEdit() {
  const [titles, setTitles] = useState([
    "Q1 Marketing Campaign",
    "Product Roadmap 2025",
    "Engineering Sprint 12",
  ]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const savedByBlur = useRef(false);

  function startEdit(idx: number) {
    setDraft(titles[idx]);
    setEditingIdx(idx);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 30);
  }

  function save() {
    if (editingIdx === null) return;
    const trimmed = draft.trim();
    if (trimmed) {
      setTitles((ts) => ts.map((t, i) => (i === editingIdx ? trimmed : t)));
    }
    setEditingIdx(null);
  }

  function cancel() { setEditingIdx(null); }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { savedByBlur.current = true; save(); }
    if (e.key === "Escape") { savedByBlur.current = true; cancel(); }
  }

  function handleBlur() {
    if (savedByBlur.current) { savedByBlur.current = false; return; }
    save();
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Inline title edit
      </div>

      <div className="space-y-3">
        {titles.map((title, idx) => {
          const isEditing = editingIdx === idx;
          return (
            <div key={idx} className="bg-white border border-neutral-200 rounded-lg px-4 py-3">
              <div className="text-[9px] text-neutral-400 uppercase tracking-wide mb-1">
                {["Campaign", "Roadmap", "Sprint"][idx]}
              </div>

              {isEditing ? (
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  className="text-lg font-semibold text-neutral-900 w-full border-b-2 border-blue-400 bg-transparent pb-0.5 focus:outline-none leading-tight"
                />
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2
                    className="text-lg font-semibold text-neutral-900 leading-tight cursor-text hover:text-neutral-700"
                    onDoubleClick={() => startEdit(idx)}
                    onClick={() => startEdit(idx)}
                  >
                    {title}
                  </h2>
                  <button
                    onClick={() => startEdit(idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600"
                    title="Rename"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}

              {!isEditing && (
                <p className="text-[10px] text-neutral-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to rename
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[11px] text-neutral-400">
        Click any title to rename it inline. The heading becomes a borderless underline input. Enter or click away to save, Escape to cancel. No modal, no separate rename field.
      </div>
    </div>
  );
}
