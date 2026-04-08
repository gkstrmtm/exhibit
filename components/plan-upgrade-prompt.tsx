/**
 * Plan Upgrade Prompt
 * Category: Billing
 * Tags: upgrade, plan, prompt, upsell, feature-gate, billing
 * Description: An in-context plan upgrade prompt that appears when a user tries to access a gated feature. Shows which plan unlocks the feature, key benefits of upgrading, and a primary CTA. A dismiss option is available. Demonstrates the inline feature-gate upgrade nudge pattern — less disruptive than a modal.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/plan-upgrade-prompt.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Lock, Sparkles, X, Check } from "lucide-react";

const BENEFITS = [
  "Unlimited team members",
  "Advanced analytics & exports",
  "Priority support (< 4h SLA)",
  "Custom domain + white-labeling",
  "SSO and audit logs",
];

export default function PlanUpgradePrompt() {
  const [dismissed, setDismissed] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (dismissed) return (
    <div className="bg-neutral-100 border border-dashed border-neutral-300 rounded-xl p-4 w-full max-w-xs text-center">
      <div className="text-xs text-neutral-400">Prompt dismissed.</div>
      <button onClick={() => setDismissed(false)} className="text-[10px] text-blue-600 hover:underline mt-1">Show again</button>
    </div>
  );

  if (clicked) return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5 w-full max-w-xs text-center space-y-2">
      <Sparkles size={20} className="text-violet-500 mx-auto" strokeWidth={1.5} />
      <div className="text-sm font-semibold text-neutral-900">Upgrade started!</div>
      <div className="text-xs text-neutral-500">You'd be redirected to the billing portal.</div>
      <button onClick={() => setClicked(false)} className="text-[10px] text-blue-600 hover:underline">Back</button>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 w-full max-w-xs">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Lock size={12} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Pro feature</div>
            <div className="text-[10px] text-neutral-500">Advanced analytics</div>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-neutral-400 hover:text-neutral-600 mt-0.5">
          <X size={13} />
        </button>
      </div>

      {/* Benefits */}
      <div className="space-y-1.5 mb-3">
        {BENEFITS.map(b => (
          <div key={b} className="flex items-start gap-1.5">
            <Check size={11} className="text-violet-500 shrink-0 mt-0.5" strokeWidth={2.5} />
            <span className="text-[11px] text-neutral-700">{b}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex gap-2">
        <button
          onClick={() => setClicked(true)}
          className="flex-1 text-xs font-semibold bg-violet-600 text-white rounded-lg py-1.5 hover:bg-violet-500 transition-colors"
        >
          Upgrade to Pro
        </button>
        <button onClick={() => setDismissed(true)} className="text-xs text-neutral-500 hover:text-neutral-700 px-2">
          Later
        </button>
      </div>
    </div>
  );
}
