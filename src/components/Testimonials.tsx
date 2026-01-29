"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Alex Rivera",
        role: "CEO, TechFlow",
        content: "Raviraj's ability to blend high-end aesthetics with complex neural architectures is unmatched. Our platform's engagement tripled after the redesign.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Sarah Chen",
        role: "Lead Engineer, Nexus AI",
        content: "The Interactive Neural Lab he built for our R&D team is a masterpiece of UX. It's rare to find a developer who understands both Three.js and AI so deeply.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Marcus Thorne",
        role: "Founder, Quantum Ledger",
        content: "Working with Raviraj was like seeing the future of the web in real-time. Fast, responsive, and visually stunning. Truly exceptional work.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter"
                    >
                        Wall of <span className="text-gradient">Love.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        Insights from those who have experienced the intersection of intelligence and design.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl border border-white/10 relative group"
                        >
                            <Quote className="absolute top-6 right-8 text-accent/20 group-hover:text-accent/40 transition-colors" size={40} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-accent text-xs uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>

                            <p className="text-white/80 italic leading-relaxed">
                                &quot;{t.content}&quot;
                            </p>

                            <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
