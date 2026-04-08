/**
 * Split Button
 * Category: Buttons
 * Tags: split-button, dropdown, alternate-action, compound, button
 * Description: A compound button with a primary action on the left and a dropdown arrow on the right that reveals alternate actions. The two halves share a visual boundary. Three split button variants are shown: Save, Publish, and Deploy — each with format or environment alternatives.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/split-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Loader2, Save, Globe, Rocket } from "lucide-react";

type Variant = { primary: string; icon: React.ElementType; color: string; alts: string[] };

const VARIANTS: Variant[] = [
  { primary: "Save draft", icon: Save, color: "bg-neutral-700 hover:bg-neutral-600", alts: ["Save and close", "Save as copy", "Export"] },
  { primary: "Publish", icon: Globe, color: "bg-blue-600 hover:bg-blue-500", alts: ["Schedule publish", "Publish to staging", "Preview"] },
  { primary: "Deploy", icon: Rocket, color: "bg-emerald-700 hover:bg-emerald-600", alts: ["Deploy to staging", "Dry run", "Cancel deploy"] },
];

function SplitBtn({ v }: { v: Variant }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [label, setLabel] = useState(v.primary);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = v.icon;

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const execute = (action: string) => {
    setLabel(action); setOpen(false); setState("loading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 1800); }, 1200);
  };

  const btnClass = `${v.color} text-white text-[10px] font-medium transition-colors`;

  return (
    <div ref={ref} className="relative flex">
      <button
        onClick={() => execute(label)}
        disabled={state !== "idle"}
        className={`${btnClass} flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-l-lg border-r border-white/20 disabled:opacity-70`}
      >
        {state === "loading" && <Loader2 size={10} strokeWidth={2} className="animate-spin" />}
        {state === "done" && <Check size={10} strokeWidth={2} />}
        {state === "idle" && <Icon size={10} strokeWidth={1.5} />}
        {state === "done" ? "Done!" : label}
      </button>
      <button
        onClick={() => setOpen(v => !v)}
        className={`${btnClass} px-1.5 rounded-r-lg`}
      >
        <ChevronDown size={10} strokeWidth={1.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 right-0 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-20">
          {v.alts.map(a => (
            <button key={a} onClick={() => execute(a)} className="w-full text-left px-3 py-1.5 text-[10px] text-neutral-700 hover:bg-neutral-50 transition-colors">
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SplitButton() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-3">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Split button variants</div>
      {VARIANTS.map(v => <SplitBtn key={v.primary} v={v} />)}
    </div>
  );
}
