import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

type RequestContextLike = {
  userComplaint?: string;
  problemStatement?: string;
  summary?: string;
  routingIntent?: string;
  knownProblems?: string[];
  desiredResources?: string[];
  userRoles?: string[];
  dataSources?: string[];
  mutations?: string[];
  timelineMoments?: string[];
  observedAsyncProblems?: string[];
  visibleModes?: string[];
  competingControls?: string[];
  transitionsNeedingCoverage?: string[];
  agentNotes?: string[];
  existingSurfaceSignals?: string[];
  primaryObject?: string;
  screenshotVisibleSummary?: string;
  screenshotComplaintAlignment?: string;
  screenshotVisibleIssues?: string[];
  screenshotNextQuestion?: string;
};

type ResolutionRequestLike = {
  question?: string;
  prompt?: string;
  goal?: string;
  surfaceType?: string;
  sector?: string;
  route?: string;
  layoutNeeds?: string[];
  output?: {
    includeComponentSource?: boolean;
    maxSourceMatches?: number;
  };
  context?: RequestContextLike;
};

type DesignProfileSummary = {
  id: string | null;
  label: string;
  density: string;
  iconLibrary: string;
  elevation: string;
  motion: string;
};

type StaticDecisionPacketArgs = {
  request: ResolutionRequestLike;
  prompt: string;
  surfaceType: string | null;
  classification: {
    confidence: number;
  };
  designProfileSummary: DesignProfileSummary | null;
  confidenceMode: string;
  dominantTaskSurface: string;
  shellRecommendation: Record<string, unknown> | null;
  missingTruth: string[];
  componentMatches: Array<Record<string, unknown>>;
  stateRisks: string[];
  coherenceRisks: string[];
  operationalTruthIntelligence: Record<string, any>;
};

type MergeOptions = {
  resolveDesignProfile?: (designProfileId: string) => Record<string, unknown> | null;
};

const repoRoot = process.cwd();

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function buildStaticDecisionPacket(args: StaticDecisionPacketArgs) {
  return {
    prompt: args.prompt,
    goal: args.request.goal || null,
    routeHint: args.request.route || args.request.sector || args.request.surfaceType || null,
    platform: "platform" in args.request && typeof (args.request as { platform?: string }).platform === "string"
      ? (args.request as { platform?: string }).platform
      : "unknown",
    classification: {
      surfaceType: args.surfaceType,
      dominantTaskSurface: args.dominantTaskSurface,
      designProfile: args.designProfileSummary?.id || null,
      shellRecommendation: args.shellRecommendation?.id || null,
      confidence: args.classification.confidence,
      confidenceMode: args.confidenceMode,
    },
    missingTruth: args.missingTruth,
    contextSignals: {
      primaryActor: args.request.context?.userRoles?.[0] || null,
      primaryObject: args.request.context?.primaryObject || null,
      mutationType: args.request.context?.mutations?.[0] || null,
      sourceOfTruth: args.request.context?.dataSources?.[0] || null,
      dominantWorkflowStage: args.request.context?.timelineMoments?.[0] || null,
      dataSources: args.request.context?.dataSources || [],
      mutations: args.request.context?.mutations || [],
      observedAsyncProblems: args.request.context?.observedAsyncProblems || [],
      existingSurfaceSignals: args.request.context?.existingSurfaceSignals || [],
      competingControls: args.request.context?.competingControls || [],
    },
    designProfileSummary: args.designProfileSummary,
    shellRecommendation: args.shellRecommendation,
    rankedComponents: args.componentMatches.map((component) => ({
      slug: component.slug,
      score: component.score,
      category: component.category,
      fitReason: component.whyFits,
      usageRole: component.layoutRole,
      deliveryMode: component.deliveryMode,
    })),
    stateRisks: args.stateRisks,
    coherenceRisks: args.coherenceRisks,
    antiPatternsToAvoid: args.operationalTruthIntelligence?.placeholderPolicy?.ban || [],
    screenshotGrounding: args.request.context?.screenshotVisibleSummary
      ? {
          applied: true,
          visibleSummary: args.request.context?.screenshotVisibleSummary,
          complaintAlignment: args.request.context?.screenshotComplaintAlignment || null,
          visibleIssues: args.request.context?.screenshotVisibleIssues || [],
          nextQuestion: args.request.context?.screenshotNextQuestion || null,
        }
      : null,
  };
}

