/**
 * Free Trial Banner
 * Category: Onboarding
 * Tags: trial, banner, countdown, onboarding, upgrade
 * Description: Countdown banner showing days remaining on a free trial. Progress dots, upgrade CTA, and a dismiss link. Inline, non-modal pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/trial-banner.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TrialBanner() {
  const daysLeft = 7;
  return (
    <div className="bg-neutral-950 text-white rounded-xl px-5 py-4 flex items-center gap-4 max-w-lg">
      <div className="flex gap-1 shrink-0">
        {[...Array(14)].map((_, i) => (
          <div key={i} className={`w-1.5 h-5 rounded-full ${i < 14 - daysLeft ? "bg-neutral-700" : "bg-amber-400"}`} />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{daysLeft} days left in your trial</div>
        <div className="text-xs text-neutral-400 mt-0.5">Upgrade to keep access to all features</div>
      </div>
      <button className="shrink-0 px-3 py-1.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-lg hover:bg-amber-300">Upgrade</button>
    </div>
  );
}