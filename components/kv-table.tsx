/**
 * KV Table
 * Category: Data Display
 * Tags: key-value, metadata, table, detail, inspect, properties
 * Description: A key-value metadata display table used in detail panels, inspect views, and API response previews. Keys are styled smaller and muted. Values are full-weight. Supports string, badge, link, and copy-to-clipboard value types. Demonstrates the structured metadata KV pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/kv-table.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

type ValueType = "string" | "badge" | "link" | "copy";

interface KVEntry {
  key: string;
  value: string;
  type?: ValueType;
  badgeColor?: string;
}

const ENTRIES: KVEntry[] = [
  { key: "Resource ID", value: "res_9xT3mQ2ZkW", type: "copy" },
  { key: "Status", value: "Active", type: "badge", badgeColor: "bg-emerald-100 text-emerald-700" },
  { key: "Created", value: "March 3, 2025 at 14:22 UTC" },
  { key: "Last modified", value: "March 28, 2025 at 09:15 UTC" },
  { key: "Owner", value: "Sarah Chen" },
  { key: "Region", value: "us-east-1" },
  { key: "Plan", value: "Pro", type: "badge", badgeColor: "bg-blue-100 text-blue-700" },
  { key: "Docs", value: "platform.example.com/docs", type: "link" },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="flex items-center gap-2 group">
      <span className="text-xs font-mono text-neutral-700 truncate">{value}</span>
      <button onClick={copy} className="text-neutral-400 hover:text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      </button>
    </div>
  );
}

export default function KvTable() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Resource metadata
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        {ENTRIES.map((entry, i) => (
          <div key={entry.key} className={`flex items-center gap-3 px-4 py-2.5 ${i < ENTRIES.length - 1 ? "border-b border-neutral-100" : ""}`}>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wide w-28 shrink-0">{entry.key}</span>
            <div className="flex-1 min-w-0">
              {(!entry.type || entry.type === "string") && (
                <span className="text-xs text-neutral-800">{entry.value}</span>
              )}
              {entry.type === "badge" && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${entry.badgeColor}`}>{entry.value}</span>
              )}
              {entry.type === "copy" && <CopyButton value={entry.value} />}
              {entry.type === "link" && (
                <a href="#" className="flex items-center gap-1 text-xs text-blue-600 hover:underline truncate">
                  {entry.value} <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
