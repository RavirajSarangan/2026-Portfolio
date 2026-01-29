"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-square max-w-md mx-auto group">
                            <div className="absolute inset-0 accent-gradient rounded-3xl rotate-6 scale-95 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                            <div className="absolute inset-0 glass rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                            <div className="absolute inset-0 glass rounded-3xl overflow-hidden border border-white/10">
                                <Image
                                    src="/images/mockup.png"
                                    alt="Design Frame"
                                    fill
                                    className="object-cover transition-all duration-500 opacity-40 blur-sm"
                                />
                                <Image
                                    src="/images/portrait.jpg"
                                    alt="Raviraj Sarangan"
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 relative z-10"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20" />
                            </div>

                            {/* Floating Stat 1 */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="absolute -left-16 lg:-left-20 top-1/4 glass p-4 rounded-2xl hidden md:block z-30 shadow-2xl border border-white/20"
                            >
                                <p className="text-3xl font-bold text-gradient">5+</p>
                                <p className="text-[10px] whitespace-nowrap uppercase tracking-widest text-white/60 font-semibold">Years Exp.</p>
                            </motion.div>

                            {/* Floating Stat 2 */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="absolute -right-16 lg:-right-20 bottom-1/4 glass p-4 rounded-2xl hidden md:block z-30 shadow-2xl border border-white/20"
                            >
                                <p className="text-3xl font-bold text-gradient">50+</p>
                                <p className="text-[10px] whitespace-nowrap uppercase tracking-widest text-white/60 font-semibold">Projects</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                                The Mind Behind The <span className="text-gradient">Machine.</span>
                            </h2>
                            <p className="text-white/60 text-lg mb-6 leading-relaxed">
                                I am a strategic thinker and technical architect with a passion for building
                                scalable digital products. My journey began with a curiosity for how things
                                are built, which evolved into a career of solving complex problems through code.
                            </p>
                            <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                I specialize in bridging the gap between design and development, ensuring
                                that every line of code serves a purpose and every pixel has a place. My
                                approach is data-driven, user-centric, and performance-focused.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="font-display font-bold text-white mb-2 italic">Design Driven</h4>
                                    <p className="text-white/40 text-sm">Focusing on aesthetics that convert and engage.</p>
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-white mb-2 italic">Tech Focused</h4>
                                    <p className="text-white/40 text-sm">Using the latest stacks to ensure future-proof solutions.</p>
                                </div>
                            </div>

                            <button className="text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                                Read Full Story
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
