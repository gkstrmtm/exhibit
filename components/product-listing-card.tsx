/**
 * Product Listing Card
 * Category: Commerce
 * Tags: product, card, e-commerce, shop, listing
 * Description: E-commerce product card with image placeholder, name, price, rating, and Add to cart button. Hover state on card with shadow lift.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/product-listing-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProductListingCard() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-[200px] hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl">🧩</div>
      <div className="p-3">
        <div className="text-xs font-semibold text-neutral-900 mb-0.5 truncate">Ghost Button Pack</div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-amber-400 text-xs">★★★★★</span>
          <span className="text-xs text-neutral-400">(42)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-900">$12</span>
          <button className="px-2 py-1 bg-neutral-900 text-white text-xs rounded-lg">Add</button>
        </div>
      </div>
    </div>
  );
}