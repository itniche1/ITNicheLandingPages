import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  Code2,
  Search,
  Sparkles,
  CircleDot,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* LEFT — Text */}
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 border border-brand-line bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <CircleDot className="w-3.5 h-3.5 text-brand-orange" />
            Memphis, TN · Hyderabad, IN
          </div>

          <h1
            data-testid="hero-headline"
            className="mt-6 font-display font-black tracking-tighter text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[0.95]"
          >
            Websites, marketing &amp;{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-orange">
                custom builds
              </span>
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-brand-orange/15 -z-0" />
            </span>{" "}
            for small business.
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-7 text-lg lg:text-xl text-brand-muted max-w-xl leading-relaxed"
          >
            One-stop digital partner for web design, SEO and custom software —
            built lean, shipped fast, and engineered to convert.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-primary-cta"
              className="group inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-4 text-base font-bold hover:bg-brand-orange-dark transition-colors"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#services"
              data-testid="hero-secondary-cta"
              className="group inline-flex items-center gap-2 border border-brand-black text-brand-black px-7 py-4 text-base font-bold hover:bg-brand-black hover:text-white transition-colors"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mini stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-brand-line pt-8">
            {[
              { v: "20+", l: "Years in business" },
              { v: "500+", l: "Projects shipped" },
              { v: "2", l: "Global offices" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-black text-3xl lg:text-4xl tracking-tighter">
                  {s.v}
                </div>
                <div className="text-xs uppercase tracking-widest text-brand-muted mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Infographic */}
        <div
          data-testid="hero-infographic"
          className="lg:col-span-5 relative reveal"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative aspect-square max-w-[520px] mx-auto">
            {/* Concentric rings */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="14"
                  height="14"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#0a0a0a" opacity="0.15" />
                </pattern>
              </defs>
              <circle cx="200" cy="200" r="190" fill="url(#dots)" />
              <circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="#0a0a0a"
                strokeWidth="1"
                opacity="0.2"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                fill="none"
                stroke="#e57119"
                strokeWidth="1.5"
                strokeDasharray="3 6"
              />
              <circle
                cx="200"
                cy="200"
                r="90"
                fill="#000000"
              />
              <circle
                cx="200"
                cy="200"
                r="60"
                fill="none"
                stroke="#e57119"
                strokeWidth="2"
              />
              {/* Crosshair */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.2" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.2" />
            </svg>

            {/* Floating metric card top-right */}
            <div className="absolute -top-2 right-0 bg-white border border-brand-line p-4 w-44 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-muted">
                <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
                Conversion
              </div>
              <div className="mt-1 font-display font-black text-3xl tracking-tighter">
                +218%
              </div>
              <div className="mt-3 flex items-end gap-1 h-8">
                {[3, 5, 4, 7, 6, 9, 8, 12].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-brand-orange"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Floating service tag bottom-left */}
            <div className="absolute bottom-4 -left-2 bg-brand-orange text-white p-4 w-48">
              <div className="text-[11px] uppercase tracking-widest opacity-80">
                What we do
              </div>
              <div className="mt-1 font-display font-bold text-base leading-snug">
                Web · SEO · Custom Apps · Marketing
              </div>
            </div>

            {/* Center icon */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid place-items-center w-[120px] h-[120px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-12 h-12 bg-white grid place-items-center border border-brand-line">
                    <Code2 className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div className="w-12 h-12 bg-white grid place-items-center border border-brand-line">
                    <Search className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div className="w-12 h-12 bg-white grid place-items-center border border-brand-line">
                    <TrendingUp className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div className="w-12 h-12 bg-white grid place-items-center border border-brand-line">
                    <Sparkles className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
