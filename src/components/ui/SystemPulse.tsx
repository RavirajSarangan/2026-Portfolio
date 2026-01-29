"use client";

import React from "react";
import { motion } from "framer-motion";

interface SystemPulseProps {
    status: "online" | "offline" | "maintenance" | "syncing";
    label?: string;
    className?: string;
}

export const SystemPulse: React.FC<SystemPulseProps> = ({ status, label, className }) => {
    const colors = {
        online: "bg-emerald-500",
        offline: "bg-rose-500",
        maintenance: "bg-amber-500",
        syncing: "bg-blue-500",
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative flex h-3 w-3">
                <motion.span
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[status]}`}
                />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${colors[status]} shadow-[0_0_10px_2px] ${status === 'online' ? 'shadow-emerald-500/50' : status === 'offline' ? 'shadow-rose-500/50' : 'shadow-amber-500/50'}`} />
            </div>
            {label && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {label}
                </span>
            )}
        </div>
    );
};
