import { z } from "zod";

const aiPlatformSchema = z.enum(["web", "desktop-web", "mobile-web", "electron", "unknown"]);
const orchestrationConfidenceModeSchema = z.enum(["proceed", "proceed_with_cautions", "ask_for_truth"]);
const orchestrationDeliveryModeSchema = z.enum(["reference_only", "reference_plus_source", "reference_plus_adaptation_guidance"]);
const orchestrationImplementationPostureSchema = z.enum([
  "adapt_from_reference",
  "use_as_shell_anchor",
  "use_as_row_grammar",
  "use_as_state_pattern",
  "scaffold_honestly_first",
]);

export const aiImageSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string().min(1).max(120).optional(),
  size: z.number().int().nonnegative().max(15 * 1024 * 1024).optional(),
  width: z.number().int().positive().max(12000).optional(),
  height: z.number().int().positive().max(12000).optional(),
  dataUrl: z.string().startsWith("data:image/"),
});

const staticDecisionComponentSchema = z.object({
  slug: z.string().min(1).max(160),
  score: z.number(),
  category: z.string().min(1).max(160),
  fitReason: z.string().min(1).max(700),
  usageRole: z.string().min(1).max(240),
  deliveryMode: orchestrationDeliveryModeSchema,
});

export const staticDecisionPacketSchema = z.object({
  prompt: z.string().min(1).max(250_000),
  goal: z.string().min(1).max(400).nullable().optional(),
  routeHint: z.string().min(1).max(200).nullable().optional(),
  platform: aiPlatformSchema.optional(),
  classification: z.object({
    surfaceType: z.string().min(1).max(160),
    dominantTaskSurface: z.string().min(1).max(160),
    designProfile: z.string().min(1).max(160).nullable().optional(),
    shellRecommendation: z.string().min(1).max(160).nullable().optional(),
    confidence: z.number().min(0).max(1),
    confidenceMode: orchestrationConfidenceModeSchema,
  }),
  missingTruth: z.array(z.string().min(1).max(160)).max(12).default([]),
  contextSignals: z.object({
    primaryActor: z.string().min(1).max(160).nullable().optional(),
    primaryObject: z.string().min(1).max(160).nullable().optional(),
    mutationType: z.string().min(1).max(160).nullable().optional(),
    sourceOfTruth: z.string().min(1).max(160).nullable().optional(),
    dominantWorkflowStage: z.string().min(1).max(160).nullable().optional(),
    dataSources: z.array(z.string().min(1).max(160)).max(20).default([]),
    mutations: z.array(z.string().min(1).max(160)).max(20).default([]),
    observedAsyncProblems: z.array(z.string().min(1).max(220)).max(20).default([]),
    existingSurfaceSignals: z.array(z.string().min(1).max(220)).max(20).default([]),
    competingControls: z.array(z.string().min(1).max(220)).max(20).default([]),
  }),
  designProfileSummary: z.object({
    id: z.string().min(1).max(160),
    label: z.string().min(1).max(200),
    density: z.string().min(1).max(80),
    iconLibrary: z.string().min(1).max(120),
    elevation: z.string().min(1).max(200),
    motion: z.string().min(1).max(120),
  }).nullable().optional(),
  shellRecommendation: z.object({
    id: z.string().min(1).max(160),
    label: z.string().min(1).max(200),
    why: z.string().min(1).max(600),
    preserve: z.array(z.string().min(1).max(220)).max(8).default([]),
    avoid: z.array(z.string().min(1).max(220)).max(8).default([]),
  }).nullable().optional(),
  rankedComponents: z.array(staticDecisionComponentSchema).max(12).default([]),
  stateRisks: z.array(z.string().min(1).max(320)).max(12).default([]),
  coherenceRisks: z.array(z.string().min(1).max(320)).max(12).default([]),
  antiPatternsToAvoid: z.array(z.string().min(1).max(320)).max(12).default([]),
  screenshotGrounding: z.object({
    applied: z.boolean(),
    visibleSummary: z.string().min(1).max(600).optional().nullable(),
    complaintAlignment: z.string().min(1).max(700).optional().nullable(),
    visibleIssues: z.array(z.string().min(1).max(260)).max(8).default([]),
    nextQuestion: z.string().min(1).max(260).optional().nullable(),
  }).nullable().optional(),
});

