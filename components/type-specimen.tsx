/**
 * Type Specimen
 * Category: Foundations
 * Tags: typography, font, type-specimen, weights, Inter, variable-font, scale
 * Description: A full type specimen showing the Inter typeface across all 9 weights (100–900) with sample text at each weight, the complete uppercase and lowercase alphabet, digits and punctuation, and a side-by-side size scale from 10px to 48px. A toggle switches between serif, sans-serif, and monospace specimens. Demonstrates how the font performs across rendering contexts.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/type-specimen.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";

const WEIGHTS = [
  { value: 100, label: "Thin", tw: "font-thin" },
  { value: 200, label: "ExtraLight", tw: "font-extralight" },
  { value: 300, label: "Light", tw: "font-light" },
  { value: 400, label: "Regular", tw: "font-normal" },
  { value: 500, label: "Medium", tw: "font-medium" },
  { value: 600, label: "SemiBold", tw: "font-semibold" },
  { value: 700, label: "Bold", tw: "font-bold" },
  { value: 800, label: "ExtraBold", tw: "font-extrabold" },
  { value: 900, label: "Black", tw: "font-black" },
];

const SIZE_SCALE = [
  { px: 48, tw: "text-5xl", label: "Display" },
  { px: 36, tw: "text-4xl", label: "H1" },
  { px: 30, tw: "text-3xl", label: "H2" },
  { px: 24, tw: "text-2xl", label: "H3" },
  { px: 20, tw: "text-xl", label: "H4" },
  { px: 16, tw: "text-base", label: "Body L" },
  { px: 14, tw: "text-sm", label: "Body" },
  { px: 12, tw: "text-xs", label: "Caption" },
  { px: 10, tw: "text-[10px]", label: "Label XS" },
];

const FACES = [
  { id: "sans", label: "Sans (Inter)", class: "font-sans", sample: "Clarity at every scale." },
  { id: "mono", label: "Mono", class: "font-mono", sample: "const render = () => true;" },
  { id: "serif", label: "Serif", class: "font-serif", sample: "Elegance through restraint." },
] as const;

type Face = typeof FACES[number]["id"];

const PANGRAM = "The quick brown fox jumps over the lazy dog";
const ALPHABET = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const NUMERALS = "0123456789";
const PUNCT = ".,;:!?()[]{}\"'—–…·•→←↑↓";

const PARA = "Good typography is invisible. When set well, the reader absorbs the content without noticing the type itself — type that calls attention to itself has usually failed. Inter was designed by Rasmus Andersson specifically for screen reading at small sizes, with tighter letterspacing and a taller x-height than classic grotesques.";

export default function TypeSpecimen() {
  const [face, setFace] = useState<Face>("sans");
  const [tab, setTab] = useState<"weights" | "scale" | "charset" | "paragraph">("weights");

  const faceData = FACES.find(f => f.id === face)!;

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl w-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-neutral-800">Type Specimen</div>
            <div className="text-[9px] text-neutral-400">Font rendering reference across weights, sizes, and contexts</div>
          </div>
          {/* Face toggle */}
          <div className="flex gap-0.5 bg-neutral-100 rounded-md p-0.5">
            {FACES.map(f => (
              <button
                key={f.id}
                onClick={() => setFace(f.id)}
                className={`px-2 py-1 rounded text-[8px] font-medium transition-colors ${face === f.id ? "bg-white text-neutral-800 shadow-sm border border-neutral-200" : "text-neutral-500 hover:text-neutral-700"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-0">
          {(["weights", "scale", "charset", "paragraph"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-2.5 py-1 text-[9px] font-medium border-b-2 transition-colors capitalize ${tab === t ? "border-neutral-800 text-neutral-800" : "border-transparent text-neutral-400 hover:text-neutral-600"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[440px] overflow-y-auto">
        {/* Weights */}
        {tab === "weights" && (
          <div className="space-y-0 divide-y divide-neutral-100">
            {WEIGHTS.map(w => (
              <div key={w.value} className="py-2.5 flex items-baseline gap-4">
                <div className="w-20 flex-shrink-0 space-y-0.5">
                  <div className="text-[8px] font-mono text-neutral-400">{w.value}</div>
                  <div className="text-[8px] text-neutral-400">{w.label}</div>
                  <div className="text-[7px] font-mono text-blue-400">.{w.tw}</div>
                </div>
                <div
                  className={`${faceData.class} text-neutral-800 leading-none`}
                  style={{ fontSize: "22px", fontWeight: w.value }}
                >
                  {PANGRAM}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Size scale */}
        {tab === "scale" && (
          <div className="space-y-0 divide-y divide-neutral-100">
            {SIZE_SCALE.map(s => (
              <div key={s.px} className="py-2.5 flex items-baseline gap-4">
                <div className="w-16 flex-shrink-0 space-y-0.5">
                  <div className="text-[8px] font-mono text-neutral-400">{s.px}px</div>
                  <div className="text-[8px] text-neutral-500">{s.label}</div>
                  <div className="text-[7px] font-mono text-blue-400">.{s.tw}</div>
                </div>
                <div className={`${faceData.class} font-medium text-neutral-800 leading-none`} style={{ fontSize: s.px }}>
                  {s.px > 24 ? faceData.sample : PANGRAM}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Charset */}
        {tab === "charset" && (
          <div className="space-y-5">
            {[
              { label: "Alphabet", chars: ALPHABET },
              { label: "Digits", chars: NUMERALS },
              { label: "Punctuation", chars: PUNCT },
            ].map(({ label, chars }) => (
              <div key={label}>
                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-2">{label}</div>
                {[400, 500, 700].map(w => (
                  <div
                    key={w}
                    className={`${faceData.class} text-neutral-800 leading-loose tracking-wide text-sm mb-1`}
                    style={{ fontWeight: w }}
                  >
                    {chars}
                  </div>
                ))}
              </div>
            ))}

            <div>
              <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Special characters</div>
              <div className={`${faceData.class} text-neutral-600 text-sm leading-loose`}>
                © ® ™ € £ ¥ ¢ § ¶ ° ± × ÷ ≈ ≠ ≤ ≥ ∞ √ ∑ π α β μ
              </div>
            </div>
          </div>
        )}

        {/* Paragraph */}
        {tab === "paragraph" && (
          <div className="space-y-6">
            {[
              { label: "Display — 36px Black", size: 36, weight: 900 },
              { label: "Heading — 20px SemiBold", size: 20, weight: 600 },
              { label: "Body — 14px Regular", size: 14, weight: 400 },
              { label: "Caption — 11px Regular", size: 11, weight: 400 },
            ].map(({ label, size, weight }) => (
              <div key={label}>
                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-2">{label}</div>
                <div
                  className={`${faceData.class} text-neutral-800 leading-relaxed`}
                  style={{ fontSize: size, fontWeight: weight }}
                >
                  {size >= 20 ? faceData.sample : PARA.slice(0, size >= 14 ? 220 : 160)}
                </div>
              </div>
            ))}

            <div>
              <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Pairing — Sans + Mono</div>
              <div className="space-y-1">
                <div className="font-sans text-[13px] font-semibold text-neutral-800">Authentication endpoint</div>
                <div className="font-sans text-[11px] text-neutral-500">Returns a signed JWT valid for 3600 seconds.</div>
                <div className="font-mono text-[10px] text-emerald-600 bg-neutral-900 rounded-md px-3 py-2 mt-1.5">
                  POST /api/v2/auth/token → {"{ access_token, expires_in }"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
