/**
 * Marketplace Filter Sidebar
 * Category: Marketplace
 * Tags: filter, sidebar, marketplace, checkbox, search refinement
 * Description: Category filter sidebar with checkbox groups for type, price range, and sort. Clean section headers, tight spacing, and an Apply button.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/marketplace-filter-sidebar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MarketplaceFilterSidebar() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-4 w-52 text-sm space-y-5">
      <div>
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Category</div>
        {["Buttons","Cards","Forms","Navigation","Layout"].map(c => (
          <label key={c} className="flex items-center gap-2 py-1 cursor-pointer">
            <input type="checkbox" className="rounded" defaultChecked={c === "Buttons"} />
            <span className="text-neutral-700">{c}</span>
          </label>
        ))}
      </div>
      <div>
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Price</div>
        {["Free","Under $10","$10–$50","$50+"].map(p => (
          <label key={p} className="flex items-center gap-2 py-1 cursor-pointer">
            <input type="radio" name="price" className="rounded-full" defaultChecked={p === "Free"} />
            <span className="text-neutral-700">{p}</span>
          </label>
        ))}
      </div>
      <button className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium">Apply filters</button>
    </div>
  );
}