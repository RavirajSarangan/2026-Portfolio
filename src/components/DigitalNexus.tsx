"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemPulse } from "./ui/SystemPulse";
import { Activity, Database, Globe, Shield, Terminal, Loader2 } from "lucide-react";

interface System {
    id: string;
    name: string;
    status: string;
    uptime: string;
    latency: string;
    description: string;
}

interface Log {
    time: string;
    msg: string;
    type: string;
}

const iconMap: Record<string, any> = {
    "isdn-core": Globe,
    "rdc-nexus": Database,
    "sales-portal": Terminal,
    "auth-sso": Shield
};

export default function DigitalNexus() {
    const [systems, setSystems] = useState<System[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/systems/status");
            const data = await res.json();
            setSystems(data.systems);
            setLogs(data.logs);
        } catch (error) {
            console.error("Failed to fetch system status:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="nexus" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            The Digital <span className="text-gradient">Nexus.</span>
                        </h2>
                        <p className="text-white/60 text-lg">
                            A real-time command center monitoring the health and integration of the overall system architecture.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Live Monitoring Active</span>
                    </div>
                </div>

                {loading ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {systems.map((system, index) => {
                                const Icon = iconMap[system.id] || Globe;
                                return (
                                    <motion.div
                                        key={system.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
                                    >
                                        <span className="absolute -right-4 -bottom-4 text-8xl font-black text-white/[0.02] pointer-events-none group-hover:text-white/[0.05] transition-colors">
                                            0{index + 1}
                                        </span>

                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-accent/10 transition-colors">
                                                <Icon className="w-6 h-6 text-white/40 group-hover:text-accent transition-colors" />
                                            </div>
                                            <SystemPulse status={system.status as any} label={system.status} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2">{system.name}</h3>
                                        <p className="text-white/40 text-sm mb-6 line-clamp-2">
                                            {system.description}
                                        </p>

                                        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Uptime</p>
                                                <p className="text-sm font-display font-bold text-white/60">{system.uptime}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Latency</p>
                                                <p className="text-sm font-display font-bold text-white/60">{system.latency}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-12 glass p-8 rounded-3xl border border-white/5 bg-black/40"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Activity className="w-5 h-5 text-accent" />
                                <h4 className="font-display font-bold text-white uppercase tracking-widest">Global Activity Feed</h4>
                                <div className="flex-grow border-t border-white/5" />
                            </div>

                            <div className="space-y-4 font-mono text-xs">
                                {logs.map((log, i) => (
                                    <div key={i} className="flex gap-4 items-start opacity-60 hover:opacity-100 transition-opacity">
                                        <span className="text-white/20 whitespace-nowrap">[{log.time}]</span>
                                        <span className={
                                            log.type === 'success' ? 'text-emerald-400' :
                                                log.type === 'warning' ? 'text-amber-400' :
                                                    'text-blue-400'
                                        }>
                                            {log.msg}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}

