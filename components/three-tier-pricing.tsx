/**
 * Three-Tier Pricing Table
 * Category: Pricing
 * Tags: pricing, cards, saas, tiers, plans
 * Description: Three pricing cards side by side with Starter, Pro (highlighted as Most Popular), and Enterprise tiers. Each includes feature lists and CTA buttons.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/three-tier-pricing.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ThreeTierPricing() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      popular: false,
      features: ["5 Projects", "10GB Storage", "Basic Analytics", "Email Support", "API Access"],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$29",
      popular: true,
      features: ["Unlimited Projects", "100GB Storage", "Advanced Analytics", "Priority Support", "API Access", "Custom Domains", "Team Collaboration"],
      cta: "Upgrade to Pro",
    },
    {
      name: "Enterprise",
      price: "$99",
      popular: false,
      features: ["Unlimited Everything", "1TB Storage", "Enterprise Analytics", "24/7 Phone Support", "Dedicated API", "SSO & SAML", "SLA Guarantee"],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 flex items-center justify-center gap-6 min-h-[500px]">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col rounded-2xl bg-white border p-8 w-72 ${
            plan.popular
              ? "border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10"
              : "border-slate-200 shadow-sm"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most Popular
            </div>
          )}
          <div className="mb-6">
            <div className="text-sm font-medium text-slate-500 mb-1">{plan.name}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
              <span className="text-slate-400 text-sm">/mo</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3 mb-8">
            {plan.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-emerald-500 text-base">✓</span>
                {f}
              </div>
            ))}
          </div>
          <button
            className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
              plan.popular
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}