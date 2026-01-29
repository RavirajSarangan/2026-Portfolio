"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Milestones", href: "/achievements" },
    { name: "Skills", href: "/#skills" },
    { name: "Lab", href: "/lab" },
    { name: "Projects", href: "/#projects" },
    { name: "Nexus", href: "/nexus" },
    { name: "Insights", href: "/blog" },
    { name: "Wall", href: "/testimonials" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-8"
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? "scale-95 shadow-2xl bg-black/40" : "scale-100 bg-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="font-display text-2xl font-bold tracking-tighter">
                        RAVIRAJ<span className="text-accent">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Socials & CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-3 mr-4 border-r border-white/10 pr-4">
                            <Link href="https://github.com/RavirajSarangan" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-white/50 hover:text-white transition-colors">
                                <Github size={18} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/sarangan-raviraj/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-white/50 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                        <button className="accent-gradient px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                            Hire Me
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-display font-semibold hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="accent-gradient mt-8 px-8 py-3 rounded-full text-lg font-semibold">
                            Get in Touch
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
