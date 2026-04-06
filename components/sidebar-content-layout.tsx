/**
 * Sidebar + Content Layout
 * Category: Layout
 * Tags: sidebar, layout, two-column, navigation, shell
 * Description: Classic two-column layout with a narrow sidebar for navigation and a main content area. Shows slot-based content structure.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sidebar-content-layout.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SidebarContentLayout() {
  return (
    <div className="flex h-80 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100">
      <aside className="w-44 bg-white border-r border-neutral-100 p-3 shrink-0">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3 px-2">Menu</div>
        {["Dashboard","Components","Analytics","Settings"].map((item, i) => (
          <div key={item} className={`px-2 py-1.5 rounded-lg text-sm mb-0.5 ${i === 0 ? "bg-neutral-100 font-medium text-neutral-900" : "text-neutral-500 hover:bg-neutral-50"}`}>{item}</div>
        ))}
      </aside>
      <main className="flex-1 p-5">
        <div className="h-4 bg-neutral-200 rounded-full w-32 mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-20 bg-white rounded-lg border border-neutral-100" />
          <div className="h-20 bg-white rounded-lg border border-neutral-100" />
        </div>
        <div className="h-24 bg-white rounded-lg border border-neutral-100" />
      </main>
    </div>
  );
}