/**
 * Combobox Multi Select
 * Category: Inputs
 * Tags: combobox, multi-select, search, dropdown, chips, autocomplete
 * Description: A searchable multi-select combobox. Typing filters the option list. Selecting an option adds it as a removable chip inside the input. Clicking a chip removes it. Pressing Escape closes the dropdown. Backspace removes the last chip when input is empty.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/combobox-multi-select.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";

const OPTIONS = [
  "Design", "Engineering", "Marketing", "Sales", "Finance", "Legal",
  "Product", "Operations", "Customer Success", "Data Science",
];

export default function ComboboxMultiSelect() {
  const [selected, setSelected] = useState<string[]>(["Design", "Product"]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = OPTIONS.filter(
    (o) => !selected.includes(o) && o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  function add(opt: string) {
    setSelected((s) => [...s, opt]);
    setQuery("");
    inputRef.current?.focus();
  }

  function remove(opt: string) {
    setSelected((s) => s.filter((x) => x !== opt));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Backspace" && query === "" && selected.length > 0) {
      remove(selected[selected.length - 1]);
    }
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" && filtered.length > 0) add(filtered[0]);
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Team assignment
      </div>

      <div ref={ref} className="relative">
        <div
          onClick={() => { setOpen(true); inputRef.current?.focus(); }}
          className={`flex flex-wrap gap-1.5 items-center px-2.5 py-2 border rounded-lg bg-white cursor-text min-h-[42px] ${open ? "border-neutral-400 ring-1 ring-neutral-200" : "border-neutral-300 hover:border-neutral-400"}`}
        >
          {selected.map((s) => (
            <span key={s} className="flex items-center gap-1 text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full border border-neutral-200">
              {s}
              <button
                onMouseDown={(e) => { e.stopPropagation(); remove(s); }}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X size={9} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length === 0 ? "Search teams…" : ""}
            className="flex-1 min-w-[80px] text-xs text-neutral-800 focus:outline-none bg-transparent placeholder:text-neutral-400"
          />
          <ChevronDown size={13} className="text-neutral-400 shrink-0 ml-auto" />
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-md z-20 py-1.5 max-h-52 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt}
                  onMouseDown={(e) => { e.preventDefault(); add(opt); }}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 text-left"
                >
                  {opt}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-neutral-400">
                {query ? `No match for "${query}"` : "All options selected"}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Type to filter. Enter selects the first match. Backspace removes last chip when input is empty. Escape closes dropdown.
      </div>
    </div>
  );
}
