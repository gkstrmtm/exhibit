/**
 * Team Members List
 * Category: Account
 * Tags: team, members, table, roles, management
 * Description: Team management table with member info, role dropdowns, status badges, and action controls.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/team-members-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TeamMembersList() {
  const members = [
    { name: "Sarah Chen", email: "sarah@example.com", role: "Owner", status: "Active", initials: "SC", color: "bg-purple-500" },
    { name: "Alex Rivera", email: "alex@example.com", role: "Admin", status: "Active", initials: "AR", color: "bg-blue-500" },
    { name: "Jordan Lee", email: "jordan@example.com", role: "Member", status: "Active", initials: "JL", color: "bg-emerald-500" },
    { name: "Taylor Kim", email: "taylor@example.com", role: "Member", status: "Pending", initials: "TK", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Invite</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.email} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${m.color} text-white text-xs font-medium flex items-center justify-center`}>{m.initials}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option selected={m.role === "Owner"}>Owner</option>
                      <option selected={m.role === "Admin"}>Admin</option>
                      <option selected={m.role === "Member"}>Member</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      m.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{m.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
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