const orchestrationShellRecommendationSchema = z.object({
  id: z.string().min(1).max(160),
  label: z.string().min(1).max(200),
  why: z.string().min(1).max(600),
  preserve: z.array(z.string().min(1).max(220)).max(8).default([]),
  avoid: z.array(z.string().min(1).max(220)).max(8).default([]),
});

const orchestrationComponentMatchSchema = z.object({
  slug: z.string().min(1).max(160),
  score: z.number(),
  fitReason: z.string().min(1).max(700),
  usageRole: z.string().min(1).max(240),
  deliveryMode: orchestrationDeliveryModeSchema,
  implementationPosture: orchestrationImplementationPostureSchema,
  preserve: z.array(z.string().min(1).max(220)).max(8).default([]),
  safeToAdapt: z.array(z.string().min(1).max(220)).max(8).default([]),
});

export const orchestrationMergeResultSchema = z.object({
  surfaceType: z.string().min(1).max(160),
  dominantTaskSurface: z.string().min(1).max(160),
  designProfile: z.string().min(1).max(160).nullable().optional(),
  confidence: z.number().min(0).max(1),
  confidenceMode: orchestrationConfidenceModeSchema,
  missingTruth: z.array(z.string().min(1).max(160)).max(12).default([]),
  shellRecommendation: orchestrationShellRecommendationSchema.nullable(),
  componentMatches: z.array(orchestrationComponentMatchSchema).max(8).default([]),
  stateRisks: z.array(z.string().min(1).max(320)).max(12).default([]),
  coherenceRisks: z.array(z.string().min(1).max(320)).max(12).default([]),
  implementationPosture: orchestrationImplementationPostureSchema,
  buildGuidance: z.array(z.string().min(1).max(320)).max(8).default([]),
  reasoningNotes: z.array(z.string().min(1).max(320)).max(8).default([]),
});

export const uiAnalysisRequestSchema = z.object({
  prompt: z.string().min(8).max(250_000),
  images: z.array(aiImageSchema).max(4).default([]),
  staticDecisionPacket: staticDecisionPacketSchema.optional(),
});

export const screenshotGroundingResultSchema = z.object({
  visibleSummary: z.string().min(1).max(600),
  likelySurface: z.string().min(1).max(160),
  userType: z.string().min(1).max(160).nullable().optional(),
  primaryTask: z.string().min(1).max(200).nullable().optional(),
  toneRead: z.string().min(1).max(200).nullable().optional(),
  complaintAlignment: z.string().min(1).max(700),
  visibleIssues: z.array(z.string().min(1).max(260)).max(6),
  nextQuestion: z.string().min(1).max(260).nullable().optional(),
});

interface AiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

function getAiConfig(): AiConfig {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Add it to your .env file to enable AI analysis.");
  }

  return {
    apiKey,
    baseUrl: (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, ""),
    model: process.env.OPENAI_MODEL || "gpt-4.1",
    maxTokens: Number.parseInt(process.env.OPENAI_MAX_TOKENS || "2400", 10),
    temperature: Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.2"),
  };
}

export function getAiStatus() {
  return {
    configured: Boolean(process.env.OPENAI_API_KEY),
    provider: "openai-compatible",
    model: process.env.OPENAI_MODEL || "gpt-4.1",
  };
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .flatMap((item) => {
      if (typeof item === "string") {
        return [item];
      }

      if (item && typeof item === "object") {
        const candidate = item as { type?: string; text?: string };
        if (candidate.type === "text" && typeof candidate.text === "string") {
          return [candidate.text];
        }
      }

      return [] as string[];
    })
    .join("\n\n")
    .trim();
}

function extractJsonObject(text: string) {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");

    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }

    throw new Error("The AI provider did not return valid JSON.");
  }
}

