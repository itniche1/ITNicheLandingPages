import React from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Capabilities from "@/components/sections/Capabilities";
import GlobalPresence from "@/components/sections/GlobalPresence";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="min-h-screen bg-white text-brand-ink">
      <Header />
      <Hero />
      <LogoMarquee />
      <Services />
      <Stats />
      <Process />
      <Capabilities />
      <GlobalPresence />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
