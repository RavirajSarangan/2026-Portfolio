"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useState } from "react";

// Lazy load below-the-fold components for better performance
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Education = dynamic(() => import("@/components/Education"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <main id="main-content" className="min-h-screen">
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
