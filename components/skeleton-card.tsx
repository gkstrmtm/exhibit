/**
 * Skeleton Card
 * Category: Loading
 * Tags: skeleton, loading, shimmer, placeholder, content
 * Description: Animated shimmer skeleton for a content card with avatar, title, subtitle, and a stat row. Replaces loading spinners with shape-preserving placeholders.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SkeletonCard() {
  return (
    <div className="p-5 bg-white border border-neutral-100 rounded-xl space-y-4 max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-100 animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 bg-neutral-100 rounded-full w-3/4 animate-pulse" />
          <div className="h-2.5 bg-neutral-100 rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2.5 bg-neutral-100 rounded-full animate-pulse" />
        <div className="h-2.5 bg-neutral-100 rounded-full w-5/6 animate-pulse" />
        <div className="h-2.5 bg-neutral-100 rounded-full w-4/6 animate-pulse" />
      </div>
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 h-14 bg-neutral-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}