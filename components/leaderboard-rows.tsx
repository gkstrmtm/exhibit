/**
 * Leaderboard Rows
 * Category: Gamification
 * Tags: leaderboard, ranking, gamification, score, top creators
 * Description: Top-5 creator leaderboard with rank number, avatar, display name, and score. Gold/silver/bronze highlight for the podium positions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/leaderboard-rows.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function LeaderboardRows() {
  const creators = [
    { rank: 1, name: "Mia Chen", handle: "@mia", score: "4,821", color: "#f59e0b" },
    { rank: 2, name: "Leo Park", handle: "@leo", score: "3,640", color: "#9ca3af" },
    { rank: 3, name: "Ava Torres", handle: "@ava", score: "2,990", color: "#cd7c2f" },
    { rank: 4, name: "Sam Kim", handle: "@sam", score: "1,844", color: undefined },
    { rank: 5, name: "Jordan Lee", handle: "@jordan", score: "1,201", color: undefined },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-50 max-w-xs">
      {creators.map(c => (
        <div key={c.rank} className="flex items-center gap-3 px-4 py-3">
          <div className="w-6 text-center text-sm font-bold" style={{ color: c.color || "#d4d4d4" }}>#{c.rank}</div>
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0">{c.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900">{c.name}</div>
            <div className="text-xs text-neutral-400">{c.handle}</div>
          </div>
          <div className="text-sm font-semibold text-neutral-700">{c.score}</div>
        </div>
      ))}
    </div>
  );
}