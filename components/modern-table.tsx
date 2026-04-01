/**
 * Modern Data Table
 * Category: Data Display
 * Tags: table, data, dashboard, list, rows
 * Description: Clean data table with row hover, status badges, and proper typography hierarchy.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/modern-table.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ModernTable() {
  const data = [
    { name: "Acme Corp", status: "Active", revenue: "$45,200", growth: "+12.5%" },
    { name: "Globex Inc", status: "Pending", revenue: "$23,100", growth: "+4.2%" },
    { name: "Initech", status: "Active", revenue: "$67,800", growth: "+18.9%" },
    { name: "Umbrella Co", status: "Inactive", revenue: "$12,400", growth: "-2.1%" },
  ];

  const statusColors: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Inactive: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };

  return (
    <div className="p-8 bg-white min-h-[300px]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Company</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Status</th>
            <th className="text-right py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Revenue</th>
            <th className="text-right py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Growth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
              <td className="py-3 px-4 font-medium">{row.name}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[row.status]}`}>
                  {row.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right tabular-nums">{row.revenue}</td>
              <td className={`py-3 px-4 text-right tabular-nums font-medium ${row.growth.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                {row.growth}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}