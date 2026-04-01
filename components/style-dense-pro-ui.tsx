/**
 * Dense Pro UI Style
 * Category: Style Families
 * Tags: dense, admin, table, data, pro, dashboard, style
 * Description: A data-heavy admin panel snippet with a compact table, small text (12-13px), dense padding, toolbar with small buttons, and status indicators. Gray/blue color scheme optimized for information density.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/style-dense-pro-ui.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DenseProUIStyle() {
  const rows = [
    { id: "USR-001", name: "Alice Chen", role: "Admin", status: "Active", last: "2 min ago" },
    { id: "USR-002", name: "Bob Smith", role: "Editor", status: "Active", last: "1 hr ago" },
    { id: "USR-003", name: "Carol Wu", role: "Viewer", status: "Inactive", last: "3 days ago" },
    { id: "USR-004", name: "Dan Jones", role: "Editor", status: "Active", last: "5 min ago" },
    { id: "USR-005", name: "Eve Park", role: "Admin", status: "Pending", last: "Just now" },
  ];

  return (
    <div className="min-h-[400px] bg-[#f0f2f5] p-6 font-sans text-[13px]">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <button className="px-2.5 py-1 text-xs font-medium bg-white border border-gray-300 rounded">Filter</button>
            <button className="px-2.5 py-1 text-xs font-medium bg-white border border-gray-300 rounded">Sort</button>
            <select className="px-2 py-1 text-xs border border-gray-300 rounded bg-white">
              <option>All Roles</option>
            </select>
          </div>
          <button className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white rounded">+ Add User</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
              <th className="text-left px-3 py-2 font-medium">ID</th>
              <th className="text-left px-3 py-2 font-medium">Name</th>
              <th className="text-left px-3 py-2 font-medium">Role</th>
              <th className="text-left px-3 py-2 font-medium">Status</th>
              <th className="text-left px-3 py-2 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-100 hover:bg-blue-50/50">
                <td className="px-3 py-2 text-gray-400 font-mono">{r.id}</td>
                <td className="px-3 py-2 text-gray-800 font-medium">{r.name}</td>
                <td className="px-3 py-2 text-gray-600">{r.role}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[11px] font-medium ${
                    r.status === "Active" ? "bg-green-100 text-green-700" :
                    r.status === "Pending" ? "bg-amber-100 text-amber-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>{r.status}</span>
                </td>
                <td className="px-3 py-2 text-gray-400">{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}