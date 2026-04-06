/**
 * Checkbox Select Table
 * Category: Tables
 * Tags: table, checkbox, select, bulk actions, multi-select
 * Description: Table with a header 'select all' checkbox and per-row checkboxes. Selection count shown in a contextual action bar that appears when rows are checked.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-checkbox-select.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
const ITEMS = ["Homepage copy","Product images","Pricing page","About section","Legal docs"];
export default function CheckboxTable() {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setSel(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allSel = sel.size === ITEMS.length;
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm">
      {sel.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 border-b border-blue-100">
          <span className="text-xs font-medium text-blue-700">{sel.size} selected</span>
          <button className="text-xs text-blue-600 hover:underline">Delete</button>
          <button className="text-xs text-blue-600 hover:underline">Archive</button>
        </div>
      )}
      <table className="w-full"><thead className="bg-neutral-50 border-b border-neutral-100"><tr>
        <th className="px-4 py-2.5 w-10"><input type="checkbox" checked={allSel} onChange={() => setSel(allSel ? new Set() : new Set(ITEMS.map((_,i)=>i)))} className="rounded" /></th>
        <th className="text-left px-3 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Item</th>
        <th className="text-left px-3 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Status</th>
      </tr></thead>
      <tbody>{ITEMS.map((item, i) => (
        <tr key={i} className={`border-b border-neutral-50 ${sel.has(i) ? "bg-blue-50/40" : "hover:bg-neutral-50"}`}>
          <td className="px-4 py-3"><input type="checkbox" checked={sel.has(i)} onChange={() => toggle(i)} className="rounded" /></td>
          <td className="px-3 py-3 text-neutral-700">{item}</td>
          <td className="px-3 py-3"><span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded-full">Draft</span></td>
        </tr>
      ))}</tbody></table>
    </div>
  );
}