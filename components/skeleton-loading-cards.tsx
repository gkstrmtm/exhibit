/**
 * Skeleton Loading Cards
 * Category: Loading
 * Tags: skeleton, loading, shimmer, placeholder, animation
 * Description: Three cards showing skeleton/shimmer loading placeholders with animated gradient effect. Use while content is being fetched asynchronously.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-loading-cards.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SkeletonLoadingCards() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center">
      <div className="grid grid-cols-3 gap-6 w-full">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-neutral-100 rounded animate-pulse w-full" />
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />
                <div className="h-3 bg-neutral-200 rounded animate-pulse w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}