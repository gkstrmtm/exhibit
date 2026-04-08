/**
 * Color Picker Popover
 * Category: Inputs
 * Tags: color-picker, swatch, popover, hex, palette
 * Description: A swatch-grid color picker in a popover. Clicking the color preview swatch opens the popover with 24 preset swatches plus a hex code input field. The selected color updates the trigger preview instantly. Pressing Enter in the hex field or clicking a swatch selects the color and closes the popover.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/color-picker-popover.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

const SWATCHES = [
  "#ef4444","#f97316","#f59e0b","#eab308","#84cc16","#22c55e",
  "#10b981","#14b8a6","#06b6d4","#3b82f6","#6366f1","#8b5cf6",
  "#a855f7","#d946ef","#ec4899","#f43f5e","#78716c","#6b7280",
  "#94a3b8","#0f172a","#1e293b","#334155","#e2e8f0","#ffffff",
];

function isValidHex(v: string) { return /^#[0-9a-fA-F]{6}$/.test(v); }

export default function ColorPickerPopover() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#6366f1");
  const [hex, setHex] = useState("#6366f1");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const pick = (c: string) => { setColor(c); setHex(c); setOpen(false); };

  const commitHex = () => {
    const v = hex.startsWith("#") ? hex : "#" + hex;
    if (isValidHex(v)) { setColor(v); setHex(v); setOpen(false); }
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="text-[10px] text-neutral-500 text-center">Click the swatch to pick a color</div>

      <div ref={ref} className="relative">
        {/* Trigger swatch */}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2.5 px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
        >
          <div className="w-5 h-5 rounded-md border border-neutral-200 shadow-sm" style={{ background: color }} />
          <span className="text-[11px] font-mono text-neutral-600">{color}</span>
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-3 z-20 w-[176px]">
            <div className="grid grid-cols-6 gap-1.5 mb-3">
              {SWATCHES.map(s => (
                <button
                  key={s}
                  onClick={() => pick(s)}
                  className="w-6 h-6 rounded-md border border-neutral-100 flex items-center justify-center transition-transform hover:scale-110 relative"
                  style={{ background: s }}
                  title={s}
                >
                  {color === s && (
                    <Check size={10} strokeWidth={3} className={s === "#ffffff" || s === "#e2e8f0" ? "text-neutral-500" : "text-white"} />
                  )}
                </button>
              ))}
            </div>

            {/* Hex input */}
            <div className="flex gap-1.5">
              <input
                className="flex-1 px-2 py-1 text-[10px] font-mono border border-neutral-200 rounded-md outline-none focus:border-neutral-400"
                value={hex}
                onChange={e => setHex(e.target.value)}
                onKeyDown={e => e.key === "Enter" && commitHex()}
                maxLength={7}
              />
              <button
                onClick={commitHex}
                className="px-2 py-1 text-[10px] font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-10 rounded-lg border border-neutral-200 transition-colors" style={{ background: color }} />
    </div>
  );
}
