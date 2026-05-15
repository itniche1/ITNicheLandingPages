import React from "react";
import { motion } from "framer-motion";
import { SectionLabel, fadeUp } from "./Shared";

const STEPS = [
  {
    n: "01",
    title: "Discovery call",
    blurb: "30-minute scoping conversation. We learn your goals, audience and must-haves.",
    eta: "Day 1",
  },
  {
    n: "02",
    title: "Design & approval",
    blurb: "Custom design concept tailored to your brand — refined until it's right.",
    eta: "Week 1–2",
  },
  {
    n: "03",
    title: "Build & launch",
    blurb: "We develop, test and deploy a fast, SEO-ready site. Zero invoice on launch day.",
    eta: "Week 3–5",
  },
  {
    n: "04",
    title: "Grow on $99/mo",
    blurb: "Hosting, security, updates and ongoing support — all included, forever.",
    eta: "Ongoing",
  },
];

export const Process = () => {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative py-24 md:py-32 border-t border-[#E5E5E5] bg-[#FDFDFD]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-6">
            <SectionLabel index="03 — Process">From idea to live</SectionLabel>
            <motion.h2
              {...fadeUp}
              className="font-display font-black tracking-[-0.025em] text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
            >
              A four-step
              <br />
              path to a site
              <br />
              that <span className="text-[#E57119]">works.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p {...fadeUp} className="text-base md:text-lg text-[#52525A] leading-relaxed">
              Simple, predictable, and built around your business — not a
              sales funnel. Most clients launch in 3 to 5 weeks.
            </motion.p>
          </div>
        </div>

        <div className="relative">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-[58px] hidden md:block">
            <div className="h-px bg-[#E5E5E5]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                data-testid={`process-step-${i}`}
                className="relative md:pr-6 md:pl-0"
              >
                <div className="relative z-10 w-14 h-14 bg-[#0A0A0A] text-white flex items-center justify-center font-display font-black text-base">
                  {s.n}
                </div>
                <div className="mt-6 font-mono text-[11px] tracking-[0.22em] text-[#E57119]">
                  {s.eta}
                </div>
                <h3 className="mt-2 font-display font-bold text-2xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-[#52525A] leading-relaxed max-w-[260px]">
                  {s.blurb}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
