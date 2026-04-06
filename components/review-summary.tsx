/**
 * Review Summary
 * Category: Marketplace
 * Tags: reviews, ratings, stars, marketplace, summary
 * Description: Star rating summary card with average score, total count, and a breakdown bar chart per star level. Standard e-commerce/marketplace pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/review-summary.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ReviewSummary() {
  const breakdown = [
    { stars: 5, count: 84, pct: 84 },
    { stars: 4, count: 10, pct: 10 },
    { stars: 3, count: 4, pct: 4 },
    { stars: 2, count: 1, pct: 1 },
    { stars: 1, count: 1, pct: 1 },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 max-w-xs">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-4xl font-black text-neutral-900">4.8</div>
          <div className="text-amber-400 text-base mt-0.5">★★★★★</div>
          <div className="text-xs text-neutral-400 mt-0.5">100 reviews</div>
        </div>
        <div className="flex-1 space-y-1">
          {breakdown.map(b => (
            <div key={b.stars} className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 w-2">{b.stars}</span>
              <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}