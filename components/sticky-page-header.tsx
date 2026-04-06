/**
 * Sticky Page Header
 * Category: Layout
 * Tags: sticky, header, navigation, layout, topbar
 * Description: Full-width page header with logo, nav links, and CTA that sticks to the top on scroll. Shows shadow elevation on stuck state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sticky-page-header.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function StickyPageHeader() {
  return (
    <div className="relative h-64 overflow-y-auto bg-neutral-50 rounded-xl border border-neutral-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-100 px-5 py-3 flex items-center justify-between shadow-sm">
        <div className="font-bold text-sm text-neutral-900 tracking-tight">EXHIBIT</div>
        <nav className="flex gap-4">
          {["Docs","Blog","Pricing"].map(l => <a key={l} href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a>)}
        </nav>
        <button className="px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg font-medium">Get started</button>
      </header>
      <div className="p-5 space-y-3">
        {[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-white rounded-lg border border-neutral-100" />)}
      </div>
    </div>
  );
}