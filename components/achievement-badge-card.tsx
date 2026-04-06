/**
 * Achievement Badge Card
 * Category: Gamification
 * Tags: achievement, badge, gamification, reward, unlocked
 * Description: Earned achievement display with icon, title, description, and unlock date. Uses a glowing accent ring for earned vs. locked state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/achievement-badge-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function AchievementBadgeCard() {
  const badges = [
    { icon: "🔥", label: "Hot Streak", desc: "7 exhibits in 7 days", earned: true, date: "Earned Mar 14" },
    { icon: "⭐", label: "First Save", desc: "Your exhibit was saved", earned: true, date: "Earned Feb 1" },
    { icon: "🏆", label: "Top Creator", desc: "Reach 1k total saves", earned: false, date: "0/1000 saves" },
  ];
  return (
    <div className="flex gap-3 p-4 flex-wrap">
      {badges.map(b => (
        <div key={b.label} className={`flex flex-col items-center text-center p-4 rounded-xl border w-28 ${b.earned ? "border-amber-200 bg-amber-50" : "border-neutral-100 bg-neutral-50 opacity-50 grayscale"}`}>
          <div className={`text-3xl mb-2 ${b.earned ? "" : "opacity-40"}`}>{b.icon}</div>
          <div className="text-xs font-semibold text-neutral-900">{b.label}</div>
          <div className="text-xs text-neutral-400 mt-0.5 leading-tight">{b.desc}</div>
          <div className={`text-xs mt-1.5 ${b.earned ? "text-amber-600 font-medium" : "text-neutral-400"}`}>{b.date}</div>
        </div>
      ))}
    </div>
  );
}