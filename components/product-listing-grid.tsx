/**
 * Product Listing Grid
 * Category: Marketplace
 * Tags: marketplace, grid, products, cards, ecommerce
 * Description: A responsive 2×2 grid of product cards with placeholder images, pricing badges, star ratings, and sort controls. Ideal for marketplace browse pages.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/product-listing-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProductListingGrid() {
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
              <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badge === "Pro" ? "bg-indigo-600 text-white" : "bg-emerald-100 text-emerald-700"}`}>{p.badge}</span>
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
}