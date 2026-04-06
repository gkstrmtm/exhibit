/**
 * Empty Notifications
 * Category: Empty States
 * Tags: empty state, notifications, inbox, zero state
 * Description: Zero-state panel for an empty notification inbox. Bell icon, friendly headline, and soft subtext. No CTA — nothing to do.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-notifications.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-2xl mb-4">🔔</div>
      <h3 className="text-sm font-semibold text-neutral-800 mb-1">You're all caught up</h3>
      <p className="text-xs text-neutral-400 max-w-[220px]">New notifications will appear here when there's activity on your account.</p>
    </div>
  );
}