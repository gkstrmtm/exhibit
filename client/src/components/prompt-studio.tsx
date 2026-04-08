import { useEffect, useId, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, Check, ChevronDown, ChevronUp, Code2, Copy, Image as ImageIcon, Loader2, RefreshCcw, Sparkles, Trash2, Upload } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_HOUSE_CRITIQUE,
  FOUNDATION_PROMPT_LINES,
  HOUSE_CRITIQUE_STORAGE_KEY,
  TARGETING_PROMPT_LINES,
  buildHouseCritiqueLines,
  parseNamedRegionLines,
} from "@/lib/prompt-knowledge";
import { getQueryFn } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

type BuilderMode = "audit-redesign" | "direct-build" | "reference-prompt";

interface HtmlSummary {
  totalElements: number;
  sections: number;
  headings: number;
  buttons: number;
  links: number;
  inputs: number;
  textareas: number;
  selects: number;
  forms: number;
  navs: number;
  tables: number;
  dialogs: number;
  images: number;
  labels: number;
  inlineStyles: number;
  detectedColors: string[];
  heuristicRisks: string[];
}

interface ImageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  dataUrl: string;
}

interface PromptBuildOptions {
  mode: BuilderMode;
  productContext: string;
  annoyances: string;
  desiredOutcome: string;
  houseCritique: string;
  namedRegions: string[];
  preserve: string;
  images: ImageAttachment[];
  htmlSource: string;
  htmlFileName: string | null;
  htmlSummary: HtmlSummary | null;
}

interface ClarificationSnapshot {
  productContext: string;
  houseCritique: string;
  images: ImageAttachment[];
  htmlSource: string;
  htmlFileName: string | null;
  htmlSummary: HtmlSummary | null;
  capturedAt: number;
  signature: string;
}

interface OutputSnapshot {
  prompt: string;
  images: ImageAttachment[];
  includeHtmlSource: boolean;
  capturedAt: number;
  signature: string;
  model?: string;
}

interface FinalPromptRequest {
  requestPrompt: string;
  images: ImageAttachment[];
  includeHtmlSource: boolean;
  capturedAt: number;
  signature: string;
}

interface AiStatus {
  configured: boolean;
  provider: string;
  model: string;
}

