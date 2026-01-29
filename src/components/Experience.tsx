"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    tags: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: "exp1",
        company: "Quantum Dynamics",
        role: "Senior Full-Stack Architect",
        period: "2023 - Present",
        description: "Leading the development of AI-driven simulation platforms. Optimized rendering pipelines for real-time WebGL experiences.",
        tags: ["Next.js", "Three.js", "PyTorch", "AWS"]
    },
    {
        id: "exp2",
        company: "Neural Systems",
        role: "Lead UI Engineer",
        period: "2021 - 2023",
        description: "Architected scalable design systems for neural network visualization tools. Improved frontend performance by 40%.",
        tags: ["React", "TypeScript", "Tailwind", "Framer Motion"]
    },
    {
        id: "exp3",
        company: "Vertex Lab",
        role: "Frontend Developer",
        period: "2019 - 2021",
        description: "Developed interactive dashboards for high-frequency trading data. Specialized in real-time data streaming and visualization.",
        tags: ["Vue.js", "D3.js", "Node.js", "GraphQL"]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Professional <span className="text-gradient">Trajectory.</span>
                        </h2>
                        <p className="text-white/40 text-lg">My journey through the digital landscape.</p>
                    </motion.div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 md:pl-0"
                            >
                                {/* Timeline Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 to-transparent md:left-1/2 md:-ml-[0.5px]" />

                                <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Date Column */}
                                    <div className="w-full md:w-1/2 flex md:justify-center">
                                        <div className={`glass px-4 py-2 rounded-full border border-white/10 text-xs font-bold tracking-widest text-accent uppercase ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                                            {exp.period}
                                        </div>
                                    </div>

                                    {/* Card Column */}
                                    <div className="w-full md:w-1/2">
                                        <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 hover:border-accent/40 transition-all group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                                                    <p className="text-white/60 font-medium italic">{exp.company}</p>
                                                </div>
                                            </div>
                                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                                {exp.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md text-white/40">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#8b5cf6] md:left-1/2 md:-ml-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
