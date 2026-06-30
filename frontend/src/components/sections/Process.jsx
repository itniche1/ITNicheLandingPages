import React from "react";
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Discover",
    desc: "We listen first. Your goals, wishlist and audience drive the brief.",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design",
    desc: "Wireframes and visual systems tuned to your brand and customers.",
  },
  {
    n: "03",
    icon: Code,
    title: "Build",
    desc: "Clean code, fast pages, scalable CMS — fully owned by you.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch & Grow",
    desc: "Ship live, then optimize with SEO, campaigns and analytics.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="py-24 md:py-32 bg-brand-alt"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
              · 03 / How we work
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
              A simple, transparent
              <br />
              <span className="text-brand-orange">four-step</span> process.
            </h2>
          </div>
          <p className="md:col-span-5 text-base text-brand-muted leading-relaxed">
            No black boxes. From the first call to launch and beyond, you&apos;ll
            always know exactly what&apos;s being built — and why.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector */}
          <div className="hidden md:block absolute left-8 right-8 top-[44px] h-px bg-brand-line" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  data-testid={`process-step-${s.n}`}
                  className="relative"
                >
                  <div className="relative z-10 w-[88px] h-[88px] bg-white border border-brand-line grid place-items-center mx-auto md:mx-0">
                    <Icon className="w-8 h-8 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div className="mt-6 md:mt-7">
                    <div className="font-display font-black text-brand-orange text-sm tracking-widest">
                      STEP {s.n}
                    </div>
                    <h3 className="mt-2 font-display font-bold text-2xl tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
