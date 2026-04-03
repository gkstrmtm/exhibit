/**
 * Hero CTA Buttons
 * Category: Buttons
 * Tags: hero, cta, marketing, landing, conversion, pair
 * Description: Marketing-grade call-to-action buttons for landing pages and hero sections. Accompanies the single primary CTA with a secondary ghost — applying the 60-30-10 rule at the macro layout level.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/hero-cta-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroCtaButtons() {
  return (
    <div className="bg-white flex flex-col gap-12 p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Centered hero pair</div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all hover:scale-[1.02] shadow-[0_2px_12px_rgba(37,99,235,0.25)]">
            <Sparkles className="w-4 h-4" />Start for free
          </button>
          <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-neutral-700 bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-all">
            <Play className="w-4 h-4" />Watch demo
          </button>
        </div>
        <p className="text-xs text-neutral-400">No credit card required · Free plan forever</p>
      </div>
      <div className="flex flex-col items-start gap-6">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Left-aligned, dark bg</div>
        <div className="bg-neutral-950 rounded-2xl p-8 w-full flex flex-col items-start gap-4">
          <div className="text-xl font-bold text-white font-display">Build faster. Ship better.</div>
          <p className="text-sm text-neutral-400 max-w-xs">A component library for teams who care about craft. Every pattern production-ready.</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors">
              Browse components <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/70 rounded-xl border border-white/10 hover:bg-white/5 hover:text-white transition-all">
              Read the docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}