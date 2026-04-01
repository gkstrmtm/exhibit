/**
 * Profile Credibility Section
 * Category: Gamification
 * Tags: gamification, badges, credibility, profile, level
 * Description: A credibility card showing user level, progress bar, earned badge collection with unicode icons, adoption metrics, and percentile ranking.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/profile-credibility-badges.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProfileCredibilityBadges() {
  const badges = [
    { icon: "🏗️", label: "Builder" },
    { icon: "⭐", label: "Star" },
    { icon: "🔥", label: "Streak" },
    { icon: "🎯", label: "Precise" },
    { icon: "💎", label: "Quality" },
    { icon: "🚀", label: "Launcher" },
  ];
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-indigo-100 rounded-lg">
              <span className="text-indigo-700 font-bold text-sm">Lv.7</span>
            </div>
            <div>
              <div className="font-bold text-sm">Level 7 — Architect</div>
              <div className="text-xs text-neutral-500">72% to Level 8</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">Top 5%</div>
          </div>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: "72%" }} />
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Earned Badges</div>
          <div className="flex gap-3">
            {badges.map(b => (
              <div key={b.label} className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-lg" title={b.label}>
                {b.icon}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm">
          <span className="text-neutral-500">Adoption</span>
          <span className="font-semibold">Used by 1.2k developers</span>
        </div>
      </div>
    </div>
  );
}