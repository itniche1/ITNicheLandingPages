import React, { useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Wind } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.company) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Static / visual only — no backend submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll be in touch shortly.", {
        description: "Your message has been received.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        message: "",
      });
    }, 700);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-4">
            · 06 / Contact us
          </div>
          <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-brand-orange">remarkable.</span>
          </h2>

          <div className="mt-8 inline-flex items-center gap-3 bg-brand-alt border border-brand-line px-5 py-4">
            <Wind className="w-5 h-5 text-brand-orange shrink-0" strokeWidth={1.5} />
            <p className="text-sm font-medium text-brand-ink leading-snug">
              Your feedback is{" "}
              <span className="text-brand-orange font-bold">
                &ldquo;Oxygen&rdquo;
              </span>{" "}
              for us.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <ContactRow icon={Mail} label="Email us">
              <a
                href="mailto:hello@itniche.com"
                className="hover:text-brand-orange"
              >
                hello@itniche.com
              </a>
            </ContactRow>
            <ContactRow icon={Phone} label="Call US">
              <a href="tel:9014149009" className="hover:text-brand-orange">
                (901) 414-9009
              </a>
            </ContactRow>
            <ContactRow icon={Phone} label="Call India">
              <a href="tel:914027662622" className="hover:text-brand-orange">
                (040) 2766-2622
              </a>
            </ContactRow>
            <ContactRow icon={MapPin} label="HQ">
              748 Crossover Lane, Memphis, TN 38117
            </ContactRow>
          </div>
        </div>

        {/* Right — Form */}
        <form
          data-testid="contact-form"
          onSubmit={onSubmit}
          className="lg:col-span-7 border border-brand-line p-6 sm:p-8 md:p-10 bg-brand-alt"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              id="firstName"
              label="First Name"
              required
              value={form.firstName}
              onChange={update("firstName")}
            />
            <Field
              id="lastName"
              label="Last Name"
              required
              value={form.lastName}
              onChange={update("lastName")}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
            />
            <Field
              id="phone"
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
            />
            <Field
              id="company"
              label="Company"
              required
              value={form.company}
              onChange={update("company")}
            />
            <Field
              id="website"
              label="Website"
              value={form.website}
              onChange={update("website")}
              placeholder="https://"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-widest text-brand-ink mb-2"
            >
              Tell us about your project
            </label>
            <textarea
              id="message"
              data-testid="contact-input-message"
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="A short brief, goals, timeline…"
              className="w-full bg-white border border-brand-line px-4 py-3 text-sm font-sans outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
              By submitting, you agree to be contacted by IT Niche about your
              inquiry. We respect your privacy.
            </p>
            <button
              type="submit"
              data-testid="contact-submit-button"
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-2 bg-brand-orange disabled:opacity-60 text-white px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors"
            >
              {submitting ? "Sending…" : "Send Message"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ id, label, required, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-widest text-brand-ink mb-2"
      >
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
      <input
        id={id}
        data-testid={`contact-input-${id}`}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border border-brand-line px-4 py-3 text-sm font-sans outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition"
      />
    </div>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 grid place-items-center border border-brand-line bg-white shrink-0">
        <Icon className="w-4 h-4 text-brand-orange" strokeWidth={1.6} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-brand-muted font-bold">
          {label}
        </div>
        <div className="mt-0.5 text-sm md:text-base text-brand-ink">
          {children}
        </div>
      </div>
    </div>
  );
}
