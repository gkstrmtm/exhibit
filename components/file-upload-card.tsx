/**
 * File Upload Card
 * Category: Cards
 * Tags: file-upload, drag-drop, progress, list, upload, card
 * Description: A file upload card with a drag-and-drop drop zone that accepts any file. Dropped or selected files appear in a list below with file name, size, type icon, and a simulated upload progress bar that fills over 2 seconds. Successfully uploaded files show a green check. Files can be removed from the list.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/file-upload-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, FileText, Image, FileCode, X, CheckCircle2 } from "lucide-react";

type FileItem = { id: string; name: string; size: string; type: string; progress: number; done: boolean };

function fileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png","jpg","jpeg","gif","svg","webp"].includes(ext)) return Image;
  if (["ts","tsx","js","jsx","html","css","json"].includes(ext)) return FileCode;
  return FileText;
}

function fmt(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function FileUploadCard() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervals = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const addFiles = useCallback((fl: File[]) => {
    const newItems: FileItem[] = fl.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: fmt(f.size),
      type: f.type,
      progress: 0,
      done: false,
    }));
    setFiles(prev => [...prev, ...newItems]);

    newItems.forEach(item => {
      let p = 0;
      const iv = setInterval(() => {
        p = Math.min(p + Math.random() * 18 + 5, 100);
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: Math.round(p), done: p >= 100 } : f));
        if (p >= 100) {
          clearInterval(iv);
          intervals.current.delete(item.id);
        }
      }, 120);
      intervals.current.set(item.id, iv);
    });
  }, []);

  useEffect(() => () => { intervals.current.forEach(iv => clearInterval(iv)); }, []);

  const remove = (id: string) => {
    clearInterval(intervals.current.get(id));
    intervals.current.delete(id);
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl py-6 flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${drag ? "border-neutral-400 bg-neutral-100" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100/50"}`}
      >
        <Upload size={16} strokeWidth={1.5} className="text-neutral-400" />
        <div className="text-[11px] font-medium text-neutral-600">Drop files here or click</div>
        <div className="text-[9px] text-neutral-400">Any file type, up to 50 MB</div>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = ""; }} />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map(f => {
            const Icon = fileIcon(f.name);
            return (
              <div key={f.id} className="bg-white border border-neutral-200 rounded-lg px-2.5 py-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Icon size={11} strokeWidth={1.5} className="text-neutral-400 flex-shrink-0" />
                  <span className="text-[10px] font-medium text-neutral-700 truncate flex-1">{f.name}</span>
                  <span className="text-[9px] text-neutral-400 flex-shrink-0">{f.size}</span>
                  {f.done
                    ? <CheckCircle2 size={11} strokeWidth={1.5} className="text-emerald-500 flex-shrink-0" />
                    : <button onClick={() => remove(f.id)} className="flex-shrink-0 hover:text-red-500 text-neutral-300 transition-colors"><X size={11} strokeWidth={2} /></button>}
                </div>
                {!f.done && (
                  <div className="h-0.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: f.progress + "%" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
