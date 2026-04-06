/**
 * Status Badge Table
 * Category: Tables
 * Tags: table, status, badge, data, list
 * Description: Data table with colored status badges, avatar + name cells, and monospace ID column. Clean row hover states and column alignment.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-with-status-badges.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const STATUS = { active: "#dcfce7|#16a34a", pending: "#fef9c3|#ca8a04", failed: "#fee2e2|#dc2626" } as const;
export default function StatusBadgeTable() {
  const rows = [
    { id: "dep_001", name: "Mia Chen", email: "mia@acme.com", status: "active", date: "Apr 2" },
    { id: "dep_002", name: "Leo Park", email: "leo@acme.com", status: "pending", date: "Apr 1" },
    { id: "dep_003", name: "Sam Torres", email: "sam@co.io", status: "failed", date: "Mar 30" },
    { id: "dep_004", name: "Ava Kim", email: "ava@design.co", status: "active", date: "Mar 28" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm">
      <table className="w-full">
        <thead className="bg-neutral-50 border-b border-neutral-100">
          <tr>{["Name","ID","Status","Date"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const [bg, color] = STATUS[r.status as keyof typeof STATUS].split("|");
            return (
              <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3"><div className="font-medium text-neutral-900">{r.name}</div><div className="text-xs text-neutral-400">{r.email}</div></td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">{r.id}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: bg, color }}>{r.status}</span></td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{r.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}