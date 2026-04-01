/**
 * Minimal Icon Sidebar
 * Category: Navigation
 * Tags: sidebar, navigation, minimal, icons, productivity
 * Description: Collapsed sidebar with icon-only navigation and tooltip labels. Common in productivity tools.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/minimal-sidebar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MinimalSidebar() {
  const items = [
    { icon: "⌂", label: "Home", active: true },
    { icon: "◎", label: "Dashboard" },
    { icon: "☰", label: "Projects" },
    { icon: "♡", label: "Favorites" },
    { icon: "⚙", label: "Settings" },
  ];

  return (
    <div className="p-4 bg-neutral-100 flex justify-start min-h-[400px]">
      <div className="w-16 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col items-center py-4 gap-1">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4">A</div>
        {items.map((item) => (
          <button
            key={item.label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
              item.active
                ? "bg-blue-50 text-blue-600"
                : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
            }`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
        <div className="flex-1" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-sm" />
      </div>
    </div>
  );
}