export function buildAgentScreenshotGroundingPrompt(request: ResolutionRequestLike) {
  const primaryPrompt = request.question || request.prompt || request.goal || "";

  return [
    "Ground this UI complaint against the attached screenshots.",
    `Question: ${primaryPrompt || "not provided"}`,
    `Goal: ${request.goal || "not provided"}`,
    `Surface type: ${request.surfaceType || "not provided"}`,
    `Sector: ${request.sector || "not provided"}`,
    `Route: ${request.route || "not provided"}`,
    `Complaint: ${request.context?.userComplaint || request.context?.problemStatement || request.context?.summary || "not provided"}`,
    `Routing intent: ${request.context?.routingIntent || "not provided"}`,
    `Known problems: ${(request.context?.knownProblems || []).join(", ") || "not provided"}`,
    `Layout needs: ${(request.layoutNeeds || []).join(", ") || "not provided"}`,
    "Return only visible hierarchy, density, control, tone, and communication failures that can actually be supported by the screenshots.",
  ].join("\n");
}

export function applyScreenshotGroundingToRequest<T extends ResolutionRequestLike>(request: T, grounding: Record<string, any>): T {
  return {
    ...request,
    context: {
      ...(request.context || {}),
      summary: uniqueStrings([
        request.context?.summary || "",
        grounding.visibleSummary || "",
      ]).join(" "),
      desiredResources: request.context?.desiredResources || [],
      userRoles: request.context?.userRoles || [],
      dataSources: request.context?.dataSources || [],
      mutations: request.context?.mutations || [],
      timelineMoments: request.context?.timelineMoments || [],
      observedAsyncProblems: request.context?.observedAsyncProblems || [],
      visibleModes: request.context?.visibleModes || [],
      competingControls: request.context?.competingControls || [],
      transitionsNeedingCoverage: request.context?.transitionsNeedingCoverage || [],
      agentNotes: uniqueStrings([
        ...(request.context?.agentNotes || []),
        grounding.complaintAlignment ? `Screenshot grounding: ${grounding.complaintAlignment}` : "",
      ]).slice(0, 20),
      knownProblems: uniqueStrings([
        ...(request.context?.knownProblems || []),
        ...((grounding.visibleIssues || []) as string[]),
      ]).slice(0, 16),
      existingSurfaceSignals: uniqueStrings([
        ...(request.context?.existingSurfaceSignals || []),
        grounding.likelySurface || "",
        grounding.userType || "",
        grounding.primaryTask || "",
        grounding.toneRead || "",
      ]).slice(0, 20),
      screenshotVisibleSummary: grounding.visibleSummary,
      screenshotComplaintAlignment: grounding.complaintAlignment,
      screenshotVisibleIssues: grounding.visibleIssues,
      screenshotNextQuestion: grounding.nextQuestion || undefined,
    },
  };
}

function readResolvedComponentSource(slug: string) {
  const localPath = path.join(repoRoot, "components", `${slug}.tsx`);
  const workspacePath = `components/${slug}.tsx`;

  if (!existsSync(localPath)) {
    return {
      included: false,
      path: workspacePath,
      reason: "Component source file could not be resolved.",
    };
  }

  try {
    return {
      included: true,
      path: workspacePath,
      code: readFileSync(localPath, "utf8"),
    };
  } catch (error) {
    return {
      included: false,
      path: workspacePath,
      reason: error instanceof Error ? error.message : "Component source could not be read.",
    };
  }
}

