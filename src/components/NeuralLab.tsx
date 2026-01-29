"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import KnowledgeGraph3D from "./ui/knowledge-graph-3d";
import { Zap, Cpu, Network } from "lucide-react";

export default function NeuralLab() {
    const [pulses, setPulses] = React.useState<{ id: number; x: number; y: number }[]>([]);

    const addPulse = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setPulses((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
            setPulses((prev) => prev.filter((p) => p.id !== id));
        }, 1000);
    };

    return (
        <section
            id="neural-lab"
            className="h-[80vh] md:h-[90vh] relative overflow-hidden group cursor-crosshair"
            onClick={addPulse}
        >
            {/* 3D Knowledge Graph Background */}
            <KnowledgeGraph3D />

            {/* Interactive Pulses */}
            <div className="absolute inset-0 z-5 pointer-events-none">
                <AnimatePresence>
                    {pulses.map((pulse) => (
                        <motion.div
                            key={pulse.id}
                            initial={{ scale: 0, opacity: 0.8 }}
                            animate={{ scale: 6, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                left: pulse.x,
                                top: pulse.y,
                                transform: "translate(-50%, -50%)",
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                border: "2px solid rgba(139, 92, 246, 0.5)",
                                boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Content Overlay */}
            <div className="container mx-auto px-6 h-full relative z-10 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-4xl pointer-events-none"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <Zap size={12} className="text-accent animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Neural Engine v3.0 - Active Simulation</span>
                    </div>

                    <h2 className="font-display text-4xl md:text-7xl font-bold mb-8 leading-tight">
                        Visualizing the <br />
                        <span className="text-gradient">Logic of Innovation.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            { icon: Cpu, label: "Neural Compute", val: "1.2 PetaFLOPs" },
                            { icon: Network, label: "Sync Latency", val: "0.04ms" },
                            { icon: Zap, label: "Knowledge Density", val: "99.8%" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center"
                            >
                                <stat.icon className="w-5 h-5 text-white/30 mb-2" />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</span>
                                <span className="text-sm font-display font-bold text-white/80">{stat.val}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
        </section>
    );
}

