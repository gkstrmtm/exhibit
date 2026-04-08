/**
 * Editable Detail Section
 * Category: Layout
 * Tags: inline-edit, detail-panel, inspector, field, save, cancel
 * Description: An inspector-style detail panel where each field section has a discrete Edit button. Clicking Edit replaces labels+values with inline inputs for that section. Save/Cancel per section. Multiple sections, only one editable at a time. Escape cancels.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/editable-detail-section.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface FieldDef { key: string; label: string; value: string; }
interface Section { id: string; title: string; fields: FieldDef[]; }

const INITIAL_SECTIONS: Section[] = [
  {
    id: "contact",
    title: "Contact info",
    fields: [
      { key: "name", label: "Full name", value: "Sarah Chen" },
      { key: "email", label: "Email", value: "sarah@example.com" },
      { key: "role", label: "Role", value: "Product lead" },
    ],
  },
  {
    id: "company",
    title: "Company",
    fields: [
      { key: "company", label: "Company name", value: "Acme Corp" },
      { key: "plan", label: "Plan", value: "Pro" },
      { key: "mrr", label: "MRR", value: "$1,200" },
    ],
  },
];

export default function EditableDetailSection() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function startEdit(section: Section) {
    const d: Record<string, string> = {};
    section.fields.forEach((f) => { d[f.key] = f.value; });
    setDrafts(d);
    setEditingSection(section.id);
  }

  function save(sectionId: string) {
    setSections((ss) =>
      ss.map((s) =>
        s.id !== sectionId ? s : {
          ...s,
          fields: s.fields.map((f) => ({ ...f, value: drafts[f.key] ?? f.value })),
        }
      )
    );
    setEditingSection(null);
  }

  function cancel() { setEditingSection(null); }

  function handleKey(e: React.KeyboardEvent, sectionId: string) {
    if (e.key === "Enter") save(sectionId);
    if (e.key === "Escape") cancel();
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Editable detail section
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden divide-y divide-neutral-100">
        {sections.map((section) => {
          const isEditing = editingSection === section.id;
          return (
            <div key={section.id} className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                  {section.title}
                </span>
                {!isEditing ? (
                  <button
                    onClick={() => startEdit(section)}
                    disabled={!!editingSection && editingSection !== section.id}
                    className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-700 transition-colors disabled:opacity-30"
                  >
                    <Pencil size={10} /> Edit
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button onClick={() => save(section.id)} className="flex items-center gap-0.5 text-[10px] text-emerald-600 hover:text-emerald-800 font-medium">
                      <Check size={10} /> Save
                    </button>
                    <button onClick={cancel} className="flex items-center gap-0.5 text-[10px] text-neutral-400 hover:text-neutral-600">
                      <X size={10} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {section.fields.map((f) => (
                  <div key={f.key}>
                    <p className="text-[9px] text-neutral-400 uppercase tracking-wide">{f.label}</p>
                    {isEditing ? (
                      <input
                        value={drafts[f.key] ?? ""}
                        onChange={(e) => setDrafts((d) => ({ ...d, [f.key]: e.target.value }))}
                        onKeyDown={(e) => handleKey(e, section.id)}
                        className="mt-0.5 w-full text-xs border border-blue-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    ) : (
                      <p className="text-xs text-neutral-800 mt-0.5">{f.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Only one section is editable at a time — editing a second section is disabled while the first has unsaved changes. Enter saves, Escape cancels.
      </div>
    </div>
  );
}
