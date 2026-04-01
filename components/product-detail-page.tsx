/**
 * Product Detail Page
 * Category: Marketplace
 * Tags: marketplace, detail, product, preview, purchase
 * Description: A split-layout product detail view with a large preview area, metadata, tech stack tags, pricing, and action buttons for marketplace items.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/product-detail-page.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProductDetailPage() {
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
}