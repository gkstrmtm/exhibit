export const openapiSpec = {
  openapi: "3.1.0",
  info: {
    title: "EXHIBIT Agent API",
    version: "1.1.0",
    description:
      "EXHIBIT is a proof-first UI component library and design-intelligence router for coding agents. Use /api/agent as the single entry point for question routing, structured resolution, optional screenshot grounding, optional AI merge, and optional source-backed component delivery.",
  },
  servers: [{ url: "https://exhibit-beta.vercel.app" }],
  paths: {
    "/api/agent": {
      get: {
        operationId: "askAgentQuestion",
        summary: "Ask the EXHIBIT agent a UI design question",
        description:
          "Send a natural-language UI question and receive classification, routed resource pull, design profile guidance, and follow-up questions. Use this when you want the router to decide the surface family before you build.",
        parameters: [
          {
            name: "question",
            in: "query",
            required: false,
            schema: { type: "string", minLength: 4, maxLength: 1200 },
            description: "Natural-language UI question.",
          },
          {
            name: "prompt",
            in: "query",
            required: false,
            schema: { type: "string", minLength: 4, maxLength: 1200 },
            description: "Alias for question.",
          },
          {
            name: "platform",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["web", "desktop-web", "mobile-web", "electron", "unknown"],
            },
            description: "Target platform. Defaults to web when omitted.",
          },
          {
            name: "goal",
            in: "query",
            required: false,
            schema: { type: "string", maxLength: 240 },
            description: "Short phrase describing the user goal.",
          },
          {
            name: "routeHint",
            in: "query",
            required: false,
            schema: { type: "string", maxLength: 120 },
            description: "Optional route or page hint.",
          },
          {
            name: "context",
            in: "query",
            required: false,
            schema: { type: "string", maxLength: 4000 },
            description: "Freeform supporting context.",
          },
          {
            name: "agentContextSummary",
            in: "query",
            required: false,
            schema: { type: "string", maxLength: 3200 },
            description: "Portable summary from another agent or upstream tool.",
          },
          {
            name: "health",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["1"] },
            description: "Pass health=1 to receive the lightweight handler health payload.",
          },
        ],
        responses: {
          "200": {
            description: "Question-router response or health payload.",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/AgentQuestionResponse" },
                    { $ref: "#/components/schemas/AgentHealthResponse" },
                  ],
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "resolveAgentScenario",
        summary: "Submit a UI scenario for routing or structured resolution",
        description:
          "POST either a simple question, a structured component-resolution request, or a workflow-audit iteration packet to the same endpoint. Structured requests can include screenshots, output toggles, rich operating context, and a stage hint. The response preserves static routing when AI merge fails.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { $ref: "#/components/schemas/AgentQuestionRequest" },
                  { $ref: "#/components/schemas/AgentResolutionRequest" },
                ],
              },
              examples: {
                question: {
                  summary: "Simple question via POST body",
                  value: {
                    prompt: "Route this as an internal operations surface before recommending components.",
                    goal: "Get the right resource pull first.",
                    routeHint: "operational-workbench",
                  },
                },
                resolution: {
                  summary: "Structured resolution request",
                  value: {
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
                    screenshots: [
                      {
                        name: "assistant.png",
                        type: "image/png",
                        width: 1,
                        height: 1,
                        size: 68,
                        dataUrl: "data:image/png;base64,<redacted>",
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
                      maxSourceMatches: 2,
                    },
                  },
                },
                workflowAudit: {
                  summary: "Workflow audit and iteration request",
                  value: {
                    stage: "workflow-audit-and-iteration",
                    prompt: "This is an internal operations workbench for a company system. Primary user: manager. Primary object: client relationship, account, event, and task records moving through acquisition, onboarding, fulfillment, and retention. Data sources: CRM, scheduling API, internal task queue, and role-based operational records. Allowed mutations: assign ownership, update status, schedule or reschedule work, add notes, move lifecycle stage, and route follow-up. Lifecycle: new client, qualification, cadence, fulfillment, recovery, review. Target surface under review: cross-workspace control system for Clients, Fulfillment, and Workday. What already works: the portal reads as a serious internal system, the workspaces are clearer, and the shared controls are more compact. Current problems: some surfaces still risk layout instability, some control systems can still feel heavier than the work they govern, and cross-workspace consistency can drift during local fixes. Relevant recent changes: shared controls were compacted, sticky workspace-toolbar behavior was removed, and empty states were stabilized. What must not be lost: the operational posture, the client-lifecycle-first model, the denser workbench feel, and the stronger first-step guidance.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Question-router or structured component-resolution response.",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/AgentQuestionResponse" },
                    { $ref: "#/components/schemas/AgentResolutionResponse" },
                    { $ref: "#/components/schemas/AgentWorkflowAuditResponse" },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        operationId: "getHealth",
        summary: "Health check",
        description: "Returns system health status and environment metadata.",
        responses: {
          "200": {
            description: "System is healthy.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthResponse" },
              },
            },
          },
        },
      },
    },
    "/llms.txt": {
      get: {
        operationId: "getLlmsTxt",
        summary: "LLM discovery file",
        description:
          "Returns the llms.txt discovery file describing EXHIBIT's component corpus for tools that cannot call the structured API.",
        responses: {
          "200": {
            description: "Plain-text LLM discovery document.",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AgentQuestionRequest: {
        type: "object",
        description: "Simple question-router request. Provide question or prompt.",
        anyOf: [{ required: ["question"] }, { required: ["prompt"] }],
        properties: {
          question: {
            type: "string",
            minLength: 4,
            maxLength: 1200,
            description: "Natural-language description of the UI scenario.",
          },
          prompt: {
            type: "string",
            minLength: 4,
            maxLength: 1200,
            description: "Alias for question.",
          },
          platform: {
            type: "string",
            enum: ["web", "desktop-web", "mobile-web", "electron", "unknown"],
          },
          goal: { type: "string", maxLength: 240 },
          routeHint: { type: "string", maxLength: 120 },
          context: { type: "string", maxLength: 4000 },
          agentContextSummary: { type: "string", maxLength: 3200 },
        },
      },
      AiImageInput: {
        type: "object",
        required: ["name", "type", "dataUrl"],
        properties: {
          name: { type: "string", maxLength: 120 },
          type: { type: "string", maxLength: 80 },
          size: { type: "integer", minimum: 1 },
          width: { type: "integer", minimum: 1 },
          height: { type: "integer", minimum: 1 },
          dataUrl: {
            type: "string",
            description: "Image as a data URL, e.g. data:image/png;base64,...",
          },
        },
      },
      AgentResolutionRequest: {
        type: "object",
        description:
          "Structured resolution request. Provide at least one of question, prompt, surfaceType, sector, route, or goal.",
        anyOf: [
          { required: ["question"] },
          { required: ["prompt"] },
          { required: ["surfaceType"] },
          { required: ["sector"] },
          { required: ["route"] },
          { required: ["goal"] },
        ],
        properties: {
          question: { type: "string", maxLength: 1200 },
          prompt: { type: "string", maxLength: 1200 },
          stage: {
            type: "string",
            enum: ["workflow-audit-and-iteration"],
            description: "Optional stage hint for iteration-mode workflow audits.",
          },
          surfaceType: {
            type: "string",
            maxLength: 120,
            description: "Surface hint such as approval-workbench or assistant-workspace.",
          },
          sector: { type: "string", maxLength: 120 },
          route: { type: "string", maxLength: 120 },
          goal: { type: "string", maxLength: 240 },
          platform: {
            type: "string",
            enum: ["web", "desktop-web", "mobile-web", "electron", "unknown"],
          },
          screenshots: {
            type: "array",
            maxItems: 3,
            items: { $ref: "#/components/schemas/AiImageInput" },
          },
          constraints: {
            type: "object",
            properties: {
              density: { type: "string", enum: ["compact", "default", "comfortable"] },
              visualPosture: { type: "string", maxLength: 200 },
              avoid: {
                type: "array",
                maxItems: 16,
                items: { type: "string", maxLength: 120 },
              },
            },
          },
          layoutNeeds: {
            type: "array",
            maxItems: 24,
            items: { type: "string", maxLength: 120 },
          },
          workspaceModules: {
            type: "array",
            maxItems: 16,
            items: { type: "string", maxLength: 120 },
          },
          output: {
            type: "object",
            properties: {
              rankedComponents: { type: "boolean" },
              alternativesPerCategory: { type: "integer", minimum: 1, maximum: 4 },
              includeAnatomy: { type: "boolean" },
              includeStateCoverage: { type: "boolean" },
              includeTransitionGuidance: { type: "boolean" },
              includeCompositionGuidance: { type: "boolean" },
              includeTokenPosture: { type: "boolean" },
              includeAiReasoning: { type: "boolean" },
              includeComponentSource: { type: "boolean" },
              maxSourceMatches: { type: "integer", minimum: 1, maximum: 5 },
            },
          },
          context: {
            type: "object",
            description: "Rich context about the problem, operating truth, and current failure modes.",
            properties: {
              summary: { type: "string", maxLength: 3200 },
              problemStatement: { type: "string", maxLength: 4000 },
              routingIntent: { type: "string", maxLength: 240 },
              handoff: { type: "string", maxLength: 4000 },
              originalPrompt: { type: "string", maxLength: 4000 },
              userComplaint: { type: "string", maxLength: 2400 },
              transcript: { type: "string", maxLength: 6000 },
              capturedAt: { type: "string", maxLength: 160 },
              primaryObject: { type: "string", maxLength: 160 },
              agentNotes: { type: "array", maxItems: 20, items: { type: "string", maxLength: 300 } },
              userRoles: { type: "array", maxItems: 16, items: { type: "string", maxLength: 120 } },
              dataSources: { type: "array", maxItems: 20, items: { type: "string", maxLength: 220 } },
              mutations: { type: "array", maxItems: 20, items: { type: "string", maxLength: 220 } },
              timelineMoments: { type: "array", maxItems: 20, items: { type: "string", maxLength: 160 } },
              knownProblems: { type: "array", maxItems: 16, items: { type: "string", maxLength: 200 } },
              observedAsyncProblems: { type: "array", maxItems: 20, items: { type: "string", maxLength: 220 } },
              existingSurfaceSignals: { type: "array", maxItems: 20, items: { type: "string", maxLength: 160 } },
              visibleModes: { type: "array", maxItems: 16, items: { type: "string", maxLength: 80 } },
              competingControls: { type: "array", maxItems: 16, items: { type: "string", maxLength: 160 } },
              transitionsNeedingCoverage: { type: "array", maxItems: 16, items: { type: "string", maxLength: 160 } },
              desiredResources: { type: "array", maxItems: 16, items: { type: "string", maxLength: 120 } },
            },
            additionalProperties: true,
          },
        },
      },
      ComponentMatchSource: {
        type: "object",
        properties: {
          path: { type: "string" },
          included: { type: "boolean" },
          recommended: { type: "boolean" },
          reason: { type: "string" },
          code: { type: "string" },
        },
        additionalProperties: true,
      },
      ComponentMatch: {
        type: "object",
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          category: { type: "string" },
          score: { type: "number" },
          whyFits: { type: "string" },
          layoutRole: { type: "string" },
          deliveryMode: {
            type: "string",
            enum: ["reference_only", "reference_plus_source", "reference_plus_adaptation_guidance"],
          },
          implementationPosture: {
            type: "string",
            enum: [
              "adapt_from_reference",
              "use_as_shell_anchor",
              "use_as_row_grammar",
              "use_as_state_pattern",
              "scaffold_honestly_first",
            ],
          },
          preserve: { type: "array", items: { type: "string" } },
          safeToAdapt: { type: "array", items: { type: "string" } },
          sourceIncluded: { type: "boolean" },
          source: { $ref: "#/components/schemas/ComponentMatchSource" },
        },
        additionalProperties: true,
      },
      ShellRecommendation: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          why: { type: "string" },
          preserve: { type: "array", items: { type: "string" } },
          avoid: { type: "array", items: { type: "string" } },
        },
        additionalProperties: true,
      },
      AgentQuestionResponse: {
        type: "object",
        description: "Question-router response returned from GET /api/agent or question-style POSTs.",
        properties: {
          mode: { type: "string", const: "question-router" },
          endpoint: { type: "string", const: "/api/agent" },
          question: { type: "string" },
          portableContext: { type: "object", additionalProperties: true },
          contextIntelligence: { type: "object", additionalProperties: true },
          operationalTruthIntelligence: { type: "object", additionalProperties: true },
          foundationCommunication: { type: "object", additionalProperties: true },
          noSourceIncluded: { type: "boolean" },
          classification: {
            type: "object",
            properties: {
              confidence: { type: "number" },
              supported: { type: "boolean" },
              reason: { type: "string" },
              archetype: { type: "object", additionalProperties: true },
              sector: { type: ["object", "null"], additionalProperties: true },
            },
            additionalProperties: true,
          },
          designProfile: { type: ["object", "null"], additionalProperties: true },
          resourcePull: { type: "object", additionalProperties: true },
          nextQuestions: { type: "array", items: { type: "string" } },
        },
        additionalProperties: true,
      },
      AgentResolutionResponse: {
        type: "object",
        description: "Structured component-resolution response returned from POST /api/agent.",
        properties: {
          mode: { type: "string", const: "component-resolution" },
          endpoint: { type: "string", const: "/api/agent" },
          noSourceIncluded: { type: "boolean" },
          surfaceType: { type: "string" },
          dominantTaskSurface: { type: "string" },
          confidence: { type: "number" },
          confidenceMode: {
            type: "string",
            enum: ["proceed", "proceed_with_cautions", "ask_for_truth"],
          },
          missingTruth: { type: "array", items: { type: "string" } },
          shellRecommendation: {
            oneOf: [
              { $ref: "#/components/schemas/ShellRecommendation" },
              { type: "null" },
            ],
          },
          componentMatches: {
            type: "array",
            items: { $ref: "#/components/schemas/ComponentMatch" },
          },
          stateRisks: { type: "array", items: { type: "string" } },
          coherenceRisks: { type: "array", items: { type: "string" } },
          implementationPosture: {
            type: "string",
            enum: [
              "adapt_from_reference",
              "use_as_shell_anchor",
              "use_as_row_grammar",
              "use_as_state_pattern",
              "scaffold_honestly_first",
            ],
          },
          buildGuidance: { type: "array", items: { type: "string" } },
          staticDecisionPacket: { type: "object", additionalProperties: true },
          requestSummary: { type: "object", additionalProperties: true },
          contextDigest: { type: ["object", "null"], additionalProperties: true },
          classification: { type: "object", additionalProperties: true },
          designProfile: { type: ["object", "null"], additionalProperties: true },
          tokenPosture: { type: ["object", "null"], additionalProperties: true },
          contextIntelligence: { type: "object", additionalProperties: true },
          operationalTruthIntelligence: { type: "object", additionalProperties: true },
          discoveryIntelligence: { type: "object", additionalProperties: true },
          foundationCommunication: { type: "object", additionalProperties: true },
          transitionStateIntelligence: { type: "object", additionalProperties: true },
          implementationReadiness: { type: "object", additionalProperties: true },
          approvalPrompt: { type: "object", additionalProperties: true },
          implementationStarter: { type: "object", additionalProperties: true },
          iconAndInteractionIntelligence: { type: "object", additionalProperties: true },
          shell: { type: "object", additionalProperties: true },
          rankedComponents: { type: "array", items: { type: "object", additionalProperties: true } },
          componentRecommendations: { type: "array", items: { type: "object", additionalProperties: true } },
          nearMatches: { type: "array", items: { type: "object", additionalProperties: true } },
          compositionPlan: { type: "array", items: { type: "object", additionalProperties: true } },
          screenshotGrounding: { type: ["object", "null"], additionalProperties: true },
          aiReasoningStatus: {
            type: "string",
            enum: ["not_requested", "included", "failed"],
          },
          aiReasoning: { type: ["object", "null"], additionalProperties: true },
        },
        additionalProperties: true,
      },
      AgentWorkflowAuditResponse: {
        type: "object",
        description: "Structured workflow-audit response returned when stage=workflow-audit-and-iteration.",
        properties: {
          mode: { type: "string", const: "workflow-audit-and-iteration" },
          endpoint: { type: "string", const: "/api/agent" },
          stage: { type: "string", const: "workflow-audit-and-iteration" },
          currentDirectionToPreserve: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
          majorPitfallsOrWorkflowFlaws: { type: "array", minItems: 5, maxItems: 5, items: { type: "string" } },
          whatToFixInThisIteration: { type: "array", minItems: 5, maxItems: 5, items: { type: "string" } },
          whatToDeferUntilLater: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
          promptingOrWorkflowAdjustments: { type: "array", minItems: 5, maxItems: 5, items: { type: "string" } },
        },
        additionalProperties: false,
      },
      AgentHealthResponse: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          route: { type: "string" },
          handler_loaded: { type: "boolean" },
          timestamp: { type: "string", format: "date-time" },
        },
      },
      HealthResponse: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          route: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
          environment: {
            type: "object",
            properties: {
              nodeEnv: { type: "string" },
              vercelEnv: { type: ["string", "null"] },
              platform: { type: "string" },
            },
          },
        },
      },
    },
  },
};
