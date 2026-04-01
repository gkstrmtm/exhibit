/**
 * Pricing Comparison Grid
 * Category: Pricing
 * Tags: pricing, comparison, table, grid, features
 * Description: Full comparison table with features as rows and plans as columns. Includes checkmarks, dashes, and clean zebra striping for easy scanning.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/pricing-comparison-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function PricingComparisonGrid() {
  const plans = ["Starter", "Pro", "Enterprise"];
  const prices = ["$9/mo", "$29/mo", "$99/mo"];
  const features = [
    { name: "Projects", values: ["5", "Unlimited", "Unlimited"] },
    { name: "Storage", values: ["10GB", "100GB", "1TB"] },
    { name: "Custom Domains", values: [false, true, true] },
    { name: "Analytics", values: ["Basic", "Advanced", "Enterprise"] },
    { name: "API Access", values: [true, true, true] },
    { name: "Priority Support", values: [false, true, true] },
    { name: "SSO / SAML", values: [false, false, true] },
    { name: "SLA Guarantee", values: [false, false, true] },
  ];

  return (
    <div className="p-8 bg-white min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left p-4 font-medium text-slate-500">Features</th>
              {plans.map((plan, i) => (
                <th key={plan} className="p-4 text-center">
                  <div className="font-semibold text-slate-900">{plan}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{prices[i]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={feature.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="p-4 text-slate-700 font-medium">{feature.name}</td>
                {feature.values.map((val, j) => (
                  <td key={j} className="p-4 text-center text-slate-600">
                    {val === true ? <span className="text-emerald-500">✓</span> : val === false ? <span className="text-slate-300">—</span> : val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}