function deriveImplementationPosture(mode: z.infer<typeof orchestrationConfidenceModeSchema>, dominantTaskSurface: string) {
  if (mode === "ask_for_truth") {
    return "scaffold_honestly_first" as const;
  }

  if (dominantTaskSurface === "table" || dominantTaskSurface === "queue" || dominantTaskSurface === "timeline") {
    return "use_as_row_grammar" as const;
  }

  if (dominantTaskSurface === "two_panel_review") {
    return "use_as_shell_anchor" as const;
  }

  return "adapt_from_reference" as const;
}

function buildStaticFallback(packet: z.infer<typeof staticDecisionPacketSchema>): z.infer<typeof orchestrationMergeResultSchema> {
  const confidenceMode = packet.classification.confidenceMode;
  const dominantTaskSurface = packet.classification.dominantTaskSurface;
  const implementationPosture = deriveImplementationPosture(confidenceMode, dominantTaskSurface);
  const shellRecommendation = packet.classification.shellRecommendation
    ? {
        id: packet.classification.shellRecommendation,
        label: packet.classification.shellRecommendation.replace(/_/g, " "),
        why: `Static EXHIBIT routing selected ${packet.classification.shellRecommendation.replace(/_/g, " ")} as the safest shell direction for ${dominantTaskSurface.replace(/_/g, " ")}.`,
        preserve: [
          dominantTaskSurface === "table" || dominantTaskSurface === "queue" ? "dominant work-surface hierarchy" : "shell structure",
          "density posture",
          "state behavior",
        ],
        avoid: confidenceMode === "ask_for_truth"
          ? ["invented metrics", "invented statuses", "invented workflow controls"]
          : ["duplicate controls", "decorative chrome", "summary-first drift"],
      }
    : null;

  return {
    surfaceType: packet.classification.surfaceType,
    dominantTaskSurface,
    designProfile: packet.classification.designProfile || null,
    confidence: packet.classification.confidence,
    confidenceMode,
    missingTruth: packet.missingTruth,
    shellRecommendation,
    componentMatches: packet.rankedComponents.slice(0, 5).map((component) => ({
      slug: component.slug,
      score: component.score,
      fitReason: component.fitReason,
      usageRole: component.usageRole,
      deliveryMode: component.deliveryMode,
      implementationPosture: component.deliveryMode === "reference_plus_source"
        ? "use_as_shell_anchor"
        : implementationPosture,
      preserve: component.deliveryMode === "reference_plus_source"
        ? ["shell structure", "density", "state behavior"]
        : ["dominance hierarchy", "spacing rhythm", "state behavior"],
      safeToAdapt: [
        "local color tokens",
        "radius within profile bounds",
        "label wording",
        "minor spacing adjustments for content fit",
      ],
    })),
    stateRisks: packet.stateRisks,
    coherenceRisks: packet.coherenceRisks,
    implementationPosture,
    buildGuidance: [
      `Use ${dominantTaskSurface.replace(/_/g, " ")} as the center of gravity and keep secondary summaries subordinate.`,
      confidenceMode === "ask_for_truth"
        ? "Scaffold honestly first and stop before inventing missing product logic."
        : "Follow the shell direction before styling local modules.",
      packet.missingTruth[0] ? `Resolve ${packet.missingTruth[0].toLowerCase()} before committing detailed controls.` : "Keep controls aligned to the routed work surface.",
    ],
    reasoningNotes: [
      "Fell back to the static EXHIBIT decision packet because AI merge output was unavailable or malformed.",
    ],
  };
}

function formatOrchestrationAnalysis(result: z.infer<typeof orchestrationMergeResultSchema>) {
  const componentLines = result.componentMatches.slice(0, 3).map((component, index) => {
    return `${index + 1}. ${component.slug} — ${component.fitReason}`;
  });

  return [
    `Surface type: ${result.surfaceType}`,
    `Dominant task surface: ${result.dominantTaskSurface}`,
    `Design profile: ${result.designProfile || "unspecified"}`,
    `Confidence: ${result.confidence.toFixed(2)} (${result.confidenceMode})`,
    result.shellRecommendation ? `Shell direction: ${result.shellRecommendation.id}` : null,
    `Implementation posture: ${result.implementationPosture}`,
    result.missingTruth.length > 0 ? `Missing truth: ${result.missingTruth.join(", ")}` : null,
    result.stateRisks[0] ? `State risk: ${result.stateRisks[0]}` : null,
    result.coherenceRisks[0] ? `Coherence risk: ${result.coherenceRisks[0]}` : null,
    componentLines.length > 0 ? `Component matches:\n${componentLines.join("\n")}` : null,
    result.buildGuidance.length > 0 ? `Build guidance: ${result.buildGuidance.join(" ")}` : null,
  ].filter(Boolean).join("\n\n");
}

