import React from "react";
import { motion } from "framer-motion";
import { SectionLabel, fadeUp } from "./Shared";
import {
  PencilRuler,
  Code,
  MagnifyingGlass,
  Browsers,
  CloudArrowUp,
  ShieldCheck,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: PencilRuler,
    title: "Custom design",
    blurb:
      "Your digital storefront — designed for your brand, your audience, and how visitors actually move through a page.",
    chip: "Brand-led",
  },
  {
    icon: Code,
    title: "Development",
    blurb:
      "Forms, booking, payments, integrations. Built clean and tested — without the giant invoice upfront.",
    chip: "$0 upfront",
  },
  {
    icon: MagnifyingGlass,
    title: "SEO foundations",
    blurb:
      "Clean markup, fast loads, mobile-first structure and the technical basics — built in from day one.",
    chip: "Built-in",
  },
  {
    icon: Browsers,
    title: "Content & UX",
    blurb:
      "Copy that guides action, layouts that scan, and navigation that helps visitors get to ‘yes' faster.",
    chip: "Conversion",
  },
  {
    icon: CloudArrowUp,
    title: "Hosting included",
    blurb:
      "Reliable infrastructure, automatic backups and performance monitoring — all part of the $99/mo.",
    chip: "All-inclusive",
  },
  {
    icon: ShieldCheck,
    title: "Security & support",
    blurb:
      "Patches, certificates, fixes and a team you can actually talk to — no juggling multiple vendors.",
    chip: "Ongoing",
  },
];

export const Features = () => {
  return (
    <section
      id="what-drives-cost"
      data-testid="features-section"
      className="relative py-24 md:py-32 border-t border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02 — What you get">Behind the price</SectionLabel>
            <motion.h2
              {...fadeUp}
              className="font-display font-black tracking-[-0.025em] text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
            >
              Six things that turn a
              <br />
              <span className="text-[#E57119]">website</span> into a
              <br />
              business asset.
            </motion.h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p {...fadeUp} className="text-base md:text-lg text-[#52525A] leading-relaxed">
              A site isn't just a layout. It's strategy, code, content and
              infrastructure working together. Here's what's included in every
              IT Niche build.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E5E5E5]">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                data-testid={`feature-card-${i}`}
                className="group relative p-8 md:p-10 border-r border-b border-[#E5E5E5] bg-white lift"
              >
                <div className="flex items-start justify-between mb-10">
                  <div className="w-12 h-12 bg-[#FFF1E8] flex items-center justify-center">
                    <Icon size={26} weight="light" color="#E57119" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-[#52525A]">
                    0{i + 1}
                  </span>
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#E57119] mb-3">
                  {f.chip}
                </div>
                <h3 className="font-display font-bold text-2xl tracking-tight mb-3">
                  {f.title}
                </h3>
                <p className="text-sm md:text-base text-[#52525A] leading-relaxed">
                  {f.blurb}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
