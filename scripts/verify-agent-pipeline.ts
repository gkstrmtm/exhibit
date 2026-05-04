import assert from "node:assert/strict";

import { getAgentResolutionResponse } from "../server/operational-workbench-bundle.ts";

type MockCompletionPayload = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
};

type MockResponseDef = {
  ok?: boolean;
  status?: number;
  body: string | Record<string, unknown>;
};

const onePixelPng =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9pX6lzQAAAAASUVORK5CYII=";

function buildBaseRequest(overrides: Record<string, unknown> = {}) {
  return {
    prompt: "Design a serious assistant workspace for routing, artifact review, and operational complaint handling.",
    goal: "Return implementation-ready shell and component guidance for a code agent.",
    route: "assistant-workspace",
    constraints: {
      density: "compact",
      visualPosture: "restrained and operational",
      avoid: ["card mosaics", "decorative chrome"],
    },
    layoutNeeds: ["history rail", "artifact pane", "context intake"],
    workspaceModules: ["assistant routing", "artifact review"],
    context: {
      summary: "The interface needs to behave like serious software, not a chat toy.",
      problemStatement: "The current shell drifts into generic card-heavy dashboard grammar.",
      userComplaint: "The assistant setup feels decorative and loses context while switching modes.",
      primaryObject: "assistant request",
      userRoles: ["design operator"],
      dataSources: ["agent endpoint"],
      mutations: ["route", "approve", "revise"],
      timelineMoments: ["triage", "handoff", "approval"],
      knownProblems: ["duplicate mode controls"],
      existingSurfaceSignals: ["assistant workspace", "artifact pane", "context rail"],
      observedAsyncProblems: ["thread refresh blanks the content region"],
    },
    output: {
      rankedComponents: true,
      includeAnatomy: true,
      includeStateCoverage: true,
      includeTransitionGuidance: true,
      includeCompositionGuidance: true,
      includeTokenPosture: true,
      includeAiReasoning: false,
      includeComponentSource: false,
      maxSourceMatches: 2,
    },
    ...overrides,
  };
}

function buildCompletion(content: Record<string, unknown>): MockCompletionPayload {
  return {
    choices: [
      {
        message: {
          content: JSON.stringify(content),
        },
      },
    ],
    usage: {
      prompt_tokens: 100,
      completion_tokens: 50,
      total_tokens: 150,
    },
  };
}

function createMockFetch(definitions: MockResponseDef[]) {
  const queue = [...definitions];
  const calls: Array<{ url: string; options: any }> = [];

  const mockFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const next = queue.shift();
    if (!next) {
      throw new Error("Unexpected fetch call during agent verification.");
    }

    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    calls.push({ url, options: init });
    const bodyText = typeof next.body === "string" ? next.body : JSON.stringify(next.body);

    return {
      ok: next.ok ?? true,
      status: next.status ?? 200,
      async text() {
        return bodyText;
      },
      async json() {
        return typeof next.body === "string" ? JSON.parse(bodyText) : next.body;
      },
    } as Response;
  }) as typeof fetch;

  return {
    mockFetch,
    calls,
    assertConsumed() {
      assert.equal(queue.length, 0, `Expected all mocked fetch responses to be consumed, but ${queue.length} remained.`);
    },
  };
}

async function withMockFetch(definitions: MockResponseDef[], run: (state: ReturnType<typeof createMockFetch>) => Promise<void>) {
  const state = createMockFetch(definitions);
  const previousFetch = globalThis.fetch;

  globalThis.fetch = state.mockFetch;
  process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "test-openai-key";

  try {
    await run(state);
    state.assertConsumed();
  } finally {
    globalThis.fetch = previousFetch;
  }
}

async function verifyStaticResolution() {
  const response = await getAgentResolutionResponse(buildBaseRequest());

  assert.equal(response.aiReasoningStatus, "not_requested");
  assert.equal(typeof response.surfaceType, "string");
  assert.equal(typeof response.dominantTaskSurface, "string");
  assert.equal(typeof response.confidence, "number");
  assert.ok(Array.isArray(response.componentMatches));
  assert.ok((response.componentMatches as Array<unknown>).length > 0);
  assert.equal(response.noSourceIncluded, true);
}

