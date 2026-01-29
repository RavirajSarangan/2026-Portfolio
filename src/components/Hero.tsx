import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Camera, Move, Activity } from "lucide-react";
import { InteractiveButton } from "./ui/3d-button";
import Scene3D from "./Scene3D";

interface HeroProps {
    isInteractive: boolean;
    setIsInteractive: (val: boolean) => void;
}

export default function Hero({ isInteractive, setIsInteractive }: HeroProps) {
    const [pulseData, setPulseData] = useState<{ pulseScore: number; marketTrend: string; commitDensity: number } | null>(null);

    useEffect(() => {
        const fetchPulse = async () => {
            try {
                const res = await fetch("/api/market/pulse");
                const data = await res.json();
                setPulseData(data);
            } catch (e) {
                console.error("Pulse sync failed");
            }
        };

        fetchPulse();
        const interval = setInterval(fetchPulse, 30000); // Sync every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <Scene3D isInteractive={isInteractive} pulseScore={pulseData?.pulseScore || 0.5} />

            {/* Global Sync Indicator */}
            <div className="absolute top-28 left-10 z-20 flex items-center gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="text-accent animate-pulse" size={12} />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Global Synchronization</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-24 bg-white/10 overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="h-full w-full bg-accent"
                            />
                        </div>
                        <span className="text-[10px] font-mono text-accent">
                            {pulseData ? `${(pulseData.pulseScore * 100).toFixed(1)}%` : "SYNCING..."}
                        </span>
                    </div>
                </div>
            </div>

            {/* Camera Mode Toggle */}
            <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Camera Mode</p>
                <div className="flex glass rounded-2xl p-1 border border-white/10">
                    <button
                        onClick={() => setIsInteractive(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${!isInteractive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-white/40 hover:text-white'}`}
                    >
                        <Camera size={14} />
                        Cinematic
                    </button>
                    <button
                        onClick={() => setIsInteractive(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isInteractive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-white/40 hover:text-white'}`}
                    >
                        <Move size={14} />
                        Free Roam
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <AnimatePresence mode="wait">
                    {!isInteractive && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="glass px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-8 flex items-center gap-2"
                            >
                                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                                {pulseData?.marketTrend === 'bullish' ? 'Strategic Growth Active' : 'Market Resilience Protocol'}
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8"
                            >
                                Engineering <br />
                                <span className="text-gradient">Digital Excellence.</span>
                            </motion.h1>

                            {/* Subheader */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed mb-12"
                            >
                                I&apos;m <span className="text-white font-medium">Raviraj Sarangan</span>, a Full-Stack Developer & AI Specialist crafting
                                immersive digital experiences that bridge the gap between imagination and reality.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row items-center gap-6"
                            >
                                <Link href="/lab" className="cursor-pointer">
                                    <InteractiveButton />
                                </Link>

                                <div className="flex items-center gap-6">
                                    {[
                                        { icon: Github, href: "https://github.com/RavirajSarangan" },
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/sarangan-raviraj/" }
                                    ].map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/60 hover:text-white hover:scale-110 transition-all"
                                        >
                                            <item.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
}
