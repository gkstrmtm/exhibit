/**
 * Data Export Button
 * Category: Buttons
 * Tags: export, csv, json, download, format-selector, data
 * Description: A compound export button with a format selector. The primary button shows the selected format label and triggers a mock export. A secondary chevron button opens a dropdown to switch between CSV, JSON, and Excel (.xlsx) formats. Export triggers a 1.5s loading state then a success state that resets after 2s.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/data-export-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, Check, Loader2, FileText, FileJson, Sheet } from "lucide-react";

const FORMATS = [
  { id: "csv", label: "CSV", icon: FileText, ext: ".csv" },
  { id: "json", label: "JSON", icon: FileJson, ext: ".json" },
  { id: "xlsx", label: "Excel", icon: Sheet, ext: ".xlsx" },
] as const;

type Format = typeof FORMATS[number]["id"];
type State = "idle" | "loading" | "done";

export default function DataExportButton() {
  const [format, setFormat] = useState<Format>("csv");
  const [dropOpen, setDropOpen] = useState(false);
  const [state, setState] = useState<State>("idle");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropOpen) return;
    const h = (e: MouseEvent) => { if (!dropRef.current?.contains(e.target as Node)) setDropOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [dropOpen]);

  const exportFn = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  const selected = FORMATS.find(f => f.id === format)!;
  const SelectedIcon = selected.icon;

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="text-[10px] text-neutral-500">Export data in your preferred format</div>

      {/* Compound button */}
      <div className="relative flex" ref={dropRef}>
        {/* Main button */}
        <button
          onClick={exportFn}
          disabled={state === "loading"}
          className={`flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-l-lg text-[11px] font-medium border-r-0 border transition-colors ${state === "done" ? "bg-emerald-600 text-white border-emerald-600" : "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-700 hover:border-neutral-700 disabled:bg-neutral-400 disabled:border-neutral-400"}`}
        >
          {state === "loading" && <Loader2 size={11} strokeWidth={2} className="animate-spin" />}
          {state === "done" && <Check size={11} strokeWidth={2} />}
          {state === "idle" && <Download size={11} strokeWidth={1.5} />}
          {state === "done" ? "Exported!" : `Export ${selected.label}`}
        </button>

        {/* Chevron */}
        <button
          onClick={() => setDropOpen(v => !v)}
          className="px-2 py-2 rounded-r-lg bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-700 transition-colors border-l border-l-white/20"
        >
          <ChevronDown size={11} strokeWidth={1.5} className={`transition-transform ${dropOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown */}
        {dropOpen && (
          <div className="absolute top-full mt-1.5 right-0 w-32 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-20">
            {FORMATS.map(f => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => { setFormat(f.id); setDropOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] transition-colors ${format === f.id ? "text-neutral-800 font-medium" : "text-neutral-600 hover:bg-neutral-50"}`}
                >
                  <Icon size={10} strokeWidth={1.5} className="text-neutral-400" />
                  {f.label}
                  <span className="ml-auto text-[8px] font-mono text-neutral-400">{f.ext}</span>
                  {format === f.id && <Check size={9} strokeWidth={2} className="text-neutral-500" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="text-[9px] text-neutral-400">
        <span className="font-medium text-neutral-600">1,284 rows</span> will be exported as <span className="font-mono">{selected.ext}</span>
      </div>
    </div>
  );
}
