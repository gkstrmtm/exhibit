/**
 * Role Permissions Editor
 * Category: Admin
 * Tags: rbac, permissions, roles, admin, security
 * Description: RBAC permissions matrix with selectable role list and feature×action toggle grid for granular access control.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/role-permissions-editor.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function RolePermissionsEditor() {
  const roles = ["Owner", "Admin", "Editor", "Viewer"];
  const features = ["Dashboard", "Users", "Content", "Billing", "Settings"];
  const actions = ["View", "Create", "Edit", "Delete"];
  const perms: Record<string, boolean[]> = {
    Dashboard: [true, true, true, false],
    Users: [true, true, true, true],
    Content: [true, true, true, false],
    Billing: [true, false, false, false],
    Settings: [true, false, true, false],
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-3xl mx-auto flex gap-6">
        <div className="w-48 shrink-0">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Roles</div>
          <div className="flex flex-col gap-1">
            {roles.map((r) => (
              <div key={r} className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${r === "Admin" ? "bg-blue-600 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>{r}</div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-xs font-medium text-neutral-500 uppercase">Feature</th>
                {actions.map((a) => <th key={a} className="text-center py-2 text-xs font-medium text-neutral-500 uppercase">{a}</th>)}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f} className="border-b border-neutral-100">
                  <td className="py-3 font-medium text-neutral-800">{f}</td>
                  {perms[f].map((on, i) => (
                    <td key={i} className="text-center py-3">
                      <div className={`w-9 h-5 rounded-full mx-auto cursor-pointer ${on ? "bg-blue-600" : "bg-neutral-200"}`} style={{ position: "relative" }}>
                        <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 shadow" style={{ left: on ? "1.1rem" : "0.15rem" }} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}