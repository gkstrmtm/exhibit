/**
 * Purchase Success Page
 * Category: Marketplace
 * Tags: marketplace, success, purchase, confirmation, checkout
 * Description: A centered confirmation card with green checkmark, purchase details, license information, and action buttons for post-purchase flow.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/purchase-success-page.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function PurchaseSuccessPage() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-2xl">✓</span>
        </div>
        <h2 className="text-xl font-bold mb-2">Purchase Complete!</h2>
        <p className="text-sm text-neutral-500 mb-6">You now have access to Pro Component Pack</p>
        <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-500">License</span>
            <span className="font-medium">Personal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Expires</span>
            <span className="font-medium">Never</span>
          </div>
        </div>
        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors mb-3">Go to Downloads</button>
        <a href="#" className="text-sm text-indigo-600 hover:underline">View Receipt</a>
      </div>
    </div>
  );
}