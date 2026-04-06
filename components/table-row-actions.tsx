/**
 * Table with Row Actions
 * Category: Tables
 * Tags: table, actions, edit, delete, row actions
 * Description: Table where each row exposes contextual action buttons — Edit, View, and a red Delete — on hover. Ghost buttons in a tight inline group.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-row-actions.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TableRowActions() {
  const rows = [
    { name: "Homepage Redesign", owner: "Mia Chen", updated: "2h ago" },
    { name: "API Documentation", owner: "Leo Park", updated: "Yesterday" },
    { name: "Mobile App v2", owner: "Sam Torres", updated: "3 days ago" },
    { name: "Design System", owner: "Ava Kim", updated: "1 week ago" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm">
      <table className="w-full">
        <thead className="bg-neutral-50 border-b border-neutral-100">
          <tr>{["Project","Owner","Updated",""].map((h,i) => <th key={i} className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="group border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-3 font-medium text-neutral-900">{r.name}</td>
              <td className="px-4 py-3 text-neutral-500">{r.owner}</td>
              <td className="px-4 py-3 text-neutral-400 text-xs">{r.updated}</td>
              <td className="px-4 py-3">
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                  <button className="px-2 py-1 text-xs border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-100">Edit</button>
                  <button className="px-2 py-1 text-xs border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-100">View</button>
                  <button className="px-2 py-1 text-xs border border-red-100 rounded text-red-500 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}