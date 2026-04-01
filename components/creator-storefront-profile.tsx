/**
 * Creator Storefront
 * Category: Marketplace
 * Tags: marketplace, profile, storefront, creator, avatar
 * Description: A creator profile storefront with cover gradient, avatar, verified badge, bio, stats row, and featured pack cards for marketplace sellers.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/creator-storefront-profile.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function CreatorStorefront() {
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
}