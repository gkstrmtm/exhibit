/**
 * Skeleton Loading States
 * Category: Feedback
 * Tags: skeleton, loading, shimmer, placeholder, ux
 * Description: Shimmer-effect skeleton placeholders for content loading. Shows perceived performance.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-loading.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SkeletonLoading() {
  return (
    <div className="p-8 bg-white min-h-[300px] space-y-6">
      {/* Card skeleton */}
      <div className="max-w-md space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-neutral-200 rounded-full w-3/4 animate-pulse" />
            <div className="h-3 bg-neutral-100 rounded-full w-1/2 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded-full w-2/3 animate-pulse" />
        </div>
        
        <div className="flex gap-2">
          <div className="h-8 bg-neutral-200 rounded-lg w-20 animate-pulse" />
          <div className="h-8 bg-neutral-100 rounded-lg w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}