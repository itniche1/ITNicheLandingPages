import React from "react";
import { motion } from "framer-motion";
import { PrimaryCTA, fadeUp } from "./Shared";
import { ArrowUpRight } from "@phosphor-icons/react";

export const FinalCTA = () => {
  return (
    <section
      id="cta"
      data-testid="final-cta-section"
      className="relative py-28 md:py-40 bg-[#FFF1E8] border-t border-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute -right-32 -bottom-32 w-[420px] h-[420px] bg-[#E57119]/15" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <div className="font-mono text-[11px] tracking-[0.22em] text-[#E57119] mb-6">
            05 — LET'S BUILD
          </div>
          <motion.h2
            {...fadeUp}
            className="font-display font-black tracking-[-0.03em] leading-[0.9] text-5xl md:text-6xl lg:text-7xl"
          >
            Invest in a website
            <br />
            that works for
            <br />
            <span className="text-[#E57119]">your business.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-8 text-base md:text-lg text-[#52525A] max-w-xl leading-relaxed"
          >
            Stop guessing. Talk to our team and see exactly what we can build
            for you — at zero financial risk to start.
          </motion.p>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          <PrimaryCTA testId="final-cta-button" className="!h-16 !px-8 text-base">
            Get a free consultation
          </PrimaryCTA>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#0A0A0A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex items-center justify-center w-10 h-10 bg-white text-[#0A0A0A]">
              <span className="font-display font-black text-base">IT</span>
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#E57119]" />
            </span>
            <div>
              <div className="font-display font-bold text-base">IT Niche</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 -mt-0.5">
                Web Studio
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/60 max-w-sm leading-relaxed">
            Custom websites built by senior designers and engineers.
            $0 upfront. $99/month all-inclusive.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] tracking-[0.22em] text-white/40 mb-4">
            EXPLORE
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#pricing" className="text-white/80 hover:text-[#E57119]">Pricing</a></li>
            <li><a href="#what-drives-cost" className="text-white/80 hover:text-[#E57119]">What you get</a></li>
            <li><a href="#process" className="text-white/80 hover:text-[#E57119]">Process</a></li>
            <li><a href="#why-us" className="text-white/80 hover:text-[#E57119]">Why us</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-mono text-[11px] tracking-[0.22em] text-white/40 mb-4">
            CONTACT
          </div>
          <a
            href="https://www.itniche.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-website-link"
            className="inline-flex items-center gap-2 font-display font-bold text-2xl text-white hover:text-[#E57119]"
          >
            itniche.com
            <ArrowUpRight size={22} weight="bold" />
          </a>
          <p className="mt-4 text-sm text-white/60">
            Ready when you are. We reply within one business day.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono tracking-[0.18em] text-white/40">
          <div>© {new Date().getFullYear()} IT NICHE — ALL RIGHTS RESERVED</div>
          <div>BUILT WITH CARE — NO TEMPLATES</div>
        </div>
      </div>
    </footer>
  );
};
