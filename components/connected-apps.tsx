/**
 * Connected Apps
 * Category: Account
 * Tags: oauth, connected apps, integrations, account, settings
 * Description: OAuth connected applications list — shows app name, logo placeholder, connected date, and a Disconnect button per row.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/connected-apps.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ConnectedApps() {
  const apps = [
    { name: "GitHub", icon: "GH", scopes: "Read repos, profile", connected: "Connected Mar 1" },
    { name: "Figma", icon: "F", scopes: "Read files, projects", connected: "Connected Feb 20" },
    { name: "Linear", icon: "L", scopes: "View issues, comments", connected: "Connected Jan 5" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-50 max-w-md">
      {apps.map(app => (
        <div key={app.name} className="flex items-center gap-4 px-5 py-4">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0">{app.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900">{app.name}</div>
            <div className="text-xs text-neutral-400">{app.scopes}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-neutral-400 mb-1">{app.connected}</div>
            <button className="text-xs text-red-500 hover:underline">Disconnect</button>
          </div>
        </div>
      ))}
    </div>
  );
}