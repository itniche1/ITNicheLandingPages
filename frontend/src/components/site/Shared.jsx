import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";

const EXTERNAL_URL = "https://www.itniche.com";

export const Header = () => {
  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 bg-white/75 backdrop-blur-xl border-b border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="header-logo"
          className="flex items-center gap-2.5 group"
        >
          <span className="relative inline-flex items-center justify-center w-9 h-9 bg-[#0A0A0A] text-white">
            <span className="font-display font-black text-[15px] leading-none">IT</span>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#E57119]" />
          </span>
          <div className="leading-tight">
            <div className="font-display font-bold text-[15px] tracking-tight">IT Niche</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#52525A] -mt-0.5">
              Web Studio
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#52525A]">
          <a href="#pricing" data-testid="nav-pricing" className="link-underline hover:text-[#0A0A0A]">
            Pricing
          </a>
          <a href="#what-drives-cost" data-testid="nav-features" className="link-underline hover:text-[#0A0A0A]">
            What you get
          </a>
          <a href="#process" data-testid="nav-process" className="link-underline hover:text-[#0A0A0A]">
            Process
          </a>
          <a href="#why-us" data-testid="nav-why" className="link-underline hover:text-[#0A0A0A]">
            Why us
          </a>
        </nav>

        <a
          href={EXTERNAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="header-cta"
          className="cta-orange inline-flex items-center gap-2 px-4 md:px-5 h-10 md:h-11 text-[13px] md:text-sm font-medium"
        >
          Free consultation
          <ArrowUpRight size={16} weight="bold" />
        </a>
      </div>
    </header>
  );
};

export const Marquee = () => {
  const items = [
    "$0 UPFRONT",
    "$99 / MONTH",
    "ALL-INCLUSIVE HOSTING",
    "SECURITY UPDATES",
    "SEO-READY",
    "TRANSPARENT PRICING",
    "BUILT FOR BUSINESS",
  ];
  const row = [...items, ...items];
  return (
    <div
      data-testid="marquee-bar"
      className="border-y border-[#0A0A0A] bg-[#0A0A0A] text-white overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-6 mx-6">
            <span className="font-mono text-[11px] tracking-[0.22em]">{t}</span>
            <Sparkle size={12} weight="fill" color="#E57119" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SectionLabel = ({ children, index }) => (
  <div className="flex items-center gap-3 mb-6">
    {index && (
      <span className="font-mono text-[11px] text-[#52525A] tracking-[0.2em]">
        {index}
      </span>
    )}
    <span className="h-px w-8 bg-[#0A0A0A]" />
    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E57119]">
      {children}
    </span>
  </div>
);

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
};

export const PrimaryCTA = ({ children = "Get a free consultation", testId = "primary-cta", className = "", arrow = true }) => (
  <a
    href={EXTERNAL_URL}
    target="_blank"
    rel="noopener noreferrer"
    data-testid={testId}
    className={`cta-orange inline-flex items-center gap-2.5 px-6 h-12 md:h-14 font-medium text-sm md:text-base ${className}`}
  >
    {children}
    {arrow && <ArrowRight size={18} weight="bold" />}
  </a>
);

export const SecondaryLink = ({ href = "#pricing", children, testId }) => (
  <a
    href={href}
    data-testid={testId}
    className="inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:gap-3 transition-all"
  >
    {children}
    <ArrowRight size={14} weight="bold" />
  </a>
);
