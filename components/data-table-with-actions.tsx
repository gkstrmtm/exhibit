/**
 * Data Table with Actions
 * Category: Tables
 * Tags: table, data, actions, pagination, admin, crud
 * Description: A sortable data table with checkboxes, status badges, action menus, and pagination. Essential for any admin or CRM dashboard.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/data-table-with-actions.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DataTableWithActions() {
  const users = [
    { name: "Sarah Chen", email: "sarah.chen@company.com", role: "Admin", status: "Active" },
    { name: "Marcus Johnson", email: "m.johnson@company.com", role: "Editor", status: "Active" },
    { name: "Emily Rodriguez", email: "e.rodriguez@company.com", role: "Viewer", status: "Inactive" },
    { name: "David Kim", email: "d.kim@company.com", role: "Editor", status: "Active" },
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-[300px]">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="w-12 p-3"><input type="checkbox" /></th>
              <th className="text-left p-3 font-medium text-neutral-500">Name</th>
              <th className="text-left p-3 font-medium text-neutral-500">Email</th>
              <th className="text-left p-3 font-medium text-neutral-500">Role</th>
              <th className="text-left p-3 font-medium text-neutral-500">Status</th>
              <th className="w-12 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-center"><input type="checkbox" /></td>
                <td className="p-3 font-medium text-neutral-900">{user.name}</td>
                <td className="p-3 text-neutral-500">{user.email}</td>
                <td className="p-3 text-neutral-700">{user.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                  }`}>{user.status}</span>
                </td>
                <td className="p-3 text-center text-neutral-400 cursor-pointer">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-500">
          <span>Showing 1-4 of 24</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">Previous</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs bg-blue-600 text-white border-blue-600">1</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">2</button>
            <button className="px-3 py-1 border border-neutral-200 rounded text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}