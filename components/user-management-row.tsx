/**
 * User Management Row
 * Category: Admin
 * Tags: admin, user management, roles, table row, users
 * Description: Admin user row with avatar, name, email, role badge, join date, and inline action buttons. Used in admin user tables.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/user-management-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UserManagementRow() {
  const users = [
    { name: "Mia Chen", email: "mia@acme.com", role: "Admin", joined: "Mar 1" },
    { name: "Leo Park", email: "leo@acme.com", role: "Member", joined: "Mar 15" },
    { name: "Ava Torres", email: "ava@acme.com", role: "Viewer", joined: "Apr 2" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm max-w-lg">
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-50 last:border-0">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0">{u.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-neutral-900">{u.name}</div>
            <div className="text-xs text-neutral-400">{u.email}</div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium mr-3 ${u.role === "Admin" ? "bg-purple-50 text-purple-700" : u.role === "Member" ? "bg-blue-50 text-blue-700" : "bg-neutral-100 text-neutral-500"}`}>{u.role}</span>
          <span className="text-xs text-neutral-300 mr-3 shrink-0">{u.joined}</span>
          <button className="text-xs text-red-400 hover:text-red-600">Remove</button>
        </div>
      ))}
    </div>
  );
}