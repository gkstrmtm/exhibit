import { db } from "./storage";
import { exhibits } from "@shared/schema";
import { sql } from "drizzle-orm";
import { dashboardExhibits } from "./seeds/dashboard";
import { onboardingAuthExhibits } from "./seeds/onboarding-auth";
import { commerceExhibits } from "./seeds/commerce";
import { dataAdminExhibits } from "./seeds/data-admin";
import { marketplaceSocialExhibits } from "./seeds/marketplace-social";
import { feedbackStyleExhibits } from "./seeds/feedback-styles";

const seedData = [
  {
    slug: "neo-brutalist-buttons",
    title: "Neo-Brutalist Buttons",
    description: "High contrast, hard shadows, and bold borders. Perfect for calls to action that demand attention.",
    category: "Buttons",
    tags: ["brutalism", "buttons", "interactive", "bold"],
    style: "",
    code: `export default function NeoBrutalistButtons() {
  return (
    <div className="p-8 flex gap-4 items-center justify-center bg-[#FFDEE2]">
      <button className="px-6 py-3 font-bold bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black">
        CONFIRM ACTION
      </button>
      <button className="px-6 py-3 font-bold bg-[#A3E635] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 text-black">
        NEXT STEP →
      </button>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;display:flex;gap:1rem;align-items:center;justify-content:center;background:#FFDEE2">
  <button style="padding:0.75rem 1.5rem;font-weight:700;background:white;border:2px solid black;box-shadow:4px 4px 0px 0px rgba(0,0,0,1);color:black;cursor:pointer;font-family:inherit;font-size:0.875rem">CONFIRM ACTION</button>
  <button style="padding:0.75rem 1.5rem;font-weight:700;background:#A3E635;border:2px solid black;box-shadow:4px 4px 0px 0px rgba(0,0,0,1);color:black;cursor:pointer;font-family:inherit;font-size:0.875rem;display:flex;align-items:center;gap:0.5rem">NEXT STEP →</button>
</div>`,
  },
  {
    slug: "glassmorphism-card",
    title: "Glassmorphism Credit Card",
    description: "Frosted glass effect with backdrop-blur and semi-transparent borders. Adds depth on gradient backgrounds.",
    category: "Cards",
    tags: ["glass", "blur", "card", "modern", "gradient"],
    style: "",
    code: `export default function GlassCard() {
  return (
    <div className="p-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center min-h-[300px]">
      <div className="relative w-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden p-6 text-white flex flex-col gap-6">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style="font-size:0.65rem;font-family:monospace;opacity:0.6;letter-spacing:0.1em">MEMBER</div>
        </div>
        <div>
          <div style="font-size:0.875rem;opacity:0.8">Total Balance</div>
          <div style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em">$12,450.00</div>
        </div>
        <div style="font-size:0.65rem;opacity:0.5;font-family:monospace">**** **** **** 4291</div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:linear-gradient(to bottom right,#a855f7,#ec4899,#f97316);display:flex;align-items:center;justify-content:center;min-height:300px">
  <div style="position:relative;width:20rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);overflow:hidden;padding:1.5rem;color:white;display:flex;flex-direction:column;gap:1.5rem">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div style="padding:0.5rem;background:rgba(255,255,255,0.2);border-radius:0.5rem"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      <div style="font-size:0.65rem;font-family:monospace;opacity:0.6;letter-spacing:0.1em">MEMBER</div>
    </div>
    <div><div style="font-size:0.875rem;opacity:0.8">Total Balance</div><div style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em">$12,450.00</div></div>
    <div style="font-size:0.65rem;opacity:0.5;font-family:monospace">**** **** **** 4291</div>
  </div>
</div>`,
  },
  {
    slug: "swiss-inputs",
    title: "Swiss Style Inputs",
    description: "Minimalist form fields relying on typography, whitespace, and subtle micro-interactions.",
    category: "Inputs",
    tags: ["swiss", "form", "input", "minimal", "typography"],
    style: "",
    code: `export default function SwissInput() {
  return (
    <div className="p-12 bg-[#F5F5F5] flex flex-col gap-8 items-center justify-center min-h-[300px]">
      <div className="w-full max-w-md relative group">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full bg-transparent border-b-2 border-neutral-300 py-2 text-lg focus:outline-none focus:border-blue-600 transition-colors placeholder:text-neutral-400 font-medium"
        />
      </div>
      <div className="w-full max-w-md relative">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
          Search Archive
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full bg-white border border-neutral-200 pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-neutral-400 shadow-sm"
            placeholder="Type to search..."
          />
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#F5F5F5;display:flex;flex-direction:column;gap:2rem;align-items:center;justify-content:center;min-height:300px">
  <div style="width:100%;max-width:28rem">
    <label style="display:block;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#737373;margin-bottom:0.375rem">Email Address</label>
    <input type="email" placeholder="name@example.com" style="width:100%;background:transparent;border:none;border-bottom:2px solid #d4d4d4;padding:0.5rem 0;font-size:1.125rem;outline:none;font-weight:500;color:#171717;font-family:inherit" />
  </div>
  <div style="width:100%;max-width:28rem">
    <label style="display:block;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#737373;margin-bottom:0.375rem">Search Archive</label>
    <input type="text" placeholder="Type to search..." style="width:100%;background:white;border:1px solid #e5e5e5;padding:0.75rem;font-size:0.875rem;outline:none;box-shadow:0 1px 2px rgba(0,0,0,0.05);color:#171717;font-family:inherit" />
  </div>
</div>`,
  },
  {
    slug: "typographic-hero",
    title: "Typographic Hero System",
    description: "Massive editorial-style hero with strict grid hierarchy. Inspired by Swiss International Style posters.",
    category: "Layout",
    tags: ["hero", "typography", "editorial", "swiss", "layout"],
    style: "",
    code: `export default function TypographicHero() {
  return (
    <div className="bg-[#f0f0f0] text-black min-h-[400px] flex flex-col justify-between p-8 md:p-16 border border-black">
      <div className="border-b border-black pb-4 flex justify-between items-end">
        <span className="font-mono text-xs tracking-widest uppercase">Volume 01</span>
        <span className="font-mono text-xs tracking-widest uppercase">2024—25</span>
      </div>
      <div className="py-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase break-words">
          Digital<br/>Archival<br/>Systems
        </h1>
      </div>
      <div className="flex justify-between items-start border-t border-black pt-4">
        <p className="font-mono text-xs max-w-[200px]">
          EXPLORING THE INTERSECTION OF UTILITARIAN DESIGN AND DIGITAL EPHEMERA.
        </p>
        <button className="bg-black text-white px-6 py-2 font-mono text-xs uppercase hover:bg-transparent hover:text-black border border-black transition-colors cursor-pointer">
          Read Manifesto
        </button>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="background:#f0f0f0;color:black;min-height:400px;display:flex;flex-direction:column;justify-content:space-between;padding:2rem 4rem;border:1px solid black;font-family:system-ui">
  <div style="border-bottom:1px solid black;padding-bottom:1rem;display:flex;justify-content:space-between;align-items:flex-end">
    <span style="font-family:monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase">Volume 01</span>
    <span style="font-family:monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase">2024—25</span>
  </div>
  <div style="padding:3rem 0">
    <h1 style="font-size:5rem;font-weight:700;letter-spacing:-0.05em;line-height:0.85;text-transform:uppercase;margin:0">Digital<br/>Archival<br/>Systems</h1>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-top:1px solid black;padding-top:1rem">
    <p style="font-family:monospace;font-size:0.65rem;max-width:200px;margin:0;line-height:1.5">EXPLORING THE INTERSECTION OF UTILITARIAN DESIGN AND DIGITAL EPHEMERA.</p>
    <button style="background:black;color:white;padding:0.5rem 1.5rem;font-family:monospace;font-size:0.65rem;text-transform:uppercase;border:1px solid black;cursor:pointer">Read Manifesto</button>
  </div>
</div>`,
  },
  {
    slug: "minimal-stats-grid",
    title: "Archival Stats Grid",
    description: "Clean data display with tabular numbers, directional indicators, and 1px grid gaps.",
    category: "Data Display",
    tags: ["stats", "dashboard", "data", "grid", "numbers"],
    style: "",
    code: `export default function MinimalStats() {
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Revenue</span>
          <span className="text-emerald-600">↗</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">$24.5k</span>
          <span className="text-xs font-medium text-emerald-600">+12%</span>
        </div>
      </div>
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Bounce Rate</span>
          <span className="text-rose-600">↘</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">42.8%</span>
          <span className="text-xs font-medium text-rose-600">-2.1%</span>
        </div>
      </div>
      <div className="bg-white p-6 flex flex-col gap-4 hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Active Users</span>
          <span className="text-blue-600">●</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">1,204</span>
          <span className="text-xs font-medium text-neutral-400">Live</span>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#e5e5e5;border:1px solid #e5e5e5">
  <div style="background:white;padding:1.5rem;display:flex;flex-direction:column;gap:1rem">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.65rem;font-family:monospace;color:#737373;text-transform:uppercase;letter-spacing:0.05em">Revenue</span><span style="color:#059669">↗</span></div>
    <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:2.25rem;font-weight:600;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">$24.5k</span><span style="font-size:0.75rem;font-weight:500;color:#059669">+12%</span></div>
  </div>
  <div style="background:white;padding:1.5rem;display:flex;flex-direction:column;gap:1rem">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.65rem;font-family:monospace;color:#737373;text-transform:uppercase;letter-spacing:0.05em">Bounce Rate</span><span style="color:#e11d48">↘</span></div>
    <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:2.25rem;font-weight:600;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">42.8%</span><span style="font-size:0.75rem;font-weight:500;color:#e11d48">-2.1%</span></div>
  </div>
  <div style="background:white;padding:1.5rem;display:flex;flex-direction:column;gap:1rem">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.65rem;font-family:monospace;color:#737373;text-transform:uppercase;letter-spacing:0.05em">Active Users</span><span style="color:#2563eb">●</span></div>
    <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:2.25rem;font-weight:600;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">1,204</span><span style="font-size:0.75rem;font-weight:500;color:#a3a3a3">Live</span></div>
  </div>
</div>`,
  },
  {
    slug: "brutalist-navigation",
    title: "Brutalist Navigation Bar",
    description: "Tactile navigation with hard shadows, numbered entries, and bold hover states.",
    category: "Navigation",
    tags: ["nav", "brutalism", "navigation", "menu"],
    style: "",
    code: `export default function BrutalistNav() {
  const links = ["Index", "Work", "About", "Contact"];
  return (
    <nav className="bg-[#E0E0E0] p-4 font-mono text-sm">
      <ul className="flex flex-col md:flex-row border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {links.map((link, i) => (
          <li key={link} className="flex-1 text-center py-4 border-b-2 md:border-b-0 md:border-r-2 border-black last:border-0 hover:bg-[#FFD700] cursor-pointer transition-colors font-bold uppercase tracking-widest">
            <span className="mr-2 opacity-50">0{i + 1}.</span>{link}
          </li>
        ))}
      </ul>
    </nav>
  );
}`,
    htmlPreview: `<nav style="background:#E0E0E0;padding:1rem;font-family:monospace;font-size:0.875rem">
  <ul style="display:flex;list-style:none;margin:0;padding:0;border:2px solid black;background:white;box-shadow:4px 4px 0px 0px rgba(0,0,0,1)">
    <li style="flex:1;text-align:center;padding:1rem;border-right:2px solid black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer"><span style="opacity:0.5;margin-right:0.5rem">01.</span>Index</li>
    <li style="flex:1;text-align:center;padding:1rem;border-right:2px solid black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer"><span style="opacity:0.5;margin-right:0.5rem">02.</span>Work</li>
    <li style="flex:1;text-align:center;padding:1rem;border-right:2px solid black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer"><span style="opacity:0.5;margin-right:0.5rem">03.</span>About</li>
    <li style="flex:1;text-align:center;padding:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer"><span style="opacity:0.5;margin-right:0.5rem">04.</span>Contact</li>
  </ul>
</nav>`,
  },
  {
    slug: "apple-pill-toggle",
    title: "Apple-Style Pill Toggle",
    description: "Smooth segmented control inspired by iOS. Perfect for switching between views or filters.",
    category: "Buttons",
    tags: ["apple", "toggle", "pill", "segmented", "ios"],
    style: "",
    code: `import { useState } from "react";

export default function PillToggle() {
  const [active, setActive] = useState(0);
  const options = ["All", "Active", "Completed"];

  return (
    <div className="p-12 bg-neutral-100 flex items-center justify-center min-h-[200px]">
      <div className="relative bg-neutral-200/80 rounded-full p-1 flex gap-0.5">
        <div
          className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
          style={{
            width: \`calc(\${100 / options.length}% - 4px)\`,
            left: \`calc(\${(active * 100) / options.length}% + 2px)\`,
          }}
        />
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setActive(i)}
            className={\`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors \${
              active === i ? "text-black" : "text-neutral-500 hover:text-neutral-700"
            }\`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#f5f5f5;display:flex;align-items:center;justify-content:center;min-height:200px">
  <div style="position:relative;background:rgba(229,229,229,0.8);border-radius:9999px;padding:4px;display:flex;gap:2px">
    <div style="position:absolute;top:4px;bottom:4px;width:calc(33.33% - 4px);left:calc(0% + 2px);background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.08);transition:left 0.3s ease"></div>
    <button style="position:relative;z-index:10;padding:0.5rem 1.5rem;font-size:0.875rem;font-weight:500;border-radius:9999px;border:none;background:none;cursor:pointer;color:black;font-family:inherit">All</button>
    <button style="position:relative;z-index:10;padding:0.5rem 1.5rem;font-size:0.875rem;font-weight:500;border-radius:9999px;border:none;background:none;cursor:pointer;color:#737373;font-family:inherit">Active</button>
    <button style="position:relative;z-index:10;padding:0.5rem 1.5rem;font-size:0.875rem;font-weight:500;border-radius:9999px;border:none;background:none;cursor:pointer;color:#737373;font-family:inherit">Completed</button>
  </div>
</div>`,
  },
  {
    slug: "floating-action-menu",
    title: "Floating Action Menu",
    description: "Expandable floating action button with radial menu. Inspired by Material Design 3 elevation.",
    category: "Navigation",
    tags: ["fab", "floating", "menu", "material", "action"],
    style: "",
    code: `import { useState } from "react";

export default function FloatingActionMenu() {
  const [open, setOpen] = useState(false);
  const actions = [
    { icon: "✏️", label: "Edit" },
    { icon: "📎", label: "Attach" },
    { icon: "📤", label: "Share" },
  ];

  return (
    <div className="relative p-12 bg-slate-50 flex items-end justify-end min-h-[300px]">
      <div className="relative">
        {actions.map((action, i) => (
          <button
            key={action.label}
            className={\`absolute bottom-16 right-1 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-sm transition-all duration-300 \${
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50 pointer-events-none"
            }\`}
            style={{
              transform: open ? \`translateY(-\${(i + 1) * 52}px)\` : "translateY(0)",
              transitionDelay: \`\${i * 50}ms\`,
            }}
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className={\`w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center text-2xl transition-transform duration-300 hover:bg-blue-700 \${
            open ? "rotate-45" : ""
          }\`}
        >
          +
        </button>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="position:relative;padding:3rem;background:#f8fafc;display:flex;align-items:flex-end;justify-content:flex-end;min-height:300px">
  <div style="position:relative">
    <button style="width:2.5rem;height:2.5rem;border-radius:9999px;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:0.875rem;position:absolute;bottom:4rem;right:0.25rem;transform:translateY(-52px)">✏️</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:9999px;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:0.875rem;position:absolute;bottom:4rem;right:0.25rem;transform:translateY(-104px)">📎</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:9999px;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:0.875rem;position:absolute;bottom:4rem;right:0.25rem;transform:translateY(-156px)">📤</button>
    <button style="width:3.5rem;height:3.5rem;border-radius:9999px;background:#2563eb;color:white;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);display:flex;align-items:center;justify-content:center;font-size:1.5rem;border:none;cursor:pointer;transform:rotate(45deg)">+</button>
  </div>
</div>`,
  },
  {
    slug: "dark-pricing-card",
    title: "Dark Mode Pricing Card",
    description: "Elegant dark pricing card with gradient accent border and feature checklist.",
    category: "Cards",
    tags: ["pricing", "dark", "card", "saas", "gradient"],
    style: "",
    code: `export default function DarkPricingCard() {
  const features = ["Unlimited projects", "Priority support", "Custom domains", "Analytics dashboard", "Team collaboration"];

  return (
    <div className="p-12 bg-neutral-950 flex items-center justify-center min-h-[500px]">
      <div className="relative w-80 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl" />
        <div className="relative border border-white/10 rounded-2xl bg-neutral-900/80 backdrop-blur-sm p-8">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">Pro Plan</div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-bold text-white tracking-tight">$29</span>
            <span className="text-neutral-500 text-sm">/month</span>
          </div>
          <div className="space-y-3 mb-8">
            {features.map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">✓</div>
                {f}
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:500px">
  <div style="position:relative;width:20rem;border-radius:1rem;overflow:hidden">
    <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(59,130,246,0.2),transparent,rgba(168,85,247,0.2));border-radius:1rem"></div>
    <div style="position:relative;border:1px solid rgba(255,255,255,0.1);border-radius:1rem;background:rgba(23,23,23,0.8);backdrop-filter:blur(8px);padding:2rem">
      <div style="font-size:0.65rem;font-family:monospace;color:#60a5fa;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem">Pro Plan</div>
      <div style="display:flex;align-items:baseline;gap:0.25rem;margin-bottom:1.5rem"><span style="font-size:3rem;font-weight:700;color:white;letter-spacing:-0.025em">$29</span><span style="color:#737373;font-size:0.875rem">/month</span></div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem">
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#d4d4d4"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:0.65rem">✓</div>Unlimited projects</div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#d4d4d4"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:0.65rem">✓</div>Priority support</div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#d4d4d4"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:0.65rem">✓</div>Custom domains</div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#d4d4d4"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:0.65rem">✓</div>Analytics dashboard</div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#d4d4d4"><div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:0.65rem">✓</div>Team collaboration</div>
      </div>
      <button style="width:100%;padding:0.75rem;border-radius:0.75rem;background:linear-gradient(to right,#2563eb,#9333ea);color:white;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Get Started</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "minimal-avatar-stack",
    title: "Overlapping Avatar Stack",
    description: "Stacked avatar group with overflow counter. Common in collaboration tools and dashboards.",
    category: "Data Display",
    tags: ["avatar", "stack", "users", "collaboration", "social"],
    style: "",
    code: `export default function AvatarStack() {
  const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];
  const initials = ["JD", "AK", "SM", "RB", "LW"];

  return (
    <div className="p-12 bg-white flex items-center justify-center min-h-[150px]">
      <div className="flex items-center">
        <div className="flex -space-x-3">
          {colors.map((c, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: c, zIndex: colors.length - i }}
            >
              {initials[i]}
            </div>
          ))}
        </div>
        <div className="ml-1 w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-neutral-500 text-xs font-medium">
          +8
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:white;display:flex;align-items:center;justify-content:center;min-height:150px">
  <div style="display:flex;align-items:center">
    <div style="display:flex">
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:0.65rem;font-weight:700;background:#3B82F6;z-index:5;box-shadow:0 1px 2px rgba(0,0,0,0.05)">JD</div>
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:0.65rem;font-weight:700;background:#EF4444;z-index:4;margin-left:-0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">AK</div>
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:0.65rem;font-weight:700;background:#10B981;z-index:3;margin-left:-0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">SM</div>
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:0.65rem;font-weight:700;background:#F59E0B;z-index:2;margin-left:-0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">RB</div>
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:0.65rem;font-weight:700;background:#8B5CF6;z-index:1;margin-left:-0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">LW</div>
    </div>
    <div style="width:2.5rem;height:2.5rem;border-radius:9999px;border:2px solid white;background:#f5f5f5;display:flex;align-items:center;justify-content:center;color:#737373;font-size:0.65rem;font-weight:500;margin-left:0.25rem">+8</div>
  </div>
</div>`,
  },
  {
    slug: "notification-toast-stack",
    title: "Notification Toast Stack",
    description: "Stacked notification toasts with different severity levels. Inspired by Sonner and Vercel's toast system.",
    category: "Feedback",
    tags: ["toast", "notification", "feedback", "alert", "vercel"],
    style: "",
    code: `export default function ToastStack() {
  const toasts = [
    { type: "success", icon: "✓", title: "Deployment complete", desc: "Your changes are now live.", bg: "#F0FDF4", border: "#BBF7D0", text: "#166534" },
    { type: "error", icon: "✕", title: "Build failed", desc: "Check console for errors.", bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" },
    { type: "info", icon: "i", title: "New version available", desc: "v2.4.1 is ready to install.", bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF" },
  ];

  return (
    <div className="p-12 bg-neutral-100 flex flex-col items-center justify-center gap-3 min-h-[300px]">
      {toasts.map((t, i) => (
        <div
          key={i}
          className="w-full max-w-sm rounded-lg border px-4 py-3 flex items-start gap-3 shadow-sm"
          style={{ background: t.bg, borderColor: t.border }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0"
            style={{ background: t.border, color: t.text }}
          >
            {t.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold" style={{ color: t.text }}>{t.title}</div>
            <div className="text-xs mt-0.5 opacity-80" style={{ color: t.text }}>{t.desc}</div>
          </div>
          <button className="text-xs opacity-40 hover:opacity-100 mt-0.5 shrink-0 cursor-pointer" style={{ color: t.text }}>✕</button>
        </div>
      ))}
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#f5f5f5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;min-height:300px">
  <div style="width:100%;max-width:24rem;border-radius:0.5rem;border:1px solid #BBF7D0;background:#F0FDF4;padding:0.75rem 1rem;display:flex;align-items:flex-start;gap:0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#BBF7D0;color:#166534;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;flex-shrink:0">✓</div>
    <div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#166534">Deployment complete</div><div style="font-size:0.75rem;margin-top:2px;color:#166534;opacity:0.8">Your changes are now live.</div></div>
  </div>
  <div style="width:100%;max-width:24rem;border-radius:0.5rem;border:1px solid #FECACA;background:#FEF2F2;padding:0.75rem 1rem;display:flex;align-items:flex-start;gap:0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#FECACA;color:#991B1B;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;flex-shrink:0">✕</div>
    <div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#991B1B">Build failed</div><div style="font-size:0.75rem;margin-top:2px;color:#991B1B;opacity:0.8">Check console for errors.</div></div>
  </div>
  <div style="width:100%;max-width:24rem;border-radius:0.5rem;border:1px solid #BFDBFE;background:#EFF6FF;padding:0.75rem 1rem;display:flex;align-items:flex-start;gap:0.75rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:#BFDBFE;color:#1E40AF;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;flex-shrink:0">i</div>
    <div style="flex:1"><div style="font-size:0.875rem;font-weight:600;color:#1E40AF">New version available</div><div style="font-size:0.75rem;margin-top:2px;color:#1E40AF;opacity:0.8">v2.4.1 is ready to install.</div></div>
  </div>
</div>`,
  },
  {
    slug: "minimal-sidebar",
    title: "Minimal Icon Sidebar",
    description: "Collapsed sidebar with icon-only navigation and tooltip labels. Common in productivity tools.",
    category: "Navigation",
    tags: ["sidebar", "navigation", "minimal", "icons", "productivity"],
    style: "",
    code: `export default function MinimalSidebar() {
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
            className={\`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all \${
              item.active
                ? "bg-blue-50 text-blue-600"
                : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
            }\`}
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
}`,
    htmlPreview: `<div style="padding:1rem;background:#f5f5f5;display:flex;justify-content:flex-start;min-height:400px">
  <div style="width:4rem;background:white;border-radius:1rem;border:1px solid #e5e5e5;box-shadow:0 1px 2px rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:center;padding:1rem 0;gap:0.25rem">
    <div style="width:2rem;height:2rem;background:black;border-radius:0.5rem;display:flex;align-items:center;justify-content:center;color:white;font-size:0.875rem;font-weight:700;margin-bottom:1rem">A</div>
    <button style="width:2.5rem;height:2.5rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:#EFF6FF;color:#2563eb;border:none;cursor:pointer">⌂</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:none;color:#a3a3a3;border:none;cursor:pointer">◎</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:none;color:#a3a3a3;border:none;cursor:pointer">☰</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:none;color:#a3a3a3;border:none;cursor:pointer">♡</button>
    <button style="width:2.5rem;height:2.5rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:none;color:#a3a3a3;border:none;cursor:pointer">⚙</button>
    <div style="flex:1"></div>
    <div style="width:2rem;height:2rem;border-radius:9999px;background:linear-gradient(to bottom right,#c084fc,#f472b6);border:2px solid white;box-shadow:0 1px 2px rgba(0,0,0,0.05)"></div>
  </div>
</div>`,
  },
  {
    slug: "gradient-border-card",
    title: "Gradient Border Card",
    description: "Card with an animated gradient border effect. Great for feature highlights and premium sections.",
    category: "Cards",
    tags: ["gradient", "border", "card", "premium", "animated"],
    style: "",
    code: `export default function GradientBorderCard() {
  return (
    <div className="p-12 bg-neutral-950 flex items-center justify-center min-h-[300px]">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-neutral-900 rounded-xl p-8 space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">⚡</div>
            <div>
              <h3 className="text-white font-semibold">Turbo Mode</h3>
              <p className="text-neutral-400 text-xs">10x faster builds</p>
            </div>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Enable turbo mode to dramatically speed up your build pipeline with intelligent caching and parallel compilation.
          </p>
          <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:300px">
  <div style="position:relative">
    <div style="position:absolute;inset:-2px;background:linear-gradient(to right,#db2777,#9333ea);border-radius:0.75rem;filter:blur(4px);opacity:0.75"></div>
    <div style="position:relative;background:#171717;border-radius:0.75rem;padding:2rem;max-width:24rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;background:linear-gradient(to bottom right,#ec4899,#a855f7);display:flex;align-items:center;justify-content:center;color:white;font-weight:700">⚡</div>
        <div><h3 style="color:white;font-weight:600;margin:0;font-size:1rem">Turbo Mode</h3><p style="color:#a3a3a3;font-size:0.75rem;margin:0">10x faster builds</p></div>
      </div>
      <p style="color:#d4d4d4;font-size:0.875rem;line-height:1.625;margin:0 0 1rem 0">Enable turbo mode to dramatically speed up your build pipeline with intelligent caching and parallel compilation.</p>
      <button style="font-size:0.875rem;color:#c084fc;font-weight:500;background:none;border:none;cursor:pointer;padding:0;font-family:inherit">Learn more →</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "command-palette",
    title: "Command Palette / Spotlight",
    description: "macOS Spotlight-style command palette. Essential for keyboard-driven power users.",
    category: "Inputs",
    tags: ["command", "palette", "search", "spotlight", "keyboard"],
    style: "",
    code: `export default function CommandPalette() {
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
              className={\`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer \${
                i === 0 ? "bg-blue-50 text-blue-900" : "text-neutral-700 hover:bg-neutral-50"
              }\`}
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
}`,
    htmlPreview: `<div style="padding:3rem;background:rgba(23,23,23,0.9);display:flex;align-items:flex-start;justify-content:center;min-height:400px;padding-top:5rem">
  <div style="width:100%;max-width:32rem;background:white;border-radius:0.75rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);border:1px solid #e5e5e5;overflow:hidden">
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-bottom:1px solid #f5f5f5">
      <span style="color:#a3a3a3;font-size:0.875rem">🔍</span>
      <input type="text" value="dash" style="flex:1;background:transparent;outline:none;font-size:0.875rem;color:#262626;border:none;font-family:inherit" />
      <kbd style="padding:0.125rem 0.5rem;background:#f5f5f5;border-radius:0.25rem;font-size:0.625rem;color:#737373;font-family:monospace;border:1px solid #e5e5e5">ESC</kbd>
    </div>
    <div style="padding:0.5rem 0">
      <div style="padding:0.375rem 0.75rem;font-size:0.625rem;font-weight:600;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.05em">Results</div>
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 1rem;font-size:0.875rem;background:#EFF6FF;color:#1e3a5f;cursor:pointer"><span>📄</span><span style="flex:1;font-weight:500">Dashboard</span><span style="font-size:0.75rem;color:#a3a3a3">Go to page</span></div>
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 1rem;font-size:0.875rem;color:#404040;cursor:pointer"><span>⚙️</span><span style="flex:1;font-weight:500">Settings</span><span style="font-size:0.75rem;color:#a3a3a3">Preferences</span></div>
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 1rem;font-size:0.875rem;color:#404040;cursor:pointer"><span>👤</span><span style="flex:1;font-weight:500">Profile</span><span style="font-size:0.75rem;color:#a3a3a3">Account</span></div>
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 1rem;font-size:0.875rem;color:#404040;cursor:pointer"><span>📊</span><span style="flex:1;font-weight:500">Analytics</span><span style="font-size:0.75rem;color:#a3a3a3">Reports</span></div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "bento-grid",
    title: "Bento Grid Layout",
    description: "Apple-inspired bento box layout for feature showcases. Asymmetric grid with varying span sizes.",
    category: "Layout",
    tags: ["bento", "grid", "apple", "layout", "features"],
    style: "",
    code: `export default function BentoGrid() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[500px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {/* Large card */}
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white flex flex-col justify-end min-h-[280px]">
          <div className="text-4xl mb-2">📱</div>
          <h3 className="text-xl font-bold mb-1">Cross-Platform</h3>
          <p className="text-blue-200 text-sm">Build once, deploy everywhere. iOS, Android, and Web from a single codebase.</p>
        </div>

        {/* Small cards */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col justify-between min-h-[130px]">
          <div className="text-2xl">⚡</div>
          <div>
            <h4 className="font-semibold text-sm">Fast</h4>
            <p className="text-neutral-500 text-xs">60fps animations</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col justify-between min-h-[130px]">
          <div className="text-2xl">🔒</div>
          <div>
            <h4 className="font-semibold text-sm">Secure</h4>
            <p className="text-neutral-500 text-xs">E2E encrypted</p>
          </div>
        </div>

        {/* Medium card */}
        <div className="col-span-2 bg-neutral-900 rounded-3xl p-8 text-white flex items-center gap-6 min-h-[130px]">
          <div className="text-4xl">🎨</div>
          <div>
            <h3 className="font-bold mb-1">Design System</h3>
            <p className="text-neutral-400 text-sm">50+ components, fully customizable with your brand tokens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:500px">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;max-width:56rem;margin:0 auto">
    <div style="grid-column:span 2;grid-row:span 2;background:linear-gradient(to bottom right,#2563eb,#1e40af);border-radius:1.5rem;padding:2rem;color:white;display:flex;flex-direction:column;justify-content:flex-end;min-height:280px">
      <div style="font-size:2.25rem;margin-bottom:0.5rem">📱</div>
      <h3 style="font-size:1.25rem;font-weight:700;margin:0 0 0.25rem 0">Cross-Platform</h3>
      <p style="color:#93C5FD;font-size:0.875rem;margin:0">Build once, deploy everywhere. iOS, Android, and Web from a single codebase.</p>
    </div>
    <div style="background:white;border-radius:1.5rem;padding:1.5rem;border:1px solid #e5e5e5;display:flex;flex-direction:column;justify-content:space-between;min-height:130px">
      <div style="font-size:1.5rem">⚡</div>
      <div><h4 style="font-weight:600;font-size:0.875rem;margin:0">Fast</h4><p style="color:#737373;font-size:0.75rem;margin:0">60fps animations</p></div>
    </div>
    <div style="background:white;border-radius:1.5rem;padding:1.5rem;border:1px solid #e5e5e5;display:flex;flex-direction:column;justify-content:space-between;min-height:130px">
      <div style="font-size:1.5rem">🔒</div>
      <div><h4 style="font-weight:600;font-size:0.875rem;margin:0">Secure</h4><p style="color:#737373;font-size:0.75rem;margin:0">E2E encrypted</p></div>
    </div>
    <div style="grid-column:span 2;background:#171717;border-radius:1.5rem;padding:2rem;color:white;display:flex;align-items:center;gap:1.5rem;min-height:130px">
      <div style="font-size:2.25rem">🎨</div>
      <div><h3 style="font-weight:700;margin:0 0 0.25rem 0">Design System</h3><p style="color:#a3a3a3;font-size:0.875rem;margin:0">50+ components, fully customizable with your brand tokens.</p></div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "skeleton-loading",
    title: "Skeleton Loading States",
    description: "Shimmer-effect skeleton placeholders for content loading. Shows perceived performance.",
    category: "Feedback",
    tags: ["skeleton", "loading", "shimmer", "placeholder", "ux"],
    style: "",
    code: `export default function SkeletonLoading() {
  return (
    <div className="p-8 bg-white min-h-[300px] space-y-6">
      {/* Card skeleton */}
      <div className="max-w-md space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-neutral-200 rounded-full w-3/4 animate-pulse" />
            <div className="h-3 bg-neutral-100 rounded-full w-1/2 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded-full w-2/3 animate-pulse" />
        </div>
        
        <div className="flex gap-2">
          <div className="h-8 bg-neutral-200 rounded-lg w-20 animate-pulse" />
          <div className="h-8 bg-neutral-100 rounded-lg w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:300px">
  <div style="max-width:28rem">
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
      <div style="width:3rem;height:3rem;border-radius:9999px;background:#e5e5e5;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div>
      <div style="flex:1"><div style="height:1rem;background:#e5e5e5;border-radius:9999px;width:75%;margin-bottom:0.5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div><div style="height:0.75rem;background:#f5f5f5;border-radius:9999px;width:50%;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div></div>
    </div>
    <div style="margin-bottom:1.5rem"><div style="height:0.75rem;background:#e5e5e5;border-radius:9999px;width:100%;margin-bottom:0.5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div><div style="height:0.75rem;background:#e5e5e5;border-radius:9999px;width:100%;margin-bottom:0.5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div><div style="height:0.75rem;background:#e5e5e5;border-radius:9999px;width:66%;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div></div>
    <div style="display:flex;gap:0.5rem"><div style="height:2rem;background:#e5e5e5;border-radius:0.5rem;width:5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div><div style="height:2rem;background:#f5f5f5;border-radius:0.5rem;width:5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"></div></div>
  </div>
  <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}</style>
</div>`,
  },
  {
    slug: "modern-table",
    title: "Modern Data Table",
    description: "Clean data table with row hover, status badges, and proper typography hierarchy.",
    category: "Data Display",
    tags: ["table", "data", "dashboard", "list", "rows"],
    style: "",
    code: `export default function ModernTable() {
  const data = [
    { name: "Acme Corp", status: "Active", revenue: "$45,200", growth: "+12.5%" },
    { name: "Globex Inc", status: "Pending", revenue: "$23,100", growth: "+4.2%" },
    { name: "Initech", status: "Active", revenue: "$67,800", growth: "+18.9%" },
    { name: "Umbrella Co", status: "Inactive", revenue: "$12,400", growth: "-2.1%" },
  ];

  const statusColors: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Inactive: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };

  return (
    <div className="p-8 bg-white min-h-[300px]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Company</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Status</th>
            <th className="text-right py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Revenue</th>
            <th className="text-right py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wider">Growth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
              <td className="py-3 px-4 font-medium">{row.name}</td>
              <td className="py-3 px-4">
                <span className={\`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border \${statusColors[row.status]}\`}>
                  {row.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right tabular-nums">{row.revenue}</td>
              <td className={\`py-3 px-4 text-right tabular-nums font-medium \${row.growth.startsWith("+") ? "text-emerald-600" : "text-rose-600"}\`}>
                {row.growth}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:300px">
  <table style="width:100%;font-size:0.875rem;border-collapse:collapse">
    <thead>
      <tr style="border-bottom:1px solid #e5e5e5">
        <th style="text-align:left;padding:0.75rem 1rem;font-weight:500;color:#737373;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em">Company</th>
        <th style="text-align:left;padding:0.75rem 1rem;font-weight:500;color:#737373;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em">Status</th>
        <th style="text-align:right;padding:0.75rem 1rem;font-weight:500;color:#737373;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em">Revenue</th>
        <th style="text-align:right;padding:0.75rem 1rem;font-weight:500;color:#737373;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em">Growth</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:0.75rem 1rem;font-weight:500">Acme Corp</td><td style="padding:0.75rem 1rem"><span style="display:inline-flex;padding:0.125rem 0.5rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#ECFDF5;color:#047857;border:1px solid #A7F3D0">Active</span></td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums">$45,200</td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums;font-weight:500;color:#059669">+12.5%</td></tr>
      <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:0.75rem 1rem;font-weight:500">Globex Inc</td><td style="padding:0.75rem 1rem"><span style="display:inline-flex;padding:0.125rem 0.5rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#FFFBEB;color:#B45309;border:1px solid #FDE68A">Pending</span></td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums">$23,100</td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums;font-weight:500;color:#059669">+4.2%</td></tr>
      <tr style="border-bottom:1px solid #f5f5f5"><td style="padding:0.75rem 1rem;font-weight:500">Initech</td><td style="padding:0.75rem 1rem"><span style="display:inline-flex;padding:0.125rem 0.5rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#ECFDF5;color:#047857;border:1px solid #A7F3D0">Active</span></td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums">$67,800</td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums;font-weight:500;color:#059669">+18.9%</td></tr>
      <tr><td style="padding:0.75rem 1rem;font-weight:500">Umbrella Co</td><td style="padding:0.75rem 1rem"><span style="display:inline-flex;padding:0.125rem 0.5rem;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#f5f5f5;color:#737373;border:1px solid #e5e5e5">Inactive</span></td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums">$12,400</td><td style="padding:0.75rem 1rem;text-align:right;font-variant-numeric:tabular-nums;font-weight:500;color:#e11d48">-2.1%</td></tr>
    </tbody>
  </table>
</div>`,
  },
  {
    slug: "empty-state-illustration",
    title: "Empty State",
    description: "Friendly empty state with illustration placeholder and call to action. Essential for new users.",
    category: "Feedback",
    tags: ["empty", "state", "placeholder", "onboarding", "ux"],
    style: "",
    code: `export default function EmptyState() {
  return (
    <div className="p-12 bg-white flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
        <div className="text-4xl">📂</div>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects yet</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-8 leading-relaxed">
        Get started by creating your first project. It only takes a minute and you can always change it later.
      </p>
      <div className="flex gap-3">
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Create Project
        </button>
        <button className="px-6 py-2.5 bg-white text-neutral-700 text-sm font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
          Import
        </button>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:white;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;text-align:center">
  <div style="width:6rem;height:6rem;border-radius:9999px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem"><div style="font-size:2.25rem">📂</div></div>
  <h3 style="font-size:1.125rem;font-weight:600;color:#171717;margin:0 0 0.5rem 0">No projects yet</h3>
  <p style="font-size:0.875rem;color:#737373;max-width:24rem;margin:0 0 2rem 0;line-height:1.625">Get started by creating your first project. It only takes a minute and you can always change it later.</p>
  <div style="display:flex;gap:0.75rem">
    <button style="padding:0.625rem 1.5rem;background:#2563eb;color:white;font-size:0.875rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.05);font-family:inherit">Create Project</button>
    <button style="padding:0.625rem 1.5rem;background:white;color:#404040;font-size:0.875rem;font-weight:500;border-radius:0.5rem;border:1px solid #e5e5e5;cursor:pointer;font-family:inherit">Import</button>
  </div>
</div>`,
  },
  {
    slug: "testimonial-card",
    title: "Testimonial Card",
    description: "Social proof testimonial with avatar, quote, and company attribution. Clean and trustworthy.",
    category: "Cards",
    tags: ["testimonial", "quote", "social", "review", "trust"],
    style: "",
    code: `export default function TestimonialCard() {
  return (
    <div className="p-12 bg-neutral-50 flex items-center justify-center min-h-[300px]">
      <div className="max-w-lg bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-400 text-lg">★</span>
          ))}
        </div>
        <blockquote className="text-neutral-800 leading-relaxed mb-6">
          "This tool completely transformed our workflow. We shipped 3x faster and our team morale went through the roof. Can't imagine going back."
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">SR</div>
          <div>
            <div className="text-sm font-semibold text-neutral-900">Sarah Rodriguez</div>
            <div className="text-xs text-neutral-500">VP of Engineering, TechCo</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:3rem;background:#fafafa;display:flex;align-items:center;justify-content:center;min-height:300px">
  <div style="max-width:32rem;background:white;border-radius:1rem;border:1px solid #e5e5e5;padding:2rem;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
    <div style="display:flex;gap:0.25rem;margin-bottom:1rem"><span style="color:#FBBF24;font-size:1.125rem">★</span><span style="color:#FBBF24;font-size:1.125rem">★</span><span style="color:#FBBF24;font-size:1.125rem">★</span><span style="color:#FBBF24;font-size:1.125rem">★</span><span style="color:#FBBF24;font-size:1.125rem">★</span></div>
    <blockquote style="color:#262626;line-height:1.625;margin:0 0 1.5rem 0;font-size:1rem">"This tool completely transformed our workflow. We shipped 3x faster and our team morale went through the roof. Can't imagine going back."</blockquote>
    <div style="display:flex;align-items:center;gap:0.75rem">
      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:linear-gradient(to bottom right,#818CF8,#22D3EE);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.875rem">SR</div>
      <div><div style="font-size:0.875rem;font-weight:600;color:#171717">Sarah Rodriguez</div><div style="font-size:0.75rem;color:#737373">VP of Engineering, TechCo</div></div>
    </div>
  </div>
</div>`,
  },
];

const allSeedData = [
  ...seedData,
  ...dashboardExhibits,
  ...onboardingAuthExhibits,
  ...commerceExhibits,
  ...dataAdminExhibits,
  ...marketplaceSocialExhibits,
  ...feedbackStyleExhibits,
];

async function seed() {
  console.log("Seeding database with exhibits...");
  
  // Clear existing
  await db.delete(exhibits);
  
  for (const item of allSeedData) {
    await db.insert(exhibits).values(item);
    console.log(`  ✓ ${item.title}`);
  }
  
  console.log(`\nSeeded ${allSeedData.length} exhibits successfully.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
