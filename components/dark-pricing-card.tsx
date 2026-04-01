/**
 * Dark Mode Pricing Card
 * Category: Cards
 * Tags: pricing, dark, card, saas, gradient
 * Description: Elegant dark pricing card with gradient accent border and feature checklist.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dark-pricing-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DarkPricingCard() {
  const features = ["Unlimited projects", "Priority support", "Custom domains", "Analytics dashboard", "Team collaboration"];

  return (
    <div className="p-12 bg-neutral-950 flex items-center justify-center min-h-[500px]">
      <div className="relative w-80 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl" />
        <div className="relative border border-white/10 rounded-2xl bg-neutral-900/80 backdrop-blur-sm p-8">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">Pro Plan</div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-bold text-white tracking-tight">$29</span>
            <span className="text-neutral-500 text-sm">/month</span>
          </div>
          <div className="space-y-3 mb-8">
            {features.map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">✓</div>
                {f}
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}