async function verifySourceHydration() {
  const response = await getAgentResolutionResponse(buildBaseRequest({
    output: {
      rankedComponents: true,
      includeAnatomy: true,
      includeStateCoverage: true,
      includeTransitionGuidance: true,
      includeCompositionGuidance: true,
      includeTokenPosture: true,
      includeAiReasoning: false,
      includeComponentSource: true,
      maxSourceMatches: 1,
    },
  }));

  const matches = response.componentMatches as Array<Record<string, any>>;
  const sourceBacked = matches.find((match) => match.deliveryMode === "reference_plus_source" && match.source?.included === true);

  assert.ok(sourceBacked, "Expected at least one source-backed component match.");
  assert.match(sourceBacked.source.path, /^components\/.+\.tsx$/);
  assert.match(sourceBacked.source.code, /export default function/);
}

async function verifyAiMergeIncluded() {
  await withMockFetch(
    [
      {
        body: buildCompletion({
          surfaceType: "assistant_workspace",
          dominantTaskSurface: "two_panel_review",
          designProfile: "product_utility",
          confidence: 0.93,
          confidenceMode: "proceed_with_cautions",
          missingTruth: [],
          shellRecommendation: {
            id: "assistant_workspace_shell",
            label: "assistant workspace shell",
            why: "The conversation plus artifact split is the right center of gravity.",
            preserve: ["shell structure", "density", "state behavior"],
            avoid: ["decorative summaries", "duplicate controls"],
          },
          componentMatches: [
            {
              slug: "general-assistant-chat-workspace",
              score: 96,
              fitReason: "Best anchor for assistant conversation and routing.",
              usageRole: "application shell",
              deliveryMode: "reference_plus_source",
              implementationPosture: "use_as_shell_anchor",
              preserve: ["shell structure", "density"],
              safeToAdapt: ["label wording", "local color tokens"],
            },
          ],
          stateRisks: ["Do not blank the artifact pane during thread swaps."],
          coherenceRisks: ["Avoid repeating route state in both tabs and badges."],
          implementationPosture: "use_as_shell_anchor",
          buildGuidance: ["Keep the artifact pane primary once review starts."],
          reasoningNotes: ["Static route was correct; AI only tightened shell emphasis."],
        }),
      },
    ],
    async () => {
      const response = await getAgentResolutionResponse(buildBaseRequest({
        output: {
          rankedComponents: true,
          includeAnatomy: true,
          includeStateCoverage: true,
          includeTransitionGuidance: true,
          includeCompositionGuidance: true,
          includeTokenPosture: true,
          includeAiReasoning: true,
          includeComponentSource: false,
          maxSourceMatches: 1,
        },
      }));

      assert.equal(response.aiReasoningStatus, "included");
      assert.equal(response.aiReasoning?.mergeSource, "ai-merged");
      assert.equal(response.dominantTaskSurface, "two_panel_review");
      assert.equal(response.implementationPosture, "use_as_shell_anchor");
    },
  );
}

async function verifyAiMergeFallback() {
  await withMockFetch(
    [
      {
        ok: false,
        status: 500,
        body: { message: "simulated ai failure" },
      },
    ],
    async () => {
      const response = await getAgentResolutionResponse(buildBaseRequest({
        output: {
          rankedComponents: true,
          includeAnatomy: true,
          includeStateCoverage: true,
          includeTransitionGuidance: true,
          includeCompositionGuidance: true,
          includeTokenPosture: true,
          includeAiReasoning: true,
          includeComponentSource: false,
          maxSourceMatches: 1,
        },
      }));

      assert.equal(response.aiReasoningStatus, "failed");
      assert.equal(typeof response.surfaceType, "string");
      assert.ok(Array.isArray(response.componentMatches));
    },
  );
}