interface UiAnalysisResponse {
  analysis: string;
  model: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

interface ClarificationSections {
  interfaceIntent: string;
  namedRegions: string[];
  visibleProblems: string;
  inferredHiddenProblems: string;
  workingProblemStatement: string;
  followUpQuestion: string;
  raw: string;
}

interface StoredSourceSession {
  sourceKey: string;
  sourceLabel: string;
  mode: BuilderMode;
  productContext: string;
  annoyances: string;
  desiredOutcome: string;
  preserve: string;
  additionalConcerns: string;
  clarificationAnswer: string;
  includeHtmlSource: boolean;
  clarification: ClarificationSections | null;
  clarificationSnapshot: Pick<ClarificationSnapshot, "capturedAt" | "signature"> | null;
  outputSnapshot: Pick<OutputSnapshot, "prompt" | "includeHtmlSource" | "capturedAt" | "signature" | "model"> | null;
  updatedAt: number;
}

const MODE_META: Record<BuilderMode, { label: string; description: string }> = {
  "audit-redesign": {
    label: "Audit + redesign",
    description: "Best when you want a precise critique first and then a tailored rebuild prompt.",
  },
  "direct-build": {
    label: "Direct build prompt",
    description: "Best when you want the model to skip the essay and move straight into implementation guidance.",
  },
  "reference-prompt": {
    label: "Reference extraction",
    description: "Best when screenshots are the main input and you want the model to translate them into a strong UI prompt.",
  },
};

const DEFAULT_ANNOYANCES = "List the repetitive problems you keep seeing here: weak hierarchy, overbuilt cards, noisy color use, oversized iconography, inconsistent spacing, unclear states, poor typography, fragile responsiveness, missing empty/loading/error states.";

const DEFAULT_OUTCOME = "Produce a sharper, calmer, more intentional product UI with clear hierarchy, disciplined spacing, neutral structure, strong component logic, and all major states covered across desktop and mobile.";

const DEFAULT_CONTEXT_GUIDANCE = "Paste anything useful here: what this screen is for, who uses it, business constraints, edge cases, known problems, copied stakeholder notes, dictated transcript text, or the change you actually want. The AI should compress this into usable context instead of making you restate it later.";

const SOURCE_SESSION_STORAGE_KEY = "exhibit.prompt-builder.source-sessions";
const SOURCE_SESSION_LIMIT = 12;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatSnapshotTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function escapeCodeFence(value: string) {
  return value.replace(/```/g, "``\\`");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildImageSignature(images: ImageAttachment[]) {
  return images.map((image) => image.id).join("|");
}

function buildSourcePackageKey(options: { images: ImageAttachment[]; htmlFileName: string | null; htmlFingerprint: string }) {
  return hashString([
    options.htmlFileName || "",
    options.htmlFingerprint,
    options.images.map((image) => `${image.id}:${image.width}x${image.height}`).join("|"),
  ].join("::"));
}

function readStoredSourceSessions() {
  try {
    const raw = window.localStorage.getItem(SOURCE_SESSION_STORAGE_KEY);
    if (!raw) return {} as Record<string, StoredSourceSession>;

    return JSON.parse(raw) as Record<string, StoredSourceSession>;
  } catch {
    return {} as Record<string, StoredSourceSession>;
  }
}

function writeStoredSourceSessions(nextSessions: Record<string, StoredSourceSession>) {
  try {
    const trimmedEntries = Object.entries(nextSessions)
      .sort(([, left], [, right]) => right.updatedAt - left.updatedAt)
      .slice(0, SOURCE_SESSION_LIMIT);

    window.localStorage.setItem(SOURCE_SESSION_STORAGE_KEY, JSON.stringify(Object.fromEntries(trimmedEntries)));
  } catch {
    // Ignore storage access failures.
  }
}

function buildSourceDigestItems(images: ImageAttachment[], htmlSource: string, htmlFileName: string | null, htmlSummary: HtmlSummary | null) {
  const items: string[] = [];

  if (images.length > 0) {
    items.push(images.map((image) => `${image.name} ${image.width}x${image.height}`).join(" | "));
  }

  if (htmlSource.trim()) {
    if (htmlSummary) {
      items.push(`${htmlFileName || "pasted-markup.html"}: ${htmlSummary.totalElements} elements, ${htmlSummary.buttons} buttons, ${htmlSummary.forms} forms, ${htmlSummary.headings} headings`);
    } else {
      items.push(`${htmlFileName || "pasted-markup.html"}: ${htmlSource.length.toLocaleString()} characters of markup`);
    }
  }

  return items;
}

function buildAttachmentLines(images: ImageAttachment[], htmlSource: string, htmlFileName: string | null, htmlSummary: HtmlSummary | null) {
  return [
    ...(images.length > 0
      ? images.map((image, index) => `- Screenshot ${index + 1}: ${image.name} (${image.width}x${image.height}, ${formatBytes(image.size)}). Treat it as a distinct uploaded reference and mention it by name when relevant.`)
      : ["- No screenshot is attached. If only HTML is present, infer visuals conservatively and call out uncertainty."]),
    htmlSource.trim()
      ? `- HTML source: ${htmlFileName || "pasted-markup.html"}${htmlSummary ? ` (${htmlSummary.totalElements} elements, ${htmlSummary.buttons} buttons, ${htmlSummary.forms} forms)` : ""}. Use it to understand structure, repeated patterns, and likely missing states.`
      : "- No HTML source is included. Base the critique on the visible UI and the written context.",
  ];
}

function buildClarificationSignature(options: Pick<ClarificationSnapshot, "productContext" | "houseCritique" | "images" | "htmlSource">) {
  return [
    options.productContext.trim(),
    options.houseCritique.trim(),
    options.htmlSource.trim(),
    buildImageSignature(options.images),
  ].join("::");
}

function buildOutputSignature(options: {
  mode: BuilderMode;
  productContext: string;
  resolvedProblemStatement: string;
  desiredOutcome: string;
  houseCritique: string;
  preserve: string;
  htmlSource: string;
  includeHtmlSource: boolean;
  images: ImageAttachment[];
  namedRegions: string[];
}) {
  return [
    options.mode,
    options.productContext.trim(),
    options.resolvedProblemStatement.trim(),
    options.desiredOutcome.trim(),
    options.houseCritique.trim(),
    options.preserve.trim(),
    options.htmlSource.trim(),
    options.includeHtmlSource ? "with-html" : "prompt-only",
    options.namedRegions.join("|"),
    buildImageSignature(options.images),
  ].join("::");
}

function describeSourceMaterial(images: ImageAttachment[], htmlSource: string, htmlFileName: string | null) {
  const parts: string[] = [];

  if (images.length > 0) {
    parts.push(`${images.length} screenshot${images.length === 1 ? "" : "s"}`);
  }

  if (htmlSource.trim()) {
    parts.push(htmlFileName ? `HTML from ${htmlFileName}` : "pasted HTML");
  }

  return parts.length > 0 ? parts.join(" + ") : "No source attached yet";
}

function highlightHtmlForDisplay(source: string) {
  const safeSource = escapeHtml(source || "<!-- Paste HTML here -->");

  return safeSource
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-neutral-500">$1</span>')
    .replace(/(&lt;\/?)([A-Za-z][\w:-]*)/g, '$1<span class="text-sky-300">$2</span>')
    .replace(/([A-Za-z_:][\w:.-]*)(=)(&quot;.*?&quot;|&#39;.*?&#39;)/g, '<span class="text-amber-300">$1</span>$2<span class="text-emerald-300">$3</span>');
}

function parseDetectedColors(html: string) {
  const matches = html.match(/#(?:[\da-fA-F]{3}|[\da-fA-F]{6}|[\da-fA-F]{8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g) ?? [];
  return Array.from(new Set(matches.map(match => match.trim()))).slice(0, 10);
}

function buildHeuristicRisks(summary: Omit<HtmlSummary, "heuristicRisks">) {
  const risks: string[] = [];

  if (summary.inlineStyles >= 12) {
    risks.push("Heavy inline styling suggests weak token discipline and brittle spacing/color decisions.");
  }

  if (summary.detectedColors.length >= 7) {
    risks.push("Many explicit color tokens suggest the interface may lack a consistent hierarchy or semantic color system.");
  }

  if (summary.headings === 0) {
    risks.push("No semantic headings were detected, which usually means weak information hierarchy and poor screen-reader structure.");
  }

  if (summary.inputs + summary.textareas + summary.selects > 0 && summary.labels < summary.inputs + summary.textareas + summary.selects) {
    risks.push("Form controls appear to outnumber labels, so some fields may rely on placeholders instead of proper labels.");
  }

  if (summary.tables > 0 && summary.headings === 0) {
    risks.push("Tabular or dense data exists without much semantic structure, which often creates scanning and accessibility issues.");
  }

  if (summary.buttons >= 8 && summary.navs === 0) {
    risks.push("High action density without a clear navigation landmark can signal cluttered priorities and weak task grouping.");
  }

  if (summary.dialogs === 0) {
    risks.push("Modal, loading, confirmation, and destructive states are not visible in the DOM snapshot and should be treated as likely missing or inconsistent.");
  }

  return risks;
}

function summarizeHtml(html: string): HtmlSummary | null {
  const trimmed = html.trim();
  if (!trimmed) return null;

  const doc = new DOMParser().parseFromString(trimmed, "text/html");
  const root = doc.body;

  const baseSummary = {
    totalElements: root.querySelectorAll("*").length,
    sections: root.querySelectorAll("section, article, aside, header, footer, main").length,
    headings: root.querySelectorAll("h1, h2, h3, h4, h5, h6").length,
    buttons: root.querySelectorAll("button, [role='button']").length,
    links: root.querySelectorAll("a[href]").length,
    inputs: root.querySelectorAll("input").length,
    textareas: root.querySelectorAll("textarea").length,
    selects: root.querySelectorAll("select").length,
    forms: root.querySelectorAll("form").length,
    navs: root.querySelectorAll("nav, [role='navigation']").length,
    tables: root.querySelectorAll("table").length,
    dialogs: root.querySelectorAll("dialog, [role='dialog'], [aria-modal='true']").length,
    images: root.querySelectorAll("img, svg").length,
    labels: root.querySelectorAll("label").length,
    inlineStyles: root.querySelectorAll("[style]").length,
    detectedColors: parseDetectedColors(trimmed),
  };

  return {
    ...baseSummary,
    heuristicRisks: buildHeuristicRisks(baseSummary),
  };
}

function buildHtmlDigest(summary: HtmlSummary | null) {
  if (!summary) return [];

  const lines = [
    `- DOM snapshot: ${summary.totalElements} elements, ${summary.sections} sectioning regions, ${summary.headings} headings, ${summary.buttons} buttons, ${summary.links} links.`,
    `- Inputs: ${summary.inputs} inputs, ${summary.textareas} textareas, ${summary.selects} selects, ${summary.forms} forms, ${summary.labels} labels.`,
    `- Structure: ${summary.navs} nav landmarks, ${summary.tables} tables, ${summary.dialogs} dialogs, ${summary.images} image or SVG nodes, ${summary.inlineStyles} inline-styled nodes.`,
  ];

  if (summary.detectedColors.length > 0) {
    lines.push(`- Explicit color tokens found in the HTML: ${summary.detectedColors.join(", ")}.`);
  }

  if (summary.heuristicRisks.length > 0) {
    lines.push("- HTML-based risk signals:");
    summary.heuristicRisks.forEach(risk => lines.push(`  - ${risk}`));
  }

  return lines;
}

function buildPrompt(options: PromptBuildOptions & { clarification: ClarificationSections | null }) {
  const { mode, productContext, annoyances, desiredOutcome, houseCritique, namedRegions, preserve, images, htmlSource, htmlFileName, htmlSummary, clarification } = options;

  const attachmentLines = buildAttachmentLines(images, htmlSource, htmlFileName, htmlSummary);
  const htmlDigest = buildHtmlDigest(htmlSummary);
  const houseCritiqueLines = buildHouseCritiqueLines(houseCritique);
  const namedRegionLines = namedRegions.length > 0
    ? namedRegions.map((region) => `- ${region}`)
    : ["- No named regions were confirmed yet. Identify the exact interface zones that need to change before writing the final redesign prompt."];

  const contextLines = [
    `- Full context from the user: ${productContext.trim() || DEFAULT_CONTEXT_GUIDANCE}`,
    `- What feels annoying, poor, or repetitive: ${annoyances.trim() || DEFAULT_ANNOYANCES}`,
    `- Desired outcome: ${desiredOutcome.trim() || DEFAULT_OUTCOME}`,
    `- Preserve if still useful: ${preserve.trim() || "Preserve only the parts that genuinely support the task, content structure, or product logic. Do not preserve weak visual habits out of inertia."}`,
  ];

  return [
    "You are generating the final reusable UI redesign prompt the user will paste into another coding or design model.",
    "",
    "You already have the source evidence internally. Use it to make the prompt precise, but do not mention screenshots, uploads, file names, HTML files, attached material, source packages, or your own analysis process in the output.",
    "",
    "OUTPUT REQUIREMENT",
    "Return only the final prompt text. No headings, no analysis preamble, no explanation of what you did, and no meta commentary.",
    "",
    "WORKING BRIEF",
    ...contextLines,
    ...(clarification
      ? [
          "",
          "FIRST-PASS AI READ",
          `- Interface intent: ${clarification.interfaceIntent || "Not available."}`,
          `- Visible problems: ${clarification.visibleProblems || "Not available."}`,
          `- Inferred hidden problems: ${clarification.inferredHiddenProblems || "Not available."}`,
          `- AI follow-up question: ${clarification.followUpQuestion || "Not available."}`,
        ]
      : []),
    "",
    "SOURCE EVIDENCE FOR INTERNAL USE ONLY",
    ...attachmentLines,
    ...(htmlDigest.length > 0 ? ["", "HTML SUMMARY", ...htmlDigest] : []),
    "",
    "BUILT-IN FOUNDATIONAL KNOWLEDGE",
    ...FOUNDATION_PROMPT_LINES,
    "",
    "HOUSE CRITIQUE PROFILE",
    ...houseCritiqueLines,
    "",
    "TARGETING LENSES",
    ...TARGETING_PROMPT_LINES,
    "",
    "PRIORITY REGIONS TO TARGET",
    ...namedRegionLines,
    "",
    "FINAL PROMPT RULES",
    "- Make the prompt precise to this exact interface and its likely product use.",
    "- Name the exact regions and component systems that should change.",
    "- Be concrete about layout, spacing, typography, component hierarchy, density, states, and interaction behavior.",
    "- Preserve only what is genuinely useful from the current product logic.",
    "- Include desktop and mobile expectations plus major states.",
    "- Avoid vague filler like 'make it cleaner' or 'improve hierarchy' without saying how.",
    "- Do not mention screenshots, images, file names, uploads, HTML source, or that evidence was provided.",
    "- Write the result like a prompt the user can paste directly into another AI tool.",
    "",
    `OUTPUT MODE: ${MODE_META[mode].label}. ${MODE_META[mode].description}`,
  ].join("\n");
}

function buildClarificationPrompt(options: Pick<PromptBuildOptions, "productContext" | "houseCritique" | "images" | "htmlSource" | "htmlFileName" | "htmlSummary">) {
  const { productContext, images, htmlSource, htmlFileName, htmlSummary, houseCritique } = options;
  const htmlDigest = buildHtmlDigest(htmlSummary);
  const houseCritiqueLines = buildHouseCritiqueLines(houseCritique);
  const attachmentLines = buildAttachmentLines(images, htmlSource, htmlFileName, htmlSummary);

  return [
    "You are doing the first quick read of a UI so the user does not have to explain everything from scratch.",
    "",
    "Study the attached screenshots and/or HTML, then return exactly these sections and labels:",
    "INTERFACE_INTENT:",
    "One short paragraph describing what this screen appears to be and what the user is likely trying to do.",
    "",
    "NAMED_REGIONS:",
    "A bullet list naming 3-6 exact interface regions, components, or zones that most need redesign attention. Keep each bullet short and concrete.",
    "",
    "VISIBLE_PROBLEMS:",
    "A tight bullet list of the main visible UI problems.",
    "",
    "INFERRED_HIDDEN_PROBLEMS:",
    "A tight bullet list of likely hidden problems across states, interaction, responsiveness, and accessibility. Prefix each bullet with 'Inferred:'.",
    "",
    "WORKING_PROBLEM_STATEMENT:",
    "A concise 2-4 sentence editable brief describing what should be fixed. This should sound like a practical problem summary the user can approve or tweak.",
    "",
    "FOLLOW_UP_QUESTION:",
    "One short question that checks whether you are focusing on the right design problem.",
    "",
    "SOURCE PACKAGE",
    ...attachmentLines,
    "",
    "CONTEXT",
    `- User-supplied full context: ${productContext.trim() || DEFAULT_CONTEXT_GUIDANCE}`,
    ...(htmlDigest.length > 0 ? ["", "HTML SUMMARY", ...htmlDigest] : []),
    "",
    "BUILT-IN FOUNDATIONAL KNOWLEDGE",
    ...FOUNDATION_PROMPT_LINES,
    "",
    "HOUSE CRITIQUE PROFILE",
    ...houseCritiqueLines,
    "",
    "TARGETING LENSES",
    ...TARGETING_PROMPT_LINES,
    "",
    "RULES",
    "- Be direct and concrete.",
    "- Avoid generic UX filler.",
    "- Make the read specific to the exact uploaded files instead of speaking in abstract UI generalities.",
    "- Mention the source files by name when that helps anchor the critique.",
    "- Keep the follow-up question short.",
    "- Make the working problem statement useful enough that the user can accept it with minimal edits.",
    "- Use the foundational knowledge above while still respecting the actual evidence in the screenshot or HTML.",
  ].join("\n");
}

function extractTaggedSection(text: string, label: string) {
  const pattern = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`);
  const match = text.match(pattern);
  return match?.[1]?.trim() || "";
}

function parseClarificationResponse(text: string): ClarificationSections {
  return {
    interfaceIntent: extractTaggedSection(text, "INTERFACE_INTENT"),
    namedRegions: parseNamedRegionLines(extractTaggedSection(text, "NAMED_REGIONS")),
    visibleProblems: extractTaggedSection(text, "VISIBLE_PROBLEMS"),
    inferredHiddenProblems: extractTaggedSection(text, "INFERRED_HIDDEN_PROBLEMS"),
    workingProblemStatement: extractTaggedSection(text, "WORKING_PROBLEM_STATEMENT"),
    followUpQuestion: extractTaggedSection(text, "FOLLOW_UP_QUESTION"),
    raw: text.trim(),
  };
}

async function readTextFile(file: File) {
  return file.text();
}

async function readImageFile(file: File): Promise<ImageAttachment> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

  const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error(`Failed to load image metadata for ${file.name}.`));
    image.src = dataUrl;
  });

  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    type: file.type,
    size: file.size,
    width: dimensions.width,
    height: dimensions.height,
    dataUrl,
  };
}

function FileDropSurface({
  title,
  description,
  accept,
  multiple,
  onFilesSelected,
  icon: Icon,
}: {
  title: string;
  description: string;
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-2xl border border-dashed bg-card/70 p-4 transition-all",
        dragging ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40"
      )}
    >
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length > 0) {
            onFilesSelected(files);
          }
          event.target.value = "";
        }}
      />

      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openPicker}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Upload className="h-4 w-4" />
              Choose file{multiple ? "s" : ""}
            </button>
            <label htmlFor={inputId} className="text-xs text-muted-foreground">
              Drag and drop also works
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromptStudio() {
  const [mode, setMode] = useState<BuilderMode>("audit-redesign");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [productContext, setProductContext] = useState("");
  const [annoyances, setAnnoyances] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState(DEFAULT_OUTCOME);
  const [houseCritique, setHouseCritique] = useState(DEFAULT_HOUSE_CRITIQUE);
  const [preserve, setPreserve] = useState("");
  const [additionalConcerns, setAdditionalConcerns] = useState("");
  const [clarificationAnswer, setClarificationAnswer] = useState("");
  const [clarification, setClarification] = useState<ClarificationSections | null>(null);
  const [htmlSource, setHtmlSource] = useState("");
  const [htmlFileName, setHtmlFileName] = useState<string | null>(null);
  const [htmlSourceFingerprint, setHtmlSourceFingerprint] = useState("");
  const [htmlSummary, setHtmlSummary] = useState<HtmlSummary | null>(null);
  const [htmlError, setHtmlError] = useState<string | null>(null);
  const [includeHtmlSource, setIncludeHtmlSource] = useState(false);
  const [images, setImages] = useState<ImageAttachment[]>([]);
  const [clarificationSnapshot, setClarificationSnapshot] = useState<ClarificationSnapshot | null>(null);
  const [outputSnapshot, setOutputSnapshot] = useState<OutputSnapshot | null>(null);
  const [restoredSourceKey, setRestoredSourceKey] = useState<string | null>(null);
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null);
  const htmlHighlightRef = useRef<HTMLPreElement>(null);
  const restoringSourceSessionRef = useRef(false);

  const { data: aiStatus } = useQuery<AiStatus>({
    queryKey: ["/api/ai/status"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem(HOUSE_CRITIQUE_STORAGE_KEY);
      if (storedProfile?.trim()) {
        setHouseCritique(storedProfile);
      }
    } catch {
      // Ignore local storage access failures.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(HOUSE_CRITIQUE_STORAGE_KEY, houseCritique);
    } catch {
      // Ignore local storage access failures.
    }
  }, [houseCritique]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const nextSummary = summarizeHtml(htmlSource);
        setHtmlSummary(nextSummary);
        setHtmlError(null);
      } catch (error) {
        setHtmlSummary(null);
        setHtmlError(error instanceof Error ? error.message : "Unable to analyze the HTML source.");
      }
    }, 180);

    return () => window.clearTimeout(timer);
  }, [htmlSource]);

  useEffect(() => {
    if (htmlSource.length > 12000 && includeHtmlSource) {
      setIncludeHtmlSource(false);
    }
  }, [htmlSource, includeHtmlSource]);

  const hasSourceMaterial = images.length > 0 || Boolean(htmlSource.trim());
  const sourcePackageKey = hasSourceMaterial
    ? buildSourcePackageKey({
        images,
        htmlFileName,
        htmlFingerprint: htmlSourceFingerprint || (htmlSource.trim() ? hashString(htmlSource.trim()) : ""),
      })
    : "";
  const sourceLabel = describeSourceMaterial(images, htmlSource, htmlFileName);
  const sourceDigestItems = buildSourceDigestItems(images, htmlSource, htmlFileName, htmlSummary);
  const hasContextNotes = Boolean(productContext.trim() || preserve.trim());
  const hasCustomHouseCritique = houseCritique.trim() !== DEFAULT_HOUSE_CRITIQUE.trim();
  const clarificationPrompt = buildClarificationPrompt({
    productContext,
    houseCritique,
    images,
    htmlSource,
    htmlFileName,
    htmlSummary,
  });
  const clarificationSignature = buildClarificationSignature({
    productContext,
    houseCritique,
    images,
    htmlSource,
  });

  const resolvedProblemStatement = [
    annoyances.trim() || clarification?.workingProblemStatement || DEFAULT_ANNOYANCES,
    clarificationAnswer.trim() ? `Answer to AI clarification question: ${clarificationAnswer.trim()}` : "",
    additionalConcerns.trim() ? `Additional concerns from the user: ${additionalConcerns.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const hasWorkingProblemStatement = Boolean((annoyances.trim() || clarification?.workingProblemStatement || "").trim());
  const promptReady = hasSourceMaterial && Boolean(clarification) && hasWorkingProblemStatement;
  const outputSignature = buildOutputSignature({
    mode,
    productContext,
    resolvedProblemStatement,
    desiredOutcome,
    houseCritique,
    preserve,
    htmlSource,
    includeHtmlSource,
    images,
    namedRegions: clarification?.namedRegions || [],
  });
  const clarificationNeedsRefresh = hasSourceMaterial && clarificationSnapshot?.signature !== clarificationSignature;
  const outputNeedsRefresh = promptReady && outputSnapshot?.signature !== outputSignature;
  const htmlCodeMarkup = highlightHtmlForDisplay(htmlSource);

  useEffect(() => {
    if (!sourcePackageKey) {
      setRestoredSourceKey(null);
      return;
    }

    const storedSession = readStoredSourceSessions()[sourcePackageKey];
    restoringSourceSessionRef.current = true;
    clarificationMutation.reset();
    analysisMutation.reset();

    if (storedSession) {
      setMode(storedSession.mode);
      setProductContext(storedSession.productContext);
      setAnnoyances(storedSession.annoyances);
      setDesiredOutcome(storedSession.desiredOutcome || DEFAULT_OUTCOME);
      setPreserve(storedSession.preserve);
      setAdditionalConcerns(storedSession.additionalConcerns);
      setClarificationAnswer(storedSession.clarificationAnswer);
      setClarification(storedSession.clarification);
      setIncludeHtmlSource(Boolean(htmlSource.trim()) && htmlSource.length <= 12000 && storedSession.includeHtmlSource);
      setClarificationSnapshot(
        storedSession.clarificationSnapshot
          ? {
              productContext: storedSession.productContext,
              houseCritique,
              images,
              htmlSource,
              htmlFileName,
              htmlSummary,
              capturedAt: storedSession.clarificationSnapshot.capturedAt,
              signature: storedSession.clarificationSnapshot.signature,
            }
          : null,
      );
      setOutputSnapshot(
        storedSession.outputSnapshot
          ? {
              prompt: storedSession.outputSnapshot.prompt,
              images,
              includeHtmlSource: storedSession.outputSnapshot.includeHtmlSource,
              capturedAt: storedSession.outputSnapshot.capturedAt,
              signature: storedSession.outputSnapshot.signature,
              model: storedSession.outputSnapshot.model,
            }
          : null,
      );
      setRestoredSourceKey(sourcePackageKey);
    } else {
      setMode("audit-redesign");
      setProductContext("");
      setAnnoyances("");
      setDesiredOutcome(DEFAULT_OUTCOME);
      setPreserve("");
      setAdditionalConcerns("");
      setClarificationAnswer("");
      setClarification(null);
      setClarificationSnapshot(null);
      setOutputSnapshot(null);
      setIncludeHtmlSource(Boolean(htmlSource.trim()) && htmlSource.length <= 12000);
      setRestoredSourceKey(null);
    }

    const releaseRestoreLock = window.setTimeout(() => {
      restoringSourceSessionRef.current = false;
    }, 0);

    return () => window.clearTimeout(releaseRestoreLock);
  }, [sourcePackageKey]);

  useEffect(() => {
    if (!sourcePackageKey || restoringSourceSessionRef.current) {
      return;
    }

    const nextSessions = readStoredSourceSessions();
    nextSessions[sourcePackageKey] = {
      sourceKey: sourcePackageKey,
      sourceLabel,
      mode,
      productContext,
      annoyances,
      desiredOutcome,
      preserve,
      additionalConcerns,
      clarificationAnswer,
      includeHtmlSource,
      clarification,
      clarificationSnapshot: clarificationSnapshot
        ? {
            capturedAt: clarificationSnapshot.capturedAt,
            signature: clarificationSnapshot.signature,
          }
        : null,
      outputSnapshot: outputSnapshot
        ? {
            prompt: outputSnapshot.prompt,
            includeHtmlSource: outputSnapshot.includeHtmlSource,
            capturedAt: outputSnapshot.capturedAt,
            signature: outputSnapshot.signature,
            model: outputSnapshot.model,
          }
        : null,
      updatedAt: Date.now(),
    };

    writeStoredSourceSessions(nextSessions);
  }, [
    sourcePackageKey,
    sourceLabel,
    mode,
    productContext,
    annoyances,
    desiredOutcome,
    preserve,
    additionalConcerns,
    clarificationAnswer,
    includeHtmlSource,
    clarification,
    clarificationSnapshot,
    outputSnapshot,
  ]);

  const clarificationMutation = useMutation<UiAnalysisResponse, Error, ClarificationSnapshot>({
    mutationFn: async (snapshot) => {
      const response = await fetch("/api/ai/ui-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildClarificationPrompt(snapshot),
          images: snapshot.images,
        }),
      });

      const payload = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "AI first-pass analysis failed.");
      }

      return payload as UiAnalysisResponse;
    },
    onSuccess: (result, snapshot) => {
      const parsed = parseClarificationResponse(result.analysis);
      setClarificationSnapshot(snapshot);
      setClarification(parsed);
      setOutputSnapshot(null);
      setRestoredSourceKey(snapshot.signature ? sourcePackageKey : null);

      if (!annoyances.trim()) {
        setAnnoyances(parsed.workingProblemStatement || parsed.visibleProblems || DEFAULT_ANNOYANCES);
      }

      if (!productContext.trim() && parsed.interfaceIntent) {
        setProductContext(parsed.interfaceIntent);
      }

      toast({
        title: "AI first pass ready",
        description: `${result.model} generated a source-specific read for ${describeSourceMaterial(snapshot.images, snapshot.htmlSource, snapshot.htmlFileName)}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "AI first pass failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generatedPrompt = buildPrompt({
    mode,
    productContext,
    annoyances: resolvedProblemStatement,
    desiredOutcome,
    houseCritique,
    namedRegions: clarification?.namedRegions || [],
    preserve,
    images,
    htmlSource,
    htmlFileName,
    htmlSummary,
    clarification,
  });

  const promptWithHtml = htmlSource.trim()
    ? [generatedPrompt, "", "HTML SOURCE", "", "```html", escapeCodeFence(htmlSource), "```"].join("\n")
    : generatedPrompt;
  const promptToSend = includeHtmlSource ? promptWithHtml : generatedPrompt;

  const analysisMutation = useMutation<UiAnalysisResponse, Error, FinalPromptRequest>({
    mutationFn: async (request) => {
      const response = await fetch("/api/ai/ui-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: request.requestPrompt,
          images: request.images,
        }),
      });

      const payload = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "AI analysis failed.");
      }

      return payload as UiAnalysisResponse;
    },
    onSuccess: (result, request) => {
      setOutputSnapshot({
        prompt: result.analysis,
        images: request.images,
        includeHtmlSource: request.includeHtmlSource,
        capturedAt: request.capturedAt,
        signature: request.signature,
        model: result.model,
      });
      toast({
        title: "Prompt generated",
        description: `${result.model} generated a source-aware final prompt.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Prompt generation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: `${label} copied`,
        description: "The generated prompt is ready to paste into your design or coding assistant.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Clipboard access was blocked. You can still copy from the panel manually.",
        variant: "destructive",
      });
    }
  };

  const resetAiState = () => {
    clarificationMutation.reset();
    analysisMutation.reset();
    setClarificationSnapshot(null);
    setOutputSnapshot(null);
    setClarification(null);
  };

  const clearSourceMaterial = () => {
    setImages([]);
    setHtmlSource("");
    setHtmlFileName(null);
    setHtmlSourceFingerprint("");
    setHtmlSummary(null);
    setHtmlError(null);
    setIncludeHtmlSource(false);
    setRestoredSourceKey(null);
    resetAiState();
  };

  const resetBuilderSession = () => {
    clearSourceMaterial();
    setMode("audit-redesign");
    setProductContext("");
    setAnnoyances("");
    setDesiredOutcome(DEFAULT_OUTCOME);
    setPreserve("");
    setAdditionalConcerns("");
    setClarificationAnswer("");
    setAdvancedOpen(false);
  };

  const applyHtmlSource = (nextHtml: string, nextFileName: string | null) => {
    setHtmlSource(nextHtml);
    setHtmlFileName(nextFileName);
    setHtmlSourceFingerprint(hashString(nextHtml.trim()));
    setIncludeHtmlSource(nextHtml.length <= 12000);
    resetAiState();
  };

  const runFirstPass = () => {
    if (!hasSourceMaterial) {
      toast({
        title: "Add source material first",
        description: "Upload a screenshot, load an HTML file, or paste HTML before asking the AI to interpret the screen.",
        variant: "destructive",
      });
      return;
    }

    const snapshot: ClarificationSnapshot = {
      productContext,
      houseCritique,
      images,
      htmlSource,
      htmlFileName,
      htmlSummary,
      capturedAt: Date.now(),
      signature: clarificationSignature,
    };

    clarificationMutation.mutate(snapshot);
  };

  const runFinalPromptGeneration = () => {
    if (!promptReady) {
      toast({
        title: "Define the brief first",
        description: "Add source material and make sure the working problem statement actually describes what should change.",
        variant: "destructive",
      });
      return;
    }

    const request: FinalPromptRequest = {
      requestPrompt: promptToSend,
      images,
      includeHtmlSource,
      capturedAt: Date.now(),
      signature: outputSignature,
    };

    analysisMutation.reset();
    analysisMutation.mutate(request);
  };

  const pasteHtmlFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText.trim()) {
        toast({
          title: "Clipboard is empty",
          description: "Copy HTML first, then use this button to drop it straight into the source field.",
          variant: "destructive",
        });
        return;
      }

      applyHtmlSource(clipboardText, null);
      htmlTextareaRef.current?.focus();
      toast({
        title: "HTML pasted from clipboard",
        description: "The builder will summarize it and use it in the next AI pass.",
      });
    } catch {
      toast({
        title: "Clipboard paste failed",
        description: "Your browser blocked clipboard access. You can still right-click or press Ctrl+V in the HTML field.",
        variant: "destructive",
      });
    }
  };

  const handleHtmlFiles = async (files: File[]) => {
    const htmlFile = files.find(file => file.type.includes("html") || /\.(html?|xhtml)$/i.test(file.name));

    if (!htmlFile) {
      toast({
        title: "No HTML file detected",
        description: "Drop an .html or .htm file here so the builder can summarize its structure.",
        variant: "destructive",
      });
      return;
    }

    try {
      const nextHtml = await readTextFile(htmlFile);
      applyHtmlSource(nextHtml, htmlFile.name);
      toast({
        title: "HTML loaded",
        description: `${htmlFile.name} is now part of the generated prompt context.`,
      });
    } catch {
      toast({
        title: "HTML load failed",
        description: `Could not read ${htmlFile.name}.`,
        variant: "destructive",
      });
    }
  };

  const handleImageFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast({
        title: "No images detected",
        description: "Drop PNG, JPG, WEBP, or other image files here to reference screenshots in the prompt.",
        variant: "destructive",
      });
      return;
    }

    try {
      const nextImages = await Promise.all(imageFiles.map(readImageFile));
      setImages(current => {
        const existingIds = new Set(current.map(image => image.id));
        return [...current, ...nextImages.filter(image => !existingIds.has(image.id))];
      });
      resetAiState();
      toast({
        title: "Screenshots added",
        description: `${nextImages.length} screenshot${nextImages.length === 1 ? "" : "s"} attached to the builder context.`,
      });
    } catch {
      toast({
        title: "Image load failed",
        description: "At least one screenshot could not be read.",
        variant: "destructive",
      });
    }
  };

  const syncHtmlPreviewScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (!htmlHighlightRef.current) return;
    htmlHighlightRef.current.scrollTop = event.currentTarget.scrollTop;
    htmlHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  };

  const processCards = [
    {
      label: "Source",
      state: hasSourceMaterial ? "done" : "active",
      detail: hasSourceMaterial
        ? `${images.length} screenshot${images.length === 1 ? "" : "s"}${htmlSource.trim() ? " + HTML attached" : " attached"}`
        : "Paste HTML or drop screenshots first.",
    },
    {
      label: "AI Read",
      state: clarification && !clarificationNeedsRefresh ? "done" : hasSourceMaterial ? "active" : "idle",
      detail: clarification && !clarificationNeedsRefresh
        ? `${clarification.namedRegions.length || 0} priority region${clarification.namedRegions.length === 1 ? "" : "s"} named.`
        : hasSourceMaterial
          ? clarificationNeedsRefresh
            ? "Draft changed. Confirm the new material and rerun the AI read."
            : "Confirm the current source package and ask AI what it sees."
          : "Becomes useful after source material is attached.",
    },
    {
      label: "Steering",
      state: hasContextNotes || hasCustomHouseCritique ? "done" : clarification ? "active" : "idle",
      detail: hasContextNotes || hasCustomHouseCritique
        ? "Context or house rules have been customized."
        : "Only open this when you need to steer the result harder.",
    },
    {
      label: "Output",
      state: outputSnapshot && !outputNeedsRefresh ? "done" : promptReady ? "active" : "idle",
      detail: outputSnapshot && !outputNeedsRefresh
        ? "Generated prompt is ready to copy."
        : promptReady
          ? outputNeedsRefresh
            ? "Draft changed. Generate a new prompt for the current source."
            : "Generate the final prompt when the brief is ready."
          : "A usable prompt appears once the problem is defined.",
    },
  ] as const;

  const nextAction = !hasSourceMaterial
    ? {
        title: "Add source material",
        detail: "Paste HTML directly or attach screenshots so the builder has something concrete to inspect.",
      }
    : !clarification
      ? {
          title: "Confirm the source package and run the AI first pass",
          detail: "Make the analysis input explicit so you know exactly which screenshots, HTML, and context notes the AI is reading.",
        }
      : !promptReady
        ? {
            title: "Lock the working problem statement",
            detail: "Tighten the diagnosis until it clearly describes what should change and what should be preserved.",
          }
        : !outputSnapshot || outputNeedsRefresh
          ? {
              title: "Generate the final prompt",
              detail: "Run AI when the brief is ready. The prompt should only appear once the AI generates it.",
            }
          : {
              title: "Refine from the result",
              detail: "Adjust the brief or source package, then regenerate when you need a sharper prompt.",
            };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-border bg-card px-5 py-5 shadow-sm md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
              <Bot className="h-3.5 w-3.5" />
              Local
            </div>
            {processCards.map((card) => (
              <span
                key={card.label}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium",
                  card.state === "done"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : card.state === "active"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-border bg-background text-muted-foreground"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {card.label}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1.5">
              <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">Prompt Builder</h2>
              <p className="text-sm text-muted-foreground">Source in. AI read. Generate prompt.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {hasSourceMaterial ? (
                <button
                  type="button"
                  onClick={clearSourceMaterial}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear source
                </button>
              ) : null}
              <button
                type="button"
                onClick={resetBuilderSession}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RefreshCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card px-5 py-5 shadow-sm">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Next</div>
          <div className="mt-3 text-base font-semibold text-foreground">{nextAction.title}</div>
          <div className="mt-4 rounded-2xl border border-border bg-background/70 px-3 py-3 text-xs leading-6 text-muted-foreground">
            {describeSourceMaterial(images, htmlSource, htmlFileName)}
          </div>
          {restoredSourceKey === sourcePackageKey && hasSourceMaterial ? (
            <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-700">
              Restored notes for this source package.
            </div>
          ) : null}
          {sourceDigestItems.length > 0 ? (
            <div className="mt-3 space-y-2">
              {sourceDigestItems.slice(0, 2).map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background/70 px-3 py-2 text-xs leading-5 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">1 Source</div>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Add screenshots or HTML</h3>
              </div>
              <div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                {hasSourceMaterial ? describeSourceMaterial(images, htmlSource, htmlFileName) : "Nothing attached"}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <FileDropSurface
                    title="Screenshots"
                    description="PNG, JPG, or WEBP. Use one or many."
                    accept="image/*"
                    multiple
                    onFilesSelected={handleImageFiles}
                    icon={ImageIcon}
                  />
                  <FileDropSurface
                    title="HTML file"
                    description="Load a full .html or .htm file."
                    accept=".html,.htm,text/html"
                    onFilesSelected={handleHtmlFiles}
                    icon={Code2}
                  />
                </div>

                {images.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {images.map((image) => (
                      <div key={image.id} className="overflow-hidden rounded-2xl border border-border bg-background">
                        <img src={image.dataUrl} alt={image.name} className="h-36 w-full object-cover" />
                        <div className="space-y-2 p-3">
                          <div className="truncate text-sm font-medium text-foreground">{image.name}</div>
                          <div className="text-xs text-muted-foreground">{image.width}x{image.height} · {formatBytes(image.size)}</div>
                          <button
                            type="button"
                            onClick={() => setImages(current => current.filter(entry => entry.id !== image.id))}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove screenshot
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-foreground">HTML source</label>
                      <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Draft</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {htmlFileName ? <span>{htmlFileName}</span> : null}
                      <button
                        type="button"
                        onClick={pasteHtmlFromClipboard}
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        Paste
                      </button>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f14] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#11161d] px-4 py-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                        <span className="ml-2 font-medium">{htmlFileName || "markup.html"}</span>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono uppercase tracking-[0.18em] text-slate-400">html</div>
                    </div>
                    <div className="relative min-h-80">
                      <pre
                        ref={htmlHighlightRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-auto p-4 font-mono text-[12.5px] leading-6 text-slate-200"
                      >
                        <code dangerouslySetInnerHTML={{ __html: htmlCodeMarkup }} />
                      </pre>
                      <Textarea
                        ref={htmlTextareaRef}
                        value={htmlSource}
                        onChange={(event) => {
                          setHtmlSource(event.target.value);
                          if (!event.target.value.trim()) {
                            setHtmlFileName(null);
                                setHtmlSourceFingerprint("");
                              } else if (!htmlSourceFingerprint) {
                                setHtmlSourceFingerprint(hashString(event.target.value.trim()));
                          }
                        }}
                        onScroll={syncHtmlPreviewScroll}
                        className="relative min-h-80 resize-y border-0 bg-transparent p-4 font-mono text-[12.5px] leading-6 text-transparent caret-slate-100 shadow-none focus-visible:ring-0 placeholder:text-slate-500"
                        spellCheck={false}
                        placeholder="Paste any amount of HTML here. The builder will summarize structure and can optionally bundle the source into the copied prompt."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-border bg-background/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">Source package</div>
                      <div className="text-xs text-muted-foreground">{describeSourceMaterial(images, htmlSource, htmlFileName)}</div>
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                      <input
                        type="checkbox"
                        checked={includeHtmlSource}
                        onChange={(event) => setIncludeHtmlSource(event.target.checked)}
                        className="h-4 w-4 rounded border-border"
                      />
                      Bundle raw HTML
                    </label>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Screenshots</div>
                      <div className="mt-1 text-sm font-medium text-foreground">{images.length}</div>
                    </div>
                    <div className="rounded-xl border border-border bg-card px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">HTML</div>
                      <div className="mt-1 text-sm font-medium text-foreground">{htmlSource.trim() ? "Loaded" : "Empty"}</div>
                    </div>
                    <div className="rounded-xl border border-border bg-card px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Elements</div>
                      <div className="mt-1 text-sm font-medium text-foreground">{htmlSummary?.totalElements ?? 0}</div>
                    </div>
                    <div className="rounded-xl border border-border bg-card px-3 py-2">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Controls</div>
                      <div className="mt-1 text-sm font-medium text-foreground">{htmlSummary ? htmlSummary.inputs + htmlSummary.textareas + htmlSummary.selects : 0}</div>
                    </div>
                  </div>

                  {htmlSummary?.heuristicRisks.length ? (
                    <div className="mt-4 space-y-2">
                      {htmlSummary.heuristicRisks.slice(0, 3).map((risk) => (
                        <div key={risk} className="rounded-xl border border-border bg-card px-3 py-2 text-xs leading-5 text-muted-foreground">
                          {risk}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {htmlError ? (
                    <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs leading-5 text-destructive">
                      {htmlError}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">2 AI read</div>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Read the screen</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  data-testid="button-run-first-pass"
                  onClick={runFirstPass}
                  disabled={clarificationMutation.isPending || !aiStatus?.configured}
                  className="inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {clarificationMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {clarification ? "Confirm current material and rerun AI read" : "Confirm current material and run AI read"}
                </button>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium uppercase tracking-[0.14em] text-foreground">Current source digest</span>
                  <span className="rounded-full border border-border bg-card px-2.5 py-1">Context</span>
                  <span className="rounded-full border border-border bg-card px-2.5 py-1">House critique</span>
                </div>
                <div className="mt-3 space-y-2">
                  {sourceDigestItems.length > 0 ? sourceDigestItems.map((item) => (
                    <div key={item} className="rounded-xl border border-border bg-card px-3 py-2 text-xs leading-5 text-muted-foreground">
                      {item}
                    </div>
                  )) : (
                    <div className="rounded-xl border border-border bg-card px-3 py-2 text-xs leading-5 text-muted-foreground">
                      Add source material to create a source-specific AI read.
                    </div>
                  )}
                </div>
              </div>
              <div className={cn(
                "rounded-2xl border p-4 text-sm leading-6",
                clarificationSnapshot && !clarificationNeedsRefresh
                  ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                  : "border-amber-200 bg-amber-50/70 text-amber-900"
              )}>
                <div className="font-medium text-foreground">Confirmed AI-read input</div>
                <p className="mt-2">
                  {clarificationSnapshot
                    ? `Last confirmed at ${formatSnapshotTime(clarificationSnapshot.capturedAt)} using ${describeSourceMaterial(clarificationSnapshot.images, clarificationSnapshot.htmlSource, htmlFileName)}.`
                    : "Nothing confirmed yet. The current draft stays local until you run this step."}
                </p>
                {clarificationSnapshot && clarificationNeedsRefresh ? (
                  <p className="mt-2">The draft changed after the last AI read. Rerun this step if you want the diagnosis to match the latest material.</p>
                ) : null}
              </div>
            </div>

            {!aiStatus?.configured ? (
              <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                No AI key is configured yet. Add `OPENAI_API_KEY` to your local `.env`, restart the app, and this first-pass clarification step will work.
              </div>
            ) : null}

            {clarification ? (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="text-sm font-medium text-foreground">What the AI thinks this screen is</div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                      {clarification.interfaceIntent || "The AI did not return an interface intent summary."}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="text-sm font-medium text-foreground">Priority regions to rebuild</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {clarification.namedRegions.length > 0 ? clarification.namedRegions.map((region) => (
                        <span key={region} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
                          {region}
                        </span>
                      )) : (
                        <span className="text-sm text-muted-foreground">No specific regions were returned.</span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="text-sm font-medium text-foreground">Visible problems</div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                        {clarification.visibleProblems || "No visible problems were returned."}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="text-sm font-medium text-foreground">Likely hidden problems</div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                        {clarification.inferredHiddenProblems || "No inferred hidden problems were returned."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="text-sm font-medium text-foreground">Does this match?</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {clarification.followUpQuestion || "If the AI missed the point, rewrite the working problem statement below and add anything it overlooked."}
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Working brief</label>
                      <Textarea
                        value={annoyances}
                        onChange={(event) => setAnnoyances(event.target.value)}
                        className="min-h-33"
                        placeholder="The AI will try to fill this for you. Edit it only if it missed the point."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Correction</label>
                      <Textarea
                        value={clarificationAnswer}
                        onChange={(event) => setClarificationAnswer(event.target.value)}
                        className="min-h-25"
                        placeholder="Example: Yes, but the bigger issue is the pricing hierarchy and how cluttered the comparison logic feels."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Missing detail</label>
                      <Textarea
                        value={additionalConcerns}
                        onChange={(event) => setAdditionalConcerns(event.target.value)}
                        className="min-h-25"
                        placeholder="Optional. Add product-specific concerns that the AI could not infer from the screen alone."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                {clarificationMutation.isPending
                  ? `Analyzing ${sourceLabel}. The AI is using the current files and writing a fresh diagnosis for this source package.`
                  : sourceDigestItems.length > 0
                    ? `Ready to analyze ${sourceLabel}. The AI read will reference these exact files instead of producing a generic screen summary.`
                    : "Add source material, then run the AI read."}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">3 Final brief</div>
              <h3 className="mt-1 text-lg font-semibold text-foreground">Shape the output</h3>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              {Object.entries(MODE_META).map(([value, meta]) => {
                const active = mode === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMode(value as BuilderMode)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      active ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:border-primary/35"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">{meta.label}</div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{meta.description}</p>
                      </div>
                      {active ? <Check className="mt-0.5 h-4 w-4 text-primary" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-medium text-foreground">Advanced</div>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {advancedOpen ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {advancedOpen ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">Context</label>
                  <Textarea
                    value={productContext}
                    onChange={(event) => setProductContext(event.target.value)}
                    className="min-h-32"
                    placeholder="Paste anything useful here: what this interface is for, who uses it, constraints, edge cases, copied Slack notes, dictated transcript text, or the real business problem behind the redesign."
                  />
                </div>

                <div className="lg:col-span-2">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium text-foreground">House critique</label>
                    <button
                      type="button"
                      onClick={() => setHouseCritique(DEFAULT_HOUSE_CRITIQUE)}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      Reset defaults
                    </button>
                  </div>
                  <Textarea
                    value={houseCritique}
                    onChange={(event) => setHouseCritique(event.target.value)}
                    className="min-h-28"
                    placeholder="Write the recurring standards and dislikes you want injected into every prompt. This is saved locally in the browser for the builder and prompt library."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Keep</label>
                  <Textarea
                    value={preserve}
                    onChange={(event) => setPreserve(event.target.value)}
                    className="min-h-25"
                    placeholder="Optional. Example: keep the information architecture, the comparison logic, and the dense table layout."
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">Target feel</label>
                  <Textarea
                    value={desiredOutcome}
                    onChange={(event) => setDesiredOutcome(event.target.value)}
                    className="min-h-30"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">4 Output</div>
              <h3 className="text-lg font-semibold text-foreground">Generate the final prompt</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={runFinalPromptGeneration}
                disabled={analysisMutation.isPending || !aiStatus?.configured || !promptReady}
                className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {analysisMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {outputSnapshot ? "Regenerate prompt" : "Generate prompt"}
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
              <div className={cn(
                "rounded-2xl border p-4 text-sm leading-6",
                outputSnapshot && !outputNeedsRefresh
                  ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                  : "border-amber-200 bg-amber-50/70 text-amber-900"
              )}>
                <div className="font-medium text-foreground">Generated prompt state</div>
                <p className="mt-2">
                  {outputSnapshot
                    ? `Generated at ${formatSnapshotTime(outputSnapshot.capturedAt)}.${outputSnapshot.model ? ` ${outputSnapshot.model}.` : ""}`
                    : "No prompt generated yet."}
                </p>
                {outputSnapshot && outputNeedsRefresh ? (
                  <p className="mt-2">Inputs changed. Generate a new prompt for the current source.</p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                <div className="font-medium text-foreground">AI</div>
                <p className="mt-2">
                  {aiStatus?.configured ? aiStatus.model : "Add OPENAI_API_KEY to enable live analysis."}
                </p>
              </div>
            </div>

            {outputSnapshot ? (
              <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">Generated prompt</div>
                    <div className="text-xs text-muted-foreground">
                      {sourceLabel}
                      {outputNeedsRefresh ? " · stale" : " · current"}
                    </div>
                  </div>
                  <button
                    type="button"
                    data-testid="button-copy-generated-prompt"
                    onClick={() => copyText(outputSnapshot.prompt, "Prompt")}
                    disabled={outputNeedsRefresh}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy prompt
                  </button>
                </div>
                <pre className="max-h-245 overflow-auto rounded-2xl border border-border bg-[#0b0b0c] p-5 text-[12.5px] leading-7 text-white/85">
                  {outputSnapshot.prompt}
                </pre>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                Run AI to generate the prompt.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}