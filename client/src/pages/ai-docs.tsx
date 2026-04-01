import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { Bot, Copy, Check, Terminal, Code2, Layers, Search, ExternalLink, ChevronDown, ChevronRight, Zap } from "lucide-react";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      data-testid="button-copy-snippet"
      onClick={copy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : (label || "Copy")}
    </button>
  );
}

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  return (
    <div className="relative rounded-xl border border-border bg-[#0d0d0d] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm font-mono text-green-400 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointCard({
  method,
  path,
  description,
  example,
}: {
  method: string;
  path: string;
  description: string;
  example?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const methodColors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        data-testid={`button-endpoint-${path.replace(/\//g, "-")}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${methodColors[method] || "bg-muted text-muted-foreground"}`}>
            {method}
          </span>
          <code className="text-sm font-mono text-foreground truncate">{path}</code>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">{description}</span>
          {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>
      {expanded && example && (
        <div className="border-t border-border px-5 py-4 space-y-2 bg-secondary/10">
          <p className="text-sm text-muted-foreground">{description}</p>
          <CodeBlock code={example} language="json response" />
        </div>
      )}
    </div>
  );
}

export default function AiDocsPage() {
  const { data: categoriesData } = useQuery<{
    total: number;
    componentTotal: number;
    categories: { name: string; count: number; apiUrl: string }[];
  }>({
    queryKey: ["/api/llm/categories"],
    queryFn: async () => {
      const res = await fetch("/api/llm/categories");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const baseUrl = window.location.origin;

  const llmsTxtUrl = `${baseUrl}/llms.txt`;

  const endpoints = [
    {
      method: "GET",
      path: "/api/llm/components",
      description: "All components with full source code",
      example: `{
  "total": 69,
  "filter": { "category": null, "q": null },
  "components": [
    {
      "slug": "primary-button-variants",
      "title": "Primary Button Variants",
      "description": "Five button states including default, hover, loading, disabled, and icon.",
      "category": "Buttons",
      "tags": ["button", "interactive", "states"],
      "code": "export function PrimaryButton() { ... }",
      "techStack": ["react", "tailwind"],
      "licenseType": "free"
    }
  ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components?category=Loading",
      description: "Filter by category name",
      example: `{
  "total": 3,
  "filter": { "category": "Loading", "q": null },
  "components": [ ... ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components?q=button",
      description: "Search components by keyword",
      example: `{
  "total": 5,
  "filter": { "category": null, "q": "button" },
  "components": [ ... ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components/:slug",
      description: "Single component — full code, metadata, preview",
      example: `{
  "slug": "stat-cards-with-trends",
  "title": "Stat Cards with Trends",
  "description": "Dashboard KPI cards with trend indicators.",
  "category": "Dashboard",
  "code": "export function StatCard({ ... }) { ... }",
  "techStack": ["react", "tailwind", "recharts"],
  "verified": true,
  "productionReady": true
}`,
    },
    {
      method: "GET",
      path: "/api/llm/categories",
      description: "All categories with component counts and direct API URLs",
      example: `{
  "total": 24,
  "componentTotal": 69,
  "categories": [
    {
      "name": "Buttons",
      "slug": "buttons",
      "count": 4,
      "apiUrl": "/api/llm/components?category=Buttons",
      "components": [
        { "slug": "primary-button-variants", "title": "Primary Button Variants", "tags": [...] }
      ]
    }
  ]
}`,
    },
  ];

  const cursorInstructions = `Add this URL to your Cursor AI context:
${llmsTxtUrl}

Then ask:
"Fetch /api/llm/components?category=Loading and give me a skeleton loader"
"Get /api/llm/components/stats-overview-card and adapt it for my dashboard"`;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight" data-testid="text-page-title">
            For AI Assistants
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Drop a single URL into Cursor, VS Code, or any AI assistant to get instant access to all{" "}
            {categoriesData?.componentTotal || 69} components with full source code.
          </p>
        </div>
      </div>

      {/* Quick Start — the one URL to rule them all */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Quick Start</h2>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Share this discovery URL with your AI assistant — it describes the entire library and how to fetch components:
            </p>
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border font-mono text-sm break-all">
              <span className="text-primary flex-1" data-testid="text-llms-url">{llmsTxtUrl}</span>
              <CopyButton text={llmsTxtUrl} label="Copy URL" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              data-testid="link-view-llms-txt"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View llms.txt
            </a>
            <span>·</span>
            <span>Updated dynamically · Always current</span>
          </div>
        </div>
      </section>

      {/* How to use in AI tools */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Using with AI Coding Assistants</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500/10 rounded-md flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span className="font-medium text-sm">Cursor</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open Cursor Settings → Docs</li>
              <li>Add <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{llmsTxtUrl}</code></li>
              <li>Reference @EXHIBIT in any prompt</li>
            </ol>
            <CopyButton text={cursorInstructions} label="Copy instructions" />
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500/10 rounded-md flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="font-medium text-sm">VS Code + GitHub Copilot</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open Chat and paste the llms.txt URL</li>
              <li>Ask it to fetch and summarize available components</li>
              <li>Reference specific slugs in follow-up prompts</li>
            </ol>
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500/10 rounded-md flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="font-medium text-sm">ChatGPT / Claude</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Paste the API URL directly in chat</li>
              <li>Ask it to fetch the JSON and extract component code</li>
              <li>Paste the code into your project</li>
            </ol>
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500/10 rounded-md flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-green-400" />
              </div>
              <span className="font-medium text-sm">Direct fetch in scripts</span>
            </div>
            <CodeBlock code={`curl "${baseUrl}/api/llm/components?category=Loading" \\
  | jq '.components[0].code'`} language="bash" />
          </div>
        </div>
      </section>

      {/* Example prompts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Example Prompts</h2>
        </div>
        <div className="grid gap-3">
          {[
            {
              prompt: "Fetch /api/llm/components?category=Loading and give me a skeleton loader for a card grid",
              url: `${baseUrl}/api/llm/components?category=Loading`,
            },
            {
              prompt: "Get /api/llm/components/stat-cards-with-trends and adapt it for my analytics dashboard",
              url: `${baseUrl}/api/llm/components/stat-cards-with-trends`,
            },
            {
              prompt: "Search /api/llm/components?q=empty+state and use the first result in my data table",
              url: `${baseUrl}/api/llm/components?q=empty+state`,
            },
            {
              prompt: "List /api/llm/categories and tell me what authentication components are available",
              url: `${baseUrl}/api/llm/categories`,
            },
          ].map(({ prompt, url }) => (
            <div key={url} className="border border-border rounded-lg p-4 space-y-2.5 hover:bg-secondary/20 transition-colors">
              <p className="text-sm italic text-muted-foreground">"{prompt}"</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-primary/80 flex-1 truncate">{url}</code>
                <CopyButton text={url} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">API Reference</h2>
        </div>
        <p className="text-sm text-muted-foreground">Click any endpoint to see the response format.</p>
        <div className="space-y-2">
          {endpoints.map((ep) => (
            <EndpointCard key={ep.path} {...ep} />
          ))}
        </div>
      </section>

      {/* Categories quick reference */}
      {categoriesData && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-lg">
              All Categories ({categoriesData.total})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categoriesData.categories.map((cat) => {
              const url = `${baseUrl}${cat.apiUrl}`;
              return (
                <div
                  key={cat.name}
                  data-testid={`card-category-${cat.slug}`}
                  className="border border-border rounded-lg p-4 space-y-2 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{cat.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-primary/70 truncate flex-1">{cat.apiUrl}</code>
                    <CopyButton text={url} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Raw llms.txt preview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-lg">llms.txt Discovery File</h2>
          </div>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-open-llms-txt"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in browser
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          The <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/llms.txt</code> file follows the emerging{" "}
          <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">llmstxt.org</a>{" "}
          standard. Many AI assistants can parse it automatically when you add the URL to their context.
          It's regenerated on every request, so it always reflects the current library state.
        </p>
      </section>
    </Layout>
  );
}
