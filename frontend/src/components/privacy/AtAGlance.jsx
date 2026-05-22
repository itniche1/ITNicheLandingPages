import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const DO = [
  "Use data only to deliver products & services you requested",
  "Work with trusted partners under strict NDAs",
  "Comply with valid legal requests & court orders",
  "Let you opt out of communications, anytime",
  "Use IP addresses anonymously for diagnostics",
];

const DONT = [
  "Rent, sell, or trade your personal information",
  "Share data with non-affiliated companies",
  "Link your IP to personally identifiable information",
  "Take responsibility for third-party site practices",
  "Send mailers without an unsubscribe option",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AtAGlance() {
  return (
    <section
      id="at-a-glance"
      data-testid="at-a-glance-section"
      className="relative py-24 sm:py-32 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e57119] font-bold">
              Section 01
            </span>
            <div className="h-px w-full bg-white/10 mt-4" />
          </div>
          <div className="lg:col-span-9">
            <h2
              data-testid="glance-title"
              className="font-black uppercase tracking-tightest leading-[0.95] text-3xl sm:text-5xl lg:text-6xl"
            >
              The whole policy,
              <br />
              <span className="text-[#e57119]">in two columns.</span>
            </h2>
            <p className="mt-6 text-white/60 max-w-2xl">
              If you only read one section — read this. Everything else simply
              expands on these promises.
            </p>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10">
          {/* WE DO */}
          <div
            data-testid="we-do-column"
            className="p-8 sm:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-[#050505] relative overflow-hidden"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h3 className="font-black uppercase text-2xl sm:text-3xl tracking-tightest">
                We <span className="text-[#e57119]">Do</span>
              </h3>
              <span className="text-[10vw] sm:text-[7rem] font-black leading-none text-[#e57119]/10 absolute -right-2 -top-6 select-none pointer-events-none">
                ✓
              </span>
            </div>
            <ul className="space-y-5">
              {DO.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={reveal}
                  data-testid={`do-item-${i}`}
                  className="flex items-start gap-4 group"
                >
                  <span className="mt-1 flex-shrink-0 w-6 h-6 border border-[#e57119]/60 flex items-center justify-center group-hover:bg-[#e57119] transition-colors">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#e57119] group-hover:text-black"
                    />
                  </span>
                  <span className="text-white/85 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* WE DON'T */}
          <div
            data-testid="we-dont-column"
            className="p-8 sm:p-12 bg-[#0a0a0a] relative overflow-hidden"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h3 className="font-black uppercase text-2xl sm:text-3xl tracking-tightest text-white/60">
                We Don't
              </h3>
              <span className="text-[10vw] sm:text-[7rem] font-black leading-none text-white/5 absolute -right-2 -top-6 select-none pointer-events-none">
                ✕
              </span>
            </div>
            <ul className="space-y-5">
              {DONT.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={reveal}
                  data-testid={`dont-item-${i}`}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 flex-shrink-0 w-6 h-6 border border-white/15 flex items-center justify-center">
                    <X size={14} strokeWidth={2} className="text-white/40" />
                  </span>
                  <span className="text-white/55 leading-relaxed line-through decoration-white/10 decoration-1">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
