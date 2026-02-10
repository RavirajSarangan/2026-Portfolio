"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useState } from "react";

// Lazy load below-the-fold components for better performance
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Education = dynamic(() => import("@/components/Education"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

import ComponentLoader from "@/components/ui/ComponentLoader";

export default function Home() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      <Hero isInteractive={isInteractive} setIsInteractive={setIsInteractive} />

      <About />
      <Experience />
      <Education />

      <ComponentLoader threshold={0.05} rootMargin="200px">
        <Skills />
      </ComponentLoader>

      <ComponentLoader threshold={0.05} rootMargin="200px">
        <Projects />
      </ComponentLoader>

      <ComponentLoader threshold={0.05} rootMargin="200px">
        <Contact />
      </ComponentLoader>

      <AIAssistant />
      <Footer />
    </main>
  );
}
