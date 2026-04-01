/**
 * Upgrade Modal
 * Category: Commerce
 * Tags: modal, upgrade, upsell, commerce, plans
 * Description: Modal overlay with current plan vs Pro comparison, key benefits, pricing, and action buttons for upgrading or dismissing.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/upgrade-modal-pattern.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UpgradeModal() {
  const benefits = [
    "Unlimited projects & collaborators",
    "Advanced analytics dashboard",
    "Priority email & chat support",
    "Custom domain mapping",
    "99.9% uptime SLA",
  ];

  return (
    <div className="min-h-[500px] flex items-center justify-center bg-black/50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">⚡ Upgrade Available</div>
          <h2 className="text-2xl font-bold text-slate-900">Upgrade to Pro</h2>
          <p className="text-slate-500 text-sm mt-1">Unlock the full potential of your workspace</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Plan</div>
            <div className="font-semibold text-slate-700">Starter</div>
            <div className="text-slate-400 text-sm">$9/mo</div>
          </div>
          <div className="border-2 border-blue-500 rounded-xl p-4 text-center bg-blue-50/50">
            <div className="text-xs text-blue-500 uppercase tracking-wider mb-1">Recommended</div>
            <div className="font-semibold text-slate-900">Pro</div>
            <div className="text-blue-600 text-sm font-medium">$29/mo</div>
          </div>
        </div>
        <div className="space-y-2.5 mb-6">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5 text-sm text-slate-600">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs flex-shrink-0">✓</div>
              {b}
            </div>
          ))}
        </div>
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-slate-900">$29</span>
          <span className="text-slate-400 text-sm">/month, billed monthly</span>
        </div>
        <div className="flex flex-col gap-3">
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">Upgrade Now</button>
          <button className="w-full py-3 text-slate-400 text-sm hover:text-slate-600 transition-colors">Maybe Later</button>
        </div>
      </div>
    </div>
  );
}