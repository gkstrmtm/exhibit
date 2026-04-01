/**
 * Top Nav App Shell
 * Category: App Shells
 * Tags: topnav, app-shell, layout, navigation, horizontal
 * Description: Horizontal navigation bar with logo, nav links, search input, and user dropdown. Classic layout for SaaS applications and marketing dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/top-nav-app-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TopNavAppShell() {
  const links = ["Dashboard", "Projects", "Teams", "Reports"];

  return (
    <div className="min-h-[400px] bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">W</div>
            <span className="font-semibold text-sm">Workspace</span>
          </div>
          <nav className="flex gap-1">
            {links.map((link, i) => (
              <button
                key={link}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  i === 0 ? "bg-neutral-100 text-neutral-900 font-medium" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-48 px-3 py-1.5 text-sm border border-neutral-200 rounded-md bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            MK
          </div>
        </div>
      </header>
      <main className="flex-1 p-8 bg-neutral-50">
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">Good morning, Marcus</h2>
        <p className="text-sm text-neutral-500 mb-6">You have 3 pending tasks and 2 new messages.</p>
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="text-sm text-neutral-400">Content area</div>
        </div>
      </main>
    </div>
  );
}