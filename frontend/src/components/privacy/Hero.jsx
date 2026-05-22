import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Lock } from "lucide-react";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/5054d87c-16da-4574-9a6a-7672b409d721/images/7cd69526c8f80fb7d37a84d9fb586880e361dd22fe8229f985ea817e79f6d841.png";

export default function Hero() {
  return (
    <section
      id="overview"
      data-testid="hero-section"
      className="relative min-h-[100vh] flex items-end overflow-hidden grain"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]" />
        <div className="absolute inset-0 tech-grid-bg opacity-40" />
      </div>

      {/* Top meta strip */}
      <div className="absolute top-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between border-y border-white/10 py-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
          <span className="flex items-center gap-2">
            <Lock size={12} strokeWidth={1.5} className="text-[#e57119]" />
            <span data-testid="hero-meta-doc">Document · Privacy Policy</span>
          </span>
          <span className="hidden sm:inline">Version 2025.12</span>
          <span data-testid="hero-meta-id">No. 001 / 009</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-20 sm:pb-28 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#e57119]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#e57119] font-bold">
              IT Niche · Memphis
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-black uppercase tracking-tightest leading-[0.85] text-5xl sm:text-7xl lg:text-[9.5rem]"
          >
            Your Data,
            <br />
            <span className="text-stroke">Handled with</span>
            <br />
            <span className="text-[#e57119]">Discretion.</span>
          </h1>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <p
              data-testid="hero-description"
              className="md:col-span-7 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
            >
              A transparent, no-nonsense breakdown of how IT Niche collects,
              processes, and protects your information. Nine principles. Zero
              ambiguity.
            </p>
            <div className="md:col-span-5 md:text-right">
              <div className="inline-flex flex-col items-start md:items-end gap-2 border-l md:border-l-0 md:border-r border-[#e57119]/40 pl-4 md:pl-0 md:pr-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Effective Date
                </span>
                <span className="font-black text-2xl text-[#e57119]">
                  01 · 01 · 2025
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          data-testid="scroll-indicator"
          onClick={() =>
            document
              .getElementById("at-a-glance")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-[#e57119] transition-colors"
        >
          <span className="h-px w-10 bg-current" />
          Scroll to begin
          <ArrowDown size={14} className="animate-bounce" />
        </motion.button>
      </div>

      {/* Vertical side label */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.4em] text-white/30 z-10">
        Privacy Policy / IT Niche / Confidential / Transparent
      </div>
    </section>
  );
}