async function verifyScreenshotGroundedMergedFlow() {
  await withMockFetch(
    [
      {
        body: buildCompletion({
          visibleSummary: "An assistant workspace with a visible queue and a right-side context rail.",
          likelySurface: "assistant workspace",
          userType: "design operator",
          primaryTask: "route and review incoming asks",
          toneRead: "serious operational",
          complaintAlignment: "The visible shell supports triage, but duplicated mode communication is plausible.",
          visibleIssues: ["Mode and route labels may be repeated in adjacent regions."],
          nextQuestion: "What can the user actually approve or change from this shell?",
        }),
      },
      {
        body: buildCompletion({
          surfaceType: "assistant_workspace",
          dominantTaskSurface: "queue",
          designProfile: "product_utility",
          confidence: 0.88,
          confidenceMode: "proceed_with_cautions",
          missingTruth: ["Primary object"],
          shellRecommendation: {
            id: "queue_first_shell",
            label: "queue first shell",
            why: "The visible evidence supports a routing queue as the work surface.",
            preserve: ["queue dominance", "compact density", "right-side context rail"],
            avoid: ["summary-first card rows", "duplicate mode selectors"],
          },
          componentMatches: [
            {
              slug: "missing-component-slug",
              score: 91,
              fitReason: "Used to verify graceful source fallback.",
              usageRole: "application shell",
              deliveryMode: "reference_plus_source",
              implementationPosture: "use_as_shell_anchor",
              preserve: ["shell structure"],
              safeToAdapt: ["label wording"],
            },
          ],
          stateRisks: ["Keep the queue rows visible during refresh."],
          coherenceRisks: ["Do not repeat route state in both tabs and summary chips."],
          implementationPosture: "use_as_shell_anchor",
          buildGuidance: ["Keep the queue dominant and ask for truth before adding approval-specific actions."],
          reasoningNotes: ["Screenshot evidence supports queue-first routing."],
        }),
      },
    ],
    async () => {
      const response = await getAgentResolutionResponse(buildBaseRequest({
        screenshots: [
          {
            name: "assistant.png",
            type: "image/png",
            size: 68,
            width: 1,
            height: 1,
            dataUrl: onePixelPng,
          },
        ],
        output: {
          rankedComponents: true,
          includeAnatomy: true,
          includeStateCoverage: true,
          includeTransitionGuidance: true,
          includeCompositionGuidance: true,
          includeTokenPosture: true,
          includeAiReasoning: true,
          includeComponentSource: true,
          maxSourceMatches: 1,
        },
      }));

      assert.equal(response.screenshotGrounding?.applied, true);
      assert.equal(response.aiReasoningStatus, "included");
      const missingSource = (response.componentMatches as Array<Record<string, any>>).find((match) => match.slug === "missing-component-slug");
      assert.ok(missingSource, "Expected merged AI component match to be present.");
      assert.equal(missingSource.source?.included, false);
      assert.equal(typeof missingSource.source?.reason, "string");
    },
  );
}

async function verifyWorkflowAuditStage() {
  const response = await getAgentResolutionResponse({
    stage: "workflow-audit-and-iteration",
    prompt: "This is an internal operations workbench for a company system. Primary user: manager. Primary object: client relationship, account, event, and task records moving through acquisition, onboarding, fulfillment, and retention. Data sources: CRM, scheduling API, internal task queue, and role-based operational records. Allowed mutations: assign ownership, update status, schedule or reschedule work, add notes, move lifecycle stage, and route follow-up. Lifecycle: new client, qualification, cadence, fulfillment, recovery, review. Target surface under review: cross-workspace control system for Clients, Fulfillment, and Workday. What already works: the portal reads as a serious internal system, the workspaces are clearer, and the shared controls are more compact. Current problems: some surfaces still risk layout instability, some control systems can still feel heavier than the work they govern, and cross-workspace consistency can drift during local fixes. Relevant recent changes: shared controls were compacted, sticky workspace-toolbar behavior was removed, and empty states were stabilized. What must not be lost: the operational posture, the client-lifecycle-first model, the denser workbench feel, and the stronger first-step guidance.",
    route: "operational-workbench",
  });

  assert.equal(response.mode, "workflow-audit-and-iteration");
  assert.equal(response.stage, "workflow-audit-and-iteration");
  assert.ok(Array.isArray(response.currentDirectionToPreserve));
  assert.equal((response.currentDirectionToPreserve as Array<unknown>).length, 4);
  assert.ok(Array.isArray(response.majorPitfallsOrWorkflowFlaws));
  assert.equal((response.majorPitfallsOrWorkflowFlaws as Array<unknown>).length, 5);
  assert.ok(Array.isArray(response.whatToFixInThisIteration));
  assert.equal((response.whatToFixInThisIteration as Array<unknown>).length, 5);
  assert.ok(Array.isArray(response.whatToDeferUntilLater));
  assert.equal((response.whatToDeferUntilLater as Array<unknown>).length, 3);
  assert.ok(Array.isArray(response.promptingOrWorkflowAdjustments));
  assert.equal((response.promptingOrWorkflowAdjustments as Array<unknown>).length, 5);
  assert.equal("aiReasoningStatus" in response, false);
}

