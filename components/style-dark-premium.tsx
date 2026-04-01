/**
 * Dark Premium Style
 * Category: Style Families
 * Tags: dark, premium, theme, dashboard, style, pro
 * Description: A mini-dashboard in a true dark premium theme. Deep black background (#0a0a0a), subtle borders, white/gray text with proper contrast, and a purple/blue accent for CTAs. Features stat card, list, and button group.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/style-dark-premium.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DarkPremiumStyle() {
  return (
    <div className="min-h-[400px] bg-[#0a0a0a] p-10 font-sans">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Revenue</p>
          <p className="text-3xl font-semibold text-white tracking-tight">$48,250</p>
          <p className="text-sm text-emerald-400 mt-1">↑ 12% from last month</p>
        </div>
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
          {["Design System v2.0", "API Integration", "Mobile App Beta"].map((item, i) => (
            <div key={item} className={`flex items-center justify-between px-5 py-3.5 ${i < 2 ? "border-b border-white/5" : ""}`}>
              <span className="text-sm text-gray-200">{item}</span>
              <span className="text-xs text-gray-600">In Progress</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-500">Create New</button>
          <button className="px-5 py-2.5 bg-white/5 text-gray-300 text-sm font-medium rounded-xl border border-white/10">Export</button>
          <button className="px-5 py-2.5 bg-white/5 text-gray-500 text-sm font-medium rounded-xl border border-white/10">Archive</button>
        </div>
      </div>
    </div>
  );
}