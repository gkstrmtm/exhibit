/**
 * Editable Data Row
 * Category: Tables
 * Tags: inline-edit, table, row, editable, save, cancel, keyboard
 * Description: A data table where rows can be edited inline — double-click a cell or press the edit icon to enter a row-edit mode. Shows pencil icon on hover, inline inputs replace text, Save/Cancel buttons appear in the row. Escape cancels, Enter saves. Demonstrates row-level inline editing.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/editable-data-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

interface Row {
  id: number;
  name: string;
  owner: string;
  amount: string;
}

const INITIAL: Row[] = [
  { id: 1, name: "Homepage redesign", owner: "Sarah Chen", amount: "$4,200" },
  { id: 2, name: "API documentation", owner: "James Wu", amount: "$1,100" },
  { id: 3, name: "Mobile QA sprint", owner: "Maya Patel", amount: "$800" },
  { id: 4, name: "Brand refresh", owner: "Leo Torres", amount: "$3,500" },
];

export default function EditableDataRow() {
  const [rows, setRows] = useState<Row[]>(INITIAL);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Row>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  function startEdit(row: Row) {
    setEditingId(row.id);
    setDraft({ name: row.name, owner: row.owner, amount: row.amount });
    setTimeout(() => nameRef.current?.focus(), 30);
  }

  function save() {
    if (editingId === null) return;
    setRows((rs) => rs.map((r) => r.id === editingId ? { ...r, ...draft } as Row : r));
    setEditingId(null);
  }

  function cancel() { setEditingId(null); }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Editable table row
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_40px] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
          <span>Task</span>
          <span className="w-28">Owner</span>
          <span className="w-20 text-right">Amount</span>
          <span />
        </div>

        {rows.map((row) => {
          const editing = editingId === row.id;
          return (
            <div key={row.id} className={`grid grid-cols-[1fr_auto_auto_40px] items-center px-3 py-2 border-b border-neutral-100 last:border-0 group transition-colors ${editing ? "bg-blue-50" : "hover:bg-neutral-50"}`}>
              {editing ? (
                <>
                  <input
                    ref={nameRef}
                    value={draft.name ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="text-xs border border-blue-300 rounded px-2 py-1 mr-2 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                  />
                  <input
                    value={draft.owner ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, owner: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="text-xs border border-blue-300 rounded px-2 py-1 w-28 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <input
                    value={draft.amount ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, amount: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="text-xs border border-blue-300 rounded px-2 py-1 w-20 text-right focus:outline-none focus:ring-1 focus:ring-blue-400 ml-2"
                  />
                  <div className="flex gap-1 ml-1">
                    <button onClick={save} className="p-1 text-emerald-600 hover:text-emerald-800"><Check size={13} /></button>
                    <button onClick={cancel} className="p-1 text-neutral-400 hover:text-neutral-600"><X size={13} /></button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs text-neutral-800 truncate pr-2">{row.name}</span>
                  <span className="text-xs text-neutral-500 w-28">{row.owner}</span>
                  <span className="text-xs font-medium text-neutral-700 w-20 text-right">{row.amount}</span>
                  <button
                    onClick={() => startEdit(row)}
                    className="flex justify-center p-1 text-neutral-300 hover:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit row"
                  >
                    <Pencil size={12} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Hover any row to see the edit icon. Click to enter edit mode — inputs replace text exactly. Enter saves, Escape cancels.
      </div>
    </div>
  );
}
