/**
 * Empty Activity Feed
 * Category: Empty States
 * Tags: empty state, activity, feed, zero state, timeline
 * Description: Zero-state for a project activity feed. Soft pulse icon, descriptive copy, and encouragement to take first action.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-activity.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyActivityFeed() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl mb-4">⚡</div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">No activity yet</h3>
      <p className="text-xs text-neutral-500 max-w-[220px]">Activity from you and your team will show up here — commits, deployments, comments.</p>
    </div>
  );
}