export function hydrateComponentMatchSources(
  componentMatches: Array<Record<string, any>>,
  request: ResolutionRequestLike,
) {
  const includeComponentSource = request.output?.includeComponentSource ?? false;
  const maxSourceMatches = Math.min(request.output?.maxSourceMatches ?? 2, 5);

  if (!includeComponentSource) {
    return {
      componentMatches,
      includedSourceCount: 0,
    };
  }

  let includedSourceCount = 0;
  const hydratedMatches = componentMatches.map((match) => {
    if (match.deliveryMode !== "reference_plus_source") {
      return match;
    }

    if (includedSourceCount >= maxSourceMatches) {
      return {
        ...match,
        source: {
          ...(match.source || {}),
          included: false,
          reason: "Source inclusion cap reached for this response.",
        },
      };
    }

    const resolvedSource = readResolvedComponentSource(match.slug);
    if (resolvedSource.included) {
      includedSourceCount += 1;
    }

    return {
      ...match,
      source: {
        ...(match.source || {}),
        ...resolvedSource,
      },
    };
  });

  return {
    componentMatches: hydratedMatches,
    includedSourceCount,
  };
}

function mergeComponentMatchesWithAi(
  baseMatches: Array<Record<string, any>>,
  aiMatches: Array<Record<string, any>>,
) {
  const baseBySlug = new Map(baseMatches.map((match) => [match.slug, match]));

  return aiMatches.map((match) => {
    const base = baseBySlug.get(match.slug) || {};
    return {
      ...base,
      slug: match.slug,
      score: match.score,
      whyFits: match.fitReason,
      layoutRole: match.usageRole,
      deliveryMode: match.deliveryMode || base.deliveryMode,
      implementationPosture: match.implementationPosture || base.implementationPosture,
      preserve: Array.isArray(match.preserve) && match.preserve.length > 0 ? match.preserve : base.preserve,
      safeToAdapt: Array.isArray(match.safeToAdapt) && match.safeToAdapt.length > 0 ? match.safeToAdapt : base.safeToAdapt,
      source: base.source,
      sourceIncluded: base.sourceIncluded,
    };
  });
}

export function mergeAiReasoningIntoResponse(
  response: Record<string, any>,
  aiReasoning: Record<string, any>,
  options: MergeOptions = {},
) {
  const mergedResponse = { ...response };

  mergedResponse.surfaceType = aiReasoning.surfaceType || response.surfaceType;
  mergedResponse.dominantTaskSurface = aiReasoning.dominantTaskSurface || response.dominantTaskSurface;
  mergedResponse.confidence = typeof aiReasoning.confidence === "number" ? aiReasoning.confidence : response.confidence;
  mergedResponse.confidenceMode = aiReasoning.confidenceMode || response.confidenceMode;
  mergedResponse.missingTruth = aiReasoning.missingTruth || response.missingTruth;
  mergedResponse.shellRecommendation = aiReasoning.shellRecommendation || response.shellRecommendation;
  mergedResponse.stateRisks = aiReasoning.stateRisks || response.stateRisks;
  mergedResponse.coherenceRisks = aiReasoning.coherenceRisks || response.coherenceRisks;
  mergedResponse.implementationPosture = aiReasoning.implementationPosture || response.implementationPosture;
  mergedResponse.buildGuidance = aiReasoning.buildGuidance || response.buildGuidance;

  if (typeof aiReasoning.designProfile === "string") {
    const resolvedProfile = options.resolveDesignProfile?.(aiReasoning.designProfile);
    if (resolvedProfile) {
      mergedResponse.designProfile = resolvedProfile;
    }
  }

  if (Array.isArray(aiReasoning.componentMatches) && aiReasoning.componentMatches.length > 0) {
    mergedResponse.componentMatches = mergeComponentMatchesWithAi(response.componentMatches || [], aiReasoning.componentMatches);
  }

  return mergedResponse;
}