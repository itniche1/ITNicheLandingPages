import React from "react";
import Nav from "@/components/privacy/Nav";
import Hero from "@/components/privacy/Hero";
import AtAGlance from "@/components/privacy/AtAGlance";
import DataFlow from "@/components/privacy/DataFlow";
import PolicyGrid from "@/components/privacy/PolicyGrid";
import Mailers from "@/components/privacy/Mailers";
import Footer from "@/components/privacy/Footer";

export default function PrivacyPolicy() {
  return (
    <main
      data-testid="privacy-page"
      className="min-h-screen bg-[#050505] text-[#f5f5f0] font-light antialiased"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      <Nav />
      <Hero />
      <AtAGlance />
      <DataFlow />
      <PolicyGrid />
      <Mailers />
      <Footer />
    </main>
  );
}
