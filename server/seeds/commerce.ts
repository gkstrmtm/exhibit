export const commerceExhibits = [
  {
    slug: "three-tier-pricing",
    title: "Three-Tier Pricing Table",
    description: "Three pricing cards side by side with Starter, Pro (highlighted as Most Popular), and Enterprise tiers. Each includes feature lists and CTA buttons.",
    category: "Pricing",
    tags: ["pricing", "cards", "saas", "tiers", "plans"],
    style: "",
    code: `export default function ThreeTierPricing() {
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
          className={\`relative flex flex-col rounded-2xl bg-white border p-8 w-72 \${
            plan.popular
              ? "border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10"
              : "border-slate-200 shadow-sm"
          }\`}
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
            className={\`w-full py-3 rounded-xl font-medium text-sm transition-colors \${
              plan.popular
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }\`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#f8fafc;display:flex;align-items:center;justify-content:center;gap:1.5rem;min-height:500px;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:flex;flex-direction:column;border-radius:1rem;background:white;border:1px solid #e2e8f0;padding:2rem;width:18rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.875rem;font-weight:500;color:#64748b;margin-bottom:0.25rem">Starter</div>
      <div style="display:flex;align-items:baseline;gap:0.25rem"><span style="font-size:2.25rem;font-weight:700;color:#0f172a">$9</span><span style="color:#94a3b8;font-size:0.875rem">/mo</span></div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem">
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>5 Projects</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>10GB Storage</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Basic Analytics</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Email Support</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>API Access</div>
    </div>
    <button style="width:100%;padding:0.75rem;border-radius:0.75rem;font-weight:500;font-size:0.875rem;background:#f1f5f9;color:#334155;border:none;cursor:pointer;font-family:inherit">Get Started</button>
  </div>
  <div style="position:relative;display:flex;flex-direction:column;border-radius:1rem;background:white;border:2px solid #3b82f6;padding:2rem;width:18rem;box-shadow:0 20px 25px -5px rgba(59,130,246,0.1),0 8px 10px -6px rgba(59,130,246,0.1);transform:scale(1.05);z-index:10">
    <div style="position:absolute;top:-0.75rem;left:50%;transform:translateX(-50%);background:#2563eb;color:white;font-size:0.75rem;font-weight:600;padding:0.25rem 1rem;border-radius:9999px;white-space:nowrap">Most Popular</div>
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.875rem;font-weight:500;color:#64748b;margin-bottom:0.25rem">Pro</div>
      <div style="display:flex;align-items:baseline;gap:0.25rem"><span style="font-size:2.25rem;font-weight:700;color:#0f172a">$29</span><span style="color:#94a3b8;font-size:0.875rem">/mo</span></div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem">
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Unlimited Projects</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>100GB Storage</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Advanced Analytics</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Priority Support</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>API Access</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Custom Domains</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Team Collaboration</div>
    </div>
    <button style="width:100%;padding:0.75rem;border-radius:0.75rem;font-weight:500;font-size:0.875rem;background:#2563eb;color:white;border:none;cursor:pointer;font-family:inherit">Upgrade to Pro</button>
  </div>
  <div style="display:flex;flex-direction:column;border-radius:1rem;background:white;border:1px solid #e2e8f0;padding:2rem;width:18rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.875rem;font-weight:500;color:#64748b;margin-bottom:0.25rem">Enterprise</div>
      <div style="display:flex;align-items:baseline;gap:0.25rem"><span style="font-size:2.25rem;font-weight:700;color:#0f172a">$99</span><span style="color:#94a3b8;font-size:0.875rem">/mo</span></div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem">
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Unlimited Everything</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>1TB Storage</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Enterprise Analytics</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>24/7 Phone Support</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>Dedicated API</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>SSO & SAML</div>
      <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;color:#475569"><span style="color:#10b981">✓</span>SLA Guarantee</div>
    </div>
    <button style="width:100%;padding:0.75rem;border-radius:0.75rem;font-weight:500;font-size:0.875rem;background:#f1f5f9;color:#334155;border:none;cursor:pointer;font-family:inherit">Contact Sales</button>
  </div>
</div>`,
  },
  {
    slug: "pricing-comparison-grid",
    title: "Pricing Comparison Grid",
    description: "Full comparison table with features as rows and plans as columns. Includes checkmarks, dashes, and clean zebra striping for easy scanning.",
    category: "Pricing",
    tags: ["pricing", "comparison", "table", "grid", "features"],
    style: "",
    code: `export default function PricingComparisonGrid() {
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
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:500px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:48rem;border:1px solid #e2e8f0;border-radius:0.75rem;overflow:hidden">
    <table style="width:100%;font-size:0.875rem;border-collapse:collapse">
      <thead>
        <tr style="background:#f8fafc">
          <th style="text-align:left;padding:1rem;font-weight:500;color:#64748b">Features</th>
          <th style="padding:1rem;text-align:center"><div style="font-weight:600;color:#0f172a">Starter</div><div style="color:#94a3b8;font-size:0.75rem;margin-top:0.125rem">$9/mo</div></th>
          <th style="padding:1rem;text-align:center"><div style="font-weight:600;color:#0f172a">Pro</div><div style="color:#94a3b8;font-size:0.75rem;margin-top:0.125rem">$29/mo</div></th>
          <th style="padding:1rem;text-align:center"><div style="font-weight:600;color:#0f172a">Enterprise</div><div style="color:#94a3b8;font-size:0.75rem;margin-top:0.125rem">$99/mo</div></th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:white">
          <td style="padding:1rem;color:#334155;font-weight:500">Projects</td>
          <td style="padding:1rem;text-align:center;color:#475569">5</td>
          <td style="padding:1rem;text-align:center;color:#475569">Unlimited</td>
          <td style="padding:1rem;text-align:center;color:#475569">Unlimited</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:1rem;color:#334155;font-weight:500">Storage</td>
          <td style="padding:1rem;text-align:center;color:#475569">10GB</td>
          <td style="padding:1rem;text-align:center;color:#475569">100GB</td>
          <td style="padding:1rem;text-align:center;color:#475569">1TB</td>
        </tr>
        <tr style="background:white">
          <td style="padding:1rem;color:#334155;font-weight:500">Custom Domains</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:1rem;color:#334155;font-weight:500">Analytics</td>
          <td style="padding:1rem;text-align:center;color:#475569">Basic</td>
          <td style="padding:1rem;text-align:center;color:#475569">Advanced</td>
          <td style="padding:1rem;text-align:center;color:#475569">Enterprise</td>
        </tr>
        <tr style="background:white">
          <td style="padding:1rem;color:#334155;font-weight:500">API Access</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:1rem;color:#334155;font-weight:500">Priority Support</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
        </tr>
        <tr style="background:white">
          <td style="padding:1rem;color:#334155;font-weight:500">SSO / SAML</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:1rem;color:#334155;font-weight:500">SLA Guarantee</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:1rem;text-align:center;color:#10b981">✓</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
  },
  {
    slug: "upgrade-modal-pattern",
    title: "Upgrade Modal",
    description: "Modal overlay with current plan vs Pro comparison, key benefits, pricing, and action buttons for upgrading or dismissing.",
    category: "Commerce",
    tags: ["modal", "upgrade", "upsell", "commerce", "plans"],
    style: "",
    code: `export default function UpgradeModal() {
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
}`,
    htmlPreview: `<div style="min-height:500px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:1rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);max-width:32rem;width:100%;padding:2rem">
    <div style="text-align:center;margin-bottom:1.5rem">
      <div style="display:inline-flex;align-items:center;gap:0.5rem;background:#eff6ff;color:#2563eb;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:600;margin-bottom:0.75rem">⚡ Upgrade Available</div>
      <h2 style="font-size:1.5rem;font-weight:700;color:#0f172a;margin:0">Upgrade to Pro</h2>
      <p style="color:#64748b;font-size:0.875rem;margin:0.25rem 0 0">Unlock the full potential of your workspace</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
      <div style="border:1px solid #e2e8f0;border-radius:0.75rem;padding:1rem;text-align:center">
        <div style="font-size:0.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.25rem">Current Plan</div>
        <div style="font-weight:600;color:#334155">Starter</div>
        <div style="color:#94a3b8;font-size:0.875rem">$9/mo</div>
      </div>
      <div style="border:2px solid #3b82f6;border-radius:0.75rem;padding:1rem;text-align:center;background:rgba(239,246,255,0.5)">
        <div style="font-size:0.7rem;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.25rem">Recommended</div>
        <div style="font-weight:600;color:#0f172a">Pro</div>
        <div style="color:#2563eb;font-size:0.875rem;font-weight:500">$29/mo</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.625rem;margin-bottom:1.5rem">
      <div style="display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:#475569"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#059669;font-size:0.7rem;flex-shrink:0">✓</div>Unlimited projects & collaborators</div>
      <div style="display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:#475569"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#059669;font-size:0.7rem;flex-shrink:0">✓</div>Advanced analytics dashboard</div>
      <div style="display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:#475569"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#059669;font-size:0.7rem;flex-shrink:0">✓</div>Priority email & chat support</div>
      <div style="display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:#475569"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#059669;font-size:0.7rem;flex-shrink:0">✓</div>Custom domain mapping</div>
      <div style="display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:#475569"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#059669;font-size:0.7rem;flex-shrink:0">✓</div>99.9% uptime SLA</div>
    </div>
    <div style="text-align:center;margin-bottom:1.5rem">
      <span style="font-size:1.875rem;font-weight:700;color:#0f172a">$29</span>
      <span style="color:#94a3b8;font-size:0.875rem">/month, billed monthly</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.75rem">
      <button style="width:100%;padding:0.75rem;background:#2563eb;color:white;border-radius:0.75rem;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Upgrade Now</button>
      <button style="width:100%;padding:0.75rem;background:none;color:#94a3b8;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Maybe Later</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "checkout-summary-card",
    title: "Checkout Summary",
    description: "Order summary card with line items, subtotal, discount, total, payment method preview, and purchase button.",
    category: "Commerce",
    tags: ["checkout", "order", "summary", "payment", "commerce"],
    style: "",
    code: `export default function CheckoutSummary() {
  return (
    <div className="min-h-[500px] flex items-center justify-center bg-slate-50 p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md w-full p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-slate-800">Pro Annual Plan</div>
              <div className="text-xs text-slate-400">Billed yearly</div>
            </div>
            <div className="font-medium text-slate-800">$348.00</div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-slate-800">Priority Support</div>
              <div className="text-xs text-slate-400">Add-on</div>
            </div>
            <div className="font-medium text-slate-800">$120.00</div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4 space-y-2 mb-4">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Subtotal</span><span>$468.00</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Discount (10%)</span><span>-$46.80</span>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-slate-900">$421.20</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
          <div>
            <div className="text-sm font-medium text-slate-700">•••• •••• •••• 4242</div>
            <div className="text-xs text-slate-400">Expires 12/26</div>
          </div>
        </div>
        <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">Complete Purchase</button>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:500px;display:flex;align-items:center;justify-content:center;background:#f8fafc;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:1rem;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);border:1px solid #e2e8f0;max-width:28rem;width:100%;padding:2rem">
    <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1.5rem">Order Summary</h2>
    <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div style="font-weight:500;color:#1e293b">Pro Annual Plan</div><div style="font-size:0.75rem;color:#94a3b8">Billed yearly</div></div>
        <div style="font-weight:500;color:#1e293b">$348.00</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div style="font-weight:500;color:#1e293b">Priority Support</div><div style="font-size:0.75rem;color:#94a3b8">Add-on</div></div>
        <div style="font-weight:500;color:#1e293b">$120.00</div>
      </div>
    </div>
    <div style="border-top:1px solid #f1f5f9;padding-top:1rem;display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;color:#64748b"><span>Subtotal</span><span>$468.00</span></div>
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;color:#059669"><span>Discount (10%)</span><span>-$46.80</span></div>
    </div>
    <div style="border-top:1px solid #e2e8f0;padding-top:1rem;margin-bottom:1.5rem">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:1.125rem;font-weight:700;color:#0f172a">Total</span>
        <span style="font-size:1.5rem;font-weight:700;color:#0f172a">$421.20</span>
      </div>
    </div>
    <div style="background:#f8fafc;border-radius:0.75rem;padding:1rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.75rem">
      <div style="width:2.5rem;height:1.75rem;background:linear-gradient(to right,#2563eb,#60a5fa);border-radius:0.375rem;display:flex;align-items:center;justify-content:center;color:white;font-size:0.6rem;font-weight:700">VISA</div>
      <div>
        <div style="font-size:0.875rem;font-weight:500;color:#334155">•••• •••• •••• 4242</div>
        <div style="font-size:0.75rem;color:#94a3b8">Expires 12/26</div>
      </div>
    </div>
    <button style="width:100%;padding:0.875rem;background:#2563eb;color:white;border-radius:0.75rem;font-weight:600;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Complete Purchase</button>
  </div>
</div>`,
  },
  {
    slug: "invoice-list-pattern",
    title: "Invoice List",
    description: "Billing history table with invoice numbers, dates, amounts, status badges (Paid/Pending/Failed), and download links.",
    category: "Billing",
    tags: ["billing", "invoices", "table", "history", "payments"],
    style: "",
    code: `export default function InvoiceList() {
  const invoices = [
    { id: "INV-2024-001", date: "Jan 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-002", date: "Feb 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-003", date: "Mar 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-004", date: "Apr 15, 2024", amount: "$29.00", status: "Pending" },
    { id: "INV-2024-005", date: "May 15, 2024", amount: "$29.00", status: "Failed" },
  ];

  const statusColors: Record<string, string> = {
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Failed: "bg-red-50 text-red-700",
  };

  return (
    <div className="p-8 bg-white min-h-[400px]">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Billing History</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Download All</button>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left p-4 font-medium">Invoice</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-slate-100">
                  <td className="p-4 font-mono text-slate-700">{inv.id}</td>
                  <td className="p-4 text-slate-500">{inv.date}</td>
                  <td className="p-4 font-medium text-slate-700">{inv.amount}</td>
                  <td className="p-4">
                    <span className={\`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium \${statusColors[inv.status]}\`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a href="#" className="text-blue-600 text-sm hover:underline">Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:400px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:48rem;margin:0 auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0">Billing History</h2>
      <button style="font-size:0.875rem;color:#2563eb;font-weight:500;background:none;border:none;cursor:pointer;font-family:inherit">Download All</button>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:0.75rem;overflow:hidden">
      <table style="width:100%;font-size:0.875rem;border-collapse:collapse">
        <thead>
          <tr style="background:#f8fafc">
            <th style="text-align:left;padding:1rem;font-weight:500;color:#64748b;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em">Invoice</th>
            <th style="text-align:left;padding:1rem;font-weight:500;color:#64748b;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em">Date</th>
            <th style="text-align:left;padding:1rem;font-weight:500;color:#64748b;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em">Amount</th>
            <th style="text-align:left;padding:1rem;font-weight:500;color:#64748b;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em">Status</th>
            <th style="text-align:right;padding:1rem;font-weight:500;color:#64748b;font-size:0.7rem"></th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:1rem;font-family:monospace;color:#334155;font-size:0.85rem">INV-2024-001</td>
            <td style="padding:1rem;color:#64748b">Jan 15, 2024</td>
            <td style="padding:1rem;font-weight:500;color:#334155">$29.00</td>
            <td style="padding:1rem"><span style="display:inline-flex;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#ecfdf5;color:#047857">Paid</span></td>
            <td style="padding:1rem;text-align:right"><a href="#" style="color:#2563eb;font-size:0.875rem;text-decoration:none">Download</a></td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:1rem;font-family:monospace;color:#334155;font-size:0.85rem">INV-2024-002</td>
            <td style="padding:1rem;color:#64748b">Feb 15, 2024</td>
            <td style="padding:1rem;font-weight:500;color:#334155">$29.00</td>
            <td style="padding:1rem"><span style="display:inline-flex;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#ecfdf5;color:#047857">Paid</span></td>
            <td style="padding:1rem;text-align:right"><a href="#" style="color:#2563eb;font-size:0.875rem;text-decoration:none">Download</a></td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:1rem;font-family:monospace;color:#334155;font-size:0.85rem">INV-2024-003</td>
            <td style="padding:1rem;color:#64748b">Mar 15, 2024</td>
            <td style="padding:1rem;font-weight:500;color:#334155">$29.00</td>
            <td style="padding:1rem"><span style="display:inline-flex;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#ecfdf5;color:#047857">Paid</span></td>
            <td style="padding:1rem;text-align:right"><a href="#" style="color:#2563eb;font-size:0.875rem;text-decoration:none">Download</a></td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:1rem;font-family:monospace;color:#334155;font-size:0.85rem">INV-2024-004</td>
            <td style="padding:1rem;color:#64748b">Apr 15, 2024</td>
            <td style="padding:1rem;font-weight:500;color:#334155">$29.00</td>
            <td style="padding:1rem"><span style="display:inline-flex;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#fffbeb;color:#b45309">Pending</span></td>
            <td style="padding:1rem;text-align:right"><a href="#" style="color:#2563eb;font-size:0.875rem;text-decoration:none">Download</a></td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:1rem;font-family:monospace;color:#334155;font-size:0.85rem">INV-2024-005</td>
            <td style="padding:1rem;color:#64748b">May 15, 2024</td>
            <td style="padding:1rem;font-weight:500;color:#334155">$29.00</td>
            <td style="padding:1rem"><span style="display:inline-flex;padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#fef2f2;color:#b91c1c">Failed</span></td>
            <td style="padding:1rem;text-align:right"><a href="#" style="color:#2563eb;font-size:0.875rem;text-decoration:none">Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },
  {
    slug: "usage-meter-pattern",
    title: "Usage Meter Pattern",
    description: "API usage card with progress bar, endpoint breakdown table, and warning about approaching limits.",
    category: "Billing",
    tags: ["usage", "meter", "progress", "api", "billing"],
    style: "",
    code: `export default function UsageMeter() {
  const endpoints = [
    { name: "/api/users", requests: "3,120", pct: "42.7%" },
    { name: "/api/search", requests: "2,840", pct: "38.9%" },
    { name: "/api/exports", requests: "1,340", pct: "18.4%" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-[400px] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg w-full p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">API Usage</h3>
            <p className="text-sm text-slate-400 mt-0.5">Current billing period</p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">Jan 1 – Jan 31</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">7,300 / 10,000 requests</span>
            <span className="text-slate-400">73%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: "73%" }} />
          </div>
        </div>
        <div className="mt-6 mb-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Breakdown by Endpoint</div>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div key={ep.name} className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                <span className="font-mono text-slate-600">{ep.name}</span>
                <div className="flex gap-4">
                  <span className="text-slate-700 font-medium">{ep.requests}</span>
                  <span className="text-slate-400 w-12 text-right">{ep.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">⚠</span>
          <p className="text-sm text-amber-700">You'll reach your limit in ~8 days at current usage.</p>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#f8fafc;min-height:400px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.05);max-width:32rem;width:100%;padding:2rem">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem">
      <div>
        <h3 style="font-size:1.125rem;font-weight:700;color:#0f172a;margin:0">API Usage</h3>
        <p style="font-size:0.875rem;color:#94a3b8;margin:0.125rem 0 0">Current billing period</p>
      </div>
      <span style="font-size:0.75rem;font-family:monospace;color:#94a3b8;background:#f8fafc;padding:0.25rem 0.5rem;border-radius:0.25rem">Jan 1 – Jan 31</span>
    </div>
    <div style="margin-bottom:0.5rem">
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;margin-bottom:0.5rem">
        <span style="font-weight:500;color:#334155">7,300 / 10,000 requests</span>
        <span style="color:#94a3b8">73%</span>
      </div>
      <div style="width:100%;background:#f1f5f9;border-radius:9999px;height:0.75rem;overflow:hidden">
        <div style="background:#3b82f6;height:0.75rem;border-radius:9999px;width:73%"></div>
      </div>
    </div>
    <div style="margin-top:1.5rem;margin-bottom:1rem">
      <div style="font-size:0.7rem;font-weight:500;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">Breakdown by Endpoint</div>
      <div style="display:flex;flex-direction:column">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.875rem;padding:0.5rem 0;border-bottom:1px solid #f8fafc">
          <span style="font-family:monospace;color:#475569">/api/users</span>
          <div style="display:flex;gap:1rem"><span style="color:#334155;font-weight:500">3,120</span><span style="color:#94a3b8;width:3rem;text-align:right">42.7%</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.875rem;padding:0.5rem 0;border-bottom:1px solid #f8fafc">
          <span style="font-family:monospace;color:#475569">/api/search</span>
          <div style="display:flex;gap:1rem"><span style="color:#334155;font-weight:500">2,840</span><span style="color:#94a3b8;width:3rem;text-align:right">38.9%</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.875rem;padding:0.5rem 0;border-bottom:1px solid #f8fafc">
          <span style="font-family:monospace;color:#475569">/api/exports</span>
          <div style="display:flex;gap:1rem"><span style="color:#334155;font-weight:500">1,340</span><span style="color:#94a3b8;width:3rem;text-align:right">18.4%</span></div>
        </div>
      </div>
    </div>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:0.75rem;padding:0.75rem;margin-top:1rem;display:flex;align-items:flex-start;gap:0.5rem">
      <span style="color:#f59e0b;margin-top:0.125rem">⚠</span>
      <p style="font-size:0.875rem;color:#b45309;margin:0">You'll reach your limit in ~8 days at current usage.</p>
    </div>
  </div>
</div>`,
  },
  {
    slug: "usage-based-pricing",
    title: "Usage-Based Pricing",
    description: "Tiered usage pricing card with a rate table and an interactive-looking cost calculator showing estimated monthly spend.",
    category: "Pricing",
    tags: ["pricing", "usage", "tiers", "calculator", "api"],
    style: "",
    code: `export default function UsageBasedPricing() {
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
}`,
    htmlPreview: `<div style="padding:2rem;background:#f8fafc;min-height:500px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.05);max-width:32rem;width:100%;padding:2rem">
    <h3 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 0.25rem">Usage-Based Pricing</h3>
    <p style="font-size:0.875rem;color:#94a3b8;margin:0 0 1.5rem">Pay only for what you use. Volume discounts included.</p>
    <div style="border:1px solid #e2e8f0;border-radius:0.75rem;overflow:hidden;margin-bottom:2rem">
      <table style="width:100%;font-size:0.875rem;border-collapse:collapse">
        <thead>
          <tr style="background:#f8fafc">
            <th style="text-align:left;padding:0.75rem;font-size:0.7rem;font-weight:500;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">Requests</th>
            <th style="text-align:right;padding:0.75rem;font-size:0.7rem;font-weight:500;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:0.75rem;color:#334155">0 – 1,000</td>
            <td style="padding:0.75rem;text-align:right;font-weight:500;color:#0f172a">Free</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:0.75rem;color:#334155">1,001 – 10,000</td>
            <td style="padding:0.75rem;text-align:right;font-weight:500;color:#0f172a">$0.01 / req</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:0.75rem;color:#334155">10,001 – 100,000</td>
            <td style="padding:0.75rem;text-align:right;font-weight:500;color:#0f172a">$0.005 / req</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9">
            <td style="padding:0.75rem;color:#334155">100,001+</td>
            <td style="padding:0.75rem;text-align:right;font-weight:500;color:#0f172a">$0.002 / req</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="background:#f8fafc;border-radius:0.75rem;padding:1.5rem">
      <div style="font-size:0.7rem;font-weight:500;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">Cost Calculator</div>
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="flex:1;background:white;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.625rem 1rem;font-size:0.875rem;color:#334155;font-weight:500">~9,500 requests/month</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span style="font-size:0.875rem;color:#64748b">Estimated monthly</span>
        <span style="font-size:1.5rem;font-weight:700;color:#0f172a">~$45</span>
      </div>
    </div>
  </div>
</div>`,
  },
];
