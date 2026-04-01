import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group flex flex-col bg-[#1e1e1e] text-neutral-300 font-mono text-sm", className)}>
      {/* Mac-like Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
          </div>
          <div className="ml-4 text-xs text-neutral-500 font-medium flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span>example.{language}</span>
          </div>
        </div>
        
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code Area */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-[#1e1e1e] p-4">
        <Highlight
          theme={themes.vsDark}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={cn(className, "font-mono text-[13px] leading-relaxed")} style={{...style, background: 'transparent'}}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell text-right w-8 pr-4 text-neutral-700 select-none text-xs">{i + 1}</span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
