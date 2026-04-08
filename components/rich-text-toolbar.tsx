/**
 * Rich Text Toolbar
 * Category: Inputs
 * Tags: rich-text, editor, toolbar, bold, italic, formatting
 * Description: A floating rich-text formatting toolbar with Bold, Italic, Underline, Strikethrough, Link, and Text alignment buttons. Each button toggles its active state. Buttons are grouped into semantic sections separated by dividers. The toolbar also has a font-size selector and a highlight button.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/rich-text-toolbar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Bold, Italic, Underline, Strikethrough, Link2, AlignLeft, AlignCenter, AlignRight, Highlighter, List, ListOrdered } from "lucide-react";

type BtnProps = { icon: React.ElementType; active?: boolean; onClick?: () => void; title: string };

function Btn({ icon: Icon, active, onClick, title }: BtnProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${active ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"}`}
    >
      <Icon size={12} strokeWidth={active ? 2 : 1.5} />
    </button>
  );
}

const Divider = () => <div className="w-px h-4 bg-neutral-200 mx-0.5" />;

type Align = "left" | "center" | "right";

export default function RichTextToolbar() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);
  const [link, setLink] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [unordered, setUnordered] = useState(false);
  const [align, setAlign] = useState<Align>("left");
  const [fontSize, setFontSize] = useState("14");

  const sampleStyle: React.CSSProperties = {
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: [underline && "underline", strike && "line-through"].filter(Boolean).join(" ") || "none",
    textAlign: align,
    background: highlight ? "#fef08a" : "transparent",
    fontSize: fontSize + "px",
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Toolbar */}
      <div className="bg-white border border-neutral-200 rounded-lg px-2 py-1.5 flex items-center gap-0.5 flex-wrap">
        <select
          value={fontSize}
          onChange={e => setFontSize(e.target.value)}
          className="text-[9px] text-neutral-600 border border-neutral-100 rounded px-1 py-0.5 mr-0.5 bg-white outline-none"
        >
          {["10","12","14","16","18","20"].map(s => <option key={s} value={s}>{s}px</option>)}
        </select>

        <Divider />
        <Btn icon={Bold} active={bold} onClick={() => setBold(v => !v)} title="Bold" />
        <Btn icon={Italic} active={italic} onClick={() => setItalic(v => !v)} title="Italic" />
        <Btn icon={Underline} active={underline} onClick={() => setUnderline(v => !v)} title="Underline" />
        <Btn icon={Strikethrough} active={strike} onClick={() => setStrike(v => !v)} title="Strikethrough" />

        <Divider />
        <Btn icon={AlignLeft} active={align === "left"} onClick={() => setAlign("left")} title="Align left" />
        <Btn icon={AlignCenter} active={align === "center"} onClick={() => setAlign("center")} title="Align center" />
        <Btn icon={AlignRight} active={align === "right"} onClick={() => setAlign("right")} title="Align right" />

        <Divider />
        <Btn icon={List} active={unordered} onClick={() => { setUnordered(v => !v); setOrdered(false); }} title="Bullet list" />
        <Btn icon={ListOrdered} active={ordered} onClick={() => { setOrdered(v => !v); setUnordered(false); }} title="Numbered list" />

        <Divider />
        <Btn icon={Highlighter} active={highlight} onClick={() => setHighlight(v => !v)} title="Highlight" />
        <Btn icon={Link2} active={link} onClick={() => setLink(v => !v)} title="Link" />
      </div>

      {/* Live preview */}
      <div className="bg-white border border-neutral-200 rounded-lg px-3 py-2 min-h-[56px]">
        <p style={sampleStyle} className="text-neutral-800 leading-relaxed transition-all">
          Format this text with the toolbar above. Toggle bold, italic, alignment, and more.
        </p>
      </div>

      <div className="text-[9px] text-neutral-400">Toggles apply preview styles below the toolbar.</div>
    </div>
  );
}
