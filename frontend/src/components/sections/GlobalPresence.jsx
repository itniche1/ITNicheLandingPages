import React from "react";
import { Phone, Smartphone, Clock, MapPin } from "lucide-react";

const OFFICES = [
  {
    id: "usa",
    flag: "USA",
    city: "Memphis, TN",
    name: "IT Niche, LLC",
    address: "748 Crossover Lane, Memphis, TN, USA 38117",
    phone: "(901) 414-9009",
    cell: "(901) 489-1234",
    hours: [
      "Mon – Fri · 8:00 AM – 4:00 PM (CST)",
      "Saturday · 8:00 AM – 1:00 PM (CST)",
    ],
  },
  {
    id: "india",
    flag: "INDIA",
    city: "Hyderabad, TS",
    name: "IT Niche India Pvt. Ltd",
    address:
      "Ashoka Scintilla Building, Suite 306, III Floor, Himayath Nagar Main Road, Hyderabad, Telangana, India 500024",
    phone: "(040) 2766-2622",
    cell: "+91 97003-15970",
    hours: ["Mon – Fri · 8:00 AM – 4:00 PM (IST)"],
  },
];

export default function GlobalPresence() {
  return (
    <section
      id="global"
      data-testid="global-presence-section"
      className="py-24 md:py-32 bg-brand-alt"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
              · 05 / Global presence
            </div>
            <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
              Two offices.
              <br />
              <span className="text-brand-orange">One team.</span> 24-hour
              coverage.
            </h2>
          </div>
          <p className="md:col-span-5 text-base text-brand-muted leading-relaxed">
            With teams in the US and India, your project keeps moving — even
            when you sleep.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {OFFICES.map((o) => (
            <OfficeCard key={o.id} {...o} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfficeCard({ flag, city, name, address, phone, cell, hours, id }) {
  return (
    <div
      data-testid={`office-${id}`}
      className="bg-white border border-brand-line p-8 md:p-10 hover:border-brand-orange transition-colors"
    >
      <div className="flex items-start justify-between border-b border-brand-line pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            {flag} · Office
          </div>
          <h3 className="mt-2 font-display font-black tracking-tighter text-4xl">
            {city}
          </h3>
          <p className="mt-1 text-sm text-brand-muted">{name}</p>
        </div>
        <PinSVG />
      </div>

      <div className="mt-6 space-y-5">
        <Row icon={MapPin} label="Address">
          {address}
        </Row>
        <Row icon={Phone} label="Phone">
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-brand-orange">
            {phone}
          </a>
        </Row>
        <Row icon={Smartphone} label="Cell">
          <a href={`tel:${cell.replace(/\D/g, "")}`} className="hover:text-brand-orange">
            {cell}
          </a>
        </Row>
        <Row icon={Clock} label="Hours">
          {hours.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </Row>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 grid place-items-center bg-brand-alt border border-brand-line shrink-0">
        <Icon className="w-4 h-4 text-brand-orange" strokeWidth={1.6} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-brand-muted font-bold">
          {label}
        </div>
        <div className="mt-1 text-sm md:text-base text-brand-ink leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function PinSVG() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="#E5E7EB" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#E5E7EB" strokeDasharray="2 3" />
      <circle cx="32" cy="32" r="6" fill="#e57119" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="#e57119" strokeWidth="1.5" />
    </svg>
  );
}
