"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    year: string;
    achievements: string[];
    icon: React.ReactNode;
}

const educationItems: EducationItem[] = [
    {
        id: "edu1",
        institution: "Stanford University",
        degree: "M.S. in Computer Science",
        year: "2019",
        achievements: ["Specialization in Human-Computer Interaction", "Graduate Research Assistant in Vision Lab"],
        icon: <GraduationCap className="w-6 h-6" />
    },
    {
        id: "edu2",
        institution: "MIT Professional Education",
        degree: "Digital Transformation Certificate",
        year: "2021",
        achievements: ["Advanced Cloud Architecture", "Strategic Innovation Frameworks"],
        icon: <Award className="w-6 h-6" />
    },
    {
        id: "edu3",
        institution: "University of Tech",
        degree: "B.E. in Software Engineering",
        year: "2017",
        achievements: ["Dean's List 2015-2017", "Winner of National AI Hackathon"],
        icon: <BookOpen className="w-6 h-6" />
    }
];

export default function Education() {
    return (
        <section id="education" className="py-24 relative overflow-hidden bg-black/20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
                >
                    {/* Background Decorative Element */}
                    <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-accent/5 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                                Knowledge <span className="text-gradient">Synthesis.</span>
                            </h2>
                            <p className="text-white/40 text-lg">Foundation of theoretical and applied engineering.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {educationItems.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="glass p-8 rounded-3xl border border-white/5 hover:border-accent/40 transition-all flex flex-col items-center text-center group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                        {edu.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                                    <p className="text-white/60 font-medium italic mb-4">{edu.institution}</p>
                                    <div className="w-full h-px bg-white/5 my-4" />
                                    <div className="space-y-3">
                                        {edu.achievements.map((item, i) => (
                                            <p key={i} className="text-xs text-white/40 leading-relaxed">
                                                • {item}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-6 text-[10px] font-black tracking-widest text-accent uppercase">
                                        CLASS OF {edu.year}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
