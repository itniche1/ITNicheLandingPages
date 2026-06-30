import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      data-testid="cta-section"
      className="relative bg-brand-black text-white py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-100 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-orange/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
            · Ready when you are
          </div>
          <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Bring your idea.
            <br />
            We&apos;ll bring it{" "}
            <span className="text-brand-orange">online — today.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            Free consultation. Free quote. Zero upfront cost for qualifying
            projects. Let&apos;s make your digital presence work harder.
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3">
          <a
            href="#contact"
            data-testid="cta-primary"
            className="group inline-flex items-center justify-between bg-brand-orange text-white px-7 py-5 text-base font-bold hover:bg-brand-orange-dark transition-colors"
          >
            Free Consultation
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="tel:9014149009"
            data-testid="cta-secondary"
            className="group inline-flex items-center justify-between border border-white/30 text-white px-7 py-5 text-base font-bold hover:bg-white hover:text-brand-black transition-colors"
          >
            Call (901) 414-9009
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}
