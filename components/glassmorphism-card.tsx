/**
 * Glassmorphism Credit Card
 * Category: Cards
 * Tags: glass, blur, card, modern, gradient
 * Description: Frosted glass effect with backdrop-blur and semi-transparent borders. Adds depth on gradient backgrounds.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/glassmorphism-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function GlassCard() {
  return (
    <div className="p-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center min-h-[300px]">
      <div className="relative w-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden p-6 text-white flex flex-col gap-6">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style={{ fontSize: "0.65rem", fontFamily: "monospace", opacity: 0.6, letterSpacing: "0.1em" }}>MEMBER</div>
        </div>
        <div>
          <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>Total Balance</div>
          <div style={{ fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.025em" }}>$12,450.00</div>
        </div>
        <div style={{ fontSize: "0.65rem", opacity: 0.5, fontFamily: "monospace" }}>**** **** **** 4291</div>
      </div>
    </div>
  );
}