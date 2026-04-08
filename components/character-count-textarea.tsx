/**
 * Character Count Textarea
 * Category: Inputs
 * Tags: textarea, character-count, limit, input, feedback, overflow
 * Description: A textarea with a live character count below it. At 80% of the limit, the count turns amber. At the limit, it turns red and the textarea border highlights. Typing beyond the limit is prevented. Demonstrates the soft-warn then hard-stop character counter.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/character-count-textarea.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";

interface TextAreaWithLimit { label: string; placeholder: string; max: number; initial?: string; }

function LimitedTextArea({ label, placeholder, max, initial = "" }: TextAreaWithLimit) {
  const [value, setValue] = useState(initial);
  const count = value.length;
  const pct = count / max;

  const countColor =
    pct >= 1 ? "text-red-600 font-semibold" :
    pct >= 0.8 ? "text-amber-600 font-medium" :
    "text-neutral-400";

  const borderClass =
    pct >= 1 ? "border-red-400 ring-1 ring-red-200" :
    pct >= 0.8 ? "border-amber-400" :
    "border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-200";

  return (
    <div>
      <label className="text-[10px] text-neutral-500 uppercase tracking-wide block mb-1">{label}</label>
      <div className={`border rounded-lg overflow-hidden bg-white transition-all ${borderClass}`}>
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= max) setValue(e.target.value);
          }}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2.5 text-sm text-neutral-800 resize-none focus:outline-none bg-transparent placeholder:text-neutral-400"
        />
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-neutral-100 bg-neutral-50">
          <div className={`h-1.5 flex-1 mr-3 rounded-full bg-neutral-200 overflow-hidden`}>
            <div
              className={`h-full rounded-full transition-all ${pct >= 1 ? "bg-red-500" : pct >= 0.8 ? "bg-amber-400" : "bg-neutral-400"}`}
              style={{ width: `${Math.min(pct * 100, 100)}%` }}
            />
          </div>
          <span className={`text-[11px] tabular-nums transition-colors shrink-0 ${countColor}`}>
            {count} / {max}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CharacterCountTextarea() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm space-y-4">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
        Character count textarea
      </div>

      <LimitedTextArea
        label="Short bio"
        placeholder="Write a short bio…"
        max={160}
        initial="Product designer focused on interaction clarity."
      />

      <LimitedTextArea
        label="Commit message"
        placeholder="What changed?"
        max={72}
        initial="feat: add column visibility toggle to table"
      />

      <div className="text-[11px] text-neutral-400">
        Amber warning at 80% of limit. Red stop at the limit — typing is blocked but existing text can be edited. Progress bar tracks position visually.
      </div>
    </div>
  );
}
