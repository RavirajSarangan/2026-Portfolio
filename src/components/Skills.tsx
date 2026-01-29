"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, Cpu, Database, Layout } from "lucide-react";
import dynamic from "next/dynamic";

const IconCloud = dynamic(() => import("./ui/interactive-icon-cloud").then((mod) => mod.IconCloud), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
});

const skillCategories = [
    {
        title: "Frontend Development",
        icon: Layout,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
        title: "Backend & Cloud",
        icon: Database,
        skills: ["Node.js", "Python", "Supabase", "Firebase", "PostgreSQL", "Docker"]
    },
    {
        title: "AI & Innovation",
        icon: Cpu,
        skills: ["OpenAI API", "LangChain", "PyTorch", "Data Visualization", "LLM Integration"]
    },
    {
        title: "UI/UX Design",
        icon: Palette,
        skills: ["Figma", "Design Systems", "Prototyping", "Micro-interactions", "Responsive Design"]
    }
];

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "mongodb",
    "mysql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "androidstudio",
    "sonarqube",
    "figma",
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Technical <span className="text-gradient">Arsenal.</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
                        A diverse toolkit built on years of experience and a passion for cutting-edge technology.
                    </p>

                    {/* Icon Cloud Visual Centerpiece */}
                    <div className="relative flex w-full max-w-4xl mx-auto items-center justify-center overflow-hidden mb-16 px-4 h-[400px] md:h-[600px]">
                        <IconCloud iconSlugs={slugs} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass p-8 rounded-3xl hover:border-accent/40 transition-colors group"
                        >
                            <div className="w-12 h-12 accent-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <category.icon size={24} className="text-white" />
                            </div>
                            <h3 className="font-display text-xl font-bold mb-6 italic">{category.title}</h3>
                            <ul className="space-y-3">
                                {category.skills.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-white/50 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
