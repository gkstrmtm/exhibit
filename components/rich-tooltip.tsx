/**
 * Rich Tooltip
 * Category: Feedback
 * Tags: tooltip, rich, cta, description, hover, help
 * Description: A reference set of rich tooltips that go beyond a simple label. Each tooltip contains a title, a short body description, and optionally a "Learn more" CTA link. Hover any labeled element to see the rich tooltip appear above it with smooth opacity transition.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/rich-tooltip.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { HelpCircle, Zap, Lock, Globe, ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    icon: Zap,
    label: "Auto-scale",
    tip: { title: "Auto-scaling", body: "Automatically adjusts compute resources based on incoming traffic. Scales down to save costs when idle.", cta: "Learn more" },
  },
  {
    icon: Lock,
    label: "Private mode",
    tip: { title: "Private deployment", body: "Your data never leaves your infrastructure. No telemetry, no third-party calls.", cta: "View docs" },
  },
  {
    icon: Globe,
    label: "Edge CDN",
    tip: { title: "Global Edge CDN", body: "Serves assets from 200+ PoPs worldwide. Average TTFB under 40ms for most regions.", cta: "Network map" },
  },
  {
    icon: HelpCircle,
    label: "Custom domain",
    tip: { title: "Custom domains", body: "Bring your own domain with a single CNAME record. SSL/TLS is provisioned automatically.", cta: "Setup guide" },
  },
];

function RichTip({ item }: { item: typeof ITEMS[0] }) {
  const [show, setShow] = useState(false);
  const Icon = item.icon;
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-[11px] text-neutral-700 cursor-default hover:border-neutral-300 transition-colors">
        <Icon size={11} strokeWidth={1.5} className="text-neutral-400" />
        {item.label}
      </div>

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-20 pointer-events-none">
          <div className="bg-neutral-900 text-white rounded-xl shadow-xl px-3.5 py-2.5 w-52">
            <div className="text-[11px] font-semibold mb-0.5">{item.tip.title}</div>
            <p className="text-[9px] text-neutral-400 leading-relaxed mb-2">{item.tip.body}</p>
            <div className="flex items-center gap-0.5 text-[9px] text-violet-400 font-medium">
              {item.tip.cta}
              <ArrowUpRight size={8} strokeWidth={2} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RichTooltip() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-3">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Features — hover each</div>
      <div className="flex flex-wrap gap-2">
        {ITEMS.map(item => <RichTip key={item.label} item={item} />)}
      </div>
    </div>
  );
}
