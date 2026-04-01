/**
 * Invoice List
 * Category: Billing
 * Tags: billing, invoices, table, history, payments
 * Description: Billing history table with invoice numbers, dates, amounts, status badges (Paid/Pending/Failed), and download links.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/invoice-list-pattern.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function InvoiceList() {
  const invoices = [
    { id: "INV-2024-001", date: "Jan 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-002", date: "Feb 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-003", date: "Mar 15, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-004", date: "Apr 15, 2024", amount: "$29.00", status: "Pending" },
    { id: "INV-2024-005", date: "May 15, 2024", amount: "$29.00", status: "Failed" },
  ];

  const statusColors: Record<string, string> = {
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Failed: "bg-red-50 text-red-700",
  };

  return (
    <div className="p-8 bg-white min-h-[400px]">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Billing History</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Download All</button>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left p-4 font-medium">Invoice</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-slate-100">
                  <td className="p-4 font-mono text-slate-700">{inv.id}</td>
                  <td className="p-4 text-slate-500">{inv.date}</td>
                  <td className="p-4 font-medium text-slate-700">{inv.amount}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a href="#" className="text-blue-600 text-sm hover:underline">Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}