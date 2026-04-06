/**
 * Invoice List
 * Category: Billing
 * Tags: billing, invoice, payment, history, table
 * Description: Billing invoice table with period, amount, status badge, and a PDF download link per row. Clean minimal layout with paid/unpaid distinction.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/invoice-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function InvoiceList() {
  const invoices = [
    { period: "March 2026", amount: "$49.00", status: "paid", date: "Apr 1, 2026" },
    { period: "February 2026", amount: "$49.00", status: "paid", date: "Mar 1, 2026" },
    { period: "January 2026", amount: "$49.00", status: "paid", date: "Feb 1, 2026" },
    { period: "December 2025", amount: "$49.00", status: "paid", date: "Jan 1, 2026" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-md">
      <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">Invoices</span>
        <span className="text-xs text-neutral-400">Pro plan · $49/mo</span>
      </div>
      {invoices.map(inv => (
        <div key={inv.period} className="flex items-center px-5 py-3.5 border-b border-neutral-50 last:border-0">
          <div className="flex-1">
            <div className="text-sm text-neutral-800">{inv.period}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{inv.date}</div>
          </div>
          <div className="text-sm font-medium text-neutral-700 mr-4">{inv.amount}</div>
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full mr-4">{inv.status}</span>
          <button className="text-xs text-blue-600 hover:underline">PDF</button>
        </div>
      ))}
    </div>
  );
}