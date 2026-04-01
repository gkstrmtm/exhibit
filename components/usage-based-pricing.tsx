/**
 * Usage-Based Pricing
 * Category: Pricing
 * Tags: pricing, usage, tiers, calculator, api
 * Description: Tiered usage pricing card with a rate table and an interactive-looking cost calculator showing estimated monthly spend.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/usage-based-pricing.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UsageBasedPricing() {
  const tiers = [
    { range: "0 – 1,000", rate: "Free" },
    { range: "1,001 – 10,000", rate: "$0.01 / req" },
    { range: "10,001 – 100,000", rate: "$0.005 / req" },
    { range: "100,001+", rate: "$0.002 / req" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-[500px] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg w-full p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Usage-Based Pricing</h3>
        <p className="text-sm text-slate-400 mb-6">Pay only for what you use. Volume discounts included.</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Requests</th>
                <th className="text-right p-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="p-3 text-slate-700">{tier.range}</td>
                  <td className="p-3 text-right font-medium text-slate-900">{tier.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Cost Calculator</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium">~9,500 requests/month</div>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-slate-500">Estimated monthly</span>
            <span className="text-2xl font-bold text-slate-900">~$45</span>
          </div>
        </div>
      </div>
    </div>
  );
}