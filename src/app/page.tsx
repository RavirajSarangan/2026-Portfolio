"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero isInteractive={isInteractive} setIsInteractive={setIsInteractive} />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <AIAssistant />
      <Footer />
    </main>
  );
}
