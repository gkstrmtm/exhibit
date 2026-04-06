/**
 * Feature Comparison Table
 * Category: Pricing
 * Tags: pricing, comparison, features, table, plans
 * Description: Side-by-side feature matrix comparing Free, Pro, and Team plans. Check marks, dashes, and custom values per cell. Standard SaaS pricing pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/feature-comparison-table.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function FeatureComparisonTable() {
  const features = [
    { name: "Exhibits", free: "10", pro: "Unlimited", team: "Unlimited" },
    { name: "Collections", free: "2", pro: "20", team: "Unlimited" },
    { name: "AI export", free: "—", pro: "✓", team: "✓" },
    { name: "Team seats", free: "1", pro: "1", team: "Up to 20" },
    { name: "Priority support", free: "—", pro: "—", team: "✓" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-md text-sm">
      <div className="grid grid-cols-4 gap-0 border-b border-neutral-100 bg-neutral-50">
        <div className="p-3 text-xs font-medium text-neutral-400">Feature</div>
        {["Free","Pro","Team"].map(p => <div key={p} className="p-3 text-xs font-semibold text-neutral-900 text-center">{p}</div>)}
      </div>
      {features.map(f => (
        <div key={f.name} className="grid grid-cols-4 border-b border-neutral-50 last:border-0">
          <div className="p-3 text-xs text-neutral-600">{f.name}</div>
          {[f.free, f.pro, f.team].map((v, i) => (
            <div key={i} className={`p-3 text-xs text-center ${v === "✓" ? "text-green-600 font-bold" : v === "—" ? "text-neutral-300" : "text-neutral-700"}`}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}