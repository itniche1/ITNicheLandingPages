import React from "react";
import { ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Services",
    links: [
      "Web Design",
      "Digital Marketing",
      "SEO",
      "Custom Software",
      "E-Commerce",
    ],
  },
  {
    title: "Company",
    links: ["About", "What We Do", "Promotions", "Reseller Program", "Careers"],
  },
  {
    title: "Resources",
    links: ["Online Demo", "Lunch & Learn", "Features", "Blog", "Support"],
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-white border-t border-brand-line pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Massive tagline */}
        <div className="border-b border-brand-line pb-12">
          <p
            data-testid="footer-tagline"
            className="font-display font-black tracking-tighter text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] text-balance"
          >
            Your feedback is{" "}
            <span className="text-brand-orange italic">
              &ldquo;Oxygen&rdquo;
            </span>{" "}
            for us.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 grid place-items-center bg-brand-black text-white font-display font-black text-lg">
                i
              </span>
              <span className="font-display font-black text-xl tracking-tight">
                IT NICHE<span className="text-brand-orange">.</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-brand-muted max-w-xs leading-relaxed">
              A Memphis-based custom website design and digital marketing
              partner for small businesses worldwide.
            </p>

            <a
              href="#contact"
              data-testid="footer-cta"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-ink hover:text-brand-orange"
            >
              Start a conversation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
                {c.title}
              </div>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-brand-ink/80 hover:text-brand-orange"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
              Offices
            </div>
            <ul className="space-y-3 text-sm text-brand-ink/80">
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-brand-muted">
                  USA
                </span>
                Memphis, TN
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-brand-muted">
                  India
                </span>
                Hyderabad, TS
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-brand-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-brand-muted">
            © {new Date().getFullYear()} IT Niche, LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-muted">
            <a href="#" className="hover:text-brand-orange">
              Privacy
            </a>
            <a href="#" className="hover:text-brand-orange">
              Terms
            </a>
            <a href="#" className="hover:text-brand-orange">
              Sitemap
            </a>
            <a href="#" className="hover:text-brand-orange">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
