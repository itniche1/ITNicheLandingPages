import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-black text-[#f5f5f0] pt-20 sm:pt-28 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e57119] font-bold">
              Need clarification?
            </span>
            <h3 className="font-black uppercase tracking-tightest text-3xl sm:text-5xl mt-4 leading-[0.95]">
              Talk to the
              <br />
              <span className="text-[#e57119]">web design experts.</span>
            </h3>
            <a
              href="https://www.itniche.com"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-cta"
              className="beam-btn beam-btn-light mt-8 inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.18em] font-bold bg-[#e57119] text-black hover:text-[#e57119] transition-colors"
            >
              Visit IT Niche
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                Navigate
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a
                    href="#overview"
                    className="hover:text-[#e57119]"
                    data-testid="footer-nav-overview"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#at-a-glance"
                    className="hover:text-[#e57119]"
                    data-testid="footer-nav-glance"
                  >
                    At a Glance
                  </a>
                </li>
                <li>
                  <a
                    href="#data-flow"
                    className="hover:text-[#e57119]"
                    data-testid="footer-nav-flow"
                  >
                    Data Flow
                  </a>
                </li>
                <li>
                  <a
                    href="#policy"
                    className="hover:text-[#e57119]"
                    data-testid="footer-nav-policy"
                  >
                    Policy Grid
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                IT Niche
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Web Design</li>
                <li>Branding</li>
                <li>Digital Marketing</li>
                <li>Worldwide Reach</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                Location
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin size={14} strokeWidth={1.5} className="mt-1 text-[#e57119]" />
                  <span>
                    Memphis, TN
                    <br />
                    United States
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive name */}
        <div className="relative -mb-6 sm:-mb-12">
          <h2
            aria-hidden
            className="font-black uppercase tracking-tightest leading-none text-[24vw] text-[#e57119]/90 select-none"
            data-testid="footer-bigname"
          >
            ITNiche
          </h2>
        </div>
      </div>

      {/* Strip */}
      <div className="border-t border-white/10 mt-6 py-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} IT Niche · All rights reserved</span>
          <span>Privacy Policy · v 2025.12</span>
          <span>Made in Memphis, TN</span>
        </div>
      </div>
    </footer>
  );
}
