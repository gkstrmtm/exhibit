/**
 * Checkout Summary
 * Category: Commerce
 * Tags: checkout, order, summary, payment, commerce
 * Description: Order summary card with line items, subtotal, discount, total, payment method preview, and purchase button.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/checkout-summary-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function CheckoutSummary() {
  return (
    <div className="min-h-[500px] flex items-center justify-center bg-slate-50 p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md w-full p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-slate-800">Pro Annual Plan</div>
              <div className="text-xs text-slate-400">Billed yearly</div>
            </div>
            <div className="font-medium text-slate-800">$348.00</div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-slate-800">Priority Support</div>
              <div className="text-xs text-slate-400">Add-on</div>
            </div>
            <div className="font-medium text-slate-800">$120.00</div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4 space-y-2 mb-4">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Subtotal</span><span>$468.00</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Discount (10%)</span><span>-$46.80</span>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-slate-900">$421.20</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
          <div>
            <div className="text-sm font-medium text-slate-700">•••• •••• •••• 4242</div>
            <div className="text-xs text-slate-400">Expires 12/26</div>
          </div>
        </div>
        <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">Complete Purchase</button>
      </div>
    </div>
  );
}