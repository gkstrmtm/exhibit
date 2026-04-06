/**
 * Payment Method Card
 * Category: Billing
 * Tags: payment, credit card, billing, saved card, method
 * Description: Saved credit card display with masked number, brand badge, expiry, and Set as default / Remove actions. Clean card-on-card layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/payment-method-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function PaymentMethodCard() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">Payment method</span>
        <button className="text-xs text-blue-600 hover:underline">+ Add new</button>
      </div>
      <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-neutral-50">
        <div className="w-10 h-7 bg-neutral-800 rounded flex items-center justify-center text-white text-xs font-bold tracking-tight">VISA</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-neutral-900">•••• •••• •••• 4242</div>
          <div className="text-xs text-neutral-400 mt-0.5">Expires 09/27</div>
        </div>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">Default</span>
      </div>
      <div className="flex items-center gap-4 p-4 border border-neutral-100 rounded-xl opacity-60">
        <div className="w-10 h-7 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-neutral-900">•••• •••• •••• 8881</div>
          <div className="text-xs text-neutral-400 mt-0.5">Expires 03/26</div>
        </div>
        <button className="text-xs text-neutral-500 hover:underline">Set default</button>
      </div>
    </div>
  );
}