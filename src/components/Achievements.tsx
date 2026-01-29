"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Target, Trophy, Zap } from "lucide-react";

const achievements = [
    {
        title: "AI Innovation Award 2025",
        org: "Global Tech Summit",
        description: "Recognized for pioneering work in integrating neural feedback loops into real-time web 3D environments.",
        icon: Trophy,
        color: "from-yellow-400 to-orange-500"
    },
    {
        title: "Full-Stack Excellence",
        org: "Next.js Conf",
        description: "Awarded for the development of high-performance localized e-commerce solutions with zero CLS.",
        icon: Award,
        color: "from-blue-400 to-purple-500"
    },
    {
        title: "10M+ Users Impact",
        org: "Open Source Contribution",
        description: "Lead maintainer for several critical UI libraries used by thousands of developers worldwide.",
        icon: Zap,
        color: "from-cyan-400 to-blue-600"
    },
    {
        title: "Certified AI Architect",
        org: "DeepMind Institute",
        description: "Advanced certification in designing and deploying LLM-powered applications at scale.",
        icon: Target,
        color: "from-emerald-400 to-teal-600"
    }
];

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 bg-black/50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            Neural <span className="text-gradient">Milestones.</span>
                        </h2>
                        <p className="text-white/60 text-lg">
                            A record of breakthrough moments and professional certifications in the pursuit of architectural excellence.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-6 rounded-3xl border border-white/5 relative group overflow-hidden"
                        >
                            {/* Icon Background Glow */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <div className="w-full h-full bg-black/90 rounded-[15px] flex items-center justify-center">
                                    <item.icon className="text-white" size={24} />
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                            <p className="text-accent text-xs uppercase tracking-tighter font-semibold mb-4">{item.org}</p>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Verified Credential
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
