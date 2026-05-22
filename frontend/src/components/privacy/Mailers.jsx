import React from "react";
import { motion } from "framer-motion";
import { Mail, MousePointerClick } from "lucide-react";

export default function Mailers() {
  return (
    <section
      id="mailers"
      data-testid="mailers-section"
      className="relative bg-[#e57119] text-black border-t border-[#e57119] overflow-hidden"
    >
      {/* Marquee */}
      <div className="border-b border-black/15 py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap text-xs uppercase tracking-[0.3em] font-bold">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex">
              {[
                "Total Control",
                "One-Click Unsubscribe",
                "No Sold Data",
                "Permission First",
                "Encrypted in Transit",
                "Your Inbox, Your Rules",
              ].map((t, i) => (
                <span key={i} className="px-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            <Mail size={14} strokeWidth={2} />
            Section 04 · Mailers
          </span>
          <h2
            data-testid="mailers-title"
            className="font-black uppercase tracking-tightest leading-[0.9] text-4xl sm:text-6xl lg:text-7xl"
          >
            Total control
            <br />
            over your inbox.
          </h2>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed">
            If you've shared your email with us, we may occasionally send you
            promotional offers. Every single message includes a one-click
            unsubscribe link at the bottom. No tricks. No buried buttons.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="bg-black text-[#f5f5f0] p-8 sm:p-10 relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.3em] text-[#e57119]">
              mock · email
            </span>
            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                From
              </div>
              <div className="text-sm">hello@itniche.com</div>
            </div>
            <div className="border-b border-white/10 pb-4 mb-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                Subject
              </div>
              <div className="text-sm">Big news from your design partners</div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Hi there — wanted to share some new work we're proud of...
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                © IT Niche
              </span>
              <span
                data-testid="unsubscribe-link"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#e57119] border-b border-[#e57119] cursor-pointer"
              >
                <MousePointerClick size={12} strokeWidth={2} />
                Unsubscribe
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
