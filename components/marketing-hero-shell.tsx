/**
 * Marketing Hero Shell
 * Category: App Shells
 * Tags: app-shell, marketing, landing-page, hero, layout
 * Description: Full marketing site layout: sticky top nav with logo, links, and CTA; oversized centered hero with headline, subtext, and dual action buttons; three-column feature grid below.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/marketing-hero-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MarketingHeroShell() {
  return (
    <div className="min-h-[480px] bg-white font-sans overflow-hidden">
      {/* Nav */}
      <header className="border-b border-neutral-100 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-black text-xs">A</div>
            <span className="font-bold text-neutral-900 text-sm">Acme</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-500">
            {["Product", "Pricing", "Docs", "Blog", "About"].map(item => (
              <a key={item} href="#" className="hover:text-neutral-900 transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors font-medium">Sign in</button>
            <button className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors">
              Get started free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          New — Introducing AI-powered workflows
        </div>
        <h1 className="text-5xl font-black text-neutral-900 leading-tight tracking-tight mb-6">
          Build products your<br />customers will love
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Acme helps teams ship faster with better tooling, smarter automation, and a design system that scales from zero to enterprise.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-700 transition-colors">
            Start building for free
          </button>
          <button className="px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors flex items-center gap-2">
            <span className="text-neutral-400">▶</span> Watch demo
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-4">No credit card required · Free forever up to 5 users</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Lightning fast", desc: "Deploy in seconds. No infrastructure to manage. Your code ships instantly." },
            { icon: "🔒", title: "Enterprise security", desc: "SOC 2 certified, SAML SSO, audit logs, and fine-grained access controls." },
            { icon: "🧩", title: "Built to integrate", desc: "Connect to 200+ tools. GitHub, Slack, Jira, Linear — it all just works." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-5 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}