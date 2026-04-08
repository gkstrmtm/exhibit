import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  applyScreenshotGroundingToRequest,
  buildAgentScreenshotGroundingPrompt,
  buildStaticDecisionPacket,
  hydrateComponentMatchSources,
  mergeAiReasoningIntoResponse,
} from "./agent-resolution-postprocessing.js";
import { aiImageSchema, runAgentScreenshotGrounding, runUiAnalysis } from "./ai.js";

type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  style?: string;
  sourceUrl?: string;
  code: string;
};

type CategoryDescriptor = {
  priority: "critical" | "high" | "medium";
  whyRelevant: string;
  density: string[];
  bestFor: string[];
  avoidFor: string[];
  baseScore: number;
  actionHierarchyRole: string;
  dataDensityRole: string;
};

type AgentIntentName =
  | "transaction-review"
  | "reconciliation"
  | "approvals"
  | "exports"
  | "queue-ops"
  | "admin-dashboard"
  | "audit-log"
  | "case-management";

type AgentIntentProfile = {
  label: string;
  description: string;
  matchers: RegExp[];
  categoryBoosts: Partial<Record<string, number>>;
  slugBoosts: Record<string, number>;
  patternBoosts: string[];
  structuralBias: string[];
};

type AgentQuestionSupportLevel = "high" | "medium" | "low" | "unsupported";

type DesignProfile = {
  id: string;
  label: string;
  summary: string;
  layoutMood: string;
  spacing: {
    density: "compact" | "default" | "comfortable";
    baseGrid: string;
    sectionGap: string;
    cardPadding: string;
    controlGap: string;
    rules: string[];
  };
  typography: {
    display: string;
    body: string;
    mono: string;
    rules: string[];
  };
  iconSystem: {
    primaryLibrary: string;
    rationale: string;
    defaultSize: string;
    strokeStyle: string;
    usageRules: string[];
    alternatives: string[];
    externalLibraryHandling: string[];
  };
  colorAndElevation: {
    posture: string;
    elevation: string;
    rules: string[];
  };
  motion: {
    posture: string;
    rules: string[];
  };
  grouping: {
    primarySurface: string;
    supportingSurfaces: string[];
    avoid: string[];
  };
};

type AgentQuestionSector = {
  id: string;
  label: string;
  matchers: RegExp[];
  route: string;
  designProfileId?: string;
  priorityCategories: string[];
  componentHints: string[];
  patternHints: string[];
  notes: string[];
  avoid: string[];
};

type AgentQuestionArchetype = {
  id: string;
  label: string;
  supportLevel: AgentQuestionSupportLevel;
  matchers: RegExp[];
  summary: string;
  sectors: AgentQuestionSector[];
};

type AgentQuestionClassification = {
  archetype: AgentQuestionArchetype;
  archetypeScore: number;
  sector: AgentQuestionSector | null;
  sectorScore: number;
  confidence: number;
};

export const agentQuestionRequestSchema = z.object({
  question: z.string().min(4).max(1200).optional(),
  prompt: z.string().min(4).max(1200).optional(),
  platform: z.enum(["web", "desktop-web", "mobile-web", "electron", "unknown"]).optional(),
  goal: z.string().min(4).max(240).optional(),
  routeHint: z.string().min(2).max(120).optional(),
  context: z.string().min(4).max(4000).optional(),
  agentContextSummary: z.string().min(4).max(3200).optional(),
}).refine(
  (value) => Boolean(value.question || value.prompt),
  { message: "Provide question or prompt." }
);

export type AgentQuestionRequest = z.infer<typeof agentQuestionRequestSchema>;

const agentResolutionStageSchema = z.enum(["workflow-audit-and-iteration", "elevation-audit", "funnel-strategy"]);

const agentResolutionContextSchema = z.object({
  summary: z.string().min(4).max(3200).optional(),
  problemStatement: z.string().min(4).max(4000).optional(),
  routingIntent: z.string().min(2).max(240).optional(),
  handoff: z.string().min(4).max(4000).optional(),
  originalPrompt: z.string().min(4).max(4000).optional(),
  userComplaint: z.string().min(4).max(2400).optional(),
  transcript: z.string().min(4).max(6000).optional(),
  capturedAt: z.string().min(2).max(160).optional(),
  primaryObject: z.string().min(2).max(160).optional(),
  agentNotes: z.array(z.string().min(2).max(300)).max(20).default([]),
  userRoles: z.array(z.string().min(2).max(120)).max(16).default([]),
  dataSources: z.array(z.string().min(2).max(220)).max(20).default([]),
  mutations: z.array(z.string().min(2).max(220)).max(20).default([]),
  timelineMoments: z.array(z.string().min(2).max(160)).max(20).default([]),
  knownProblems: z.array(z.string().min(2).max(200)).max(16).default([]),
  observedAsyncProblems: z.array(z.string().min(2).max(220)).max(20).default([]),
  existingSurfaceSignals: z.array(z.string().min(2).max(160)).max(20).default([]),
  visibleModes: z.array(z.string().min(1).max(80)).max(16).default([]),
  competingControls: z.array(z.string().min(2).max(160)).max(16).default([]),
  transitionsNeedingCoverage: z.array(z.string().min(2).max(160)).max(16).default([]),
  desiredResources: z.array(z.string().min(2).max(120)).max(16).default([]),
}).passthrough().optional();

const businessProfileSchema = z.object({
  businessType: z.string().min(2).max(120).optional(),
  industry: z.string().min(2).max(120).optional(),
  targetAudience: z.string().min(2).max(200).optional(),
  productCategory: z.enum(["service", "saas", "physical", "course", "community", "other"]).optional(),
  existingPipelineStages: z.array(z.string().min(2).max(120)).max(16).default([]),
});

const funnelContextSchema = z.object({
  productType: z.string().min(2).max(120).optional(),
  audienceWarmth: z.enum(["cold", "warm", "hot"]).optional(),
  pricePoint: z.enum(["free", "low", "medium", "high", "enterprise"]).optional(),
  commitmentRequired: z.enum(["none", "email", "trial", "purchase", "application"]).optional(),
  conversionGoal: z.string().min(4).max(200).optional(),
  businessProfile: businessProfileSchema.optional(),
}).optional();

export const agentResolutionRequestSchema = z.object({
  stage: agentResolutionStageSchema.optional(),
  question: z.string().min(4).max(1200).optional(),
  prompt: z.string().min(4).max(1200).optional(),
  surfaceType: z.string().min(2).max(120).optional(),
  sector: z.string().min(2).max(120).optional(),
  route: z.string().min(2).max(120).optional(),
  goal: z.string().min(8).max(240).optional(),
  screenshots: z.array(aiImageSchema).max(3).optional(),
  constraints: z.object({
    density: z.enum(["compact", "default", "comfortable"]).optional(),
    visualPosture: z.string().min(3).max(200).optional(),
    avoid: z.array(z.string().min(2).max(120)).max(16).optional(),
  }).optional(),
  layoutNeeds: z.array(z.string().min(2).max(120)).max(24).default([]),
  workspaceModules: z.array(z.string().min(2).max(120)).max(16).default([]),
  output: z.object({
    rankedComponents: z.boolean().optional(),
    alternativesPerCategory: z.number().int().min(1).max(4).optional(),
    includeAnatomy: z.boolean().optional(),
    includeStateCoverage: z.boolean().optional(),
    includeTransitionGuidance: z.boolean().optional(),
    includeCompositionGuidance: z.boolean().optional(),
    includeTokenPosture: z.boolean().optional(),
    includeAiReasoning: z.boolean().optional(),
    includeElevationIntelligence: z.boolean().optional(),
    includeComponentSource: z.boolean().optional(),
    maxSourceMatches: z.number().int().min(1).max(5).optional(),
  }).optional(),
  context: agentResolutionContextSchema,
  funnelContext: funnelContextSchema,
  platform: z.enum(["web", "desktop-web", "mobile-web", "electron", "unknown"]).optional(),
}).refine(
  (value) => Boolean(value.question || value.prompt || value.surfaceType || value.sector || value.route || value.goal || value.stage),
  { message: "Provide at least one of question, prompt, surfaceType, sector, route, goal, or stage." }
);

export type AgentResolutionRequest = z.infer<typeof agentResolutionRequestSchema>;

export const agentBundleRequestSchema = z.object({
  scenario: z.string().min(8).max(5000),
  interfaceType: z.string().min(2).max(120).optional(),
  taskType: z.enum(["redesign", "audit", "migrate", "new-build"]).optional(),
  desiredOutcome: z.string().min(8).max(240).optional(),
  platform: z.enum(["web", "desktop-web", "mobile-web", "electron", "unknown"]).optional(),
  densityPreference: z.enum(["compact", "default", "comfortable"]).optional(),
  priorities: z.array(z.string().min(2).max(80)).max(12).optional(),
  constraints: z.array(z.string().min(2).max(160)).max(12).optional(),
  currentProblems: z.array(z.string().min(2).max(200)).max(12).optional(),
  existingSurfaceSignals: z.array(z.string().min(2).max(160)).max(20).optional(),
});

export type AgentBundleRequest = z.infer<typeof agentBundleRequestSchema>;

const repoRoot = process.cwd();
const generatedBundlePath = path.join(repoRoot, "generated", "operational-workbench.json");
const designFoundationsPath = path.join(repoRoot, "design-foundations.json");
const componentsPath = path.join(repoRoot, "components.json");
const canonicalDashboardPath = path.join(repoRoot, "components", "full-reference-dashboard.tsx");
const densityGuidePath = path.join(repoRoot, "components", "density-and-layout-guide.tsx");
const tokenReferencePath = path.join(repoRoot, "components", "design-token-reference.tsx");

const includedCategories = [
  "App Shells",
  "Layout",
  "Navigation",
  "Tables",
  "Data Density",
  "Data Display",
  "Inputs",
  "Feedback",
  "Empty States",
  "Loading",
  "Buttons",
  "Dashboard",
];

const defaultStates = [
  { name: "default", usage: "Baseline rest state with semantic labels and clear separation." },
  { name: "hover", usage: "Reveal affordance without changing hierarchy or overwhelming dense surfaces." },
  { name: "focus", usage: "Use visible keyboard focus rings and border emphasis for every interactive surface." },
  { name: "loading", usage: "Reserve layout space, keep labels visible, and communicate in-progress state." },
  { name: "disabled", usage: "Reduce emphasis without collapsing contrast or discoverability." },
  { name: "selected", usage: "Persist row or filter selection with background, border, and count feedback." },
  { name: "active", usage: "Mark the current tab, queue, nav item, or pressed state with strong contrast." },
  { name: "destructive", usage: "Escalate irreversible actions with explicit warning color and confirmation path." },
  { name: "warning", usage: "Signal review-required or risky states without implying failure." },
  { name: "success", usage: "Confirm valid, exported, or approved states with restrained positive treatment." },
];

const categoryDescriptors: Record<string, CategoryDescriptor> = {
  "App Shells": {
    priority: "critical",
    whyRelevant: "Operational redesigns fail first at shell structure. These define the left-nav, header, content, and right-rail relationships needed for queues, approval workbenches, and reconciliation tools.",
    density: ["compact", "default"],
    bestFor: ["multi-region workbenches", "approval queues", "reconciliation tools", "ops dashboards"],
    avoidFor: ["single-focus landing pages", "decorative marketing moments"],
    baseScore: 92,
    actionHierarchyRole: "structural-shell",
    dataDensityRole: "high-density-frame",
  },
  Layout: {
    priority: "critical",
    whyRelevant: "Layout patterns determine how dense modules stack, align, and collapse without losing orientation or scan speed.",
    density: ["compact", "default"],
    bestFor: ["split panes", "content framing", "tool sidebars", "detail rails"],
    avoidFor: ["hero-led marketing layouts"],
    baseScore: 86,
    actionHierarchyRole: "page-frame",
    dataDensityRole: "supporting-structure",
  },
  Navigation: {
    priority: "critical",
    whyRelevant: "Dense tools need strong wayfinding between queues, statuses, and task scopes. Good navigation preserves context while actions stay local.",
    density: ["compact", "default"],
    bestFor: ["section switching", "workspace navigation", "mode changes", "queue grouping"],
    avoidFor: ["purely decorative tab sets"],
    baseScore: 88,
    actionHierarchyRole: "wayfinding",
    dataDensityRole: "navigational-density",
  },
  Tables: {
    priority: "critical",
    whyRelevant: "Most operational interfaces revolve around dense tabular review, so tables and row systems are the primary decision surface.",
    density: ["compact", "default"],
    bestFor: ["transaction review", "reconciliation", "audit logs", "export review"],
    avoidFor: ["storytelling dashboards", "hero messaging"],
    baseScore: 96,
    actionHierarchyRole: "primary-data-plane",
    dataDensityRole: "high-density-grid",
  },
  "Data Density": {
    priority: "critical",
    whyRelevant: "These patterns solve the actual compression problem: filters, logs, activity streams, export tooling, and tabular KPI groupings.",
    density: ["compact", "default"],
    bestFor: ["compact filters", "log streams", "operational summaries", "export tooling"],
    avoidFor: ["broad marketing storytelling"],
    baseScore: 94,
    actionHierarchyRole: "dense-supporting-controls",
    dataDensityRole: "compact-utility-layer",
  },
  "Data Display": {
    priority: "high",
    whyRelevant: "These components help summarize state around the table: metric bands, timelines, avatar stacks, progress lists, and lightweight comparative views.",
    density: ["compact", "default", "comfortable"],
    bestFor: ["summary bands", "secondary metrics", "supporting trends", "activity context"],
    avoidFor: ["primary decision queues when tables are required"],
    baseScore: 82,
    actionHierarchyRole: "summary-context",
    dataDensityRole: "secondary-signal-band",
  },
  Inputs: {
    priority: "critical",
    whyRelevant: "Operational tools depend on search, filtering, segmented controls, and date ranges that stay compact under pressure.",
    density: ["compact", "default"],
    bestFor: ["search", "filter bars", "bulk edits", "date scopes", "command entry"],
    avoidFor: ["overly decorative form treatments"],
    baseScore: 90,
    actionHierarchyRole: "query-and-filter-control",
    dataDensityRole: "input-density-control",
  },
  Feedback: {
    priority: "high",
    whyRelevant: "Approvals, exports, and reconciliation flows need immediate validation, toast, gating, and retry feedback without breaking task flow.",
    density: ["compact", "default"],
    bestFor: ["validation", "global alerts", "retry states", "permission messaging"],
    avoidFor: ["ornamental status treatments"],
    baseScore: 78,
    actionHierarchyRole: "state-and-risk-feedback",
    dataDensityRole: "status-communication",
  },
  "Empty States": {
    priority: "medium",
    whyRelevant: "Operational products still need clear empty states for empty queues, cleared filters, and first-run onboarding without blowing up density.",
    density: ["default", "comfortable"],
    bestFor: ["zero-result guidance", "first-run instructions", "empty queues"],
    avoidFor: ["dense populated review views"],
    baseScore: 70,
    actionHierarchyRole: "recovery-and-guidance",
    dataDensityRole: "zero-state",
  },
  Loading: {
    priority: "high",
    whyRelevant: "Dense admin tools need loading placeholders that preserve structure for tables, panels, and toolbars instead of collapsing the page.",
    density: ["compact", "default"],
    bestFor: ["table hydration", "panel loading", "export preparation", "route transitions"],
    avoidFor: ["long-lived ambiguous wait states"],
    baseScore: 76,
    actionHierarchyRole: "async-feedback",
    dataDensityRole: "skeleton-preservation",
  },
  Buttons: {
    priority: "high",
    whyRelevant: "Action hierarchy is where dense tools degrade fast. These patterns decide which action is primary, which stays tertiary, and which should be destructive-only.",
    density: ["compact", "default", "comfortable"],
    bestFor: ["toolbar actions", "row actions", "confirmations", "bulk operations"],
    avoidFor: ["using decorative marketing CTA styles in admin tools"],
    baseScore: 80,
    actionHierarchyRole: "action-hierarchy-reference",
    dataDensityRole: "action-density-layer",
  },
  Dashboard: {
    priority: "high",
    whyRelevant: "Dashboard patterns anchor header bands, KPI strips, quick action zones, and trend panels that surround operational queues.",
    density: ["default", "comfortable"],
    bestFor: ["summary headers", "KPI bands", "overview metrics", "review counts"],
    avoidFor: ["primary detailed grid editing"],
    baseScore: 84,
    actionHierarchyRole: "summary-and-orchestration",
    dataDensityRole: "overview-signal-layer",
  },
};

const categoryPriorityOrder = [
  "App Shells",
  "Tables",
  "Data Density",
  "Inputs",
  "Navigation",
  "Layout",
  "Dashboard",
  "Data Display",
  "Buttons",
  "Feedback",
  "Loading",
  "Empty States",
];

const intentProfiles: Record<AgentIntentName, AgentIntentProfile> = {
  "transaction-review": {
    label: "Transaction Review",
    description: "Optimize for row-level inspection, risk comparison, and approve/reject workflows.",
    matchers: [/transaction/i, /payment/i, /ledger/i, /settlement/i, /charge/i, /review/i],
    categoryBoosts: { Tables: 12, "Data Density": 10, Inputs: 8, "App Shells": 7, Feedback: 4 },
    slugBoosts: {
      "modern-table": 14,
      "filter-bar-chips": 10,
      "ide-three-panel-shell": 10,
      "master-detail-shell": 8,
      "date-range-input": 7,
      "inline-validation-patterns": 5,
    },
    patternBoosts: ["denseOperationalWorkbench", "decisionFlowPattern"],
    structuralBias: ["left-nav", "sticky-toolbar", "primary-table", "right-inspector"],
  },
  reconciliation: {
    label: "Reconciliation",
    description: "Optimize for dense numeric comparison, exceptions, export preparation, and auditability.",
    matchers: [/reconciliation/i, /variance/i, /match(?:ing)?/i, /exceptions?/i, /payout/i, /balance/i],
    categoryBoosts: { Tables: 12, "Data Density": 11, Dashboard: 7, Inputs: 8, Layout: 5 },
    slugBoosts: {
      "modern-table": 14,
      "kpi-grid-tabular": 10,
      "export-pattern-ui": 12,
      "dense-activity-log": 8,
      "activity-log-timeline": 7,
      "date-range-input": 8,
    },
    patternBoosts: ["denseOperationalWorkbench", "exportPanelPattern"],
    structuralBias: ["numeric-summary-band", "grouped-table", "exception-rail", "export-panel"],
  },
  approvals: {
    label: "Approval Flow",
    description: "Optimize for queue progression, explicit decisions, note capture, and state transitions.",
    matchers: [/approval/i, /approve/i, /reject/i, /decision/i, /escalat/i, /request info/i],
    categoryBoosts: { "App Shells": 10, Tables: 8, Feedback: 7, Buttons: 8, Inputs: 6 },
    slugBoosts: {
      "master-detail-shell": 12,
      "ide-three-panel-shell": 10,
      "loading-state-buttons": 8,
      "destructive-danger-buttons": 7,
      "inline-validation-patterns": 8,
      "filter-bar-chips": 7,
    },
    patternBoosts: ["reviewQueuePattern", "decisionFlowPattern"],
    structuralBias: ["queue-list", "detail-rail", "decision-actions", "status-timeline"],
  },
  exports: {
    label: "Export Workflow",
    description: "Optimize for file generation, column/format choices, preview, and batch actions.",
    matchers: [/export/i, /csv/i, /statement/i, /download/i, /file/i, /extract/i],
    categoryBoosts: { "Data Density": 10, Inputs: 8, Tables: 8, Feedback: 6, Buttons: 5 },
    slugBoosts: {
      "export-pattern-ui": 16,
      "filter-bar-chips": 8,
      "loading-state-buttons": 7,
      "notification-toast-stack": 5,
      "date-range-input": 6,
    },
    patternBoosts: ["exportPanelPattern", "denseOperationalWorkbench"],
    structuralBias: ["scope-toolbar", "selection-bar", "export-config-rail", "preview-meta"],
  },
  "queue-ops": {
    label: "Operational Queue",
    description: "Optimize for backlogs, statuses, assignments, and fast scan/resolve loops.",
    matchers: [/queue/i, /backlog/i, /triage/i, /assign/i, /ops/i, /operations/i],
    categoryBoosts: { "App Shells": 10, Tables: 10, Navigation: 7, Inputs: 7, Dashboard: 5 },
    slugBoosts: {
      "ide-three-panel-shell": 12,
      "master-detail-shell": 10,
      "filter-bar-chips": 10,
      "dashboard-header-pattern": 7,
      "modern-table": 9,
    },
    patternBoosts: ["reviewQueuePattern", "denseOperationalWorkbench"],
    structuralBias: ["status-groups", "queue-toolbar", "selection-actions", "detail-pane"],
  },
  "admin-dashboard": {
    label: "Admin Dashboard",
    description: "Optimize for overview metrics, workbench entry points, and operational summaries around a central table.",
    matchers: [/dashboard/i, /admin/i, /overview/i, /metrics/i, /analytics/i],
    categoryBoosts: { Dashboard: 12, "App Shells": 8, Tables: 6, "Data Display": 6 },
    slugBoosts: {
      "analytics-dashboard-shell": 12,
      "dashboard-header-pattern": 10,
      "stat-cards-with-trends": 8,
      "kpi-grid-tabular": 7,
      "full-reference-dashboard": 8,
    },
    patternBoosts: ["denseOperationalWorkbench"],
    structuralBias: ["summary-header", "kpi-strip", "work-surface-below-summary"],
  },
  "audit-log": {
    label: "Audit and History",
    description: "Optimize for time-ordered traceability, event drill-down, and system explanation.",
    matchers: [/audit/i, /history/i, /event/i, /timeline/i, /log/i, /trace/i],
    categoryBoosts: { "Data Density": 11, "Data Display": 8, Tables: 7, Feedback: 4 },
    slugBoosts: {
      "dense-activity-log": 14,
      "activity-log-timeline": 12,
      "vertical-timeline": 6,
      "modern-table": 6,
    },
    patternBoosts: ["reviewQueuePattern"],
    structuralBias: ["timeline-rail", "event-table", "detail-diff-panel"],
  },
  "case-management": {
    label: "Case Management",
    description: "Optimize for ticket/case lists with deep right-rail context and resolution steps.",
    matchers: [/case/i, /ticket/i, /investigation/i, /claim/i, /dispute/i],
    categoryBoosts: { "App Shells": 11, Tables: 8, Inputs: 7, Feedback: 5 },
    slugBoosts: {
      "master-detail-shell": 13,
      "ide-three-panel-shell": 9,
      "filter-bar-chips": 8,
      "inline-validation-patterns": 5,
    },
    patternBoosts: ["reviewQueuePattern", "decisionFlowPattern"],
    structuralBias: ["case-list", "detail-rail", "decision-form", "activity-history"],
  },
};

const agentQuestionArchetypes: AgentQuestionArchetype[] = [
  {
    id: "internal-operations",
    label: "Internal Operations / Company System",
    supportLevel: "high",
    summary: "Internal dashboards, policy/admin systems, approval queues, finance ops, support queues, and review-heavy company tooling.",
    matchers: [/internal/i, /operations?/i, /company/i, /policy/i, /back.?office/i, /admin/i, /dashboard/i, /queue/i, /workflow/i, /review/i],
    sectors: [
      {
        id: "policy-admin",
        label: "Policy / Admin Operations",
        matchers: [/policy/i, /admin/i, /compliance/i, /governance/i, /internal policy/i],
        route: "operational-workbench",
        designProfileId: "operational-compact",
        priorityCategories: ["App Shells", "Tables", "Data Density", "Inputs", "Navigation", "Feedback"],
        componentHints: ["ide-three-panel-shell", "dashboard-header-pattern", "filter-bar-chips", "modern-table"],
        patternHints: ["denseOperationalWorkbench"],
        notes: ["Bias toward dense review patterns and explicit status/permission language.", "Avoid decorative card-first dashboard layouts."],
        avoid: ["marketing hero shells", "glow or campaign CTA treatments"],
      },
      {
        id: "approvals-review",
        label: "Approval / Review Workflow",
        matchers: [/approval/i, /approve/i, /reject/i, /review/i, /moderation/i, /escalat/i],
        route: "operational-workbench",
        designProfileId: "operational-compact",
        priorityCategories: ["App Shells", "Tables", "Data Density", "Feedback", "Buttons", "Inputs"],
        componentHints: ["master-detail-shell", "ide-three-panel-shell", "filter-bar-chips", "inline-validation-patterns", "modern-table"],
        patternHints: ["reviewQueuePattern", "decisionFlowPattern"],
        notes: ["Keep the queue and decision rail visible at the same time.", "Require a strict primary-secondary-destructive action hierarchy."],
        avoid: ["multi-CTA headers", "detouring routine review into full-page flows"],
      },
      {
        id: "finance-reconciliation",
        label: "Finance / Reconciliation",
        matchers: [/reconciliation/i, /ledger/i, /payment/i, /balance/i, /variance/i, /statement/i, /settlement/i],
        route: "operational-workbench",
        designProfileId: "finance-data-dense",
        priorityCategories: ["Tables", "Data Density", "Inputs", "App Shells", "Dashboard"],
        componentHints: ["modern-table", "export-pattern-ui", "kpi-grid-tabular", "date-range-input", "filter-bar-chips"],
        patternHints: ["denseOperationalWorkbench", "exportPanelPattern"],
        notes: ["Preserve numeric scanning speed and keep export/reporting close to the table.", "Favor compact summary bands over decorative analytics cards."],
        avoid: ["left-aligned numbers", "summary cards that overpower the table"],
      },
      {
        id: "case-management",
        label: "Case / Support Management",
        matchers: [/case/i, /ticket/i, /support/i, /claim/i, /dispute/i, /investigation/i],
        route: "operational-workbench",
        designProfileId: "operational-compact",
        priorityCategories: ["App Shells", "Tables", "Inputs", "Data Density", "Feedback"],
        componentHints: ["master-detail-shell", "ide-three-panel-shell", "filter-bar-chips", "activity-log-timeline"],
        patternHints: ["reviewQueuePattern", "decisionFlowPattern"],
        notes: ["Use a persistent detail rail with history and notes.", "Keep status grouping obvious from the queue level."],
        avoid: ["hiding history behind extra pages", "card-only ticket lists"],
      },
      {
        id: "monitoring-analytics",
        label: "Monitoring / Analytics Operations",
        matchers: [/analytics/i, /monitoring/i, /metrics/i, /health/i, /status/i, /observability/i],
        route: "operational-overview",
        designProfileId: "operational-overview",
        priorityCategories: ["Dashboard", "App Shells", "Data Display", "Tables", "Data Density"],
        componentHints: ["analytics-dashboard-shell", "dashboard-header-pattern", "kpi-grid-tabular", "activity-log-timeline"],
        patternHints: ["denseOperationalWorkbench"],
        notes: ["Keep summary metrics in service of the work surface below.", "Do not let charts become the only useful region if action is still required."],
        avoid: ["vanity metric dashboards", "chart-first layouts with no clear operational entry point"],
      },
    ],
  },
  {
    id: "landing-page",
    label: "Landing Page / Marketing Surface",
    supportLevel: "medium",
    summary: "Marketing homepages, campaign pages, SaaS landing pages, and conversion-oriented hero surfaces.",
    matchers: [/landing page/i, /landing/i, /hero/i, /homepage/i, /campaign/i, /marketing/i, /pricing/i, /conversion/i],
    sectors: [
      {
        id: "saas-landing",
        label: "SaaS / Product Marketing",
        matchers: [/saas/i, /software/i, /product marketing/i, /pricing/i, /signup/i],
        route: "marketing-surface",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Buttons", "Navigation", "Data Display", "Empty States"],
        componentHints: ["marketing-hero-shell", "hero-cta-buttons", "bento-grid", "icon-label-buttons"],
        patternHints: [],
        notes: ["Focus on a strong hero, clear CTA hierarchy, and conversion path.", "Avoid dense operational table grammar unless the page is really a product surface."],
        avoid: ["dense back-office workbench patterns", "audit-style inspector rails"],
      },
      {
        id: "editorial-brand",
        label: "Editorial / Brand Landing",
        matchers: [/editorial/i, /brand/i, /story/i, /manifesto/i, /about/i],
        route: "marketing-surface",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Navigation", "Data Display", "Buttons"],
        componentHints: ["bento-grid", "marketing-hero-shell", "minimal-text-buttons"],
        patternHints: [],
        notes: ["Use stronger editorial hierarchy and less CTA noise.", "Treat icons as restrained proof cues, not decoration."],
        avoid: ["generic SaaS pricing-card repetition", "icon clusters used as ornament"],
      },
    ],
  },
  {
    id: "product-application",
    label: "Product Application / Software UI",
    supportLevel: "medium",
    summary: "General software product interfaces that are not purely marketing and not deeply operational back-office tools.",
    matchers: [/product ui/i, /app/i, /software/i, /settings/i, /account/i, /profile/i, /workspace/i, /assistant/i, /chatgpt/i, /claude/i, /prompt/i, /artifact/i],
    sectors: [
      {
        id: "settings-account",
        label: "Settings / Account Surface",
        matchers: [/settings/i, /account/i, /preferences/i, /profile/i, /security/i],
        route: "product-surface",
        designProfileId: "product-utility",
        priorityCategories: ["App Shells", "Layout", "Navigation", "Inputs", "Feedback"],
        componentHints: ["settings-preferences-shell", "account-settings-layout", "inline-validation-patterns"],
        patternHints: [],
        notes: ["Bias toward structured forms, side navigation, and clear save/confirm behavior."],
        avoid: ["dense operational queues unless the surface actually reviews records"],
      },
      {
        id: "collaboration-workspace",
        label: "Collaboration / Workspace",
        matchers: [/workspace/i, /chat/i, /messaging/i, /inbox/i, /kanban/i, /collaboration/i],
        route: "product-surface",
        designProfileId: "product-utility",
        priorityCategories: ["App Shells", "Layout", "Navigation", "Inputs", "Data Display"],
        componentHints: ["chat-messaging-shell", "inbox-thread-layout", "kanban-board-shell", "command-palette"],
        patternHints: [],
        notes: ["Use workspace shell patterns instead of operational queue grammar unless review/approvals dominate."],
        avoid: ["finance-style reconciliation patterns"],
      },
      {
        id: "ai-assistant-workspace",
        label: "AI Assistant / Prompt Workspace",
        matchers: [/assistant/i, /chatgpt/i, /claude/i, /artifact/i, /canvas/i, /prompt/i, /conversation/i, /llm/i, /model switch/i],
        route: "assistant-workspace",
        designProfileId: "product-utility",
        priorityCategories: ["App Shells", "Layout", "Inputs", "Navigation", "Data Display"],
        componentHints: ["general-assistant-chat-workspace", "artifact-collaboration-shell", "context-aware-assistant-console", "command-palette"],
        patternHints: [],
        notes: ["Keep the conversation lane simple and move durable work into a draft or artifact region.", "Treat prompt context, complaints, and routed resources as first-class inputs rather than hidden metadata."],
        avoid: ["generic messaging-only shells", "operational queue grammar unless the assistant is triaging workflow records"],
      },
      {
        id: "auth-onboarding",
        label: "Auth / Onboarding Flow",
        matchers: [/auth/i, /login/i, /signup/i, /onboarding/i, /magic link/i, /register/i],
        route: "onboarding-flow",
        designProfileId: "onboarding-focused",
        priorityCategories: ["Layout", "Inputs", "Feedback", "Buttons", "Empty States"],
        componentHints: ["magic-link-flow", "multi-step-wizard", "permission-gated-states"],
        patternHints: [],
        notes: ["Keep the path linear and calm.", "Use progression and reassurance rather than dashboard density."],
        avoid: ["multi-panel workbench structure", "too many choices on the first screen"],
      },
    ],
  },
  {
    id: "docs-knowledge",
    label: "Docs / Knowledge Surface",
    supportLevel: "medium",
    summary: "Documentation, help centers, knowledge bases, and content-heavy product education surfaces.",
    matchers: [/docs/i, /documentation/i, /knowledge base/i, /help center/i, /guide/i, /manual/i],
    sectors: [
      {
        id: "product-docs",
        label: "Product Docs / Knowledge Base",
        matchers: [/docs/i, /documentation/i, /guide/i, /manual/i, /knowledge base/i],
        route: "docs-surface",
        designProfileId: "docs-knowledge",
        priorityCategories: ["App Shells", "Navigation", "Layout", "Data Display", "Inputs"],
        componentHints: ["docs-writing-shell", "split-nav-shell", "command-palette"],
        patternHints: [],
        notes: ["Prioritize reading rhythm, section anchors, and side navigation over card grids.", "Use icons only as small orientation cues."],
        avoid: ["marketing hero inflation", "dashboard KPI grammar"],
      },
    ],
  },
  {
    id: "commerce-marketplace",
    label: "Commerce / Marketplace Surface",
    supportLevel: "medium",
    summary: "Storefronts, creator marketplaces, product pages, checkout flows, and post-purchase surfaces.",
    matchers: [/storefront/i, /ecommerce/i, /commerce/i, /marketplace/i, /shop/i, /product page/i, /checkout/i],
    sectors: [
      {
        id: "storefront-browse",
        label: "Storefront / Browse",
        matchers: [/storefront/i, /shop/i, /browse/i, /catalog/i, /marketplace/i],
        route: "commerce-surface",
        designProfileId: "commerce-showcase",
        priorityCategories: ["Layout", "Navigation", "Data Display", "Buttons", "Empty States"],
        componentHints: ["ecommerce-storefront-shell", "product-listing-grid", "creator-storefront-profile"],
        patternHints: [],
        notes: ["Use browsing hierarchy, filters, and product grouping before adding ornamental effects.", "Let imagery or merchandise lead, not dashboard chrome."],
        avoid: ["internal tool density", "approval-queue shells"],
      },
      {
        id: "checkout-purchase",
        label: "Checkout / Purchase Flow",
        matchers: [/checkout/i, /purchase/i, /cart/i, /order/i],
        route: "commerce-surface",
        designProfileId: "commerce-showcase",
        priorityCategories: ["Layout", "Inputs", "Buttons", "Feedback", "Data Display"],
        componentHints: ["checkout-summary-card", "purchase-success-page", "product-detail-page"],
        patternHints: [],
        notes: ["Keep purchase reassurance, summary, and CTA clarity ahead of expressive visuals.", "Use icons for trust/support cues only."],
        avoid: ["dense admin table grammar", "too many tertiary choices during checkout"],
      },
    ],
  },
  {
    id: "developer-tool",
    label: "Developer Tool / Power User Interface",
    supportLevel: "high",
    summary: "Developer tooling, editors, consoles, and power-user workbenches with dense information and multi-panel navigation.",
    matchers: [/developer tool/i, /editor/i, /ide/i, /console/i, /terminal/i, /debug/i, /developer/i],
    sectors: [
      {
        id: "code-workbench",
        label: "Code / Tooling Workbench",
        matchers: [/editor/i, /ide/i, /console/i, /terminal/i, /code/i, /debug/i],
        route: "developer-workbench",
        designProfileId: "developer-dense",
        priorityCategories: ["App Shells", "Navigation", "Data Density", "Tables", "Inputs"],
        componentHints: ["dark-vscode-shell", "ide-three-panel-shell", "command-palette", "activity-log-timeline"],
        patternHints: ["denseOperationalWorkbench"],
        notes: ["Favor dense split panes and tool-first navigation.", "Preserve keyboard-driven control surfaces and compact utility regions."],
        avoid: ["marketing hero treatments", "overly spacious consumer spacing"],
      },
    ],
  },
  {
    id: "conversion-funnel",
    label: "Conversion Funnel / Lead Capture Surface",
    supportLevel: "high",
    summary: "Funnels, lead capture pages, trial signups, demo requests, webinar registrations, and high-ticket application flows. Optimized for conversion with calibrated friction based on audience warmth, price point, and commitment level.",
    matchers: [/funnel/i, /lead capture/i, /lead gen/i, /opt.?in/i, /waitlist/i, /sales page/i, /squeeze page/i, /webinar registration/i, /discovery call/i, /book a call/i, /demo request/i, /apply now/i, /high.?ticket/i],
    sectors: [
      {
        id: "cold-traffic-lead",
        label: "Cold Traffic Lead Capture",
        matchers: [/cold traffic/i, /lead capture/i, /opt.?in/i, /lead magnet/i, /free offer/i],
        route: "conversion-funnel",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Buttons", "Inputs", "Data Display", "Empty States"],
        componentHints: ["marketing-hero-shell", "hero-cta-buttons", "sign-in-form-clean", "testimonial-card"],
        patternHints: [],
        notes: ["Frictionless entry: email-first, benefit-led, no pricing at cold entry.", "Social proof after consent decision — logos on page, testimonial near CTA."],
        avoid: ["multi-field forms at entry", "pricing above fold", "too many options on first screen"],
      },
      {
        id: "warm-trial-signup",
        label: "Warm Trial / PLG Signup",
        matchers: [/trial/i, /free trial/i, /plg/i, /product.?led/i, /start for free/i, /get started/i],
        route: "conversion-funnel",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Inputs", "Buttons", "Data Display", "Feedback"],
        componentHints: ["marketing-hero-shell", "hero-cta-buttons", "stepper-onboarding-flow", "feature-comparison-table"],
        patternHints: [],
        notes: ["Feature proof before CTA. One-field-at-a-time flow. Show value immediately post-signup.", "Logos/ratings as trust shortcut above fold."],
        avoid: ["generic empty state after signup", "multi-field form at cold entry"],
      },
      {
        id: "high-ticket-application",
        label: "High-Ticket Application / Discovery Call",
        matchers: [/apply/i, /application/i, /discovery call/i, /book a call/i, /strategy call/i, /coaching/i, /high ticket/i],
        route: "conversion-funnel",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Inputs", "Data Display", "Buttons", "Feedback"],
        componentHints: ["marketing-hero-shell", "multi-step-wizard", "review-card", "feature-highlight-tooltip"],
        patternHints: [],
        notes: ["Authority signals above fold. Deliberate friction signals selectivity. Long-form content establishes depth before CTA.", "Named case studies over anonymous testimonials."],
        avoid: ["single-screen application forms", "generic CTAs", "overly polished agency aesthetic"],
      },
      {
        id: "checkout-conversion",
        label: "Direct Purchase / Checkout Conversion",
        matchers: [/buy now/i, /direct sale/i, /one.?click/i, /order now/i],
        route: "conversion-funnel",
        designProfileId: "commerce-showcase",
        priorityCategories: ["Layout", "Inputs", "Buttons", "Feedback", "Data Display"],
        componentHints: ["checkout-summary-card", "product-detail-page", "dark-pricing-card", "usage-based-pricing"],
        patternHints: [],
        notes: ["Purchase reassurance, summary, and CTA clarity before expressive visuals.", "Trust signals (guarantee, support) near the pay button."],
        avoid: ["dense admin grammar", "too many tertiary options at checkout"],
      },
      {
        id: "webinar-event-registration",
        label: "Webinar / Event Registration",
        matchers: [/webinar/i, /registration/i, /live training/i, /online event/i, /workshop/i],
        route: "conversion-funnel",
        designProfileId: "marketing-editorial",
        priorityCategories: ["Layout", "Inputs", "Buttons", "Data Display", "Feedback"],
        componentHints: ["marketing-hero-shell", "hero-cta-buttons", "sign-in-form-clean", "testimonial-card"],
        patternHints: [],
        notes: ["Time-anchored urgency. Minimal form (name + email). Date/time visibility drives action.", "Agenda or speaker proof supports registration belief."],
        avoid: ["overly complex registration flow", "hiding event date/time"],
      },
    ],
  },
  {
    id: "video-game",
    label: "Video Game UI",
    supportLevel: "unsupported",
    summary: "HUDs, inventory systems, game menus, battle overlays, quest logs, and other game-specific interfaces are outside this system's target quality bar.",
    matchers: [/video game/i, /game ui/i, /hud/i, /inventory/i, /quest/i, /skill tree/i, /rpg/i, /combat/i],
    sectors: [],
  },
];

const iconLibraryCatalog = {
  Lucide: {
    positioning: "Lightweight, consistent, tree-shakable SVG icon system with broad package support. EXHIBIT default.",
    pkg: "lucide-react",
    defaultSize: "14-16px",
    strokeStyle: "1.75-2px consistent stroke",
    bestFor: ["operational tools", "product applications", "docs", "developer tools", "any surface without a prior icon commitment"],
    avoid: ["use at sizes above 20px except in empty-state illustrations"],
  },
  Tabler: {
    positioning: "Large, consistent 24x24 / 2px stroke set with strong admin and utility coverage.",
    pkg: "@tabler/icons-react",
    defaultSize: "16-20px",
    strokeStyle: "2px stroke",
    bestFor: ["dense admin utilities", "developer tooling", "broader glyph coverage when Lucide lacks a niche shape"],
    avoid: ["decorative / brand-forward surfaces"],
  },
  Heroicons: {
    positioning: "Hand-crafted Tailwind-oriented set with outline, solid, mini, and micro variants.",
    pkg: "@heroicons/react",
    defaultSize: "16-20px (solid), 12-14px (mini/micro)",
    strokeStyle: "Outline and solid variants",
    bestFor: ["marketing surfaces", "product onboarding", "commerce UI with restrained icon usage", "Tailwind UI or Headless UI codebases"],
    avoid: ["dense operational tables where Lucide or Tabler reads lighter"],
  },
  Phosphor: {
    positioning: "Flexible large icon family with multiple tones and a slightly more expressive personality.",
    pkg: "@phosphor-icons/react",
    defaultSize: "16-20px",
    strokeStyle: "Regular / Bold / Light / Thin / Fill / Duotone weights",
    bestFor: ["consumer product surfaces", "commerce accents", "brand-forward but interface-friendly systems", "when dual-tone or weight variation adds meaning"],
    avoid: ["high-density data tables where weight variation creates noise"],
  },
  RadixIcons: {
    positioning: "Compact, 15px-grid icon set built for Radix UI primitives and shadcn/ui ecosystems.",
    pkg: "@radix-ui/react-icons",
    defaultSize: "15px (native grid)",
    strokeStyle: "Thin, consistent, 15px optical grid",
    bestFor: ["shadcn/ui codebases", "Radix UI component libraries", "tight inline controls where a 15px optical grid fits naturally"],
    avoid: ["surfaces already committed to Lucide — mixing creates inconsistency at small sizes"],
    note: "If the agent is working in a shadcn/ui codebase, defer to Radix Icons for internal component chrome. Use Lucide for product-level icon needs.",
  },
  MUIIcons: {
    positioning: "Material Design icon set maintained by MUI. Ships in outlined, filled, rounded, sharp, and two-tone variants.",
    pkg: "@mui/icons-material",
    defaultSize: "20-24px",
    strokeStyle: "Outlined / Filled / Rounded / Sharp / Two-tone",
    bestFor: ["MUI (Material UI) codebases", "Google-design-system surfaces", "existing MUI projects that need consistent icon coverage"],
    avoid: ["Tailwind or non-MUI React codebases — brings heavy peer dependency overhead"],
    note: "Only appropriate when the codebase is already MUI-committed. Do not introduce as a one-off dependency.",
  },
  RemixIcon: {
    positioning: "Neutral, dual-tone capable icon set with broad general-purpose coverage.",
    pkg: "remixicon-react",
    defaultSize: "16-24px",
    strokeStyle: "Line and Fill variants",
    bestFor: ["SaaS products with a slightly softer visual posture", "consumer dashboard surfaces", "when Lucide coverage gaps need a neutral fill"],
    avoid: ["operational / density-first surfaces where the softer optical weight reads as decorative"],
  },
  Iconify: {
    positioning: "Umbrella icon meta-library providing unified access to 100k+ icons across 100+ icon sets via a single API.",
    pkg: "@iconify/react",
    defaultSize: "varies by source set",
    strokeStyle: "Depends on source set (pass icon set slug to resolve the actual family)",
    bestFor: ["design-system-agnostic platforms", "when the product needs to reference icons from multiple families without shipping all dependencies", "agent-driven icon selection where the specific family is determined at runtime"],
    avoid: ["production codebases that should tree-shake tightly — Iconify loads icons at runtime by default"],
    note: "Best used when the agent doesn't know the target icon family upfront and needs to reference icons symbolically. Resolve to the specific pkg (e.g. lucide, tabler, heroicons) before final output.",
  },
} as const;

const designProfiles: Record<string, DesignProfile> = {
  "operational-compact": {
    id: "operational-compact",
    label: "Operational Compact",
    summary: "Dense, serious, high-frequency operational posture for internal queues, policy tools, review surfaces, and decision-heavy admin systems.",
    layoutMood: "Structured, sober, left-nav plus dominant work surface plus right-context rail.",
    spacing: {
      density: "compact",
      baseGrid: "4px",
      sectionGap: "16-24px",
      cardPadding: "16-20px",
      controlGap: "8-12px",
      rules: [
        "Keep toolbars tight and horizontally efficient.",
        "Reserve the largest spacing jumps for shell transitions, not within the table surface.",
        "Use 12-16px internal panel gaps before jumping to 24px section separation.",
      ],
    },
    typography: {
      display: "Space Grotesk only for page and section anchors.",
      body: "Inter for all control, label, and body text.",
      mono: "JetBrains Mono for IDs, timestamps, money, counts, and anything scanned column by column.",
      rules: [
        "Do not use oversized display text inside the work surface.",
        "Keep labels smaller and quieter than data values.",
        "Use mono selectively where scan speed matters.",
      ],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide is the cleanest default for restrained operational chrome and matches the product's existing React setup well.",
      defaultSize: "14-16px",
      strokeStyle: "1.75-2px neutral line icons",
      usageRules: [
        "Icons are cues, not decoration.",
        "Use icons mostly in nav, utility actions, badges, and empty-state support.",
        "Avoid oversized icon-first buttons unless the control is already standard and obvious.",
      ],
      alternatives: ["Tabler for broader admin glyph coverage", "Heroicons Mini for tiny action affordances"],
      externalLibraryHandling: [
        "If the target site already uses a coherent branded icon family everywhere, preserve it only if it stays restrained at 14-16px in product chrome.",
        "If the incoming icon set is inconsistent, oversized, or ornamental, normalize to Lucide.",
        "Do not mix icon families in one operational surface.",
      ],
    },
    colorAndElevation: {
      posture: "Neutral-first with semantic accents reserved for state, risk, and validation.",
      elevation: "Mostly flat or shadow-sm, with stronger elevation only for menus, drawers, and modals.",
      rules: [
        "Use borders and contrast before using shadow as grouping.",
        "Do not introduce multiple accent colors competing with semantic states.",
      ],
    },
    motion: {
      posture: "Minimal and functional.",
      rules: [
        "Animate reveals for inspector rails and toasts, not every control.",
        "Keep durations short and subordinate to task speed.",
      ],
    },
    grouping: {
      primarySurface: "Table or queue dominates.",
      supportingSurfaces: ["compact summary header", "sticky toolbar", "right-side inspector"],
      avoid: ["card mosaics", "marketing hero sections", "icon clusters used as visual filler"],
    },
  },
  "finance-data-dense": {
    id: "finance-data-dense",
    label: "Finance Data-Dense",
    summary: "A stricter operational posture for reconciliation, statements, balances, and export-heavy financial review.",
    layoutMood: "Data-first, numeric-first, variance-aware, and intolerant of decorative spacing.",
    spacing: {
      density: "compact",
      baseGrid: "4px",
      sectionGap: "12-20px",
      cardPadding: "16px",
      controlGap: "8px",
      rules: [
        "Tighten summary and controls so the numeric surface stays dominant.",
        "Spend spacing on readability between numeric groups, not ornamental air.",
      ],
    },
    typography: {
      display: "Space Grotesk only in the shell/header.",
      body: "Inter for explanatory text and controls.",
      mono: "JetBrains Mono is non-negotiable for numeric and temporal scanning.",
      rules: [
        "Right-align all money, totals, balances, and variance columns.",
        "Keep summaries compact and tabular where possible.",
      ],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide keeps finance surfaces calm and neutral, which matters more than expressive icons in reconciliation work.",
      defaultSize: "14px",
      strokeStyle: "2px neutral line icons",
      usageRules: [
        "Use icons only for utility actions, file/export affordances, and status assistance.",
        "Keep icons secondary to labels in finance controls.",
      ],
      alternatives: ["Tabler for extended utility/file glyphs"],
      externalLibraryHandling: [
        "Normalize most external icon systems unless the existing finance product already uses a disciplined in-house family.",
        "Do not let brand icon personality interfere with numeric clarity.",
      ],
    },
    colorAndElevation: {
      posture: "Neutral surfaces with semantic state used sparingly and precisely.",
      elevation: "Almost flat, with subtle lifts for export drawers and confirmation layers.",
      rules: ["Color should support risk and state, not brand theatre.", "Summary bands stay visually subordinate to the table."],
    },
    motion: {
      posture: "Near-static.",
      rules: ["Use motion only to reveal drawers, confirmations, and async completion."],
    },
    grouping: {
      primarySurface: "Grouped table or reconciliation grid.",
      supportingSurfaces: ["tabular KPI strip", "exception rail", "export drawer"],
      avoid: ["big analytics cards", "spacious consumer-style summaries"],
    },
  },
  "operational-overview": {
    id: "operational-overview",
    label: "Operational Overview",
    summary: "An overview-led operational posture where metrics matter, but only in service of the workbench beneath them.",
    layoutMood: "Summary-first but still task-oriented.",
    spacing: {
      density: "default",
      baseGrid: "4px",
      sectionGap: "20-24px",
      cardPadding: "20-24px",
      controlGap: "12px",
      rules: ["Use more breathing room than compact operations, but keep summary modules disciplined.", "Do not widen spacing so much that work surfaces lose urgency."],
    },
    typography: {
      display: "Space Grotesk for page and major module anchors.",
      body: "Inter for all body and support copy.",
      mono: "JetBrains Mono for metrics and logs when scanned repeatedly.",
      rules: ["KPI values can grow, but still stay subordinate to task flow.", "Metrics should read clearly at a glance without hero-style inflation."],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide keeps overview surfaces neutral enough to support both status and action modules.",
      defaultSize: "16px",
      strokeStyle: "2px outline icons",
      usageRules: ["Use icons in summary chips, nav, and utility actions.", "Do not build metric cards around icons as the main story."],
      alternatives: ["Heroicons Mini for smaller chips", "Tabler for monitoring-specific glyphs"],
      externalLibraryHandling: ["Preserve an external icon family only if the entire product already uses it coherently.", "Avoid mixing overview cards with a second decorative icon language."],
    },
    colorAndElevation: {
      posture: "Neutral cards with stronger semantic state chips.",
      elevation: "shadow-sm for summary panels, stronger only for overlays.",
      rules: ["Use borders and subtle fills to separate summaries.", "Do not let chart color palettes define the whole page."],
    },
    motion: {
      posture: "Subtle and staggered.",
      rules: ["Page-load reveal can be slightly richer here than in compact operations.", "Still avoid ornamental micro-motion."],
    },
    grouping: {
      primarySurface: "KPI strip leading into a work surface or status table.",
      supportingSurfaces: ["trend panel", "event stream", "action shortcuts"],
      avoid: ["vanity-only dashboards", "pure chart galleries with no action surface"],
    },
  },
  "marketing-editorial": {
    id: "marketing-editorial",
    label: "Marketing Editorial",
    summary: "A clearer, more deliberate marketing posture that avoids generic SaaS card sludge and uses typography and spacing as the primary emotional tools.",
    layoutMood: "Typographic, atmospheric, but still disciplined.",
    spacing: {
      density: "comfortable",
      baseGrid: "4px",
      sectionGap: "32-64px",
      cardPadding: "24-32px",
      controlGap: "12-16px",
      rules: ["Build rhythm with larger section spacing, not giant random whitespace.", "Use asymmetric composition carefully instead of stacking identical cards."],
    },
    typography: {
      display: "Space Grotesk can carry much more visual weight here.",
      body: "Inter for supporting body copy and UI details.",
      mono: "JetBrains Mono only for product proof points, metrics, or code-adjacent facts.",
      rules: ["Lead with typography before relying on decorative shapes.", "Keep CTAs clear and direct even when the page is atmospheric."],
    },
    iconSystem: {
      primaryLibrary: "Heroicons",
      rationale: "Heroicons works well for clean marketing UI and Tailwind-first product surfaces without becoming too ornamental by default.",
      defaultSize: "16-20px",
      strokeStyle: "Outline for interface cues; Mini/Solid only for tiny controls or dense chips.",
      usageRules: ["Icons should support proof points, feature lists, and compact nav/utility uses.", "Do not turn the hero into an icon wall."],
      alternatives: ["Lucide for calmer product-marketing blends", "Phosphor for slightly more expressive consumer-forward accents"],
      externalLibraryHandling: ["If an incoming branded icon system is a genuine part of the brand language, preserve it only in branded zones.", "Normalize utility chrome to the routed library if the external set is inconsistent or too loud."],
    },
    colorAndElevation: {
      posture: "More atmospheric than operational, but still anchored by legible contrast and intentional accent use.",
      elevation: "Use shadows and layers selectively to create depth, not generic floating-card systems.",
      rules: ["One clear accent family is enough.", "Avoid purple-on-white defaults and interchangeable SaaS gradients."],
    },
    motion: {
      posture: "A few meaningful reveals are allowed.",
      rules: ["Stagger entrances by section, not by every small UI atom.", "Hero motion should reinforce hierarchy, not become the product."],
    },
    grouping: {
      primarySurface: "Hero and proof-driven narrative sections.",
      supportingSurfaces: ["feature proof grid", "customer/value band", "conversion CTA"],
      avoid: ["dashboard-card overuse", "icon tiles as filler", "default startup-site structure with no point of view"],
    },
  },
  "product-utility": {
    id: "product-utility",
    label: "Product Utility",
    summary: "A neutral, well-composed product UI posture for settings, workspaces, and general software surfaces that are not back-office workbenches.",
    layoutMood: "Quietly confident, practical, and modular.",
    spacing: {
      density: "default",
      baseGrid: "4px",
      sectionGap: "20-32px",
      cardPadding: "20-24px",
      controlGap: "10-14px",
      rules: ["Use enough space to feel intentional without drifting into consumer fluff.", "Group modules through structure, not by nesting padded cards forever."],
    },
    typography: {
      display: "Space Grotesk for titles and section anchors only.",
      body: "Inter for interface text and controls.",
      mono: "JetBrains Mono for tokens, IDs, or technical details.",
      rules: ["Keep headings crisp but not oversized.", "Let form and navigation structure do more work than decorative type."],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide gives product UI a clean baseline and keeps icon use restrained across nav, settings, and workspace controls.",
      defaultSize: "16px",
      strokeStyle: "2px outline icons",
      usageRules: ["Use icons mostly in navigation, field affordances, and compact utility controls.", "Avoid icon-heavy button collections unless there is a clear functional reason."],
      alternatives: ["Heroicons for onboarding/auth surfaces", "Phosphor when a consumer-facing product needs slightly softer personality"],
      externalLibraryHandling: ["Keep a coherent incoming icon family only if it already defines the product system well.", "Normalize scattered icon usage to Lucide to restore consistency."],
    },
    colorAndElevation: {
      posture: "Neutral foundation with one disciplined accent family.",
      elevation: "Use shadow-sm for layered modules and stronger shadows only for popovers and dialogs.",
      rules: ["Avoid over-tinted UI chrome.", "Reserve stronger fills for selected or high-emphasis states."],
    },
    motion: {
      posture: "Subtle but present.",
      rules: ["Use meaningful transitions for drawers, tabs, and step changes.", "Do not animate every control indiscriminately."],
    },
    grouping: {
      primarySurface: "Form, content, or workspace module depending on task.",
      supportingSurfaces: ["side navigation", "secondary cards", "feedback states"],
      avoid: ["operational table dominance when not needed", "decorative icon clusters"],
    },
  },
  "onboarding-focused": {
    id: "onboarding-focused",
    label: "Onboarding Focused",
    summary: "A calm, guided posture for auth, signup, onboarding, and permissions setup flows.",
    layoutMood: "Linear, reassuring, and reductionist.",
    spacing: {
      density: "comfortable",
      baseGrid: "4px",
      sectionGap: "24-40px",
      cardPadding: "24-32px",
      controlGap: "12-16px",
      rules: ["Prioritize a clean vertical flow.", "Remove branching choices until the user reaches a stable first success point."],
    },
    typography: {
      display: "Space Grotesk can be slightly more inviting here, but stay disciplined.",
      body: "Inter for forms and support text.",
      mono: "JetBrains Mono only for code-like tokens or invite codes.",
      rules: ["Use clear step titles and reassurance text.", "Avoid dense admin typography in onboarding."],
    },
    iconSystem: {
      primaryLibrary: "Heroicons",
      rationale: "Heroicons fits compact product flows and can support a softer, clearer onboarding tone without becoming decorative if kept small.",
      defaultSize: "16-18px",
      strokeStyle: "Outline or Mini depending on control density",
      usageRules: ["Use icons mainly for progress cues, permissions, and reassurance messages.", "Do not let icon illustrations replace explanatory copy."],
      alternatives: ["Lucide for more product-neutral auth systems"],
      externalLibraryHandling: ["Branded sign-in icons may remain branded.", "Normalize general product chrome if the rest of the external set is inconsistent."],
    },
    colorAndElevation: {
      posture: "Calm neutrals with a friendly accent and clear success/warning states.",
      elevation: "Single focused card or panel with gentle depth.",
      rules: ["Avoid aggressive alert colors unless there is real risk.", "Use surface focus rather than many competing panels."],
    },
    motion: {
      posture: "Gentle progression-oriented transitions.",
      rules: ["Animate step transitions and confirmations, not static form fields.", "Use motion to reassure completion."],
    },
    grouping: {
      primarySurface: "Single centered flow or stepper-driven panel.",
      supportingSurfaces: ["progress indicator", "permissions explainer", "success state"],
      avoid: ["dashboard shells", "too many lateral choices"],
    },
  },
  "developer-dense": {
    id: "developer-dense",
    label: "Developer Dense",
    summary: "A denser, tool-first posture for code, console, and power-user interfaces where utility beats warmth.",
    layoutMood: "Panelized, commandable, and precision-oriented.",
    spacing: {
      density: "compact",
      baseGrid: "4px",
      sectionGap: "12-20px",
      cardPadding: "12-16px",
      controlGap: "8px",
      rules: ["Respect panel boundaries over card padding.", "Keep utility strips tight and keyboard-friendly."],
    },
    typography: {
      display: "Space Grotesk rarely, mostly in shell titles.",
      body: "Inter for UI chrome.",
      mono: "JetBrains Mono heavily for code, logs, commands, timestamps, and diagnostics.",
      rules: ["Monospace is part of the main visual language here.", "Avoid over-stylized display text."],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide is the cleanest baseline for dev tools and keeps the shell from feeling like a template gallery.",
      defaultSize: "14-16px",
      strokeStyle: "2px outline icons",
      usageRules: ["Use icons mostly for navigation, file/tool affordances, and status controls.", "Favor labels and keyboard cues over icon-only ambiguity."],
      alternatives: ["Tabler when a denser admin/dev glyph set is needed"],
      externalLibraryHandling: ["If the incoming tool has a well-established icon language, preserve it if it is coherent and utility-first.", "Normalize novelty icon styles to Lucide or Tabler."],
    },
    colorAndElevation: {
      posture: "Can lean darker or more contrast-heavy, but still structured.",
      elevation: "Panel separators matter more than shadows.",
      rules: ["Use contrast to define panes and focus states.", "Avoid generic glossy card depth."],
    },
    motion: {
      posture: "Very restrained.",
      rules: ["Use motion for panel resize/open states and command feedback only."],
    },
    grouping: {
      primarySurface: "Multi-panel workbench.",
      supportingSurfaces: ["command palette", "side explorers", "logs/inspector"],
      avoid: ["consumer-style spacious cards", "marketing surfaces embedded into the tool shell"],
    },
  },
  "docs-knowledge": {
    id: "docs-knowledge",
    label: "Docs Knowledge",
    summary: "A reading-first posture for documentation and knowledge systems that need rhythm, anchors, and strong side navigation without dashboard drift.",
    layoutMood: "Readable, sectional, and quietly technical.",
    spacing: {
      density: "default",
      baseGrid: "4px",
      sectionGap: "24-40px",
      cardPadding: "20-24px",
      controlGap: "10-12px",
      rules: ["Give reading blocks more vertical rhythm than product settings pages.", "Do not box every section in a card just because components exist."],
    },
    typography: {
      display: "Space Grotesk for doc titles and anchor headings.",
      body: "Inter for long-form content and UI labels.",
      mono: "JetBrains Mono for code, terminal, and inline technical tokens.",
      rules: ["Reading comfort matters more than visual novelty.", "Use headings to create hierarchy rather than relying on color blocks."],
    },
    iconSystem: {
      primaryLibrary: "Lucide",
      rationale: "Lucide keeps docs interfaces neutral and readable while providing enough coverage for nav and callouts.",
      defaultSize: "14-16px",
      strokeStyle: "2px outline icons",
      usageRules: ["Icons should support callouts, navigation, and compact utility actions.", "Do not turn docs pages into icon-led marketing sections."],
      alternatives: ["Heroicons for simple product docs chrome"],
      externalLibraryHandling: ["Preserve a doc system's existing icons only if they are already coherent and quiet.", "Normalize noisy icon mixes to Lucide."],
    },
    colorAndElevation: {
      posture: "Neutral, low-theatrics, high readability.",
      elevation: "Minimal shadows; separation mostly through borders, width, and spacing.",
      rules: ["Use background tint sparingly for notes and code-adjacent callouts.", "Keep the reading column the main visual anchor."],
    },
    motion: {
      posture: "Near-static.",
      rules: ["Motion should be limited to navigation drawers or anchor transitions."],
    },
    grouping: {
      primarySurface: "Reading column with strong local navigation.",
      supportingSurfaces: ["section nav", "code samples", "callouts"],
      avoid: ["dashboard KPI sections", "heavy promotional hero components"],
    },
  },
  "commerce-showcase": {
    id: "commerce-showcase",
    label: "Commerce Showcase",
    summary: "A product-and-conversion posture for storefront, marketplace, and checkout surfaces that need hierarchy without admin-template drift.",
    layoutMood: "Product-led, trust-aware, and conversion-focused.",
    spacing: {
      density: "default",
      baseGrid: "4px",
      sectionGap: "24-40px",
      cardPadding: "20-28px",
      controlGap: "12-16px",
      rules: ["Use enough breathing room for imagery and product cards, but keep checkout more disciplined.", "Keep the purchase path visually tighter than browse pages."],
    },
    typography: {
      display: "Space Grotesk can lead headlines and merchandising anchors.",
      body: "Inter for UI and product metadata.",
      mono: "JetBrains Mono only for order numbers, prices in dense lists, or inventory details.",
      rules: ["Let product hierarchy lead before promotional chrome.", "Use clear summary typography in checkout and success states."],
    },
    iconSystem: {
      primaryLibrary: "Heroicons",
      rationale: "Heroicons works well for checkout and storefront UI where trust/support cues need to be clean rather than ornamental.",
      defaultSize: "16-18px",
      strokeStyle: "Outline or Mini depending on density",
      usageRules: ["Use icons for trust, shipping, saved items, and compact nav/utility cues.", "Do not build product cards around decorative icon blobs."],
      alternatives: ["Phosphor for slightly more expressive marketplace/product moments", "Lucide for calmer commerce-product hybrids"],
      externalLibraryHandling: ["Preserve branded marketplace iconography only in branded or merchandising zones.", "Normalize utility chrome if the incoming icons are noisy or inconsistent."],
    },
    colorAndElevation: {
      posture: "More expressive than operations, but still grounded.",
      elevation: "Soft layered cards are acceptable, but checkout should become flatter and more direct.",
      rules: ["Use one clear accent path.", "Avoid generic glossy ecommerce card kits."],
    },
    motion: {
      posture: "Subtle delight where it aids browsing or confirmation.",
      rules: ["Use a few meaningful transitions around add-to-cart or success states.", "Keep checkout motion calm and confidence-building."],
    },
    grouping: {
      primarySurface: "Product grid, detail view, or purchase summary depending on route.",
      supportingSurfaces: ["filters", "trust/support cues", "recommendation rails"],
      avoid: ["internal admin shells", "overloaded dashboard summary bands"],
    },
  },
};

const keywordBoosts: Array<{ test: RegExp; score: number }> = [
  { test: /(table|grid|queue|review|reconciliation|export|approval|log|activity|command|filter|dense|panel|shell|sidebar|toolbar|header|detail|timeline|kpi|stats)/i, score: 4 },
  { test: /(master-detail|three-panel|vscode|invoice|kanban|modern-table|data-table|compact|permission|audit)/i, score: 5 },
];

const keywordPenalties: Array<{ test: RegExp; score: number }> = [
  { test: /(hero|marketing|storefront|commerce|pricing|glow|brutalist|glassmorphism|testimonial)/i, score: -12 },
  { test: /(mobile-bottom-tab|gradient|neo-brutalist|social-auth)/i, score: -10 },
];

const slugOverrides: Record<string, Partial<{
  bestFor: string[];
  avoidFor: string[];
  actionHierarchyRole: string;
  dataDensityRole: string;
  density: string[];
  relevanceDelta: number;
  sourceSummary: string;
}>> = {
  "ide-three-panel-shell": {
    bestFor: ["three-region review workbenches", "left-nav + table + inspector layouts", "case management"],
    actionHierarchyRole: "structural-shell",
    dataDensityRole: "multi-panel-workbench",
    relevanceDelta: 8,
  },
  "master-detail-shell": {
    bestFor: ["queue + detail review", "approval inboxes", "support triage"],
    relevanceDelta: 9,
  },
  "dark-vscode-shell": {
    bestFor: ["power-user operational tools", "developer-facing workbenches", "dense split panes"],
    relevanceDelta: 7,
  },
  "analytics-dashboard-shell": {
    bestFor: ["ops summary surfaces", "header KPI regions", "data-heavy admin landing pages"],
    relevanceDelta: 6,
  },
  "dashboard-header-pattern": {
    bestFor: ["sticky workbench headers", "count summaries", "queue overview bars"],
    relevanceDelta: 8,
  },
  "general-assistant-chat-workspace": {
    bestFor: ["broad AI chat surfaces", "model-switching assistants", "prompt-driven research and writing"],
    actionHierarchyRole: "conversation-workspace",
    dataDensityRole: "assistant-thread-layout",
    relevanceDelta: 13,
  },
  "artifact-collaboration-shell": {
    bestFor: ["artifact-first assistant flows", "draft review", "conversation plus persistent work product"],
    actionHierarchyRole: "artifact-workspace",
    dataDensityRole: "assistant-artifact-pane",
    relevanceDelta: 14,
  },
  "context-aware-assistant-console": {
    bestFor: ["prompt complaint triage", "context-preserving assistant routing", "resource recommendation control towers"],
    actionHierarchyRole: "context-intake-shell",
    dataDensityRole: "prompt-brief-console",
    relevanceDelta: 12,
  },
  "modern-table": {
    bestFor: ["transaction tables", "review queues", "bulk selection lists", "finance operations"],
    dataDensityRole: "primary-decision-grid",
    relevanceDelta: 10,
  },
  "filter-bar-chips": {
    bestFor: ["sticky toolbar filters", "saved views", "queue narrowing", "segment switches"],
    actionHierarchyRole: "toolbar-filter-control",
    relevanceDelta: 9,
  },
  "export-pattern-ui": {
    bestFor: ["export configuration", "column bundle selection", "preview panels", "CSV/statement generation"],
    relevanceDelta: 10,
  },
  "dense-activity-log": {
    bestFor: ["audit logs", "event streams", "workflow traces"],
    relevanceDelta: 9,
  },
  "activity-log-timeline": {
    bestFor: ["review histories", "approval trails", "state transitions"],
    relevanceDelta: 7,
  },
  "kpi-grid-tabular": {
    bestFor: ["compact summary bands", "reconciliation rollups", "queue-level metrics"],
    relevanceDelta: 8,
  },
  "60-30-10-button-system": {
    bestFor: ["action hierarchy definition", "toolbar/button prioritization", "primary vs secondary control systems"],
    actionHierarchyRole: "primary-secondary-tertiary-reference",
    relevanceDelta: 10,
  },
  "ghost-button-collection": {
    bestFor: ["secondary row actions", "supporting toolbar actions", "non-primary controls"],
    actionHierarchyRole: "secondary-action-set",
    relevanceDelta: 6,
  },
  "loading-state-buttons": {
    bestFor: ["approval commits", "export actions", "retry and submit flows"],
    actionHierarchyRole: "async-commit-control",
    relevanceDelta: 7,
  },
  "segmented-button-controls": {
    bestFor: ["queue mode switching", "status filter toggles", "compact view changes"],
    relevanceDelta: 8,
  },
  "apple-pill-toggle": {
    bestFor: ["small filter clusters", "scope toggles"],
    relevanceDelta: 4,
  },
  "icon-label-buttons": {
    bestFor: ["toolbar actions", "bulk operations", "export and assign controls"],
    relevanceDelta: 6,
  },
  "icon-only-buttons": {
    bestFor: ["dense row actions", "table utilities", "inspector controls"],
    relevanceDelta: 6,
  },
  "gradient-glow-buttons": {
    avoidFor: ["dense operational tools", "serious admin interfaces", "table toolbars"],
    relevanceDelta: -12,
  },
  "hero-cta-buttons": {
    avoidFor: ["ops dashboards", "reconciliation workflows", "transaction review"],
    relevanceDelta: -14,
  },
  "neo-brutalist-buttons": {
    avoidFor: ["dense operational tools", "audit-heavy interfaces"],
    relevanceDelta: -12,
  },
  "social-auth-buttons": {
    avoidFor: ["review workbenches", "reconciliation pages", "approval queues"],
    relevanceDelta: -16,
  },
  "mobile-bottom-tab-shell": {
    avoidFor: ["desktop workbenches", "multi-panel operational tools"],
    relevanceDelta: -10,
  },
  "marketing-hero-shell": {
    avoidFor: ["operational tools", "data-heavy admin pages"],
    relevanceDelta: -18,
  },
  "ecommerce-storefront-shell": {
    avoidFor: ["internal admin surfaces", "dense queue tooling"],
    relevanceDelta: -14,
  },
  "empty-state-search": {
    bestFor: ["filtered queues with zero results", "search miss states in workbenches"],
    relevanceDelta: 5,
  },
  "empty-state-first-run": {
    bestFor: ["new operational modules", "empty exports", "queue initialization"],
    relevanceDelta: 4,
  },
  "skeleton-loading": {
    bestFor: ["table loading", "panel hydration", "inspector placeholders"],
    relevanceDelta: 7,
  },
  "inline-validation-patterns": {
    bestFor: ["decision forms", "export settings", "reconciliation overrides"],
    relevanceDelta: 6,
  },
  "notification-toast-stack": {
    bestFor: ["approval confirmation", "background completion messaging", "non-blocking feedback"],
    relevanceDelta: 4,
  },
  "toast-system-variants": {
    bestFor: ["status confirmation", "async operation feedback"],
    relevanceDelta: 4,
  },
  "command-palette": {
    bestFor: ["power-user lookup", "jump actions", "quick status changes"],
    relevanceDelta: 5,
  },
  "date-range-input": {
    bestFor: ["report scoping", "reconciliation windows", "ops time filters"],
    relevanceDelta: 6,
  },
};

const derivedSources = {
  selectionBar: `export function SelectionBar() {
  return (
    <div className="sticky bottom-4 z-20 mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] font-semibold text-white">12 selected</span>
        <div className="text-sm font-medium text-neutral-900">Bulk action mode</div>
        <div className="text-xs text-neutral-500">Review, assign, export, or approve the current selection.</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-9 rounded-lg border border-neutral-200 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50">Assign</button>
        <button className="h-9 rounded-lg border border-neutral-200 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50">Export CSV</button>
        <button className="h-9 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-700">Approve</button>
      </div>
    </div>
  );
}`,
  decisionPanel: `export function DecisionPanel() {
  return (
    <aside className="flex h-full w-full max-w-sm flex-col border-l border-neutral-200 bg-white">
      <div className="border-b border-neutral-100 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Decision</div>
        <h2 className="mt-1 text-lg font-semibold text-neutral-950">Transaction review</h2>
      </div>
      <div className="flex-1 space-y-4 overflow-auto px-5 py-5">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Risk signal</div>
          <p className="mt-1 text-sm text-amber-800">Amount exceeds the expected variance for this vendor by 18%.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-600">Decision note</label>
          <textarea className="min-h-[140px] w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none" placeholder="Explain why this row is approved, escalated, or sent back." />
        </div>
      </div>
      <div className="border-t border-neutral-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <button className="h-10 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700">Reject</button>
          <button className="h-10 rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700">Request info</button>
          <button className="ml-auto h-10 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white">Approve</button>
        </div>
      </div>
    </aside>
  );
}`,
  dialog: `export function OperationalDecisionDialog() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-xl rounded-xl border border-neutral-200 bg-white shadow-2xl">
        <div className="border-b border-neutral-100 px-6 py-4">
          <div className="text-lg font-semibold text-neutral-950">Approve 12 transactions</div>
          <p className="mt-1 text-sm text-neutral-500">This confirms the selected rows and releases them to settlement.</p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">Review the totals, note any exceptions, and choose the decision outcome.</div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-600">Decision note</label>
            <textarea className="min-h-[120px] w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-neutral-100 px-6 py-4">
          <button className="h-9 rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700">Cancel</button>
          <button className="h-9 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700">Reject all</button>
          <button className="h-9 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white">Approve selection</button>
        </div>
      </div>
    </div>
  );
}`,
};

let cachedBundle: Record<string, unknown> | null = null;

function cloneBundle(bundle: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(bundle)) as Record<string, unknown>;
}

function tokenizeScenario(request: AgentBundleRequest): string[] {
  return uniqueStrings(
    [
      request.scenario,
      request.interfaceType || "",
      ...(request.priorities || []),
      ...(request.constraints || []),
      ...(request.existingSurfaceSignals || []),
    ]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2)
  );
}

function buildRequestHintText(request: AgentBundleRequest): string {
  return [
    request.scenario,
    request.interfaceType || "",
    request.taskType || "",
    request.desiredOutcome || "",
    ...(request.priorities || []),
    ...(request.constraints || []),
    ...(request.currentProblems || []),
    ...(request.existingSurfaceSignals || []),
    request.platform || "",
    request.densityPreference || "",
  ]
    .filter(Boolean)
    .join(" ");
}

function detectIntents(request: AgentBundleRequest) {
  const haystack = buildRequestHintText(request);
  const scored = Object.entries(intentProfiles)
    .map(([name, profile]) => {
      const score = profile.matchers.reduce((total, matcher) => total + (matcher.test(haystack) ? 1 : 0), 0);
      return { name: name as AgentIntentName, profile, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  return scored.length > 0
    ? scored
    : [
        {
          name: "queue-ops" as AgentIntentName,
          profile: intentProfiles["queue-ops"],
          score: 1,
        },
      ];
}

function buildMissingInputs(request: AgentBundleRequest): string[] {
  const missing: string[] = [];
  if (!request.interfaceType) {
    missing.push("No explicit interfaceType was provided, so the endpoint inferred the surface from the scenario text.");
  }
  if (!request.priorities || request.priorities.length === 0) {
    missing.push("No priorities were provided, so the endpoint defaulted to intent-driven operational priorities.");
  }
  if (!request.currentProblems || request.currentProblems.length === 0) {
    missing.push("No currentProblems were provided, so failure prevention is based on common operational UI failure modes rather than the current product's exact issues.");
  }
  if (!request.existingSurfaceSignals || request.existingSurfaceSignals.length === 0) {
    missing.push("No existingSurfaceSignals were provided, so the plan cannot preserve or intentionally replace specific current UI structures.");
  }
  return missing;
}

function scoreMatchers(text: string, matchers: RegExp[]): number {
  return matchers.reduce((total, matcher) => total + (matcher.test(text) ? 1 : 0), 0);
}

const broadPromptMatchers = [
  /\bdashboard\b/i,
  /\badmin\b/i,
  /\bportal\b/i,
  /\bapp\b/i,
  /\bpage\b/i,
  /\bui\b/i,
  /\bscreen\b/i,
  /\bbusiness\b/i,
  /\bmodern\b/i,
  /\bclean\b/i,
  /\bgood\b/i,
  /\bnice\b/i,
];

const specificRouteEvidenceMatchers = [
  /\bqueue\b/i,
  /\bapprove\b/i,
  /\breject\b/i,
  /\breview\b/i,
  /\bassign\b/i,
  /\bworkflow\b/i,
  /\bpolicy\b/i,
  /\bcompliance\b/i,
  /\bpermission\b/i,
  /\brole\b/i,
  /\btransaction\b/i,
  /\breconciliation\b/i,
  /\bledger\b/i,
  /\bpayout\b/i,
  /\bpayment\b/i,
  /\bexport\b/i,
  /\baudit\b/i,
  /\blog\b/i,
  /\btimeline\b/i,
  /\bticket\b/i,
  /\bcase\b/i,
  /\bclaim\b/i,
  /\bdispute\b/i,
  /\bsupport\b/i,
  /\bmonitoring\b/i,
  /\bstatus\b/i,
  /\balert\b/i,
  /\bdocs\b/i,
  /\bdocumentation\b/i,
  /\bcheckout\b/i,
  /\bstorefront\b/i,
  /\bworkspace\b/i,
  /\bassistant\b/i,
  /\bartifact\b/i,
  /\bprompt\b/i,
  /\bchat\b/i,
  /\bonboarding\b/i,
  /\blogin\b/i,
  /\bsignup\b/i,
  /\bdeveloper\b/i,
  /\beditor\b/i,
  /\bterminal\b/i,
  /\bconsole\b/i,
];

function tokenizeQuestion(text: string) {
  return text.split(/[^a-z0-9]+/).filter(Boolean);
}

function createUnknownArchetype(summary: string): AgentQuestionArchetype {
  return {
    id: "unknown",
    label: "Unknown / Mixed Surface",
    supportLevel: "low",
    summary,
    matchers: [],
    sectors: [],
  };
}

function shouldDowngradeToUnknownRoute(text: string, args: {
  chosenArchetypeId: string;
  archetypeScore: number;
  sectorScore: number;
}) {
  const tokens = tokenizeQuestion(text);
  const broadSignalCount = scoreMatchers(text, broadPromptMatchers);
  const specificSignalCount = scoreMatchers(text, specificRouteEvidenceMatchers);
  const isThinPrompt = tokens.length <= 24;
  const isGenericPrompt = broadSignalCount > 0 && specificSignalCount === 0;
  const weakInternalGuess = args.chosenArchetypeId === "internal-operations" && args.archetypeScore <= 2 && args.sectorScore === 0;

  if (weakInternalGuess && isThinPrompt && isGenericPrompt) {
    return true;
  }

  return args.archetypeScore <= 1 && args.sectorScore === 0 && isThinPrompt && isGenericPrompt;
}

function classifyAgentQuestion(question: string): AgentQuestionClassification {
  const normalized = question.toLowerCase();
  const scoredArchetypes = agentQuestionArchetypes
    .map((archetype) => ({ archetype, score: scoreMatchers(normalized, archetype.matchers) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  const chosenArchetype = scoredArchetypes[0]?.archetype || createUnknownArchetype("The question is too broad or mixed to map cleanly onto a supported surface family.");
  const archetypeScore = scoredArchetypes[0]?.score || 0;

  const scoredSectors = chosenArchetype.sectors
    .map((sector) => ({ sector, score: scoreMatchers(normalized, sector.matchers) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  const chosenSector = scoredSectors[0]?.sector || null;
  const sectorScore = scoredSectors[0]?.score || 0;
  const shouldDowngrade = chosenArchetype.id !== "unknown" && shouldDowngradeToUnknownRoute(normalized, {
    chosenArchetypeId: chosenArchetype.id,
    archetypeScore,
    sectorScore,
  });

  if (shouldDowngrade) {
    return {
      archetype: createUnknownArchetype("The request is too generic to route safely without inventing a surface family."),
      archetypeScore: 0,
      sector: null,
      sectorScore: 0,
      confidence: 0.31,
    };
  }

  const confidence = Math.min(
    0.97,
    chosenArchetype.id === "unknown"
      ? 0.34
      : 0.42 + archetypeScore * 0.12 + (chosenSector ? sectorScore * 0.07 : 0)
  );

  return {
    archetype: chosenArchetype,
    archetypeScore,
    sector: chosenSector,
    sectorScore,
    confidence,
  };
}

function pickQuestionCategories(classification: ReturnType<typeof classifyAgentQuestion>): string[] {
  if (classification.sector) {
    return classification.sector.priorityCategories;
  }
  switch (classification.archetype.id) {
    case "internal-operations":
      return ["App Shells", "Tables", "Data Density", "Inputs", "Navigation", "Feedback"];
    case "landing-page":
      return ["Layout", "Buttons", "Navigation", "Data Display", "Empty States"];
    case "product-application":
      return ["App Shells", "Layout", "Navigation", "Inputs", "Feedback", "Data Display"];
    case "developer-tool":
      return ["App Shells", "Navigation", "Data Density", "Inputs", "Tables"];
    default:
      return ["App Shells", "Layout", "Inputs", "Navigation"];
  }
}

function pickQuestionDesignProfile(classification: ReturnType<typeof classifyAgentQuestion>): DesignProfile | null {
  const archetypeDefaults: Record<string, string> = {
    "internal-operations": "operational-compact",
    "landing-page": "marketing-editorial",
    "product-application": "product-utility",
    "docs-knowledge": "docs-knowledge",
    "commerce-marketplace": "commerce-showcase",
    "conversion-funnel": "marketing-editorial",
    "developer-tool": "developer-dense",
  };

  const profileId = classification.sector?.designProfileId || archetypeDefaults[classification.archetype.id];
  return profileId ? designProfiles[profileId] || null : null;
}

function normalizeLookup(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function collectLooseContextStrings(context?: Record<string, unknown> | null) {
  if (!context) {
    return [] as string[];
  }

  const knownKeys = new Set([
    "summary",
    "problemStatement",
    "routingIntent",
    "handoff",
    "originalPrompt",
    "userComplaint",
    "transcript",
    "capturedAt",
    "primaryObject",
    "agentNotes",
    "userRoles",
    "dataSources",
    "mutations",
    "timelineMoments",
    "knownProblems",
    "existingSurfaceSignals",
    "desiredResources",
  ]);

  const extras: string[] = [];

  for (const [key, value] of Object.entries(context)) {
    if (knownKeys.has(key) || value == null) {
      continue;
    }

    if (typeof value === "string" && value.trim()) {
      extras.push(`${key}: ${value}`);
      continue;
    }

    if (Array.isArray(value)) {
      const stringValues = value.filter((entry): entry is string => typeof entry === "string" && Boolean(entry.trim()));
      if (stringValues.length > 0) {
        extras.push(`${key}: ${stringValues.join(", ")}`);
      }
      continue;
    }

    if (typeof value === "object") {
      try {
        extras.push(`${key}: ${JSON.stringify(value)}`);
      } catch {
        // Ignore non-serializable context fragments.
      }
    }
  }

  return extras;
}

function buildQuestionPrompt(request: AgentQuestionRequest) {
  return uniqueStrings([
    request.question || request.prompt || "",
    request.goal || "",
    request.routeHint || "",
    request.context || "",
    request.agentContextSummary || "",
  ]).join(". ");
}

function buildPortableQuestionContextDigest(request: AgentQuestionRequest) {
  const attached = Boolean(request.goal || request.routeHint || request.context || request.agentContextSummary);
  if (!attached) {
    return null;
  }

  return {
    attached: true,
    goal: request.goal || null,
    routeHint: request.routeHint || null,
    context: request.context || null,
    agentContextSummary: request.agentContextSummary || null,
  };
}

function findArchetypeByLookup(value?: string | null): AgentQuestionArchetype | null {
  if (!value) {
    return null;
  }

  const normalized = normalizeLookup(value);
  return agentQuestionArchetypes.find((archetype) => {
    const archetypeId = normalizeLookup(archetype.id);
    const label = normalizeLookup(archetype.label);
    return archetypeId === normalized || label === normalized || label.includes(normalized) || normalized.includes(archetypeId);
  }) || null;
}

function findSectorByLookup(value?: string | null, preferredArchetype?: AgentQuestionArchetype | null) {
  if (!value) {
    return null;
  }

  const normalized = normalizeLookup(value);
  const searchPool = preferredArchetype
    ? [{ archetype: preferredArchetype, sectors: preferredArchetype.sectors }]
    : agentQuestionArchetypes.map((archetype) => ({ archetype, sectors: archetype.sectors }));

  for (const pool of searchPool) {
    const sector = pool.sectors.find((candidate) => {
      const sectorId = normalizeLookup(candidate.id);
      const label = normalizeLookup(candidate.label);
      const route = normalizeLookup(candidate.route);
      return sectorId === normalized || route === normalized || label === normalized || label.includes(normalized) || normalized.includes(sectorId);
    });

    if (sector) {
      return { archetype: pool.archetype, sector };
    }
  }

  return null;
}

function buildResolutionPrompt(request: AgentResolutionRequest): string {
  const layoutNeeds = getLayoutNeeds(request);
  const workspaceModules = getWorkspaceModules(request);

  return uniqueStrings([
    request.question || "",
    request.prompt || "",
    request.goal || "",
    request.surfaceType || "",
    request.sector || "",
    request.route || "",
    request.constraints?.visualPosture || "",
    request.context?.summary || "",
    request.context?.problemStatement || "",
    request.context?.routingIntent || "",
    request.context?.handoff || "",
    request.context?.originalPrompt || "",
    request.context?.userComplaint || "",
    request.context?.transcript || "",
    request.context?.primaryObject || "",
    ...(request.context?.agentNotes || []),
    ...(request.context?.userRoles || []),
    ...(request.context?.dataSources || []),
    ...(request.context?.mutations || []),
    ...(request.context?.timelineMoments || []),
    ...(request.constraints?.avoid || []),
    ...(request.context?.knownProblems || []),
    ...(request.context?.observedAsyncProblems || []),
    ...(request.context?.existingSurfaceSignals || []),
    ...(request.context?.visibleModes || []),
    ...(request.context?.competingControls || []),
    ...(request.context?.transitionsNeedingCoverage || []),
    ...(request.context?.desiredResources || []),
    ...collectLooseContextStrings(request.context as Record<string, unknown> | undefined),
    ...layoutNeeds,
    ...workspaceModules,
  ]).join(". ");
}

function resolveResolutionClassification(request: AgentResolutionRequest) {
  const compiledQuestion = buildResolutionPrompt(request);
  const inferred = classifyAgentQuestion(compiledQuestion || request.question || request.prompt || request.goal || "internal operations workbench");

  let archetype = inferred.archetype;
  let sector = inferred.sector;

  const explicitArchetype = findArchetypeByLookup(request.surfaceType);
  if (explicitArchetype) {
    archetype = explicitArchetype;
  }

  const explicitSector = findSectorByLookup(request.sector, archetype.id !== "unknown" ? archetype : null);
  if (explicitSector) {
    archetype = explicitSector.archetype;
    sector = explicitSector.sector;
  }

  const requestedRoute = request.route;
  if (!sector && requestedRoute) {
    sector = archetype.sectors.find((candidate) => normalizeLookup(candidate.route) === normalizeLookup(requestedRoute)) || sector;
  }

  const route = requestedRoute || sector?.route || archetype.id;
  const hasExplicitSignals = Boolean(request.surfaceType || request.sector || request.route);
  const confidence = hasExplicitSignals ? 0.94 : inferred.confidence;

  return {
    archetype,
    sector,
    route,
    confidence,
    compiledQuestion,
  };
}

function buildResolutionBundleRequest(request: AgentResolutionRequest, classification: ReturnType<typeof resolveResolutionClassification>): AgentBundleRequest {
  const layoutNeeds = getLayoutNeeds(request);
  const workspaceModules = getWorkspaceModules(request);
  const contextProblems = uniqueStrings([
    request.context?.userComplaint || "",
    ...(request.context?.knownProblems || []),
    ...(request.context?.observedAsyncProblems || []),
    ...(request.context?.competingControls || []),
  ]).slice(0, 12);

  return {
    scenario: classification.compiledQuestion || request.question || request.prompt || request.goal || "internal operations workbench",
    interfaceType: request.surfaceType || classification.archetype.id,
    taskType: "redesign",
    desiredOutcome: request.goal || "Resolve precise component recommendations for an internal company portal.",
    platform: request.platform,
    densityPreference: request.constraints?.density,
    priorities: uniqueStrings([
      classification.archetype.label,
      classification.sector?.label || "",
      classification.route,
      ...(request.context?.visibleModes || []),
      ...(request.context?.transitionsNeedingCoverage || []),
      ...(request.context?.desiredResources || []),
      ...layoutNeeds,
      ...workspaceModules,
    ]).slice(0, 12),
    constraints: uniqueStrings([
      request.constraints?.visualPosture || "",
      ...(request.constraints?.avoid || []),
    ]).slice(0, 12),
    currentProblems: contextProblems.length > 0 ? contextProblems : undefined,
    existingSurfaceSignals: uniqueStrings([
      request.surfaceType || "",
      request.sector || "",
      request.route || "",
      ...(request.context?.existingSurfaceSignals || []),
      ...layoutNeeds,
    ]).slice(0, 20),
  };
}

function buildResolutionContextDigest(request: AgentResolutionRequest) {
  if (!request.context) {
    return null;
  }

  const agentNotes = request.context.agentNotes || [];
  const userRoles = request.context.userRoles || [];
  const dataSources = request.context.dataSources || [];
  const mutations = request.context.mutations || [];
  const timelineMoments = request.context.timelineMoments || [];
  const knownProblems = request.context.knownProblems || [];
  const observedAsyncProblems = request.context.observedAsyncProblems || [];
  const existingSurfaceSignals = request.context.existingSurfaceSignals || [];
  const visibleModes = request.context.visibleModes || [];
  const competingControls = request.context.competingControls || [];
  const transitionsNeedingCoverage = request.context.transitionsNeedingCoverage || [];
  const desiredResources = request.context.desiredResources || [];

  const looseContextFields = Object.keys(request.context).filter((key) => ![
    "summary",
    "problemStatement",
    "routingIntent",
    "handoff",
    "originalPrompt",
    "userComplaint",
    "transcript",
    "capturedAt",
    "primaryObject",
    "agentNotes",
    "userRoles",
    "dataSources",
    "mutations",
    "timelineMoments",
    "knownProblems",
    "observedAsyncProblems",
    "existingSurfaceSignals",
    "visibleModes",
    "competingControls",
    "transitionsNeedingCoverage",
    "desiredResources",
  ].includes(key));

  const summary = uniqueStrings([
    request.context.summary ? "Portable context summary attached." : "",
    request.context.problemStatement ? "Problem statement attached." : "",
    request.context.routingIntent ? "Routing intent attached." : "",
    request.context.handoff ? "Agent handoff note attached." : "",
    request.context.originalPrompt ? "Original prompt captured." : "",
    request.context.userComplaint ? "Complaint context captured." : "",
    request.context.transcript ? "Transcript excerpt available." : "",
    request.context.capturedAt ? `Captured at ${request.context.capturedAt}.` : "",
    request.context.primaryObject ? `Primary object noted as ${request.context.primaryObject}.` : "",
    agentNotes.length > 0 ? "Agent notes attached." : "",
    userRoles.length > 0 ? "User roles attached." : "",
    dataSources.length > 0 ? "Data-source notes attached." : "",
    mutations.length > 0 ? "Mutation notes attached." : "",
    timelineMoments.length > 0 ? "Timeline moments attached." : "",
    observedAsyncProblems.length > 0 ? "Async-state issues attached." : "",
    visibleModes.length > 0 ? "Visible modes attached." : "",
    competingControls.length > 0 ? "Competing controls attached." : "",
    transitionsNeedingCoverage.length > 0 ? "Transition coverage targets attached." : "",
    looseContextFields.length > 0 ? `Additional custom context fields: ${looseContextFields.join(", ")}.` : "",
  ]).join(" ");

  return {
    summary: summary || "Structured context was attached to the request.",
    contextSummary: request.context.summary || null,
    problemStatement: request.context.problemStatement || null,
    routingIntent: request.context.routingIntent || null,
    handoff: request.context.handoff || null,
    originalPrompt: request.context.originalPrompt || null,
    userComplaint: request.context.userComplaint || null,
    transcriptIncluded: Boolean(request.context.transcript),
    capturedAt: request.context.capturedAt || null,
    primaryObject: request.context.primaryObject || null,
    agentNotes,
    userRoles,
    dataSources,
    mutations,
    timelineMoments,
    knownProblems,
    observedAsyncProblems,
    existingSurfaceSignals,
    visibleModes,
    competingControls,
    transitionsNeedingCoverage,
    desiredResources,
    customContextFields: looseContextFields,
  };
}

function pickComponentByMatchers(
  components: Array<Record<string, any>>,
  matchers: Array<(component: Record<string, any>) => boolean>,
  fallback?: () => Record<string, any> | undefined,
) {
  for (const matcher of matchers) {
    const match = components.find(matcher);
    if (match) {
      return match;
    }
  }

  return fallback ? fallback() : undefined;
}

function inferResolutionLayoutRole(component: Record<string, any>, roleHint: string): string {
  if (roleHint) {
    return roleHint;
  }

  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();
  if (/table|grid|queue/.test(haystack)) {
    return "primary work surface";
  }
  if (/toolbar|filter|chip|date|command/.test(haystack)) {
    return "scope and filter layer";
  }
  if (/sidebar|nav/.test(haystack)) {
    return "navigation frame";
  }
  if (/detail|panel|inspector|drawer/.test(haystack)) {
    return "right context rail";
  }
  if (/toast|notification|validation/.test(haystack)) {
    return "system feedback layer";
  }
  if (/loading|empty/.test(haystack)) {
    return "recovery and async state layer";
  }
  return "supporting operational module";
}

function inferResolutionAnatomy(component: Record<string, any>): string[] {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();

  if (/table|grid|queue/.test(haystack)) {
    return ["column labels", "row meta", "status badges", "inline row actions", "bulk selection", "pagination or footer summary"];
  }
  if (/toolbar|filter|chip|date|command/.test(haystack)) {
    return ["search field", "saved view or scope switcher", "active filter chips", "date or range control", "clear/reset action", "secondary utility actions"];
  }
  if (/sidebar|nav/.test(haystack)) {
    return ["section groups", "active indicator", "counts or badges", "collapse behavior", "utility footer actions"];
  }
  if (/header/.test(haystack)) {
    return ["page title", "queue counts", "aging or status metrics", "primary action", "secondary utilities"];
  }
  if (/detail|panel|inspector|decision/.test(haystack)) {
    return ["title and meta", "status summary", "evidence or detail blocks", "notes area", "action footer"];
  }
  if (/toast|notification|validation/.test(haystack)) {
    return ["status icon", "title", "supporting detail", "dismiss or undo action"];
  }
  if (/loading/.test(haystack)) {
    return ["persistent shell frame", "placeholder rows or panels", "stable toolbar footprint"];
  }
  if (/empty/.test(haystack)) {
    return ["state title", "explanation", "next-step action", "clear-filters or retry path"];
  }

  return ["title", "meta", "actions", "supporting content"];
}

function inferResolutionStates(component: Record<string, any>): Array<{ name: string; usage: string }> {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();

  if (/table|grid|queue/.test(haystack)) {
    return [
      { name: "loading", usage: "Preserve column structure and row rhythm while data hydrates." },
      { name: "loading-with-stale", usage: "Keep prior rows visible but subdued when refresh is fast enough to preserve orientation." },
      { name: "transition", usage: "Swap only the data region while chrome, filters, and selection context stay anchored." },
      { name: "filtered", usage: "Keep active filters visible above the table and reflect them in counts." },
      { name: "selected", usage: "Highlight the active row without overpowering the bulk-selection state." },
      { name: "bulk-selected", usage: "Reveal the selection bar only when rows are selected." },
      { name: "empty", usage: "Explain whether the queue is truly empty or simply filtered to zero results." },
      { name: "success", usage: "Reflect approvals or updates inline and through restrained global feedback." },
    ];
  }
  if (/tab|segmented|toggle/.test(haystack)) {
    return [
      { name: "default", usage: "Keep the active mode visible without requiring a second control to explain it." },
      { name: "switching", usage: "Commit the active tab state immediately, then load content without blanking the shell." },
      { name: "loading", usage: "Show content-region loading or a tab-level busy cue rather than replacing the tabs themselves." },
      { name: "disabled", usage: "Suppress unavailable modes without hiding the current scope language." },
    ];
  }
  if (/toolbar|filter|chip|date|command/.test(haystack)) {
    return [
      { name: "default", usage: "Search and filters remain visible at rest." },
      { name: "filtered", usage: "Show active chips and changed scope immediately." },
      { name: "disabled", usage: "Disable actions that require selection or valid scope." },
      { name: "loading", usage: "Preserve toolbar height while queries refresh." },
      { name: "loading-with-filter-locked", usage: "Keep the active filter state visible while dependent data refreshes." },
    ];
  }
  if (/detail|panel|inspector|decision/.test(haystack)) {
    return [
      { name: "loading", usage: "Keep the panel skeletonized while row detail changes." },
      { name: "loading-with-scroll-preserved", usage: "Refresh detail content without ejecting the user from the rail or resetting scroll." },
      { name: "empty", usage: "Show a neutral placeholder until a row is selected." },
      { name: "disabled", usage: "Hold irreversible actions until required context is present." },
      { name: "success", usage: "Confirm the decision without ejecting the user from the workbench." },
      { name: "error", usage: "Surface failed mutation or validation issues inside the panel." },
    ];
  }
  if (/toast|notification|validation/.test(haystack)) {
    return [
      { name: "success", usage: "Use for approvals, saves, and background completion." },
      { name: "warning", usage: "Use for partial completion, policy caution, or risk flags." },
      { name: "error", usage: "Use for blocked actions or failed updates with a retry path." },
    ];
  }

  return [
    { name: "default", usage: "Baseline operational state." },
    { name: "loading", usage: "Preserve layout while the region updates." },
    { name: "transition", usage: "Keep the region anchored while content swaps or refreshes." },
    { name: "disabled", usage: "Suppress unavailable actions without hiding them." },
  ];
}

function inferResolutionDataShapes(component: Record<string, any>): string[] {
  const haystack = `${component.slug} ${component.title} ${component.category} ${component.dataDensityRole || ""}`.toLowerCase();
  const shapes: string[] = [];

  if (/table|grid|queue/.test(haystack)) {
    shapes.push("queues", "tables", "master-detail workspaces");
  }
  if (/metric|kpi|dashboard/.test(haystack)) {
    shapes.push("metrics", "summary bands");
  }
  if (/detail|inspector|panel/.test(haystack)) {
    shapes.push("master-detail", "threaded assistant panels", "inspection flows");
  }
  if (/command|toolbar|filter|date/.test(haystack)) {
    shapes.push("command", "operations", "scoped filtering");
  }
  if (/timeline|log|activity/.test(haystack)) {
    shapes.push("audit trails", "event history");
  }

  return uniqueStrings(shapes.length > 0 ? shapes : ["general operational modules"]);
}

function inferResolutionVariants(component: Record<string, any>, density: string): string[] {
  const haystack = `${component.slug} ${component.title}`.toLowerCase();
  const variants = [
    `${density} density`,
  ];

  if (/table|grid|queue/.test(haystack)) {
    variants.push("sticky header", "inline row actions", "selection bar", "pagination or virtualized footer");
  }
  if (/toolbar|filter|chip|date|command/.test(haystack)) {
    variants.push("sticky toolbar", "saved views", "active filter chips");
  }
  if (/detail|panel|inspector|decision/.test(haystack)) {
    variants.push("persistent right rail", "drawer fallback for edit flows", "footer-pinned actions");
  }
  if (/toast|notification/.test(haystack)) {
    variants.push("auto-dismiss success", "pinned warning", "actionable error");
  }

  return uniqueStrings(variants);
}

function inferResolutionTransitionBehavior(component: Record<string, any>): Record<string, unknown> | undefined {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();

  if (/table|grid|queue/.test(haystack)) {
    return {
      type: "skeleton-preserve",
      durationMs: 160,
      shouldPreserveScroll: true,
      shouldPreserveFocus: false,
      shouldPreserveSelection: true,
    };
  }
  if (/tab|segmented|toggle/.test(haystack)) {
    return {
      type: "instant-or-skeleton-ready",
      durationMs: 120,
      shouldPreserveScroll: true,
      shouldPreserveFocus: true,
      shouldPreserveSelection: false,
    };
  }
  if (/toolbar|filter|chip|date|command/.test(haystack)) {
    return {
      type: "stale-with-overlay",
      durationMs: 120,
      shouldPreserveScroll: true,
      shouldPreserveFocus: true,
      shouldPreserveSelection: false,
    };
  }
  if (/detail|panel|inspector|decision|thread/.test(haystack)) {
    return {
      type: "title-meta-skeleton",
      durationMs: 180,
      shouldPreserveScroll: true,
      shouldPreserveFocus: true,
      shouldPreserveSelection: true,
    };
  }
  if (/loading|skeleton/.test(haystack)) {
    return {
      type: "placeholder-region",
      durationMs: 0,
      shouldPreserveScroll: true,
      shouldPreserveFocus: false,
      shouldPreserveSelection: false,
    };
  }

  return {
    type: "preserve-shell",
    durationMs: 140,
    shouldPreserveScroll: true,
    shouldPreserveFocus: true,
    shouldPreserveSelection: false,
  };
}

function inferResolutionControlWarnings(component: Record<string, any>): string[] | undefined {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();
  const warnings = uniqueStrings([
    /dropdown|select/.test(haystack)
      ? "Verify this control is not duplicating a visible tab or segmented mode switch nearby."
      : "",
    /tab|segmented|toggle/.test(haystack)
      ? "Do not mirror the same mode set inside a second dropdown or focus selector."
      : "",
    /loading|skeleton/.test(haystack)
      ? "Use this to preserve structure, not to replace the entire shell with a blank wait state."
      : "",
  ]);

  return warnings.length > 0 ? warnings : undefined;
}

type OrchestrationConfidenceMode = "proceed" | "proceed_with_cautions" | "ask_for_truth";
type OrchestrationImplementationPosture = "adapt_from_reference" | "use_as_shell_anchor" | "use_as_row_grammar" | "use_as_state_pattern" | "scaffold_honestly_first";
type OrchestrationDeliveryMode = "reference_only" | "reference_plus_source" | "reference_plus_adaptation_guidance";

function toOrchestrationId(value?: string | null) {
  return value ? value.replace(/-/g, "_") : null;
}

function getPrimaryPrompt(request: { question?: string; prompt?: string; goal?: string }) {
  return request.question || request.prompt || request.goal || "";
}

function getLayoutNeeds(request: { layoutNeeds?: string[] }) {
  return request.layoutNeeds || [];
}

function getWorkspaceModules(request: { workspaceModules?: string[] }) {
  return request.workspaceModules || [];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function humanizeIdentifier(value?: string | null) {
  return value ? value.replace(/[_-]+/g, " ").trim() : "";
}

const workflowAuditPromptLabels = [
  "Primary user",
  "Primary object",
  "Data sources",
  "Allowed mutations",
  "Lifecycle",
  "Target surface under review",
  "Target surface",
  "What already works",
  "Current problems",
  "What currently feels wrong",
  "Relevant recent changes",
  "What changed recently",
  "What must not be lost",
];

function extractPromptField(prompt: string, labels: string[]) {
  const normalizedPrompt = prompt.trim();
  if (!normalizedPrompt) {
    return "";
  }

  const lowerPrompt = normalizedPrompt.toLowerCase();

  for (const label of labels) {
    const token = `${label.toLowerCase()}:`;
    const startIndex = lowerPrompt.indexOf(token);
    if (startIndex < 0) {
      continue;
    }

    const contentStart = startIndex + token.length;
    let contentEnd = normalizedPrompt.length;

    for (const nextLabel of workflowAuditPromptLabels) {
      const nextToken = `${nextLabel.toLowerCase()}:`;
      const nextIndex = lowerPrompt.indexOf(nextToken, contentStart);
      if (nextIndex >= 0 && nextIndex < contentEnd) {
        contentEnd = nextIndex;
      }
    }

    const extracted = normalizedPrompt
      .slice(contentStart, contentEnd)
      .trim()
      .replace(/^[.\s]+|[.\s]+$/g, "")
      .replace(/\s+/g, " ");

    if (extracted) {
      return extracted;
    }
  }

  return "";
}

function buildWorkflowAuditBulletList(candidates: string[], count: number, fallbacks: string[] = []) {
  const bullets = uniqueStrings(
    candidates
      .map((value) => value.trim())
      .filter(Boolean),
  );

  for (const fallback of fallbacks) {
    if (bullets.length >= count) {
      break;
    }

    const nextValue = fallback.trim();
    if (nextValue && !bullets.includes(nextValue)) {
      bullets.push(nextValue);
    }
  }

  return bullets.slice(0, count);
}

function buildWorkflowAuditPacket(
  request: AgentResolutionRequest,
  classification: ReturnType<typeof resolveResolutionClassification>,
) {
  const prompt = getPrimaryPrompt(request);
  const userRoles = request.context?.userRoles || [];
  const dataSources = request.context?.dataSources || [];
  const mutations = request.context?.mutations || [];
  const timelineMoments = request.context?.timelineMoments || [];

  return {
    primaryUser: extractPromptField(prompt, ["Primary user"]) || userRoles.join(", "),
    primaryObject: extractPromptField(prompt, ["Primary object"]) || request.context?.primaryObject || "",
    dataSources: extractPromptField(prompt, ["Data sources"]) || dataSources.join(", "),
    allowedMutations: extractPromptField(prompt, ["Allowed mutations"]) || mutations.join(", "),
    lifecycle: extractPromptField(prompt, ["Lifecycle"]) || timelineMoments.join(", "),
    targetSurface: extractPromptField(prompt, ["Target surface under review", "Target surface"])
      || classification.sector?.label
      || humanizeIdentifier(classification.route),
    whatAlreadyWorks: extractPromptField(prompt, ["What already works"]),
    currentProblems: extractPromptField(prompt, ["Current problems", "What currently feels wrong"]),
    recentChanges: extractPromptField(prompt, ["Relevant recent changes", "What changed recently"]),
    whatMustNotBeLost: extractPromptField(prompt, ["What must not be lost"]),
  };
}

function inferOrchestrationConfidenceMode(confidence: number, operationalTruthIntelligence: Record<string, any>): OrchestrationConfidenceMode {
  if (operationalTruthIntelligence?.thresholdAssessment?.shouldAskFirst) {
    return "ask_for_truth";
  }

  if (confidence >= 0.78) {
    return "proceed";
  }

  return "proceed_with_cautions";
}

function extractMissingTruthLabels(operationalTruthIntelligence: Record<string, any>): string[] {
  return ((operationalTruthIntelligence?.missingTruths || []) as Array<Record<string, any>>)
    .map((item) => item.truth)
    .filter((value): value is string => typeof value === "string" && Boolean(value.trim()));
}

function inferDominantTaskSurface(
  classification: ReturnType<typeof resolveResolutionClassification>,
  signalText: string,
  shell: Record<string, any>,
) {
  const haystack = `${classification.route} ${classification.sector?.id || ""} ${signalText}`.toLowerCase();

  if (/kanban|lane|board/.test(haystack)) {
    return "kanban";
  }

  if (/timeline|history|audit log|activity log|event stream/.test(haystack)) {
    return "timeline";
  }

  if (classification.route === "onboarding-flow" || /onboarding|login|sign in|signup|wizard|auth|form/.test(haystack)) {
    return "form_flow";
  }

  if (classification.route === "assistant-workspace") {
    return "detail_workspace";
  }

  if (/queue|triage|review|approval|fulfillment|dispatch|inbox/.test(haystack)) {
    return "queue";
  }

  if (/table|grid|rows|reconciliation|ledger|transaction|audit|statement/.test(haystack)) {
    return "table";
  }

  if (shell.inspector && (classification.route === "operational-workbench" || /detail|inspector|master-detail|two-panel/.test(haystack))) {
    return "two_panel_review";
  }

  if (classification.route === "docs-surface") {
    return "detail_workspace";
  }

  return classification.route === "operational-workbench" ? "table" : "detail_workspace";
}

function inferShellRecommendationId(route: string, dominantTaskSurface: string) {
  if (route === "assistant-workspace") {
    return "assistant_workspace_shell";
  }

  if (dominantTaskSurface === "kanban") {
    return "kanban_lane_shell";
  }

  if (dominantTaskSurface === "queue") {
    return "queue_first_shell";
  }

  if (dominantTaskSurface === "two_panel_review" || dominantTaskSurface === "table") {
    return "two_panel_review";
  }

  if (dominantTaskSurface === "timeline") {
    return "detail_workspace_shell";
  }

  if (dominantTaskSurface === "form_flow") {
    return route === "product-surface" ? "settings_shell" : "form_flow_shell";
  }

  if (route === "operational-workbench") {
    return "operational_dashboard_shell";
  }

  return "detail_workspace_shell";
}

function buildShellRecommendation(args: {
  route: string;
  dominantTaskSurface: string;
  shell: Record<string, any>;
  designProfile: DesignProfile | null;
  confidenceMode: OrchestrationConfidenceMode;
}) {
  const id = inferShellRecommendationId(args.route, args.dominantTaskSurface);
  const shellTitle = args.shell.appShell?.title || args.shell.table?.title || args.shell.inspector?.title || "selected shell";
  const preserve = uniqueStrings([
    /assistant/.test(id) ? "conversation and artifact region ownership" : "dominant work-surface hierarchy",
    args.designProfile?.spacing?.density ? `${args.designProfile.spacing.density} density posture` : "density posture",
    args.dominantTaskSurface === "table" || args.dominantTaskSurface === "queue" ? "row grammar and scan rhythm" : "region ownership and spacing rhythm",
    "flat elevation and border-first grouping",
    "state continuity across loading, empty, and populated modes",
  ]);
  const avoid = uniqueStrings([
    args.route === "operational-workbench" ? "card mosaics competing with the main task surface" : "decorative chrome that competes with the task",
    args.dominantTaskSurface === "queue" || args.dominantTaskSurface === "table" ? "summary-first layouts that demote the queue or table" : "duplicated region purpose",
    args.confidenceMode === "ask_for_truth" ? "invented metrics, statuses, or actions before the operating model is confirmed" : "duplicate controls for the same mode or scope",
  ]);

  return {
    id,
    label: id.replace(/_/g, " "),
    why: `${shellTitle} is the strongest shell anchor because the work reads as ${args.dominantTaskSurface.replace(/_/g, " ")} rather than as a generic dashboard.`,
    preserve,
    avoid,
  };
}

function getComponentSourceMetadata(component: Record<string, any>, deliveryMode: OrchestrationDeliveryMode) {
  const localPath = path.join(repoRoot, "components", `${component.slug}.tsx`);
  const workspacePath = existsSync(localPath) ? `components/${component.slug}.tsx` : null;

  return {
    included: false,
    path: workspacePath,
    available: Boolean(workspacePath),
    sourceUrl: typeof component.sourceUrl === "string" ? component.sourceUrl : null,
    recommended: deliveryMode === "reference_plus_source" && Boolean(workspacePath),
  };
}

function inferComponentDeliveryMode(component: Record<string, any>): OrchestrationDeliveryMode {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();
  const localPath = path.join(repoRoot, "components", `${component.slug}.tsx`);
  const hasLocalSource = existsSync(localPath);

  if (hasLocalSource && /shell|table|toolbar|filter|inspector|detail|sidebar|nav|header|workspace/.test(haystack)) {
    return "reference_plus_source";
  }

  if (/loading|empty|toast|notification|validation|button|badge/.test(haystack)) {
    return "reference_plus_adaptation_guidance";
  }

  return hasLocalSource ? "reference_plus_adaptation_guidance" : "reference_only";
}

function inferComponentImplementationPosture(component: Record<string, any>, confidenceMode: OrchestrationConfidenceMode): OrchestrationImplementationPosture {
  if (confidenceMode === "ask_for_truth") {
    return "scaffold_honestly_first";
  }

  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();
  if (/shell|sidebar|nav|header|workspace|master-detail|three-panel/.test(haystack)) {
    return "use_as_shell_anchor";
  }
  if (/table|grid|queue|timeline|log/.test(haystack)) {
    return "use_as_row_grammar";
  }
  if (/loading|empty|toast|notification|validation|skeleton/.test(haystack)) {
    return "use_as_state_pattern";
  }
  return "adapt_from_reference";
}

function buildComponentPreserveRules(component: Record<string, any>, posture: OrchestrationImplementationPosture): string[] {
  const haystack = `${component.slug} ${component.title} ${component.category}`.toLowerCase();

  if (posture === "use_as_shell_anchor") {
    return [
      "shell structure",
      "density",
      "dominance hierarchy",
      "spacing rhythm",
      "elevation model",
    ];
  }

  if (posture === "use_as_row_grammar") {
    return [
      "row grammar",
      "scan rhythm",
      "state behavior",
      "column or item hierarchy",
      "supporting action placement",
    ];
  }

  if (posture === "use_as_state_pattern") {
    return [
      "state behavior",
      "layout preservation",
      "feedback timing",
      "action clarity",
    ];
  }

  if (/toolbar|filter|chip|segmented|command/.test(haystack)) {
    return [
      "control grouping",
      "active-state clarity",
      "spacing rhythm",
    ];
  }

  return [
    "dominance hierarchy",
    "spacing rhythm",
    "state behavior",
  ];
}

function buildComponentSafeAdaptRules(): string[] {
  return [
    "local color tokens",
    "radius within profile bounds",
    "label wording",
    "minor spacing adjustments for content fit",
    "local icon choice within EXHIBIT rules",
  ];
}

function buildStateRisks(args: {
  transitionStateIntelligence: Record<string, any>;
  operationalTruthIntelligence: Record<string, any>;
}): string[] {
  const duplicateModeConflict = Boolean(args.transitionStateIntelligence?.tabAndModeSwitching?.duplicateModeConflict?.detected);
  const antiPatterns = (args.transitionStateIntelligence?.antiPatterns || []) as string[];
  const thresholdAssessment = args.operationalTruthIntelligence?.thresholdAssessment || {};

  return uniqueStrings([
    duplicateModeConflict ? "Duplicate mode controls will fracture active-state clarity and make transitions feel untrustworthy." : "",
    antiPatterns.some((item) => /blank the content region/i.test(item)) ? "Blanking the content region during refresh will break orientation and row rhythm." : "",
    antiPatterns.some((item) => /hide the active scope/i.test(item)) ? "Hiding active scope during refresh will make stale versus current data hard to read." : "",
    antiPatterns.some((item) => /cursor position|scroll position|focus target/i.test(item)) ? "Async updates risk stealing focus or scroll position if continuity rules are not explicit." : "",
    thresholdAssessment.overall === "partial" ? "Loading, empty, and populated states are still at risk of drifting into filler because the operating model is only partial." : "",
    thresholdAssessment.overall === "unsafe" ? "State behavior will become fake if statuses or transitions are designed before the object, mutation, and timeline truths are confirmed." : "",
  ]).slice(0, 6);
}

function buildCoherenceRisks(args: {
  contextIntelligence: Record<string, any>;
  discoveryIntelligence: Record<string, any>;
}): string[] {
  const investigateFirst = (args.discoveryIntelligence?.investigateFirst || []) as Array<Record<string, any>>;
  const likelyDesignFailures = (args.contextIntelligence?.complaintTranslation?.likelyDesignFailures || []) as string[];
  const ambiguityFlags = (args.contextIntelligence?.ambiguityFlags || []) as string[];

  return uniqueStrings([
    ...investigateFirst.slice(0, 3).map((item) => `${item.area}: ${item.why}`),
    ...likelyDesignFailures.slice(0, 3),
    ...ambiguityFlags
      .filter((item) => /Route confidence|Primary user type|Primary task|thin/i.test(item))
      .slice(0, 2),
  ]).slice(0, 6);
}

function buildImplementationPosture(args: {
  confidenceMode: OrchestrationConfidenceMode;
  shellRecommendation: { id: string } | null;
  dominantTaskSurface: string;
}): OrchestrationImplementationPosture {
  if (args.confidenceMode === "ask_for_truth") {
    return "scaffold_honestly_first";
  }

  if (args.shellRecommendation && /shell|review/.test(args.shellRecommendation.id)) {
    return "use_as_shell_anchor";
  }

  if (args.dominantTaskSurface === "table" || args.dominantTaskSurface === "queue" || args.dominantTaskSurface === "timeline") {
    return "use_as_row_grammar";
  }

  return "adapt_from_reference";
}

function buildGuidance(args: {
  dominantTaskSurface: string;
  shellRecommendation: { id: string } | null;
  confidenceMode: OrchestrationConfidenceMode;
  missingTruth: string[];
  stateRisks: string[];
  coherenceRisks: string[];
}): string[] {
  return uniqueStrings([
    args.shellRecommendation ? `Anchor the page with a ${args.shellRecommendation.id.replace(/_/g, " ")} before adding summaries or supporting chrome.` : "",
    args.dominantTaskSurface === "table" ? "Keep the table as the dominant work surface; move detail and secondary actions into supporting rails." : "",
    args.dominantTaskSurface === "queue" ? "Keep queue scope, counts, and action posture visible in one toolbar instead of scattering them across cards." : "",
    args.dominantTaskSurface === "detail_workspace" ? "Separate the main artifact or conversation region from context intake so the workspace roles stay stable." : "",
    args.confidenceMode === "ask_for_truth" ? "Scaffold honestly first and stop before inventing metrics, statuses, bulk actions, or lifecycle labels." : "",
    args.missingTruth.includes("Primary object") ? "Do not commit row fields, cards, or inspector sections until the primary object is confirmed." : "",
    args.stateRisks[0] || "",
    args.coherenceRisks[0] || "",
  ]).slice(0, 6);
}

function buildDesignProfileResponse(designProfile: DesignProfile | null) {
  return designProfile
    ? {
        id: designProfile.id,
        label: designProfile.label,
        density: designProfile.spacing.density,
        typography: designProfile.typography.body,
        iconLibrary: designProfile.iconSystem.primaryLibrary,
        motion: designProfile.motion.posture,
        elevation: designProfile.colorAndElevation.elevation,
      }
    : null;
}

function buildResolutionComponentSummary(component: Record<string, any>, args: {
  classification: ReturnType<typeof resolveResolutionClassification>;
  density: string;
  roleLabel: string;
  includeAnatomy: boolean;
  includeStateCoverage: boolean;
  includeTransitionGuidance?: boolean;
  confidenceMode?: OrchestrationConfidenceMode;
}): Record<string, unknown> {
  const bestFor = Array.isArray(component.bestFor) ? component.bestFor.slice(0, 3) : [];
  const avoidFor = Array.isArray(component.avoidFor) ? component.avoidFor.slice(0, 4) : [];
  const whyFits = component.whyChosen
    || `${component.title} fits ${args.classification.sector?.label || args.classification.archetype.label} because it supports ${bestFor.join(", ") || "dense repeat operational work"}.`;
  const deliveryMode = inferComponentDeliveryMode(component);
  const implementationPosture = inferComponentImplementationPosture(component, args.confidenceMode || "proceed_with_cautions");
  const source = getComponentSourceMetadata(component, deliveryMode);

  return {
    slug: component.slug,
    title: component.title,
    category: component.category,
    score: component.scenarioRelevanceScore || component.relevanceScore || component.priorityScore || 0,
    whyFits,
    supportedDensity: component.density,
    layoutRole: inferResolutionLayoutRole(component, args.roleLabel),
    keyStates: args.includeStateCoverage ? inferResolutionStates(component) : undefined,
    transitionBehavior: args.includeTransitionGuidance !== false ? inferResolutionTransitionBehavior(component) : undefined,
    anatomy: args.includeAnatomy ? inferResolutionAnatomy(component) : undefined,
    dataShapeCompatibility: inferResolutionDataShapes(component),
    variantGuidance: inferResolutionVariants(component, args.density),
    controlWarnings: args.includeTransitionGuidance !== false ? inferResolutionControlWarnings(component) : undefined,
    avoid: avoidFor,
    deliveryMode,
    implementationPosture,
    preserve: buildComponentPreserveRules(component, implementationPosture),
    safeToAdapt: buildComponentSafeAdaptRules(),
    source,
    sourceIncluded: false,
  };
}

function buildResolutionGroup(args: {
  label: string;
  roleLabel: string;
  primary?: Record<string, any>;
  alternatives: Array<Record<string, any>>;
  classification: ReturnType<typeof resolveResolutionClassification>;
  density: string;
  includeAnatomy: boolean;
  includeStateCoverage: boolean;
  includeTransitionGuidance?: boolean;
}) {
  if (!args.primary) {
    return null;
  }

  const filteredAlternatives = args.alternatives.filter((candidate) => candidate.slug !== args.primary?.slug);
  return {
    category: args.label,
    primary: buildResolutionComponentSummary(args.primary, args),
    alternatives: filteredAlternatives.map((candidate) => buildResolutionComponentSummary(candidate, args)),
    selectionRationale: filteredAlternatives[0]
      ? `${args.primary.title} wins over ${filteredAlternatives[0].title} because it is a tighter fit for the ${args.roleLabel} role in a compact operational workbench.`
      : `${args.primary.title} is the clearest fit for the ${args.roleLabel} role in this route.`,
  };
}

function buildResolutionCompositionPlan(shell: Record<string, any>, request: AgentResolutionRequest) {
  const layoutNeeds = getLayoutNeeds(request).map((value) => value.toLowerCase());
  const shellSignature = `${shell.appShell?.slug || ""} ${shell.table?.slug || ""} ${shell.inspector?.slug || ""}`.toLowerCase();

  if (/assistant|artifact|context-aware/.test(shellSignature)) {
    return uniqueStrings([
      `Use ${shell.appShell?.title || "the selected assistant shell"} as the main conversation frame with a calm history or project rail.`,
      `Keep ${shell.toolbar?.title || "the context strip"} near the composer so the original prompt, complaint, and resource mode stay visible while drafting.`,
      `Treat ${shell.table?.title || "the artifact pane"} as the durable output region for plans, drafts, or structured revisions rather than as a dashboard card.`,
      `Use ${shell.inspector?.title || "the context panel"} to preserve complaint context, routed assets, and what should change next.`,
      "Do not collapse the experience into chat bubbles only; separate conversation from durable work product.",
      `Use ${shell.toast?.title || "toast feedback"} for copy, save, revision, and approval confirmations without breaking the thread.`,
    ]);
  }

  const plan = [
    `Use ${shell.appShell?.title || "the selected app shell"} as the page frame with a persistent left navigation column.`,
    `Place ${shell.topBar?.title || "the top bar"} above ${shell.toolbar?.title || "the filter toolbar"} so title, counts, and scope changes stay visible together.`,
    `Let ${shell.table?.title || "the table"} dominate the center workspace; summary modules stay visually subordinate to it.`,
    `Bind ${shell.inspector?.title || "the inspector"} to the active row and keep it persistent on desktop for inspection and update work.`,
    `Reveal ${shell.selectionBar?.title || "the selection bar"} only when rows are selected so bulk actions do not pollute the default toolbar.`,
    layoutNeeds.includes("drawer for edit flows") || layoutNeeds.includes("drawer")
      ? `Use ${shell.drawer?.title || shell.inspector?.title || "the inspector pattern"} as the drawer reference for edit flows; reserve dialogs for destructive confirmation only.`
      : "Use drawers for edit and export configuration flows; reserve modals for destructive confirmation only.",
    `Use ${shell.toast?.title || "toast feedback"} for non-blocking success and background completion messages.`,
  ];

  return uniqueStrings(plan);
}

function inferResolutionPlatform(
  request: AgentResolutionRequest,
  classification: ReturnType<typeof resolveResolutionClassification>,
): string {
  const layoutNeeds = getLayoutNeeds(request);
  const workspaceModules = getWorkspaceModules(request);

  if (request.platform) {
    return request.platform;
  }

  const combined = [
    request.question || "",
    request.prompt || "",
    request.goal || "",
    ...layoutNeeds,
    ...workspaceModules,
    classification.route,
  ].join(" ").toLowerCase();

  if (/mobile|bottom tab|phone|ios|android/.test(combined)) {
    return "mobile-web";
  }

  if (/electron|desktop app|native desktop/.test(combined)) {
    return "electron";
  }

  if (
    /left navigation|sidebar|right-side inspector|right context rail|three-panel|table-first|workbench|internal-operations|developer-workbench|operational-workbench/.test(combined)
  ) {
    return "desktop-web";
  }

  return "web";
}

function buildHierarchyStarter(designProfile: DesignProfile | null, density: string) {
  if (!designProfile) {
    return {
      pageTitle: "Use one restrained display style for page titles.",
      sectionTitle: "Use compact section headings before every major surface.",
      body: "Use a neutral UI body face for labels and content.",
      tableMeta: "Keep table headers, row meta, and numeric values quieter than titles.",
      rules: [
        "Never leave a page on raw browser typography.",
        `Default to ${density} density until a page proves it needs more space.`,
      ],
    };
  }

  return {
    pageTitle: `Use ${designProfile.typography.display} for page-level anchors only.`,
    sectionTitle: "Use smaller but clear section anchors above tables, rails, and summary bands.",
    body: `Use ${designProfile.typography.body} for labels, controls, and all supporting text.`,
    tableMeta: `Use ${designProfile.typography.mono} for IDs, timestamps, totals, and other scan-heavy values.`,
    rules: [
      "Do not ship pages with default browser heading rhythm or unstructured text blocks.",
      "Titles, section labels, row meta, and numeric values must each occupy distinct hierarchy levels.",
      "Make the work surface obvious before adding decorative emphasis.",
    ],
  };
}

function buildImplementationStarter(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  shell: Record<string, any>;
  density: string;
  platform: string;
  rankedComponents: Array<Record<string, unknown>>;
}) {
  const { request, classification, designProfile, shell, density, platform, rankedComponents } = args;
  const foundationAssets = [
    shell.appShell,
    shell.topBar,
    shell.toolbar,
    shell.table,
    shell.inspector,
    shell.toast,
  ]
    .filter(Boolean)
    .map((component: any) => ({
      role: component.layoutRole,
      slug: component.slug,
      title: component.title,
      why: component.whyFits,
    }));

  return {
    inferredPlatform: platform,
    canStartFromHere: classification.archetype.id !== "unknown",
    foundationSetup: {
      fonts: designProfile
        ? {
            body: designProfile.typography.body,
            display: designProfile.typography.display,
            mono: designProfile.typography.mono,
            rules: designProfile.typography.rules,
          }
        : null,
      spacing: designProfile
        ? {
            density,
            baseGrid: designProfile.spacing.baseGrid,
            sectionGap: designProfile.spacing.sectionGap,
            cardPadding: designProfile.spacing.cardPadding,
            controlGap: designProfile.spacing.controlGap,
            rules: designProfile.spacing.rules,
          }
        : { density },
      hierarchy: buildHierarchyStarter(designProfile, density),
      iconSystem: designProfile
        ? {
            primaryLibrary: designProfile.iconSystem.primaryLibrary,
            defaultSize: designProfile.iconSystem.defaultSize,
            strokeStyle: designProfile.iconSystem.strokeStyle,
            usageRules: designProfile.iconSystem.usageRules,
          }
        : null,
      elevationAndMotion: designProfile
        ? {
            elevation: designProfile.colorAndElevation,
            motion: designProfile.motion,
          }
        : null,
      noRawPageGuardrails: [
        "Never leave page titles, labels, and body text on unstyled browser defaults.",
        "Apply fonts, spacing scale, and hierarchy before swapping page modules.",
        "Do not let empty/loading/error states drop back to plain raw text blocks.",
        "If the primary object is still unknown, stop before inventing KPI cards, filters, or inspector sections.",
        "If the data sources or mutation paths are still unknown, do not ship placeholder counts, fake statuses, or generic action clusters.",
        "Every first pass should establish shell, toolbar, table rhythm, and inspector hierarchy together.",
        "Do not keep a visible tab row and a duplicate dropdown for the same mode set.",
        "Specify loading behavior per region before implementation starts: toolbar, content surface, inspector, and thread pane should not all transition the same way.",
        "Preserve focus targets and scroll anchors during async updates instead of resetting the user to the top of the surface.",
      ],
    },
    firstPassAssets: foundationAssets,
    executionSequence: [
      `Apply the ${classification.route} shell and density system first.`,
      "Install typography, spacing, and icon posture before replacing content modules.",
      "Replace the top bar and filter toolbar before refactoring the main table surface.",
      "Bind the inspector to active-row state and selection state before styling secondary cards.",
      "Resolve tabs, filters, dropdown alternatives, and interaction feedback before polishing decorative details.",
      "Lock per-region transition behavior before polish: decide which regions use skeletons, stale overlays, or instant swaps.",
      "Add toast, loading, and empty-state coverage before considering the page complete.",
    ],
    autoFixTargets: uniqueStrings([
      "fonts and type hierarchy",
      "spacing scale and panel rhythm",
      "header-toolbar-table-inspector composition",
      "icon restraint and action clarity",
      "tabs, filters, and dropdown replacement strategy",
      "interaction feedback and transition continuity",
      "loading, empty, error, and selection states",
      "tab or thread switch loading behavior",
      "duplicate control-model conflicts",
      ...(getLayoutNeeds(request).includes("toast feedback") ? ["non-blocking feedback layer"] : []),
    ]),
    topRankedComponentSlugs: rankedComponents.slice(0, 6).map((component: any) => component.slug),
  };
}

function buildApprovalPrompt(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  platform: string;
  shell: Record<string, any>;
}) {
  const { request, classification, designProfile, platform, shell } = args;
  return {
    readyForApproval: classification.archetype.id !== "unknown",
    ask: `Approve applying the ${designProfile?.label || classification.route} foundation and the selected shell/components to start normalizing this ${platform} surface.`,
    summary: `The endpoint can already start from ${classification.archetype.label}${classification.sector ? ` / ${classification.sector.label}` : ""} without asking for more discovery input. The first pass should establish fonts, spacing, hierarchy, shell, toolbar, table, and inspector together.`,
    scopeIfApproved: [
      `Apply ${designProfile?.iconSystem.primaryLibrary || "the routed icon system"} with restrained operational sizing.`,
      `Use ${shell.appShell?.title || "the selected shell"} plus ${shell.toolbar?.title || "the toolbar"} and ${shell.table?.title || "the table"} as the implementation spine.`,
      "Normalize raw page typography and spacing before component-level polish.",
      "Replace vague tabs, filters, and dropdowns with explicit control choices that keep current scope visible.",
      "Make interaction feedback, success states, and pane transitions feel like one coherent system.",
      "Keep the first pass sober, compact, and operational; no marketing or brand-led detours.",
    ],
    minimalApprovalReply: request.goal
      ? `Approve: apply the routed operational foundation and first-pass implementation plan for ${request.goal}.`
      : "Approve: apply the routed operational foundation and first-pass implementation plan.",
  };
}

function buildImplementationReadiness(args: {
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  platform: string;
}) {
  const { classification, designProfile, platform } = args;
  const canStart = classification.archetype.id !== "unknown" && classification.confidence >= 0.55;
  return {
    canStart,
    requiresOnlyApproval: canStart,
    confidence: classification.confidence,
    inferredPlatform: platform,
    inferredDensity: designProfile?.spacing.density || "compact",
    rationale: [
      canStart
        ? "The route is specific enough that the system can start applying foundational assets without more discovery."
        : "The route is still too ambiguous for implementation-first action.",
      "Fonts, spacing, icon posture, and hierarchy can be normalized before page-specific detail work.",
      "This response is designed to let an agent ask for approval and begin the first implementation pass immediately.",
    ],
  };
}

function buildExperienceComponentReference(
  component: Record<string, any> | undefined,
  why: string,
) {
  if (!component) {
    return null;
  }

  return {
    slug: component.slug,
    title: component.title,
    category: component.category,
    why,
  };
}

function buildExperienceSignalText(
  request: AgentResolutionRequest,
  classification: ReturnType<typeof resolveResolutionClassification>,
) {
  const layoutNeeds = getLayoutNeeds(request);
  const workspaceModules = getWorkspaceModules(request);

  return uniqueStrings([
    request.question || "",
    request.prompt || "",
    request.goal || "",
    request.constraints?.visualPosture || "",
    classification.route,
    classification.archetype.label,
    classification.sector?.label || "",
    request.context?.originalPrompt || "",
    request.context?.userComplaint || "",
    request.context?.transcript || "",
    request.context?.primaryObject || "",
    ...(request.context?.knownProblems || []),
    ...(request.context?.observedAsyncProblems || []),
    ...(request.context?.userRoles || []),
    ...(request.context?.dataSources || []),
    ...(request.context?.mutations || []),
    ...(request.context?.timelineMoments || []),
    ...(request.constraints?.avoid || []),
    ...(request.context?.desiredResources || []),
    ...(request.context?.existingSurfaceSignals || []),
    ...(request.context?.visibleModes || []),
    ...(request.context?.competingControls || []),
    ...(request.context?.transitionsNeedingCoverage || []),
    ...layoutNeeds,
    ...workspaceModules,
  ]).join(" ").toLowerCase();
}

function buildInteractionResourceGroup(args: {
  topic: string;
  principle: string;
  primary?: Record<string, any>;
  alternatives?: Array<Record<string, any> | undefined>;
}) {
  if (!args.primary) {
    return null;
  }

  const alternatives = uniqueBy(
    (args.alternatives || []).filter(Boolean) as Array<Record<string, any>>,
    (component: Record<string, any>) => component.slug,
  )
    .filter((component) => component.slug !== args.primary?.slug)
    .slice(0, 3)
    .map((component) => buildExperienceComponentReference(component, `Alternative for ${args.topic}.`));

  return {
    topic: args.topic,
    principle: args.principle,
    primary: buildExperienceComponentReference(args.primary, `Best default for ${args.topic}.`),
    alternatives,
  };
}

function buildTransitionStateIntelligence(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  platform: string;
  shell: Record<string, any>;
  allComponents: Array<Record<string, any>>;
}) {
  const { request, classification, designProfile, platform, shell, allComponents } = args;
  const signalText = buildExperienceSignalText(request, classification);
  const observedAsyncProblems = request.context?.observedAsyncProblems || [];
  const visibleModes = request.context?.visibleModes || [];
  const competingControls = request.context?.competingControls || [];
  const transitionsNeedingCoverage = request.context?.transitionsNeedingCoverage || [];
  const isAssistantWorkspace = classification.route === "assistant-workspace"
    || /assistant|chat|thread|conversation|reply|draft/.test(signalText);
  const hasDropdownSignals = /dropdown|select|combobox|focus selector|focus drop-?down/.test(signalText)
    || competingControls.some((value) => /dropdown|select|combobox|focus/.test(value.toLowerCase()));
  const hasVisibleModeSignals = visibleModes.length > 1
    || /tab|segmented|pill|discuss|operational|summary|mute|reply|draft/.test(signalText);
  const hasTransitionComplaint = observedAsyncProblems.length > 0
    || transitionsNeedingCoverage.length > 0
    || /loading|load|refresh|hydrate|transition|switch|clunky|jank|weird|blank|flash|stale/.test(signalText);
  const duplicateModeConflict = hasDropdownSignals && hasVisibleModeSignals;
  const focusLossRisk = /focus loss|focus drop|lost focus|cursor jump|scroll jump/.test(signalText)
    || observedAsyncProblems.some((value) => /focus|cursor|scroll/.test(value.toLowerCase()));

  const segmentedControl = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "segmented-button-controls",
    (component) => /segmented|toggle/.test(component.slug),
  ]);
  const chipFilter = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "filter-bar-chips",
    (component) => /filter|chip/.test(component.slug),
  ]);
  const tabReference = pickComponentByMatchers(allComponents, [
    (component) => /tab-navigation|tab-content-switcher/.test(component.slug),
    (component) => /tab/.test(component.slug),
  ]);
  const loadingReference = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "skeleton-loading",
    (component) => component.category === "Loading",
    (component) => /loading|skeleton/.test(component.slug),
  ]);
  const loadingButtonReference = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "loading-state-buttons",
    (component) => /loading-state-buttons/.test(component.slug),
  ]);
  const threadReference = pickComponentByMatchers(allComponents, [
    (component) => /chat-messaging-shell|general-assistant-chat-workspace|context-aware-assistant-console/.test(component.slug),
    (component) => /chat|assistant|thread/.test(component.slug),
  ]);
  const feedbackReference = pickComponentByMatchers(allComponents, [
    (component) => /inline-validation-patterns|notification-toast-stack/.test(component.slug),
    (component) => component.category === "Feedback",
  ]);

  const antiPatterns = uniqueStrings([
    duplicateModeConflict
      ? "Do not present the same mode set in both a visible tab row and an adjacent dropdown or focus selector."
      : "",
    hasTransitionComplaint
      ? "Do not blank the content region during tab, thread, or inspector refresh if the surrounding shell can stay anchored."
      : "",
    "Do not collapse the toolbar or hide the active scope while a query refresh is running.",
    isAssistantWorkspace
      ? "Do not reset the chat thread frame, composer, or mode labels before the next thread or tab is ready."
      : "Do not replace a workbench with a centered spinner when only one region is loading.",
    focusLossRisk
      ? "Do not let async refreshes steal cursor position, scroll position, or the user’s active focus target."
      : "",
  ]);

  const repairTargets = uniqueStrings([
    duplicateModeConflict
      ? "Replace duplicate dropdown-plus-tab mode switching with one visible control model. Keep Discuss and Operational visible if they are core modes, and move low-frequency actions like Mute or Draft elsewhere."
      : "",
    hasDropdownSignals
      ? "Reserve dropdowns for low-frequency settings or long option lists; do not use them for primary thread, queue, or mode switching."
      : "",
    hasTransitionComplaint
      ? "Define per-region loading behavior before implementation: table, toolbar, inspector, composer, and thread panes should not all transition the same way."
      : "",
    isAssistantWorkspace
      ? "Keep thread-switch and tab-switch loading inside the content region while preserving the shell, composer, and active mode labels."
      : "Preserve shell chrome and selected context while queues and detail regions refresh.",
    focusLossRisk
      ? "Preserve focus return targets and scroll anchors during async updates instead of resetting the interaction context."
      : "",
  ]);

  return {
    posture: isAssistantWorkspace
      ? "Thread and tab changes should feel like one continuous workspace, not like jumping between unrelated products."
      : "Refresh only the region that changed and keep the surrounding workbench stable while data catches up.",
    loadingStrategy: {
      principle: "Loading states should preserve hierarchy, current scope, and orientation instead of wiping the page or introducing a second control explanation layer.",
      defaultMode: isAssistantWorkspace
        ? "Preserve shell chrome, keep the previous thread or pane readable until the new one is ready, then swap content with a contained loading treatment."
        : "Preserve the shell, toolbar, and active selection while only the data region uses skeleton or stale-overlay treatment.",
      perRegion: {
        workspace: {
          preferredTreatment: loadingReference?.slug || "skeleton-loading",
          whenToUse: "Initial route load, dense tab switches, or queue refreshes that affect the main work surface.",
          avoid: ["Blank page resets", "Centered spinners replacing the entire shell"],
        },
        toolbar: {
          preferredTreatment: chipFilter?.slug || shell.toolbar?.slug || "filter-bar-chips",
          whenToUse: "Filter changes, scope switches, and saved-view refreshes.",
          avoid: ["Hiding active filters", "Collapsing the toolbar while data updates"],
        },
        inspector: {
          preferredTreatment: shell.inspector?.slug || "master-detail-shell",
          whenToUse: "Row, thread, or detail-rail changes after the parent context is already selected.",
          avoid: ["Scroll reset", "Dropping notes or action context while the rail refreshes"],
        },
        thread: isAssistantWorkspace
          ? {
              preferredTreatment: threadReference?.slug || shell.appShell?.slug || "general-assistant-chat-workspace",
              whenToUse: "Thread switches, Discuss versus Operational swaps, and artifact pane refreshes.",
              avoid: ["Clearing the composer", "Resetting visible mode labels before content is ready"],
            }
          : null,
      },
    },
    tabAndModeSwitching: {
      principle: "Use one visible control model for one mode set. If the user can already see the modes, do not restate them in a dropdown.",
      bestDefault: buildExperienceComponentReference(
        segmentedControl || tabReference || chipFilter,
        "Best default for visible mode switching with clear active state and low ambiguity.",
      ),
      visibleModes,
      duplicateModeConflict: {
        detected: duplicateModeConflict,
        reason: duplicateModeConflict
          ? "The request signals both visible mode labels and a dropdown or select controlling the same conversational or operational scope."
          : null,
        doInstead: duplicateModeConflict
          ? [
              "Keep mutually exclusive high-frequency modes visible as tabs or segmented controls.",
              "Reserve dropdowns for low-frequency settings, not primary mode switching.",
              "If Discuss and Operational are already visible, the nearby dropdown must control a different concern or be removed.",
            ]
          : [],
      },
      rules: [
        "Commit active tab or mode state immediately so the user sees the switch register before new data arrives.",
        "Load the next pane inside the content region; do not move or restack the mode controls themselves.",
        "If a mode switch changes the kind of work, explain it with visible scope language or counts right beside the control.",
      ],
    },
    asyncContinuity: {
      preserve: [
        "active scope labels",
        "selected row or thread where possible",
        "scroll position in rails and long panels",
        "focus return target after async refresh",
      ],
      rules: [
        "Keep chrome, spacing rhythm, and action placement stable across loading and post-load states.",
        "Use stale-to-skeleton or contained skeleton transitions instead of blank resets.",
        "When content finishes loading, return focus to the most recent user-controlled target rather than jumping to the top of the surface.",
      ],
    },
    antiPatterns,
    repairTargets,
    componentReferences: [
      buildInteractionResourceGroup({
        topic: "loading-preservation",
        principle: "Preserve structure while data hydrates so the user never loses the page grammar.",
        primary: loadingReference || shell.table,
        alternatives: [loadingButtonReference, shell.toolbar, shell.inspector],
      }),
      buildInteractionResourceGroup({
        topic: "tab-and-mode-switching",
        principle: "Use one visible mode switch with active-state clarity and no duplicate dropdown.",
        primary: segmentedControl || tabReference || chipFilter,
        alternatives: [tabReference, chipFilter, shell.toolbar],
      }),
      buildInteractionResourceGroup({
        topic: "thread-and-pane-continuity",
        principle: "Preserve orientation when switching tabs, threads, or artifact panes.",
        primary: threadReference || shell.appShell || shell.inspector,
        alternatives: [shell.appShell, shell.inspector, feedbackReference],
      }),
    ].filter(Boolean),
    platform,
    motionPosture: designProfile?.motion.posture || "minimal and functional",
  };
}

function buildIconAndInteractionIntelligence(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  platform: string;
  shell: Record<string, any>;
  allComponents: Array<Record<string, any>>;
}) {
  const { request, classification, designProfile, platform, shell, allComponents } = args;
  const signalText = buildExperienceSignalText(request, classification);
  const isAssistantWorkspace = classification.route === "assistant-workspace";
  const isOperationalQueue = classification.archetype.id === "internal-operations"
    || /queue|inventory|dispatch|assigned|open|operations|task flow|review/.test(signalText);

  const segmentedControl = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "segmented-button-controls",
    (component) => component.slug === "apple-pill-toggle",
    (component) => /segmented|toggle/.test(component.slug),
  ]);
  const chipFilter = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "filter-bar-chips",
    (component) => /filter|chip/.test(component.slug),
  ]);
  const commandPalette = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "command-palette-shell",
    (component) => component.slug === "command-palette",
    (component) => /command-palette/.test(component.slug),
  ]);
  const toastFeedback = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "notification-toast-stack",
    (component) => component.slug === "inline-validation-patterns",
    (component) => /toast|notification|validation/.test(component.slug),
  ]);
  const continuityNav = pickComponentByMatchers(allComponents, [
    (component) => component.slug === "minimal-sidebar",
    (component) => component.slug === "breadcrumbs",
    (component) => /sidebar|breadcrumb/.test(component.slug),
  ]);
  const threadShell = pickComponentByMatchers(allComponents, [
    (component) => /general-assistant-chat-workspace|artifact-collaboration-shell|master-detail-shell|chat-messaging-shell/.test(component.slug),
  ]);

  const repairTargets = uniqueStrings([
    /sync at the view|sync at view/.test(signalText)
      ? "Replace ambiguous labels like 'Sync at the view' with outcome-based copy such as 'Sync this view', 'Refresh assignments', or 'Sync dispatch state', and add scope text nearby."
      : "Replace abstract action labels with outcome-based copy that states what changes and for whom.",
    /sign out|logout/.test(signalText)
      ? "Treat sign-out as an account action with proper placement, spacing, and destructive posture instead of leaving it as an isolated low-context button."
      : "Account and destructive actions should live in a coherent account rail or menu, not as stranded buttons.",
    /dropdown|select|unstyled/.test(signalText)
      ? "Do not default to raw browser selects for high-frequency view switching or queue filtering; prefer segmented controls, chips, or a styled command surface."
      : "Avoid raw browser-style dropdowns when the choice is frequent, high-signal, or defines the current task mode.",
    /tab|filter|assigned|open|dispatch/.test(signalText) || isOperationalQueue
      ? "Clarify tab and filter meaning with user-facing labels, counts, active state, and a visible explanation of what each mode contains."
      : "Make tabs and filters self-explanatory through counts, active state, and visible scope language.",
    /window|transition|coherent|coherence|same window|different windows/.test(signalText)
      ? "Preserve continuity across windows and panes with shared headers, persistent filters, and stable action placement so the product still feels like one system."
      : "Keep cross-pane transitions coherent by preserving shared chrome, scope, and action position.",
    isOperationalQueue
      ? "Describe visible workflow as operation inventory or queue state, not as another dashboard card collection."
      : "Use task-first language so the user understands what the interface is helping them accomplish.",
  ]).slice(0, 6);

  return {
    iconUse: {
      posture: isOperationalQueue
        ? "Use icons as compact status, direction, and affordance cues rather than as decorative features."
        : "Use icons to reinforce navigation, state, and recognition without letting them replace labels.",
      recommendedLibrary: designProfile?.iconSystem.primaryLibrary || "Lucide",
      defaultSize: designProfile?.iconSystem.defaultSize || "14-16px",
      strokeStyle: designProfile?.iconSystem.strokeStyle || "neutral outline icons",
      bestDefault: designProfile
        ? `Start with ${designProfile.iconSystem.primaryLibrary} at ${designProfile.iconSystem.defaultSize}; only escalate icon weight when the control is still unclear after copy and spacing are fixed.`
        : "Start with a restrained neutral icon system and prove clarity through copy before adding emphasis.",
      options: [
        {
          library: designProfile?.iconSystem.primaryLibrary || "Lucide",
          whenToUse: "Best default for product, operations, assistant workspaces, and restrained UI chrome.",
          tradeoff: "Will not rescue weak labels or weak interaction structure by itself.",
        },
        ...(designProfile?.iconSystem.alternatives || []).slice(0, 2).map((library) => ({
          library,
          whenToUse: `Use when the product already leans in that direction or needs the specific glyph coverage of ${library}.`,
          tradeoff: "Only keep it if the entire surface remains coherent and restrained.",
        })),
      ],
      avoid: [
        "Do not use oversized icon-first buttons as a substitute for action hierarchy.",
        "Do not mix several icon families within the same surface.",
        "Do not let icons become the most visually dominant element in a dense operational workspace.",
      ],
    },
    interactionModel: {
      viewSwitching: {
        principle: isOperationalQueue
          ? "Queue or mode switching should read as changing the current work inventory, not as jumping to unrelated mini-dashboards."
          : "View switching should preserve orientation and expose the active mode immediately.",
        bestDefault: buildExperienceComponentReference(
          segmentedControl || chipFilter,
          "Best default for compact mode switching with visible active state.",
        ),
        alternatives: uniqueBy(
          [segmentedControl, chipFilter, continuityNav].filter(Boolean) as Array<Record<string, any>>,
          (component: Record<string, any>) => component.slug,
        )
          .slice(0, 3)
          .map((component) => buildExperienceComponentReference(component, "Alternative for tabs, filters, or scope switching.")),
        rules: [
          "Expose the active mode, count, and scope in the control itself or directly beside it.",
          "Keep view-switch controls inside the current window instead of forcing route changes when the user is still doing the same task.",
          "If a tab materially changes what the user is reviewing, explain that difference in one line of supporting copy.",
          "Do not mirror the same mode set in both visible tabs and a nearby dropdown or focus selector.",
          "Commit the visible active state immediately, then load the affected content region without blanking the surrounding shell.",
        ],
      },
      dropdownStrategy: {
        principle: "Choose the control type based on option count and frequency, not by defaulting to an unstyled select.",
        preferInsteadOfRawSelect: [
          `${segmentedControl?.title || "Segmented controls"} for 2-5 mutually exclusive modes.`,
          `${chipFilter?.title || "Filter chips"} for visible multi-scope queue narrowing.`,
          `${commandPalette?.title || "Command palette patterns"} for long action lists, search-heavy actions, or keyboard-driven flows.`,
        ],
        nativeSelectIsStillFineWhen: [
          "The option set is long, low-frequency, and form-oriented rather than mode-defining.",
          "The field is part of a settings form, not a core operational switch or task filter.",
        ],
        avoid: [
          "Do not use raw selects for the main dashboard mode switch.",
          "Do not hide critical filter state inside collapsed controls when chips or segmented controls can keep it visible.",
          "Do not offer the same mode model in both a dropdown and a visible tab or segmented control.",
          "If visible tabs already name the current thread or work mode, the adjacent dropdown must control something else or disappear.",
        ],
      },
      feedbackAndReaction: {
        principle: "Interaction quality is mostly measured by how clearly the interface reacts to change, selection, loading, validation, and completion.",
        bestDefault: buildExperienceComponentReference(
          toastFeedback || shell.toast,
          "Best default for non-blocking completion, inline validation, and reaction design.",
        ),
        rules: [
          "Every important action needs an immediate visual reaction: selected state, loading state, or completion state.",
          "Use inline validation for blocked form decisions and toast feedback for successful background completion.",
          "Keep hover, focus, selected, disabled, loading, and success states consistent across tabs, lists, and chat panes.",
          "Use contained skeleton or stale-overlay transitions for pane refreshes instead of resetting the content region to blank.",
        ],
      },
      continuityAcrossWindows: {
        principle: "Moving between tabs, panes, drawers, or assistant subviews should feel like staying in one operating system, not entering a different product.",
        bestDefault: buildExperienceComponentReference(
          continuityNav || shell.appShell || threadShell,
          "Best default for preserving orientation and cross-pane coherence.",
        ),
        rules: [
          "Keep the same chrome, spacing rhythm, and icon posture across adjacent windows and panes.",
          "Preserve filters, active scope, and context summary when opening details, drawers, or side conversations.",
          "Animate transitions as continuity cues, not as decorative scene changes.",
          "Preserve focus return targets and scroll anchors when switching tabs, threads, or inspector rows.",
        ],
      },
    },
    userFacingCopy: {
      posture: isOperationalQueue
        ? "Use language that explains current work, queue state, and next action in plain user terms."
        : "Use language that tells the user what this control affects and what will happen next.",
      shouldSay: uniqueStrings([
        isOperationalQueue ? "What are you using this for?" : "What is this control helping the user do?",
        isOperationalQueue ? "All events" : "All items",
        isOperationalQueue ? "Assigned" : "Assigned to me",
        isOperationalQueue ? "Open dispatch" : "Open",
        isOperationalQueue ? "Needs unblock" : "Needs attention",
      ]),
      shouldAvoid: [
        "Abstract dashboard language that hides the task behind generic panel names.",
        "Vague verbs that do not communicate scope, like 'Sync at the view'.",
        "Tab names with no visible explanation of what changes between them.",
      ],
    },
    interactionResources: [
      buildInteractionResourceGroup({
        topic: "view-switching",
        principle: "Keep mode changes obvious and local to the current task.",
        primary: segmentedControl || chipFilter,
        alternatives: [chipFilter, continuityNav, commandPalette],
      }),
      buildInteractionResourceGroup({
        topic: "overflow-actions-and-search",
        principle: "Use searchable or keyboard-friendly action surfaces when lists grow or actions are frequent.",
        primary: commandPalette,
        alternatives: [chipFilter, continuityNav],
      }),
      buildInteractionResourceGroup({
        topic: "feedback-and-reaction",
        principle: "Make the UI react clearly to user action, selection, loading, and completion.",
        primary: toastFeedback || shell.toast,
        alternatives: [shell.toast, shell.inspector],
      }),
      buildInteractionResourceGroup({
        topic: "continuity-and-navigation",
        principle: "Preserve orientation as the user moves between panes, tabs, and windows.",
        primary: continuityNav || shell.appShell,
        alternatives: [shell.appShell, threadShell, shell.toolbar],
      }),
    ].filter(Boolean),
    repairTargets,
    inferredExperiencePriority: isAssistantWorkspace
      ? "conversation continuity, artifact clarity, composer feedback, and context preservation"
      : isOperationalQueue
        ? "queue clarity, filter visibility, state reaction, and cross-pane coherence"
        : "mode clarity, strong feedback, and coherent navigation",
    platform,
  };
}

function buildFoundationCommunication(args: {
  question?: string;
  goal?: string;
  platform?: string;
  route?: string;
  context?: Partial<{
    summary: string;
    problemStatement: string;
    routingIntent: string;
    handoff: string;
    originalPrompt: string;
    userComplaint: string;
    transcript: string;
    agentContextSummary: string;
    freeformContext: string;
    primaryObject: string;
    agentNotes: string[];
    userRoles: string[];
    dataSources: string[];
    mutations: string[];
    timelineMoments: string[];
  }> | null;
  classification: {
    archetype: { id: string; label: string };
    sector?: { label: string; route?: string } | null;
    route?: string;
  };
  designProfile: DesignProfile | null;
}) {
  const route = args.route || args.classification.route || args.classification.sector?.route || args.classification.archetype.id;
  const signalText = uniqueStrings([
    args.question || "",
    args.goal || "",
    route,
    args.classification.archetype.label,
    args.classification.sector?.label || "",
    args.context?.summary || "",
    args.context?.problemStatement || "",
    args.context?.routingIntent || "",
    args.context?.handoff || "",
    args.context?.originalPrompt || "",
    args.context?.userComplaint || "",
    args.context?.transcript || "",
    args.context?.agentContextSummary || "",
    args.context?.freeformContext || "",
    args.context?.primaryObject || "",
    ...(args.context?.agentNotes || []),
    ...(args.context?.userRoles || []),
    ...(args.context?.dataSources || []),
    ...(args.context?.mutations || []),
    ...(args.context?.timelineMoments || []),
  ]).join(" ").toLowerCase();

  const isInternal = args.classification.archetype.id === "internal-operations"
    || route === "operational-workbench"
    || /internal|employee|operations|company|policy|admin|review|queue|portal|backoffice|back office/.test(signalText);
  const isAuthSurface = /login|log in|sign in|signin|auth|authentication|credential|password|sso|employee access|workspace access/.test(signalText);
  const isAssistantWorkspace = route === "assistant-workspace"
    || /assistant|artifact|prompt|conversation|chat workspace|copilot/.test(signalText);
  const isMarketingSurface = args.classification.archetype.id === "landing-page"
    || /landing page|hero|pricing|marketing|campaign|homepage|homepage/.test(signalText);
  const isDocsSurface = args.classification.archetype.id === "docs-knowledge"
    || /docs|documentation|knowledge base|help center/.test(signalText);

  // ── Style-family detection ────────────────────────────────────────────────
  // Catches vague aesthetic signals users express without design vocabulary.
  // Editorial signals: warmth, print, narrative, humanity.
  // Precision signals: sharpness, tools, speed, no decoration.
  const editorialSerifSignalCount = [
    /warm|human|editorial|print|magazine|cozy|organic|narrative|literary|inviting|approachable|brand forward|premium brand|artisan|craft|storytell|reading|feel.*person|person.*feel/.test(signalText),
    /serif|typograph|type.*driv|type.*led|font.*important|font.*matter/.test(signalText),
    /substack|stripe.*old|NYT|new york times|medium|loom.*old|notion.*brand/.test(signalText),
    /not.*generic|not.*saas|not.*dashboard|not.*corporate|not.*bland|doesn't feel like every other|different feel/.test(signalText),
  ].filter(Boolean).length;

  const precisionMinimalSignalCount = [
    /sharp|sleek|precise|cold|minimal|tight|crisp|razor|clean.*look|look.*clean|no decoration|zero decoration/.test(signalText),
    /tool|power.user|fast|instant|technical|command|developer|dev tool/.test(signalText),
    /vercel|linear|figma|raycast|arc browser|notion.*app|supabase|planetscale/.test(signalText),
    /serious|no fluff|no personality|just works|get out of the way|feels like.*software|productivity/.test(signalText),
  ].filter(Boolean).length;

  const hasStyleFamilyAmbiguity = editorialSerifSignalCount === 0 && precisionMinimalSignalCount === 0
    && (isMarketingSurface || /brand|identity|feel|vibe|personality|aesthetic|look.*and.*feel|style/.test(signalText));
  const leaningEditorial = editorialSerifSignalCount > precisionMinimalSignalCount;
  const leaningPrecision = precisionMinimalSignalCount > editorialSerifSignalCount;

  const detectedStyleFamily: "editorial-serif" | "precision-minimal" | null =
    editorialSerifSignalCount >= 2 ? "editorial-serif"
    : precisionMinimalSignalCount >= 2 ? "precision-minimal"
    : null;

  const surfacePosture = isInternal && isAuthSurface
    ? "serious employee access point"
    : isInternal
      ? "serious internal system"
      : isAssistantWorkspace
        ? "focused assistant workspace"
        : isMarketingSurface
          ? "public-facing landing surface"
          : isDocsSurface
            ? "structured reference surface"
            : "product application surface";

  const inferredTone = isInternal && isAuthSurface
    ? "credible, calm, security-aware, and workday ready"
    : isInternal
      ? "calm, operational, and direct"
      : isAssistantWorkspace
        ? "restrained, tool-like, and context-aware"
        : isMarketingSurface
          ? "clear, persuasive, and brand-forward"
          : isDocsSurface
            ? "literal, navigable, and low-drama"
            : "clean, product-led, and purpose-first";

  const likelyLikes = uniqueStrings([
    isInternal ? "Strong hierarchy with one dominant task surface." : "A surface that states its job quickly.",
    isInternal && isAuthSurface ? "A sign-in flow that feels company-owned and disciplined, not soft or campaign-like." : "Clear labels that explain scope without relying on decoration.",
    isAssistantWorkspace ? "A powerful composer, stable context handling, and optional durable output." : "Controls that stay visible when they define the current mode.",
    args.designProfile ? `Foundation choices aligned to ${args.designProfile.label}.` : "Foundation choices that can be applied consistently before local embellishment.",
  ]).slice(0, 4);

  const likelyDislikes = uniqueStrings([
    isInternal && isAuthSurface ? "Soft landing-page language, airy trust theater, or lifestyle framing around employee access." : "Vague copy that does not say what changes when a control is used.",
    isInternal ? "Dashboard-card clutter and panel names that hide the actual work." : "Extra chrome that competes with the main task.",
    isAssistantWorkspace ? "Overpopulated rails, chip floods, and oversized icon-first actions." : "Controls that hide state inside ambiguous overflow patterns.",
    "Icons being asked to carry the communication load on their own.",
  ]).slice(0, 4);

  const applyWithoutAsking = uniqueStrings([
    "Default to restrained 14-16px neutral line icons and let copy lead.",
    isInternal ? "Use border-first structure, compact spacing, and visible task framing." : "Keep hierarchy obvious before adding decorative styling.",
    isInternal && isAuthSurface ? "Treat the page as employee access control first, not as a marketing landing page." : "Keep the page oriented around the primary task, not secondary promotion.",
    isAssistantWorkspace ? "Keep the thread and composer primary until a durable artifact is clearly needed." : "Ask for another pane only when it removes meaningful friction.",
  ]).slice(0, 4);

  const preferenceProbe = args.classification.archetype.id === "unknown"
    ? {
        ask: "Is this primarily an internal company tool, a product workspace, or a public-facing landing surface?",
        why: "The route is still broad enough that tone and shell posture could swing in the wrong direction.",
      }
    : isInternal && isAuthSurface
      ? {
          ask: "Should this employee entry point feel more security-led and institutional, or more AI-workspace led and product-like?",
          why: "Both directions can be serious, but the wrong one changes the entire visual posture.",
        }
      : isAssistantWorkspace
        ? {
            ask: "Does this task need a durable artifact lane, or should the thread and composer stay dominant?",
            why: "That decision changes whether the workspace should split into collaboration rails or stay single-lane.",
          }
        : isMarketingSurface
          ? {
              ask: "Is the primary job conversion, credibility, or product explanation?",
              why: "That answer determines whether the page should behave like a campaign, proof surface, or product walkthrough.",
            }
          : isDocsSurface
            ? {
                ask: "Does this need deep local navigation, or is the main need a short reference path to a single answer?",
                why: "Reference posture depends on whether the user is browsing a body of knowledge or jumping to one answer.",
              }
            : {
                ask: "What should the user trust first here: the workflow, the product intelligence, or the brand?",
                why: "That priority determines what should dominate the hierarchy before secondary modules appear.",
              };

  // ── Style-family probe ──────────────────────────────────────────────────────
  // Asked in plain language so users who can't name fonts or visual styles
  // can still route to the right end of the spectrum.
  //   editorial-serif  →  warm, readable, typographic, print-like
  //   precision-minimal →  tight, cold, tool-like, zero decoration
  const styleFamilyProbe: { ask: string; why: string; leaningFamilyId: string | null } | null =
    detectedStyleFamily === "editorial-serif"
      ? {
          ask: "Does this need to feel warm and editorial — more like a well-produced publication — or is that the wrong direction?",
          why: "Editorial signals are present. Confirming this routes the foundation toward serif display type, warm neutrals, and generous spacing instead of a cold tool posture.",
          leaningFamilyId: "editorial-serif",
        }
      : detectedStyleFamily === "precision-minimal"
        ? {
            ask: "Should this feel like a sharp, precise tool — tight spacing, no decoration, zero personality — or does it need more warmth than that?",
            why: "Precision signals are present. Confirming this routes the foundation toward geometric type, cold neutrals, and instant-feeling interactions instead of an editorial posture.",
            leaningFamilyId: "precision-minimal",
          }
        : hasStyleFamilyAmbiguity || leaningEditorial || leaningPrecision
          ? {
              ask: "Does this need to feel more like a magazine (warm, readable, typographic) or more like a working tool (tight, precise, zero decoration)?",
              why: "Without a clear style-family signal, the foundation could go in opposite directions. This answer changes type, spacing, color palette, and motion posture — not just visual polish.",
              leaningFamilyId: leaningEditorial ? "editorial-serif" : leaningPrecision ? "precision-minimal" : null,
            }
          : null;

  const reasoning = uniqueStrings([
    `The current route reads as ${surfacePosture}.`,
    isInternal ? "Internal and operational cues are present in the request or attached context." : "The request does not read like a pure internal operations surface.",
    isAuthSurface ? "Authentication cues are present, so the entry posture matters." : "No strong authentication cue was detected.",
    isAssistantWorkspace ? "Assistant-workspace cues are present, so composer and context continuity matter." : "Assistant-workspace cues are secondary or absent.",
  ]).slice(0, 4);

  return {
    surfacePosture,
    inferredTone,
    assumedUserPreferences: {
      likelyLikes,
      likelyDislikes,
    },
    applyWithoutAsking,
    preferenceProbe,
    styleFamilyProbe,
    detectedStyleFamily,
    reasoning,
    platform: args.platform || null,
  };
}

function buildContextIntelligence(args: {
  question?: string;
  goal?: string;
  platform?: string;
  route?: string;
  context?: Partial<{
    summary: string;
    problemStatement: string;
    routingIntent: string;
    handoff: string;
    originalPrompt: string;
    userComplaint: string;
    transcript: string;
    agentContextSummary: string;
    freeformContext: string;
    agentNotes: string[];
  }> | null;
  classification: {
    archetype: { id: string; label: string };
    sector?: { label: string; route?: string } | null;
    route?: string;
    confidence?: number;
  };
}) {
  const route = args.route || args.classification.route || args.classification.sector?.route || args.classification.archetype.id;
  const signalText = uniqueStrings([
    args.question || "",
    args.goal || "",
    route,
    args.classification.archetype.label,
    args.classification.sector?.label || "",
    args.context?.summary || "",
    args.context?.problemStatement || "",
    args.context?.routingIntent || "",
    args.context?.handoff || "",
    args.context?.originalPrompt || "",
    args.context?.userComplaint || "",
    args.context?.transcript || "",
    args.context?.agentContextSummary || "",
    args.context?.freeformContext || "",
    ...(args.context?.agentNotes || []),
  ]).join(" ").toLowerCase();

  const complaintSource = args.context?.userComplaint
    || args.context?.problemStatement
    || args.context?.summary
    || args.context?.freeformContext
    || args.question
    || args.goal
    || null;
  const wordCount = signalText.split(/\s+/).filter(Boolean).length;

  const isInternal = args.classification.archetype.id === "internal-operations"
    || route === "operational-workbench"
    || /internal|employee|operations|company|policy|admin|review|queue|portal|backoffice|back office/.test(signalText);
  const isMarketing = args.classification.archetype.id === "landing-page"
    || /landing page|hero|pricing|marketing|campaign|homepage/.test(signalText);
  const isDocs = args.classification.archetype.id === "docs-knowledge"
    || /docs|documentation|knowledge base|help center/.test(signalText);
  const isCommerce = args.classification.archetype.id === "commerce-marketplace"
    || /checkout|storefront|shop|catalog|marketplace|purchase/.test(signalText);
  const isAssistant = route === "assistant-workspace"
    || /assistant|artifact|prompt|conversation|chat workspace|copilot/.test(signalText);
  const isAuth = /login|log in|sign in|signin|auth|authentication|credential|password|sso|employee access|workspace access/.test(signalText);
  const isClientLifecycle = /client|relationship|intake|qualification|ownership|handoff|cadence|follow-up|follow up|fulfillment|staffing|workforce|delivery risk/.test(signalText);

  const userType = /employee|operator|admin|analyst|reviewer|agent|backoffice|back office/.test(signalText)
    ? "internal operator"
    : isInternal && isClientLifecycle
      ? "operations manager or service operator"
    : /developer|engineer|terminal|editor|debug/.test(signalText)
      ? "developer or power user"
      : /customer|buyer|shopper|subscriber|visitor/.test(signalText)
        ? "customer or buyer"
        : /reader|documentation|help center|knowledge base/.test(signalText)
          ? "reader"
          : null;

  const primaryTask = isAuth
    ? "sign in or regain access"
    : isInternal && isClientLifecycle
      ? "move a client relationship through intake, qualification, delivery, and follow-up"
    : /approve|approval|reject|review|moderation|escalat/.test(signalText)
      ? "review and decide"
      : /browse|discover|compare|catalog|search/.test(signalText)
        ? "browse or compare options"
        : /draft|write|artifact|revise|edit copy|prompt/.test(signalText)
          ? "draft or revise durable output"
          : /settings|configure|manage|preferences|profile/.test(signalText)
            ? "configure or manage settings"
            : /monitor|health|analytics|status|observe/.test(signalText)
              ? "monitor system state"
              : /checkout|purchase|buy|cart/.test(signalText)
                ? "select and purchase"
                : null;

  const toneBias = isInternal && isAuth
    ? "serious employee access"
    : isInternal
      ? "serious operational"
      : isAssistant
        ? "tool-like assistant workspace"
        : isMarketing
          ? "brand or conversion led"
          : isDocs
            ? "structured reference"
            : isCommerce
              ? "commerce showcase"
              : /soft|friendly|warm|airy/.test(signalText)
                ? "soft or friendly"
                : /sleek|sharp|serious|disciplined/.test(signalText)
                  ? "disciplined product"
                  : null;

  const likelyDesignFailures = uniqueStrings([
    /generic|template|bland|off|weak/.test(signalText)
      ? "Weak hierarchy or recycled shell grammar is probably making the surface feel generic."
      : "",
    /soft|airy|landing page|too soft/.test(signalText)
      ? "The tone may be too soft, airy, or landing-page-like for the actual task."
      : "",
    /clutter|overpopulated|too much|crowded/.test(signalText)
      ? "Too many competing modules or rails are probably diluting the main task."
      : "",
    /unclear|confusing|doesn't communicate|does not communicate|ambiguous|lost context/.test(signalText)
      ? "Labels, scope cues, or control choice may be failing to explain what the user is actually doing."
      : "",
    /dropdown|select|raw select|unstyled select/.test(signalText)
      ? "The control model is likely wrong for the frequency or importance of the choice."
      : "",
    /icon|iconography/.test(signalText)
      ? "Icons may be carrying too much of the communication load instead of acting as secondary cues."
      : "",
    /cohere|coherent|continuity|pane|window|cross-window/.test(signalText)
      ? "Cross-pane continuity may be weak, so the system does not feel like one coherent product."
      : "",
    /event-first|event first|client-lifecycle-first|client relationship/.test(signalText)
      ? "The workspace model may be framed around events or schedules instead of the client lifecycle that should own them."
      : "",
    likelyFailuresByRoute(route),
  ]).slice(0, 5);

  const ambiguityFlags = uniqueStrings([
    (args.classification.confidence || 0) < 0.62 ? "Route confidence is still soft, so the surface family may be misread." : "",
    isInternal && isMarketing ? "The request mixes internal-system cues with marketing cues." : "",
    isAssistant && isAuth ? "The request mixes assistant-workspace cues with authentication cues." : "",
    !userType ? "Primary user type is not explicit yet." : "",
    !primaryTask ? "Primary task is not explicit yet." : "",
    wordCount < 18 ? "The attached context is thin, so defaults may overreach." : "",
    /generic|off|bad|wrong|trash|weak/.test(signalText) && !args.context?.userComplaint ? "The complaint is still broad and needs translation into specific UI failures." : "",
  ]).slice(0, 6);

  const idealAdditions = uniqueStrings([
    !userType ? "Who the primary user is." : "",
    !primaryTask ? "What the user is trying to finish right now." : "",
    !toneBias ? "What tone the surface should project." : "",
    /generic|off|bad|wrong|trash|weak|soft/.test(signalText) ? "One concrete example of what feels wrong on the current screen." : "",
    args.classification.archetype.id === "unknown" ? "Whether this is internal, public, docs, commerce, or tooling." : "",
  ]).slice(0, 4);

  const adequacyLevel = (args.classification.confidence || 0) > 0.8 && ambiguityFlags.length <= 1 && wordCount >= 28
    ? "strong"
    : ambiguityFlags.length <= 3 && wordCount >= 12
      ? "usable"
      : "thin";

  const adequacyReason = adequacyLevel === "strong"
    ? "The payload already carries enough route, complaint, and task signal to start confidently."
    : adequacyLevel === "usable"
      ? "The system can proceed, but one missing context edge could still skew tone or shell choice."
      : "The complaint is still too broad or mixed, so defaulting aggressively could route the surface incorrectly.";

  const interpretedAs = complaintSource
    ? uniqueStrings([
        /generic|template|bland|off|weak/.test(signalText) ? "The complaint likely points to structural hierarchy and shell-ownership failures, not just taste." : "",
        /soft|airy|landing page/.test(signalText) ? "The page likely has the wrong tone for the seriousness of the task." : "",
        /clutter|overpopulated/.test(signalText) ? "The surface likely has too many competing regions for the main job it needs to support." : "",
        !/generic|template|bland|off|weak|soft|airy|landing page|clutter|overpopulated/.test(signalText) && likelyDesignFailures[0]
          ? likelyDesignFailures[0]
          : "",
      ]).join(" ") || "The system will need to translate the complaint into concrete hierarchy, control, and tone failures before redesigning."
    : "No direct complaint is attached, so the system is inferring pressure points from route and context signals only.";

  const nextBestQuestion = isInternal && isMarketing
    ? {
        ask: "Is this meant to feel like a serious internal system or a public-facing marketing surface?",
        why: "That distinction changes shell, tone, density, and action hierarchy immediately.",
      }
    : !userType
      ? {
          ask: "Who is the primary user here when this screen is working well?",
          why: "User type changes how serious, guided, or self-serve the surface should feel.",
        }
      : !primaryTask
        ? {
            ask: "What is the one thing the user is trying to finish on this screen right now?",
            why: "The main task should control the hierarchy before supporting modules are introduced.",
          }
        : adequacyLevel === "thin"
          ? {
              ask: "What is one concrete thing on the current screen that feels wrong or weak?",
              why: "A single concrete failure gives the system something precise to translate instead of guessing from a broad complaint.",
            }
          : null;

  const surfaceKind = isInternal && isAuth
    ? "internal auth surface"
    : isInternal
      ? "internal operational surface"
      : isAssistant
        ? "assistant workspace"
        : isMarketing
          ? "marketing surface"
          : isDocs
            ? "docs surface"
            : isCommerce
              ? "commerce surface"
              : "product surface";

  return {
    adequacy: {
      level: adequacyLevel,
      canProceed: adequacyLevel !== "thin" || Boolean(complaintSource),
      reason: adequacyReason,
    },
    complaintTranslation: {
      source: complaintSource,
      interpretedAs,
      likelyDesignFailures,
    },
    extractedSignals: {
      surfaceKind,
      userType,
      primaryTask,
      toneBias,
      platform: args.platform || null,
    },
    ambiguityFlags,
    minimumUsefulContext: [
      "what the surface actually is",
      "who is using it",
      "what they are trying to finish",
      "what feels wrong right now",
    ],
    idealAdditions,
    nextBestQuestion,
  };
}

function buildOperationalTruthIntelligence(args: {
  question?: string;
  goal?: string;
  platform?: string;
  route?: string;
  context?: Partial<{
    summary: string;
    problemStatement: string;
    routingIntent: string;
    handoff: string;
    originalPrompt: string;
    userComplaint: string;
    transcript: string;
    agentContextSummary: string;
    freeformContext: string;
    primaryObject: string;
    agentNotes: string[];
    userRoles: string[];
    dataSources: string[];
    mutations: string[];
    timelineMoments: string[];
  }> | null;
  classification: {
    archetype: { id: string; label: string };
    sector?: { label: string; route?: string } | null;
    route?: string;
    confidence?: number;
  };
}) {
  const route = args.route || args.classification.route || args.classification.sector?.route || args.classification.archetype.id;
  const signalText = uniqueStrings([
    args.question || "",
    args.goal || "",
    route,
    args.classification.archetype.label,
    args.classification.sector?.label || "",
    args.context?.summary || "",
    args.context?.problemStatement || "",
    args.context?.routingIntent || "",
    args.context?.handoff || "",
    args.context?.originalPrompt || "",
    args.context?.userComplaint || "",
    args.context?.transcript || "",
    args.context?.agentContextSummary || "",
    args.context?.freeformContext || "",
    args.context?.primaryObject || "",
    ...(args.context?.agentNotes || []),
    ...(args.context?.userRoles || []),
    ...(args.context?.dataSources || []),
    ...(args.context?.mutations || []),
    ...(args.context?.timelineMoments || []),
  ]).join(" ").toLowerCase();

  const explicitPrimaryObject = args.context?.primaryObject?.trim() || null;
  const userRoles = args.context?.userRoles || [];
  const dataSources = args.context?.dataSources || [];
  const mutations = args.context?.mutations || [];
  const timelineMoments = args.context?.timelineMoments || [];

  const inferredPrimaryObject = explicitPrimaryObject
    || (/client|relationship/.test(signalText)
      ? "client relationship"
      : /ticket|case/.test(signalText)
        ? "case"
        : /invoice|payment|transaction/.test(signalText)
          ? "transaction or invoice"
          : /order|shipment|fulfillment/.test(signalText)
            ? "order"
            : /lead|account|opportunity/.test(signalText)
              ? "account or lead"
              : /person|employee|member|worker/.test(signalText)
                ? "person or workforce record"
                : /document|article|draft|artifact/.test(signalText)
                  ? "document or artifact"
                  : /thread|conversation|message/.test(signalText)
                    ? "conversation thread"
                    : null);

  const hasRoleSignal = userRoles.length > 0 || /employee|operator|manager|admin|analyst|reviewer|customer|buyer|reader|agent|staff/.test(signalText);
  const hasDataSourceSignal = dataSources.length > 0 || /crm|database|warehouse|spreadsheet|csv|import|export|api|integration|queue|record|salesforce|hubspot|stripe|postgres|source system|event log/.test(signalText);
  const hasMutationSignal = mutations.length > 0 || /create|edit|update|approve|reject|assign|schedule|handoff|deliver|close|archive|escalate|attach|export|import|retry|submit/.test(signalText);
  const hasTimelineSignal = timelineMoments.length > 0 || /intake|qualification|review|approval|delivery|follow-up|follow up|handoff|status|state|history|cadence|refresh|sla|aging|lifecycle/.test(signalText);
  const hasSurfaceSignal = Boolean(route && route !== "unknown") || (args.classification.confidence || 0) >= 0.7;

  const surfaceThreshold = hasSurfaceSignal
    ? {
        level: (args.classification.confidence || 0) >= 0.85 ? "confirmed" : "inferred",
        reason: (args.classification.confidence || 0) >= 0.85
          ? `The surface family is specific enough to route as ${route}.`
          : `The surface family can be inferred as ${route}, but the route is still somewhat soft.`,
      }
    : {
        level: "missing",
        reason: "The system still does not know what kind of surface this actually is.",
      };

  const actorThreshold = hasRoleSignal
    ? {
        level: userRoles.length > 0 ? "confirmed" : "inferred",
        reason: userRoles.length > 0
          ? `Primary user roles are named: ${userRoles.join(", ")}.`
          : "The actor can be inferred from the wording, but the role is not explicitly named.",
      }
    : {
        level: "missing",
        reason: "The request does not clearly say who is using the screen when it succeeds.",
      };

  const primaryObjectThreshold = inferredPrimaryObject
    ? {
        level: explicitPrimaryObject ? "confirmed" : "inferred",
        reason: explicitPrimaryObject
          ? `The primary object is explicitly named as ${explicitPrimaryObject}.`
          : `The primary object can be inferred as ${inferredPrimaryObject}, but that still needs confirmation.`,
      }
    : {
        level: "missing",
        reason: "The main object that should own the workspace is still unknown.",
      };

  const dataSourceThreshold = hasDataSourceSignal
    ? {
        level: dataSources.length > 0 ? "confirmed" : "inferred",
        reason: dataSources.length > 0
          ? `Real data sources are named: ${dataSources.join(", ")}.`
          : "There are hints about where data comes from, but no explicit source list yet.",
      }
    : {
        level: "missing",
        reason: "The request does not say where the records, counts, or statuses come from.",
      };

  const mutationThreshold = hasMutationSignal
    ? {
        level: mutations.length > 0 ? "confirmed" : "inferred",
        reason: mutations.length > 0
          ? `Real user mutations are named: ${mutations.join(", ")}.`
          : "There are hints that users change data, but the allowed actions are not explicitly listed.",
      }
    : {
        level: "missing",
        reason: "The request does not say what the user can actually change, approve, assign, or update.",
      };

  const timelineThreshold = hasTimelineSignal
    ? {
        level: timelineMoments.length > 0 ? "confirmed" : "inferred",
        reason: timelineMoments.length > 0
          ? `Lifecycle or timeline moments are named: ${timelineMoments.join(", ")}.`
          : "There are hints about stages or refresh timing, but the actual progression is still implicit.",
      }
    : {
        level: "missing",
        reason: "The request does not explain the state progression, lifecycle, or time-based transitions.",
      };

  const thresholds = [surfaceThreshold, actorThreshold, primaryObjectThreshold, dataSourceThreshold, mutationThreshold, timelineThreshold];
  const missingCount = thresholds.filter((item) => item.level === "missing").length;
  const inferredCount = thresholds.filter((item) => item.level === "inferred").length;
  const canSafelyRoute = surfaceThreshold.level !== "missing";
  const canSafelyDesignShell = canSafelyRoute && actorThreshold.level !== "missing" && primaryObjectThreshold.level !== "missing";
  const canSafelyDesignDetailedUI = canSafelyDesignShell
    && dataSourceThreshold.level !== "missing"
    && mutationThreshold.level !== "missing"
    && timelineThreshold.level !== "missing";
  const overall = !canSafelyDesignShell
    ? "unsafe"
    : canSafelyDesignDetailedUI && inferredCount <= 2
      ? "strong"
      : "partial";

  const missingTruths = [
    primaryObjectThreshold.level === "missing"
      ? {
          truth: "Primary object",
          priority: "critical",
          whyItMatters: "Without the main object, AI tends to spray generic cards, filters, and buttons because it has nothing real to organize the screen around.",
          ask: "What is the main thing this screen is actually about: client, case, invoice, order, ticket, person, conversation, document, or something else?",
        }
      : null,
    dataSourceThreshold.level === "missing"
      ? {
          truth: "Data sources",
          priority: "high",
          whyItMatters: "If the source of records is unknown, invented counts, badges, summary cards, and filter chips become fake fast.",
          ask: "Where does this information come from right now: CRM, database, import, API, queue, spreadsheet, or another system?",
        }
      : null,
    mutationThreshold.level === "missing"
      ? {
          truth: "Allowed mutations",
          priority: "critical",
          whyItMatters: "Primary actions, bulk actions, approvals, and assistant commands are bullshit if the system does not know what the user can actually change.",
          ask: "What can the user really do here: assign, approve, edit, schedule, export, comment, escalate, or something else?",
        }
      : null,
    timelineThreshold.level === "missing"
      ? {
          truth: "Lifecycle or timeline",
          priority: "high",
          whyItMatters: "Statuses, progress rails, follow-up reminders, and history views require a real progression model instead of decorative stages.",
          ask: "What stages or moments does this move through over time, and what usually changes between them?",
        }
      : null,
    actorThreshold.level === "missing"
      ? {
          truth: "Primary user",
          priority: "high",
          whyItMatters: "Density, tone, and guidance all drift when AI cannot tell whether this is for an operator, manager, customer, or mixed audience.",
          ask: "Who is the main user when this screen works well?",
        }
      : null,
    surfaceThreshold.level === "missing"
      ? {
          truth: "Surface family",
          priority: "critical",
          whyItMatters: "If the route is unknown, AI borrows the wrong prior and starts filling the screen with whatever dashboard grammar is most common in training data.",
          ask: "Is this an internal operations tool, assistant workspace, docs surface, marketing page, commerce flow, or something else?",
        }
      : null,
  ].filter(Boolean);

  const unsafeAssumptions = uniqueStrings([
    primaryObjectThreshold.level === "missing" ? "Do not invent KPI cards, table columns, inspector sections, or summary modules before the primary object is known." : "",
    dataSourceThreshold.level === "missing" ? "Do not invent metrics, filters, sort orders, or badges until the real data sources and fields are known." : "",
    mutationThreshold.level === "missing" ? "Do not invent primary buttons, bulk actions, approval flows, or assistant tools before the real mutation paths are known." : "",
    timelineThreshold.level === "missing" ? "Do not invent stages, timelines, SLA labels, follow-up rails, or progress indicators before the state progression is known." : "",
    actorThreshold.level === "missing" ? "Do not decide how guided, dense, or self-serve the UI should be until the primary operator is known." : "",
  ]);

  const bannedPlaceholders = uniqueStrings([
    primaryObjectThreshold.level === "missing" ? "Generic dashboard cards that are not anchored to a real object model." : "",
    dataSourceThreshold.level === "missing" ? "Fake filters, fake counts, fake status chips, and invented field labels." : "",
    mutationThreshold.level === "missing" ? "Dummy action bars, empty CTA clusters, and select menus that imply unsupported actions." : "",
    timelineThreshold.level === "missing" ? "Decorative timelines, progress steps, or activity rails with no confirmed lifecycle." : "",
    !canSafelyDesignDetailedUI ? "Placeholder-heavy mock structure presented as if it reflects the real operating model." : "",
  ]);

  const allowedScaffolding = uniqueStrings([
    canSafelyRoute ? `A neutral ${route} shell with explicit labels for still-unknown regions.` : "A neutral frame that says the route is still unknown.",
    "Question-first scaffolding that names what is missing instead of hiding it behind filler UI.",
    primaryObjectThreshold.level !== "missing" ? `Structure the page around ${inferredPrimaryObject} while explicitly marking uncertain metrics or actions as pending confirmation.` : "A single dominant region reserved for the eventual primary work surface.",
    "One clearly labeled example row or detail block only if it is marked illustrative rather than real product truth.",
  ]);

  const commonFailureModes = uniqueStrings([
    "Schema vacuum: when the model lacks a real object model, it defaults to generic dashboard grammar and filler cards.",
    "Mutation blindness: when it does not know what changes are allowed, it invents buttons, selects, and bulk actions that feel busy but mean nothing.",
    "Source laundering: guessed fields get treated like real data sources, so fake chips, counts, and badges start looking authoritative.",
    "Timeline blur: the UI gets stages, progress, or history without a real lifecycle or state machine behind them.",
    "Actor collapse: operator, manager, customer, and assistant needs get merged into one muddy surface because the user role was never made explicit.",
  ]);

  return {
    posture: "When operational truth is missing, the system should ask or scaffold explicitly instead of filling the UI with invented controls and placeholder business logic.",
    thresholdAssessment: {
      overall,
      canSafelyRoute,
      canSafelyDesignShell,
      canSafelyDesignDetailedUI,
      shouldAskFirst: !canSafelyDesignDetailedUI,
      fillerRisk: missingCount >= 3 ? "high" : missingCount >= 1 ? "medium" : "low",
      thresholds: {
        surface: surfaceThreshold,
        actor: actorThreshold,
        primaryObject: primaryObjectThreshold,
        dataSources: dataSourceThreshold,
        mutations: mutationThreshold,
        timeline: timelineThreshold,
      },
      summary: !canSafelyDesignShell
        ? "The request is still too thin for confident design work. Route-level guidance may be possible, but the system should ask before inventing structure."
        : !canSafelyDesignDetailedUI
          ? "The shell can be sketched, but detailed controls, filters, metrics, and statuses are still unsafe to invent."
          : "The request crosses the main truth thresholds, so the system can design with much lower filler risk.",
    },
    missingTruths,
    unsafeAssumptions,
    placeholderPolicy: {
      rule: "If the object model, source model, mutation model, or lifecycle is missing, keep the scaffold honest and visible instead of guessing into fake product logic.",
      ban: bannedPlaceholders,
      allow: allowedScaffolding,
    },
    bridgePlan: {
      inferWithoutAsking: uniqueStrings([
        canSafelyRoute ? `Route the request as ${route} and apply the correct surface posture first.` : "",
        canSafelyDesignShell ? "Establish shell, hierarchy, and region ownership before introducing domain-specific controls." : "",
        primaryObjectThreshold.level === "confirmed" ? `Anchor the hierarchy around ${explicitPrimaryObject}.` : "",
      ]),
      askNext: missingTruths.slice(0, 4).map((item: any) => item.ask),
      forNonDesigners: [
        "What is the main thing this screen is about?",
        "Where does that information come from?",
        "What can the user actually change here?",
        "What stages or moments does it move through over time?",
      ],
    },
    commonFailureModes,
    decisionRule: !canSafelyDesignShell
      ? "Do not generate a detailed dashboard yet. Ask for the missing truths first."
      : !canSafelyDesignDetailedUI
        ? "You may define shell and hierarchy, but stop before inventing filters, metrics, statuses, or action systems."
        : "Proceed with design, but keep every control, metric, and state tied to the named operating model.",
    platform: args.platform || null,
  };
}

function buildDiscoveryIntelligence(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  platform: string;
}) {
  const { request, classification, platform } = args;
  const signalText = buildExperienceSignalText(request, classification);
  const visibleModes = request.context?.visibleModes || [];
  const competingControls = request.context?.competingControls || [];
  const observedAsyncProblems = request.context?.observedAsyncProblems || [];
  const knownProblems = request.context?.knownProblems || [];
  const transitionsNeedingCoverage = request.context?.transitionsNeedingCoverage || [];
  const isAssistantWorkspace = classification.route === "assistant-workspace"
    || /assistant|chat|thread|artifact|conversation|reply|draft/.test(signalText);
  const isInternal = classification.archetype.id === "internal-operations"
    || classification.route === "operational-workbench"
    || /internal|employee|operations|portal|admin|queue|review/.test(signalText);
  const isClientLifecycle = /client|relationship|intake|qualification|ownership|handoff|cadence|follow-up|follow up|fulfillment|staffing|workforce|delivery risk|handoff readiness/.test(signalText);

  const duplicateModeConflict = (visibleModes.length > 1 || /discuss|operational|summary|mute|reply|draft|tab|segmented/.test(signalText))
    && (/dropdown|select|combobox|focus selector|focus drop-?down/.test(signalText)
      || competingControls.some((value) => /dropdown|select|combobox|focus/.test(value.toLowerCase())));
  const hasAsyncContinuityIssues = observedAsyncProblems.length > 0
    || transitionsNeedingCoverage.length > 0
    || /loading|load|refresh|hydrate|clunky|weird|jank|blank|flash|stale|focus jump|scroll jump/.test(signalText);
  const hasHierarchyIssues = /generic|weak|bland|template|off|clutter|crowded|soft|airy|landing page|hero-like|weak task framing/.test(signalText)
    || knownProblems.some((value) => /generic|weak|hierarchy|clutter|soft|airy/.test(value.toLowerCase()));
  const hasScopeCommunicationIssues = /unclear|ambiguous|lost context|does not communicate|doesn't communicate|confusing/.test(signalText)
    || knownProblems.some((value) => /ambiguous|unclear|context/.test(value.toLowerCase()));
  const hasShellRoleConfusion = isAssistantWorkspace
    && /artifact|thread|context|composer|conversation/.test(signalText)
    && /duplicate|confus|lost context|clunky|overlap|mixed roles/.test(signalText);
  const hasModelFramingIssue = isClientLifecycle
    || /event-first|event first|client-lifecycle-first|client relationship/.test(signalText);

  const affectedLayers = uniqueStrings([
    duplicateModeConflict ? "mode-switch controls" : "",
    hasAsyncContinuityIssues ? "loading and transition behavior" : "",
    hasHierarchyIssues ? "hierarchy and surface posture" : "",
    hasScopeCommunicationIssues ? "scope language and state communication" : "",
    hasModelFramingIssue ? "primary object and lifecycle framing" : "",
    hasShellRoleConfusion ? "workspace role separation" : "",
    isAssistantWorkspace ? "thread and artifact continuity" : "",
  ]);

  const structuralPressure = [
    duplicateModeConflict,
    hasAsyncContinuityIssues,
    hasHierarchyIssues,
    hasScopeCommunicationIssues,
    hasModelFramingIssue,
    hasShellRoleConfusion,
  ].filter(Boolean).length;

  const severity = structuralPressure >= 4 || /entire ui|whole ui|everywhere|large ui|larger ui|can't tell every single problem|fix everything/.test(signalText)
    ? "systemic"
    : structuralPressure >= 2
      ? "multi-region"
      : "contained";

  const changeScope = severity === "systemic"
    ? "structural"
    : severity === "multi-region"
      ? "targeted-multi-region"
      : "surgical";

  const investigateFirst = [
    duplicateModeConflict
      ? {
          area: "Control-model conflict",
          why: "The same mode set appears to be expressed twice, which usually causes ambiguity faster than copy or styling problems do.",
          impact: "high",
          check: "Map every visible mode switch and remove duplicate controls for the same state model.",
        }
      : null,
    hasAsyncContinuityIssues
      ? {
          area: "Loading and transition continuity",
          why: "Blank resets, focus loss, and clunky refreshes make the product feel broken even when the visual system is otherwise acceptable.",
          impact: "high",
          check: "Inspect tab switches, thread loads, inspector refreshes, and any place where content swaps after the shell is already on screen.",
        }
      : null,
    hasHierarchyIssues
      ? {
          area: "Hierarchy and task framing",
          why: "If the main job is not obvious, users will describe the UI as generic, soft, or wrong even when individual components are fine.",
          impact: severity === "contained" ? "medium" : "high",
          check: "Compare the dominant task against the visual emphasis of the title, primary action, work surface, and empty or loading states.",
        }
      : null,
    hasModelFramingIssue
      ? {
          area: "Primary object framing",
          why: "If the system is event-first instead of client-lifecycle-first, every downstream queue and assistant action will drift toward the wrong model.",
          impact: "high",
          check: "Verify that client relationship state owns events, meetings, staffing, fulfillment, tasks, cadence, and reporting, rather than the reverse.",
        }
      : null,
    hasScopeCommunicationIssues
      ? {
          area: "Scope communication",
          why: "Weak mode names, counts, and state labels make users think the system is arbitrary or inconsistent.",
          impact: "medium",
          check: "Inspect tabs, filters, badges, and status copy for whether they actually explain what changes and for whom.",
        }
      : null,
    hasShellRoleConfusion
      ? {
          area: "Workspace role separation",
          why: "Assistant workspaces fail when conversation, durable output, and context intake fight for the same region or grammar.",
          impact: "high",
          check: "Audit whether the composer, thread, context rail, and artifact pane each have a stable role or keep overlapping.",
        }
      : null,
  ].filter(Boolean);

  const mustChange = uniqueStrings([
    duplicateModeConflict ? "Remove duplicate mode-switch controls for the same scope." : "",
    hasAsyncContinuityIssues ? "Define per-region loading behavior and stop blanking or resetting the shell during refresh." : "",
    hasHierarchyIssues ? "Make the primary task and dominant work surface obvious before cosmetic polish." : "",
    hasModelFramingIssue ? "Make the client relationship the primary object; events and schedules should appear as downstream states of that client lifecycle." : "",
    hasScopeCommunicationIssues ? "Make mode and filter state self-explanatory with visible labels, counts, and active-state language." : "",
    hasShellRoleConfusion ? "Separate conversation, context, and artifact roles so the workspace stops feeling merged and unstable." : "",
  ]);

  const shouldChange = uniqueStrings([
    "Normalize icon restraint and button emphasis after structural fixes are decided.",
    "Tighten secondary copy once control choices and hierarchy are stable.",
    isInternal ? "Reduce dashboard-card grammar if it competes with the actual work surface." : "",
  ]);

  const canDefer = uniqueStrings([
    "Decorative motion polish.",
    "Brand-surface embellishment that does not change task clarity.",
    "Minor icon swaps that do not change the control model.",
  ]);

  const unavoidableWork = uniqueStrings([
    duplicateModeConflict ? "This is not fixable by styling alone; the control model itself needs to change." : "",
    hasAsyncContinuityIssues ? "Some of this work is structural because loading behavior, focus handling, and stale-content policy live in interaction flow, not just presentation." : "",
    hasShellRoleConfusion ? "If the workspace roles are blurred, pane ownership has to be corrected rather than merely polished." : "",
  ]);

  const likelyBullshit = uniqueStrings([
    structuralPressure >= 2 ? "Treating this as only an icon, color, or spacing problem is probably bullshit; the interaction model is involved." : "",
    duplicateModeConflict ? "Keeping both the visible tabs and the dropdown while merely restyling one of them is bullshit." : "",
    hasAsyncContinuityIssues ? "A prettier spinner without continuity rules is bullshit if tab or thread swaps still blank the surface or steal focus." : "",
    hasHierarchyIssues ? "Gradient, card, or hero treatment changes are bullshit if the main task still lacks a dominant surface." : "",
  ]);

  const confidence = severity === "systemic"
    ? "high"
    : structuralPressure >= 2
      ? "high"
      : "medium";

  return {
    posture: "Run a fast structural triage before broad redesign work. The goal is to identify the few failure classes that explain most of the complaint.",
    investigateFirst,
    gapAssessment: {
      severity,
      changeScope,
      affectedLayers,
      confidence,
      summary: severity === "systemic"
        ? "The complaint likely points to several connected failure classes, so discovery should treat this as a system problem rather than a one-off patch."
        : severity === "multi-region"
          ? "The issue likely spans more than one region, but it can still be contained with targeted structural fixes."
          : "The problem looks concentrated enough that a focused repair pass may be sufficient.",
    },
    changeBudget: {
      mustChange,
      shouldChange,
      canDefer,
      unavoidableWork,
    },
    bullshitFilter: {
      likelyBullshit,
      likelyRootCauses: uniqueStrings([
        duplicateModeConflict ? "duplicate or conflicting control models" : "",
        hasAsyncContinuityIssues ? "missing continuity rules for loading and refresh" : "",
        hasHierarchyIssues ? "weak task hierarchy or wrong surface posture" : "",
        hasModelFramingIssue ? "wrong primary object model driving the workspace" : "",
        hasScopeCommunicationIssues ? "state and scope language not explaining the current mode" : "",
        hasShellRoleConfusion ? "workspace regions not owning distinct roles" : "",
      ]),
    },
    decisionRule: severity === "systemic"
      ? "Do discovery first, then change structure, then polish. Do not start with cosmetic cleanup."
      : severity === "multi-region"
        ? "Fix the dominant structural failures first, then tighten the supporting surfaces around them."
        : "A focused repair pass can probably start immediately, but verify the highest-impact failure class first.",
    platform,
  };
}

function buildWorkflowAuditResponse(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  designProfile: DesignProfile | null;
  foundationCommunication: Record<string, any>;
  discoveryIntelligence: Record<string, any>;
  operationalTruthIntelligence: Record<string, any>;
  transitionStateIntelligence: Record<string, any>;
  iconAndInteractionIntelligence: Record<string, any>;
  shellRecommendation: Record<string, any> | null;
  dominantTaskSurface: string;
  stateRisks: string[];
  coherenceRisks: string[];
  buildGuidanceLines: string[];
  missingTruth: string[];
}) {
  const packet = buildWorkflowAuditPacket(args.request, args.classification);
  const targetSurface = packet.targetSurface || "the current surface";
  const dominantTaskSurface = humanizeIdentifier(args.dominantTaskSurface) || "primary work surface";
  const shellLabel = args.shellRecommendation?.label || humanizeIdentifier(args.classification.route) || "current routed shell";
  const mustChange = (args.discoveryIntelligence?.changeBudget?.mustChange || []) as string[];
  const canDefer = (args.discoveryIntelligence?.changeBudget?.canDefer || []) as string[];
  const shouldChange = (args.discoveryIntelligence?.changeBudget?.shouldChange || []) as string[];
  const investigateFirst = (args.discoveryIntelligence?.investigateFirst || []) as Array<Record<string, string>>;
  const likelyRootCauses = (args.discoveryIntelligence?.bullshitFilter?.likelyRootCauses || []) as string[];
  const transitionRepairTargets = (args.transitionStateIntelligence?.repairTargets || []) as string[];
  const interactionRepairTargets = (args.iconAndInteractionIntelligence?.repairTargets || []) as string[];
  const shouldAskFirst = Boolean(args.operationalTruthIntelligence?.thresholdAssessment?.shouldAskFirst);

  const currentDirectionToPreserve = buildWorkflowAuditBulletList([
    packet.whatAlreadyWorks
      ? `Preserve the gains already visible on ${targetSurface}: ${packet.whatAlreadyWorks}.`
      : "",
    packet.whatMustNotBeLost
      ? `Keep ${packet.whatMustNotBeLost} as a hard guardrail while this iteration changes controls, timing, or shared structure.`
      : "",
    packet.primaryObject
      ? `Keep ${packet.primaryObject} as the organizing object for ${targetSurface}; do not let the interface drift back to generic dashboard framing.`
      : "",
    `Keep the ${dominantTaskSurface} as the dominant work surface and let ${shellLabel} own the hierarchy before any decorative or summary-heavy supporting modules.`,
    args.designProfile
      ? `Preserve the ${args.designProfile.label.toLowerCase()} posture: ${args.designProfile.summary}`
      : "",
    args.foundationCommunication?.surfacePosture
      ? `Preserve the routed surface posture: ${args.foundationCommunication.surfacePosture}.`
      : "",
  ], 4, [
    `Keep the interface reading as one coherent system on ${targetSurface} instead of a collection of local fixes.`,
  ]);

  const majorPitfallsOrWorkflowFlaws = buildWorkflowAuditBulletList([
    ...investigateFirst.slice(0, 3).map((item) => `${item.area}: ${item.why}`),
    packet.recentChanges
      ? `Drift risk: ${packet.recentChanges} can improve one workspace locally while weakening the shared control system unless the same timing and hierarchy rules are rechecked across adjacent workspaces.`
      : "",
    args.coherenceRisks[0]
      ? `Coherence risk: ${args.coherenceRisks[0]}`
      : "",
    args.stateRisks[0]
      ? `Timing risk: ${args.stateRisks[0]}`
      : "",
    args.missingTruth[0]
      ? `Truth gap: ${args.missingTruth[0]} is still underspecified, so local UI fixes can drift into filler workflow logic or inconsistent control timing.`
      : "",
    likelyRootCauses[0]
      ? `Structural root cause: ${likelyRootCauses[0]}.`
      : "",
  ], 5, [
    `Shared controls will keep feeling heavier than the work they govern if the system keeps solving local complaints without re-validating cross-workspace consistency.`,
  ]);

  const whatToFixInThisIteration = buildWorkflowAuditBulletList([
    ...mustChange,
    ...transitionRepairTargets,
    ...interactionRepairTargets,
    ...args.buildGuidanceLines,
  ], 5, [
    `Re-run the current iteration against ${targetSurface} after every structural fix so local improvements do not reintroduce drift elsewhere.`,
  ]);

  const whatToDeferUntilLater = buildWorkflowAuditBulletList([
    ...canDefer,
    ...shouldChange.map((item) => `Later pass: ${item}`),
  ], 3, [
    "Later pass: decorative motion polish.",
    "Later pass: minor icon swaps that do not change the control model.",
    "Later pass: copy tightening after hierarchy, timing, and control ownership are stable.",
  ]);

  const promptingOrWorkflowAdjustments = buildWorkflowAuditBulletList([
    `Name ${targetSurface} explicitly near the top of the request and keep unrelated auth, onboarding, or assistant history out unless it directly changes that surface.`,
    `Separate stable truths from deltas every time: primary user, primary object, data sources, allowed mutations, and lifecycle first; recent changes second.`,
    (args.request.context?.dataSources || []).length === 0
      ? `Data sources are absent: declare the real sources (CRM, API, queue, DB) before describing any data-heavy region — the agent will invent metric labels and column structure without a real source to shape the display.`
      : ``,
    (args.request.context?.dataSources || []).length === 0 && !args.request.context?.primaryObject
      ? `Primary object is also missing: name the entity the surface is actually operating on (e.g. 'client record', 'task', 'invoice') so the agent can anchor every label, column, and empty state to real product logic instead of generic software vocabulary.`
      : ``,
    args.request.context?.existingSurfaceSignals?.some((s: string) =>
      ["placeholder", "mock", "lorem", "dummy", "canned"].some((w) => s.toLowerCase().includes(w))
    )
      ? `Placeholder signals detected in surface vocabulary: replace with real object language before continuing — agents that build on synthetic vocabulary will deepen filler structure rather than resolve it.`
      : ``,
    `Keep “what already works” and “what must not be lost” in the packet before the critique so the audit preserves the current direction instead of resetting it.`,
    `When the complaint is about control timing or continuity, include visible modes, competing controls, observed async problems, and transitions needing coverage instead of only aesthetic language.`,
    shouldAskFirst && args.missingTruth[0]
      ? `If ${args.missingTruth[0]} is still missing, ask only for that truth next instead of widening the brief or dumping unrelated feature history.`
      : `Keep the output budget fixed to preserve, pitfalls, fix-now, defer-later, and prompting adjustments so the iteration stays actionable rather than turning into a broad redesign summary.`,
  ], 5);

  return {
    mode: "workflow-audit-and-iteration",
    endpoint: "/api/agent",
    stage: "workflow-audit-and-iteration",
    currentDirectionToPreserve,
    majorPitfallsOrWorkflowFlaws,
    whatToFixInThisIteration,
    whatToDeferUntilLater,
    promptingOrWorkflowAdjustments,
  };
}

function buildWorkflowAuditStageResponse(request: AgentResolutionRequest): Record<string, unknown> {
  const classification = resolveResolutionClassification(request);
  const resolutionSignalText = buildExperienceSignalText(request, classification);
  const designProfile = pickQuestionDesignProfile({
    archetype: classification.archetype,
    sector: classification.sector,
    confidence: classification.confidence,
    archetypeScore: 0,
    sectorScore: 0,
  });
  const platform = inferResolutionPlatform(request, classification);
  const contextIntelligence = buildContextIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const operationalTruthIntelligence = buildOperationalTruthIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          primaryObject: request.context.primaryObject,
          agentNotes: request.context.agentNotes,
          userRoles: request.context.userRoles,
          dataSources: request.context.dataSources,
          mutations: request.context.mutations,
          timelineMoments: request.context.timelineMoments,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const discoveryIntelligence = buildDiscoveryIntelligence({
    request,
    classification,
    platform,
  });
  const foundationCommunication = buildFoundationCommunication({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
    },
    designProfile,
  });

  // Workflow audits do not need the full component bundle. Keep the stage fast by using
  // lightweight shell placeholders while still reusing the same routing intelligence.
  const lightweightShell: Record<string, any> = {};
  const transitionStateIntelligence = buildTransitionStateIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell: lightweightShell,
    allComponents: [],
  });
  const iconAndInteractionIntelligence = buildIconAndInteractionIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell: lightweightShell,
    allComponents: [],
  });
  const confidenceMode = inferOrchestrationConfidenceMode(classification.confidence, operationalTruthIntelligence);
  const dominantTaskSurface = inferDominantTaskSurface(classification, resolutionSignalText, lightweightShell);
  const missingTruth = extractMissingTruthLabels(operationalTruthIntelligence);
  const shellRecommendation = buildShellRecommendation({
    route: classification.route,
    dominantTaskSurface,
    shell: lightweightShell,
    designProfile,
    confidenceMode,
  });
  const stateRisks = buildStateRisks({
    transitionStateIntelligence,
    operationalTruthIntelligence,
  });
  const coherenceRisks = buildCoherenceRisks({
    contextIntelligence,
    discoveryIntelligence,
  });
  const buildGuidanceLines = buildGuidance({
    dominantTaskSurface,
    shellRecommendation,
    confidenceMode,
    missingTruth,
    stateRisks,
    coherenceRisks,
  });

  return buildWorkflowAuditResponse({
    request,
    classification,
    designProfile,
    foundationCommunication,
    discoveryIntelligence,
    operationalTruthIntelligence,
    transitionStateIntelligence,
    iconAndInteractionIntelligence,
    shellRecommendation,
    dominantTaskSurface,
    stateRisks,
    coherenceRisks,
    buildGuidanceLines,
    missingTruth,
  });
}

function likelyFailuresByRoute(route: string) {
  if (route === "assistant-workspace") {
    return "The shell may be confusing conversation, context, and durable output instead of separating their roles clearly.";
  }
  if (route === "operational-workbench") {
    return "The page may be framing work as generic dashboard content instead of as a clear queue, review, or decision surface.";
  }
  if (route === "marketing-surface") {
    return "The page may be defaulting to generic startup-site sections instead of a sharper narrative or proof structure.";
  }
  if (route === "docs-surface") {
    return "The page may be underserving navigation, anchors, or reading hierarchy.";
  }
  return "";
}

function buildQuestionManifest() {
  return {
    mode: "question-router",
    endpoint: "/api/agent",
    oneWayContract: "Ask a precise question and optionally attach portable agent context. The endpoint classifies the surface, chooses a route, and returns a source-free resource pull without depending on local session state.",
    preferredQuestionStyle: [
      "this is a dashboard for internal policy or company operations",
      "this is a landing page for a SaaS product",
      "this is an approval / review workflow",
      "this is a developer tool",
      "this is a video game ui",
      "this is the problem the user is facing, here is what it was about, and here is the route I think it needs",
      "plain language works: what the screen is about, where the data comes from, what the user can change, and what it moves through over time",
    ],
    supportedArchetypes: agentQuestionArchetypes.map((archetype) => ({
      id: archetype.id,
      label: archetype.label,
      supportLevel: archetype.supportLevel,
      summary: archetype.summary,
      sectors: archetype.sectors.map((sector) => ({
        id: sector.id,
        label: sector.label,
        route: sector.route,
        designProfileId: sector.designProfileId || null,
      })),
    })),
    designProfiles: Object.values(designProfiles).map((profile) => ({
      id: profile.id,
      label: profile.label,
      summary: profile.summary,
      iconLibrary: profile.iconSystem.primaryLibrary,
      spacingDensity: profile.spacing.density,
      layoutMood: profile.layoutMood,
    })),
    iconLibraryCatalog,
    inputContract: {
      get: {
        required: ["question"],
        optional: ["context", "goal", "routeHint", "agentContextSummary", "platform"],
        posture: "Use GET when one agent wants to hand another agent a portable, source-free summary of what the current problem is about.",
      },
      post: {
        structuredResolution: "Use POST when the agent already has a richer payload and wants explicit shell/component routing plus context digestion.",
      },
    },
    responseShape: {
      classification: "Broad UI family plus narrower sector when possible.",
      designProfile: "Source-free spacing, typography, icon-system, motion, elevation, and grouping posture for the selected route.",
      resourcePull: "Source-free categories, reference components, pattern pulls, and avoid lists.",
      portableContext: "GET responses can echo attached agent context so another agent can verify what problem summary or route hint was actually sent.",
      resolutionMode: "POST a structured operational request to receive shell picks, ranked component recommendations, token posture, a composition plan, and optional intake-context digestion from the original prompt and complaint.",
      screenshotGrounding: "POST can include screenshots so the server can privately ground vague complaints against visible hierarchy, density, controls, and tone before routing.",
      contextIntelligence: "Responses can translate vague complaints into likely design failures, extracted signals, ambiguity flags, and the next best clarifying question.",
      operationalTruthIntelligence: "Responses can detect whether the request names the real object model, data sources, mutations, and lifecycle strongly enough to avoid filler UI and invented business logic.",
      discoveryIntelligence: "Structured resolution responses can run a fast discovery pass that estimates severity, change scope, what to inspect first, what is structural, and what is probably noise or bullshit.",
      transitionStateIntelligence: "Structured resolution responses can define loading preservation, tab or thread switching behavior, duplicate-control warnings, and focus or scroll continuity rules.",
      iconAndInteractionIntelligence: "Structured resolution responses can recommend icon posture, dropdown alternatives, view-switch controls, feedback behavior, and cross-window continuity guidance.",
      foundationCommunication: "Responses can infer likely tone, likely likes and dislikes, safe defaults, and the single clarifying preference question worth asking next.",
      implementationReadiness: "Structured resolution responses can state whether the system can start applying foundational assets immediately and what approval should be requested.",
      nextQuestions: "Static follow-up questions to narrow the route further without sending code.",
    },
    noSourceIncluded: true,
  };
}

function buildQuestionResponse(questionRequest: AgentQuestionRequest): Record<string, unknown> {
  const primaryQuestion = getPrimaryPrompt(questionRequest);
  const questionPrompt = buildQuestionPrompt(questionRequest);
  let classification = classifyAgentQuestion(questionPrompt);
  const explicitSector = findSectorByLookup(questionRequest.routeHint);
  const explicitArchetype = findArchetypeByLookup(questionRequest.routeHint);

  if (explicitSector) {
    classification = {
      ...classification,
      archetype: explicitSector.archetype,
      sector: explicitSector.sector,
      confidence: Math.max(classification.confidence, 0.9),
    };
  } else if (explicitArchetype) {
    classification = {
      ...classification,
      archetype: explicitArchetype,
      confidence: Math.max(classification.confidence, 0.84),
    };
  }

  const portableContext = buildPortableQuestionContextDigest(questionRequest);
  const contextIntelligence = buildContextIntelligence({
    question: primaryQuestion,
    goal: questionRequest.goal,
    platform: questionRequest.platform,
    route: classification.sector?.route || classification.archetype.id,
    context: {
      summary: questionRequest.agentContextSummary,
      freeformContext: questionRequest.context,
      agentContextSummary: questionRequest.agentContextSummary,
    },
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.sector?.route || classification.archetype.id,
      confidence: classification.confidence,
    },
  });
  const operationalTruthIntelligence = buildOperationalTruthIntelligence({
    question: primaryQuestion,
    goal: questionRequest.goal,
    platform: questionRequest.platform,
    route: classification.sector?.route || classification.archetype.id,
    context: {
      summary: questionRequest.agentContextSummary,
      freeformContext: questionRequest.context,
      agentContextSummary: questionRequest.agentContextSummary,
    },
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.sector?.route || classification.archetype.id,
      confidence: classification.confidence,
    },
  });
  const foundationCommunication = buildFoundationCommunication({
    question: primaryQuestion,
    goal: questionRequest.goal,
    platform: questionRequest.platform,
    route: classification.sector?.route || classification.archetype.id,
    context: {
      summary: questionRequest.agentContextSummary,
      freeformContext: questionRequest.context,
      agentContextSummary: questionRequest.agentContextSummary,
    },
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.sector?.route || classification.archetype.id,
    },
    designProfile: null,
  });

  if (classification.archetype.supportLevel === "unsupported") {
    return {
      mode: "question-router",
      endpoint: "/api/agent",
      question: primaryQuestion,
      portableContext,
      contextIntelligence,
      operationalTruthIntelligence,
      foundationCommunication,
      noSourceIncluded: true,
      classification: {
        archetype: {
          id: classification.archetype.id,
          label: classification.archetype.label,
          supportLevel: classification.archetype.supportLevel,
          summary: classification.archetype.summary,
        },
        sector: null,
        confidence: classification.confidence,
        supported: false,
        reason: `The question most closely matches ${classification.archetype.label}, which this system does not try to route or optimize for.`,
      },
      designProfile: null,
      resourcePull: {
        route: classification.archetype.id,
        categories: [],
        components: [],
        criticalReferences: [],
        patterns: [],
        avoid: [
          "Do not use this endpoint as the design authority for game HUDs, inventory systems, quest logs, or combat overlays.",
          "Do not map game UI problems onto internal operations or landing-page patterns just to force a match.",
        ],
        notes: [
          "This system is tuned for product, marketing, developer-tool, and internal operational surfaces.",
          "If the surface is actually a game-adjacent launcher or account system, ask a narrower product question instead.",
        ],
      },
      nextQuestions: [
        "is this actually a product account/settings surface instead of game UI?",
        "is this a launcher or store surface instead of in-game UI?",
        "is this a developer tool or admin panel related to the game rather than the game itself?",
      ],
    };
  }

  const routeCategories = pickQuestionCategories(classification);
  const designProfile = pickQuestionDesignProfile(classification);
  const routedFoundationCommunication = buildFoundationCommunication({
    question: primaryQuestion,
    goal: questionRequest.goal,
    platform: questionRequest.platform,
    route: classification.sector?.route || classification.archetype.id,
    context: {
      summary: questionRequest.agentContextSummary,
      freeformContext: questionRequest.context,
      agentContextSummary: questionRequest.agentContextSummary,
    },
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.sector?.route || classification.archetype.id,
    },
    designProfile,
  });
  const adaptedBundle = getOperationalWorkbenchBundle({
    scenario: questionPrompt || primaryQuestion,
    taskType: "audit",
    platform: questionRequest.platform,
  }) as Record<string, any>;

  const allComponents = (adaptedBundle.componentCatalog?.allComponents || []) as Array<Record<string, any>>;
  const categories = (adaptedBundle.componentCatalog?.categories || []) as Array<Record<string, any>>;
  const hintSet = new Set(classification.sector?.componentHints || []);
  const candidateComponents = allComponents
    .map((component) => ({
      component,
      pullScore:
        (routeCategories.includes(component.category) ? 18 : 0) +
        (hintSet.has(component.slug) ? 40 : 0) +
        (component.scenarioRelevanceScore || component.relevanceScore || 0),
    }))
    .filter((item) => item.pullScore > 0)
    .sort((left, right) => right.pullScore - left.pullScore)
    .slice(0, 10)
    .map((item) => ({
      slug: item.component.slug,
      title: item.component.title,
      description: item.component.description,
      category: item.component.category,
      density: item.component.density,
      whyPulled:
        hintSet.has(item.component.slug)
          ? "Direct sector hint"
          : routeCategories.includes(item.component.category)
            ? "Matches the selected category pull"
            : "High relevance to the question wording",
      sourceIncluded: false,
    }));

  const selectedCategories = categories
    .filter((category) => routeCategories.includes(category.name))
    .slice(0, 6)
    .map((category) => ({
      name: category.name,
      priorityScore: category.priorityScore || category.priority,
      whyRelevant: category.whyRelevant,
    }));

  const critical = adaptedBundle.foundationCriticalComponents || {};
  const criticalRefs = Object.entries(critical)
    .slice(0, 8)
    .map(([key, value]) => ({
      key,
      slug: (value as Record<string, any>).slug,
      title: (value as Record<string, any>).title,
      description: (value as Record<string, any>).description,
      whyChosen: (value as Record<string, any>).whyChosen,
      sourceIncluded: false,
    }));

  const nextQuestions = classification.archetype.id === "unknown"
    ? [
        "is this an internal company operations system?",
        "is this a landing page?",
        "is this documentation or a knowledge base?",
        "is this a storefront or checkout flow?",
        "is this a developer tool?",
        "is this a video game ui?",
      ]
    : classification.archetype.id === "internal-operations"
      ? [
          "is this an approval or review workflow?",
          "is this finance or reconciliation?",
          "is this case management or support?",
          "is this monitoring / analytics operations?",
        ]
      : classification.archetype.id === "landing-page"
        ? [
            "is this a saas landing page?",
            "is this more editorial / brand-led than conversion-led?",
            "is conversion the primary goal?",
          ]
        : classification.archetype.id === "docs-knowledge"
          ? [
              "is this product documentation or a broader help center?",
              "does this need strong local navigation and anchors?",
              "is this actually a product settings surface instead of docs?",
            ]
          : classification.archetype.id === "commerce-marketplace"
            ? [
                "is this browse/catalog or checkout/purchase?",
                "is merchandise imagery the primary hierarchy driver?",
                "does this need marketplace profile patterns?",
              ]
            : classification.archetype.id === "developer-tool"
              ? [
                  "is this an editor / terminal workbench?",
                  "does this need multi-panel tooling density?",
                  "is this actually an internal operations console instead of a dev tool?",
                ]
              : [
                  "is this settings / account ui?",
                  "is this a collaboration workspace?",
                  "is this an auth or onboarding flow?",
                  "does this require dense operational review?",
                ];

  return {
    mode: "question-router",
    endpoint: "/api/agent",
    question: primaryQuestion,
    portableContext,
    contextIntelligence,
    operationalTruthIntelligence,
    noSourceIncluded: true,
    classification: {
      archetype: {
        id: classification.archetype.id,
        label: classification.archetype.label,
        supportLevel: classification.archetype.supportLevel,
        summary: classification.archetype.summary,
      },
      sector: classification.sector
        ? {
            id: classification.sector.id,
            label: classification.sector.label,
            route: classification.sector.route,
          }
        : null,
      confidence: classification.confidence,
      supported: true,
      reason: classification.sector
        ? `The question most closely matches ${classification.sector.label} inside ${classification.archetype.label}.`
        : classification.archetype.id === "unknown"
          ? "The question is too broad or mixed, so the endpoint cannot safely choose a narrow route yet."
          : `The question most closely matches ${classification.archetype.label}.`,
    },
    designProfile: designProfile
      ? {
          id: designProfile.id,
          label: designProfile.label,
          summary: designProfile.summary,
          layoutMood: designProfile.layoutMood,
          spacing: designProfile.spacing,
          typography: designProfile.typography,
          iconSystem: designProfile.iconSystem,
          colorAndElevation: designProfile.colorAndElevation,
          motion: designProfile.motion,
          grouping: designProfile.grouping,
        }
      : null,
    foundationCommunication: routedFoundationCommunication,
    resourcePull: {
      route: classification.sector?.route || classification.archetype.id,
      categories: selectedCategories,
      components: candidateComponents,
      criticalReferences: criticalRefs,
      patterns: uniqueStrings([
        ...(classification.sector?.patternHints || []),
        ...(adaptedBundle.agentRouting?.boostedPatterns || []),
      ]).slice(0, 4),
      avoid: uniqueStrings([
        ...(classification.sector?.avoid || []),
        ...(adaptedBundle.agentPlan?.antiPatternWatch || []),
      ]).slice(0, 8),
      notes: uniqueStrings([
        ...(classification.sector?.notes || []),
        ...(adaptedBundle.agentRouting?.guidance || []),
      ]).slice(0, 8),
    },
    nextQuestions,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Elevation Intelligence ("Good to Great")
// ─────────────────────────────────────────────────────────────────────────────
const elevationComponentFreshnessSignals = [
  "card grid", "card-based", "cards everywhere", "kebab", "more options",
  "metric card", "kpi card", "empty state generic", "card mosaic",
];

const elevationCopyWeaknessSignals = [
  "dashboard", "settings", "manage your", "overview", "analytics overview",
  "home", "get started", "explore",
];

const elevationDensitySignals = [
  "cluttered", "too much information", "overwhelming", "dense", "busy",
  "information overload", "hard to scan", "too many",
];

const elevationInteractionMissingSignals = [
  "no feedback", "no loading", "blank", "flicker", "jump", "jank",
  "slow", "no confirmation", "missing state",
];

const dataIntegrityPlaceholderSignals = [
  "lorem", "ipsum", "placeholder", "mock data", "fake data", "sample data",
  "test data", "dummy", "canned kpi", "example.com", "synthetic", "hardcoded",
  "mock user", "example user", "fake user", "coming soon", "tbd",
];

// IA depth-mismatch: summary or top-level surface context signals
const iaSummaryContextSignals = [
  "overview", "home view", "summary page", "at a glance", "high level",
  "top level", "main screen", "first screen", "starting screen", "home tab",
  "overview tab", "overview page", "overview screen",
];

// IA depth-mismatch: detail-dump signals — data too granular for a summary surface
const iaDetailDumpSignals = [
  "vendor list", "event type", "all event", "every event", "list of all",
  "table of all", "all records", "full catalog", "event catalog",
  "all clients", "all users", "all tasks", "full list", "every item",
  "complete list", "full table", "all available", "all options",
  "event ideas", "type sheet", "event sheet",
];

// IA depth-mismatch: high-level audience roles that should not be seeing granular ops detail at summary level
const iaSeniorAudienceSignals = [
  "manager", "territory", "executive", "director", "vp", "ceo", "coo",
  "territory specialist", "regional", "operations lead",
];

function buildElevationIntelligence(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  operationalTruthIntelligence: Record<string, any>;
  foundationCommunication: Record<string, any>;
  contextIntelligence: Record<string, any>;
  transitionStateIntelligence: Record<string, any>;
  iconAndInteractionIntelligence: Record<string, any>;
  designProfile: DesignProfile | null;
}): Record<string, unknown> {
  const clarificationCount = (args.operationalTruthIntelligence?.clarificationQuestions || []).length;
  const shouldAskFirst = Boolean(args.operationalTruthIntelligence?.thresholdAssessment?.shouldAskFirst);

  if (clarificationCount > 2 || shouldAskFirst) {
    return {
      elevationReadiness: "fix_structure_first",
      requirementNote: "Elevation can only improve what has been honestly built. Resolve the outstanding operational truth gaps before applying elevation moves — otherwise the elevation layer will decorate structural problems instead of transcending them.",
      missingTruth: (args.operationalTruthIntelligence?.missingSignals || []).slice(0, 3),
    };
  }

  const prompt = getPrimaryPrompt(args.request) || "";
  const complaint = args.request.context?.userComplaint || "";
  const knownProblems = (args.request.context?.knownProblems || []).join(" ");
  const signalText = [prompt, complaint, knownProblems].join(" ").toLowerCase();
  const archetype = args.classification.archetype.id;
  const confidence = args.classification.confidence;

  if (!prompt && confidence < 0.4) {
    return {
      elevationReadiness: "needs_truth",
      requirementNote: "Not enough surface context to identify meaningful elevation moves. Provide the primary object, surface type, and at least one operational problem before requesting elevation guidance.",
    };
  }

  const hasCardDependency =
    elevationComponentFreshnessSignals.some((s) => signalText.includes(s.toLowerCase())) ||
    (archetype === "internal-operations" && signalText.includes("card"));
  const hasDensityComplaint = elevationDensitySignals.some((s) => signalText.includes(s.toLowerCase()));
  const hasMissingInteraction =
    elevationInteractionMissingSignals.some((s) => signalText.includes(s.toLowerCase())) ||
    (args.transitionStateIntelligence?.repairTargets || []).length > 0;
  const hasWeakCopy = elevationCopyWeaknessSignals.some((s) => signalText.includes(s.toLowerCase()));
  const hasColorComplaint =
    signalText.includes("color") || signalText.includes("theme") ||
    signalText.includes("brand") || signalText.includes("accent");
  const isOperational = archetype === "internal-operations" || archetype === "developer-tool";
  const isMarketing = archetype === "landing-page" || archetype === "conversion-funnel";
  const hasPlaceholderSignals = dataIntegrityPlaceholderSignals.some((s) => signalText.includes(s));
  const contextDataSources = args.request.context?.dataSources || [];
  const hasSummaryContext = iaSummaryContextSignals.some((s) => signalText.includes(s));
  const hasDetailDump = iaDetailDumpSignals.some((s) => signalText.includes(s));
  const hasSeniorAudience = iaSeniorAudienceSignals.some((s) => signalText.includes(s));
  const hasIADepthMismatch = hasSummaryContext && hasDetailDump;
  const hasAudienceMismatch = hasSeniorAudience && hasDetailDump;
  const hasDataSourceGap =
    contextDataSources.length === 0 &&
    (signalText.includes("dashboard") || signalText.includes("metric") ||
     signalText.includes("kpi") || signalText.includes("analytic") ||
     signalText.includes("report") || signalText.includes("chart") ||
     signalText.includes("stat") || signalText.includes("usage"));

  const whatIsAlreadyGood = buildWorkflowAuditBulletList([
    args.request.context?.existingSurfaceSignals?.length
      ? `Established surface vocabulary: ${args.request.context.existingSurfaceSignals.slice(0, 2).join(" and ")} are already present and routed correctly.`
      : "",
    confidence >= 0.7
      ? `Surface is correctly classified as ${args.classification.archetype.label} — foundational design discipline is in place.`
      : "",
    args.foundationCommunication?.safeDefaults?.length
      ? `Safe defaults established: ${(args.foundationCommunication.safeDefaults as string[]).slice(0, 2).join("; ")}.`
      : "",
    args.designProfile
      ? `Design profile (${args.designProfile.label}) provides a settled font, spacing, and density baseline to elevate from.`
      : "",
    args.request.context?.userRoles?.length
      ? `User role (${args.request.context.userRoles[0]}) is named — the surface has a clear operator, not an imagined audience.`
      : "",
  ], 3, [
    "Routing is resolved and the surface archetype is clear — elevation work can build on a real foundation rather than reinventing structure.",
    "The prompting style reflects operational specificity — future elevation guidance can be precise rather than generic.",
  ]);

  const genericTraps = buildWorkflowAuditBulletList([
    hasCardDependency
      ? "Card-as-container dependency: borders and card elevation are doing organizational work that type weight and proximity should handle."
      : "",
    hasWeakCopy
      ? "Generic surface labels (dashboard, overview, manage) that could belong to any software product — no product-specific language tied to the actual objects and operations."
      : "",
    isOperational && signalText.includes("icon")
      ? "Icon decoration drift: icons present in contexts where they add visual complexity but not navigational or semantic weight."
      : "",
    hasColorComplaint
      ? "Single-accent color system with no semantic color roles — accent is doing visual interest work instead of communicating action, status, or danger."
      : "",
    signalText.includes("shadow") || signalText.includes("gradient")
      ? "Elevation or gradient effects applied where flat structure and type hierarchy would read more deliberately crafted."
      : "",
    !isMarketing && signalText.includes("empty state")
      ? "Empty states that placeholder-decorate a missing-data moment instead of making the zero-state an honest, purposeful surface."
      : "",
    hasPlaceholderSignals
      ? "Placeholder data vocabulary: the surface uses synthetic labels, mock values, or lorem text — the agent cannot honestly elevate until real object language and actual data shape are established."
      : "",
    hasDataSourceGap
      ? "Data source gap: data-heavy surface with no declared sources — without a source schema, the agent fills display regions with invented structure instead of real product logic."
      : "",
    hasIADepthMismatch
      ? "Information architecture depth mismatch: a summary or overview surface is being asked to carry detail-level data (full lists, catalogs, event type tables). Summary surfaces answer 'what is the state of the system right now' — not 'here is every item in a category'. Move detail-level content behind drill-downs, drawers, or secondary routes."
      : "",
    hasAudienceMismatch
      ? "Audience-level mismatch: a manager or territory-level role is being shown granular operational detail that only makes sense inside a specific workflow context. Granular ops data should surface conditionally — when the user is in that workflow — not unconditionally on a high-level screen."
      : "",
  ], 3, [
    "All-card layout on a surface where task is recall or review — table or two-panel structure is likely the stronger dominant form.",
    "Kebab menus or 'More options' everywhere — if 2–3 actions are always relevant, they should be visible as in-context controls.",
  ]);

  const transitionRepairTargets = (args.transitionStateIntelligence?.repairTargets || []) as string[];
  const interactionRepairTargets = (args.iconAndInteractionIntelligence?.repairTargets || []) as string[];
  const likelyFailures = (
    args.contextIntelligence?.detectedDesignFailures ||
    args.contextIntelligence?.likelyFailures ||
    []
  ) as string[];

  const frictionCuts = buildWorkflowAuditBulletList([
    ...transitionRepairTargets.slice(0, 2),
    ...interactionRepairTargets.slice(0, 2),
    ...likelyFailures.slice(0, 2).map((f: string) => `Reduce friction at: ${f}`),
    hasDensityComplaint
      ? "Reduce cognitive friction: apply breathing whitespace between independent information groups — proximity encodes relationship, lines add noise."
      : "",
    hasDataSourceGap
      ? "Declare real data sources before designing data-heavy regions: CRM field names, API response shapes, and state machine stages belong in the brief before any metric column, chart dimension, or filter is designed."
      : "",
    hasPlaceholderSignals
      ? "Replace placeholder vocabulary with real object language: identify the primary object's actual field names, status values, and lifecycle labels, then use those in every column header, label, and empty state."
      : "",
  ], 4, [
    "Reduce decision friction at the primary entry point: the first action a user takes should require no scanning to find.",
    "Reduce copy friction: replace any label that requires reading to understand with a label that is understood on sight.",
    "Reduce state friction: ensure every state transition (loading, empty, error) communicates specifically what changed and what the user should do next.",
  ]);

  const differentiatingMoves = buildWorkflowAuditBulletList([
    isOperational && hasCardDependency
      ? "Typography as structure: remove card borders from grouped information regions and let heading size and weight do the organization. The surface immediately reads as more considered."
      : "",
    hasMissingInteraction
      ? "Purposeful micro-transitions: add 100–150ms ease-in-out on hover for interactive rows, panels, and drawers. A single consistent timing token applied everywhere reads as intentional craft."
      : "",
    hasWeakCopy
      ? "Object-specific copy: rename surface labels to reflect the actual primary object and its lifecycle state — 'Client Pipeline' instead of 'Dashboard', 'Pending Approvals' instead of 'Overview'. Reads as purpose-built software."
      : "",
    isOperational && !signalText.includes("mono")
      ? "Monospace data signals: apply JetBrains Mono to all IDs, timestamps, money values, and counts. A single font token upgrade makes data-dense surfaces read as precision instruments."
      : "",
    hasColorComplaint
      ? "Semantic color roles: assign one color per role (action, status/positive, warning, danger, neutral structure). Every pixel of color communicates something — none is decorative."
      : "",
    isMarketing
      ? "Typography-led sections: replace section title + icon + text cards with a large anchor heading and a paragraph. Whitespace and type weight communicate separation better than any card can."
      : "",
  ], 4, [
    "Density calibration: compress padding on non-hero, non-CTA regions to create visual hierarchy through contrast — dense operational content reads as more capable than loose card grids.",
    "Purposeful empty states: treat the zero-state as a designed surface, not a placeholder. Name the object, explain the absence, and offer the first action. This is where operational tools most often look unfinished.",
    "Control ownership discipline: pick one dominant interactive model per region — table row actions, inline edit, or drawer. Mixing all three within a single surface is the single fastest signal that the interface was assembled, not designed.",
  ]);

  const elevationSequence = [
    "1. Structure: Validate that type hierarchy, not borders or card elevation, is doing organizational work across all regions.",
    "2. Copy: Replace any generic surface or section label with language specific to the primary object and its operational state.",
    "3. Interaction: Add a single timing token (100–150ms ease-in-out) to all interactive regions uniformly — rows, drawers, toggles, buttons.",
    "4. Data signals: Apply the monospace font token to every ID, timestamp, currency value, and count visible on the surface.",
    "5. Color semantics: Audit every use of the primary accent — is it communicating action, or is it decoration? Purge the decoration uses.",
    "6. Polish: Once structure, copy, interaction, data signals, and color are coherent, revisit motion depth, spacing micro-rhythm, and empty-state craft.",
  ];

  const elevationMaxim = isMarketing
    ? "Great marketing surfaces are typographic first — the hierarchy of words earns attention before the first icon, card, or color is applied."
    : isOperational
    ? "Great operational software reads like precision instruments: every label names something real, every control does exactly one thing, and the surface communicates competence before beauty."
    : "Great product surfaces eliminate the visible evidence that they were built incrementally — coherent control ownership, uniform interaction timing, and language specific to the user's actual work replace the assembly-line feel.";

  const dataIntegrityRisks: string[] = [
    ...(hasPlaceholderSignals
      ? ["Synthetic placeholder data detected: replace with real object vocabulary before elevation — elevation on top of fake language deepens the filler problem, it does not resolve it."]
      : []),
    ...(hasDataSourceGap
      ? ["Data sources absent: data-heavy surface with no declared source schema — agent will invent display structure without real shape guidance. Declare the source before designing around its shape."]
      : []),
    ...(!args.request.context?.primaryObject && (signalText.includes("data") || signalText.includes("metric"))
      ? ["Primary object absent: metric and data display regions will default to generic card patterns without a declared primary object to anchor field names and status vocabulary."]
      : []),
  ];

  const architectureRisks: string[] = [
    ...(hasIADepthMismatch
      ? ["IA depth mismatch detected: overview or summary surface is carrying detail-level data. A summary surface answers 'what is the state of the system' — not 'here is every item in a category'. Catalogs, full event-type lists, and vendor tables belong behind drill-downs, drawers, or dedicated secondary routes. Only surface them when the user is in the specific workflow that justifies them."]
      : []),
    ...(hasAudienceMismatch
      ? ["Audience mismatch detected: a high-level role (manager, territory, director) is being shown granular operational data. Conditional surfacing rule: granular ops data appears only when the user enters the workflow that requires it — never on a general summary screen. The overview surface should reflect system state at the level the role actually governs — not drill into itemized detail records."]
      : []),
  ];

  return {
    elevationReadiness: "ready_to_elevate",
    whatIsAlreadyGood,
    genericTraps,
    frictionCuts,
    differentiatingMoves,
    elevationSequence,
    elevationMaxim,
    ...(dataIntegrityRisks.length > 0 ? { dataIntegrityRisks } : {}),
    ...(architectureRisks.length > 0 ? { architectureRisks } : {}),
  };
}

function buildElevationAuditStageResponse(request: AgentResolutionRequest): Record<string, unknown> {
  const classification = resolveResolutionClassification(request);
  const designProfile = pickQuestionDesignProfile({
    archetype: classification.archetype,
    sector: classification.sector,
    confidence: classification.confidence,
    archetypeScore: 0,
    sectorScore: 0,
  });
  const platform = inferResolutionPlatform(request, classification);
  const contextIntelligence = buildContextIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const operationalTruthIntelligence = buildOperationalTruthIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          primaryObject: request.context.primaryObject,
          agentNotes: request.context.agentNotes,
          userRoles: request.context.userRoles,
          dataSources: request.context.dataSources,
          mutations: request.context.mutations,
          timelineMoments: request.context.timelineMoments,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const foundationCommunication = buildFoundationCommunication({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
    },
    designProfile,
  });
  const lightweightShell: Record<string, any> = {};
  const transitionStateIntelligence = buildTransitionStateIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell: lightweightShell,
    allComponents: [],
  });
  const iconAndInteractionIntelligence = buildIconAndInteractionIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell: lightweightShell,
    allComponents: [],
  });
  const elevationIntelligence = buildElevationIntelligence({
    request,
    classification,
    operationalTruthIntelligence,
    foundationCommunication,
    contextIntelligence,
    transitionStateIntelligence,
    iconAndInteractionIntelligence,
    designProfile,
  });
  return {
    mode: "elevation-audit",
    endpoint: "/api/agent",
    stage: "elevation-audit",
    surfaceType: classification.archetype.id,
    route: classification.route,
    confidence: classification.confidence,
    ...elevationIntelligence,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Funnel Strategy Intelligence
// ─────────────────────────────────────────────────────────────────────────────
const funnelFrictionMatrix: Record<string, string> = {
  "cold:none": "frictionless", "cold:email": "frictionless", "cold:trial": "light-touch",
  "cold:purchase": "structured", "cold:application": "high-commitment",
  "warm:none": "frictionless", "warm:email": "frictionless", "warm:trial": "light-touch",
  "warm:purchase": "structured", "warm:application": "structured",
  "hot:none": "frictionless", "hot:email": "frictionless", "hot:trial": "light-touch",
  "hot:purchase": "light-touch", "hot:application": "structured",
};

const funnelBusinessTypeMap: Record<string, string> = {
  "local_service": "frictionless", "local service": "frictionless", "home service": "frictionless",
  "healthcare": "frictionless", "dental": "frictionless", "plumber": "frictionless",
  "coaching": "high-commitment", "consultant": "high-commitment", "consulting": "high-commitment",
  "agency": "structured", "marketing agency": "structured", "saas": "light-touch",
  "enterprise": "high-commitment", "b2b saas": "structured",
};

const funnelTensionStrategies: Record<string, string[]> = {
  "frictionless": [
    "Transform-first hook: lead with the specific outcome the visitor will gain, not the product features, in the first 3 seconds.",
    "Minimum viable commitment: email or one-click — every additional field before first conversion reduces completion by 15–20%.",
    "Social proof after decision, not before: logo bars build recognition at entry; testimonials near the CTA validate the specific action.",
    "Price invisible at cold entry — the commitment threshold should be emotional (will this work for me?) before it becomes financial.",
    "Make the CTA the only decision: one primary action, one page, one promise.",
  ],
  "light-touch": [
    "Feature proof before CTA: show enough evidence to justify the trial — one compelling outcome, not a feature list.",
    "Brand recognition as trust shortcut: logos of companies the visitor knows matter more than testimonials they cannot verify.",
    "One-field-at-a-time form: progressive disclosure on signup reduces abandonment more than any copy improvement.",
    "Immediate value activation: post-signup, show the value within 60 seconds — the decision needs rapid confirmation.",
    "Secondary CTA for the undecided: a softer path (watch demo, see how it works) captures visitors not ready to commit.",
  ],
  "structured": [
    "Proof before CTA: at least one quantified outcome or named case study must be visible before the primary call to action.",
    "Pricing visible but timed: show pricing below the fold after the value case is established — trust first, price second.",
    "Qualification sub-text: a short line near the CTA naming who this is best for pre-qualifies and increases intent quality.",
    "FAQ near the bottom CTA: objections addressed near the conversion point remove the final resistance.",
    "Secondary CTA captures mid-funnel intent: 'Download the case study' or 'See pricing' serves visitors who need more time.",
  ],
  "high-commitment": [
    "Authority signals anchor the page: thought leadership credentials, named case study headline, or founder proof above the fold.",
    "Deliberate friction communicates selectivity: a short qualifier question near the CTA signals that not everyone is accepted.",
    "Case study depth over testimonial breadth: one detailed named case study outperforms a grid of short anonymous quotes.",
    "Scarcity or availability signal: enrollment size, cohort start date, or calendar availability anchors urgency without manufactured pressure.",
    "Copy earns the CTA: the application or discovery call CTA should feel like the natural conclusion of the page, not a surprise.",
  ],
};

const funnelCtaGuidanceMap: Record<string, Record<string, string>> = {
  "frictionless": {
    primary: "Get [specific outcome] free — name the transformation, not the product. 'Get my free [X]' outperforms 'Sign Up' by 2–4x.",
    secondaryCta: "See how it works — a softer option for skeptics that keeps them engaged without asking for commitment.",
    timing: "Above the fold, visible without scrolling. The CTA should be the first decision, not a reward for reading.",
    copyDirection: "Outcome-first, benefit-specific, zero feature language. The button finishes the sentence 'After I click this, I will...'",
  },
  "light-touch": {
    primary: "Start free — remove the credit card objection explicitly: 'Start free, no card required'. The objection removal is as important as the action.",
    secondaryCta: "See a 2-minute demo — gives hesitant visitors a lower-commitment social-proof path.",
    timing: "After the feature proof section or above the fold if the product is well-known. Do not gate it below a long scroll for warm awareness.",
    copyDirection: "Action + objection removal. 'Start building in 2 minutes' or 'Try it free — cancel any time'. Urgency via ease, not scarcity.",
  },
  "structured": {
    primary: "Book a demo / Start your trial — specificity matters: name what happens next. 'Book a 30-minute walk-through' outperforms 'Request demo'.",
    secondaryCta: "See pricing / Read the case study — captures the undecided and gives the sales team a warm signal.",
    timing: "After a case study or social proof section. Not at the top unless the visitor is already warm from retargeting.",
    copyDirection: "Specific benefit or objection removal framing. Avoid generic verbs: Request, Submit, Send. Use Start, Get, Book, See.",
  },
  "high-commitment": {
    primary: "Apply now / Schedule your strategy session — the language of selectivity. 'Apply' communicates that a standard signup is not available.",
    secondaryCta: "Read the full case study — keeps high-intent visitors who need more authority evidence before committing.",
    timing: "After the authority section and near any qualification statement. Should feel like the natural conclusion of the page.",
    copyDirection: "Outcome + selectivity language. 'Work with us if...' phrasing pre-qualifies and increases application quality.",
  },
};

const funnelDataOrders: Record<string, string[]> = {
  "frictionless": [
    "Email only at entry — first conversion is consent, not data collection.",
    "First name on the confirmation or welcome screen — needed for personalization, not gating.",
    "Business or use case signal captured in the first product interaction, not the signup form.",
  ],
  "light-touch": [
    "Email first — the only required field at entry.",
    "First name on step 2 or confirmation (reduces abandonment vs. asking upfront).",
    "Company name only if the product is explicitly B2B and routing-critical.",
    "Role or team size in the first meaningful product interaction, not the signup form.",
  ],
  "structured": [
    "Name and email at entry.",
    "Company name and role on step 2.",
    "Team size or primary use case on step 3.",
    "Primary problem (brief) — qualifies the lead before demo booking.",
    "Preferred timeline — gives sales a prioritization signal.",
  ],
  "high-commitment": [
    "Name and email to unlock the application.",
    "Company, role, and team context on page 2.",
    "Current challenge (open text, 2–3 sentences) — quality signal over quantity.",
    "Timeline and budget range — necessary for high-ticket qualification.",
    "How they heard about you — source intelligence for the sales team.",
    "One specific desired outcome — commitment question that filters low-intent applicants.",
  ],
};

const funnelDropoffRiskMap: Record<string, string[]> = {
  "frictionless": [
    "Asking for phone number at or near cold entry — phone at entry cuts conversion by 40–60% vs. email-only.",
    "Requiring account creation before delivering the promised free resource.",
    "Showing pricing or plan comparison above the fold at cold entry — triggers financial objection before emotional buy-in.",
    "Form with more than 2 fields at cold entry — every additional field reduces completion by ~15%.",
    "CTA that contradicts the headline promise — if the headline says 'free', the button cannot imply a paid step.",
  ],
  "light-touch": [
    "Feature overload above the fold instead of a single clear benefit statement.",
    "Non-mobile-optimized form — 60–70% of PLG signups originate on mobile.",
    "Email confirmation with no immediate value delivery — the post-signup moment is the highest engagement window.",
    "No progress indicator on multi-step signup — users abandon unknown-length flows more than known-length ones.",
    "Pricing page as the first major scroll stop — it interrupts the value narrative before trust is built.",
  ],
  "structured": [
    "Demo request form that asks for budget before showing what the demo includes.",
    "Social proof that does not match the visitor's industry or company stage — relevance matters more than volume.",
    "Second CTA that competes with the primary (equal visual weight creates decision paralysis).",
    "Long-form request on mobile without a simplified mobile variant.",
    "No acknowledgement after form submission — confirming timeline and next step reduces buyer's remorse.",
  ],
  "high-commitment": [
    "Application form that asks for everything on a single screen — multi-step with progress indication reduces abandonment.",
    "Generic testimonials without role titles, company names, or specific outcomes — credibility requires specificity.",
    "Too polished or agency-looking an aesthetic for a selective, boutique positioning.",
    "No calendar tool or next-step confirmation visible immediately after application submit.",
    "CTA copy that sounds like every other coaching or agency page — name the session specifically, not generically.",
  ],
};

const funnelProgressionAnchorMap: Record<string, string[]> = {
  "frictionless": [
    "Scroll past fold → curiosity confirmed, visitor is evaluating.",
    "Time-on-page > 20s → reading the promise, belief forming.",
    "Hover on CTA → intent signal, decision moment.",
    "Enter email → micro-commitment, first conversion complete.",
    "Open confirmation email within 10 min → engaged, priority nurture candidate.",
  ],
  "light-touch": [
    "Interact with or watch product demo / feature preview → product-aware.",
    "Hover or toggle pricing section → purchase-aware, evaluating objections.",
    "Click primary CTA → conversion intent strong.",
    "Complete email step → first commitment.",
    "Complete onboarding step 1 within 24h → activation signal, highest retention predictor.",
  ],
  "structured": [
    "Download lead magnet or view demo teaser → interest confirmed.",
    "Return visit within 48h → high consideration.",
    "Submit first qualification field (name + email) → declared interest.",
    "Complete all form fields → high intent, sales-ready handoff.",
    "Open outreach email from sales within 24h → qualified pipeline entry.",
  ],
  "high-commitment": [
    "Read full case study or long-form content page → authority accepted.",
    "Fill qualification question with substantive answer → real intent signal.",
    "Submit application → declared commitment.",
    "Open scheduling link from acceptance email → pipeline entry.",
    "Complete discovery call → closed-loop conversion.",
  ],
};

const funnelTrustSignalMap: Record<string, string[]> = {
  "frictionless": [
    "Logo bar immediately below hero — recognition before proof. Place logos of brands the visitor likely recognizes.",
    "Single testimonial near the CTA — social validation at the exact decision point.",
    "Privacy note or 'no spam' guarantee below the email field — objection removal at submit.",
    "Count or community size signal (e.g., '12,000+ subscribers') as secondary authority.",
  ],
  "light-touch": [
    "Logo bar above fold — brand recognition shortcuts decision time.",
    "G2, Product Hunt, or Capterra rating chip near primary CTA.",
    "Named customer quote with role and company in the mid-funnel feature section.",
    "30-day guarantee or 'cancel any time' language near the pricing/trial CTA.",
  ],
  "structured": [
    "Named customer story (outcome + company + role) above the main CTA — specificity over volume.",
    "Quantified outcome in the hero subheading — '43% faster close' earns attention faster than feature lists.",
    "Industry-matched company logos — relevance to the visitor's sector matters more than name recognition.",
    "FAQ near the bottom CTA removes the final objection at the convert-or-leave moment.",
  ],
  "high-commitment": [
    "Founder or expert photo with specific credential above the fold — authority must be named, not implied.",
    "Full case study excerpt (2–3 paragraphs) with named outcome before the CTA — not a pull quote.",
    "Named testimonials with role, company, and specific result (no anonymous titles).",
    "Waitlist size, cohort start, or availability signal creates urgency without manufacturing scarcity.",
  ],
};

const funnelComponentSuggestionMap: Record<string, string[]> = {
  "frictionless": ["marketing-hero-shell", "hero-cta-buttons", "sign-in-form-clean", "testimonial-card", "review-card", "trial-banner"],
  "light-touch": ["marketing-hero-shell", "hero-cta-buttons", "feature-comparison-table", "testimonial-card", "stepper-onboarding-flow", "usage-based-pricing", "welcome-checklist"],
  "structured": ["marketing-hero-shell", "three-tier-pricing", "feature-comparison-table", "testimonial-card", "multi-step-wizard", "dark-pricing-card", "plan-upgrade-cta", "feature-highlight-tooltip"],
  "high-commitment": ["marketing-hero-shell", "multi-step-wizard", "review-card", "feature-highlight-tooltip", "creator-storefront-profile", "upgrade-modal-pattern"],
};

function deriveFunnelFrictionProfile(args: {
  audienceWarmth?: string;
  pricePoint?: string;
  commitmentRequired?: string;
  businessProfile?: { businessType?: string; productCategory?: string };
  signalText: string;
}): string {
  const businessType = (args.businessProfile?.businessType || "").toLowerCase();
  for (const [key, profile] of Object.entries(funnelBusinessTypeMap)) {
    if (businessType.includes(key)) return profile;
  }
  if (args.pricePoint === "enterprise") return "high-commitment";
  if (args.pricePoint === "high" && args.commitmentRequired === "application") return "high-commitment";
  const matrixKey = `${args.audienceWarmth || "cold"}:${args.commitmentRequired || "email"}`;
  if (funnelFrictionMatrix[matrixKey]) return funnelFrictionMatrix[matrixKey];
  if (/apply|application|book.?a.?call|high.?ticket|coaching|consulting|agency/i.test(args.signalText)) return "high-commitment";
  if (/demo request|pricing|compare|case.?study/i.test(args.signalText)) return "structured";
  if (/signup|sign.?up|get.?started|try.?free|free.?trial/i.test(args.signalText)) return "light-touch";
  return "frictionless";
}

function buildFunnelTimingMap(frictionProfile: string): Array<Record<string, unknown>> {
  const maps: Record<string, Array<Record<string, unknown>>> = {
    "frictionless": [
      { moment: "0–3s first impression", userState: "Curious but skeptical", deliverNow: ["Transformation headline (outcome promise)", "Single evocative visual or social proof number"], deferUntil: ["Pricing", "Feature lists", "Secondary CTAs"] },
      { moment: "3–15s value scan", userState: "Evaluating belief", deliverNow: ["Top social proof signal (logos or count)", "1-sentence benefit statement below headline"], deferUntil: ["Long testimonials", "FAQ", "Comparisons"] },
      { moment: "15–40s decision point", userState: "Ready to act or leave", deliverNow: ["Primary CTA (form field or button)", "One near-CTA trust signal (privacy note or rating)"], deferUntil: ["Company details", "Multi-field form expansion", "Pricing"] },
    ],
    "light-touch": [
      { moment: "0–5s awareness", userState: "Product-aware, evaluating alternatives", deliverNow: ["Clear product benefit (not feature)", "Brand logo and trust tier signal"], deferUntil: ["Pricing", "Full feature matrix"] },
      { moment: "5–30s proof scan", userState: "Building justification", deliverNow: ["1 key feature or outcome illustrated", "2–3 logos or a G2 chip"], deferUntil: ["Long-form case studies", "Pricing toggle"] },
      { moment: "30–90s feature consideration", userState: "Objections active", deliverNow: ["Feature highlights with outcome framing", "Comparison or social proof row"], deferUntil: ["Technical docs", "Onboarding steps"] },
      { moment: "90s+ CTA moment", userState: "Near decision", deliverNow: ["Primary CTA with objection removal", "Secondary CTA for undecided"], deferUntil: ["Pricing detail", "Terms"] },
    ],
    "structured": [
      { moment: "0–5s authority scan", userState: "Evaluating credibility", deliverNow: ["Credibility headline with quantified outcome", "Brand logo bar"], deferUntil: ["Pricing", "Application form"] },
      { moment: "5–45s case study / proof", userState: "Justifying to stakeholders", deliverNow: ["Named case study headline or outcome stat", "1 specific customer story"], deferUntil: ["Full pricing breakdown", "Long FAQ"] },
      { moment: "45–120s feature and fit evaluation", userState: "Mapping to their problem", deliverNow: ["Feature highlights relevant to their role", "Pricing or tier signal"], deferUntil: ["Onboarding steps", "Integration docs"] },
      { moment: "120s+ CTA or secondary action", userState: "Decision or more research", deliverNow: ["Primary CTA", "FAQ addressing final objections", "Secondary downgrade CTA"], deferUntil: ["Company bio", "Press mentions"] },
    ],
    "high-commitment": [
      { moment: "0–10s authority first impression", userState: "Sizing up the authority claim", deliverNow: ["Founder/expert photograph and specific credential", "One powerful outcome statement"], deferUntil: ["Application form", "Pricing", "Testimonial grid"] },
      { moment: "10–60s proof depth", userState: "Testing whether this is real", deliverNow: ["Full case study excerpt (named company, specific result)", "One credibility association (press, partner, credential)"], deferUntil: ["Checkout", "Form fields"] },
      { moment: "60–180s selective positioning", userState: "Deciding if they qualify", deliverNow: ["'This is for you if...' qualification statement", "Scarcity or availability signal"], deferUntil: ["Contact form", "Social media links"] },
      { moment: "180s+ application CTA", userState: "Ready to commit or disqualify", deliverNow: ["Application CTA with specificity about what happens next", "One final named testimonial near the button"], deferUntil: ["FAQ", "General about page"] },
    ],
  };
  return maps[frictionProfile] || maps["frictionless"];
}

function buildFunnelIntelligence(args: {
  request: AgentResolutionRequest;
  classification: ReturnType<typeof resolveResolutionClassification>;
  foundationCommunication: Record<string, any>;
  contextIntelligence: Record<string, any>;
  platform: string;
}): Record<string, unknown> {
  const funnelCtx = (args.request as any).funnelContext || {};
  const businessProfile = funnelCtx.businessProfile || {};
  const prompt = getPrimaryPrompt(args.request) || "";
  const signalText = [prompt, args.request.goal || "", args.request.context?.summary || ""].join(" ");

  const frictionProfile = deriveFunnelFrictionProfile({
    audienceWarmth: funnelCtx.audienceWarmth,
    pricePoint: funnelCtx.pricePoint,
    commitmentRequired: funnelCtx.commitmentRequired,
    businessProfile,
    signalText,
  });

  const trafficTemperature: string =
    funnelCtx.audienceWarmth ||
    (/cold traffic|new visitor|ad traffic|awareness/i.test(signalText) ? "cold" :
     /retarget|returning|already know|newsletter|warm/i.test(signalText) ? "warm" :
     /high intent|pricing|compare|ready to buy|hot/i.test(signalText) ? "hot" : "cold");

  const conversionMechanism =
    funnelCtx.commitmentRequired === "email" ? "email-capture" :
    funnelCtx.commitmentRequired === "trial" ? "trial-signup" :
    funnelCtx.commitmentRequired === "purchase" ? "direct-purchase" :
    funnelCtx.commitmentRequired === "application" ? "application-submit" :
    funnelCtx.commitmentRequired === "none" ? "passive-engagement" :
    frictionProfile === "high-commitment" ? "application-submit" :
    frictionProfile === "structured" ? "demo-request" :
    frictionProfile === "light-touch" ? "trial-signup" : "email-capture";

  const businessTypeSuffix = businessProfile.businessType
    ? ` for ${businessProfile.businessType}`
    : businessProfile.industry
    ? ` in ${businessProfile.industry}`
    : "";

  const funnelTypeLabels: Record<string, string> = {
    "frictionless": `frictionless lead capture${businessTypeSuffix}`,
    "light-touch": `PLG / light-touch trial signup${businessTypeSuffix}`,
    "structured": `structured demo-request or consideration funnel${businessTypeSuffix}`,
    "high-commitment": `high-ticket application or discovery-call funnel${businessTypeSuffix}`,
  };

  return {
    funnelType: funnelTypeLabels[frictionProfile] || `conversion funnel (${frictionProfile})`,
    frictionProfile,
    trafficTemperature,
    conversionMechanism,
    tensionStrategy: funnelTensionStrategies[frictionProfile] || funnelTensionStrategies["frictionless"],
    ctaGuidance: funnelCtaGuidanceMap[frictionProfile] || funnelCtaGuidanceMap["frictionless"],
    dataCollectionOrder: funnelDataOrders[frictionProfile] || funnelDataOrders["frictionless"],
    dropoffRisks: funnelDropoffRiskMap[frictionProfile] || funnelDropoffRiskMap["frictionless"],
    progressionAnchors: funnelProgressionAnchorMap[frictionProfile] || funnelProgressionAnchorMap["frictionless"],
    trustSignalPlacement: funnelTrustSignalMap[frictionProfile] || funnelTrustSignalMap["frictionless"],
    timingMap: buildFunnelTimingMap(frictionProfile),
    componentSuggestions: funnelComponentSuggestionMap[frictionProfile] || funnelComponentSuggestionMap["frictionless"],
  };
}

function buildFunnelStrategyStageResponse(request: AgentResolutionRequest): Record<string, unknown> {
  const classification = resolveResolutionClassification(request);
  const designProfile = pickQuestionDesignProfile({
    archetype: classification.archetype,
    sector: classification.sector,
    confidence: classification.confidence,
    archetypeScore: 0,
    sectorScore: 0,
  });
  const platform = inferResolutionPlatform(request, classification);
  const contextIntelligence = buildContextIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const foundationCommunication = buildFoundationCommunication({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
    },
    designProfile,
  });
  const funnelIntelligence = buildFunnelIntelligence({
    request,
    classification,
    foundationCommunication,
    contextIntelligence,
    platform,
  });
  return {
    mode: "funnel-strategy",
    endpoint: "/api/agent",
    stage: "funnel-strategy",
    surfaceType: classification.archetype.id,
    route: classification.route,
    confidence: classification.confidence,
    ...funnelIntelligence,
  };
}

function buildResolutionResponse(request: AgentResolutionRequest): Record<string, unknown> {
  if (request.stage === "workflow-audit-and-iteration") {
    return buildWorkflowAuditStageResponse(request);
  }
  if (request.stage === "elevation-audit") {
    return buildElevationAuditStageResponse(request);
  }
  if (request.stage === "funnel-strategy") {
    return buildFunnelStrategyStageResponse(request);
  }

  const classification = resolveResolutionClassification(request);
  const resolutionSignalText = buildExperienceSignalText(request, classification);
  const designProfile = pickQuestionDesignProfile({
    archetype: classification.archetype,
    sector: classification.sector,
    confidence: classification.confidence,
    archetypeScore: 0,
    sectorScore: 0,
  });
  const bundleRequest = buildResolutionBundleRequest(request, classification);
  const adaptedBundle = getOperationalWorkbenchBundle(bundleRequest) as Record<string, any>;
  const allComponents = ((adaptedBundle.componentCatalog?.allComponents || []) as Array<Record<string, any>>)
    .filter((component) => component.slug !== "derived-dialog");
  const critical = (adaptedBundle.foundationCriticalComponents || {}) as Record<string, any>;
  const density = request.constraints?.density || designProfile?.spacing.density || "compact";
  const platform = inferResolutionPlatform(request, classification);
  const outputPreferences = {
    rankedComponents: request.output?.rankedComponents ?? true,
    alternativesPerCategory: request.output?.alternativesPerCategory ?? 3,
    includeAnatomy: request.output?.includeAnatomy ?? true,
    includeStateCoverage: request.output?.includeStateCoverage ?? true,
    includeTransitionGuidance: request.output?.includeTransitionGuidance ?? true,
    includeCompositionGuidance: request.output?.includeCompositionGuidance ?? true,
    includeTokenPosture: request.output?.includeTokenPosture ?? true,
  };
  const isAssistantWorkspace = classification.route === "assistant-workspace"
    || classification.sector?.id === "ai-assistant-workspace";
  const isClientLifecycleWorkbench = classification.route === "operational-workbench"
    && /client|relationship|intake|qualification|ownership|handoff|cadence|follow-up|follow up|fulfillment|staffing|workforce|delivery risk|handoff readiness/.test(resolutionSignalText);
  const avoidDeveloperWorkbench = /developer workbench styling|developer-tool chrome|developer tool|not a developer tool/.test(resolutionSignalText);
  const assistantPrimaryShell = pickComponentByMatchers(
    allComponents,
    [
      (component) => /general-assistant-chat-workspace/.test(component.slug),
      (component) => /artifact-collaboration-shell/.test(component.slug),
      (component) => /chat|assistant/.test(component.slug),
    ],
  );
  const assistantArtifact = pickComponentByMatchers(
    allComponents,
    [
      (component) => /artifact-collaboration-shell/.test(component.slug),
      (component) => /docs-writing-shell/.test(component.slug),
      (component) => /thread|chat/.test(component.slug),
    ],
  );
  const assistantContextPanel = pickComponentByMatchers(
    allComponents,
    [
      (component) => /context-aware-assistant-console/.test(component.slug),
      (component) => /artifact-collaboration-shell/.test(component.slug),
      (component) => /command-palette/.test(component.slug),
    ],
  );

  const topNavigation = pickComponentByMatchers(
    allComponents,
    [
      (component) => /sidebar|split-nav|minimal-sidebar/.test(component.slug),
      (component) => component.category === "Navigation",
    ],
  );
  const topHeader = pickComponentByMatchers(
    allComponents,
    [
      (component) => /header/.test(component.slug),
      (component) => component.category === "Dashboard",
      (component) => component.category === "Layout",
    ],
  );
  const topInspector = critical.sideRailPanel || critical.decisionPanel || pickComponentByMatchers(
    allComponents,
    [
      (component) => /detail|master-detail|inspector|thread/.test(component.slug),
      (component) => component.category === "Layout",
    ],
  );
  const topDrawer = critical.exportPreviewPanel || topInspector;
  const topToast = pickComponentByMatchers(
    allComponents,
    [
      (component) => /toast|notification|validation/.test(component.slug),
      (component) => component.category === "Feedback",
    ],
  );
  const topLoading = pickComponentByMatchers(allComponents, [
    (component) => component.category === "Loading",
    (component) => /loading|skeleton/.test(component.slug),
  ]);
  const topEmpty = pickComponentByMatchers(allComponents, [
    (component) => component.category === "Empty States",
    (component) => /empty/.test(component.slug),
  ]);
  const lifecycleAppShell = pickComponentByMatchers(
    allComponents,
    [
      (component) => component.slug === "sidebar-app-shell",
      (component) => component.slug === "master-detail-shell",
      (component) => /sidebar-app-shell|master-detail-shell/.test(component.slug),
    ],
  );

  const shell = {
    appShell: isAssistantWorkspace
      ? assistantPrimaryShell || critical.appShell
      : isClientLifecycleWorkbench && avoidDeveloperWorkbench
        ? lifecycleAppShell || topNavigation || critical.appShell
        : critical.appShell,
    sidebarNav: topNavigation,
    topBar: topHeader,
    toolbar: isAssistantWorkspace ? assistantContextPanel || critical.workbenchToolbar : critical.workbenchToolbar,
    table: isAssistantWorkspace ? assistantArtifact || critical.table : critical.table,
    inspector: isAssistantWorkspace ? assistantContextPanel || assistantArtifact || topInspector : topInspector,
    selectionBar: critical.selectionBar,
    drawer: topDrawer,
    modal: critical.dialog,
    toast: topToast,
  };

  const alternativeLimit = outputPreferences.alternativesPerCategory;
  const componentRecommendations = (isAssistantWorkspace
    ? [
        buildResolutionGroup({
          label: "conversation-shell",
          roleLabel: "primary assistant conversation shell",
          primary: shell.appShell,
          alternatives: allComponents.filter((component) => /assistant|chat|thread|messaging/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "artifact-pane",
          roleLabel: "persistent draft or artifact pane",
          primary: shell.table,
          alternatives: allComponents.filter((component) => /artifact|docs-writing|thread|chat/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "context-intake",
          roleLabel: "prompt and complaint context panel",
          primary: shell.inspector,
          alternatives: allComponents.filter((component) => /context|command|assistant|artifact/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "feedback",
          roleLabel: "toast and validation feedback",
          primary: topToast,
          alternatives: allComponents.filter((component) => component.category === "Feedback" || /toast|notification|validation/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
      ]
    : [
        buildResolutionGroup({
          label: "table",
          roleLabel: "table-first workspace",
          primary: critical.table,
          alternatives: allComponents.filter((component) => component.category === "Tables").slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "filters",
          roleLabel: "sticky filter toolbar",
          primary: critical.workbenchToolbar,
          alternatives: allComponents.filter((component) => /filter|date|command|chip|toolbar/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "inspector",
          roleLabel: "right-side inspector",
          primary: topInspector,
          alternatives: [critical.decisionPanel, ...allComponents.filter((component) => /detail|master-detail|thread/.test(component.slug))]
            .filter(Boolean)
            .slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "bulk-actions",
          roleLabel: "selection and commit actions",
          primary: critical.selectionBar,
          alternatives: [
            ...allComponents.filter((component) => /60-30-10-button-system|icon-label-buttons|ghost-button-collection|loading-state-buttons/.test(component.slug)),
          ].slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "feedback",
          roleLabel: "toast and validation feedback",
          primary: topToast,
          alternatives: allComponents.filter((component) => component.category === "Feedback" || /toast|notification|validation/.test(component.slug)).slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
        buildResolutionGroup({
          label: "loading-empty",
          roleLabel: "loading and zero-state coverage",
          primary: topLoading || topEmpty,
          alternatives: allComponents.filter((component) => component.category === "Loading" || component.category === "Empty States").slice(0, alternativeLimit),
          classification,
          density,
          includeAnatomy: outputPreferences.includeAnatomy,
          includeStateCoverage: outputPreferences.includeStateCoverage,
        }),
      ]).filter(Boolean);

  const selectedShellSlugs = new Set(
    Object.values(shell)
      .filter(Boolean)
      .map((component: any) => component.slug)
  );
  const nearMatches = allComponents
    .filter((component) => !selectedShellSlugs.has(component.slug))
    .slice(0, 4)
    .map((component) => buildResolutionComponentSummary(component, {
      classification,
      density,
      roleLabel: "near match",
      includeAnatomy: false,
      includeStateCoverage: false,
    }));

  const rankedSourceComponents = uniqueBy(
    [
      shell.appShell,
      shell.topBar,
      shell.sidebarNav,
      shell.toolbar,
      shell.table,
      shell.inspector,
      shell.selectionBar,
      shell.drawer,
      shell.toast,
      topLoading,
      topEmpty,
      ...allComponents,
    ].filter(Boolean) as Array<Record<string, any>>,
    (component: Record<string, any>) => component.slug,
  );

  const rankedComponents = outputPreferences.rankedComponents
    ? rankedSourceComponents.slice(0, 10).map((component: Record<string, any>) => buildResolutionComponentSummary(component, {
        classification,
        density,
        roleLabel: "ranked operational candidate",
        includeAnatomy: outputPreferences.includeAnatomy,
        includeStateCoverage: outputPreferences.includeStateCoverage,
      }))
    : [];

  const implementationStarter = buildImplementationStarter({
    request,
    classification,
    designProfile,
    shell,
    density,
    platform,
    rankedComponents,
  });
  const approvalPrompt = buildApprovalPrompt({
    request,
    classification,
    designProfile,
    platform,
    shell,
  });
  const implementationReadiness = buildImplementationReadiness({
    classification,
    designProfile,
    platform,
  });
  const contextDigest = buildResolutionContextDigest(request);
  const contextIntelligence = buildContextIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  const operationalTruthIntelligence = buildOperationalTruthIntelligence({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          primaryObject: request.context.primaryObject,
          agentNotes: request.context.agentNotes,
          userRoles: request.context.userRoles,
          dataSources: request.context.dataSources,
          mutations: request.context.mutations,
          timelineMoments: request.context.timelineMoments,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
      confidence: classification.confidence,
    },
  });
  if (operationalTruthIntelligence.thresholdAssessment.shouldAskFirst) {
    implementationReadiness.canStart = false;
    implementationReadiness.requiresOnlyApproval = false;
    Object.assign(implementationReadiness, {
      requiresTruthClarification: true,
      rationale: [
        "The route may be good enough for shell-level guidance, but the operating model is still too thin for implementation-first action.",
        "Do not invent filters, metrics, statuses, or actions until the missing object, data, mutation, and timeline truths are clarified.",
        "Use the operationalTruthIntelligence block to ask the next highest-value questions in plain language.",
      ],
    });
    approvalPrompt.readyForApproval = false;
    approvalPrompt.ask = "Confirm the missing operational truths before implementation.";
    approvalPrompt.summary = "The route is usable, but the system should not invent detailed controls or business logic until the missing operating-model facts are confirmed.";
    approvalPrompt.scopeIfApproved = operationalTruthIntelligence.bridgePlan.askNext;
    approvalPrompt.minimalApprovalReply = "Clarify the missing operational truths before implementation.";
  }
  const discoveryIntelligence = buildDiscoveryIntelligence({
    request,
    classification,
    platform,
  });
  const foundationCommunication = buildFoundationCommunication({
    question: getPrimaryPrompt(request),
    goal: request.goal,
    platform,
    route: classification.route,
    context: request.context
      ? {
          summary: request.context.summary,
          problemStatement: request.context.problemStatement,
          routingIntent: request.context.routingIntent,
          handoff: request.context.handoff,
          originalPrompt: request.context.originalPrompt,
          userComplaint: request.context.userComplaint,
          transcript: request.context.transcript,
          agentNotes: request.context.agentNotes,
        }
      : null,
    classification: {
      archetype: classification.archetype,
      sector: classification.sector,
      route: classification.route,
    },
    designProfile,
  });
  const iconAndInteractionIntelligence = buildIconAndInteractionIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell,
    allComponents,
  });
  const transitionStateIntelligence = buildTransitionStateIntelligence({
    request,
    classification,
    designProfile,
    platform,
    shell,
    allComponents,
  });
  const confidenceMode = inferOrchestrationConfidenceMode(classification.confidence, operationalTruthIntelligence);
  const dominantTaskSurface = inferDominantTaskSurface(classification, resolutionSignalText, shell);
  const missingTruth = extractMissingTruthLabels(operationalTruthIntelligence);
  const shellRecommendation = buildShellRecommendation({
    route: classification.route,
    dominantTaskSurface,
    shell,
    designProfile,
    confidenceMode,
  });
  const stateRisks = buildStateRisks({
    transitionStateIntelligence,
    operationalTruthIntelligence,
  });
  const coherenceRisks = buildCoherenceRisks({
    contextIntelligence,
    discoveryIntelligence,
  });
  const implementationPosture = buildImplementationPosture({
    confidenceMode,
    shellRecommendation,
    dominantTaskSurface,
  });
  const componentMatches = rankedSourceComponents.slice(0, 10).map((component: Record<string, any>) => buildResolutionComponentSummary(component, {
    classification,
    density,
    roleLabel: "ranked operational candidate",
    includeAnatomy: outputPreferences.includeAnatomy,
    includeStateCoverage: outputPreferences.includeStateCoverage,
    includeTransitionGuidance: outputPreferences.includeTransitionGuidance,
    confidenceMode,
  }));
  const buildGuidanceLines = buildGuidance({
    dominantTaskSurface,
    shellRecommendation,
    confidenceMode,
    missingTruth,
    stateRisks,
    coherenceRisks,
  });

  const staticDecisionPacket = buildStaticDecisionPacket({
    request,
    prompt: getPrimaryPrompt(request),
    surfaceType: toOrchestrationId(classification.sector?.id || classification.archetype.id),
    classification,
    designProfileSummary: designProfile
      ? {
          id: toOrchestrationId(designProfile.id),
          label: designProfile.label,
          density: designProfile.spacing.density,
          iconLibrary: designProfile.iconSystem.primaryLibrary,
          elevation: designProfile.colorAndElevation.elevation,
          motion: designProfile.motion.posture,
        }
      : null,
    confidenceMode,
    dominantTaskSurface,
    shellRecommendation,
    missingTruth,
    componentMatches,
    stateRisks,
    coherenceRisks,
    operationalTruthIntelligence,
  });

  return {
    mode: "component-resolution",
    endpoint: "/api/agent",
    noSourceIncluded: true,
    surfaceType: toOrchestrationId(classification.sector?.id || classification.archetype.id),
    dominantTaskSurface,
    confidence: classification.confidence,
    confidenceMode,
    missingTruth,
    shellRecommendation,
    componentMatches,
    stateRisks,
    coherenceRisks,
    implementationPosture,
    buildGuidance: buildGuidanceLines,
    staticDecisionPacket,
    requestSummary: {
      goal: request.goal || "resolve precise component recommendations for an internal company portal",
      density,
      platform,
      layoutNeeds: getLayoutNeeds(request),
      workspaceModules: getWorkspaceModules(request),
      contextAttached: Boolean(contextDigest),
      outputOptions: {
        includeAiReasoning: request.output?.includeAiReasoning ?? false,
        includeComponentSource: request.output?.includeComponentSource ?? false,
        maxSourceMatches: request.output?.maxSourceMatches ?? 2,
      },
    },
    contextDigest,
    classification: {
      archetype: {
        id: classification.archetype.id,
        label: classification.archetype.label,
      },
      sector: classification.sector
        ? {
            id: classification.sector.id,
            label: classification.sector.label,
          }
        : null,
      route: classification.route,
      confidence: classification.confidence,
    },
    designProfile: buildDesignProfileResponse(designProfile),
    tokenPosture: outputPreferences.includeTokenPosture && designProfile
      ? {
          typography: designProfile.typography,
          spacing: designProfile.spacing,
          iconSystem: designProfile.iconSystem,
          elevation: designProfile.colorAndElevation,
          motion: designProfile.motion,
        }
      : null,
    contextIntelligence,
    operationalTruthIntelligence,
    discoveryIntelligence,
    foundationCommunication,
    transitionStateIntelligence,
    implementationReadiness,
    approvalPrompt,
    implementationStarter,
    iconAndInteractionIntelligence,
    shell: {
      appShell: shell.appShell ? buildResolutionComponentSummary(shell.appShell, { classification, density, roleLabel: "application shell", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      sidebarNav: shell.sidebarNav ? buildResolutionComponentSummary(shell.sidebarNav, { classification, density, roleLabel: "sidebar navigation", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      topBar: shell.topBar ? buildResolutionComponentSummary(shell.topBar, { classification, density, roleLabel: "compact top bar", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      toolbar: shell.toolbar ? buildResolutionComponentSummary(shell.toolbar, { classification, density, roleLabel: "filter toolbar", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      table: shell.table ? buildResolutionComponentSummary(shell.table, { classification, density, roleLabel: "table pattern", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      inspector: shell.inspector ? buildResolutionComponentSummary(shell.inspector, { classification, density, roleLabel: "inspector pattern", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      selectionBar: shell.selectionBar ? buildResolutionComponentSummary(shell.selectionBar, { classification, density, roleLabel: "selection bar", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      drawer: shell.drawer ? buildResolutionComponentSummary(shell.drawer, { classification, density, roleLabel: "drawer pattern", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      modal: shell.modal ? buildResolutionComponentSummary(shell.modal, { classification, density, roleLabel: "modal confirmation", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
      toast: shell.toast ? buildResolutionComponentSummary(shell.toast, { classification, density, roleLabel: "toast feedback", includeAnatomy: outputPreferences.includeAnatomy, includeStateCoverage: outputPreferences.includeStateCoverage, includeTransitionGuidance: outputPreferences.includeTransitionGuidance }) : null,
    },
    rankedComponents,
    componentRecommendations,
    nearMatches,
    compositionPlan: outputPreferences.includeCompositionGuidance ? buildResolutionCompositionPlan(shell, request) : [],
  };
}

function buildAgentPlan(args: {
  request: AgentBundleRequest;
  dominantIntent: { name: AgentIntentName; profile: AgentIntentProfile; score: number };
  detectedIntents: Array<{ name: AgentIntentName; profile: AgentIntentProfile; score: number }>;
  categories: Array<Record<string, any>>;
  allComponents: Array<Record<string, any>>;
  boostedPatterns: string[];
  critical: Record<string, any>;
  requestedDensity: string;
  compositionPatterns: Record<string, any>;
  surfaceMapping: Record<string, any>;
}) {
  const {
    request,
    dominantIntent,
    detectedIntents,
    categories,
    allComponents,
    boostedPatterns,
    critical,
    requestedDensity,
    compositionPatterns,
    surfaceMapping,
  } = args;

  const topShell = critical.appShell || allComponents.find((component) => component.category === "App Shells");
  const topTable = critical.table || allComponents.find((component) => component.category === "Tables");
  const topToolbar = critical.workbenchToolbar || allComponents.find((component) => /filter|toolbar|chip|segmented/i.test(component.slug));
  const topInputs = critical.inputs || allComponents.find((component) => component.category === "Inputs");
  const topButtons = critical.buttons || allComponents.find((component) => component.category === "Buttons");
  const topFeedback = allComponents.find((component) => component.category === "Feedback");
  const topLoading = allComponents.find((component) => component.category === "Loading");
  const topEmpty = allComponents.find((component) => component.category === "Empty States");
  const topDashboard = allComponents.find((component) => component.category === "Dashboard");

  const preferredPatternKey = boostedPatterns[0] || "denseOperationalWorkbench";
  const preferredPattern = compositionPatterns[preferredPatternKey] || compositionPatterns.denseOperationalWorkbench;
  const secondaryPattern = boostedPatterns[1] ? compositionPatterns[boostedPatterns[1]] : null;
  const surfacePreset = surfaceMapping.transactionReviewLikeApp || {};
  const missingInputs = buildMissingInputs(request);
  const responseMode = request.taskType || "redesign";

  const antiPatternWatch = uniqueStrings([
    dominantIntent.name === "admin-dashboard" ? "Do not let KPI cards overtake the work surface; the table or queue must still dominate the page." : "Do not collapse the workbench into a dashboard-card collage.",
    requestedDensity === "compact" ? "Do not use comfortable-density spacing or oversized cards for a high-frequency operational workflow." : "Do not make summary surfaces denser than the main work surface without a clear scan-speed reason.",
    "Do not use multiple filled CTAs in the same region.",
    "Do not hide filter state, selection state, or queue state behind overflow menus.",
    ...(request.currentProblems || []).map((problem) => `Address this reported product issue explicitly: ${problem}`),
  ]);

  const validationChecklist = uniqueStrings([
    `The chosen shell is ${topShell?.slug || "unresolved"} and the primary data surface is ${topTable?.slug || "unresolved"}.`,
    "The main page region contains one dominant work surface, not several competing cards.",
    "Primary filters are persistent and visible above the table or queue.",
    "Numeric and monetary columns are right-aligned and use mono styling.",
    "Approve/reject/export actions follow a strict primary-secondary-destructive hierarchy.",
    topFeedback ? `Feedback treatment references ${topFeedback.slug} for validation/toast/gating behavior.` : "Feedback treatment is explicitly defined.",
    topLoading ? `Loading treatment preserves structure using ${topLoading.slug}.` : "Loading treatment preserves the table and side-rail structure.",
    topEmpty ? `Empty state behavior references ${topEmpty.slug}.` : "Empty and zero-result states are defined explicitly.",
  ]);

  return {
    summary: `The endpoint classified this as ${dominantIntent.profile.label} and recommends a ${requestedDensity} operational workbench built around ${topShell?.title || "an operational shell"} plus ${topTable?.title || "a dense table"}.`,
    responseMode,
    strategy: dominantIntent.profile.description,
    reasoning: [
      `Dominant intent: ${dominantIntent.profile.label}.`,
      `Top priority categories: ${categories.slice(0, 4).map((category) => category.name).join(", ")}.`,
      `Top boosted patterns: ${boostedPatterns.join(", ") || "denseOperationalWorkbench"}.`,
      request.desiredOutcome ? `Desired outcome: ${request.desiredOutcome}.` : "No explicit desired outcome was provided, so the plan optimizes for operational clarity and task completion speed.",
    ],
    regionBlueprint: {
      sidebar: surfacePreset.sidebar || `Use ${topShell?.slug || "a shell"} to preserve queue grouping and module switching with a persistent left rail.`,
      header: surfacePreset.header || `Use ${topDashboard?.slug || "a compact header"} for title, counts, aging, and the single main CTA.`,
      toolbar: surfacePreset.queueToolbar || `Use ${topToolbar?.slug || "a compact toolbar"} for search, saved views, filter chips, and date windows.`,
      primarySurface: surfacePreset.groupedTable || `Use ${topTable?.slug || "the top table"} as the dominant decision surface.`,
      secondarySurface: surfacePreset.patternRail || `Use ${critical.sideRailPanel?.slug || topShell?.slug || "a side rail"} as the supporting inspector/detail region.`,
      decisions: surfacePreset.decisionCard || `Use ${critical.decisionPanel?.slug || topButtons?.slug || "the decision panel"} for irreversible or review-heavy action staging.`,
      exportFlow: surfacePreset.exportComposer || `Use ${critical.exportPreviewPanel?.slug || "export-pattern-ui"} for export configuration and preview.`,
      feedback: topFeedback ? `Use ${topFeedback.slug} to handle validation, async completion, and status messaging.` : "Define inline validation plus non-blocking async completion feedback.",
    },
    buildSequence: [
      {
        step: 1,
        name: "Frame the workbench",
        objective: "Choose the shell, density, and region ownership before designing any individual widgets.",
        useFirst: [topShell?.slug, topDashboard?.slug, topToolbar?.slug].filter(Boolean),
        doneWhen: [
          `The layout clearly reads as ${dominantIntent.profile.label}.`,
          "The main work surface is obvious within three seconds.",
          `Density is locked to ${requestedDensity} unless the content proves otherwise.`,
        ],
      },
      {
        step: 2,
        name: "Build the decision surface",
        objective: "Create the queue/table and inspector relationship before adding secondary polish.",
        useFirst: [topTable?.slug, critical.sideRailPanel?.slug, critical.selectionBar?.slug].filter(Boolean),
        doneWhen: [
          "A reviewer can scan, select, and inspect records without page transitions.",
          "Filters, selections, and row state remain visible during review.",
          "Row actions do not compete with the inspector's main decision action.",
        ],
      },
      {
        step: 3,
        name: "Stage actions and consequences",
        objective: "Wire approvals, exports, validation, and async states into the workbench.",
        useFirst: [topButtons?.slug, topInputs?.slug, topFeedback?.slug, topLoading?.slug].filter(Boolean),
        doneWhen: [
          "The primary action is singular and obvious in each region.",
          "Validation and completion feedback appear in-place or as restrained global feedback.",
          "Loading preserves structure instead of collapsing the UI.",
        ],
      },
      {
        step: 4,
        name: "Harden edge states",
        objective: "Define empty, error, export, and zero-result behavior without changing the core layout grammar.",
        useFirst: [topEmpty?.slug, critical.exportPreviewPanel?.slug, critical.dialog?.slug].filter(Boolean),
        doneWhen: [
          "Zero-result states explain what happened and what to do next.",
          "Bulk and destructive confirmations are isolated to explicit confirmation surfaces.",
          "Export and approval flows preserve context and do not detour to new pages.",
        ],
      },
    ],
    retrievalPlan: {
      categoriesFirst: categories.slice(0, 6).map((category) => category.name),
      componentsFirst: [topShell?.slug, topTable?.slug, topToolbar?.slug, topInputs?.slug, topButtons?.slug].filter(Boolean),
      patternFirst: preferredPatternKey,
      patternSecond: secondaryPattern ? boostedPatterns[1] : null,
    },
    validationChecklist,
    antiPatternWatch,
    missingInputs,
    confidenceBreakdown: {
      intentConfidence: Math.min(0.98, 0.42 + dominantIntent.score * 0.14),
      structureConfidence: topShell && topTable ? 0.91 : 0.72,
      workflowConfidence: boostedPatterns.length > 0 ? 0.88 : 0.74,
      ambiguityPenalty: Math.max(0, Math.min(0.28, missingInputs.length * 0.06)),
      remainingUnknowns: missingInputs,
    },
    preferredPattern: {
      key: preferredPatternKey,
      summary: preferredPattern?.summary || null,
      criticalRules: uniqueStrings([
        ...(preferredPattern?.layoutRecipe || []),
        ...(preferredPattern?.rules || []),
      ]).slice(0, 8),
    },
    intendedOutcome: request.desiredOutcome || `A credible ${dominantIntent.profile.label.toLowerCase()} surface that helps an AI code agent choose the right shell, dominant work surface, and action hierarchy without drifting into generic dashboard UI.`,
    hybridIntentMix: detectedIntents.slice(0, 3).map((intent) => ({
      id: intent.name,
      label: intent.profile.label,
      score: intent.score,
    })),
  };
}

function applyAdaptiveRanking(baseBundle: Record<string, unknown>, request: AgentBundleRequest): Record<string, unknown> {
  const cloned = cloneBundle(baseBundle) as Record<string, any>;
  const detectedIntents = detectIntents(request);
  const dominantIntent = detectedIntents[0];
  const scenarioTokens = tokenizeScenario(request);
  const categoryBoosts = new Map<string, number>();
  const slugBoosts = new Map<string, number>();

  for (const item of detectedIntents.slice(0, 3)) {
    const weight = item === dominantIntent ? 1 : 0.6;
    Object.entries(item.profile.categoryBoosts).forEach(([category, boost]) => {
      categoryBoosts.set(category, (categoryBoosts.get(category) || 0) + (boost || 0) * weight);
    });
    Object.entries(item.profile.slugBoosts).forEach(([slug, boost]) => {
      slugBoosts.set(slug, (slugBoosts.get(slug) || 0) + boost * weight);
    });
  }

  const allComponents = (cloned.componentCatalog?.allComponents || []) as Array<Record<string, any>>;
  for (const component of allComponents) {
    let adaptiveBoost = categoryBoosts.get(component.category) || 0;
    adaptiveBoost += slugBoosts.get(component.slug) || 0;

    const haystack = `${component.slug} ${component.title} ${component.description} ${(component.tags || []).join(" ")} ${(component.bestFor || []).join(" ")}`.toLowerCase();
    const matchedTerms = scenarioTokens.filter((token) => haystack.includes(token));
    adaptiveBoost += Math.min(12, matchedTerms.length * 1.5);

    if (request.densityPreference && Array.isArray(component.density) && component.density.includes(request.densityPreference)) {
      adaptiveBoost += 4;
    }
    if (request.platform === "mobile-web" && /mobile|bottom-tab/.test(component.slug)) {
      adaptiveBoost += 5;
    }
    if ((request.priorities || []).some((priority) => haystack.includes(priority.toLowerCase()))) {
      adaptiveBoost += 4;
    }
    if ((request.constraints || []).some((constraint) => /dense|compact|high-density/i.test(constraint)) && Array.isArray(component.density) && component.density.includes("compact")) {
      adaptiveBoost += 4;
    }

    const baseRelevance = component.relevanceScore || 0;
    component.baseRelevanceScore = baseRelevance;
    component.scenarioRelevanceScore = Math.round(baseRelevance * 0.45 + adaptiveBoost * 4);
    component.relevanceScore = Math.max(0, Math.min(100, Math.round(baseRelevance + adaptiveBoost)));
    component.adaptiveBoost = Math.round(adaptiveBoost * 10) / 10;
    component.scenarioMatches = matchedTerms.slice(0, 8);
  }

  allComponents.sort(
    (left, right) =>
      (right.scenarioRelevanceScore || 0) - (left.scenarioRelevanceScore || 0) ||
      right.relevanceScore - left.relevanceScore ||
      left.title.localeCompare(right.title)
  );

  const categoryOrder = new Map(allComponents.map((component, index) => [component.slug, index]));
  const categories = (cloned.componentCatalog?.categories || []) as Array<Record<string, any>>;
  for (const category of categories) {
    const baseBoost = categoryBoosts.get(category.name) || 0;
    category.priorityScore = Math.round(
      ((category.components || []).reduce((total: number, component: Record<string, any>) => {
        const ranked = allComponents.find((item) => item.slug === component.slug);
        return total + (ranked?.scenarioRelevanceScore || ranked?.relevanceScore || component.relevanceScore || 0);
      }, 0) / Math.max(1, (category.components || []).length)) + baseBoost
    );
    category.components = [...(category.components || [])].sort(
      (left: Record<string, any>, right: Record<string, any>) => (categoryOrder.get(left.slug) || 0) - (categoryOrder.get(right.slug) || 0)
    );
  }
  categories.sort((left, right) => (right.priorityScore || 0) - (left.priorityScore || 0));

  const bestByCategory = (categoryName: string) => allComponents.find((component) => component.category === categoryName);
  const critical = cloned.foundationCriticalComponents || {};
  if (dominantIntent) {
    const maybeShell = bestByCategory("App Shells");
    const maybeTable = bestByCategory("Tables");
    const maybeInputs = bestByCategory("Inputs");
    const maybeButtons = bestByCategory("Buttons");
    const maybeToolbar = allComponents.find((component) => /filter|toolbar|segmented|chip/i.test(component.slug));
    if (maybeShell) critical.appShell = { ...critical.appShell, ...maybeShell, whyChosen: `${dominantIntent.profile.description} Selected as the highest-fit shell for this scenario.` };
    if (maybeTable) critical.table = { ...critical.table, ...maybeTable, whyChosen: `${dominantIntent.profile.description} Selected as the highest-fit dense data surface for this scenario.` };
    if (maybeInputs) critical.inputs = { ...critical.inputs, ...maybeInputs, whyChosen: `${dominantIntent.profile.description} Selected as the best input/filter reference for this scenario.` };
    if (maybeButtons) critical.buttons = { ...critical.buttons, ...maybeButtons, whyChosen: `${dominantIntent.profile.description} Selected to reinforce the right action hierarchy for this scenario.` };
    if (maybeToolbar) critical.workbenchToolbar = { ...critical.workbenchToolbar, ...maybeToolbar, whyChosen: `${dominantIntent.profile.description} Selected as the best compact toolbar/filter pattern for this scenario.` };
  }
  cloned.foundationCriticalComponents = critical;

  const boostedPatterns = uniqueStrings(detectedIntents.flatMap((item) => item.profile.patternBoosts));
  const requestedDensity = request.densityPreference || dominantIntent.profile.structuralBias.includes("numeric-summary-band") ? "compact" : request.densityPreference || "compact";
  cloned.requestContext = {
    scenario: request.scenario,
    interfaceType: request.interfaceType || null,
    taskType: request.taskType || null,
    desiredOutcome: request.desiredOutcome || null,
    platform: request.platform || "unknown",
    densityPreference: request.densityPreference || null,
    priorities: request.priorities || [],
    constraints: request.constraints || [],
    currentProblems: request.currentProblems || [],
    existingSurfaceSignals: request.existingSurfaceSignals || [],
  };
  const agentPlan = buildAgentPlan({
    request,
    dominantIntent,
    detectedIntents,
    categories,
    allComponents,
    boostedPatterns,
    critical,
    requestedDensity,
    compositionPatterns: cloned.compositionPatterns || {},
    surfaceMapping: cloned.surfaceMapping || {},
  });
  cloned.agentRouting = {
    mode: "adaptive",
    endpoint: "/api/agent",
    responseMode: request.taskType || "redesign",
    dominantIntent: dominantIntent.name,
    detectedIntents: detectedIntents.map((item) => ({
      id: item.name,
      label: item.profile.label,
      score: item.score,
      description: item.profile.description,
    })),
    confidence: Math.min(0.98, 0.45 + detectedIntents[0].score * 0.12),
    recommendedDensity: requestedDensity,
    recommendedStructurePath: dominantIntent.profile.structuralBias,
    priorityCycle: categories.slice(0, 6).map((category) => category.name),
    boostedPatterns,
    topComponents: allComponents.slice(0, 12).map((component) => ({
      slug: component.slug,
      title: component.title,
      category: component.category,
      scenarioRelevanceScore: component.scenarioRelevanceScore,
      relevanceScore: component.relevanceScore,
      adaptiveBoost: component.adaptiveBoost,
    })),
    scenarioTokens: scenarioTokens.slice(0, 24),
    missingInputs: agentPlan.missingInputs,
    confidenceBreakdown: agentPlan.confidenceBreakdown,
    guidance: [
      "Start from the dominant shell and table pair before polishing supporting components.",
      "Use the priorityCycle to decide retrieval and composition order inside the bundle.",
      "Prefer the boostedPatterns first when assembling the workbench structure.",
    ],
  };
  cloned.agentPlan = agentPlan;

  if (cloned.agentInstructions) {
    cloned.agentInstructions = {
      ...cloned.agentInstructions,
      categoriesToUseFirst: uniqueStrings([...categories.slice(0, 6).map((category) => category.name), ...(cloned.agentInstructions.categoriesToUseFirst || [])]).slice(0, 8),
      designPriorityOrder: [
        `Classify the scenario as ${dominantIntent.profile.label} first and bias the layout accordingly.`,
        `Follow the agentPlan.buildSequence in order and do not style secondary surfaces before the primary work surface is stable.`,
        ...(cloned.agentInstructions.designPriorityOrder || []),
      ].slice(0, 7),
      executionContract: [
        "Use agentPlan.regionBlueprint to decide what each page region is responsible for.",
        "Use agentPlan.retrievalPlan.componentsFirst before browsing lower-ranked references.",
        "Use agentPlan.validationChecklist as the minimum quality gate before calling the redesign complete.",
      ],
    };
  }

  return cloned;
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function readTextFile(filePath: string): string {
  return readFileSync(filePath, "utf8");
}

function stripLeadingFileComment(source: string): string {
  return source.replace(/^\s*\/\*\*[\s\S]*?\*\/\s*/, "").trimStart();
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function uniqueBy<T>(values: T[], getKey: (value: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const value of values) {
    const key = getKey(value);
    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(value);
  }

  return result;
}

function getDescriptor(category: string): CategoryDescriptor {
  return categoryDescriptors[category] || {
    priority: "medium",
    whyRelevant: "Useful as a supporting pattern when an operational surface needs specialized detail treatment.",
    density: ["default"],
    bestFor: ["specialized supporting UI"],
    avoidFor: ["primary dense operational shells without adaptation"],
    baseScore: 64,
    actionHierarchyRole: "supporting-pattern",
    dataDensityRole: "supporting-layer",
  };
}

function describeDensity(entry: ComponentEntry, descriptor: CategoryDescriptor): string[] {
  const override = slugOverrides[entry.slug]?.density;
  if (override) {
    return override;
  }

  if (/(dense|compact|table|log|filter|queue|toolbar|command)/i.test(`${entry.slug} ${entry.title}`)) {
    return uniqueStrings(["compact", ...descriptor.density]);
  }

  if (/(hero|empty-state|onboarding|marketing)/i.test(entry.slug)) {
    return uniqueStrings(descriptor.density.filter((value) => value !== "compact").concat("comfortable"));
  }

  return descriptor.density;
}

function inferBestFor(entry: ComponentEntry, descriptor: CategoryDescriptor): string[] {
  const values = [...descriptor.bestFor];
  const haystack = `${entry.slug} ${entry.title} ${(entry.tags || []).join(" ")}`;

  if (/table|grid|row|invoice|list/.test(haystack.toLowerCase())) {
    values.push("dense row review", "numeric scanning", "bulk selection contexts");
  }
  if (/filter|chip|segmented|toggle/.test(haystack.toLowerCase())) {
    values.push("toolbar filtering", "saved-view switching");
  }
  if (/log|timeline|activity/.test(haystack.toLowerCase())) {
    values.push("audit history", "approval trails", "event inspection");
  }
  if (/export/.test(haystack.toLowerCase())) {
    values.push("export composition", "column mapping", "preview-before-download");
  }
  if (/empty-state/.test(entry.slug)) {
    values.push("empty queues", "no-result states", "guided recovery");
  }

  return uniqueStrings([...(slugOverrides[entry.slug]?.bestFor || []), ...values]);
}

function inferAvoidFor(entry: ComponentEntry, descriptor: CategoryDescriptor): string[] {
  const values = [...descriptor.avoidFor];
  const haystack = `${entry.slug} ${entry.title}`.toLowerCase();

  if (/hero|marketing|gradient|glow|brutalist|glass/.test(haystack)) {
    values.push("dense admin shells", "serious review workbenches", "high-frequency operator flows");
  }
  if (/mobile-bottom-tab/.test(haystack)) {
    values.push("desktop multi-column workbenches");
  }
  if (/social-auth/.test(haystack)) {
    values.push("internal queue tooling", "transaction review surfaces");
  }

  return uniqueStrings([...(slugOverrides[entry.slug]?.avoidFor || []), ...values]);
}

function inferActionHierarchyRole(entry: ComponentEntry, descriptor: CategoryDescriptor): string {
  const override = slugOverrides[entry.slug]?.actionHierarchyRole;
  if (override) {
    return override;
  }

  const haystack = `${entry.slug} ${entry.title}`.toLowerCase();
  if (/danger|destructive|reject|ban/.test(haystack)) {
    return "destructive-confirmation";
  }
  if (/loading|submit|export/.test(haystack)) {
    return "async-commit-control";
  }
  if (/segmented|toggle|filter/.test(haystack)) {
    return "view-or-filter-switcher";
  }
  if (/icon-only|icon-label/.test(haystack)) {
    return "dense-toolbar-action";
  }
  return descriptor.actionHierarchyRole;
}

function inferDataDensityRole(entry: ComponentEntry, descriptor: CategoryDescriptor): string {
  const override = slugOverrides[entry.slug]?.dataDensityRole;
  if (override) {
    return override;
  }

  const haystack = `${entry.slug} ${entry.title}`.toLowerCase();
  if (/table|grid|invoice|list/.test(haystack)) {
    return "primary-data-grid";
  }
  if (/filter|chip|toolbar/.test(haystack)) {
    return "filter-and-scope-layer";
  }
  if (/log|timeline|activity/.test(haystack)) {
    return "audit-context-layer";
  }
  if (/empty-state/.test(haystack)) {
    return "zero-state-guidance";
  }
  if (/loading|skeleton/.test(haystack)) {
    return "loading-preservation";
  }
  return descriptor.dataDensityRole;
}

function computeRelevance(entry: ComponentEntry, descriptor: CategoryDescriptor): number {
  let score = descriptor.baseScore;
  const haystack = `${entry.slug} ${entry.title} ${entry.description} ${(entry.tags || []).join(" ")}`;

  for (const rule of keywordBoosts) {
    if (rule.test.test(haystack)) {
      score += rule.score;
    }
  }

  for (const rule of keywordPenalties) {
    if (rule.test.test(haystack)) {
      score += rule.score;
    }
  }

  score += slugOverrides[entry.slug]?.relevanceDelta || 0;
  return Math.max(0, Math.min(100, score));
}

function buildSourceSummary(entry: ComponentEntry): string {
  return slugOverrides[entry.slug]?.sourceSummary || entry.description;
}

function buildComponentPayload(entry: ComponentEntry) {
  const descriptor = getDescriptor(entry.category);
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    tags: entry.tags || [],
    states: defaultStates,
    density: describeDensity(entry, descriptor),
    bestFor: inferBestFor(entry, descriptor),
    avoidFor: inferAvoidFor(entry, descriptor),
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    fullSource: entry.code,
    sourceSummary: buildSourceSummary(entry),
    actionHierarchyRole: inferActionHierarchyRole(entry, descriptor),
    dataDensityRole: inferDataDensityRole(entry, descriptor),
    relevanceScore: computeRelevance(entry, descriptor),
  };
}

function buildDerivedCriticalComponent(key: keyof typeof derivedSources, title: string, description: string, bestFor: string[], role: string, densityRole: string) {
  return {
    slug: `derived-${key}`,
    title,
    category: "Derived Operational Pattern",
    description,
    whyChosen: description,
    bestFor,
    avoidFor: ["marketing pages", "spacious consumer layouts"],
    states: defaultStates,
    density: ["compact", "default"],
    actionHierarchyRole: role,
    dataDensityRole: densityRole,
    relevanceScore: 95,
    fullSource: derivedSources[key],
    sourceSummary: description,
  };
}

function buildCriticalFromPayload(payload: ReturnType<typeof buildComponentPayload>, whyChosen: string) {
  return {
    slug: payload.slug,
    title: payload.title,
    category: payload.category,
    description: payload.description,
    whyChosen,
    bestFor: payload.bestFor,
    avoidFor: payload.avoidFor,
    states: payload.states,
    density: payload.density,
    actionHierarchyRole: payload.actionHierarchyRole,
    dataDensityRole: payload.dataDensityRole,
    relevanceScore: payload.relevanceScore,
    fullSource: payload.fullSource,
    sourceSummary: payload.sourceSummary,
  };
}

function buildBundleFromSource(): Record<string, unknown> {
  const foundations = readJsonFile<Record<string, any>>(designFoundationsPath);
  const allEntries = readJsonFile<ComponentEntry[]>(componentsPath);
  const includedEntries = allEntries.filter((entry) => includedCategories.includes(entry.category));
  const allPayloads = includedEntries.map(buildComponentPayload).sort((left, right) => right.relevanceScore - left.relevanceScore || left.title.localeCompare(right.title));
  const payloadBySlug = new Map(allPayloads.map((payload) => [payload.slug, payload]));
  const entryBySlug = new Map(allEntries.map((entry) => [entry.slug, entry]));

  const getPayload = (slug: string) => {
    const payload = payloadBySlug.get(slug);
    if (payload) {
      return payload;
    }

    const entry = entryBySlug.get(slug);
    if (!entry) {
      throw new Error(`Missing component slug: ${slug}`);
    }

    return buildComponentPayload(entry);
  };

  const categoryList = categoryPriorityOrder.map((category) => ({
    name: category,
    priority: getDescriptor(category).priority,
    whyRelevant: getDescriptor(category).whyRelevant,
    components: allPayloads
      .filter((payload) => payload.category === category)
      .sort((left, right) => right.relevanceScore - left.relevanceScore)
      .map((payload) => ({
        slug: payload.slug,
        title: payload.title,
        relevanceScore: payload.relevanceScore,
        actionHierarchyRole: payload.actionHierarchyRole,
        dataDensityRole: payload.dataDensityRole,
      })),
  }));

  const canonicalDashboardSource = stripLeadingFileComment(readTextFile(canonicalDashboardPath));
  const densityGuideSource = stripLeadingFileComment(readTextFile(densityGuidePath));
  const tokenReferenceSource = stripLeadingFileComment(readTextFile(tokenReferencePath));

  return {
    version: foundations._meta?.version || "1.0.0",
    generatedAt: new Date().toISOString(),
    designSystem: {
      name: foundations._meta?.name || "EXHIBIT",
      summary: "A proof-first operational UI system for redesigning dense admin, queue, review, export, and reconciliation interfaces without drifting into generic dashboard chrome.",
      foundations: {
        fonts: {
          body: foundations.typography.fonts.body.family,
          display: foundations.typography.fonts.display.family,
          mono: foundations.typography.fonts.mono.family,
          rules: [
            foundations.typography._rule,
            "Body and control text stay in Inter.",
            "Use Space Grotesk only for page titles and section anchors.",
            "Use JetBrains Mono for numeric columns, IDs, timestamps, and system data.",
          ],
        },
        typeScale: Object.entries(foundations.typography.scale).map(([token, value]) => ({ token, ...(value as Record<string, unknown>) })),
        colors: {
          backgrounds: foundations.colors.backgrounds,
          text: foundations.colors.text,
          borders: foundations.colors.borders,
          semanticStates: foundations.colors.semantic,
          interactive: foundations.colors.interactive,
        },
        spacing: {
          gridBasePx: 4,
          scale: foundations.spacing.scale,
          inlineGaps: foundations.spacing.inlineGaps,
          rules: [
            foundations.spacing._rule,
            "Use 8-12px gaps inside compact toolbars.",
            "Use 16px to separate toolbar groups.",
            "Use 24px panel padding for decision rails and export panels.",
          ],
        },
        layout: {
          maxContentWidth: foundations.layout.maxWidth.content.px,
          maxReadingWidth: foundations.layout.maxWidth.reading.px,
          sidebarWidth: foundations.layout.sidebars.standard.px,
          topNavHeight: foundations.layout.navHeight.topNav.px,
          mobileBottomNavHeight: foundations.layout.navHeight.bottomTab.px,
          sidebarVariants: foundations.layout.sidebars,
          contentWidths: foundations.layout.maxWidth,
        },
        radius: foundations.layout.borderRadius,
        elevation: foundations.elevation.levels,
        densityModes: {
          compact: {
            ...foundations.density.compact,
            toolbarHeight: "40-44px",
            panelGap: "12-16px",
            tableHeaderPadding: "8px 16px",
          },
          default: {
            ...foundations.density.default,
            toolbarHeight: "48px",
            panelGap: "16-20px",
            tableHeaderPadding: "10px 20px",
          },
          comfortable: {
            ...foundations.density.comfortable,
            toolbarHeight: "52-56px",
            panelGap: "20-24px",
            tableHeaderPadding: "12px 24px",
          },
        },
        componentSizing: {
          buttons: foundations.components.buttons,
          inputs: foundations.components.inputs,
          tables: foundations.components.tables,
          badges: foundations.components.badges,
          dialogs: {
            maxWidth: foundations.layout.maxWidth.dialog.px,
            radius: foundations.layout.borderRadius.xl,
            padding: foundations.spacing.scale[6],
            elevation: foundations.elevation.levels["4"],
          },
        },
        antiPatterns: {
          typography: foundations.antiPatterns.typography,
          color: foundations.antiPatterns.color,
          layout: foundations.antiPatterns.layout,
          dataDisplay: foundations.antiPatterns.dataDisplay,
          rawHtml: foundations.antiPatterns.rawStyle,
        },
      },
    },
    visualTargets: {
      canonicalDashboard: {
        summary: "Canonical reference for operational polish: left navigation, compact header, KPI strip, chart band, and a data table with semantic badges.",
        structure: [
          "220px left sidebar with persistent primary navigation",
          "56px top header with breadcrumb, page title, and right-aligned utility actions",
          "Four-card KPI summary band above the main work surface",
          "Large trend/chart panel before the primary table",
          "Bordered data table with semantic status badges and mono numeric values",
        ],
        hierarchyNotes: [
          "Only one filled primary action should exist in the header region.",
          "KPI labels stay smaller and lighter than the values they explain.",
          "Charts are contextual, not the primary work surface.",
          "The table remains the highest-density decision layer and should be the longest persistent region.",
        ],
        fullSource: canonicalDashboardSource,
      },
      densityGuide: {
        summary: "Reference for choosing compact, default, or comfortable density before building any admin/workbench surface.",
        rules: [
          "Compact is the default for transaction review, reconciliation, approvals, exports, logs, and dense tables.",
          "Default is appropriate when operators need more breathing room but still scan structured records.",
          "Comfortable is reserved for onboarding, empty states, and consumer-facing management pages.",
          "Never mix compact and comfortable patterns inside one workbench without a strict reason.",
          ...foundations.components.tables.rules,
        ],
        fullSource: densityGuideSource,
      },
      tokenReference: {
        summary: "Single-source token board for neutral palette, semantic states, type scale, spacing, radius, and elevation used across operational surfaces.",
        fullSource: tokenReferenceSource,
      },
    },
    componentCatalog: {
      categories: categoryList,
      allComponents: allPayloads,
    },
    foundationCriticalComponents: {
      appShell: buildCriticalFromPayload(getPayload("ide-three-panel-shell"), "Best structural starting point for dense multi-panel review tools with left navigation, central queue, and right inspector."),
      topBar: buildCriticalFromPayload(getPayload("dashboard-header-pattern"), "Compact header pattern with title, counts, and right-aligned high-priority actions."),
      sidebarNav: buildCriticalFromPayload(getPayload("sidebar-app-shell"), "Reliable left-rail navigation pattern for queue grouping, module switching, and persistent orientation."),
      workbenchToolbar: buildCriticalFromPayload(getPayload("filter-bar-chips"), "Best compact toolbar pattern for filters, saved scopes, and segmented operational controls."),
      filters: buildCriticalFromPayload(getPayload("filter-bar-chips"), "Chip-based filters stay compact, readable, and scannable in dense admin layouts."),
      table: buildCriticalFromPayload(getPayload("modern-table"), "Primary decision surface for any transaction-review or reconciliation workflow."),
      statusBadges: buildCriticalFromPayload(getPayload("system-health-panel"), "Useful reference for semantic status treatment across success, degraded, warning, and outage states."),
      selectionBar: buildDerivedCriticalComponent("selectionBar", "Bulk Selection Bar", "Derived bulk-action bar for batch review, assignment, and export in high-density tables.", ["bulk review", "queue triage", "mass approval"], "bulk-selection-control", "selection-density-layer"),
      sideRailPanel: buildCriticalFromPayload(getPayload("master-detail-shell"), "Reference for a persistent side rail that reveals details without replacing the main queue."),
      decisionPanel: buildDerivedCriticalComponent("decisionPanel", "Decision Panel", "Derived right-rail inspector for approve/reject/request-info decisions with contextual notes.", ["approval workflows", "risk review", "exception handling"], "decision-surface", "inspector-density-layer"),
      exportPreviewPanel: buildCriticalFromPayload(getPayload("export-pattern-ui"), "Best available library pattern for export composition, preview, and configuration flows."),
      dialog: buildDerivedCriticalComponent("dialog", "Operational Decision Dialog", "Derived modal pattern for high-risk bulk decisions, approvals, and export confirmation.", ["bulk approve", "bulk reject", "dangerous confirmations"], "modal-confirmation", "focused-decision-layer"),
      emptyState: buildCriticalFromPayload(getPayload("empty-state-search"), "Best empty-state reference for zero-result queues and filtered workbench states."),
      loadingState: buildCriticalFromPayload(getPayload("skeleton-loading"), "Preserves dense layout while table rows and side rails hydrate."),
      feedbackAlert: buildCriticalFromPayload(getPayload("inline-validation-patterns"), "Reference for field-level and form-level validation on dense operational actions."),
      buttons: buildCriticalFromPayload(getPayload("60-30-10-button-system"), "Defines the exact primary-secondary-tertiary button hierarchy required in dense workbenches."),
      inputs: buildCriticalFromPayload(getPayload("date-range-input"), "Compact input reference for time-scoped filtering, report windows, and dense filter bars."),
    },
    compositionPatterns: {
      denseOperationalWorkbench: {
        summary: "Canonical pattern for transaction review, reconciliation, approvals, and queue-based operations.",
        layoutRecipe: [
          "Use a 220px persistent sidebar for global navigation and queue switching.",
          "Use a sticky top header with title, counts, status chips, and one primary action.",
          "Place a sticky toolbar directly above the table for filters, views, search, and date scopes.",
          "Use the table as the main horizontal surface and a right-side inspector for row detail or decisions.",
          "Reserve bulk selection bars for bottom-sticky or inline-above-table placement.",
        ],
        actionHierarchy: [
          "Exactly one filled primary action per region.",
          "Secondary actions use outline or ghost patterns.",
          "Destructive actions are isolated and colored only when risk is explicit.",
          "Bulk actions appear only after selection, not as ambient noise.",
        ],
        tableBehavior: [
          "Use 36-44px row heights depending on density target.",
          "Right-align monetary, numeric, and variance columns.",
          "Truncate long identifiers with tooltip or detail-rail reveal.",
          "Allow horizontal scroll once columns exceed 8 meaningful fields.",
          "Keep header row sticky when long audit/reconciliation lists are expected.",
        ],
        filterBehavior: [
          "Keep primary filters visible above the table at all times.",
          "Promote saved views, queue states, and time ranges before secondary filters.",
          "Show active filter counts and an immediate clear-all path.",
          "Use segmented controls for mutually exclusive queue states.",
        ],
        statusCommunication: [
          "Semantic badges pair color with words, never color alone.",
          "Risk, warning, and blocked states need a compact explanatory surface in the detail rail.",
          "Success feedback should be brief and non-blocking unless the action is destructive.",
        ],
        mobileBehavior: [
          "Collapse the sidebar into a sheet or top-level menu.",
          "Transform wide tables into horizontal scroll, stacked cards only as a last resort.",
          "Move the decision rail into a bottom sheet or full-screen inspector.",
        ],
        dos: [
          "Keep the table as the primary work surface.",
          "Use mono typography for identifiers, timestamps, and numeric data.",
          "Preserve structure with skeletons instead of removing rows during loading.",
          "Let filters and selections visibly affect counts and summary badges.",
        ],
        donts: [
          "Do not turn the page into a card collage.",
          "Do not use decorative gradients, glow buttons, or marketing hero treatments.",
          "Do not hide decision context behind modal chains when a side rail will do.",
          "Do not use centered tables or left-aligned numbers.",
        ],
      },
      reviewQueuePattern: {
        summary: "Pattern for moderator-style or approver-style queues where the main job is to move items through a decision funnel.",
        queueBehavior: [
          "Show queue counts by status at the top.",
          "Keep row-level decision affordances visible but not dominant.",
          "Open selected rows into a side rail rather than navigating away.",
          "Support bulk selection only when row shape is stable and sortable.",
        ],
        reviewerShortcuts: [
          "Keyboard next/previous item",
          "Approve/reject hotkeys",
          "Quick filter chips for severity, owner, or aging",
        ],
      },
      decisionFlowPattern: {
        summary: "Pattern for workflows that require explicit approval, rejection, escalation, or request-for-info outcomes.",
        rules: [
          "Place evidence and risk summary above the decision form.",
          "Require note entry only when rejecting or escalating.",
          "Keep destructive outcomes visually separated from the primary approve action.",
          "Reflect the selected outcome in both badge state and activity timeline after commit.",
        ],
      },
      exportPanelPattern: {
        summary: "Pattern for building export or statement composition flows without breaking the user out of the workbench.",
        rules: [
          "Use a side panel or drawer for export options, not a full-page detour.",
          "Show row counts, selected columns, and format choice together.",
          "Provide preview metadata before generating files.",
          "Surface generation progress inline and completion via toast or status row.",
        ],
      },
    },
    adaptationGuidance: {
      forStaticHtml: {
        summary: "Translate the React/Tailwind patterns into semantic HTML sections, tables, navs, forms, and buttons without relying on framework behavior.",
        translateTailwindToCssRules: [
          "Map spacing utilities to a 4px custom property scale: --space-1:4px through --space-12:48px.",
          "Convert neutral colors into CSS variables rather than hard-coded inline values.",
          "Translate rounded-lg/rounded-xl into radius tokens and reuse them consistently.",
          "Replace utility shadows with named elevation tokens like --shadow-1 through --shadow-4.",
        ],
        whatMustStaySemantic: [
          "Use <table>, <thead>, <tbody>, and <th> for dense record review.",
          "Use <nav> for sidebars and top-level navigation.",
          "Use form labels explicitly instead of placeholder-only controls.",
          "Use button elements for all actions, not clickable divs.",
        ],
        whatCanBeCssOnly: [
          "Visual density tuning",
          "Hover/focus/selected styling",
          "Sticky headers and sticky toolbars",
          "Right-rail layout and drawer motion",
        ],
      },
      forReact: {
        summary: "Keep data, selection state, sort state, and inspector state separate so the table remains stable while surrounding panels update.",
        rules: [
          "Model row selection and active row independently.",
          "Memoize derived filter counts or compute them server-side when datasets are large.",
          "Use optimistic UI only for low-risk actions; confirm destructive decisions with explicit completion state.",
          "Render inspector panels conditionally but preserve layout width when possible.",
        ],
      },
      forDataHeavyPages: {
        tableRules: [
          "Prefer compact density first.",
          "Right-align numbers and totals.",
          "Use sticky headers for long lists.",
          "Use a fixed first column when identifiers are critical.",
        ],
        summaryRules: [
          "Keep KPI count small and task-oriented.",
          "Show queue counts, blocked counts, and aging metrics before vanity metrics.",
          "Do not let summary cards outgrow the table they support.",
        ],
        panelRules: [
          "Right rails hold detail, evidence, and decisions.",
          "Panels need clear section dividers and one main completion action.",
          "Use neutral backgrounds and borders; do not turn panels into decorative cards.",
        ],
        toolbarRules: [
          "Filters come before export and mutation actions.",
          "Search should be persistent, not hidden in overflow.",
          "Bulk actions should remain hidden until selection exists.",
        ],
      },
    },
    surfaceMapping: {
      transactionReviewLikeApp: {
        sidebar: "Use ide-three-panel-shell or sidebar-app-shell as the base. Keep the sidebar at 220px with queue groups and status buckets.",
        header: "Use dashboard-header-pattern to show page title, unresolved count, aging metrics, and one primary action.",
        queueToolbar: "Use filter-bar-chips plus a compact search/date input combination for scope, saved views, and date windows.",
        groupedTable: "Use modern-table with compact row heights, sticky headers, right-aligned totals, and semantic badges for review status.",
        selectionBar: "Use the derived SelectionBar pattern for batch approve, assign, export, and clear-selection controls.",
        patternRail: "Use master-detail-shell or the derived DecisionPanel for a persistent right inspector with evidence and notes.",
        decisionCard: "Use the derived DecisionPanel to stage approve/reject/request-info controls with evidence summary above them.",
        exportComposer: "Use export-pattern-ui as the reference for export configuration, column selection, and file format decisions.",
        exportPreview: "Keep export preview metadata in a side rail or drawer beside the queue, not on a separate page.",
        dialogs: "Use the derived OperationalDecisionDialog only for bulk or destructive confirmation, not for routine row review.",
        statusSystem: "Use semantic badges from system-health-panel and table/status patterns; always pair state color with explicit labels.",
      },
    },
    agentInstructions: {
      designPriorityOrder: [
        "Establish shell and density first.",
        "Make the table or queue the dominant work surface.",
        "Define action hierarchy before styling individual controls.",
        "Add inspector, export, and feedback layers only after the core flow is stable.",
        "Polish empty/loading/error states last without changing the structural hierarchy.",
      ],
      categoriesToUseFirst: ["App Shells", "Tables", "Data Density", "Inputs", "Navigation", "Layout"],
      categoriesToIgnoreUnlessAsked: ["Commerce", "Pricing", "Marketing/hero-like button styles", "Gamification", "Decorative card treatments"],
      minimumFoundationChecklist: [
        "Inter body, Space Grotesk headings, JetBrains Mono data",
        "4px spacing grid throughout",
        "Compact or default density chosen deliberately",
        "One primary action per region",
        "Right-aligned numeric columns",
        "Semantic status badges and explicit empty/loading states",
      ],
      howToChooseDensity: [
        "Choose compact when operators scan many rows per minute or compare many numeric values.",
        "Choose default when tasks mix scanning with short-form editing.",
        "Choose comfortable only for onboarding, education, or low-volume oversight.",
      ],
      howToChooseActionHierarchy: [
        "Use filled buttons only for the one action that advances the main workflow.",
        "Use outline/ghost for secondary actions that support, inspect, or defer.",
        "Use destructive styles only when risk is explicit and irreversible.",
        "Move bulk actions into a contextual selection bar instead of showing them globally.",
      ],
    },
  };
}

export function buildOperationalWorkbenchBundle(): Record<string, unknown> {
  return buildBundleFromSource();
}

export function getAgentQuestionResponse(questionRequest?: AgentQuestionRequest): Record<string, unknown> {
  if (!questionRequest) {
    return buildQuestionManifest();
  }

  return buildQuestionResponse(questionRequest);
}

export async function getAgentResolutionResponse(request: AgentResolutionRequest): Promise<Record<string, unknown>> {
  let workingRequest = request;
  let screenshotGrounding: Record<string, unknown> | null = null;

  if (request.screenshots && request.screenshots.length > 0) {
    try {
      const grounding = await runAgentScreenshotGrounding({
        prompt: buildAgentScreenshotGroundingPrompt(request),
        images: request.screenshots,
      });

      workingRequest = applyScreenshotGroundingToRequest(request, grounding);
      screenshotGrounding = {
        applied: true,
        model: grounding.model,
        visibleSummary: grounding.visibleSummary,
        likelySurface: grounding.likelySurface,
        userType: grounding.userType || null,
        primaryTask: grounding.primaryTask || null,
        toneRead: grounding.toneRead || null,
        complaintAlignment: grounding.complaintAlignment,
        visibleIssues: grounding.visibleIssues,
        nextQuestion: grounding.nextQuestion || null,
      };
    } catch (error) {
      screenshotGrounding = {
        applied: false,
        reason: error instanceof Error ? error.message : "Screenshot grounding failed",
      };
    }
  }

  let response = buildResolutionResponse(workingRequest) as Record<string, any>;
  const isStageResponse = response.mode === "workflow-audit-and-iteration" ||
    response.mode === "elevation-audit" ||
    response.mode === "funnel-strategy";

  if (!isStageResponse) {
    response.aiReasoningStatus = "not_requested";

    if (screenshotGrounding) {
      response.screenshotGrounding = screenshotGrounding;
    }
  }

  if (!isStageResponse && workingRequest.output?.includeAiReasoning) {
    try {
      const aiMergeResult = await runUiAnalysis({
        prompt: buildResolutionPrompt(workingRequest) || getPrimaryPrompt(workingRequest) || "Merge EXHIBIT agent reasoning for this request.",
        images: workingRequest.screenshots || [],
        staticDecisionPacket: response.staticDecisionPacket,
      }) as Record<string, any>;

      if (aiMergeResult.mergeSource === "ai-merged" && aiMergeResult.orchestration) {
        response = mergeAiReasoningIntoResponse(response, aiMergeResult.orchestration, {
          resolveDesignProfile: (designProfileId) => {
            const resolvedProfile = designProfiles[designProfileId.replace(/_/g, "-")];
            return resolvedProfile ? buildDesignProfileResponse(resolvedProfile) : null;
          },
        });
        response.aiReasoningStatus = "included";
        response.aiReasoning = {
          model: aiMergeResult.model,
          mergeSource: aiMergeResult.mergeSource,
          usage: aiMergeResult.usage,
          reasoningNotes: aiMergeResult.orchestration.reasoningNotes || [],
          screenshotGroundingApplied: Boolean(screenshotGrounding && screenshotGrounding.applied),
        };
      } else {
        response.aiReasoningStatus = "failed";
        response.aiReasoning = {
          model: aiMergeResult.model,
          mergeSource: aiMergeResult.mergeSource || "static-fallback",
          reason: "AI merge fell back to the static decision packet, so the static /api/agent result was preserved.",
          usage: aiMergeResult.usage,
          reasoningNotes: aiMergeResult.orchestration?.reasoningNotes || [],
        };
      }
    } catch (error) {
      response.aiReasoningStatus = "failed";
      response.aiReasoning = {
        reason: error instanceof Error ? error.message : "AI merge failed",
      };
    }
  }

  if (!isStageResponse) {
    const hydratedMatches = hydrateComponentMatchSources(response.componentMatches || [], workingRequest);
    response.componentMatches = hydratedMatches.componentMatches;
    response.noSourceIncluded = hydratedMatches.includedSourceCount === 0;
  }

  return response;
}

export function getOperationalWorkbenchBundle(request?: AgentBundleRequest): Record<string, unknown> {
  if (!cachedBundle) {
    cachedBundle = existsSync(generatedBundlePath)
      ? readJsonFile<Record<string, unknown>>(generatedBundlePath)
      : buildBundleFromSource();
  }

  if (!request) {
    return cachedBundle;
  }

  return applyAdaptiveRanking(cachedBundle, request);
}