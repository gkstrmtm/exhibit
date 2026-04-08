/**
 * Color Mode Toggle
 * Category: Inputs
 * Tags: dark-mode, light-mode, system, toggle, theme, 3-way
 * Description: A segmented 3-way toggle for Light, System, and Dark mode. The active mode is highlighted with a sliding pill indicator. Selecting a mode previews a mini UI swatch with the corresponding color palette. Animated indicator slides smoothly between modes.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/color-mode-toggle.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Sun, Monitor, Moon } from "lucide-react";

const MODES = [
  { id: "light", Icon: Sun, label: "Light" },
  { id: "system", Icon: Monitor, label: "System" },
  { id: "dark", Icon: Moon, label: "Dark" },
] as const;

type Mode = typeof MODES[number]["id"];

const PREVIEW: Record<Mode, { bg: string; panel: string; text: string; subtle: string }> = {
  light: { bg: "bg-white", panel: "bg-neutral-100", text: "bg-neutral-800", subtle: "bg-neutral-200" },
  system: { bg: "bg-neutral-100", panel: "bg-neutral-200", text: "bg-neutral-600", subtle: "bg-neutral-300" },
  dark: { bg: "bg-neutral-900", panel: "bg-neutral-800", text: "bg-neutral-100", subtle: "bg-neutral-700" },
};

export default function ColorModeToggle() {
  const [mode, setMode] = useState<Mode>("light");
  const idx = MODES.findIndex(m => m.id === mode);
  const p = PREVIEW[mode];

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs flex flex-col items-center gap-4">
      {/* Toggle */}
      <div className="relative flex bg-neutral-100 rounded-lg p-0.5 gap-0.5">
        <div
          className="absolute top-0.5 bottom-0.5 rounded-md bg-white border border-neutral-200 shadow-sm transition-transform duration-200"
          style={{ width: "calc(33.333% - 2px)", transform: `translateX(calc(${idx} * 100% + ${idx * 2}px))`, left: "2px" }}
        />
        {MODES.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-colors ${mode === id ? "text-neutral-800" : "text-neutral-500 hover:text-neutral-700"}`}
          >
            <Icon size={10} strokeWidth={1.5} />{label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className={`w-full rounded-xl p-3 border border-neutral-200 transition-colors duration-200 ${p.bg}`}>
        <div className="space-y-1.5">
          <div className={`h-2 rounded-full w-3/4 ${p.text}`} />
          <div className={`h-1.5 rounded-full w-1/2 ${p.subtle}`} />
          <div className={`h-8 rounded-lg w-full ${p.panel} mt-2`} />
          <div className="flex gap-1.5 mt-1">
            <div className={`h-5 rounded-md flex-1 ${p.panel}`} />
            <div className={`h-5 rounded-md w-10 ${p.text}`} />
          </div>
        </div>
      </div>

      <div className="text-[10px] text-neutral-500">
        Selected: <span className="font-medium text-neutral-700 capitalize">{mode}</span>
      </div>
    </div>
  );
}
