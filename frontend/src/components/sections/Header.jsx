import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Stats", href: "#stats" },
  { label: "Offices", href: "#global" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/85 border-b border-brand-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="header-logo"
          className="flex items-center gap-2 group"
          aria-label="IT Niche home"
        >
          <span className="w-9 h-9 grid place-items-center bg-brand-black text-white font-display font-black text-lg group-hover:bg-brand-orange transition-colors">
            i
          </span>
          <span className="font-display font-black text-xl tracking-tight">
            IT NICHE<span className="text-brand-orange">.</span>
          </span>
        </a>

        <nav
          data-testid="header-nav"
          className="hidden md:flex items-center gap-8"
          aria-label="Primary"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className="text-sm font-medium text-brand-ink/80 hover:text-brand-orange transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="header-cta-button"
          className="hidden md:inline-flex items-center gap-2 bg-brand-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-orange transition-colors group"
        >
          Get a Free Quote
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
        </a>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden grid place-items-center w-10 h-10 border border-brand-line"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden border-t border-brand-line bg-white"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${n.label.toLowerCase()}`}
                className="py-2 text-base font-medium text-brand-ink hover:text-brand-orange"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta-button"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-5 py-3 text-sm font-semibold"
            >
              Get a Free Quote <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
