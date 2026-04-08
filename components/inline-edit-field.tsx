/**
 * Inline Edit Field
 * Category: Inputs
 * Tags: inline-edit, in-place, click-to-edit, editable, field
 * Description: Click any text field to edit it in-place. The label transforms into an input on click. Pressing Enter or blurring the field saves the value. Pressing Escape cancels and reverts. A subtle pencil icon appears on hover to hint at editability. Three fields are shown: name, title, and email.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/inline-edit-field.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef } from "react";
import { Pencil, Check, X } from "lucide-react";

type FieldProps = { label: string; initial: string };

function EditableField({ label, initial }: FieldProps) {
  const [value, setValue] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => { setDraft(value); setEditing(true); setTimeout(() => inputRef.current?.select(), 0); };
  const save = () => { setValue(draft.trim() || value); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div className="flex items-center gap-2 py-2 border-b border-neutral-100 last:border-0">
      <span className="text-[9px] text-neutral-400 w-12 flex-shrink-0">{label}</span>
      {editing ? (
        <div className="flex items-center gap-1 flex-1">
          <input
            ref={inputRef}
            className="flex-1 text-[11px] text-neutral-800 bg-white border border-neutral-300 rounded-md px-2 py-0.5 outline-none focus:border-neutral-500 min-w-0"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") save(); if (e.key === "Escape") cancel(); }}
            onBlur={save}
          />
          <button onClick={save} className="w-5 h-5 flex items-center justify-center rounded text-emerald-600 hover:bg-emerald-50 transition-colors flex-shrink-0">
            <Check size={10} strokeWidth={2.5} />
          </button>
          <button onMouseDown={cancel} className="w-5 h-5 flex items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 transition-colors flex-shrink-0">
            <X size={10} strokeWidth={2} />
          </button>
        </div>
      ) : (
        <button onClick={startEdit} className="group flex items-center gap-1.5 flex-1 min-w-0 text-left">
          <span className="text-[11px] text-neutral-700 flex-1 truncate">{value}</span>
          <Pencil size={9} strokeWidth={1.5} className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </button>
      )}
    </div>
  );
}

export default function InlineEditField() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Click any field to edit</div>
      <EditableField label="Name" initial="Aria Chen" />
      <EditableField label="Title" initial="Design Lead" />
      <EditableField label="Email" initial="aria@example.com" />
      <EditableField label="Team" initial="Platform Design" />
    </div>
  );
}
