/**
 * Clean Minimal Style
 * Category: Style Families
 * Tags: clean, minimal, apple, whitespace, dashboard, style
 * Description: A complete mini-dashboard in Apple-inspired clean style. White background, subtle gray borders, generous whitespace, and Inter-style typography. Features a stat card, list, and button group with one subtle blue accent.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/style-clean-minimal.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function CleanMinimalStyle() {
  return (
    <div className="min-h-[400px] bg-white p-10 font-sans">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Monthly Revenue</p>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">$48,250</p>
          <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
        </div>
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          {["Design System v2.0", "API Integration", "Mobile App Beta"].map((item, i) => (
            <div key={item} className={`flex items-center justify-between px-5 py-3.5 ${i < 2 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm text-gray-800">{item}</span>
              <span className="text-xs text-gray-400">In Progress</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-xl">Create New</button>
          <button className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200">Export</button>
          <button className="px-5 py-2.5 bg-white text-gray-400 text-sm font-medium rounded-xl border border-gray-200">Archive</button>
        </div>
      </div>
    </div>
  );
}