"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Footer3D from "./ui/Footer3D";
import { FooterLinks } from "./FooterLinks";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-32 pb-12 border-t border-white/5 overflow-hidden min-h-[80vh] flex flex-col justify-end">
            {/* 3D Neural Nexus Background */}
            <div className="absolute inset-0 z-0">
                <Footer3D />
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Subtle Brand Watermark */}
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                <span className="text-[25vw] font-black text-white/[0.03] tracking-tighter leading-none">
                    NEXUS
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <FooterLinks />

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
                        © {currentYear} RAVIRAJ SARANGAN. NEXUS ARCHITECTURE.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05, translateY: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 text-white/30 hover:text-white transition-colors group"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to top</span>
                        <div className="w-8 h-8 glass rounded-full flex items-center justify-center group-hover:border-white/20 transition-all border border-transparent">
                            <ArrowUp size={14} />
                        </div>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
