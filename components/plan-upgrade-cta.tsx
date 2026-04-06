/**
 * Plan Upgrade CTA
 * Category: Billing
 * Tags: upgrade, billing, CTA, plan, upsell
 * Description: Inline upgrade prompt that appears when a usage limit is near. Feature highlights, price badge, and a solid Upgrade button with ghost Dismiss.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/plan-upgrade-cta.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function PlanUpgradeCTA() {
  return (
    <div className="bg-neutral-950 rounded-xl p-5 max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-white">You're at 84% of your API limit</div>
          <div className="text-xs text-neutral-400 mt-0.5">Upgrade to Pro before you hit the cap</div>
        </div>
        <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">⚠ Soon</span>
      </div>
      <ul className="space-y-1.5 mb-4">
        {["500k API calls / month","Unlimited team seats","Priority support"].map(f => (
          <li key={f} className="flex items-center gap-2 text-xs text-neutral-300">
            <span className="text-green-400">✓</span> {f}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <button className="flex-1 py-2 text-sm bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100">Upgrade to Pro — $49/mo</button>
        <button className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-300">Dismiss</button>
      </div>
    </div>
  );
}