"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const FooterLinks = () => {
    const navItems = ["About", "Experience", "Skills", "Projects"];
    const resourceItems = ["Neural Lab", "A.I. Assistant", "Contact", "Resume"];
    const socials = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 relative z-10 p-8 glass rounded-3xl border-white/5">
            {/* Brand Section */}
            <div className="md:col-span-5">
                <div className="mb-8">
                    <span className="font-display text-2xl font-black tracking-tighter text-white">
                        RAVIRAJ<span className="text-accent underline decoration-accent/30 underline-offset-4">SARANGAN</span>
                    </span>
                </div>
                <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                    Architecting the future of digital interactivity through high-fidelity design
                    and robust engineering. Bridging the gap between imagination and reality.
                </p>
                <div className="flex items-center gap-4">
                    {socials.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            whileHover={{ scale: 1.1, translateY: -2 }}
                            className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
                            aria-label={social.label}
                        >
                            <social.icon size={18} />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Nav Columns */}
            <div className="md:col-span-2">
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">System</h4>
                <ul className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors text-sm font-medium tracking-wide">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="md:col-span-2">
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">Resources</h4>
                <ul className="flex flex-col gap-4">
                    {resourceItems.map((item) => (
                        <li key={item}>
                            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium tracking-wide">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-3">
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">Nexus Alpha</h4>
                <a href="mailto:hello@raviraj.dev" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all">
                    <Mail size={18} className="text-accent" />
                    <span className="text-sm font-medium">hello@raviraj.dev</span>
                </a>
                <p className="mt-8 text-[10px] uppercase tracking-widest text-white/20 font-bold leading-relaxed">
                    NEURAL GRID v2.0 <br /> READY FOR DEPLOYMENT.
                </p>
            </div>
        </div>
    );
};
