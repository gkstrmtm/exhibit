/**
 * XP Level Progress Bar
 * Category: Gamification
 * Tags: XP, level, progress, gamification, badge
 * Description: Creator level progress indicator with current level badge, XP progress bar, and XP needed to reach next level. Compact single-row layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/xp-level-bar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function XPLevelBar() {
  const current = 340;
  const nextLevel = 500;
  const pct = Math.round((current / nextLevel) * 100);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 max-w-xs">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center">
          <span className="text-white text-xs font-black">L7</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-neutral-900">Craftsman</div>
          <div className="text-xs text-neutral-400">Level 7 · Design Engineer</div>
        </div>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-1.5">
        <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-xs text-neutral-400">
        <span>{current} XP</span>
        <span>{nextLevel - current} XP to Level 8</span>
      </div>
    </div>
  );
}