import React from "react";
import { motion } from "framer-motion";
import { PrimaryCTA, SecondaryLink, fadeUp } from "./Shared";
import { Star, CheckCircle } from "@phosphor-icons/react";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/239039ec-0a02-4e58-850c-c28fee591dc0/images/2dc1b7f5c24ca802b37f41068581758159cdd435da2aa5cee5847c6fd1360d07.png";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Decorative grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        {/* Left */}
        <div className="lg:col-span-7">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 border border-[#0A0A0A] px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-[#E57119] dot-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                Now booking — Q1 builds
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            data-testid="hero-headline"
            className="font-display font-black tracking-[-0.03em] leading-[0.92] text-[42px] sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            Professional
            <br />
            websites.{" "}
            <span className="relative inline-block">
              <span className="text-[#E57119]">Zero</span>
              <svg
                viewBox="0 0 220 16"
                className="absolute -bottom-2 left-0 w-full h-3 text-[#E57119]"
                fill="none"
              >
                <path
                  d="M2 12 C 60 2, 160 2, 218 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            upfront cost.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-8 text-base md:text-lg text-[#52525A] max-w-xl leading-relaxed"
          >
            Get a fully custom site built by senior designers and developers.
            Pay <span className="text-[#0A0A0A] font-semibold">$0 to launch</span>,
            then a flat <span className="text-[#0A0A0A] font-semibold">$99/month</span>—
            hosting, security, maintenance and support, all included.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <PrimaryCTA testId="hero-primary-cta">Get a free consultation</PrimaryCTA>
            <SecondaryLink href="#pricing" testId="hero-secondary-link">
              See what sites cost
            </SecondaryLink>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="mt-12 flex items-center gap-6 text-sm text-[#52525A]"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} weight="fill" color="#E57119" />
              ))}
              <span className="ml-2 text-[#0A0A0A] font-semibold">4.9</span>
              <span>/ 5 client rating</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle size={16} weight="fill" color="#0A0A0A" />
              <span>No long-term contracts</span>
            </div>
          </motion.div>
        </div>

        {/* Right — Hero visual */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] bg-[#FFF1E8] border border-[#0A0A0A] overflow-hidden">
              <img
                src={HERO_IMG}
                alt="Abstract 3D composition representing premium website craft"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                loading="eager"
                data-testid="hero-image"
              />
              {/* Sticker */}
              <div className="absolute top-4 left-4 bg-white border border-[#0A0A0A] px-3 py-1.5 font-mono text-[11px] tracking-[0.18em]">
                ID — 001 / NICHE
              </div>
              {/* Price card */}
              <div className="absolute bottom-4 right-4 bg-[#0A0A0A] text-white px-5 py-4 max-w-[220px]">
                <div className="text-[10px] font-mono tracking-[0.22em] text-white/60">
                  ALL-INCLUSIVE
                </div>
                <div className="font-display font-black text-3xl mt-1">
                  $99<span className="text-base font-medium text-white/60">/mo</span>
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  Hosting + maintenance + support
                </div>
              </div>
            </div>

            {/* Floating chip */}
            <div className="hidden md:flex absolute -left-6 top-10 items-center gap-2 bg-white border border-[#0A0A0A] px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
              <span className="w-2 h-2 bg-[#E57119]" />
              <span className="text-[11px] font-mono tracking-[0.18em]">$0 UPFRONT</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
