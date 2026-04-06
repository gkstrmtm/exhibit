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
      <div className="flex items-center gap-3 justify-center">
        <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all hover:scale-[1.02]">
          <Sparkles className="w-4 h-4" />Start for free
        </button>
        <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-neutral-700 bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-all">
          <Play className="w-4 h-4" />Watch demo
        </button>
      </div>
    </div>
  );
}