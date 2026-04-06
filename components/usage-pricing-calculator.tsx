/**
 * Usage-Based Pricing Calculator
 * Category: Pricing
 * Tags: pricing, usage, pay-as-you-go, calculator, tiers
 * Description: Pay-as-you-go pricing display with a slider, computed cost, and tier breakdown. Common for API and storage billing models.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/usage-pricing-calculator.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function UsageBasedPricing() {
  const [calls, setCalls] = useState(50);
  const cost = calls <= 100 ? 0 : ((calls - 100) * 0.001).toFixed(2);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-6 max-w-xs space-y-5">
      <div>
        <div className="text-sm font-semibold text-neutral-900">API calls / month</div>
        <div className="text-3xl font-bold text-neutral-900 mt-1">{calls}k</div>
      </div>
      <input type="range" min={10} max={500} step={10} value={calls} onChange={e => setCalls(+e.target.value)} className="w-full accent-neutral-900" />
      <div className="bg-neutral-50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-neutral-500">First 100k</span><span className="text-neutral-900 font-medium">Free</span></div>
        <div className="flex justify-between"><span className="text-neutral-500">Over 100k</span><span className="text-neutral-900 font-medium">$0.001 / call</span></div>
        <div className="pt-1 border-t border-neutral-200 flex justify-between font-semibold"><span>Estimated cost</span><span>{calls <= 100 ? "Free" : `$${cost}`}</span></div>
      </div>
    </div>
  );
}