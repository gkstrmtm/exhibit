import assert from "node:assert/strict";

const baseUrl = (process.env.AGENT_VERIFY_URL || "https://exhibit-beta.vercel.app").replace(/\/$/, "");
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

async function requestJson(path: string, init?: RequestInit) {
  const response = await fetch(new URL(path, `${baseUrl}/`), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
  });

  const raw = await response.text();
  let payload: any = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch (_error) {
      if (/Authentication Required/i.test(raw) || /This page requires Vercel Authentication/i.test(raw)) {
        throw new Error(`Live verification is blocked by Vercel Authentication at ${baseUrl}. Verify against an authenticated session or run the same script with AGENT_VERIFY_URL pointed at localhost.`);
      }

      throw new Error(`Expected JSON from ${path} but received: ${raw.slice(0, 240)}`);
    }
  }

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with ${response.status}: ${JSON.stringify(payload)}`);
  }

  return payload;
}

async function verifyHealth() {
  const response = await requestJson("/api/agent?health=1");

  assert.equal(response.ok, true);
  assert.equal(response.route, "/api/agent");
  assert.equal(response.handler_loaded, true);
}

async function verifyPromptAliasGet() {
  const response = await requestJson(`/api/agent?prompt=${encodeURIComponent("this is an internal operations dashboard")}`);

  assert.equal(response.mode, "question-router");
  assert.equal(response.endpoint, "/api/agent");
  assert.match(response.question, /internal operations dashboard/i);
  assert.equal(typeof response.classification?.confidence, "number");
}

async function verifyPromptAliasPost() {
  const response = await requestJson("/api/agent", {
    method: "POST",
    body: JSON.stringify({
      prompt: "Route this as a serious internal operations surface before recommending any components.",
    }),
  });

  assert.equal(response.mode, "question-router");
  assert.equal(response.endpoint, "/api/agent");
  assert.match(response.question, /internal operations surface/i);
}

async function verifyStaticResolution() {
  const response = await requestJson("/api/agent", {
    method: "POST",
    body: JSON.stringify(buildBaseRequest()),
  });

  assert.equal(response.mode, "component-resolution");
  assert.equal(response.endpoint, "/api/agent");
  assert.equal(response.aiReasoningStatus, "not_requested");
  assert.equal(typeof response.surfaceType, "string");
  assert.equal(typeof response.dominantTaskSurface, "string");
  assert.equal(typeof response.confidence, "number");
  assert.ok(Array.isArray(response.componentMatches));
  assert.ok(response.componentMatches.length > 0);
}

async function verifySourceHydration() {
  const response = await requestJson("/api/agent", {
    method: "POST",
    body: JSON.stringify(buildBaseRequest({
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
    })),
  });

  const matches = response.componentMatches as Array<Record<string, any>>;
  const sourceBacked = matches
    .find((match) => match.deliveryMode === "reference_plus_source");

  assert.ok(Array.isArray(matches));
  assert.equal(typeof response.noSourceIncluded, "boolean");

  if (sourceBacked) {
    assert.equal(typeof sourceBacked.source?.path, "string");
    assert.match(sourceBacked.source.path, /^components\/.+\.tsx$/);
  }
}

async function verifyAiAndScreenshotFlow() {
  const response = await requestJson("/api/agent", {
    method: "POST",
    body: JSON.stringify(buildBaseRequest({
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
    })),
  });

  assert.equal(typeof response.screenshotGrounding?.applied, "boolean");
  assert.ok(["included", "failed"].includes(response.aiReasoningStatus));

  if (response.aiReasoningStatus === "included") {
    assert.equal(response.aiReasoning?.mergeSource, "ai-merged");
  } else {
    assert.equal(typeof response.aiReasoning?.reason, "string");
  }
}

async function main() {
  await verifyHealth();
  await verifyPromptAliasGet();
  await verifyPromptAliasPost();
  await verifyStaticResolution();
  await verifySourceHydration();
  await verifyAiAndScreenshotFlow();

  console.log(`Remote agent verification passed against ${baseUrl}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});