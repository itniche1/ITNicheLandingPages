import React from "react";

const ITEMS = [
  "WEB DESIGN",
  "SEO",
  "CUSTOM SOFTWARE",
  "DIGITAL MARKETING",
  "BRAND IDENTITY",
  "E-COMMERCE",
  "CMS DEVELOPMENT",
  "LEAD GENERATION",
];

export default function LogoMarquee() {
  const list = [...ITEMS, ...ITEMS];
  return (
    <section
      data-testid="capabilities-marquee"
      className="border-y border-brand-line bg-brand-alt py-6 overflow-hidden"
    >
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {list.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-12 text-brand-ink/70 font-display font-bold tracking-widest text-sm uppercase"
          >
            <span>{t}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          </div>
        ))}
      </div>
    </section>
  );
}
