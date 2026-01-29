"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NeuralOrb({ active = false }: { active?: boolean }) {
    return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            {/* Outer Pulse Ring */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
                className="absolute inset-0 border-2 border-accent/30 rounded-full"
            />

            {/* Second Pulse Ring */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0, 0.2],
                }}
                transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
                className="absolute inset-0 border border-accent/20 rounded-full"
            />

            {/* Core Glow */}
            <motion.div
                animate={{
                    scale: active ? [1.2, 1.6, 1.2] : [1, 1.3, 1],
                    opacity: active ? [0.8, 1, 0.8] : [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: active ? 0.6 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-accent/40 rounded-full blur-3xl"
            />

            {/* Rotating Dashed Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-2 rounded-full border border-white/10 border-dashed"
            />

            {/* Counter-Rotating Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-6 rounded-full border border-accent/20 border-dotted"
            />

            {/* Inner Liquid Orb */}
            <motion.div
                animate={{
                    borderRadius: [
                        "40% 60% 70% 30% / 40% 50% 60% 50%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "50% 40% 30% 70% / 60% 40% 70% 30%",
                        "40% 60% 70% 30% / 40% 50% 60% 50%"
                    ],
                    scale: active ? [1, 1.15, 1] : [1, 1.05, 1],
                }}
                transition={{
                    duration: active ? 1.5 : 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className={`w-32 h-32 md:w-40 md:h-40 accent-gradient rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 ${active ? 'shadow-[0_0_100px_rgba(139,92,246,0.9)]' : 'shadow-[0_0_60px_rgba(139,92,246,0.6)]'}`}
            >
                {/* Internal Flowing Energy */}
                <motion.div
                    animate={{
                        x: [0, 20, -10, 0],
                        y: [0, -15, 10, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-16 h-16 bg-white/30 rounded-full blur-xl"
                />

                {/* Secondary Energy Blob */}
                <motion.div
                    animate={{
                        x: [0, -15, 20, 0],
                        y: [0, 10, -20, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-12 h-12 bg-accent/40 rounded-full blur-lg"
                />

                {/* Core Highlight */}
                <div className="absolute inset-0 opacity-40">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_50%)]" />
                </div>
            </motion.div>

            {/* Orbiting particles - More of them */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: active ? 4 + i * 0.5 : 12 + i,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ rotate: `${i * 45}deg` }}
                >
                    <motion.div
                        animate={{
                            scale: active ? [1, 2, 1] : [1, 1.3, 1],
                            opacity: active ? [0.8, 1, 0.8] : [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                        }}
                        className={`w-1.5 h-1.5 rounded-full absolute top-0 left-1/2 -translate-x-1/2 ${active ? 'bg-white shadow-[0_0_12px_#fff]' : 'bg-accent/60'}`}
                    />
                </motion.div>
            ))}

            {/* Floating Sparkles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    animate={{
                        y: [-20, 20, -20],
                        x: [10, -10, 10],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + i,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${30 + i * 10}%`,
                    }}
                />
            ))}
        </div>
    );
}
