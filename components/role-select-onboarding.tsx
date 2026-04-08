/**
 * Role Select Onboarding
 * Category: Onboarding
 * Tags: role, onboarding, persona, selection, card, setup
 * Description: A persona/role selection step in an onboarding flow. Large clickable cards each representing a user type. Selecting a card highlights it and shows a brief tailored welcome message. A Continue button is enabled only after a selection. Demonstrates the role-selection onboarding pattern for personalizing the new-user experience.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/role-select-onboarding.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Palette, Code2, Megaphone, BarChart2, Building2 } from "lucide-react";

const ROLES = [
  { id: "designer", label: "Designer", icon: Palette, desc: "I create UI/UX and visual assets." },
  { id: "engineer", label: "Engineer", icon: Code2, desc: "I build and ship product features." },
  { id: "marketing", label: "Marketing", icon: Megaphone, desc: "I grow acquisition and retention." },
  { id: "analyst", label: "Analyst", icon: BarChart2, desc: "I work with data and insights." },
  { id: "executive", label: "Executive", icon: Building2, desc: "I set direction and strategy." },
];

const WELCOME: Record<string, string> = {
  designer: "We'll surface component libraries and design token tools first.",
  engineer: "We'll show you our API docs, code snippets, and integrations.",
  marketing: "We'll guide you to campaign tools and audience analytics.",
  analyst: "Dashboards, exports, and data connectors are ready for you.",
  executive: "We'll start with an executive overview and key metrics.",
};

export default function RoleSelectOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed && selected) return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-xs text-center space-y-2">
      <div className="text-sm font-semibold text-neutral-900">You're all set!</div>
      <div className="text-xs text-neutral-600 leading-relaxed">{WELCOME[selected]}</div>
      <button onClick={() => { setConfirmed(false); setSelected(null); }} className="text-[10px] text-blue-600 hover:underline mt-1">Change role</button>
    </div>
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      <div>
        <div className="text-sm font-semibold text-neutral-900 mb-0.5">What's your role?</div>
        <div className="text-xs text-neutral-500">We'll tailor your experience to fit.</div>
      </div>

      <div className="space-y-1.5">
        {ROLES.map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`w-full flex items-center gap-3 border rounded-xl px-3 py-2.5 text-left transition-colors
              ${selected === id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selected === id ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500"}`}>
              <Icon size={13} strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-800">{label}</div>
              <div className="text-[10px] text-neutral-400">{desc}</div>
            </div>
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => setConfirmed(true)}
        className="w-full text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 disabled:opacity-30 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
