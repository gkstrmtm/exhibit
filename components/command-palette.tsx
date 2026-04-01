/**
 * Command Palette / Spotlight
 * Category: Inputs
 * Tags: command, palette, search, spotlight, keyboard
 * Description: macOS Spotlight-style command palette. Essential for keyboard-driven power users.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/command-palette.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function CommandPalette() {
  const results = [
    { icon: "📄", label: "Dashboard", hint: "Go to page" },
    { icon: "⚙️", label: "Settings", hint: "Preferences" },
    { icon: "👤", label: "Profile", hint: "Account" },
    { icon: "📊", label: "Analytics", hint: "Reports" },
  ];

  return (
    <div className="p-12 bg-neutral-900/90 flex items-start justify-center min-h-[400px] pt-20">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
          <span className="text-neutral-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
            defaultValue="dash"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-500 font-mono border border-neutral-200">ESC</kbd>
        </div>
        <div className="py-2">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Results</div>
          {results.map((r, i) => (
            <div
              key={r.label}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer ${
                i === 0 ? "bg-blue-50 text-blue-900" : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span>{r.icon}</span>
              <span className="flex-1 font-medium">{r.label}</span>
              <span className="text-xs text-neutral-400">{r.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}