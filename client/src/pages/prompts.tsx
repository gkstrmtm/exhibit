import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import PromptStudio from "@/components/prompt-studio";
import { DEFAULT_HOUSE_CRITIQUE, HOUSE_CRITIQUE_STORAGE_KEY, buildLibraryPrompt } from "@/lib/prompt-knowledge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Severity = "critical" | "high" | "medium";

interface Hotspot {
  x: number;
  y: number;
  label: string;
}

interface Prompt {
  id: string;
  title: string;
  covers: string;
  severity: Severity;
  prompt: string;
  badExample: string;
  goodExample: string;
  hotspots: Hotspot[];
}

const SEV_COLOR: Record<Severity, string> = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
};

// ─── Hotspot Pin ─────────────────────────────────────────────────────────────
function HotspotPin({ hs, index, onPinClick }: { hs: Hotspot; index: number; onPinClick?: () => void }) {
  const [open, setOpen] = useState(false);
  const flipAbove = hs.y > 72;
  const flipLeft = hs.x > 72;

  return (
    <div
      style={{ position: "absolute", left: `${hs.x}%`, top: `${hs.y}%`, transform: "translate(-50%,-50%)", zIndex: 30 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => onPinClick?.()}
    >
      {/* Pulse ring */}
      <div
        style={{
          position: "absolute", inset: -6, borderRadius: "50%",
          background: "rgba(239,68,68,0.22)",
          animation: "hs-pulse 2s ease-in-out infinite",
          animationDelay: `${index * 0.3}s`,
        }}
      />
      {/* Pin dot */}
      <div
        style={{
          position: "relative", width: 20, height: 20, borderRadius: "50%",
          background: "#ef4444", border: "2px solid white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 9, fontWeight: 800, cursor: "pointer",
          userSelect: "none", fontFamily: "system-ui",
        }}
      >
        {index + 1}
      </div>

      {/* Micro chip tooltip */}
      {open && (
        <div
          style={{
            position: "absolute",
            ...(flipAbove ? { bottom: "calc(100% + 7px)" } : { top: "calc(100% + 7px)" }),
            ...(flipLeft ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" }),
            background: "#0a0a0a",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 5,
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
            fontFamily: "system-ui",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {hs.label}
        </div>
      )}
    </div>
  );
}

// ─── Bad / Good Preview with crossfade toggle ─────────────────────────────────
function BadExample({ html, goodHtml, hotspots, onPinClick }: { html: string; goodHtml: string; hotspots: Hotspot[]; onPinClick?: () => void }) {
  const badRef = useRef<HTMLDivElement>(null);
  const goodRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);

  // Inject bad HTML once
  useEffect(() => {
    const el = badRef.current;
    if (!el) return;
    el.innerHTML = html;
    el.querySelectorAll<HTMLScriptElement>("script").forEach(old => {
      const s = document.createElement("script");
      Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
      s.textContent = old.textContent;
      old.parentNode?.replaceChild(s, old);
    });
  }, [html]);

  // Inject good HTML once
  useEffect(() => {
    const el = goodRef.current;
    if (!el) return;
    el.innerHTML = goodHtml;
    el.querySelectorAll<HTMLScriptElement>("script").forEach(old => {
      const s = document.createElement("script");
      Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
      s.textContent = old.textContent;
      old.parentNode?.replaceChild(s, old);
    });
  }, [goodHtml]);

  return (
    <div style={{ position: "relative", flexShrink: 0 }} className="w-full lg:w-[55%]">
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 5, transition: "color 300ms ease", color: fixed ? "#16a34a" : "#ef4444" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: fixed ? "#16a34a" : "#ef4444", display: "inline-block", transition: "background 300ms ease" }} />
          {fixed ? "Fixed — all issues resolved" : "Live anti-pattern — hover the pins"}
        </div>

        {/* Segmented pill toggle */}
        <div style={{ display: "flex", background: "#f5f5f5", borderRadius: 8, padding: 2, gap: 2 }}>
          <button
            onClick={() => setFixed(false)}
            style={{
              padding: "3px 10px", fontSize: 10, fontWeight: 600, borderRadius: 6, border: "none", cursor: "pointer",
              fontFamily: "system-ui", transition: "all 220ms cubic-bezier(0.4,0,0.2,1)",
              background: !fixed ? "white" : "transparent",
              color: !fixed ? "#ef4444" : "#a3a3a3",
              boxShadow: !fixed ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
            }}
          >
            ⚠ Broken
          </button>
          <button
            onClick={() => setFixed(true)}
            style={{
              padding: "3px 10px", fontSize: 10, fontWeight: 600, borderRadius: 6, border: "none", cursor: "pointer",
              fontFamily: "system-ui", transition: "all 220ms cubic-bezier(0.4,0,0.2,1)",
              background: fixed ? "white" : "transparent",
              color: fixed ? "#16a34a" : "#a3a3a3",
              boxShadow: fixed ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
            }}
          >
            ✓ Fixed
          </button>
        </div>
      </div>

      {/* Preview container */}
      <div
        style={{
          position: "relative",
          borderRadius: 10,
          overflow: "hidden",
          height: 280,
          background: "white",
          border: "1.5px dashed",
          borderColor: fixed ? "#bbf7d0" : "#fecaca",
          transition: "border-color 350ms ease",
        }}
      >
        {/* Bad layer */}
        <div
          ref={badRef}
          style={{
            position: "absolute", inset: 0,
            opacity: fixed ? 0 : 1,
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: fixed ? "none" : "auto",
          }}
        />
        {/* Good layer */}
        <div
          ref={goodRef}
          style={{
            position: "absolute", inset: 0,
            opacity: fixed ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: fixed ? "auto" : "none",
          }}
        />

        {/* Hotspot pins — only in broken mode */}
        {hotspots.map((hs, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              opacity: fixed ? 0 : 1,
              transition: `opacity ${200 + i * 30}ms ease`,
              pointerEvents: fixed ? "none" : "auto",
            }}
          >
            <HotspotPin hs={hs} index={i} onPinClick={onPinClick} />
          </div>
        ))}

        {/* Fixed badge */}
        <div
          style={{
            position: "absolute", top: 8, right: 8,
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            borderRadius: 6, padding: "3px 8px",
            fontSize: 9, color: "#15803d", fontWeight: 700,
            fontFamily: "monospace", letterSpacing: "0.04em",
            opacity: fixed ? 1 : 0,
            transform: fixed ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.95)",
            transition: "opacity 300ms ease 80ms, transform 300ms ease 80ms",
            pointerEvents: "none",
          }}
        >
          ✓ ALL ISSUES RESOLVED
        </div>
      </div>

      {/* Legend — only in broken mode */}
      <div
        style={{
          marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4,
          opacity: fixed ? 0 : 1,
          transition: "opacity 250ms ease",
          pointerEvents: fixed ? "none" : "auto",
          minHeight: 22,
        }}
      >
        {hotspots.map((hs, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#737373", fontFamily: "system-ui" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#ef4444", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, flexShrink: 0 }}>
              {i + 1}
            </span>
            {hs.label}
            {i < hotspots.length - 1 && <span style={{ color: "#e5e5e5", marginLeft: 2 }}>·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Prompt Panel ─────────────────────────────────────────────────────────────
function PromptPanel({ title, prompt, id, pulseKey }: { title: string; prompt: string; id: string; pulseKey?: number }) {
  const [copied, setCopied] = useState(false);
  const [glowing, setGlowing] = useState(false);
  const [houseCritique, setHouseCritique] = useState(DEFAULT_HOUSE_CRITIQUE);

  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem(HOUSE_CRITIQUE_STORAGE_KEY);
      if (storedProfile?.trim()) {
        setHouseCritique(storedProfile);
      }
    } catch {
      // Ignore storage access failures.
    }
  }, []);

  const intelligentPrompt = buildLibraryPrompt(title, prompt, houseCritique);

  const copy = () => {
    navigator.clipboard.writeText(intelligentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    if (!pulseKey) return;
    setGlowing(true);
    const t = setTimeout(() => setGlowing(false), 650);
    return () => clearTimeout(t);
  }, [pulseKey]);
  return (
    <div className="w-full lg:flex-1" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: glowing ? "#2563eb" : "#525252", textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 200ms ease" }}>
          {glowing ? "→ use this prompt" : "Enhanced fix prompt — includes foundations + house critique"}
        </div>
        <button
          onClick={copy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 500,
            border: "1px solid",
            borderRadius: 7,
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "system-ui",
            ...(copied
              ? { background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }
              : { background: "white", color: "#171717", borderColor: "#e5e5e5" }),
          }}
        >
          {copied ? "✓ Copied!" : "⎘ Copy prompt"}
        </button>
      </div>
      <pre
        style={{
          flex: 1,
          margin: 0,
          background: "#0a0a0a",
          border: glowing ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.07)",
          boxShadow: glowing ? "0 0 0 3px rgba(37,99,235,0.15), 0 0 20px rgba(37,99,235,0.08)" : "none",
          borderRadius: 10,
          padding: "14px 16px",
          fontSize: 11.5,
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.75,
          whiteSpace: "pre-wrap",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflowY: "auto",
          maxHeight: 340,
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        }}
      >
        {intelligentPrompt}
      </pre>
    </div>
  );
}

