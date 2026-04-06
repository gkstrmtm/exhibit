/**
 * Order Confirmation
 * Category: Commerce
 * Tags: order, confirmation, checkout, success, commerce
 * Description: Post-purchase confirmation with checkmark animation, order ID, summary items, and a continue button. Clean end-of-checkout state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/order-confirmation.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function OrderConfirmation() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-6 max-w-xs text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl mx-auto">✓</div>
      <div>
        <div className="text-base font-bold text-neutral-900">Order confirmed!</div>
        <div className="text-xs text-neutral-400 mt-1">Order #EXB-20481</div>
      </div>
      <div className="bg-neutral-50 rounded-xl p-3 text-left space-y-2">
        {[{ name: "Ghost Button Pack", qty: 1, price: "$12" },{ name: "Dark Shell", qty: 2, price: "$24" }].map(item => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">{item.name} ×{item.qty}</span>
            <span className="font-medium text-neutral-900">{item.price}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-semibold">
          <span>Total</span><span>$36</span>
        </div>
      </div>
      <button className="w-full py-2.5 bg-neutral-900 text-white text-sm rounded-xl font-medium">Back to marketplace</button>
    </div>
  );
}