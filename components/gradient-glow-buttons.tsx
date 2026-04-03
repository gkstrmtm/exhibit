/**
 * Gradient + Glow Buttons
 * Category: Buttons
 * Tags: gradient, glow, cta, hero, marketing, 10-percent-accent
 * Description: High-impact CTAs with gradient backgrounds and subtle glow shadows. Reserve for hero sections and single-focus conversion moments — never scatter these. The 10% accent in the 60-30-10 system.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/gradient-glow-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function GradientGlowButtons() {
  return (
    <div className="p-10 bg-neutral-950 flex flex-col gap-8 items-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-3 font-semibold text-sm text-white rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(124,58,237,0.55)] hover:scale-[1.02] transition-all duration-200">
          Get started free
        </button>
        <button className="px-6 py-3 font-semibold text-sm text-white rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:shadow-[0_0_28px_rgba(244,63,94,0.5)] hover:scale-[1.02] transition-all duration-200">
          Start trial
        </button>
        <button className="px-6 py-3 font-semibold text-sm text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] hover:scale-[1.02] transition-all duration-200">
          Go Pro
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="relative px-8 py-3.5 font-bold text-sm text-white rounded-xl overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-700" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 transition-opacity" />
          <span className="relative flex items-center gap-2">Launch product →</span>
        </button>
        <button className="px-8 py-3.5 font-bold text-sm rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
          Read the docs
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <button className="px-6 py-3 font-semibold text-sm rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 transition-colors shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          Light on dark
        </button>
        <button className="px-6 py-3 font-semibold text-sm rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm">
          Ghost on dark
        </button>
      </div>
    </div>
  );
}