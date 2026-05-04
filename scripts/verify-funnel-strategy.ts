import assert from "node:assert/strict";

import { getAgentResolutionResponse } from "../server/operational-workbench-bundle.ts";

type FunnelPageFlowEntry = {
  label?: string;
  purpose?: string;
  sequenceIntent?: string;
};

type FunnelLayoutBlueprintEntry = {
  label?: string;
  layoutType?: string;
  contentBlocks?: string[];
  interaction?: string[];
  visualHierarchy?: {
    dominant?: string;
    supporting?: string;
  };
};

type FunnelDesignDirection = {
  id?: string;
  name?: string;
  vibe?: string;
  rationale?: string;
  visualRules?: string[];
};

type FunnelStrategyResponse = {
  mode?: string;
  stage?: string;
  funnelPattern?: string;
  conversionFamily?: string;
  conversionMechanism?: string;
  pageFlow?: FunnelPageFlowEntry[];
  layoutBlueprint?: FunnelLayoutBlueprintEntry[];
  sequenceBlueprint?: string[];
  designDirection?: FunnelDesignDirection;
  conversionLogic?: {
    whyThisStructureConverts?: string;
    attentionControl?: string;
    actionPressure?: string;
    frictionReduction?: string;
  };
};

type Scenario = {
  id: string;
  expectedPattern: string;
  expectedFamily: string;
  expectedMechanism: string;
  request: Record<string, unknown>;
  expectedTokens: string[];
  expectedActionTokens: string[];
};

const requiredLabels = [
  "Attention",
  "Belief builder",
  "Proof",
  "Mechanism explanation",
  "Offer + CTA",
  "Reinforcement / objection handling",
];

