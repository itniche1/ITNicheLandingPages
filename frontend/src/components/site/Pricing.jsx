import React from "react";
import { motion } from "framer-motion";
import { SectionLabel, fadeUp } from "./Shared";
import { ArrowDown, Check, X } from "@phosphor-icons/react";

const INFO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/239039ec-0a02-4e58-850c-c28fee591dc0/images/05a40c0ca33d58776dafe6a7ac741d882a1fae18134fdff1fa6cf6d45b02133e.png";

const TIERS = [
  { label: "Brochure site (5–10 pages)", range: "$2,000 – $5,000", bar: 18 },
  { label: "Business site with custom features", range: "$5,000 – $15,000", bar: 38 },
  { label: "E-commerce with product catalog", range: "$8,000 – $25,000+", bar: 62 },
  { label: "Enterprise / custom web app", range: "$25,000+", bar: 96 },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-24 md:py-32 bg-[#FDFDFD] border-t border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="lg:col-span-5">
            <SectionLabel index="01 — Benchmark">Pricing Reality Check</SectionLabel>
            <motion.h2
              {...fadeUp}
              className="font-display font-black tracking-[-0.025em] text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
            >
              What a quality
              <br />
              website actually
              <br />
              <span className="text-[#E57119]">costs.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <motion.p {...fadeUp} className="text-base md:text-lg text-[#52525A] leading-relaxed">
              Search “website pricing” and you'll see numbers from $500 to $50,000+.
              Here's the honest range agencies quote — and how IT Niche fits in.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* Big card — pricing tiers */}
          <motion.div
            {...fadeUp}
            data-testid="pricing-tiers-card"
            className="md:col-span-4 md:row-span-2 bg-white border border-[#0A0A0A] p-8 md:p-12"
          >
            <div className="font-mono text-[11px] tracking-[0.22em] text-[#52525A] mb-2">
              TYPICAL AGENCY QUOTE
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-10">
              Build cost by site type
            </h3>

            <ul className="space-y-7">
              {TIERS.map((t, i) => (
                <li key={i} className="group" data-testid={`tier-row-${i}`}>
                  <div className="flex items-baseline justify-between gap-6 mb-2">
                    <div className="text-sm md:text-base font-medium text-[#0A0A0A]">
                      {t.label}
                    </div>
                    <div className="font-display font-bold text-base md:text-lg whitespace-nowrap">
                      {t.range}
                    </div>
                  </div>
                  <div className="relative h-1.5 bg-[#F1F1F1]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                      className="absolute inset-y-0 left-0 bg-[#E57119]"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-[#E5E5E5] flex items-center gap-3 text-sm text-[#52525A]">
              <ArrowDown size={16} weight="bold" color="#E57119" />
              Real numbers from real agencies. Most businesses can't pay this upfront.
            </div>
          </motion.div>

          {/* IT Niche price card */}
          <motion.div
            {...fadeUp}
            data-testid="niche-price-card"
            className="md:col-span-2 bg-[#0A0A0A] text-white p-8 md:p-10 relative overflow-hidden"
          >
            <div className="font-mono text-[11px] tracking-[0.22em] text-white/60 mb-3">
              THE IT NICHE WAY
            </div>
            <div className="font-display font-black text-7xl md:text-8xl leading-none tracking-[-0.04em]">
              $0
            </div>
            <div className="mt-2 text-sm text-white/70">upfront. To launch.</div>

            <div className="mt-10 pt-6 border-t border-white/15">
              <div className="font-display font-black text-3xl md:text-4xl">
                $99<span className="text-base font-medium text-white/60">/mo</span>
              </div>
              <p className="text-sm text-white/70 mt-1">
                Everything included. Cancel anytime.
              </p>
            </div>

            <span className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#E57119]" />
          </motion.div>

          {/* Visual stat card */}
          <motion.div
            {...fadeUp}
            data-testid="visual-stat-card"
            className="md:col-span-2 bg-[#FFF1E8] border border-[#E57119]/30 relative overflow-hidden p-8 min-h-[220px]"
          >
            <img
              src={INFO_IMG}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative">
              <div className="font-mono text-[11px] tracking-[0.22em] text-[#0A0A0A]">
                BREAK-EVEN
              </div>
              <div className="font-display font-black text-5xl md:text-6xl mt-2 tracking-[-0.03em]">
                3+ <span className="text-2xl md:text-3xl">yrs</span>
              </div>
              <p className="text-sm text-[#52525A] mt-2 max-w-[240px]">
                It takes that long to spend $5k at $99/mo. Most sites get
                replaced before then.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Compare strip */}
        <motion.div
          {...fadeUp}
          className="mt-5 grid md:grid-cols-2 border border-[#E5E5E5]"
          data-testid="compare-strip"
        >
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#E5E5E5]">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#52525A] mb-4">
              <X size={14} weight="bold" /> Cheap website
            </div>
            <ul className="space-y-2 text-sm text-[#52525A]">
              <li>— Template that looks like everyone else's</li>
              <li>— Slow load times that hurt SEO</li>
              <li>— Security gaps & vendor juggling</li>
              <li>— Rebuilds within 12 months</li>
            </ul>
          </div>
          <div className="p-8 md:p-10 bg-[#FDFDFD]">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#E57119] mb-4">
              <Check size={14} weight="bold" /> Built right
            </div>
            <ul className="space-y-2 text-sm text-[#0A0A0A]">
              <li>+ Custom design for your brand</li>
              <li>+ SEO-ready, fast, mobile-first code</li>
              <li>+ Security, backups & monitoring included</li>
              <li>+ One team, transparent pricing</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
