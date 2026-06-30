import React from "react";
import {
  Code2,
  Search,
  Megaphone,
  Cog,
  ShoppingCart,
  LineChart,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Design & Development",
    desc: "Custom-built, mobile-first websites engineered for speed, SEO and conversion.",
    tag: "01",
    span: "md:col-span-2 md:row-span-2",
    feature: true,
  },
  {
    icon: Search,
    title: "SEO & Traffic Building",
    desc: "On-page tuning + ongoing optimization that lifts brand visibility.",
    tag: "02",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Social, email & paid campaigns that turn traffic into qualified leads.",
    tag: "03",
  },
  {
    icon: Cog,
    title: "Custom Software",
    desc: "Tailored business apps, dashboards, and integrations from scratch.",
    tag: "04",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Storefronts, payments, inventory — fully integrated and scalable.",
    tag: "05",
  },
  {
    icon: LineChart,
    title: "Analytics & Growth",
    desc: "Data-led decisions with reporting that maps every dollar to outcomes.",
    tag: "06",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
              · 01 / What we do
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl text-balance leading-[1.02]">
              A complete digital
              <br />
              toolkit, under{" "}
              <span className="text-brand-orange">one roof.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-base text-brand-muted leading-relaxed">
            Six core capabilities purpose-built to help small businesses launch
            credible brands, drive measurable traffic, and scale predictably —
            without juggling four different vendors.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          data-testid="services-grid"
          className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(220px,_auto)] gap-4 md:gap-5"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc, tag, span = "", feature = false }) {
  return (
    <div
      data-testid={`service-card-${tag}`}
      className={`group relative border border-brand-line bg-white p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-orange hover:-translate-y-1 ${
        feature ? "bg-brand-alt" : ""
      } ${span}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-14 h-14 grid place-items-center border border-brand-line bg-white transition-colors group-hover:bg-brand-orange ${
            feature ? "w-16 h-16" : ""
          }`}
        >
          <Icon
            className={`w-7 h-7 text-brand-ink group-hover:text-white transition-colors ${
              feature ? "w-8 h-8" : ""
            }`}
            strokeWidth={1.5}
          />
        </div>
        <span className="text-xs font-display font-bold tracking-widest text-brand-muted">
          {tag}
        </span>
      </div>

      <div className="mt-12">
        <h3
          className={`font-display font-bold tracking-tight text-balance ${
            feature ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 text-brand-muted leading-relaxed ${
            feature ? "text-base max-w-md" : "text-sm"
          }`}
        >
          {desc}
        </p>

        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink group-hover:text-brand-orange transition-colors">
          Learn more
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
        </div>
      </div>
    </div>
  );
}
