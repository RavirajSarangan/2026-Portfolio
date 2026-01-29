"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="glass rounded-[3rem] overflow-hidden p-8 md:p-16 relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -z-10" />

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Info Side */}
                        <div className="lg:w-1/3">
                            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                                Let&apos;s Build Something <span className="text-gradient">Epic.</span>
                            </h2>
                            <p className="text-white/60 mb-12">
                                Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities and challenges.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                        <Mail size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Email Me</p>
                                        <p className="text-lg font-medium group-hover:text-accent transition-colors">hello@raviraj.dev</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                        <MessageSquare size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Text Me</p>
                                        <p className="text-lg font-medium group-hover:text-accent transition-colors">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="lg:w-2/3">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl"
                                    >
                                        <CheckCircle2 className="text-green-500 mb-6" size={64} />
                                        <h3 className="font-display text-3xl font-bold mb-4 text-gradient">Message Sent!</h3>
                                        <p className="text-white/60">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Name</label>
                                                <input
                                                    {...register("name")}
                                                    placeholder="John Doe"
                                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:bg-white/10 transition-all`}
                                                />
                                                {errors.name && <p className="text-red-500 text-[10px] ml-4 mt-1 font-bold uppercase">{errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email</label>
                                                <input
                                                    {...register("email")}
                                                    placeholder="john@example.com"
                                                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:bg-white/10 transition-all`}
                                                />
                                                {errors.email && <p className="text-red-500 text-[10px] ml-4 mt-1 font-bold uppercase">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Project Type</label>
                                            <select
                                                {...register("projectType")}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:bg-white/10 transition-all appearance-none"
                                            >
                                                <option className="bg-zinc-900" value="Web Development">Web Development</option>
                                                <option className="bg-zinc-900" value="Mobile App">Mobile App</option>
                                                <option className="bg-zinc-900" value="AI Integration">AI Integration</option>
                                                <option className="bg-zinc-900" value="UI/UX Design">UI/UX Design</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</label>
                                            <textarea
                                                {...register("message")}
                                                rows={4}
                                                placeholder="Tell me about your project..."
                                                className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none`}
                                            />
                                            {errors.message && <p className="text-red-500 text-[10px] ml-4 mt-1 font-bold uppercase">{errors.message.message}</p>}
                                        </div>

                                        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                                        <button
                                            disabled={isSubmitting}
                                            className="accent-gradient w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>Processing... <Loader2 className="animate-spin" size={18} /></>
                                            ) : (
                                                <>Send Message <Send size={18} /></>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
