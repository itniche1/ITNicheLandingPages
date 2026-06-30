import React from "react";
import {
  Check,
  Shield,
  Layers,
  Zap,
  HeartHandshake,
  Headphones,
  Wallet,
} from "lucide-react";

const PILLARS = [
  {
    icon: Wallet,
    title: "Zero upfront cost",
    desc: "Flexible engagement — launch your site without a heavy down payment.",
  },
  {
    icon: Shield,
    title: "Secure & robust",
    desc: "Hardened code, secure logins and member-only sections by default.",
  },
  {
    icon: Layers,
    title: "Built-in CMS",
    desc: "Change content instantly — no developer needed after handover.",
  },
  {
    icon: Zap,
    title: "Fast & responsive",
    desc: "Mobile-first builds optimized for Core Web Vitals and SEO.",
  },
  {
    icon: HeartHandshake,
    title: "One-stop partner",
    desc: "Design, marketing, hosting and support — managed by a single team.",
  },
  {
    icon: Headphones,
    title: "Ongoing support",
    desc: "US + India support hours so help is always within reach.",
  },
];

export default function Capabilities() {
  return (
    <section
      data-testid="capabilities-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        {/* Left infographic panel */}
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
            · 04 / Why IT Niche
          </div>
          <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Built for small business.{" "}
            <span className="text-brand-orange">
              Engineered to outperform.
            </span>
          </h2>
          <p className="mt-6 text-base text-brand-muted leading-relaxed max-w-md">
            Six guarantees that ship with every engagement — backed by 20+
            years of building digital presence for businesses of every size.
          </p>

          {/* Big infographic stat */}
          <div className="mt-10 border border-brand-line p-6 md:p-8 bg-brand-alt">
            <div className="text-xs uppercase tracking-widest text-brand-muted">
              Engagement Score
            </div>
            <div className="mt-2 flex items-end gap-3">
              <div className="font-display font-black tracking-tighter text-6xl text-brand-orange">
                4.9
              </div>
              <div className="pb-2 text-sm text-brand-muted">/ 5.0</div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {[100, 100, 100, 100, 96].map((p, i) => (
                <div key={i} className="h-2 bg-brand-line overflow-hidden">
                  <div
                    className="h-full bg-brand-orange"
                    style={{ width: `${p}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-brand-muted">
              Based on 500+ delivered projects.
            </div>
          </div>
        </div>

        {/* Right pillars grid */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-testid={`pillar-${i}`}
                className="group border border-brand-line p-6 hover:border-brand-orange hover:bg-brand-alt transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 grid place-items-center bg-brand-black text-white group-hover:bg-brand-orange transition-colors shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                  <Check className="w-3.5 h-3.5" /> Included
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