async function verifyElevationAuditStage() {
  const response = await getAgentResolutionResponse({
    stage: "elevation-audit",
    prompt: "Internal operations workbench for client and task management.",
    route: "operational-workbench",
    context: {
      userComplaint: "The dashboard is cluttered and generic — cards everywhere, kebab menus on every row, and generic labels like Overview and Dashboard.",
      primaryObject: "client record",
      userRoles: ["operations manager"],
      existingSurfaceSignals: ["client queue", "task panel"],
    },
  });

  assert.equal(response.mode, "elevation-audit");
  assert.equal(response.stage, "elevation-audit");
  assert.equal(typeof response.surfaceType, "string");
  assert.equal(typeof response.elevationReadiness, "string");
  assert.ok(["ready_to_elevate", "fix_structure_first", "needs_truth"].includes(response.elevationReadiness as string));
  assert.equal("aiReasoningStatus" in response, false);
  assert.equal("componentMatches" in response, false);

  if (response.elevationReadiness === "ready_to_elevate") {
    assert.ok(Array.isArray(response.whatIsAlreadyGood));
    assert.ok(Array.isArray(response.genericTraps));
    assert.ok(Array.isArray(response.frictionCuts));
    assert.ok(Array.isArray(response.differentiatingMoves));
    assert.ok(Array.isArray(response.elevationSequence));
    assert.equal(typeof response.elevationMaxim, "string");
    assert.ok((response.differentiatingMoves as Array<unknown>).length >= 1);
  }
}

async function verifyFunnelStrategyStage() {
  const responseCold = await getAgentResolutionResponse({
    stage: "funnel-strategy",
    prompt: "Lead capture page for a local HVAC company running Facebook ads.",
    funnelContext: {
      audienceWarmth: "cold",
      commitmentRequired: "email",
      businessProfile: {
        businessType: "local service",
        industry: "home services",
      },
    },
  } as any);

  assert.equal(responseCold.mode, "funnel-strategy");
  assert.equal(responseCold.stage, "funnel-strategy");
  assert.equal(responseCold.frictionProfile, "frictionless");
  assert.equal(responseCold.trafficTemperature, "cold");
  assert.equal(responseCold.conversionMechanism, "email-capture");
  assert.ok(Array.isArray(responseCold.tensionStrategy));
  assert.ok(Array.isArray(responseCold.dropoffRisks));
  assert.ok(Array.isArray(responseCold.progressionAnchors));
  assert.ok(Array.isArray(responseCold.trustSignalPlacement));
  assert.ok(Array.isArray(responseCold.timingMap));
  assert.ok(Array.isArray(responseCold.componentSuggestions));
  assert.ok(typeof responseCold.ctaGuidance === "object");
  assert.equal("aiReasoningStatus" in responseCold, false);
  assert.equal("componentMatches" in responseCold, false);

  const responseHighTicket = await getAgentResolutionResponse({
    stage: "funnel-strategy",
    prompt: "Application funnel for a high-ticket business coaching program.",
    funnelContext: {
      pricePoint: "high",
      commitmentRequired: "application",
      businessProfile: {
        businessType: "coaching",
      },
    },
  } as any);

  assert.equal(responseHighTicket.frictionProfile, "high-commitment");
  assert.equal(responseHighTicket.conversionMechanism, "application-submit");
  assert.ok((responseHighTicket.timingMap as Array<unknown>).length >= 3);
}

async function main() {
  await verifyStaticResolution();
  await verifySourceHydration();
  await verifyAiMergeIncluded();
  await verifyAiMergeFallback();
  await verifyScreenshotGroundedMergedFlow();
  await verifyWorkflowAuditStage();
  await verifyElevationAuditStage();
  await verifyFunnelStrategyStage();

  console.log("Agent pipeline verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});