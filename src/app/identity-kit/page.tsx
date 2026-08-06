import { Wallet, Palette, Type, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Identity Kit | Pabitra Sahoo',
  description: 'Design System & Identity Kit for Vitta Financial Hub Workspace',
};

export default function IdentityKitPage() {
  const colors = [
    { name: 'Near-White BG (Light)', hex: '#ECFDF5', border: 'border-emerald-300', bgClass: 'bg-[#ECFDF5]', textClass: 'text-[#064E3B]' },
    { name: 'Near-Black BG (Dark)', hex: '#022C22', border: 'border-emerald-900', bgClass: 'bg-[#022C22]', textClass: 'text-[#ECFDF5]' },
    { name: 'Primary Text', hex: '#064E3B', border: 'border-emerald-700', bgClass: 'bg-[#064E3B]', textClass: 'text-white' },
    { name: 'Vibrant Accent', hex: '#10B981', border: 'border-emerald-400', bgClass: 'bg-[#10B981]', textClass: 'text-white' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      <div className="text-center space-y-2 border-b border-[var(--border-app)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-xs font-extrabold text-[#10b981]">
          <Sparkles className="w-3.5 h-3.5" /> GENERAL AI FLUENCY — WEEK 3 ASSIGNMENT
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-main)]">
          Decide Once: Personal Identity Kit
        </h1>
        <p className="text-sm font-semibold text-[var(--text-muted)]">
          Curated Design System &amp; Brand Tokens for Pabitra Sahoo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="vitta-card space-y-4">
          <div className="flex items-center gap-2 text-lg font-extrabold text-[var(--text-main)]">
            <Type className="w-5 h-5 text-[#10b981]" /> Typography Choice
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] space-y-2">
            <div className="text-xs text-[var(--text-dim)] font-bold uppercase tracking-wider">Free Font Choice</div>
            <div className="text-2xl font-extrabold text-[var(--text-main)]">Plus Jakarta Sans</div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Selected for both Headings (700/800 ExtraBold) and Body text (400/500 Medium). High-contrast geometric sans-serif ensuring crisp numerical readability across financial dashboards.
            </p>
          </div>
        </div>

        <div className="vitta-card space-y-4">
          <div className="flex items-center gap-2 text-lg font-extrabold text-[var(--text-main)]">
            <Wallet className="w-5 h-5 text-[#10b981]" /> Logo &amp; Monogram (Favicon)
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center text-white shadow-lg">
              <Wallet className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-extrabold bg-gradient-to-r from-[#a7f3d0] via-[#10b981] to-[#047857] bg-clip-text text-transparent">
                Vitta 💚
              </div>
              <p className="text-xs text-[var(--text-muted)] font-semibold">
                Financial Wallet Monogram Favicon
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="vitta-card space-y-4">
        <div className="flex items-center gap-2 text-lg font-extrabold text-[var(--text-main)]">
          <Palette className="w-5 h-5 text-[#10b981]" /> Tight 4-Color Palette
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colors.map((c) => (
            <div key={c.hex} className={`p-4 rounded-xl border ${c.border} ${c.bgClass} ${c.textClass} flex flex-col justify-between h-32 shadow-sm`}>
              <span className="text-xs font-extrabold uppercase opacity-90">{c.name}</span>
              <span className="text-lg font-mono font-extrabold tracking-wider">{c.hex}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="vitta-card space-y-3 bg-[var(--badge-bg)] border-[var(--border-card)]">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#10b981]">
          <CheckCircle2 className="w-4 h-4" /> Two-Line Style Note (Claude Project / System Prompt)
        </div>
        <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] text-xs md:text-sm font-mono text-[var(--text-main)] leading-relaxed space-y-2">
          <p>
            <strong>Specs:</strong> Fonts: Plus Jakarta Sans (Headings &amp; Body) | Palette: #022C22 (Dark BG), #ECFDF5 (Light BG), #10B981 (Mint Accent), #064E3B (Primary Text).
          </p>
          <p>
            <strong>Mood:</strong> A high-precision, executive financial workspace engineered with high-contrast glassmorphic minimalism to evoke confidence, clarity, and quantitative control.
          </p>
        </div>
      </div>
    </div>
  );
}
