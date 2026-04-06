/**
 * Tag Input
 * Category: Inputs
 * Tags: tag input, multi-select, pills, input, chips
 * Description: Multi-tag input where each entered value becomes a removable pill. Type and press Enter or comma to add. Backspace removes the last tag.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tag-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState, KeyboardEvent } from "react";
export default function TagInput() {
  const [tags, setTags] = useState(["design", "react"]);
  const [v, setV] = useState("");
  const add = () => {
    const t = v.trim().replace(/,/g, "");
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setV("");
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !v) setTags(tags.slice(0, -1));
  };
  return (
    <div className="max-w-sm p-6">
      <label className="block text-xs font-medium text-neutral-600 mb-1.5">Tags</label>
      <div className="flex flex-wrap gap-1.5 p-2 border border-neutral-200 rounded-xl min-h-[44px] focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
        {tags.map(t => (
          <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-neutral-100 rounded-md text-xs text-neutral-700">
            {t}
            <button onClick={() => setTags(tags.filter(x => x !== t))} className="text-neutral-400 hover:text-neutral-700">×</button>
          </span>
        ))}
        <input value={v} onChange={e => setV(e.target.value)} onKeyDown={onKey} placeholder="Add tag..." className="flex-1 min-w-[80px] text-sm outline-none bg-transparent text-neutral-900 placeholder:text-neutral-400" />
      </div>
    </div>
  );
}