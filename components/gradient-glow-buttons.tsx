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
      <button className="px-6 py-3 font-semibold text-sm text-white rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(124,58,237,0.55)] hover:scale-[1.02] transition-all">
        Get started free
      </button>
    </div>
  );
}