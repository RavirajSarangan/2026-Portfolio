"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
    {
        title: "The Future of Neural Interfaces in Web Design",
        date: "Jan 15, 2026",
        readTime: "5 min read",
        excerpt: "Exploring how LLMs and real-time neural feedback are transforming the way we think about user interactivity.",
        category: "AI & Design",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4628c6750?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Optimizing Three.js for Production Latency",
        date: "Dec 20, 2025",
        readTime: "8 min read",
        excerpt: "A deep dive into shader optimization and geometry instancing for high-performance 3D web experiences.",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Architecting Scalable Next.js 16 Applications",
        date: "Nov 12, 2025",
        readTime: "6 min read",
        excerpt: "Best practices for building robust systems that scale to millions of users without compromising speed.",
        category: "Fullstack",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    }
];

export default function Blog() {
    return (
        <section id="blog" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            Neural <span className="text-gradient">Insights.</span>
                        </h2>
                        <p className="text-white/60 text-lg">
                            Writing at the intersection of intelligence, design, and engineering.
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-full border border-white/10 glass text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-colors"
                    >
                        View All Posts
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-64 mb-6 rounded-3xl overflow-hidden border border-white/5">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                                    {post.category}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white/40 text-xs">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="pt-2 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                    Read Article <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
