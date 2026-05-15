import React from "react";
import { motion } from "framer-motion";
import { PrimaryCTA, SectionLabel, fadeUp } from "./Shared";
import { CheckCircle } from "@phosphor-icons/react";

const WORKSPACE_IMG =
  "https://static.prod-images.emergentagent.com/jobs/239039ec-0a02-4e58-850c-c28fee591dc0/images/af639724c23b81e972d0edf6c7ef31df0f12168185da9384a1760eb97d7a56bc.png";

const POINTS = [
  "We build with your business goals in mind, not just aesthetics",
  "Every site is SEO-ready from the ground up",
  "Clean, fast code that performs on every device",
  "Transparent pricing — no surprises, no hidden fees",
  "A team you can actually talk to, before and after launch",
];

export const Pitch = () => {
  return (
    <section
      data-testid="pitch-section"
      className="relative bg-[#0A0A0A] text-white py-28 md:py-40 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/40" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E57119]">
            The Pitch
          </span>
          <span className="h-px w-8 bg-white/40" />
        </div>

        <motion.h2
          {...fadeUp}
          className="font-display font-black tracking-[-0.03em] leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-[96px]"
        >
          Why pay
          <br />
          <span className="text-[#E57119]">$5,000</span> upfront
          <br />
          when you can pay <span className="text-[#E57119]">$0</span>?
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-10 max-w-xl mx-auto text-base md:text-lg text-white/70"
        >
          Same custom design. Same engineering. Same SEO foundations.
          Just a smarter way to pay for it.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <PrimaryCTA testId="pitch-cta">Start with a free consultation</PrimaryCTA>
          <a
            href="#why-us"
            data-testid="pitch-secondary"
            className="text-sm text-white/80 underline underline-offset-4 hover:text-white"
          >
            See why teams choose us
          </a>
        </motion.div>

        <div className="mt-20 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="border border-white/15 p-6">
            <div className="font-display font-black text-3xl">$0</div>
            <div className="text-[11px] font-mono tracking-[0.22em] text-white/60 mt-1">
              UPFRONT TO LAUNCH
            </div>
          </div>
          <div className="border border-white/15 p-6">
            <div className="font-display font-black text-3xl">$99/mo</div>
            <div className="text-[11px] font-mono tracking-[0.22em] text-white/60 mt-1">
              FLAT, ALL-INCLUSIVE
            </div>
          </div>
          <div className="border border-white/15 p-6">
            <div className="font-display font-black text-3xl">24/7</div>
            <div className="text-[11px] font-mono tracking-[0.22em] text-white/60 mt-1">
              MONITORED UPTIME
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyUs = () => {
  return (
    <section
      id="why-us"
      data-testid="whyus-section"
      className="relative py-24 md:py-32 border-t border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative aspect-[4/5] bg-[#FFF1E8] border border-[#0A0A0A] overflow-hidden"
          >
            <img
              src={WORKSPACE_IMG}
              alt="A modern, high-contrast agency workspace"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              data-testid="workspace-image"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white border border-[#0A0A0A] p-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-[#52525A]">
                  STUDIO
                </div>
                <div className="font-display font-bold text-base mt-0.5">
                  IT Niche — Web Studio
                </div>
              </div>
              <div className="font-display font-black text-2xl text-[#E57119]">
                EST.
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <SectionLabel index="04 — Why us">Built for businesses</SectionLabel>
          <motion.h2
            {...fadeUp}
            className="font-display font-black tracking-[-0.025em] text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
          >
            A team you can talk to.
            <br />
            <span className="text-[#E57119]">Sites</span> that earn their keep.
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 text-base md:text-lg text-[#52525A] leading-relaxed max-w-xl"
          >
            We've helped businesses across industries get websites that
            actually work — not just look good. No one-size-fits-all.
          </motion.p>

          <ul className="mt-10 space-y-4">
            {POINTS.map((p, i) => (
              <motion.li
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 * i }}
                data-testid={`whyus-point-${i}`}
                className="flex items-start gap-3"
              >
                <CheckCircle size={22} weight="fill" color="#E57119" className="mt-0.5 shrink-0" />
                <span className="text-[15px] text-[#0A0A0A]">{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
