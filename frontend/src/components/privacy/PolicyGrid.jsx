import React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  ShieldCheck,
  Scale,
  AlertTriangle,
  Building2,
  UserCircle,
  Network,
  ExternalLink,
  Mail,
} from "lucide-react";

const POINTS = [
  {
    id: "01",
    icon: Share2,
    title: "Data Sharing",
    text: "IT Niche does not rent, sell, or share personal information with non-affiliated companies — except to provide the products or services you have requested, or with your explicit permission.",
  },
  {
    id: "02",
    icon: ShieldCheck,
    title: "Trusted Partners",
    text: "Information may be shared with partners operating on behalf of IT Niche under strict confidentiality agreements. They hold no independent right to use this data.",
  },
  {
    id: "03",
    icon: Scale,
    title: "Legal Compliance",
    text: "We respond to subpoenas, court orders, and legal processes — or as needed to establish, exercise, or defend our legal rights.",
  },
  {
    id: "04",
    icon: AlertTriangle,
    title: "Fraud Prevention",
    text: "We share data when necessary to investigate, prevent, or act against illegal activity, suspected fraud, or threats to physical safety.",
  },
  {
    id: "05",
    icon: Building2,
    title: "Business Transfer",
    text: "If IT Niche is ever acquired or merged with another company, information may be transferred as part of that business transaction.",
  },
  {
    id: "06",
    icon: UserCircle,
    title: "User Information",
    text: "You may share personal info to correspond with us, download papers, or subscribe. Tell us to stop, and we'll respect your wishes immediately.",
  },
  {
    id: "07",
    icon: Network,
    title: "IP Addresses",
    text: "We use your IP to diagnose server issues and understand site usage. IPs are never linked to anything personally identifiable.",
  },
  {
    id: "08",
    icon: ExternalLink,
    title: "Third-Party Links",
    text: "Our site may contain links to external websites. IT Niche is not responsible for their privacy practices or content.",
  },
  {
    id: "09",
    icon: Mail,
    title: "Mailers & Comms",
    text: "If we email you, every message contains a one-click unsubscribe link. You're in full control of what reaches your inbox.",
  },
];

export default function PolicyGrid() {
  return (
    <section
      id="policy"
      data-testid="policy-grid-section"
      className="relative py-24 sm:py-32 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e57119] font-bold">
              Section 03
            </span>
            <div className="h-px w-full bg-white/10 mt-4" />
          </div>
          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              data-testid="policy-title"
              className="font-black uppercase tracking-tightest leading-[0.95] text-3xl sm:text-5xl lg:text-6xl"
            >
              The full
              <br />
              policy, broken
              <br />
              into <span className="text-[#e57119]">nine cells.</span>
            </h2>
            <p className="text-white/55 max-w-sm text-sm">
              A 3 × 3 grid — read in any order. Each cell is a complete,
              standalone clause of our policy.
            </p>
          </div>
        </div>

        {/* 9-cell technical grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-testid={`policy-card-${p.id}`}
                className="relative bg-[#050505] p-8 sm:p-10 min-h-[300px] sm:min-h-[340px] group hover:bg-[#0c0c0c] transition-colors overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute -bottom-6 -right-2 font-black text-[8rem] sm:text-[10rem] leading-none text-white/[0.04] select-none pointer-events-none group-hover:text-[#e57119]/10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500"
                >
                  {p.id}
                </span>

                <div className="relative flex items-start justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Clause {p.id}
                  </span>
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-[#e57119] group-hover:rotate-6 transition-transform duration-300"
                  />
                </div>

                <h3 className="relative font-black uppercase tracking-tightest text-xl sm:text-2xl mb-4">
                  {p.title}
                </h3>
                <p className="relative text-sm text-white/55 leading-relaxed max-w-[34ch]">
                  {p.text}
                </p>

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#e57119] group-hover:w-full transition-all duration-500" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
