/**
 * Compact Card Grid
 * Category: Data Density
 * Tags: compact, cards, grid, minimal, dense
 * Description: A 3-column card grid with minimal padding and reduced card height (~68px). Each card shows an icon, a short label, and a value — no decorative flourishes. Cards are scannable without scrolling. Demonstrates maximum card density for integrations lists, plugin galleries, and feature catalogs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/compact-card-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
import { Database, Globe, Lock, Zap, Code2, Mail, Bell, Cloud, GitBranch } from "lucide-react";

const CARDS = [
  { label: "PostgreSQL", value: "Connected", icon: Database, active: true },
  { label: "CDN", value: "Enabled", icon: Globe, active: true },
  { label: "Auth0", value: "Configured", icon: Lock, active: true },
  { label: "Webhooks", value: "4 active", icon: Zap, active: true },
  { label: "API Keys", value: "3 keys", icon: Code2, active: true },
  { label: "Postfix", value: "Not set", icon: Mail, active: false },
  { label: "Alerts", value: "2 rules", icon: Bell, active: true },
  { label: "S3 Storage", value: "Connected", icon: Cloud, active: true },
  { label: "GitHub", value: "Not linked", icon: GitBranch, active: false },
];

export default function CompactCardGrid() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 w-full max-w-sm">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Integrations</div>
      <div className="grid grid-cols-3 gap-2">
        {CARDS.map(({ label, value, icon: Icon, active }) => (
          <div
            key={label}
            className={`bg-white border rounded-lg px-2 py-2 flex flex-col gap-1 ${active ? "border-neutral-200" : "border-dashed border-neutral-300 opacity-60"}`}
            style={{ minHeight: 68 }}
          >
            <Icon size={13} className={active ? "text-neutral-600" : "text-neutral-400"} strokeWidth={1.5} />
            <div className="text-[10px] font-medium text-neutral-800 leading-tight">{label}</div>
            <div className={`text-[9px] leading-tight ${active ? "text-emerald-600" : "text-neutral-400"}`}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
