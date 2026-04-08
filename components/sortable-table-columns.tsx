/**
 * Sortable Table Columns
 * Category: Tables
 * Tags: sort, table, columns, ascending, descending, arrow
 * Description: A data table where clicking any column header cycles through ascending, descending, and unsorted states. A sort arrow indicator appears next to the active column header. Row data reorders in real time. Demonstrates multi-column sort awareness (sorts by one column at a time).
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sortable-table-columns.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

const ROWS = [
  { name: "Aria Chen", role: "Design Lead", joined: "2022-03", score: 94 },
  { name: "Marcus Webb", role: "Engineer", joined: "2021-08", score: 88 },
  { name: "Selin Yıldız", role: "Product", joined: "2023-01", score: 76 },
  { name: "Jonas Haag", role: "DevOps", joined: "2022-11", score: 82 },
  { name: "Riya Kapoor", role: "Designer", joined: "2023-06", score: 91 },
];

type RowKey = keyof typeof ROWS[0];
type Dir = "asc" | "desc" | null;

const COLS: { key: RowKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "joined", label: "Joined" },
  { key: "score", label: "Score" },
];

export default function SortableTableColumns() {
  const [sortKey, setSortKey] = useState<RowKey | null>(null);
  const [dir, setDir] = useState<Dir>(null);

  const cycleSort = (key: RowKey) => {
    if (sortKey !== key) { setSortKey(key); setDir("asc"); return; }
    if (dir === "asc") { setDir("desc"); return; }
    setSortKey(null); setDir(null);
  };

  const sorted = useMemo(() => {
    if (!sortKey || !dir) return ROWS;
    return [...ROWS].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return dir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, dir]);

  const SortIcon = ({ k }: { k: RowKey }) => {
    if (sortKey !== k) return <ArrowUpDown size={9} strokeWidth={1.5} className="text-neutral-300" />;
    return dir === "asc"
      ? <ArrowUp size={9} strokeWidth={2} className="text-neutral-800" />
      : <ArrowDown size={9} strokeWidth={2} className="text-neutral-800" />;
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 w-full max-w-xs overflow-hidden">
      <table className="w-full text-[9px]">
        <thead>
          <tr className="border-b border-neutral-200">
            {COLS.map(c => (
              <th
                key={c.key}
                onClick={() => cycleSort(c.key)}
                className="text-left px-2 py-2 font-semibold text-neutral-500 uppercase tracking-widest text-[8px] cursor-pointer hover:text-neutral-800 select-none transition-colors"
              >
                <span className="flex items-center gap-1">
                  {c.label}
                  <SortIcon k={c.key} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.name} className="border-b border-neutral-100 last:border-0 hover:bg-white transition-colors">
              <td className="px-2 py-1.5 font-medium text-neutral-800">{row.name}</td>
              <td className="px-2 py-1.5 text-neutral-500">{row.role}</td>
              <td className="px-2 py-1.5 text-neutral-500 font-mono">{row.joined}</td>
              <td className="px-2 py-1.5">
                <span className={`font-semibold ${row.score >= 90 ? "text-emerald-600" : row.score >= 80 ? "text-amber-600" : "text-neutral-600"}`}>{row.score}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
