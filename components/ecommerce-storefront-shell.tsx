/**
 * E-commerce Storefront Shell
 * Category: App Shells
 * Tags: app-shell, ecommerce, storefront, shop, product-grid
 * Description: Full storefront layout with a sticky top nav (logo, search, cart), left sidebar with category and filter controls, and a responsive product grid with price and quick-add actions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/ecommerce-storefront-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Shoes"];
const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#111", "#e5e5e5", "#3b82f6", "#f43f5e", "#10b981", "#f59e0b"];

const products = [
  { id: 1, name: "Essential Crew Tee", price: 42, badge: "New", rating: 4.8, reviews: 124, color: "#6b7280" },
  { id: 2, name: "Relaxed Chino Pant", price: 88, badge: "Sale", original: 120, rating: 4.6, reviews: 89, color: "#d4a373" },
  { id: 3, name: "Merino Wool Sweater", price: 145, badge: "", rating: 4.9, reviews: 203, color: "#93c5fd" },
  { id: 4, name: "Cotton Oxford Shirt", price: 76, badge: "", rating: 4.7, reviews: 67, color: "#fde68a" },
  { id: 5, name: "Slim Cargo Shorts", price: 65, badge: "Low stock", rating: 4.5, reviews: 41, color: "#6ee7b7" },
  { id: 6, name: "Lightweight Windbreaker", price: 198, badge: "New", rating: 4.8, reviews: 32, color: "#c4b5fd" },
];

export default function EcommerceStorefrontShell() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const filtered = products.filter(p =>
    (activeCategory === "All" || p.name.toLowerCase().includes(activeCategory.toLowerCase())) &&
    (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-[500px] bg-white font-sans flex flex-col border border-neutral-200 rounded-xl overflow-hidden">
      {/* Top Nav */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 h-14 gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-neutral-900 rounded-lg" />
            <span className="font-black text-neutral-900 text-base tracking-tight">STITCH</span>
          </div>
          <div className="flex-1 max-w-md relative">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 rounded-full border-none outline-none placeholder:text-neutral-400"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">⌕</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors text-lg">♡</button>
            <button
              onClick={() => {}}
              className="relative text-neutral-900 text-lg"
            >
              ⊕
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Sign in</button>
          </div>
        </div>

        {/* Category bar */}
        <div className="flex items-center gap-1 px-6 pb-3 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="w-48 border-r border-neutral-100 p-5 flex-shrink-0">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">Filters</h3>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Price range</div>
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="300" defaultValue="150" className="w-full accent-neutral-900" />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>$0</span><span>$300</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Size</div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`w-8 h-8 text-xs font-medium rounded-md border transition-colors ${selectedSizes.includes(s) ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="text-xs font-semibold text-neutral-600 mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  style={{ backgroundColor: c }}
                  className="w-5 h-5 rounded-full border border-neutral-200 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          <button className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors underline">
            Clear all filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-500">{filtered.length} products</span>
            <select className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-600 outline-none bg-white">
              <option>Sort: Featured</option>
              <option>Price: Low to high</option>
              <option>Price: High to low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-neutral-100 rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ backgroundColor: p.color }} className="w-16 h-16 rounded-full opacity-60" />
                  </div>
                  {p.badge && (
                    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${p.badge === "Sale" ? "bg-red-500 text-white" : p.badge === "Low stock" ? "bg-amber-500 text-white" : "bg-neutral-900 text-white"}`}>
                      {p.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }}
                    className="absolute bottom-2 left-2 right-2 py-2 bg-white text-neutral-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"
                  >
                    Quick add
                  </button>
                </div>
                <p className="text-xs font-medium text-neutral-800 leading-tight">{p.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-bold text-neutral-900">${p.price}</span>
                  {p.original && <span className="text-xs text-neutral-400 line-through">${p.original}</span>}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-yellow-400 text-[10px]">★</span>
                  <span className="text-[10px] text-neutral-500">{p.rating} ({p.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}