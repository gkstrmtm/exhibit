/**
 * Skeleton Profile Header
 * Category: Loading
 * Tags: skeleton, profile, loading, shimmer, header
 * Description: Skeleton loading state for a creator profile header — cover image area, avatar, name, bio, and stats row all shimmer in sync.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-profile-header.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SkeletonProfileHeader() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-lg">
      <div className="h-24 bg-neutral-100 animate-pulse" />
      <div className="px-5 pb-5">
        <div className="flex items-end justify-between -mt-8 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-neutral-200 animate-pulse" />
          <div className="h-8 w-24 bg-neutral-100 rounded-lg animate-pulse mb-1" />
        </div>
        <div className="h-3 bg-neutral-100 rounded-full w-36 animate-pulse mb-2" />
        <div className="h-2.5 bg-neutral-100 rounded-full animate-pulse mb-1" />
        <div className="h-2.5 bg-neutral-100 rounded-full w-4/5 animate-pulse mb-4" />
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 h-10 bg-neutral-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}