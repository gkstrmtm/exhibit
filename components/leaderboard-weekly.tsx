/**
 * Leaderboard
 * Category: Gamification
 * Tags: gamification, leaderboard, ranking, scores, competition
 * Description: A weekly leaderboard with ranked entries, avatar initials, score bars, gold/silver/bronze highlights for top 3, and a current-user indicator.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/leaderboard-weekly.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function LeaderboardWeekly() {
  const entries = [
    { rank: 1, name: "Alex Chen", initials: "AC", score: 2840 },
    { rank: 2, name: "Maria S.", initials: "MS", score: 2650 },
    { rank: 3, name: "Jordan K.", initials: "JK", score: 2510 },
    { rank: 4, name: "Sam Lee", initials: "SL", score: 2340 },
    { rank: 5, name: "You", initials: "ME", score: 2180 },
    { rank: 6, name: "Priya N.", initials: "PN", score: 1990 },
    { rank: 7, name: "Erik O.", initials: "EO", score: 1820 },
    { rank: 8, name: "Lina W.", initials: "LW", score: 1650 },
  ];
  const maxScore = entries[0].score;
  const medals = ["#D4AF37", "#A0A0A0", "#CD7F32"];
  return (
    <div className="p-6 bg-white min-h-[300px] rounded-xl border border-neutral-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Weekly Leaderboard</h3>
        <div className="flex bg-neutral-100 rounded-lg p-0.5">
          <button className="px-3 py-1 text-xs font-medium bg-white rounded-md shadow-sm">Weekly</button>
          <button className="px-3 py-1 text-xs font-medium text-neutral-500">All-Time</button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map(e => (
          <div key={e.rank} className={`flex items-center gap-3 p-2.5 rounded-lg ${e.rank === 5 ? "bg-blue-50 border border-blue-100" : "hover:bg-neutral-50"}`} style={e.rank <= 3 ? { borderLeft: `3px solid ${medals[e.rank-1]}` } : {}}>
            <span className="w-6 text-sm font-bold text-neutral-400 text-center">#{e.rank}</span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{e.initials}</div>
            <span className="text-sm font-medium flex-1">{e.name}</span>
            <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(e.score / maxScore) * 100}%` }} />
            </div>
            <span className="text-sm font-mono text-neutral-600 w-12 text-right">{e.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}