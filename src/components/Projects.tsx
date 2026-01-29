"use client";

import React from "react";
import { motion } from "framer-motion";

import { AnimatedFolder, Project } from "./ui/3d-folder";

const categories = [
    {
        title: "Intelligence",
        gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
        projects: [
            { id: "ai1", title: "EcoSphere AI", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
            { id: "ai2", title: "Neural Mesh", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" },
            { id: "ai3", title: "Vision API", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" }
        ] as Project[]
    },
    {
        title: "Finance",
        gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
        projects: [
            { id: "f1", title: "Quantum Ledger", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop" },
            { id: "f2", title: "DeFi Pulse", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop" },
            { id: "f3", title: "Asset Vault", image: "https://images.unsplash.com/photo-1642104704074-907c0698bcd9?q=80&w=2127&auto=format&fit=crop" }
        ] as Project[]
    },
    {
        title: "Creative",
        gradient: "linear-gradient(135deg, #fce38a, #f38181)",
        projects: [
            { id: "c1", title: "Lumina Studio", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" },
            { id: "c2", title: "Synthetix UI", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" },
            { id: "c3", title: "Motion Lab", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070&auto=format&fit=crop" }
        ] as Project[]
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            Selected <span className="text-gradient">Projects.</span>
                        </h2>
                        <p className="text-white/60 text-lg">
                            An interactive catalog of modular excellence. Explore categories by hovering over the digital archives.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                    {categories.map((folder, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="w-full"
                        >
                            <AnimatedFolder
                                title={folder.title}
                                projects={folder.projects}
                                gradient={folder.gradient}
                                className="w-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ size, className }: { size?: number; className?: string }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}