const scenarios: Scenario[] = [
  {
    id: "webinar-to-call",
    expectedPattern: "webinar-to-call",
    expectedFamily: "webinar",
    expectedMechanism: "email-capture",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a webinar registration funnel that warms cold traffic with training and only routes the most engaged attendees into booked strategy calls.",
      layoutNeeds: ["teaching promise", "response CTA blocks", "event pacing"],
      constraints: { visualPosture: "urgent, legible, and response-oriented" },
      funnelContext: {
        audienceWarmth: "cold",
        commitmentRequired: "email",
        pricePoint: "high",
        businessProfile: {
          businessType: "agency",
          industry: "growth consulting",
          targetAudience: "founders with weak booked-call funnels",
        },
      },
    },
    expectedTokens: ["training", "webinar", "agenda", "registration"],
    expectedActionTokens: ["reserve seat", "registration"],
  },
  {
    id: "advertorial-to-application",
    expectedPattern: "advertorial-to-application",
    expectedFamily: "advertorial",
    expectedMechanism: "application-submit",
    request: {
      stage: "funnel-strategy",
      prompt: "Need an advertorial bridge page that tells the story, builds belief, and moves skeptical readers into a premium application.",
      layoutNeeds: ["editorial premium", "long-form proof pacing", "story bridge to application"],
      constraints: { visualPosture: "editorial, premium, and story-led" },
      funnelContext: {
        audienceWarmth: "cold",
        commitmentRequired: "application",
        pricePoint: "high",
        businessProfile: {
          businessType: "consulting",
          industry: "B2B services",
          targetAudience: "buyers needing narrative proof before applying",
        },
      },
    },
    expectedTokens: ["story", "editorial", "narrative", "application"],
    expectedActionTokens: ["application", "fit"],
  },
  {
    id: "dm-to-call",
    expectedPattern: "dm-to-call",
    expectedFamily: "conversation",
    expectedMechanism: "passive-engagement",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a DM to call flow for warm Instagram inbound where the buyer is already mid-conversation before the booking link appears.",
      layoutNeeds: ["operator intro", "compact diagnosis", "consulting CTA rail"],
      constraints: { visualPosture: "operational, credible, and consultant-led" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "none",
        pricePoint: "high",
        businessProfile: {
          businessType: "agency",
          industry: "client services",
          targetAudience: "founder-led inbound sales through DMs",
        },
      },
    },
    expectedTokens: ["conversation", "dm", "chat", "call"],
    expectedActionTokens: ["book", "call", "reply"],
  },
  {
    id: "vsl-to-application-to-calendar",
    expectedPattern: "vsl-to-application-to-calendar",
    expectedFamily: "vsl",
    expectedMechanism: "application-submit",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a founder-led VSL funnel that warms cold traffic, qualifies hard, and only opens the calendar after the application is approved.",
      layoutNeeds: ["founder-led VSL", "qualification before calendar", "availability rail"],
      constraints: { visualPosture: "premium, selective, and sales-ready" },
      funnelContext: {
        audienceWarmth: "cold",
        commitmentRequired: "application",
        pricePoint: "high",
        businessProfile: {
          businessType: "coaching",
          industry: "business education",
          targetAudience: "premium transformation buyers",
        },
      },
    },
    expectedTokens: ["vsl", "qualification", "application", "approval"],
    expectedActionTokens: ["application", "approval", "book"],
  },
  {
    id: "vsl-to-calendar",
    expectedPattern: "vsl-to-calendar",
    expectedFamily: "vsl",
    expectedMechanism: "demo-request",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a VSL to booked-call page where proof and mechanism make the calendar feel obvious without extra screening.",
      layoutNeeds: ["founder-led VSL", "tight booking step", "proof-led diagnostic blocks"],
      constraints: { visualPosture: "premium, selective, and sales-ready" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "none",
        pricePoint: "high",
        businessProfile: {
          businessType: "consulting",
          industry: "services",
          targetAudience: "warm leads already evaluating a strategy call",
        },
      },
    },
    expectedTokens: ["vsl", "proof", "calendar", "booking"],
    expectedActionTokens: ["book", "calendar"],
  },
  {
    id: "application-first",
    expectedPattern: "application-first",
    expectedFamily: "qualification",
    expectedMechanism: "application-submit",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a premium application-first funnel where the right buyer self-qualifies before the call opens.",
      layoutNeeds: ["qualification before calendar", "operator intro", "proof-led diagnostic blocks"],
      constraints: { visualPosture: "operational, credible, and consultant-led" },
      funnelContext: {
        audienceWarmth: "cold",
        commitmentRequired: "application",
        pricePoint: "high",
        businessProfile: {
          businessType: "consulting",
          industry: "services",
          targetAudience: "buyers who need screening before a sales call",
        },
      },
    },
    expectedTokens: ["qualification", "fit", "application", "approval"],
    expectedActionTokens: ["application", "submit"],
  },
  {
    id: "pre-call-conditioning",
    expectedPattern: "pre-call-conditioning",
    expectedFamily: "pre-call",
    expectedMechanism: "application-submit",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a pre-call conditioning page that confirms the booking, installs context, and gets the buyer ready before the sales call.",
      layoutNeeds: ["tight hierarchy", "one CTA", "prep checklist"],
      constraints: { visualPosture: "restrained and operational" },
      funnelContext: {
        audienceWarmth: "hot",
        commitmentRequired: "application",
        pricePoint: "high",
        businessProfile: {
          businessType: "coaching",
          industry: "education",
          targetAudience: "buyers who already booked and need show-up reinforcement",
        },
      },
    },
    expectedTokens: ["confirmation", "prep", "show-up", "checklist"],
    expectedActionTokens: ["confirm", "prep", "watch"],
  },
  {
    id: "case-study-to-demo",
    expectedPattern: "case-study-to-demo",
    expectedFamily: "diagnostic-proof",
    expectedMechanism: "demo-request",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a proof-led case study page that moves structured buyers into a diagnostic demo request.",
      layoutNeeds: ["proof-led diagnostic blocks", "consulting CTA rail", "compressed hero"],
      constraints: { visualPosture: "restrained, decisive, and conversion-first" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "none",
        pricePoint: "medium",
        businessProfile: {
          businessType: "saas",
          industry: "B2B software",
          targetAudience: "stakeholders evaluating a guided demo",
        },
      },
    },
    expectedTokens: ["case study", "demo", "workflow", "diagnostic"],
    expectedActionTokens: ["demo", "request"],
  },
  {
    id: "trial-first",
    expectedPattern: "trial-first",
    expectedFamily: "trial",
    expectedMechanism: "trial-signup",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a low-friction product page that makes starting the trial easier than keeping on researching options.",
      layoutNeeds: ["compressed hero", "tight booking step", "high-clarity sequence steps"],
      constraints: { visualPosture: "urgent, legible, and response-oriented" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "trial",
        pricePoint: "medium",
        businessProfile: {
          businessType: "saas",
          industry: "software",
          targetAudience: "teams evaluating a fast product trial",
        },
      },
    },
    expectedTokens: ["trial", "setup", "first-win", "signup"],
    expectedActionTokens: ["trial", "signup", "account"],
  },
  {
    id: "lead-capture",
    expectedPattern: "lead-capture",
    expectedFamily: "lead-capture",
    expectedMechanism: "email-capture",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a simple lead magnet page that trades an email for a useful guide and makes the opt-in feel worth it immediately.",
      layoutNeeds: ["compressed hero", "direct proof rail", "one cta"],
      constraints: { visualPosture: "restrained, decisive, and conversion-first" },
      funnelContext: {
        audienceWarmth: "cold",
        commitmentRequired: "email",
        pricePoint: "low",
        businessProfile: {
          businessType: "local service",
          industry: "home services",
          targetAudience: "owners looking for a fast, useful checklist",
        },
      },
    },
    expectedTokens: ["guide", "opt-in", "resource", "email"],
    expectedActionTokens: ["guide", "email", "submit"],
  },
  {
    id: "direct-booking",
    expectedPattern: "direct-booking",
    expectedFamily: "booking",
    expectedMechanism: "demo-request",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a direct booking page for a local lawn care business so homeowners can schedule service fast without wading through a big funnel.",
      layoutNeeds: ["service promise", "quick booking", "local trust cues"],
      constraints: { visualPosture: "clear, practical, and low-friction" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "none",
        pricePoint: "medium",
        businessProfile: {
          businessType: "local service",
          industry: "lawn care",
          targetAudience: "homeowners ready to schedule recurring service",
        },
      },
    },
    expectedTokens: ["service", "booking", "appointment", "local"],
    expectedActionTokens: ["book", "appointment", "time"],
  },
  {
    id: "direct-purchase",
    expectedPattern: "direct-purchase",
    expectedFamily: "purchase",
    expectedMechanism: "direct-purchase",
    request: {
      stage: "funnel-strategy",
      prompt: "Need a direct purchase page for an ecommerce offer where the buyer should move straight into checkout with clear order confidence and support cues.",
      layoutNeeds: ["product value", "order summary", "checkout clarity"],
      constraints: { visualPosture: "clear, disciplined, and purchase-focused" },
      funnelContext: {
        audienceWarmth: "warm",
        commitmentRequired: "purchase",
        pricePoint: "medium",
        businessProfile: {
          businessType: "ecommerce",
          industry: "consumer goods",
          targetAudience: "buyers ready to complete a direct checkout",
          productCategory: "physical",
        },
      },
    },
    expectedTokens: ["checkout", "order", "purchase", "payment"],
    expectedActionTokens: ["checkout", "order", "pay"],
  },
];

