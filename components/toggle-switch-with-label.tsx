/**
 * Toggle Switch with Label
 * Category: Inputs
 * Tags: toggle, switch, settings, label, description, on-off
 * Description: Settings-style toggle list: each row has a label, a secondary description, and a toggle switch on the right. Toggling one switch doesn't affect others. Demonstrates the settings-row toggle pattern used in preference panels and feature flags UIs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/toggle-switch-with-label.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";

interface Setting { id: string; label: string; description: string; initial: boolean; badge?: string; }

const SETTINGS: Setting[] = [
  { id: "email", label: "Email notifications", description: "Receive updates on activity in your workspace", initial: true },
  { id: "weekly", label: "Weekly digest", description: "Summary of the week sent every Monday morning", initial: false },
  { id: "mobile", label: "Push notifications", description: "Alerts sent to your mobile devices", initial: true },
  { id: "marketing", label: "Product updates", description: "News about new features and improvements", initial: false, badge: "Optional" },
  { id: "api", label: "API usage alerts", description: "Notify when you reach 80% of your monthly limit", initial: true, badge: "Pro" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${on ? "bg-neutral-800" : "bg-neutral-300"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function ToggleSwitchWithLabel() {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map((s) => [s.id, s.initial]))
  );

  function toggle(id: string) {
    setStates((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Notification preferences
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden divide-y divide-neutral-100">
        {SETTINGS.map((s) => (
          <div key={s.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-800">{s.label}</span>
                {s.badge && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-500 uppercase tracking-wide">
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-4">{s.description}</p>
            </div>
            <Toggle on={states[s.id]} onToggle={() => toggle(s.id)} />
          </div>
        ))}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Each toggle is independent. The switch track uses neutral-800 to avoid over-branding settings.
      </div>
    </div>
  );
}
