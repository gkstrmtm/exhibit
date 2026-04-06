/**
 * Empty Billing History
 * Category: Empty States
 * Tags: empty state, billing, invoices, zero state
 * Description: Zero-state for an invoices tab. Receipt icon, 'No invoices yet' headline, and a note that the first invoice appears after the trial.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-billing.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyBillingHistory() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-xl mb-4">🧾</div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">No invoices yet</h3>
      <p className="text-xs text-neutral-500 max-w-[220px]">Your first invoice will appear here after your free trial ends on Apr 14.</p>
    </div>
  );
}