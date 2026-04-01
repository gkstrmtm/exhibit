export const marketplaceSocialExhibits = [
  {
    slug: "product-listing-grid",
    title: "Product Listing Grid",
    description: "A responsive 2×2 grid of product cards with placeholder images, pricing badges, star ratings, and sort controls. Ideal for marketplace browse pages.",
    category: "Marketplace",
    tags: ["marketplace", "grid", "products", "cards", "ecommerce"],
    style: "",
    code: `export default function ProductListingGrid() {
  const products = [
    { name: "UI Starter Kit", creator: "Alice M.", price: "$12", rating: "4.8", badge: "Pro" },
    { name: "Icon Pack Vol.2", creator: "Ben K.", price: "$12", rating: "4.8", badge: "Free" },
    { name: "Dashboard Blocks", creator: "Sara J.", price: "$12", rating: "4.8", badge: "Pro" },
    { name: "Form Components", creator: "Dan W.", price: "$12", rating: "4.8", badge: "Free" },
  ];
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-neutral-500">Showing 4 results</span>
        <select className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Sort by: Popular</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.name} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 relative">
              <span className={\`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full \${p.badge === "Pro" ? "bg-indigo-600 text-white" : "bg-emerald-100 text-emerald-700"}\`}>{p.badge}</span>
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{p.creator}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-amber-500">★ {p.rating}</span>
                <span className="text-sm font-bold text-indigo-600">{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
    <span style="font-size:0.875rem;color:#737373">Showing 4 results</span>
    <select style="font-size:0.875rem;border:1px solid #e5e5e5;border-radius:0.5rem;padding:0.375rem 0.75rem;background:white;color:#171717;outline:none">
      <option>Sort by: Popular</option>
    </select>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
    <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:8rem;background:linear-gradient(135deg,#e0e7ff,#f3e8ff);position:relative">
        <span style="position:absolute;top:0.5rem;right:0.5rem;font-size:10px;font-weight:700;padding:2px 8px;border-radius:9999px;background:#4f46e5;color:white">Pro</span>
      </div>
      <div style="padding:0.75rem">
        <div style="font-weight:600;font-size:0.875rem;color:#171717">UI Starter Kit</div>
        <div style="font-size:0.75rem;color:#737373;margin-top:2px">Alice M.</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.5rem">
          <span style="font-size:0.75rem;color:#f59e0b">★ 4.8</span>
          <span style="font-size:0.875rem;font-weight:700;color:#4f46e5">$12</span>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:8rem;background:linear-gradient(135deg,#dbeafe,#e0e7ff);position:relative">
        <span style="position:absolute;top:0.5rem;right:0.5rem;font-size:10px;font-weight:700;padding:2px 8px;border-radius:9999px;background:#d1fae5;color:#047857">Free</span>
      </div>
      <div style="padding:0.75rem">
        <div style="font-weight:600;font-size:0.875rem;color:#171717">Icon Pack Vol.2</div>
        <div style="font-size:0.75rem;color:#737373;margin-top:2px">Ben K.</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.5rem">
          <span style="font-size:0.75rem;color:#f59e0b">★ 4.8</span>
          <span style="font-size:0.875rem;font-weight:700;color:#4f46e5">$12</span>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:8rem;background:linear-gradient(135deg,#fce7f3,#f3e8ff);position:relative">
        <span style="position:absolute;top:0.5rem;right:0.5rem;font-size:10px;font-weight:700;padding:2px 8px;border-radius:9999px;background:#4f46e5;color:white">Pro</span>
      </div>
      <div style="padding:0.75rem">
        <div style="font-weight:600;font-size:0.875rem;color:#171717">Dashboard Blocks</div>
        <div style="font-size:0.75rem;color:#737373;margin-top:2px">Sara J.</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.5rem">
          <span style="font-size:0.75rem;color:#f59e0b">★ 4.8</span>
          <span style="font-size:0.875rem;font-weight:700;color:#4f46e5">$12</span>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden">
      <div style="height:8rem;background:linear-gradient(135deg,#dcfce7,#d1fae5);position:relative">
        <span style="position:absolute;top:0.5rem;right:0.5rem;font-size:10px;font-weight:700;padding:2px 8px;border-radius:9999px;background:#d1fae5;color:#047857">Free</span>
      </div>
      <div style="padding:0.75rem">
        <div style="font-weight:600;font-size:0.875rem;color:#171717">Form Components</div>
        <div style="font-size:0.75rem;color:#737373;margin-top:2px">Dan W.</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.5rem">
          <span style="font-size:0.75rem;color:#f59e0b">★ 4.8</span>
          <span style="font-size:0.875rem;font-weight:700;color:#4f46e5">$12</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "product-detail-page",
    title: "Product Detail Page",
    description: "A split-layout product detail view with a large preview area, metadata, tech stack tags, pricing, and action buttons for marketplace items.",
    category: "Marketplace",
    tags: ["marketplace", "detail", "product", "preview", "purchase"],
    style: "",
    code: `export default function ProductDetailPage() {
  return (
    <div className="p-8 bg-white min-h-[300px] flex gap-8">
      <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl min-h-[280px] flex items-center justify-center">
        <span className="text-neutral-400 text-sm">Preview</span>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">Pro Component Pack</h2>
          <div className="flex items-center gap-2 mt-1">
            <a href="#" className="text-sm text-indigo-600 hover:underline">@designstudio</a>
            <span className="text-xs text-neutral-400">v2.1.0</span>
          </div>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed">A comprehensive collection of production-ready UI components built with modern best practices. Includes dark mode support, responsive layouts, and full accessibility.</p>
        <div className="flex gap-2 flex-wrap">
          {["React", "TypeScript", "Tailwind"].map(t => (
            <span key={t} className="text-xs px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-600 font-medium">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span>MIT License</span>
          <span>2.4k downloads</span>
        </div>
        <div className="mt-auto pt-4 border-t border-neutral-100">
          <div className="text-2xl font-bold mb-3">$24</div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">Purchase</button>
            <button className="flex-1 py-2.5 border border-neutral-200 rounded-lg font-medium text-sm hover:bg-neutral-50 transition-colors">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:300px;display:flex;gap:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="flex:1;background:linear-gradient(135deg,#eef2ff,#f3e8ff);border-radius:0.75rem;min-height:280px;display:flex;align-items:center;justify-content:center">
    <span style="color:#a3a3a3;font-size:0.875rem">Preview</span>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;gap:1rem">
    <div>
      <h2 style="font-size:1.25rem;font-weight:700;margin:0;color:#171717">Pro Component Pack</h2>
      <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem">
        <a style="font-size:0.875rem;color:#4f46e5;text-decoration:none">@designstudio</a>
        <span style="font-size:0.75rem;color:#a3a3a3">v2.1.0</span>
      </div>
    </div>
    <p style="font-size:0.875rem;color:#525252;line-height:1.6;margin:0">A comprehensive collection of production-ready UI components built with modern best practices. Includes dark mode support, responsive layouts, and full accessibility.</p>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
      <span style="font-size:0.75rem;padding:0.25rem 0.625rem;background:#f5f5f5;border-radius:9999px;color:#525252;font-weight:500">React</span>
      <span style="font-size:0.75rem;padding:0.25rem 0.625rem;background:#f5f5f5;border-radius:9999px;color:#525252;font-weight:500">TypeScript</span>
      <span style="font-size:0.75rem;padding:0.25rem 0.625rem;background:#f5f5f5;border-radius:9999px;color:#525252;font-weight:500">Tailwind</span>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;font-size:0.75rem;color:#737373">
      <span>MIT License</span>
      <span>2.4k downloads</span>
    </div>
    <div style="margin-top:auto;padding-top:1rem;border-top:1px solid #f5f5f5">
      <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.75rem;color:#171717">$24</div>
      <div style="display:flex;gap:0.75rem">
        <button style="flex:1;padding:0.625rem;background:#4f46e5;color:white;border-radius:0.5rem;font-weight:500;font-size:0.875rem;border:none;cursor:pointer">Purchase</button>
        <button style="flex:1;padding:0.625rem;background:white;border:1px solid #e5e5e5;border-radius:0.5rem;font-weight:500;font-size:0.875rem;cursor:pointer;color:#171717">Preview</button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "creator-storefront-profile",
    title: "Creator Storefront",
    description: "A creator profile storefront with cover gradient, avatar, verified badge, bio, stats row, and featured pack cards for marketplace sellers.",
    category: "Marketplace",
    tags: ["marketplace", "profile", "storefront", "creator", "avatar"],
    style: "",
    code: `export default function CreatorStorefront() {
  const packs = [
    { name: "Dashboard Kit", price: "$18", downloads: "1.2k" },
    { name: "Auth Components", price: "$8", downloads: "934" },
    { name: "Chart Widgets", price: "$14", downloads: "612" },
  ];
  return (
    <div className="bg-white min-h-[300px] overflow-hidden rounded-xl border border-neutral-200">
      <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-8 mb-4">
          <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-xl font-bold text-indigo-600">JD</div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg">Jane Doe</span>
              <span className="text-blue-500 text-sm">✓</span>
            </div>
            <span className="text-sm text-neutral-500">@janedoe</span>
          </div>
        </div>
        <p className="text-sm text-neutral-600 mb-4">Full-stack designer crafting production-ready UI kits and component systems for modern web apps.</p>
        <div className="flex gap-6 text-sm mb-6 pb-4 border-b border-neutral-100">
          <div><span className="font-bold">12</span> <span className="text-neutral-500">packs</span></div>
          <div><span className="font-bold">847</span> <span className="text-neutral-500">downloads</span></div>
          <div><span className="font-bold">4.9</span> <span className="text-neutral-500">rating</span></div>
        </div>
        <div className="text-sm font-semibold mb-3">Featured Packs</div>
        <div className="grid grid-cols-3 gap-3">
          {packs.map(p => (
            <div key={p.name} className="border border-neutral-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="font-medium text-sm">{p.name}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-indigo-600 font-bold text-sm">{p.price}</span>
                <span className="text-xs text-neutral-400">{p.downloads}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="background:white;min-height:300px;overflow:hidden;border-radius:0.75rem;border:1px solid #e5e5e5;font-family:system-ui,-apple-system,sans-serif">
  <div style="height:7rem;background:linear-gradient(to right,#6366f1,#a855f7,#ec4899)"></div>
  <div style="padding:0 1.5rem 1.5rem">
    <div style="display:flex;align-items:flex-end;gap:1rem;margin-top:-2rem;margin-bottom:1rem">
      <div style="width:4rem;height:4rem;border-radius:9999px;background:white;border:4px solid white;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:700;color:#4f46e5;flex-shrink:0">JD</div>
      <div>
        <div style="display:flex;align-items:center;gap:0.375rem">
          <span style="font-weight:700;font-size:1.125rem;color:#171717">Jane Doe</span>
          <span style="color:#3b82f6;font-size:0.875rem">✓</span>
        </div>
        <span style="font-size:0.875rem;color:#737373">@janedoe</span>
      </div>
    </div>
    <p style="font-size:0.875rem;color:#525252;margin:0 0 1rem;line-height:1.5">Full-stack designer crafting production-ready UI kits and component systems for modern web apps.</p>
    <div style="display:flex;gap:1.5rem;font-size:0.875rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid #f5f5f5">
      <div><span style="font-weight:700;color:#171717">12</span> <span style="color:#737373">packs</span></div>
      <div><span style="font-weight:700;color:#171717">847</span> <span style="color:#737373">downloads</span></div>
      <div><span style="font-weight:700;color:#171717">4.9</span> <span style="color:#737373">rating</span></div>
    </div>
    <div style="font-size:0.875rem;font-weight:600;margin-bottom:0.75rem;color:#171717">Featured Packs</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem">
      <div style="border:1px solid #e5e5e5;border-radius:0.5rem;padding:0.75rem">
        <div style="font-weight:500;font-size:0.875rem;color:#171717">Dashboard Kit</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem">
          <span style="color:#4f46e5;font-weight:700;font-size:0.875rem">$18</span>
          <span style="font-size:0.75rem;color:#a3a3a3">1.2k</span>
        </div>
      </div>
      <div style="border:1px solid #e5e5e5;border-radius:0.5rem;padding:0.75rem">
        <div style="font-weight:500;font-size:0.875rem;color:#171717">Auth Components</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem">
          <span style="color:#4f46e5;font-weight:700;font-size:0.875rem">$8</span>
          <span style="font-size:0.75rem;color:#a3a3a3">934</span>
        </div>
      </div>
      <div style="border:1px solid #e5e5e5;border-radius:0.5rem;padding:0.75rem">
        <div style="font-weight:500;font-size:0.875rem;color:#171717">Chart Widgets</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem">
          <span style="color:#4f46e5;font-weight:700;font-size:0.875rem">$14</span>
          <span style="font-size:0.75rem;color:#a3a3a3">612</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "purchase-success-page",
    title: "Purchase Success Page",
    description: "A centered confirmation card with green checkmark, purchase details, license information, and action buttons for post-purchase flow.",
    category: "Marketplace",
    tags: ["marketplace", "success", "purchase", "confirmation", "checkout"],
    style: "",
    code: `export default function PurchaseSuccessPage() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-2xl">✓</span>
        </div>
        <h2 className="text-xl font-bold mb-2">Purchase Complete!</h2>
        <p className="text-sm text-neutral-500 mb-6">You now have access to Pro Component Pack</p>
        <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-500">License</span>
            <span className="font-medium">Personal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Expires</span>
            <span className="font-medium">Never</span>
          </div>
        </div>
        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors mb-3">Go to Downloads</button>
        <a href="#" className="text-sm text-indigo-600 hover:underline">View Receipt</a>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e5e5e5;padding:2rem;max-width:24rem;width:100%;text-align:center">
    <div style="width:4rem;height:4rem;border-radius:9999px;background:#d1fae5;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
      <span style="color:#059669;font-size:1.5rem;font-weight:700">✓</span>
    </div>
    <h2 style="font-size:1.25rem;font-weight:700;margin:0 0 0.5rem;color:#171717">Purchase Complete!</h2>
    <p style="font-size:0.875rem;color:#737373;margin:0 0 1.5rem">You now have access to Pro Component Pack</p>
    <div style="background:#fafafa;border-radius:0.5rem;padding:1rem;margin-bottom:1.5rem;font-size:0.875rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
        <span style="color:#737373">License</span>
        <span style="font-weight:500;color:#171717">Personal</span>
      </div>
      <div style="display:flex;justify-content:space-between">
        <span style="color:#737373">Expires</span>
        <span style="font-weight:500;color:#171717">Never</span>
      </div>
    </div>
    <button style="width:100%;padding:0.625rem;background:#4f46e5;color:white;border-radius:0.5rem;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;margin-bottom:0.75rem">Go to Downloads</button>
    <a style="font-size:0.875rem;color:#4f46e5;text-decoration:none;cursor:pointer">View Receipt</a>
  </div>
</div>`,
  },
  {
    slug: "leaderboard-weekly",
    title: "Leaderboard",
    description: "A weekly leaderboard with ranked entries, avatar initials, score bars, gold/silver/bronze highlights for top 3, and a current-user indicator.",
    category: "Gamification",
    tags: ["gamification", "leaderboard", "ranking", "scores", "competition"],
    style: "",
    code: `export default function LeaderboardWeekly() {
  const entries = [
    { rank: 1, name: "Alex Chen", initials: "AC", score: 2840 },
    { rank: 2, name: "Maria S.", initials: "MS", score: 2650 },
    { rank: 3, name: "Jordan K.", initials: "JK", score: 2510 },
    { rank: 4, name: "Sam Lee", initials: "SL", score: 2340 },
    { rank: 5, name: "You", initials: "ME", score: 2180 },
    { rank: 6, name: "Priya N.", initials: "PN", score: 1990 },
    { rank: 7, name: "Erik O.", initials: "EO", score: 1820 },
    { rank: 8, name: "Lina W.", initials: "LW", score: 1650 },
  ];
  const maxScore = entries[0].score;
  const medals = ["#D4AF37", "#A0A0A0", "#CD7F32"];
  return (
    <div className="p-6 bg-white min-h-[300px] rounded-xl border border-neutral-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Weekly Leaderboard</h3>
        <div className="flex bg-neutral-100 rounded-lg p-0.5">
          <button className="px-3 py-1 text-xs font-medium bg-white rounded-md shadow-sm">Weekly</button>
          <button className="px-3 py-1 text-xs font-medium text-neutral-500">All-Time</button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map(e => (
          <div key={e.rank} className={\`flex items-center gap-3 p-2.5 rounded-lg \${e.rank === 5 ? "bg-blue-50 border border-blue-100" : "hover:bg-neutral-50"}\`} style={e.rank <= 3 ? { borderLeft: \`3px solid \${medals[e.rank-1]}\` } : {}}>
            <span className="w-6 text-sm font-bold text-neutral-400 text-center">#{e.rank}</span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{e.initials}</div>
            <span className="text-sm font-medium flex-1">{e.name}</span>
            <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: \`\${(e.score / maxScore) * 100}%\` }} />
            </div>
            <span className="text-sm font-mono text-neutral-600 w-12 text-right">{e.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:1.5rem;background:white;min-height:300px;border-radius:0.75rem;border:1px solid #e5e5e5;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
    <h3 style="font-size:1.125rem;font-weight:700;margin:0;color:#171717">Weekly Leaderboard</h3>
    <div style="display:flex;background:#f5f5f5;border-radius:0.5rem;padding:2px">
      <button style="padding:0.25rem 0.75rem;font-size:0.75rem;font-weight:500;background:white;border-radius:0.375rem;box-shadow:0 1px 2px rgba(0,0,0,0.05);border:none;cursor:pointer;color:#171717">Weekly</button>
      <button style="padding:0.25rem 0.75rem;font-size:0.75rem;font-weight:500;background:none;border:none;cursor:pointer;color:#737373">All-Time</button>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem;border-left:3px solid #D4AF37">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#1</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">AC</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Alex Chen</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:100%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">2840</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem;border-left:3px solid #A0A0A0">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#2</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">MS</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Maria S.</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:93%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">2650</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem;border-left:3px solid #CD7F32">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#3</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">JK</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Jordan K.</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:88%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">2510</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#4</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">SL</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Sam Lee</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:82%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">2340</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem;background:#eff6ff;border:1px solid #dbeafe">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#5</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">ME</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">You</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:77%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">2180</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#6</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">PN</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Priya N.</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:70%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">1990</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#7</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">EO</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Erik O.</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:64%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">1820</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem;border-radius:0.5rem">
      <span style="width:1.5rem;font-size:0.875rem;font-weight:700;color:#a3a3a3;text-align:center">#8</span>
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5">LW</div>
      <span style="font-size:0.875rem;font-weight:500;flex:1;color:#171717">Lina W.</span>
      <div style="width:6rem;height:0.375rem;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:58%;background:#6366f1;border-radius:9999px"></div></div>
      <span style="font-size:0.875rem;font-family:monospace;color:#525252;width:3rem;text-align:right">1650</span>
    </div>
  </div>
</div>`,
  },
  {
    slug: "profile-credibility-badges",
    title: "Profile Credibility Section",
    description: "A credibility card showing user level, progress bar, earned badge collection with unicode icons, adoption metrics, and percentile ranking.",
    category: "Gamification",
    tags: ["gamification", "badges", "credibility", "profile", "level"],
    style: "",
    code: `export default function ProfileCredibilityBadges() {
  const badges = [
    { icon: "🏗️", label: "Builder" },
    { icon: "⭐", label: "Star" },
    { icon: "🔥", label: "Streak" },
    { icon: "🎯", label: "Precise" },
    { icon: "💎", label: "Quality" },
    { icon: "🚀", label: "Launcher" },
  ];
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-indigo-100 rounded-lg">
              <span className="text-indigo-700 font-bold text-sm">Lv.7</span>
            </div>
            <div>
              <div className="font-bold text-sm">Level 7 — Architect</div>
              <div className="text-xs text-neutral-500">72% to Level 8</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">Top 5%</div>
          </div>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: "72%" }} />
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Earned Badges</div>
          <div className="flex gap-3">
            {badges.map(b => (
              <div key={b.label} className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-lg" title={b.label}>
                {b.icon}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm">
          <span className="text-neutral-500">Adoption</span>
          <span className="font-semibold">Used by 1.2k developers</span>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;padding:1.5rem;max-width:28rem;width:100%">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <div style="padding:0.375rem 0.75rem;background:#e0e7ff;border-radius:0.5rem">
          <span style="color:#4338ca;font-weight:700;font-size:0.875rem">Lv.7</span>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.875rem;color:#171717">Level 7 — Architect</div>
          <div style="font-size:0.75rem;color:#737373">72% to Level 8</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:0.75rem;font-weight:700;color:#059669">Top 5%</div>
      </div>
    </div>
    <div style="width:100%;height:0.5rem;background:#f5f5f5;border-radius:9999px;margin-bottom:1.5rem;overflow:hidden">
      <div style="height:100%;width:72%;background:linear-gradient(to right,#6366f1,#a855f7);border-radius:9999px"></div>
    </div>
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.75rem;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">Earned Badges</div>
      <div style="display:flex;gap:0.75rem">
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">🏗️</div>
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">⭐</div>
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">🔥</div>
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">🎯</div>
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">💎</div>
        <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:#fafafa;border:1px solid #e5e5e5;display:flex;align-items:center;justify-content:center;font-size:1.125rem">🚀</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid #f5f5f5;font-size:0.875rem">
      <span style="color:#737373">Adoption</span>
      <span style="font-weight:600;color:#171717">Used by 1.2k developers</span>
    </div>
  </div>
</div>`,
  },
  {
    slug: "challenge-submission-card",
    title: "Challenge Submission Card",
    description: "A card displaying a challenge entry with gradient preview, submitter info, vote count with upvote button, comment count, and rank badge.",
    category: "Gamification",
    tags: ["gamification", "challenge", "submission", "voting", "competition"],
    style: "",
    code: `export default function ChallengeSubmissionCard() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden max-w-sm w-full">
        <div className="h-40 bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400" />
        <div className="p-4">
          <h3 className="font-bold text-base mb-2">Animated Dashboard Concept</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">RK</div>
            <span className="text-sm text-neutral-600">Rachel Kim</span>
            <span className="text-xs text-neutral-400 ml-auto">Mar 12, 2025</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-100 transition-colors">
              <span className="text-indigo-500">▲</span> 47
            </button>
            <span className="text-sm text-neutral-500">💬 12 comments</span>
          </div>
          <div className="pt-3 border-t border-neutral-100">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">#3 of 128 entries</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden;max-width:24rem;width:100%">
    <div style="height:10rem;background:linear-gradient(135deg,#a78bfa,#e879f9,#f472b6)"></div>
    <div style="padding:1rem">
      <h3 style="font-weight:700;font-size:1rem;margin:0 0 0.5rem;color:#171717">Animated Dashboard Concept</h3>
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">
        <div style="width:1.5rem;height:1.5rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.625rem;font-weight:700;color:#4f46e5">RK</div>
        <span style="font-size:0.875rem;color:#525252">Rachel Kim</span>
        <span style="font-size:0.75rem;color:#a3a3a3;margin-left:auto">Mar 12, 2025</span>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem">
        <button style="display:flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#fafafa;border-radius:0.5rem;border:1px solid #e5e5e5;font-size:0.875rem;font-weight:500;cursor:pointer;color:#171717"><span style="color:#6366f1">▲</span> 47</button>
        <span style="font-size:0.875rem;color:#737373">💬 12 comments</span>
      </div>
      <div style="padding-top:0.75rem;border-top:1px solid #f5f5f5">
        <span style="font-size:0.75rem;font-weight:700;color:#d97706;background:#fffbeb;padding:0.25rem 0.625rem;border-radius:9999px">#3 of 128 entries</span>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "inbox-thread-layout",
    title: "Inbox Thread Layout",
    description: "A split-panel inbox with conversation list on the left and a chat-style message thread on the right, featuring alternating message bubbles and a reply input.",
    category: "Communication",
    tags: ["communication", "inbox", "chat", "messages", "thread"],
    style: "",
    code: `export default function InboxThreadLayout() {
  const convos = [
    { name: "Sarah M.", preview: "Sounds great! Let me know when...", time: "2m", unread: true, initials: "SM" },
    { name: "Design Team", preview: "New mockups are ready for review", time: "15m", unread: true, initials: "DT" },
    { name: "Alex P.", preview: "Thanks for the feedback on the...", time: "1h", unread: false, initials: "AP" },
    { name: "Jordan K.", preview: "Can we schedule a call tomorrow?", time: "3h", unread: false, initials: "JK" },
  ];
  return (
    <div className="bg-white min-h-[300px] rounded-xl border border-neutral-200 overflow-hidden flex">
      <div className="w-[250px] border-r border-neutral-200 flex flex-col">
        <div className="p-3 border-b border-neutral-100 text-sm font-semibold">Inbox</div>
        {convos.map(c => (
          <div key={c.name} className={\`p-3 border-b border-neutral-50 cursor-pointer hover:bg-neutral-50 flex gap-2.5 \${c.name === "Sarah M." ? "bg-indigo-50" : ""}\`}>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">{c.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{c.name}</span>
                <span className="text-[10px] text-neutral-400">{c.time}</span>
              </div>
              <div className="text-xs text-neutral-500 truncate">{c.preview}</div>
            </div>
            {c.unread && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-neutral-100 text-sm font-semibold">Sarah M.</div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-auto">
          <div className="self-start max-w-[70%]">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm">Hey! I reviewed the component pack. Looks amazing!</div>
            <div className="text-[10px] text-neutral-400 mt-1">10:42 AM</div>
          </div>
          <div className="self-end max-w-[70%]">
            <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm">Thanks! I added a few more variants. Want me to share the updated link?</div>
            <div className="text-[10px] text-neutral-400 mt-1 text-right">10:44 AM</div>
          </div>
          <div className="self-start max-w-[70%]">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm">Sounds great! Let me know when it's ready.</div>
            <div className="text-[10px] text-neutral-400 mt-1">10:45 AM</div>
          </div>
        </div>
        <div className="p-3 border-t border-neutral-100 flex gap-2">
          <input type="text" placeholder="Type a reply..." className="flex-1 text-sm px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:border-indigo-300" />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Send</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="background:white;min-height:300px;border-radius:0.75rem;border:1px solid #e5e5e5;overflow:hidden;display:flex;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:250px;border-right:1px solid #e5e5e5;display:flex;flex-direction:column">
    <div style="padding:0.75rem;border-bottom:1px solid #f5f5f5;font-size:0.875rem;font-weight:600;color:#171717">Inbox</div>
    <div style="padding:0.75rem;border-bottom:1px solid #fafafa;cursor:pointer;display:flex;gap:0.625rem;background:#eef2ff">
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5;flex-shrink:0">SM</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.875rem;font-weight:500;color:#171717">Sarah M.</span><span style="font-size:10px;color:#a3a3a3">2m</span></div>
        <div style="font-size:0.75rem;color:#737373;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Sounds great! Let me know when...</div>
      </div>
      <div style="width:0.5rem;height:0.5rem;border-radius:9999px;background:#6366f1;margin-top:0.375rem;flex-shrink:0"></div>
    </div>
    <div style="padding:0.75rem;border-bottom:1px solid #fafafa;cursor:pointer;display:flex;gap:0.625rem">
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5;flex-shrink:0">DT</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.875rem;font-weight:500;color:#171717">Design Team</span><span style="font-size:10px;color:#a3a3a3">15m</span></div>
        <div style="font-size:0.75rem;color:#737373;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">New mockups are ready for review</div>
      </div>
      <div style="width:0.5rem;height:0.5rem;border-radius:9999px;background:#6366f1;margin-top:0.375rem;flex-shrink:0"></div>
    </div>
    <div style="padding:0.75rem;border-bottom:1px solid #fafafa;cursor:pointer;display:flex;gap:0.625rem">
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5;flex-shrink:0">AP</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.875rem;font-weight:500;color:#171717">Alex P.</span><span style="font-size:10px;color:#a3a3a3">1h</span></div>
        <div style="font-size:0.75rem;color:#737373;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Thanks for the feedback on the...</div>
      </div>
    </div>
    <div style="padding:0.75rem;border-bottom:1px solid #fafafa;cursor:pointer;display:flex;gap:0.625rem">
      <div style="width:2rem;height:2rem;border-radius:9999px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#4f46e5;flex-shrink:0">JK</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.875rem;font-weight:500;color:#171717">Jordan K.</span><span style="font-size:10px;color:#a3a3a3">3h</span></div>
        <div style="font-size:0.75rem;color:#737373;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Can we schedule a call tomorrow?</div>
      </div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column">
    <div style="padding:0.75rem;border-bottom:1px solid #f5f5f5;font-size:0.875rem;font-weight:600;color:#171717">Sarah M.</div>
    <div style="flex:1;padding:1rem;display:flex;flex-direction:column;gap:0.75rem">
      <div style="align-self:flex-start;max-width:70%">
        <div style="background:#f5f5f5;border-radius:1rem 1rem 1rem 0.25rem;padding:0.5rem 0.75rem;font-size:0.875rem;color:#171717">Hey! I reviewed the component pack. Looks amazing!</div>
        <div style="font-size:10px;color:#a3a3a3;margin-top:0.25rem">10:42 AM</div>
      </div>
      <div style="align-self:flex-end;max-width:70%">
        <div style="background:#4f46e5;color:white;border-radius:1rem 1rem 0.25rem 1rem;padding:0.5rem 0.75rem;font-size:0.875rem">Thanks! I added a few more variants. Want me to share the updated link?</div>
        <div style="font-size:10px;color:#a3a3a3;margin-top:0.25rem;text-align:right">10:44 AM</div>
      </div>
      <div style="align-self:flex-start;max-width:70%">
        <div style="background:#f5f5f5;border-radius:1rem 1rem 1rem 0.25rem;padding:0.5rem 0.75rem;font-size:0.875rem;color:#171717">Sounds great! Let me know when it's ready.</div>
        <div style="font-size:10px;color:#a3a3a3;margin-top:0.25rem">10:45 AM</div>
      </div>
    </div>
    <div style="padding:0.75rem;border-top:1px solid #f5f5f5;display:flex;gap:0.5rem">
      <input type="text" placeholder="Type a reply..." style="flex:1;font-size:0.875rem;padding:0.5rem 0.75rem;border:1px solid #e5e5e5;border-radius:0.5rem;outline:none;color:#171717;font-family:inherit" />
      <button style="padding:0.5rem 1rem;background:#4f46e5;color:white;border-radius:0.5rem;font-size:0.875rem;font-weight:500;border:none;cursor:pointer">Send</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "structured-proposal-card",
    title: "Structured Proposal Card",
    description: "A proposal card with project details, timeline, budget, deliverables checklist, and Accept/Decline/Counter action buttons, styled with a blue accent border.",
    category: "Communication",
    tags: ["communication", "proposal", "offer", "contract", "negotiation"],
    style: "",
    code: `export default function StructuredProposalCard() {
  const deliverables = [
    "Responsive landing page with animations",
    "Dashboard with 5 interactive widgets",
    "User authentication & settings flow",
  ];
  return (
    <div className="p-8 bg-neutral-100 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border-2 border-blue-200 shadow-sm max-w-md w-full overflow-hidden">
        <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
          <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Project Proposal</div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1">E-Commerce Redesign</h3>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">Complete UI/UX overhaul of the existing storefront, including mobile-first responsive design and performance optimization.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-500 mb-0.5">Timeline</div>
              <div className="text-sm font-semibold">2-3 weeks</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-500 mb-0.5">Budget</div>
              <div className="text-sm font-semibold">$2,400</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Deliverables</div>
            <div className="flex flex-col gap-2">
              {deliverables.map(d => (
                <div key={d} className="flex items-start gap-2 text-sm">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-neutral-700">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t border-neutral-100">
            <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Accept</button>
            <button className="flex-1 py-2 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors text-neutral-700">Decline</button>
            <button className="flex-1 py-2 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">Counter</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#f5f5f5;min-height:300px;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:0.75rem;border:2px solid #bfdbfe;box-shadow:0 1px 3px rgba(0,0,0,0.06);max-width:28rem;width:100%;overflow:hidden">
    <div style="background:#eff6ff;padding:0.75rem 1.25rem;border-bottom:1px solid #dbeafe">
      <div style="font-size:0.75rem;color:#2563eb;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Project Proposal</div>
    </div>
    <div style="padding:1.25rem">
      <h3 style="font-weight:700;font-size:1.125rem;margin:0 0 0.25rem;color:#171717">E-Commerce Redesign</h3>
      <p style="font-size:0.875rem;color:#525252;margin:0 0 1rem;line-height:1.6">Complete UI/UX overhaul of the existing storefront, including mobile-first responsive design and performance optimization.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1rem">
        <div style="background:#fafafa;border-radius:0.5rem;padding:0.75rem">
          <div style="font-size:0.75rem;color:#737373;margin-bottom:2px">Timeline</div>
          <div style="font-size:0.875rem;font-weight:600;color:#171717">2-3 weeks</div>
        </div>
        <div style="background:#fafafa;border-radius:0.5rem;padding:0.75rem">
          <div style="font-size:0.75rem;color:#737373;margin-bottom:2px">Budget</div>
          <div style="font-size:0.875rem;font-weight:600;color:#171717">$2,400</div>
        </div>
      </div>
      <div style="margin-bottom:1rem">
        <div style="font-size:0.75rem;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Deliverables</div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.875rem">
            <span style="color:#10b981;margin-top:2px">✓</span>
            <span style="color:#404040">Responsive landing page with animations</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.875rem">
            <span style="color:#10b981;margin-top:2px">✓</span>
            <span style="color:#404040">Dashboard with 5 interactive widgets</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.875rem">
            <span style="color:#10b981;margin-top:2px">✓</span>
            <span style="color:#404040">User authentication & settings flow</span>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:0.5rem;padding-top:1rem;border-top:1px solid #f5f5f5">
        <button style="flex:1;padding:0.5rem;background:#4f46e5;color:white;border-radius:0.5rem;font-size:0.875rem;font-weight:500;border:none;cursor:pointer">Accept</button>
        <button style="flex:1;padding:0.5rem;background:white;border:1px solid #e5e5e5;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer;color:#404040">Decline</button>
        <button style="flex:1;padding:0.5rem;background:white;border:1px solid #c7d2fe;border-radius:0.5rem;font-size:0.875rem;font-weight:500;cursor:pointer;color:#4f46e5">Counter</button>
      </div>
    </div>
  </div>
</div>`,
  },
];
