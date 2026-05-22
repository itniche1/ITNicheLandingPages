import React from "react";
import { motion } from "framer-motion";
import { Inbox, Cog, ShieldCheck, Trash2 } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Inbox,
    title: "Collection",
    text: "Only the data you choose to share — name, email, IP for diagnostics.",
  },
  {
    n: "02",
    icon: Cog,
    title: "Processing",
    text: "Used strictly for the service you requested or with your permission.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Protection",
    text: "Stored under strict confidentiality agreements with trusted partners.",
  },
  {
    n: "04",
    icon: Trash2,
    title: "Control",
    text: "Opt out, correct or request deletion of your personal data anytime.",
  },
];

const INFOGRAPHIC_BG =
  "https://static.prod-images.emergentagent.com/jobs/5054d87c-16da-4574-9a6a-7672b409d721/images/f5edb723e872057ca217fc93277cc7ac3885cf821809bc9e5cef150b83b4ef45.png";

export default function DataFlow() {
  return (
    <section
      id="data-flow"
      data-testid="data-flow-section"
      className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${INFOGRAPHIC_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 to-[#050505]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e57119] font-bold">
              Section 02
            </span>
            <div className="h-px w-full bg-white/10 mt-4" />
          </div>
          <div className="lg:col-span-9">
            <h2
              data-testid="flow-title"
              className="font-black uppercase tracking-tightest leading-[0.95] text-3xl sm:text-5xl lg:text-6xl"
            >
              How your data
              <br />
              <span className="text-stroke-primary">moves through us.</span>
            </h2>
          </div>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`flow-step-${s.n}`}
                className="bg-[#050505] p-8 sm:p-10 relative group hover:bg-[#0c0c0c] transition-colors"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Step {s.n}
                  </span>
                  <span className="w-8 h-8 flex items-center justify-center border border-[#e57119]/40 group-hover:bg-[#e57119] transition-colors">
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-[#e57119] group-hover:text-black transition-colors"
                    />
                  </span>
                </div>
                <h3 className="font-black uppercase tracking-tightest text-2xl sm:text-3xl mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {s.text}
                </p>
                {i < STEPS.length - 1 && (
                  <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px bg-[#e57119] z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
