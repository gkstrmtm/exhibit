/**
 * Accordion
 * Category: Layout
 * Tags: accordion, collapsible, faq, expand, collapse, disclosure
 * Description: An accordion component where only one panel is open at a time. Each item has a question/header and an expandable answer/content panel. Clicking a header opens it and closes the previously open one. Animated chevron rotates on open/close. Five FAQ items are shown as an example.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/accordion.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  { id: 1, q: "How does billing work?", a: "You're billed monthly on the date you subscribed. Upgrades take effect immediately with prorated charges. Downgrades apply at the end of the current billing period." },
  { id: 2, q: "Can I change my plan at any time?", a: "Yes, you can upgrade or downgrade your plan at any time from the Billing settings page. Changes to the plan take effect immediately for upgrades." },
  { id: 3, q: "Is there a free trial?", a: "All plans include a 14-day free trial with no credit card required. After the trial, you'll be asked to choose a paid plan or continue on the free tier with limited features." },
  { id: 4, q: "How do I cancel my subscription?", a: "You can cancel anytime from the Billing settings page. Your account remains active until the end of the paid period. We don't offer refunds for partial months." },
  { id: 5, q: "Where is my data stored?", a: "All data is stored in ISO 27001-certified data centers in the EU and US. You can choose your preferred region in the workspace settings. Data is encrypted at rest and in transit." },
];

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-1.5">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">FAQ</div>
      {ITEMS.map(item => (
        <div key={item.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-left gap-2"
          >
            <span className="text-[10px] font-medium text-neutral-800">{item.q}</span>
            <ChevronDown
              size={12}
              strokeWidth={1.5}
              className={`flex-shrink-0 text-neutral-400 transition-transform duration-200 ${open === item.id ? "rotate-180" : ""}`}
            />
          </button>
          {open === item.id && (
            <div className="px-3.5 pb-3 pt-0 border-t border-neutral-100">
              <p className="text-[9px] text-neutral-500 leading-relaxed pt-2">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