// ─── Prompts Data ─────────────────────────────────────────────────────────────
const PROMPTS: Prompt[] = [
  {
    id: "color-hierarchy",
    title: "Fix all color hierarchy issues",
    covers: "60-30-10 rule · accent overuse · semantic vs decorative color · pure black text",
    severity: "critical",
    prompt: `Audit and fix every color use in this component using the 60-30-10 rule:

60% DOMINANT NEUTRAL — all large surfaces must be white (#fff), near-white (#fafafa), or light gray (#f5f5f5). Remove any brand color from backgrounds wider than ~200px.

30% SECONDARY — borders (#e5e5e5), secondary text (#737373), hover states (bg-neutral-50), one optional light brand tint (bg-blue-50) for selected/active states only.

10% ACCENT — your brand color (e.g. bg-blue-600) for at most 1–2 solid elements visible without scrolling. Everything else recedes.

SPECIFIC FIXES:
1. Any header, sidebar, or section panel with a solid brand-color background → replace with white or #fafafa. Use typography and spacing for structure, not color.
2. Status badges must be semantic: green = active/success, amber = warning/pending, red = error/failed, gray = inactive. Never use pink for "active" or green for "failed."
3. Replace all pure #000000 body text with #111111 (neutral-950). Secondary: #525252 (neutral-600). Placeholder: #a3a3a3 (neutral-400). Never pure black on pure white.
4. If more than 2 solid-colored elements appear simultaneously (excluding semantic status badges), demote the lower-priority ones to neutral or ghost style.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white">
  <div style="background:#2563eb;padding:10px 14px;display:flex;justify-content:space-between;align-items:center">
    <span style="color:white;font-size:13px;font-weight:600">Dashboard Overview</span>
    <div style="display:flex;gap:6px">
      <button style="padding:4px 10px;background:#1d4ed8;color:white;border:none;border-radius:4px;font-size:11px;cursor:pointer">Export</button>
      <button style="padding:4px 10px;background:#1e40af;color:white;border:none;border-radius:4px;font-size:11px;cursor:pointer">Share</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px">
    <div style="background:#fef3c7;padding:10px;border-radius:6px">
      <div style="font-size:9px;color:#92400e;font-weight:600;text-transform:uppercase">Revenue</div>
      <div style="font-size:18px;font-weight:700;color:#000">$24k</div>
    </div>
    <div style="background:#dcfce7;padding:10px;border-radius:6px">
      <div style="font-size:9px;color:#065f46;font-weight:600;text-transform:uppercase">Users</div>
      <div style="font-size:18px;font-weight:700;color:#000">1,284</div>
    </div>
    <div style="background:#ede9fe;padding:10px;border-radius:6px">
      <div style="font-size:9px;color:#5b21b6;font-weight:600;text-transform:uppercase">Rate</div>
      <div style="font-size:18px;font-weight:700;color:#000">94%</div>
    </div>
  </div>
  <div style="padding:0 12px;display:flex;gap:5px">
    <span style="background:#fce7f3;color:#be185d;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">active</span>
    <span style="background:#dbeafe;color:#1d4ed8;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">pending</span>
    <span style="background:#fef3c7;color:#92400e;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">warning</span>
    <span style="background:#dcfce7;color:#065f46;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">failed</span>
  </div>
  <div style="padding:12px;font-size:12px;color:#000000;line-height:1.45;margin-top:4px">
    All body text uses pure #000000 on white. This maximum contrast ratio creates visual harshness that fatigues readers and signals amateur work.
  </div>
  <div style="padding:0 12px 12px;display:flex;gap:8px;margin-top:6px">
    <button style="flex:1;padding:8px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Save Dashboard</button>
    <button style="flex:1;padding:8px;background:#6b7280;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Cancel</button>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white">
  <div style="background:white;padding:10px 14px;border-bottom:1px solid #e5e5e5;display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:13px;font-weight:600;color:#111">Dashboard Overview</span>
    <div style="display:flex;gap:6px">
      <button style="padding:4px 10px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:4px;font-size:11px;cursor:pointer">Export</button>
      <button style="padding:4px 10px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:4px;font-size:11px;cursor:pointer">Share</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px">
    <div style="background:#fafafa;padding:10px;border-radius:6px;border:1px solid #e5e5e5">
      <div style="font-size:9px;color:#737373;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Revenue</div>
      <div style="font-size:18px;font-weight:700;color:#111;font-variant-numeric:tabular-nums">$24k</div>
    </div>
    <div style="background:#fafafa;padding:10px;border-radius:6px;border:1px solid #e5e5e5">
      <div style="font-size:9px;color:#737373;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Users</div>
      <div style="font-size:18px;font-weight:700;color:#111;font-variant-numeric:tabular-nums">1,284</div>
    </div>
    <div style="background:#fafafa;padding:10px;border-radius:6px;border:1px solid #e5e5e5">
      <div style="font-size:9px;color:#737373;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Rate</div>
      <div style="font-size:18px;font-weight:700;color:#111;font-variant-numeric:tabular-nums">94%</div>
    </div>
  </div>
  <div style="padding:0 12px;display:flex;gap:5px">
    <span style="background:#f0fdf4;color:#15803d;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">● active</span>
    <span style="background:#fefce8;color:#854d0e;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">● pending</span>
    <span style="background:#fefce8;color:#854d0e;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">● warning</span>
    <span style="background:#fef2f2;color:#dc2626;font-size:9px;padding:2px 7px;border-radius:99px;font-weight:500">● failed</span>
  </div>
  <div style="padding:12px;font-size:12px;color:#404040;line-height:1.6;margin-top:4px">
    Body text at #404040 — softer than pure black, easier to read. Near-black on white feels premium. Pure black feels amateur.
  </div>
  <div style="padding:0 12px 12px;display:flex;gap:8px;margin-top:6px">
    <button style="flex:1;padding:8px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Save Dashboard</button>
    <button style="flex:1;padding:8px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer">Cancel</button>
  </div>
</div>`,
    hotspots: [
      { x: 50, y: 6, label: "accent overuse" },
      { x: 83, y: 6, label: "no hierarchy" },
      { x: 50, y: 30, label: "decorative color" },
      { x: 32, y: 50, label: "color ≠ meaning" },
      { x: 35, y: 65, label: "near-black" },
      { x: 65, y: 90, label: "ghost it" },
    ],
  },

  {
    id: "typography-system",
    title: "Establish a consistent type scale",
    covers: "Font size system · line-height · weight hierarchy · tabular numbers · tracking",
    severity: "critical",
    prompt: `Establish a strict 5-size type scale and apply it throughout:

SCALE — use only these sizes:
• xs  (12px / text-xs):  timestamps, captions, eyebrow labels, metadata
• sm  (14px / text-sm):  body text, table cells, form labels, descriptions
• base (16px / text-base): card titles, modal headings, nav items
• lg  (18px / text-lg):  page section headings, subtitles
• xl+  (20px+):          page titles and hero display text only

SPECIFIC FIXES:
1. Find every custom font-size (13px, 11px, 15px, 17px, 22px, 11.5px) and map to the nearest scale step. Remove all arbitrary pixel values — use only the 5 Tailwind scale steps.
2. Any paragraph or multi-sentence text with line-height < 1.5 → change to leading-relaxed (1.625). Headings (text-xl+): leading-tight + tracking-tight.
3. Weight hierarchy: primary content = font-semibold text-neutral-900. Secondary = font-normal text-neutral-600. Metadata = font-normal text-neutral-400. Never use color-only to convey hierarchy — always pair weight changes with color changes.
4. All columns of numbers, metrics, prices, or percentages: add font-variant-numeric: tabular-nums (Tailwind: tabular-nums class) and text-right alignment.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:16px">
  <div style="font-size:22px;font-weight:700;color:#111;margin-bottom:2px">Dashboard</div>
  <div style="font-size:11px;color:#666;margin-bottom:14px">Your workspace overview</div>
  <div style="font-size:18px;font-weight:600;color:#111;margin-bottom:5px">Recent activity</div>
  <div style="font-size:13px;color:#444;margin-bottom:2px;line-height:1.15">Alex Morrison commented on your pull request. The fix resolves the layout overflow on button states and ensures consistent spacing across breakpoints.</div>
  <div style="font-size:10px;color:#999;margin-bottom:14px">2 minutes ago · 3 replies</div>
  <div style="display:flex;gap:12px">
    <div style="flex:1">
      <div style="font-size:15px;font-weight:600;color:#111;margin-bottom:4px">Quick stats</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;align-items:baseline">
        <span style="font-size:12px;color:#555">Components:</span>
        <span style="font-size:17px;font-weight:700;color:#2563eb">86</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span style="font-size:12px;color:#555">Exhibits:</span>
        <span style="font-size:17px;font-weight:700;color:#2563eb">1,111</span>
      </div>
    </div>
    <div style="flex:1;padding-left:12px;border-left:1px solid #f3f4f6">
      <div style="font-size:15px;font-weight:600;color:#111;margin-bottom:4px">Top category</div>
      <div style="font-size:13px;color:#444;margin-bottom:2px">Buttons &amp; CTAs</div>
      <div style="font-size:11.5px;color:#777">24 exhibits · Updated now</div>
    </div>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:16px">
  <div style="font-size:20px;font-weight:700;color:#111;margin-bottom:2px;letter-spacing:-0.02em;line-height:1.2">Dashboard</div>
  <div style="font-size:12px;color:#737373;margin-bottom:14px">Your workspace overview</div>
  <div style="font-size:16px;font-weight:600;color:#111;margin-bottom:5px">Recent activity</div>
  <div style="font-size:14px;color:#525252;margin-bottom:3px;line-height:1.65">Alex Morrison commented on your pull request. The fix resolves the layout overflow on button states and ensures consistent spacing.</div>
  <div style="font-size:12px;color:#a3a3a3;margin-bottom:14px">2 minutes ago · 3 replies</div>
  <div style="display:flex;gap:12px">
    <div style="flex:1">
      <div style="font-size:12px;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px">Quick stats</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;align-items:baseline">
        <span style="font-size:14px;color:#525252">Components</span>
        <span style="font-size:14px;font-weight:600;color:#111;font-variant-numeric:tabular-nums">86</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span style="font-size:14px;color:#525252">Exhibits</span>
        <span style="font-size:14px;font-weight:600;color:#111;font-variant-numeric:tabular-nums">1,111</span>
      </div>
    </div>
    <div style="flex:1;padding-left:12px;border-left:1px solid #f3f4f6">
      <div style="font-size:12px;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px">Top category</div>
      <div style="font-size:14px;color:#111;font-weight:500;margin-bottom:2px">Buttons &amp; CTAs</div>
      <div style="font-size:12px;color:#a3a3a3">24 exhibits · Updated now</div>
    </div>
  </div>
</div>`,
    hotspots: [
      { x: 28, y: 6, label: "8 font sizes" },
      { x: 55, y: 44, label: "cramped leading" },
      { x: 80, y: 65, label: "tabular nums" },
      { x: 25, y: 77, label: "weight-only" },
    ],
  },

  {
    id: "spacing-layout",
    title: "Normalize spacing and layout structure",
    covers: "8pt grid · whitespace · shadow system · max-width · visual grouping",
    severity: "critical",
    prompt: `Audit and fix all spacing and layout in this component:

4PT GRID — all spacing must be multiples of 4. Fix: 5px→4px, 7px→8px, 11px→12px, 13px→12px, 22px→24px, 5px border-radius→4px. Add no arbitrary pixel values. Use only Tailwind's scale (p-1=4px, p-2=8px, p-3=12px, p-4=16px, p-5=20px, p-6=24px...).

WHITESPACE — if padding is < 16px on a card, double it. Between list items: py-2.5 minimum. Between form fields: gap-5. Section headings: mt-8. The rule: if it looks right at current padding, it'll look better doubled. Dense tables/toolbars are the exception.

SHADOW SYSTEM — 3 levels, used strictly:
• bg-gray background + card: shadow-sm only (or just border)
• bg-white background + card: border border-neutral-200, NO shadow needed
• Hover interaction: hover:shadow-md transition-shadow
• Floating elements (dropdowns, modals): shadow-xl ONLY
Remove shadow-lg and shadow-xl from all static, non-floating elements.

MAX-WIDTH — apply to all text content:
• Reading text / paragraphs: max-w-prose (65ch)
• Form fields: max-w-md
• Dashboard containers: max-w-screen-xl mx-auto
• No line of readable text should exceed 80 characters

VISUAL GROUPING — related items close, unrelated items far:
Label + Input: mb-1.5 (tight = one unit). Between fields: gap-5. Between sections: mt-8 + border-t. Nav items in same group: space-y-0.5. Between nav groups: mt-6. Never uniform 12px between everything.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:#f5f5f5;padding:14px;display:flex;flex-direction:column;gap:10px">
  <div style="background:white;border-radius:7px;padding:13px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.15),0 10px 10px -5px rgba(0,0,0,0.08)">
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:5px">Project Alpha</div>
    <div style="font-size:11px;color:#666;margin-bottom:11px">Last updated 2 hours ago</div>
    <button style="padding:5px 11px;background:#2563eb;color:white;border:none;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer">View project</button>
  </div>
  <div style="background:white;border-radius:7px;padding:13px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.15),0 10px 10px -5px rgba(0,0,0,0.08)">
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:5px">Project Beta</div>
    <div style="font-size:11px;color:#666;margin-bottom:11px">Last updated yesterday</div>
    <button style="padding:5px 11px;background:#2563eb;color:white;border:none;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer">View project</button>
  </div>
  <div style="background:white;border-radius:7px;padding:13px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.15),0 10px 10px -5px rgba(0,0,0,0.08)">
    <p style="font-size:11px;color:#444;margin:0;line-height:1.5;width:100%">This description text stretches to the full container width with no maximum character limit applied at all, making it very difficult to read on wider screens.</p>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:#f5f5f5;padding:16px;display:flex;flex-direction:column;gap:8px">
  <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5">
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:4px">Project Alpha</div>
    <div style="font-size:12px;color:#737373;margin-bottom:12px">Last updated 2 hours ago</div>
    <button style="padding:6px 12px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">View project</button>
  </div>
  <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5">
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:4px">Project Beta</div>
    <div style="font-size:12px;color:#737373;margin-bottom:12px">Last updated yesterday</div>
    <button style="padding:6px 12px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">View project</button>
  </div>
  <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5">
    <p style="font-size:12px;color:#525252;margin:0;line-height:1.65;max-width:440px">Text constrained to max-width: 440px (~65ch). Lines stay under 80 chars at any screen width — readable, not exhausting.</p>
  </div>
</div>`,
    hotspots: [
      { x: 85, y: 19, label: "shadow-xl overkill" },
      { x: 22, y: 19, label: "off the grid" },
      { x: 85, y: 55, label: "flat elevation" },
      { x: 55, y: 83, label: "no max-width" },
    ],
  },

  {
    id: "button-hierarchy",
    title: "Rebuild button and CTA hierarchy",
    covers: "Ghost vs solid · one primary CTA · loading states · icon button labels · button sizing",
    severity: "critical",
    prompt: `Rebuild the entire button system with strict hierarchy:

ONE PRIMARY per section: Only ONE button gets the solid filled treatment (bg-blue-600 text-white hover:bg-blue-700). Everything else is demoted.

GHOST (secondary): background transparent, border 1px solid border-neutral-200, text-neutral-700, hover:bg-neutral-50 hover:border-neutral-300. This handles 70% of all buttons.

TEXT (tertiary): No background, no border, text-neutral-500, hover:bg-neutral-100 hover:text-neutral-900 rounded-md. For Cancel, Back, Skip, Dismiss.

SPECIFIC FIXES:
1. Every button with bg-gray-*, bg-neutral-100, bg-secondary, or any solid non-brand gray color → replace with ghost or text style.
2. If two solid buttons sit side by side, the secondary MUST become ghost. If three appear together, two must be ghost or text.
3. Add loading states to every button triggering an async operation: disabled={isLoading} + opacity-70 + Loader2 icon animate-spin + "Saving…" text. Show ✓ "Saved" for 1.5s after.
4. Every icon-only button needs: aria-label="[action]" + title="[action]" + hover:text-neutral-900 hover:bg-neutral-100.
5. Match button size to context: tables/toolbars → text-xs px-2.5 py-1. Cards/forms → text-sm px-4 py-2. Hero/empty states → text-base px-6 py-3.
6. Add active:scale-95 transition-all duration-150 to every button.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white">
  <div style="padding:10px 14px;border-bottom:1px solid #f3f4f6;display:flex;gap:6px;align-items:center">
    <span style="font-size:13px;font-weight:600;color:#111;flex:1">Document settings</span>
    <button style="padding:5px 10px;background:#e5e7eb;color:#374151;border:none;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer">Preview</button>
    <button style="padding:5px 10px;background:#d1d5db;color:#374151;border:none;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer">Duplicate</button>
    <button style="padding:5px 10px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer">Save</button>
  </div>
  <div style="padding:12px;display:flex;flex-direction:column;gap:9px">
    <div style="border:1px solid #f3f4f6;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;color:#111">Upgrade to Pro</span>
      <button style="padding:5px 12px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer">Upgrade</button>
    </div>
    <div style="border:1px solid #f3f4f6;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;color:#111">Invite team members</span>
      <button style="padding:5px 12px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer">Invite</button>
    </div>
  </div>
  <div style="padding:0 14px;display:flex;gap:5px;align-items:center">
    <button style="width:28px;height:28px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">⎘</button>
    <button style="width:28px;height:28px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">✏</button>
    <button style="width:28px;height:28px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px;color:#dc2626">🗑</button>
    <span style="font-size:9px;color:#9ca3af;margin-left:2px">no tooltips, no aria-labels</span>
  </div>
  <div style="padding:12px;border-top:1px solid #f3f4f6;margin-top:10px;display:flex;gap:7px">
    <button style="flex:1;padding:8px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Publish</button>
    <button style="flex:1;padding:8px;background:#6b7280;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Schedule</button>
    <button style="flex:1;padding:8px;background:#9ca3af;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Discard</button>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white">
  <div style="padding:10px 14px;border-bottom:1px solid #f3f4f6;display:flex;gap:6px;align-items:center">
    <span style="font-size:13px;font-weight:600;color:#111;flex:1">Document settings</span>
    <button style="padding:5px 10px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:4px;font-size:11px;cursor:pointer">Preview</button>
    <button style="padding:5px 10px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:4px;font-size:11px;cursor:pointer">Duplicate</button>
    <button style="padding:5px 10px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer">Save</button>
  </div>
  <div style="padding:12px;display:flex;flex-direction:column;gap:9px">
    <div style="border:1px solid #f3f4f6;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;color:#111">Upgrade to Pro</span>
      <button style="padding:5px 12px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer">Upgrade</button>
    </div>
    <div style="border:1px solid #f3f4f6;border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;color:#111">Invite team members</span>
      <button style="padding:5px 12px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:4px;font-size:11px;cursor:pointer">Invite</button>
    </div>
  </div>
  <div style="padding:0 14px;display:flex;gap:5px;align-items:center">
    <button title="Copy" style="width:32px;height:32px;background:none;border:1px solid #e5e5e5;border-radius:4px;cursor:pointer;font-size:13px">⎘</button>
    <button title="Edit" style="width:32px;height:32px;background:none;border:1px solid #e5e5e5;border-radius:4px;cursor:pointer;font-size:13px">✏</button>
    <button title="Delete" style="width:32px;height:32px;background:none;border:1px solid #fecaca;border-radius:4px;cursor:pointer;font-size:13px;color:#dc2626">🗑</button>
    <span style="font-size:9px;color:#10b981;margin-left:2px">✓ title + aria-label on each</span>
  </div>
  <div style="padding:12px;border-top:1px solid #f3f4f6;margin-top:10px;display:flex;gap:7px">
    <button style="flex:1;padding:8px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Publish</button>
    <button style="flex:1;padding:8px;background:transparent;color:#525252;border:1px solid #e5e5e5;border-radius:6px;font-size:12px;cursor:pointer">Schedule</button>
    <button style="flex:1;padding:8px;background:transparent;color:#737373;border:none;border-radius:6px;font-size:12px;cursor:pointer">Discard</button>
  </div>
</div>`,
    hotspots: [
      { x: 62, y: 9, label: "gray solid btn" },
      { x: 80, y: 41, label: "3 primaries" },
      { x: 20, y: 61, label: "unlabeled icons" },
      { x: 50, y: 89, label: "1 solid max" },
    ],
  },

  {
    id: "form-design",
    title: "Overhaul all form inputs and fields",
    covers: "Persistent labels · custom selects · validation states · checkboxes · field spacing",
    severity: "critical",
    prompt: `Overhaul every form field in this component:

LABELS — every input must have a persistent visible label:
<label className="block text-sm font-medium text-neutral-700 mb-1.5">Field Name</label>
Placeholder is ONLY for format hints: "e.g. alex@example.com". Never use placeholder as the sole label — it vanishes when the user types and fails accessibility.

CUSTOM SELECT — replace every native <select>:
Trigger: border border-neutral-200 rounded-lg px-3 py-2 text-sm flex items-center justify-between + ChevronDown icon (rotate-180 when open). Dropdown panel: absolute, z-50, border border-neutral-200, rounded-xl, shadow-lg, bg-white. Options: px-3 py-2 hover:bg-neutral-50, checkmark on selected option. Use Radix UI Select.

CHECKBOXES & RADIOS — replace native controls:
Custom div: w-4 h-4 rounded border-2 border-neutral-300, checked: bg-blue-600 border-blue-600 with white check SVG. Radio: rounded-full, checked: border-blue-600 with w-2 h-2 bg-blue-600 inner circle. focus-visible:ring-2 ring-blue-500/30.

VALIDATION — three states on every input:
• Idle: border-neutral-200, focus: border-blue-500 + ring-2 ring-blue-500/15
• Valid: border-emerald-400 + CheckCircle icon text-emerald-500 right-side
• Invalid: border-red-400 + AlertCircle icon text-red-500 + text-xs text-red-600 message below + aria-invalid="true"
Validate on blur, not on every keystroke.

SPACING: Between fields: gap-5. Label to input: mb-1.5. Input to helper: mt-1. Submit: mt-6.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:16px">
  <div style="font-size:14px;font-weight:600;color:#111;margin-bottom:14px">Create account</div>
  <div style="display:flex;flex-direction:column;gap:7px">
    <input placeholder="First name" style="padding:8px 10px;border:1px solid #d1d5db;border-radius:5px;font-size:12px;font-family:inherit;width:100%;box-sizing:border-box;outline:none">
    <input placeholder="Email address" type="email" style="padding:8px 10px;border:1px solid #d1d5db;border-radius:5px;font-size:12px;font-family:inherit;width:100%;box-sizing:border-box;outline:none">
    <select style="padding:8px 10px;border:1px solid #d1d5db;border-radius:5px;font-size:12px;font-family:inherit;width:100%;box-sizing:border-box;color:#374151">
      <option>Choose your role...</option>
      <option>Designer</option><option>Engineer</option><option>Product Manager</option>
    </select>
    <div style="display:flex;flex-direction:column;gap:5px;margin-top:2px">
      <label style="display:flex;align-items:center;gap:6px;font-size:11px;color:#374151;cursor:pointer"><input type="checkbox" checked style="margin:0"> Send me product updates</label>
      <label style="display:flex;align-items:center;gap:6px;font-size:11px;color:#374151;cursor:pointer"><input type="checkbox" style="margin:0"> Subscribe to newsletter</label>
    </div>
    <button style="margin-top:3px;padding:9px;background:#2563eb;color:white;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;width:100%">Create account</button>
    <div style="font-size:10px;color:#ef4444;margin-top:2px">Error: Please fix the errors above.</div>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:16px">
  <div style="font-size:14px;font-weight:600;color:#111;margin-bottom:14px">Create account</div>
  <div style="display:flex;flex-direction:column;gap:10px">
    <div>
      <label style="display:block;font-size:11px;font-weight:500;color:#374151;margin-bottom:4px">First name</label>
      <input placeholder="e.g. Alex" style="padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:12px;font-family:inherit;width:100%;box-sizing:border-box;outline:none">
    </div>
    <div>
      <label style="display:block;font-size:11px;font-weight:500;color:#374151;margin-bottom:4px">Email address</label>
      <div style="position:relative">
        <input value="alex@example.com" style="padding:8px 10px;border:1.5px solid #34d399;border-radius:6px;font-size:12px;font-family:inherit;width:100%;box-sizing:border-box;outline:none;padding-right:28px">
        <span style="position:absolute;right:9px;top:50%;transform:translateY(-50%);color:#10b981;font-size:12px">✓</span>
      </div>
    </div>
    <div>
      <label style="display:block;font-size:11px;font-weight:500;color:#374151;margin-bottom:4px">Your role</label>
      <div style="padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:12px;display:flex;justify-content:space-between;align-items:center;color:#374151;cursor:pointer">
        <span>Designer</span><span style="color:#9ca3af;font-size:10px">▾</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px">
      <label style="display:flex;align-items:center;gap:7px;font-size:11px;color:#374151;cursor:pointer">
        <div style="width:14px;height:14px;background:#2563eb;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <div style="width:6px;height:4px;border-left:2px solid white;border-bottom:2px solid white;transform:rotate(-45deg);margin-top:-1px"></div>
        </div>Send me product updates</label>
      <label style="display:flex;align-items:center;gap:7px;font-size:11px;color:#374151;cursor:pointer">
        <div style="width:14px;height:14px;background:white;border-radius:3px;border:2px solid #d1d5db;flex-shrink:0"></div>Subscribe to newsletter</label>
    </div>
  </div>
</div>`,
    hotspots: [
      { x: 50, y: 20, label: "placeholder label" },
      { x: 50, y: 33, label: "placeholder label" },
      { x: 50, y: 46, label: "native select" },
      { x: 18, y: 60, label: "native checkbox" },
      { x: 50, y: 83, label: "inline errors" },
    ],
  },

  {
    id: "states-feedback",
    title: "Design every state and feedback moment",
    covers: "Skeleton loading · empty states · actionable errors · toast vs banners",
    severity: "high",
    prompt: `Design every possible UI state this component can be in:

LOADING — skeleton screens, not spinners:
Replace every centered spinner inside content areas with a skeleton that matches the exact layout shape. Pattern: bg-neutral-200 animate-pulse rounded. Lines: vary widths (w-full, w-4/5, w-3/4) to mimic real text. Skeleton cards: same size as real cards with gray rectangles inside. Keep spinners ONLY for button loading states and small inline loaders.

EMPTY STATE — required for every list/table/grid:
Structure: (1) Icon 40-48px text-neutral-300, (2) Heading "No [X] yet" text-base font-semibold text-neutral-700, (3) Description text-sm text-neutral-500 max-w-xs text-center explaining what to do, (4) Optional CTA. Center with py-16. Tone: "You haven't created any projects yet. Start by creating your first one."

ERROR STATE — specific and actionable, never generic:
Replace "Something went wrong" / "Error code: 500" with: "Couldn't load [resource]." + reason if known ("Check your connection") + ghost retry button. Icon: AlertCircle text-red-400. Heading: font-semibold text-neutral-800. Never use red for the retry button.

CONFIRMATIONS — toast, not full-width banners:
Move inline success/info banners to toast notifications: fixed top-right, max-w-sm (360px), auto-dismiss 3s (success) / 5s (error). Persistent full-width banners only for sticky alerts needing user action (email verification, payment failure).`,
    badExample: `<style>@keyframes sp{to{transform:rotate(360deg)}}</style>
<div style="font-family:system-ui;height:280px;overflow:hidden;background:#f9fafb;display:flex;flex-direction:column;gap:8px;padding:12px">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;flex:1">
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Your projects</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <span style="font-size:10px;color:#d1d5db">No projects</span>
      </div>
    </div>
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Components</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <div style="width:20px;height:20px;border:2px solid #e5e7eb;border-top-color:#6b7280;border-radius:50%;animation:sp 0.9s linear infinite"></div>
      </div>
    </div>
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Analytics</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px;text-align:center">
        <span style="font-size:11px;color:#ef4444;font-weight:500">Something went wrong.</span>
        <span style="font-size:9px;color:#9ca3af">Error code: 500</span>
      </div>
    </div>
  </div>
  <div style="background:#d1fae5;border:1px solid #6ee7b7;border-radius:6px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">
    <div>
      <div style="font-size:10px;font-weight:600;color:#065f46">✓ Settings saved successfully</div>
      <div style="font-size:9px;color:#047857">Your changes are now live and visible to all team members.</div>
    </div>
    <button style="background:none;border:none;color:#065f46;cursor:pointer;font-size:12px">✕</button>
  </div>
</div>`,
    goodExample: `<style>@keyframes sk2{0%,100%{opacity:1}50%{opacity:0.4}}</style>
<div style="font-family:system-ui;height:280px;overflow:hidden;background:#f9fafb;display:flex;flex-direction:column;gap:8px;padding:12px;position:relative">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;flex:1">
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Your projects</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px;text-align:center;gap:4px">
        <div style="font-size:22px;color:#d4d4d4">⊞</div>
        <div style="font-size:10px;font-weight:600;color:#525252">No projects yet</div>
        <div style="font-size:9px;color:#a3a3a3;line-height:1.4">Create your first to get started</div>
        <button style="padding:3px 8px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:9px;font-weight:600;cursor:pointer;margin-top:2px">+ New</button>
      </div>
    </div>
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Components</div>
      <div style="flex:1;padding:10px;display:flex;flex-direction:column;gap:6px">
        <div style="height:8px;background:#e5e5e5;border-radius:4px;width:100%;animation:sk2 1.5s ease-in-out infinite"></div>
        <div style="height:8px;background:#e5e5e5;border-radius:4px;width:80%;animation:sk2 1.5s ease-in-out infinite;animation-delay:0.15s"></div>
        <div style="height:8px;background:#e5e5e5;border-radius:4px;width:90%;animation:sk2 1.5s ease-in-out infinite;animation-delay:0.3s"></div>
        <div style="height:8px;background:#e5e5e5;border-radius:4px;width:65%;animation:sk2 1.5s ease-in-out infinite;animation-delay:0.45s"></div>
      </div>
    </div>
    <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;display:flex;flex-direction:column">
      <div style="padding:7px 10px;border-bottom:1px solid #f3f4f6;font-size:10px;font-weight:600;color:#374151">Analytics</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px;text-align:center">
        <div style="font-size:18px;color:#fca5a5">⚠</div>
        <div style="font-size:10px;font-weight:600;color:#374151">Couldn't load analytics</div>
        <div style="font-size:9px;color:#9ca3af">Check your connection</div>
        <button style="padding:3px 8px;background:transparent;color:#374151;border:1px solid #e5e7eb;border-radius:4px;font-size:9px;cursor:pointer;margin-top:2px">Try again</button>
      </div>
    </div>
  </div>
  <div style="position:absolute;top:8px;right:8px;background:#111;border-radius:8px;padding:8px 10px;width:150px;box-shadow:0 8px 24px rgba(0,0,0,0.2);display:flex;align-items:flex-start;gap:6px">
    <span style="color:#34d399;font-size:11px;margin-top:1px">✓</span>
    <div>
      <div style="font-size:10px;font-weight:600;color:white">Settings saved</div>
      <div style="font-size:9px;color:rgba(255,255,255,0.5);margin-top:1px">Dismisses in 3s</div>
    </div>
  </div>
</div>`,
    hotspots: [
      { x: 17, y: 45, label: "dead empty state" },
      { x: 50, y: 45, label: "spinner void" },
      { x: 83, y: 45, label: "generic error" },
      { x: 50, y: 82, label: "banner vs toast" },
    ],
  },

  {
    id: "navigation-clarity",
    title: "Fix all navigation clarity issues",
    covers: "Active states · tabs vs dropdowns · breadcrumbs · mobile bottom nav",
    severity: "high",
    prompt: `Fix every navigation pattern in this component:

ACTIVE STATE — must be visually unambiguous:
Active nav item needs ALL of: background fill (bg-blue-50 or bg-neutral-100) + text color change (text-blue-700 font-semibold or text-neutral-900 font-semibold) + optional left border accent (border-l-2 border-blue-600). Icons must also match color. Never rely on font-weight alone — it's invisible to most users.

TABS vs SELECTS:
• 2-5 mutually exclusive options users switch between frequently → tabs (always visible)
• Underline tabs: border-b-2 border-blue-600 text-blue-600 font-medium on active; rest text-neutral-500 hover:text-neutral-700
• Pill tabs: bg-neutral-100 track, bg-white shadow-sm rounded-lg active pill
• 6+ options → dropdown/combobox

BREADCRUMBS — required for pages 3+ levels deep:
<nav>Home / Section / CurrentPage</nav> — positioned above the page title. Non-current links: text-sm text-neutral-500 hover:text-neutral-800. Current: text-neutral-900 font-medium, NOT a link. Separator: ChevronRight w-3.5 text-neutral-300.

MOBILE — bottom tab bar over hamburger:
For 3-5 primary destinations: fixed bottom-0 h-16 bg-white border-t border-neutral-200 flex justify-around. Each tab: icon + text-[10px] label. Active: text-blue-600 for both. Add pb-16 to page content. Keep hamburger ONLY for secondary/settings nav.`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;display:flex;background:white">
  <div style="width:140px;background:#f9fafb;border-right:1px solid #e5e7eb;padding:10px;flex-shrink:0">
    <div style="font-size:9px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:7px">Navigation</div>
    <div style="padding:6px 8px;font-size:12px;color:#374151;border-radius:4px;margin-bottom:2px;font-weight:500;cursor:pointer">Dashboard</div>
    <div style="padding:6px 8px;font-size:12px;color:#374151;border-radius:4px;margin-bottom:2px;cursor:pointer">Components</div>
    <div style="padding:6px 8px;font-size:12px;color:#374151;border-radius:4px;margin-bottom:2px;cursor:pointer">Analytics</div>
    <div style="padding:6px 8px;font-size:12px;color:#374151;border-radius:4px;margin-bottom:2px;cursor:pointer">Settings</div>
    <div style="font-size:9px;color:#ef4444;margin-top:5px;font-family:monospace;line-height:1.4">↑ which one is active?</div>
  </div>
  <div style="flex:1;padding:12px;overflow:hidden">
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:10px">Settings / API Keys / Production</div>
    <div style="margin-bottom:10px;display:flex;align-items:center;gap:6px">
      <span style="font-size:10px;color:#6b7280">Filter:</span>
      <select style="font-size:11px;padding:3px 6px;border:1px solid #d1d5db;border-radius:4px;font-family:inherit">
        <option>All keys</option><option>Active</option><option>Revoked</option>
      </select>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px">
      <div style="padding:7px 9px;border:1px solid #f3f4f6;border-radius:4px;font-size:11px;color:#374151;display:flex;justify-content:space-between">
        <span style="font-family:monospace;font-size:10px">sk_prod_••••4f2a</span><span style="color:#059669;font-size:10px">Active</span>
      </div>
      <div style="padding:7px 9px;border:1px solid #f3f4f6;border-radius:4px;font-size:11px;color:#374151;display:flex;justify-content:space-between">
        <span style="font-family:monospace;font-size:10px">sk_prod_••••8c1b</span><span style="color:#9ca3af;font-size:10px">Revoked</span>
      </div>
    </div>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;display:flex;background:white">
  <div style="width:140px;background:#f9fafb;border-right:1px solid #e5e7eb;padding:10px;flex-shrink:0">
    <div style="font-size:9px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:7px">Navigation</div>
    <div style="padding:6px 8px;font-size:12px;color:#1d4ed8;border-radius:4px;margin-bottom:2px;font-weight:600;cursor:pointer;background:#eff6ff;border-left:2px solid #2563eb">Dashboard</div>
    <div style="padding:6px 8px;font-size:12px;color:#525252;border-radius:4px;margin-bottom:2px;cursor:pointer">Components</div>
    <div style="padding:6px 8px;font-size:12px;color:#525252;border-radius:4px;margin-bottom:2px;cursor:pointer">Analytics</div>
    <div style="padding:6px 8px;font-size:12px;color:#525252;border-radius:4px;margin-bottom:2px;cursor:pointer">Settings</div>
    <div style="font-size:9px;color:#10b981;margin-top:5px;font-family:monospace;line-height:1.4">✓ bg + color + border-l</div>
  </div>
  <div style="flex:1;padding:12px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:4px;margin-bottom:8px">
      <span style="font-size:10px;color:#737373;cursor:pointer">Settings</span>
      <span style="font-size:10px;color:#d4d4d4">›</span>
      <span style="font-size:10px;color:#737373;cursor:pointer">API Keys</span>
      <span style="font-size:10px;color:#d4d4d4">›</span>
      <span style="font-size:10px;color:#111;font-weight:500">Production</span>
    </div>
    <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:10px">Production API Keys</div>
    <div style="display:flex;gap:0;margin-bottom:10px;border-bottom:1px solid #f3f4f6">
      <button style="padding:5px 10px;font-size:11px;font-weight:600;color:#2563eb;border:none;background:transparent;border-bottom:2px solid #2563eb;cursor:pointer;font-family:inherit;margin-bottom:-1px">All keys</button>
      <button style="padding:5px 10px;font-size:11px;color:#737373;border:none;background:transparent;cursor:pointer;font-family:inherit">Active</button>
      <button style="padding:5px 10px;font-size:11px;color:#737373;border:none;background:transparent;cursor:pointer;font-family:inherit">Revoked</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px">
      <div style="padding:7px 9px;border:1px solid #f3f4f6;border-radius:4px;font-size:11px;color:#374151;display:flex;justify-content:space-between">
        <span style="font-family:monospace;font-size:10px">sk_prod_••••4f2a</span><span style="color:#059669;font-size:10px">Active</span>
      </div>
      <div style="padding:7px 9px;border:1px solid #f3f4f6;border-radius:4px;font-size:11px;color:#374151;display:flex;justify-content:space-between">
        <span style="font-family:monospace;font-size:10px">sk_prod_••••8c1b</span><span style="color:#9ca3af;font-size:10px">Revoked</span>
      </div>
    </div>
  </div>
</div>`,
    hotspots: [
      { x: 11, y: 36, label: "invisible active" },
      { x: 55, y: 8, label: "title ≠ breadcrumb" },
      { x: 43, y: 30, label: "dropdown for 3" },
    ],
  },

  {
    id: "accessibility",
    title: "Fix all accessibility failures",
    covers: "WCAG AA contrast · ARIA labels · focus rings · touch target size",
    severity: "critical",
    prompt: `Fix every accessibility failure to meet WCAG 2.1 AA:

COLOR CONTRAST minimums:
• Normal text (< 18pt / 14pt bold): 4.5:1 ratio minimum
• Large text (≥ 18pt or 14pt bold): 3:1 minimum
• UI components and icons: 3:1 minimum
Common failures:
– text-neutral-400 (#a3a3a3) on white = 2.85:1 → FAIL → use text-neutral-500 (#737373) = 4.48:1 ✓
– text-blue-300 on white = 2.0:1 → FAIL → use text-blue-600 (#2563eb) = 5.9:1 ✓
– White text on yellow/amber backgrounds → FAIL → use dark text (text-amber-900)

ARIA LABELS — every unlabeled interactive element:
• Icon buttons: aria-label="Delete item" title="Delete item" on every button with no text
• Toggle buttons: aria-pressed={isActive}
• Dialogs: role="dialog" aria-modal="true" aria-labelledby="[heading-id]"
• Status dots: <span aria-label="Status: Active" className="w-2 h-2 rounded-full bg-emerald-500" />
• Error messages: role="alert" so screen readers announce them immediately
• Loading: aria-busy="true" aria-live="polite" on loading containers

FOCUS STATES — never remove without replacing:
• Buttons: focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2
• Inputs: focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
• Links: focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2
Never use outline:none without a ring replacement. Use focus-visible (not focus) so mouse users don't see rings.

TOUCH TARGETS — minimum 44×44px (Apple HIG / WCAG 2.5.5):
All interactive elements need min-h-[44px] min-w-[44px]. Add p-2.5 or p-3 to small icon buttons. Apply via responsive class: sm:p-1 md:p-1 (desktop tight) with base p-2.5 (mobile safe).`,
    badExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:14px">
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#ef4444;font-family:monospace;margin-bottom:5px;font-weight:600">CONTRAST FAILURES:</div>
    <div style="font-size:13px;color:#d1d5db;margin-bottom:2px">This text is text-neutral-300 on white = 1.6:1 ratio ❌</div>
    <div style="font-size:13px;color:#93c5fd;margin-bottom:2px">Blue-300 on white = 2.2:1 ratio ❌</div>
    <div style="display:inline-block;background:#fef08a;padding:3px 8px;border-radius:3px;font-size:12px;color:#ffffff;margin-bottom:2px">White text on yellow = 1.3:1 ❌</div>
  </div>
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#ef4444;font-family:monospace;margin-bottom:5px;font-weight:600">NO ARIA LABELS:</div>
    <div style="display:flex;gap:5px;align-items:center">
      <button style="width:28px;height:28px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">⎘</button>
      <button style="width:28px;height:28px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">✏</button>
      <button style="width:28px;height:28px;background:none;border:1px solid #fecaca;border-radius:4px;cursor:pointer;font-size:13px;color:#dc2626">🗑</button>
      <span style="font-size:9px;color:#9ca3af">screen reader hears: "button button button"</span>
    </div>
  </div>
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#ef4444;font-family:monospace;margin-bottom:5px;font-weight:600">24PX TAP TARGETS (need 44px):</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:11px;color:#374151">Email updates</span>
        <button style="width:24px;height:24px;background:#3b82f6;border:none;border-radius:3px;cursor:pointer;font-size:8px;color:white">ON</button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:11px;color:#374151">Push notifications</span>
        <button style="width:24px;height:24px;background:#e5e7eb;border:none;border-radius:3px;cursor:pointer;font-size:8px;color:#374151">OFF</button>
      </div>
    </div>
  </div>
  <div>
    <div style="font-size:9px;color:#ef4444;font-family:monospace;margin-bottom:5px;font-weight:600">NO FOCUS RINGS (tab through these):</div>
    <div style="display:flex;gap:6px">
      <button style="padding:5px 10px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;cursor:pointer;outline:none">Sign in</button>
      <a href="#" onclick="return false" style="padding:5px 10px;font-size:11px;color:#2563eb;text-decoration:none;outline:none;border-radius:4px">Forgot password?</a>
    </div>
  </div>
</div>`,
    goodExample: `<div style="font-family:system-ui;height:280px;overflow:hidden;background:white;padding:14px">
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#10b981;font-family:monospace;margin-bottom:5px;font-weight:600">✓ PASSING CONTRAST:</div>
    <div style="font-size:13px;color:#525252;margin-bottom:2px">neutral-600 on white = 7.0:1 ✓</div>
    <div style="font-size:13px;color:#2563eb;margin-bottom:2px">blue-600 on white = 5.9:1 ✓</div>
    <div style="display:inline-block;background:#fef08a;padding:3px 8px;border-radius:3px;font-size:12px;color:#713f12">Dark text on yellow = 9.7:1 ✓</div>
  </div>
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#10b981;font-family:monospace;margin-bottom:5px;font-weight:600">✓ ARIA-LABELED + SIZED:</div>
    <div style="display:flex;gap:5px;align-items:center">
      <button aria-label="Copy" title="Copy" style="width:32px;height:32px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">⎘</button>
      <button aria-label="Edit" title="Edit" style="width:32px;height:32px;background:none;border:1px solid #e5e7eb;border-radius:4px;cursor:pointer;font-size:13px">✏</button>
      <button aria-label="Delete" title="Delete" style="width:32px;height:32px;background:none;border:1px solid #fecaca;border-radius:4px;cursor:pointer;font-size:13px;color:#dc2626">🗑</button>
      <span style="font-size:9px;color:#10b981">aria-label on each</span>
    </div>
  </div>
  <div style="margin-bottom:12px">
    <div style="font-size:9px;color:#10b981;font-family:monospace;margin-bottom:5px;font-weight:600">✓ 44PX TOUCH TARGETS:</div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:11px;color:#374151">Email updates</span>
      <button style="min-width:44px;height:44px;background:#2563eb;border:none;border-radius:6px;cursor:pointer;font-size:10px;color:white;padding:0 10px">ON</button>
    </div>
  </div>
  <div>
    <div style="font-size:9px;color:#10b981;font-family:monospace;margin-bottom:5px;font-weight:600">✓ VISIBLE FOCUS RINGS:</div>
    <div style="display:flex;gap:6px">
      <button style="padding:5px 10px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:11px;cursor:pointer;outline:2px solid #93c5fd;outline-offset:2px">Sign in</button>
      <a href="#" onclick="return false" style="padding:5px 10px;font-size:11px;color:#2563eb;text-decoration:none;border-radius:4px;outline:2px solid #93c5fd;outline-offset:2px">Forgot?</a>
    </div>
  </div>
</div>`,
    hotspots: [
      { x: 42, y: 13, label: "contrast fail" },
      { x: 22, y: 45, label: "no aria-label" },
      { x: 82, y: 63, label: "24px target" },
      { x: 28, y: 86, label: "no focus ring" },
    ],
  },
];

// ─── Prompt Card ──────────────────────────────────────────────────────────────
function PromptCard({ p }: { p: Prompt }) {
  const [open, setOpen] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  return (
    <div
      className={cn(
        "border rounded-xl bg-card transition-all duration-200",
        open ? "border-primary/25 shadow-sm" : "border-border hover:border-neutral-300 hover:shadow-sm"
      )}
    >
      {/* Header */}
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{p.title}</span>
            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md border shrink-0", SEV_COLOR[p.severity])}>
              {p.severity}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{p.covers}</p>
        </div>
        <div className={cn("text-muted-foreground transition-transform duration-200 shrink-0 mt-0.5", open && "rotate-180")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="px-4 pb-5 pt-0">
          <div className="border-t border-border pt-4">
            <div className="flex flex-col lg:flex-row gap-5">
              <BadExample html={p.badExample} goodHtml={p.goodExample} hotspots={p.hotspots} onPinClick={() => setPulseKey(k => k + 1)} />
              <PromptPanel title={p.title} prompt={p.prompt} id={p.id} pulseKey={pulseKey} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PromptsPage() {
  return (
    <Layout>
      {/* Pulse animation */}
      <style>{`
        @keyframes hs-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <Tabs defaultValue="create" className="space-y-4">
        <div className="rounded-[28px] border border-border bg-card px-5 py-4 shadow-sm md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Prompt Builder</h1>
              <p className="mt-1 text-sm text-muted-foreground">Build from screenshots or HTML, then lock the brief.</p>
            </div>

            <TabsList className="grid w-full max-w-[320px] grid-cols-2">
              <TabsTrigger value="create">Create Prompt</TabsTrigger>
              <TabsTrigger value="library">Prompt Library</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="create" className="mt-0">
          <PromptStudio />
        </TabsContent>

        <TabsContent value="library" className="mt-0 space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Prompt Library</h2>
            <p className="mt-1 text-sm text-muted-foreground">Reusable repair prompts with the same foundation rules and local house critique.</p>
          </div>

          <div className="space-y-2.5">
            {PROMPTS.map(p => (
              <PromptCard key={p.id} p={p} />
            ))}
          </div>

          <div className="border-t border-border pt-8 text-center">
            <div className="mx-auto max-w-lg text-sm text-muted-foreground">
              Principles from Nielsen Norman Group, WCAG 2.1, Material Design 3, Apple HIG, and Refactoring UI.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
