import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Marquee } from "@/components/site/Shared";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
import { Features } from "@/components/site/Features";
import { Process } from "@/components/site/Process";
import { Pitch, WhyUs } from "@/components/site/Pitch";
import { FinalCTA, Footer } from "@/components/site/Footer";

const Landing = () => {
  return (
    <div className="App" data-testid="landing-root">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Pricing />
        <Features />
        <Process />
        <Pitch />
        <WhyUs />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
