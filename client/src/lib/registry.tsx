import React from "react";
import NeoBrutalistButton from "@/components/exhibits/neo-brutalism";
import GlassCard from "@/components/exhibits/glass-card";
import SwissInput from "@/components/exhibits/swiss-input";
import TypographicHero from "@/components/exhibits/typographic-hero";
import MinimalStats from "@/components/exhibits/minimal-stats";
import BrutalistNav from "@/components/exhibits/brutalist-nav";

// In a real app, this might be loaded from MDX files or a database
// Here we hardcode the source for the mockup
const neoBrutalistCode = `import { ArrowRight } from "lucide-react";

export default function NeoBrutalistButton() {
  return (
    <div className="p-8 flex gap-4 items-center justify-center bg-[#FFDEE2]">
      <button className="px-6 py-3 font-bold bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black">
        CONFIRM ACTION
      </button>
      
      <button className="px-6 py-3 font-bold bg-[#A3E635] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 text-black">
        NEXT STEP <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}`;

const glassCardCode = `import { User } from "lucide-react";

export default function GlassCard() {
  return (
    <div className="p-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center min-h-[300px]">
      <div className="relative w-80 h-48 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden p-6 text-white flex flex-col justify-between group hover:bg-white/15 transition-colors duration-300">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
        
        <div className="flex justify-between items-start">
            <div className="p-2 bg-white/20 rounded-lg">
                <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-mono opacity-60 tracking-widest">MEMBER</div>
        </div>
        
        <div className="space-y-1">
            <div className="text-sm opacity-80">Total Balance</div>
            <div className="text-3xl font-bold tracking-tight">$12,450.00</div>
        </div>
        
        <div className="text-xs opacity-50 font-mono">
            **** **** **** 4291
        </div>
      </div>
    </div>
  );
}`;

const swissInputCode = `import { Search } from "lucide-react";

export default function SwissInput() {
  return (
    <div className="p-12 bg-[#F5F5F5] flex flex-col gap-8 items-center justify-center min-h-[300px]">
      
      {/* Input 1 */}
      <div className="w-full max-w-md relative group">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">Email Address</label>
        <input 
            type="email" 
            placeholder="name@example.com" 
            className="w-full bg-transparent border-b-2 border-neutral-300 py-2 text-lg focus:outline-none focus:border-blue-600 transition-colors placeholder:text-neutral-400 font-medium"
        />
      </div>

      {/* Input 2 */}
      <div className="w-full max-w-md relative">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">Search Archive</label>
        <div className="relative">
            <input 
                type="text" 
                className="w-full bg-white border border-neutral-200 pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-neutral-400 shadow-sm"
                placeholder="Type to search..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="w-4 h-4" />
            </div>
        </div>
      </div>

    </div>
  );
}`;

const typographicHeroCode = `export default function TypographicHero() {
  return (
    <div className="bg-[#f0f0f0] text-black min-h-[400px] flex flex-col justify-between p-8 md:p-16 border border-black">
      <div className="border-b border-black pb-4 flex justify-between items-end">
        <span className="font-mono text-xs tracking-widest uppercase">Volume 01</span>
        <span className="font-mono text-xs tracking-widest uppercase">2024—25</span>
      </div>
      
      <div className="py-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase break-words">
          Digital<br/>
          Archival<br/>
          Systems
        </h1>
      </div>

      <div className="flex justify-between items-start border-t border-black pt-4">
        <p className="font-mono text-xs max-w-[200px]">
          EXPLORING THE INTERSECTION OF UTILITARIAN DESIGN AND DIGITAL EPHEMERA.
        </p>
        <button className="bg-black text-white px-6 py-2 font-mono text-xs uppercase hover:bg-transparent hover:text-black border border-black transition-colors">
          Read Manifesto
        </button>
      </div>
    </div>
  );
}`;

const minimalStatsCode = `import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export default function MinimalStats() {
  return (
    <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
      {/* Stat 1 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Revenue</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">$24.5k</span>
            <span className="text-xs font-medium text-emerald-600">+12%</span>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Bounce Rate</span>
            <ArrowDownRight className="w-4 h-4 text-rose-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">42.8%</span>
            <span className="text-xs font-medium text-rose-600">-2.1%</span>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Active Users</span>
            <Activity className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">1,204</span>
            <span className="text-xs font-medium text-neutral-400">Live</span>
        </div>
      </div>
    </div>
  );
}`;

const brutalistNavCode = `export default function BrutalistNav() {
  const links = ["Index", "Work", "About", "Contact"];

  return (
    <nav className="bg-[#E0E0E0] p-4 font-mono text-sm">
      <ul className="flex flex-col md:flex-row border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {links.map((link, i) => (
            <li key={link} className={\`
                flex-1 text-center py-4 border-b-2 md:border-b-0 md:border-r-2 border-black last:border-0
                hover:bg-[#FFD700] cursor-pointer transition-colors font-bold uppercase tracking-widest
            \`}>
                <span className="mr-2 opacity-50">0{i + 1}.</span>
                {link}
            </li>
        ))}
      </ul>
    </nav>
  );
}`;

export const registry = [
  {
    id: "typographic-hero",
    title: "Typographic Hero System",
    description: "Swiss-inspired display typography that uses scale and negative space as the primary visual elements.",
    category: "Layout",
    component: <TypographicHero />,
    code: typographicHeroCode,
  },
  {
    id: "minimal-stats",
    title: "Archival Stats Grid",
    description: "Data density with minimal noise. Uses subtle borders and tabular numbers for clarity.",
    category: "Data Display",
    component: <MinimalStats />,
    code: minimalStatsCode,
  },
  {
    id: "brutalist-nav",
    title: "Brutalist Navigation",
    description: "Utilitarian navigation block with hard borders and hover states that feel tactile.",
    category: "Layout",
    component: <BrutalistNav />,
    code: brutalistNavCode,
  },
  {
    id: "neo-brutalist-button",
    title: "Neo-Brutalist Interaction",
    description: "High contrast, hard shadows, and bold borders. Perfect for calls to action that need to stand out.",
    category: "Feedback",
    component: <NeoBrutalistButton />,
    code: neoBrutalistCode,
  },
  {
    id: "glass-card",
    title: "Glassmorphism Credit Card",
    description: "Frosted glass effect using backdrop-blur and semi-transparent borders. Adds depth to dark or gradient backgrounds.",
    category: "Data Display",
    component: <GlassCard />,
    code: glassCardCode,
  },
  {
    id: "swiss-input",
    title: "Swiss Style Inputs",
    description: "Minimalist form fields focusing on typography, whitespace, and subtle micro-interactions.",
    category: "Inputs",
    component: <SwissInput />,
    code: swissInputCode,
  }
];
