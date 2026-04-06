/**
 * Split Pane Layout
 * Category: Layout
 * Tags: split pane, layout, editor, preview, two-panel
 * Description: Vertical split with a code editor panel on the left and a preview panel on the right. Shows the two-panel pattern for live editor UIs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/split-pane-layout.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SplitPaneLayout() {
  return (
    <div className="flex h-72 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 font-mono">
      <div className="w-1/2 border-r border-neutral-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs text-neutral-500 ml-2">Button.tsx</span>
        </div>
        <div className="text-xs text-neutral-400 space-y-1 leading-relaxed">
          <div><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-300">Button</span>() {'{'}</div>
          <div className="pl-4"><span className="text-blue-400">return</span> (</div>
          <div className="pl-8">&lt;<span className="text-red-400">button</span> <span className="text-green-400">className</span>=<span className="text-amber-400">"px-4 py-2"</span>&gt;</div>
          <div className="pl-12 text-neutral-300">Click me</div>
          <div className="pl-8">&lt;/<span className="text-red-400">button</span>&gt;</div>
          <div className="pl-4">)</div>
          <div>{'}'}</div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <button className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg">Click me</button>
      </div>
    </div>
  );
}