function normalizeText(value: unknown) {
  return String(value || "").toLowerCase();
}

function countHits(text: string, tokens: string[]) {
  return tokens.reduce((total, token) => total + (text.includes(token.toLowerCase()) ? 1 : 0), 0);
}

const diversityStopWords = new Set([
  "about",
  "after",
  "before",
  "between",
  "booking",
  "bridge",
  "builder",
  "button",
  "call",
  "clear",
  "clearly",
  "close",
  "content",
  "converts",
  "proof",
  "conversion",
  "funnel",
  "follows",
  "explain",
  "explanation",
  "handling",
  "headline",
  "hierarchy",
  "interaction",
  "layout",
  "mechanism",
  "offer",
  "page",
  "promise",
  "right",
  "left",
  "section",
  "sections",
  "sequence",
  "should",
  "stacked",
  "steps",
  "through",
  "toward",
  "trigger",
  "users",
  "using",
  "visible",
  "where",
  "while",
  "with",
]);

function tokenizeForDiversity(values: unknown[]) {
  const tokens = values
    .map((value) => String(value || "").toLowerCase())
    .join(" ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4 && !diversityStopWords.has(token));

  return new Set(tokens);
}

function scoreScenario(response: FunnelStrategyResponse, scenario: Scenario) {
  const pageFlow = response.pageFlow || [];
  const layoutBlueprint = response.layoutBlueprint || [];
  const sequenceBlueprint = response.sequenceBlueprint || [];
  const direction = response.designDirection || {};
  const conversionLogic = response.conversionLogic || {};

  const combinedText = [
    direction.rationale,
    ...(direction.visualRules || []),
    ...pageFlow.flatMap((entry) => [entry.label, entry.purpose, entry.sequenceIntent]),
    ...layoutBlueprint.flatMap((entry) => [entry.label, entry.layoutType, ...(entry.contentBlocks || []), ...(entry.interaction || []), entry.visualHierarchy?.dominant, entry.visualHierarchy?.supporting]),
    ...sequenceBlueprint,
    conversionLogic.whyThisStructureConverts,
    conversionLogic.attentionControl,
    conversionLogic.actionPressure,
    conversionLogic.frictionReduction,
  ].map(normalizeText).join(" ");

  const structureScore =
    (pageFlow.length === 6 ? 0.8 : 0) +
    (layoutBlueprint.length === 6 ? 0.8 : 0) +
    (sequenceBlueprint.length === 6 ? 0.4 : 0);

  const labelScore = requiredLabels.every((label, index) => pageFlow[index]?.label === label && layoutBlueprint[index]?.label === label)
    ? 2
    : requiredLabels.reduce((total, label, index) => total + ((pageFlow[index]?.label === label && layoutBlueprint[index]?.label === label) ? 1 / 3 : 0), 0);

  const directionScore =
    (direction.id ? 0.3 : 0) +
    (direction.name ? 0.3 : 0) +
    ((direction.vibe || "").length >= 20 ? 0.4 : 0) +
    ((direction.rationale || "").length >= 60 ? 0.8 : 0) +
    ((direction.visualRules || []).length >= 3 ? 0.8 : 0);

  const conversionScore =
    ((conversionLogic.whyThisStructureConverts || "").length >= 40 ? 0.5 : 0) +
    ((conversionLogic.attentionControl || "").length >= 30 ? 0.5 : 0) +
    ((conversionLogic.actionPressure || "").length >= 30 ? 0.5 : 0) +
    ((conversionLogic.frictionReduction || "").length >= 30 ? 0.5 : 0);

  const specificityHits = countHits(combinedText, scenario.expectedTokens);
  const actionHits = countHits(combinedText, scenario.expectedActionTokens);
  const specificityScore = Math.min(2, (specificityHits / Math.max(1, scenario.expectedTokens.length)) * 2);
  const actionScore = Math.min(1.5, (actionHits / Math.max(1, scenario.expectedActionTokens.length)) * 1.5);

  const rawScore = structureScore + labelScore + directionScore + conversionScore + specificityScore + actionScore;
  const cappedScore = Math.min(10, Number(rawScore.toFixed(2)));

  return {
    score: cappedScore,
    specificityHits,
    actionHits,
  };
}

async function main() {
  const results: Array<{
    scenario: string;
    pattern: string;
    family: string;
    mechanism: string;
    directionId: string;
    direction: string;
    heroLayout: string;
    actionLayout: string;
    score: number;
    exclusiveTokens: string[];
  }> = [];
  const distinctLayoutTypes = new Set<string>();
  const distinctDirections = new Set<string>();
  const distinctHeroLayouts = new Set<string>();
  const distinctActionLayouts = new Set<string>();
  const scenarioFingerprints: Array<{
    scenario: string;
    tokens: Set<string>;
  }> = [];

  for (const scenario of scenarios) {
    const response = await getAgentResolutionResponse(scenario.request as any) as FunnelStrategyResponse;

    assert.equal(response.mode, "funnel-strategy", `${scenario.id}: expected funnel-strategy mode.`);
    assert.equal(response.stage, "funnel-strategy", `${scenario.id}: expected funnel-strategy stage.`);
    assert.equal(response.funnelPattern, scenario.expectedPattern, `${scenario.id}: unexpected funnel pattern.`);
    assert.equal(response.conversionFamily, scenario.expectedFamily, `${scenario.id}: unexpected conversion family.`);
    assert.equal(response.conversionMechanism, scenario.expectedMechanism, `${scenario.id}: unexpected conversion mechanism.`);
    assert.ok(response.designDirection?.id, `${scenario.id}: design direction id is missing.`);
    assert.ok(response.designDirection?.vibe, `${scenario.id}: design direction vibe is missing.`);

    const result = scoreScenario(response, scenario);

    assert.ok(result.specificityHits >= Math.ceil(scenario.expectedTokens.length / 2), `${scenario.id}: pattern-specific language is too generic.`);
    assert.ok(result.actionHits >= 1, `${scenario.id}: action language does not match the mechanism.`);
    assert.ok(result.score >= 8, `${scenario.id}: score ${result.score}/10 is below threshold.`);

    (response.layoutBlueprint || []).forEach((entry) => {
      if (entry.layoutType) {
        distinctLayoutTypes.add(entry.layoutType);
      }
    });

    if (response.designDirection?.name) {
      distinctDirections.add(response.designDirection.name);
    }

    const heroLayout = String(response.layoutBlueprint?.[0]?.layoutType || "");
    const actionLayout = String(response.layoutBlueprint?.[4]?.layoutType || "");
    if (heroLayout) distinctHeroLayouts.add(heroLayout);
    if (actionLayout) distinctActionLayouts.add(actionLayout);

    scenarioFingerprints.push({
      scenario: scenario.id,
      tokens: tokenizeForDiversity([
        response.designDirection?.name,
        response.designDirection?.id,
        response.designDirection?.vibe,
        response.designDirection?.rationale,
        ...(response.designDirection?.visualRules || []),
        ...(response.pageFlow || []).flatMap((entry) => [entry.label, entry.purpose, entry.sequenceIntent]),
        ...(response.layoutBlueprint || []).flatMap((entry) => [
          entry.label,
          entry.layoutType,
          entry.visualHierarchy?.dominant,
          entry.visualHierarchy?.supporting,
          ...(entry.contentBlocks || []),
          ...(entry.interaction || []),
        ]),
        ...(response.sequenceBlueprint || []),
        response.conversionLogic?.whyThisStructureConverts,
        response.conversionLogic?.attentionControl,
        response.conversionLogic?.actionPressure,
        response.conversionLogic?.frictionReduction,
      ]),
    });

    results.push({
      scenario: scenario.id,
      pattern: String(response.funnelPattern || ""),
      family: String(response.conversionFamily || ""),
      mechanism: String(response.conversionMechanism || ""),
      directionId: String(response.designDirection?.id || ""),
      direction: String(response.designDirection?.name || ""),
      heroLayout,
      actionLayout,
      score: result.score,
      exclusiveTokens: [],
    });
  }

  const pairwiseOverlaps: Array<{ pair: string; overlap: number }> = [];
  results.forEach((entry, index) => {
    const currentFingerprint = scenarioFingerprints[index];
    const otherTokens = new Set(
      scenarioFingerprints
        .filter((_, fingerprintIndex) => fingerprintIndex !== index)
        .flatMap((fingerprint) => [...fingerprint.tokens]),
    );
    const exclusiveTokens = [...currentFingerprint.tokens].filter((token) => !otherTokens.has(token)).slice(0, 10);
    entry.exclusiveTokens = exclusiveTokens;

    assert.ok(exclusiveTokens.length >= 6, `${entry.scenario}: expected at least 6 exclusive fingerprint tokens, found ${exclusiveTokens.length}.`);

    for (let compareIndex = index + 1; compareIndex < scenarioFingerprints.length; compareIndex += 1) {
      const compareFingerprint = scenarioFingerprints[compareIndex];
      const sharedTokens = [...currentFingerprint.tokens].filter((token) => compareFingerprint.tokens.has(token)).length;
      const unionCount = new Set([...currentFingerprint.tokens, ...compareFingerprint.tokens]).size;
      const overlap = Number((sharedTokens / Math.max(1, unionCount)).toFixed(3));
      pairwiseOverlaps.push({
        pair: `${entry.scenario} vs ${results[compareIndex].scenario}`,
        overlap,
      });
    }
  });

  const averageScore = Number((results.reduce((sum, entry) => sum + entry.score, 0) / results.length).toFixed(2));
  const maxPairwiseOverlap = pairwiseOverlaps.reduce((max, pair) => Math.max(max, pair.overlap), 0);

  assert.ok(distinctLayoutTypes.size >= 20, `Expected at least 20 distinct layout types across scenarios, found ${distinctLayoutTypes.size}.`);
  assert.ok(distinctDirections.size >= 8, `Expected at least 8 distinct design directions across the scenario matrix, found ${distinctDirections.size}.`);
  assert.equal(distinctHeroLayouts.size, scenarios.length, `Expected every scenario to have a distinct hero layout shell, found ${distinctHeroLayouts.size}/${scenarios.length}.`);
  assert.ok(distinctActionLayouts.size >= 8, `Expected at least 8 distinct action-zone layout shells, found ${distinctActionLayouts.size}.`);
  assert.ok(maxPairwiseOverlap <= 0.42, `Expected pairwise fingerprint overlap to stay at or below 0.42, found ${maxPairwiseOverlap}.`);
  assert.ok(averageScore >= 8.5, `Average score ${averageScore}/10 is below the target threshold.`);

  console.table(results);
  console.table(pairwiseOverlaps.sort((left, right) => right.overlap - left.overlap).slice(0, 10));
  console.log(`Average funnel strategy score: ${averageScore}/10`);
  console.log(`Distinct layout types: ${distinctLayoutTypes.size}`);
  console.log(`Distinct design directions: ${distinctDirections.size}`);
  console.log(`Distinct hero layouts: ${distinctHeroLayouts.size}`);
  console.log(`Distinct action layouts: ${distinctActionLayouts.size}`);
  console.log(`Max pairwise overlap: ${maxPairwiseOverlap}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});