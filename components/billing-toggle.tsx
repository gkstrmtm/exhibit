/**
 * Monthly / Annual Toggle
 * Category: Pricing
 * Tags: pricing, toggle, annual, monthly, billing cycle
 * Description: Pill toggle that switches between monthly and annual pricing, showing the discount percentage on annual. Affects displayed prices below.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/billing-toggle.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function BillingToggle() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-full">
        {["Monthly","Annual"].map(opt => (
          <button key={opt} onClick={() => setAnnual(opt === "Annual")} className={`px-5 py-1.5 text-sm rounded-full font-medium transition-all ${(opt === "Annual") === annual ? "bg-white shadow text-neutral-900" : "text-neutral-500"}`}>
            {opt}{opt === "Annual" && <span className="ml-1.5 text-xs text-green-600 font-semibold">-20%</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        {[{ name: "Pro", mo: 49, yr: 39 },{ name: "Team", mo: 99, yr: 79 }].map(p => (
          <div key={p.name} className="bg-white border border-neutral-100 rounded-xl p-5 text-center w-36">
            <div className="text-sm font-semibold text-neutral-900 mb-2">{p.name}</div>
            <div className="text-2xl font-bold text-neutral-900">{annual ? p.yr : p.mo}</div>
            <div className="text-xs text-neutral-400">/month</div>
          </div>
        ))}
      </div>
    </div>
  );
}