/**
 * Tag Input Field
 * Category: Inputs
 * Tags: tag, input, chips, enter-to-add, free-form, remove
 * Description: A free-form tag input: type a tag and press Enter or comma to add it as a chip. Clicking the X on a chip removes it. Duplicate prevention. Chips are displayed inline inside the input boundary. Max 10 tags. Demonstrates the writable tag-chips input pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tag-input-field.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef } from "react";
import { X } from "lucide-react";

const COLORS = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-rose-100 text-rose-700 border-rose-200",
  "bg-sky-100 text-sky-700 border-sky-200",
];

function colorForTag(tag: string) {
  let hash = 0;
  for (const ch of tag) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return COLORS[hash % COLORS.length];
}

const MAX = 10;

export default function TagInputField() {
  const [tags, setTags] = useState<string[]>(["typescript", "react", "tailwind"]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const val = raw.trim().toLowerCase().replace(/,+$/, "");
    if (!val || tags.includes(val) || tags.length >= MAX) return;
    setTags((t) => [...t, val]);
  }

  function removeTag(tag: string) {
    setTags((t) => t.filter((x) => x !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.endsWith(",")) {
      addTag(val);
      setInput("");
    } else {
      setInput(val);
    }
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Skills / tags
      </div>

      <div
        onClick={() => inputRef.current?.focus()}
        className={`flex flex-wrap gap-1.5 items-start px-2.5 py-2 border rounded-lg bg-white cursor-text min-h-[48px] transition-all ${focused ? "border-neutral-400 ring-1 ring-neutral-200" : "border-neutral-300 hover:border-neutral-400"}`}
      >
        {tags.map((tag) => (
          <span key={tag} className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${colorForTag(tag)}`}>
            {tag}
            <button onClick={() => removeTag(tag)} className="opacity-60 hover:opacity-100">
              <X size={9} />
            </button>
          </span>
        ))}
        {tags.length < MAX && (
          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); if (input.trim()) { addTag(input); setInput(""); } }}
            placeholder={tags.length === 0 ? "Add a tag…" : ""}
            className="flex-1 min-w-[80px] text-xs text-neutral-800 focus:outline-none bg-transparent placeholder:text-neutral-400"
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-[10px] text-neutral-400">Enter or comma to add · Backspace to remove last</p>
        <p className={`text-[10px] font-medium ${tags.length >= MAX ? "text-red-500" : "text-neutral-400"}`}>
          {tags.length}/{MAX}
        </p>
      </div>
    </div>
  );
}
