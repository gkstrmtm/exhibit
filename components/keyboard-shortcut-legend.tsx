/**
 * Keyboard Shortcut Legend
 * Category: Data Display
 * Tags: keyboard, shortcuts, legend, reference, keybinding, table
 * Description: A two-column shortcut reference table organized into sections (Navigation, Editing, View, Actions). Each row shows an action name on the left and styled keyboard key chips on the right. The table is designed for embedding inside a help overlay or settings panel.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/keyboard-shortcut-legend.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

const SECTIONS = [
  {
    title: "Navigation",
    shortcuts: [
      { action: "Command palette", keys: ["⌘", "K"] },
      { action: "Go to file", keys: ["⌘", "P"] },
      { action: "Go to line", keys: ["⌃", "G"] },
      { action: "Toggle sidebar", keys: ["⌘", "B"] },
    ],
  },
  {
    title: "Editing",
    shortcuts: [
      { action: "Save file", keys: ["⌘", "S"] },
      { action: "Undo", keys: ["⌘", "Z"] },
      { action: "Select word", keys: ["⌘", "D"] },
      { action: "Duplicate line", keys: ["⌥", "⇧", "↓"] },
    ],
  },
  {
    title: "View",
    shortcuts: [
      { action: "Zoom in", keys: ["⌘", "+"] },
      { action: "Zoom out", keys: ["⌘", "−"] },
      { action: "Full screen", keys: ["F11"] },
      { action: "Split editor", keys: ["⌘", "\\"] },
    ],
  },
];

function Key({ k }: { k: string }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-50 text-[9px] font-mono font-medium text-neutral-600 shadow-[0_1px_0_0_rgba(0,0,0,0.08)]">
      {k}
    </kbd>
  );
}

export default function KeyboardShortcutLegend() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-xs overflow-hidden">
      {SECTIONS.map((section, si) => (
        <div key={section.title}>
          <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{section.title}</span>
          </div>
          <div className="divide-y divide-neutral-50">
            {section.shortcuts.map(s => (
              <div key={s.action} className="flex items-center justify-between px-4 py-2">
                <span className="text-[10px] text-neutral-600">{s.action}</span>
                <span className="flex items-center gap-0.5">
                  {s.keys.map((k, i) => <Key key={i} k={k} />)}
                </span>
              </div>
            ))}
          </div>
          {si < SECTIONS.length - 1 && <div className="border-b border-neutral-200" />}
        </div>
      ))}
    </div>
  );
}