function buildOrchestrationPrompt(payload: z.infer<typeof uiAnalysisRequestSchema>) {
  return [
    "Caller task context:",
    payload.prompt,
    "",
    "Static EXHIBIT decision packet:",
    JSON.stringify(payload.staticDecisionPacket, null, 2),
    "",
    "Merge the static packet with the caller context and any attached screenshots.",
    "Trust the static EXHIBIT classification unless there is strong evidence against it.",
    "Do not invent product logic when missingTruth is non-empty.",
    "If confidenceMode is ask_for_truth, keep the output structurally honest and cautious.",
    "Return strict JSON only.",
  ].join("\n");
}

export async function runUiAnalysis(payload: z.infer<typeof uiAnalysisRequestSchema>) {
  const config = getAiConfig();

  if (payload.staticDecisionPacket) {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.1,
        max_tokens: Math.min(config.maxTokens, 2200),
        messages: [
          {
            role: "system",
            content: [
              "You are EXHIBIT's orchestration merge layer for coding agents.",
              "Your job is to merge the static EXHIBIT decision packet with the caller context and screenshot evidence.",
              "Do not re-freehand the UI. Treat the static packet as the design anchor unless there is strong evidence against it.",
              "Respect confidenceMode. If it is ask_for_truth, do not invent product logic, workflow stages, controls, or metrics.",
              "Prefer the dominant task surface over summary chrome.",
              "Use restrained operational grammar where appropriate: compact density, flat elevation, border-first grouping, icons as cues not decoration, no card mosaics on operational surfaces.",
              "Interaction completeness: every interactive control must account for all states — idle, in-flight, success, error, empty. No half-baked states. Feedback must close the loop the user opened.",
              "Mobile responsiveness: layouts must reflow intelligently at narrow widths — not just shrink. Touch targets are 44px minimum on mobile, compact on desktop. Stacking order must preserve priority hierarchy.",
              "Haptic vocabulary must match action weight: light tap for reveals, medium for confirmations, escalating pattern for completions, double-pulse for errors. Calibrated, not decorative.",
              "Sensitive values (tokens, keys, credentials) must auto-mask on idle. Reveal with a timer. Copy must confirm inline. Destructive actions confirm inline without a modal.",
              "Return strict JSON only with these fields: surfaceType, dominantTaskSurface, designProfile, confidence, confidenceMode, missingTruth, shellRecommendation, componentMatches, stateRisks, coherenceRisks, implementationPosture, buildGuidance, reasoningNotes.",
              "componentMatches should stay close to the static ranked components. Only adjust if the prompt or screenshot evidence clearly changes the fit.",
              "reasoningNotes should be short and operational.",
            ].join(" "),
          },
          {
            role: "user",
            content: [
              { type: "text", text: buildOrchestrationPrompt(payload) },
              ...payload.images.map((image) => ({
                type: "image_url",
                image_url: {
                  url: image.dataUrl,
                  detail: "high",
                },
              })),
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "The AI provider request failed.");
    }

    const data = await response.json() as {
      choices?: Array<{
        message?: {
          content?: unknown;
        };
      }>;
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };

    const raw = extractTextContent(data.choices?.[0]?.message?.content);
    const fallback = buildStaticFallback(payload.staticDecisionPacket);

    if (!raw) {
      return {
        analysis: formatOrchestrationAnalysis(fallback),
        orchestration: fallback,
        model: config.model,
        usage: data.usage,
        mergeSource: "static-fallback",
      };
    }

    const parsed = orchestrationMergeResultSchema.safeParse(extractJsonObject(raw));
    if (!parsed.success) {
      return {
        analysis: formatOrchestrationAnalysis(fallback),
        orchestration: fallback,
        model: config.model,
        usage: data.usage,
        mergeSource: "static-fallback",
      };
    }

    return {
      analysis: formatOrchestrationAnalysis(parsed.data),
      orchestration: parsed.data,
      model: config.model,
      usage: data.usage,
      mergeSource: "ai-merged",
    };
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      messages: [
        {
          role: "system",
          content: [
            "You are EXHIBIT's design-intelligence pre-handler.",
            "You are not the coding agent building the UI directly.",
            "You are the judgment layer called before or during UI generation so the requesting agent can make better decisions.",
            "",
            "Your job is to improve the quality of the downstream agent's work by:",
            "- classifying the surface correctly",
            "- identifying the dominant task surface",
            "- detecting likely UI failure patterns early",
            "- probing for missing truth when context is incomplete",
            "- preventing clutter, invented structure, weak shells, and poor state behavior",
            "- steering the requesting agent toward stronger EXHIBIT-aligned decisions before code hardens",
            "",
            "EXHIBIT rules you must enforce:",
            "- Restrained over expressive",
            "- Operational surfaces use compact density, flat elevation, border-first grouping",
            "- No gradients, no heavy shadows, no decorative chrome",
            "- Inter for body and labels",
            "- Space Grotesk only for display and section anchors",
            "- JetBrains Mono for scan-heavy data (IDs, timestamps, money, counts)",
            "- Icons are cues, not decoration — Lucide only, 14-16px, restrained",
            "- No oversized icons, no icon clutter, no icon-first buttons",
            "- No card-in-card, no card mosaics on operational surfaces",
            "- Table, queue, lane, or two-panel structure should dominate when that is the real job",
            "- No invented structure when truth is missing",
            "- Style families are two-pole: editorial-serif (warm, print-derived, serif display, humanist sans, warm neutrals, generous spacing, typographic hierarchy) and precision-minimal (geometric, cold neutrals, tight tracking, no decoration, instant interactions, zero personality). Both are valid. Never conflate them.",
            "- When a user says something feels generic, corporate, bland, or too SaaS-like, ask the magazine-or-tool probe question before choosing a foundation: 'Does this need to feel more like a well-produced publication or more like a working tool?'",
            "- Editorial-serif signals: warm, human, editorial, print, magazine, narrative, inviting, serif, Substack, Stripe (old brand), not generic. Route to DM Serif Display or Instrument Serif display type, Plus Jakarta Sans or wide-tracked Inter body, warm-white backgrounds, generous spacing.",
            "- Precision-minimal signals: sharp, sleek, tool, fast, crisp, tight, zero decoration, Vercel, Linear, Figma, Raycast, serious. Route to Geist or tight-tracked Inter, cold grays (#09090b scale), 1px rule separators, near-instant transitions, no shadows.",
            "- Every interactive control must handle all states: idle, in-flight, success, error, empty — no partial implementations",
            "- Touch targets 44px minimum on mobile, compact (28–32px) on desktop — controlled by responsive breakpoints, not separate components",
            "- Haptic feedback vocabulary is calibrated to action weight: subtle tap (20ms) for reveals, short burst (40ms) for copy confirmations, double-pulse ([80,60,80]) for errors, escalating pattern ([30,50,100]) for destructive completions",
            "- Sensitive values auto-mask on idle; reveal requires explicit action with a 15s auto-revert timer; copy confirms inline with transient visual feedback",
            "- Destructive actions confirm inline in-place — no modals; cancel and confirm share the same row with proportional sizing",
            "- Mobile layouts reflow intelligently: action rows stack vertically, key/value content gets full width, rotate-confirm rows stack warning above buttons",
            "",
            "Failure categories you must catch:",
            "1. Surface misclassification — dashboard cards where a queue should dominate; card mosaics where a lane or table should dominate; product-shell patterns on operational surfaces",
            "2. Wrong shell — guide toward queue-first, two-panel, Kanban/lane, or focused operational workspaces when they fit the work",
            "3. Coherence drift — inconsistent headers, repeated scope labels, awkward control grouping, typography drift, spacing drift, too many visible containers",
            "4. State quality — evaluate loading, empty, stale, partial, and populated states; flag layouts that break when data is absent; flag sibling card symmetry loss",
            "5. Invented structure — if core truth is missing, scaffold honestly and minimally; do not fake product logic",
            "6. Signal-to-noise failure — extra helper text, repeated labels, permanent footer text with no value, controls not earning their place",
            "",
            "When uncertain, reduce. Do not add more UI. Prefer compression, merging, demotion, clearer hierarchy, honest scaffolding.",
            "",
            "Return structured guidance with:",
            "1. Surface classification",
            "2. Dominant task surface",
            "3. Recommended EXHIBIT profile",
            "4. Likely failure risks",
            "5. Missing truth to probe for",
            "6. Shell recommendation",
            "7. Component recommendation",
            "8. State-quality warnings",
            "9. Coherence warnings",
            "10. Tight build guidance for the downstream agent",
            "",
            "Tone: corrective not accusatory, sharp not theatrical, operational not fluffy, proactive not reactive.",
            "Separate visible evidence from inferred issues clearly.",
          ].join("\n"),
        },
        {
          role: "user",
          content: [
            { type: "text", text: payload.prompt },
            ...payload.images.map((image) => ({
              type: "image_url",
              image_url: {
                url: image.dataUrl,
                detail: "high",
              },
            })),
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "The AI provider request failed.");
  }

  const data = await response.json() as {
    choices?: Array<{
      message?: {
        content?: unknown;
      };
    }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  const analysis = extractTextContent(data.choices?.[0]?.message?.content);

  if (!analysis) {
    throw new Error("The AI provider returned an empty response.");
  }

  return {
    analysis,
    model: config.model,
    usage: data.usage,
  };
}

export async function runAgentScreenshotGrounding(payload: z.infer<typeof uiAnalysisRequestSchema>) {
  const config = getAiConfig();

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.1,
      max_tokens: Math.min(config.maxTokens, 1800),
      messages: [
        {
          role: "system",
          content: [
            "You are EXHIBIT's design-intelligence pre-handler grounding screenshots against UI complaints.",
            "Return strict JSON only. Do not invent hidden product facts. Use only visible evidence plus the complaint text.",
            "Apply EXHIBIT rules when identifying issues: no card mosaics on operational surfaces, no oversized icons, no decorative chrome, compact density for operational work, border-first grouping, correct shell archetype for the actual job.",
            "Interaction completeness rules: flag any control missing idle/loading/success/error/empty states. Flag copy that has no confirmation. Flag reveal with no auto-mask. Flag destructive actions with no inline confirm. Flag touch targets below 44px on mobile surfaces.",
            "Mobile rules: flag layouts that overflow or collapse poorly on narrow screens. Flag action rows that cannot fit on a single line at 375px without stacking. Flag font sizes below 11px on mobile. Flag hover-only states with no active/touch equivalent.",
            "Catch: surface misclassification, wrong shell archetype, coherence drift, state quality failures, invented structure, signal-to-noise collapse, incomplete interaction states, mobile layout failures, missing feedback loops.",
            "Fields required: visibleSummary, likelySurface, userType, primaryTask, toneRead, complaintAlignment, visibleIssues, nextQuestion.",
            "visibleSummary: what is literally on screen. likelySurface: classify the surface type against EXHIBIT archetypes. visibleIssues: short concrete EXHIBIT-rule violations or UI failure statements only — no invented problems.",
          ].join(" "),
        },
        {
          role: "user",
          content: [
            { type: "text", text: payload.prompt },
            ...payload.images.map((image) => ({
              type: "image_url",
              image_url: {
                url: image.dataUrl,
                detail: "high",
              },
            })),
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "The AI provider request failed.");
  }

  const data = await response.json() as {
    choices?: Array<{
      message?: {
        content?: unknown;
      };
    }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  const raw = extractTextContent(data.choices?.[0]?.message?.content);
  if (!raw) {
    throw new Error("The AI provider returned an empty screenshot-grounding response.");
  }

  const parsed = screenshotGroundingResultSchema.safeParse(extractJsonObject(raw));
  if (!parsed.success) {
    throw new Error("The AI provider returned malformed screenshot-grounding data.");
  }

  return {
    ...parsed.data,
    model: config.model,
    usage: data.usage,
  };
}