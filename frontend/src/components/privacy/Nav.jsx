import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "at-a-glance", label: "At a Glance" },
  { id: "data-flow", label: "Data Flow" },
  { id: "policy", label: "Policy" },
  { id: "mailers", label: "Mailers" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="logo-button"
          className="flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-[#e57119] rounded-full group-hover:scale-150 transition-transform" />
          <span className="font-black tracking-tightest text-lg uppercase">
            IT<span className="text-[#e57119]">/</span>Niche
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              onClick={() => handleNav(l.id)}
              className="px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70 hover:text-[#e57119] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <a
          href="https://www.itniche.com"
          target="_blank"
          rel="noreferrer"
          data-testid="contact-cta"
          className="hidden md:inline-flex beam-btn items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.18em] font-bold border border-[#e57119] text-[#e57119] hover:text-black transition-colors"
        >
          Contact Experts
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
        >
          <div className="px-6 py-6 flex flex-col gap-2">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                data-testid={`mobile-nav-${l.id}`}
                className="text-left py-3 text-sm uppercase tracking-[0.18em] text-white/80 border-b border-white/5"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://www.itniche.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.18em] font-bold border border-[#e57119] text-[#e57119]"
            >
              Contact Experts <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
