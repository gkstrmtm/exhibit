import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./code-block";
import { Eye, Code2, Monitor, Smartphone, Tablet, Heart, GitFork, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  htmlPreview: string;
  tags?: string[];
  creatorName?: string;
  creatorId?: number;
  saveCount?: number;
  remixCount?: number;
}

export function ComponentPreview({ title, description, code, htmlPreview, tags = [], creatorName, creatorId, saveCount, remixCount }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = htmlPreview;
    }
  }, [htmlPreview, activeTab]);

  return (
    <div data-testid={`card-exhibit-${title.toLowerCase().replace(/\s+/g, "-")}`} className="group border border-border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
        <div className="flex flex-col gap-0.5 min-w-0 mr-4">
          <h3 className="text-sm font-semibold font-display tracking-tight text-foreground truncate">{title}</h3>
          {description && <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>}
          {tags.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {tags.slice(0, 4).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded font-mono">{tag}</span>
              ))}
              {tags.length > 4 && <span className="text-[10px] text-muted-foreground">+{tags.length - 4}</span>}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center bg-background/50 border border-border/50 rounded-lg p-0.5 backdrop-blur-sm">
              <button 
                data-testid="button-device-desktop"
                onClick={() => setDevice("desktop")}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "desktop" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Desktop view"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button 
                data-testid="button-device-tablet"
                onClick={() => setDevice("tablet")}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "tablet" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Tablet view"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button 
                data-testid="button-device-mobile"
                onClick={() => setDevice("mobile")}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "mobile" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Mobile view"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center bg-muted/50 p-0.5 rounded-lg border border-border/50">
            <button
              data-testid="button-tab-preview"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                activeTab === "preview" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              data-testid="button-tab-code"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                activeTab === "code" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[400px] bg-neutral-100/30 dark:bg-neutral-900/30">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full min-h-[400px] flex items-center justify-center p-8 overflow-hidden"
            >
              <div 
                className={cn(
                  "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border border-border/40 bg-background shadow-sm overflow-hidden rounded-md ring-1 ring-black/5",
                  device === "mobile" ? "w-[375px] max-h-[667px] shadow-xl" : device === "tablet" ? "w-[768px] max-h-[500px] shadow-lg" : "w-full"
                )}
              >
                <div 
                  ref={previewRef}
                  className={cn("w-full overflow-auto", device !== "desktop" && "bg-neutral-50 dark:bg-neutral-950")}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#1e1e1e]"
            >
              <CodeBlock code={code} className="h-full border-0 rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Proof Footer */}
      {(creatorName || saveCount !== undefined || remixCount !== undefined) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-neutral-50/50 dark:bg-neutral-900/50">
          {creatorName && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span data-testid={`text-creator-${creatorId}`}>{creatorName}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground ml-auto">
            {saveCount !== undefined && saveCount > 0 && (
              <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{saveCount}</span>
            )}
            {remixCount !== undefined && remixCount > 0 && (
              <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{remixCount}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
