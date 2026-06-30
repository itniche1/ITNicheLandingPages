import React from "react";
import { TrendingUp, Users, Globe2, Clock } from "lucide-react";

const STATS = [
  { value: "20+", label: "Years of expertise", icon: Clock },
  { value: "500+", label: "Projects delivered", icon: TrendingUp },
  { value: "98%", label: "Client retention", icon: Users },
  { value: "2", label: "Global offices", icon: Globe2 },
];

export default function Stats() {
  return (
    <section
      id="stats"
      data-testid="stats-section"
      className="relative bg-brand-black text-white py-24 md:py-28 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
              · 02 / By the numbers
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
              Two decades. Hundreds of brands.
              <br />
              <span className="text-brand-orange">One measurable outcome.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                data-testid={`stat-${i}`}
                className={`p-8 md:p-10 ${
                  i < 3 ? "md:border-r border-white/10" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""} ${
                  i === 0 ? "border-r border-white/10" : ""
                } ${i === 2 ? "border-r md:border-r-0 border-white/10" : ""}`}
              >
                <Icon className="w-8 h-8 text-brand-orange" strokeWidth={1.5} />
                <div className="mt-6 font-display font-black tracking-tighter text-5xl md:text-6xl lg:text-7xl">
                  {s.value}
                </div>
                <div className="mt-3 text-xs md:text-sm uppercase tracking-widest text-white/60">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
