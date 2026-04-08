/**
 * Invoice Line Items
 * Category: Billing
 * Tags: invoice, line-items, billing, total, tax, summary
 * Description: An invoice summary component showing line items with quantity, unit price, and totals. A subtotal, tax row, and grand total are calculated from the items. Demonstrates the invoice breakdown / order summary display pattern used in checkout and billing pages.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/invoice-line-items.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

interface LineItem { description: string; qty: number; unit: number; }

const ITEMS: LineItem[] = [
  { description: "Pro plan (monthly)", qty: 1, unit: 49.00 },
  { description: "Additional seats (×3)", qty: 3, unit: 12.00 },
  { description: "Extra storage (100 GB)", qty: 1, unit: 8.00 },
  { description: "Priority support add-on", qty: 1, unit: 19.00 },
];

const TAX_RATE = 0.08;

function fmt(n: number) { return "$" + n.toFixed(2); }

export default function InvoiceLineItems() {
  const subtotal = ITEMS.reduce((sum, i) => sum + i.qty * i.unit, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-neutral-900">Invoice #2024-0042</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Due Apr 30, 2026</div>
          </div>
          <span className="text-[9px] font-semibold border border-amber-400 text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
            Pending
          </span>
        </div>
      </div>

      {/* Line items */}
      <div className="px-4 py-2">
        <div className="flex items-center py-1.5 border-b border-neutral-100">
          <div className="flex-1 text-[9px] font-bold text-neutral-400 uppercase tracking-wide">Item</div>
          <div className="w-8 text-[9px] font-bold text-neutral-400 uppercase text-center">Qty</div>
          <div className="w-16 text-[9px] font-bold text-neutral-400 uppercase text-right">Unit</div>
          <div className="w-16 text-[9px] font-bold text-neutral-400 uppercase text-right">Total</div>
        </div>

        {ITEMS.map(({ description, qty, unit }) => (
          <div key={description} className="flex items-center py-2 border-b border-neutral-100 last:border-b-0">
            <div className="flex-1 text-xs text-neutral-700">{description}</div>
            <div className="w-8 text-xs text-neutral-500 text-center">{qty}</div>
            <div className="w-16 text-xs text-neutral-500 text-right">{fmt(unit)}</div>
            <div className="w-16 text-xs font-medium text-neutral-800 text-right">{fmt(qty * unit)}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 space-y-1.5">
        <div className="flex justify-between text-xs text-neutral-600">
          <span>Subtotal</span><span>{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-neutral-600">
          <span>Tax (8%)</span><span>{fmt(tax)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-1 border-t border-neutral-200">
          <span>Total</span><span>{fmt(total)}</span>
        </div>
      </div>

      <div className="px-4 py-2.5 border-t border-neutral-200">
        <button className="w-full text-xs font-medium bg-neutral-900 text-white rounded-lg py-1.5 hover:bg-neutral-700 transition-colors">
          Pay now
        </button>
      </div>
    </div>
  );
}
