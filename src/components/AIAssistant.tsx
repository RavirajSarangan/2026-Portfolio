"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Mic, Command, ShieldCheck, Download } from "lucide-react";
import NeuralOrb from "./ui/neural-orb";
import { neuralAudio } from "../lib/audio";

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [lastAction, setLastAction] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isVoiceTyping, setIsVoiceTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const initVoiceEngine = () => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

        if (!SpeechRecognition) {
            setError("Browser does not support voice intelligence.");
            return;
        }

        if (recognitionRef.current) {
            try { recognitionRef.current.start(); } catch (e) { }
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: any) => {
            const latest = event.results[event.results.length - 1];
            const transcript = latest[0].transcript.toLowerCase();

            if (transcript.includes("sarangan") && !isOpen) {
                setIsOpen(true);
                speak("System active. I am listening.");
            }

            if (isOpen) setInput(transcript);
        };

        recognition.onerror = (event: any) => {
            // Silently handle expected permission errors
            if (event.error === 'not-allowed') {
                setIsListening(false);
                setError("Mic Blocked: Click the camera/mic icon in your address bar to allow.");
            } else if (event.error !== 'aborted') {
                console.warn("Mic Engine:", event.error);
            }
        };

        recognition.onend = () => {
            if (isListening) {
                setTimeout(() => {
                    try { recognition.start(); } catch (e) { }
                }, 100);
            }
        };

        try {
            recognition.start();
            recognitionRef.current = recognition;
        } catch (e) {
            console.error("Failed to start mic:", e);
        }
    };

    // Initial Messages Setup
    useEffect(() => {
        // Load session
        const saved = localStorage.getItem("sarangan_session");
        if (saved) setMessages(JSON.parse(saved));
        else setMessages([{ role: "assistant", content: "Hello, I am Sarangan. How shall we architect your vision today?" }]);

        // NOTE: We no longer auto-start the voice engine on mount to avoid 'not-allowed' errors.
        // The engine will initialize on the first user interaction (clicking the mic or opening the assistant).

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
        };
    }, []);

    // Auto-init when assistant opens (User Gesture)
    useEffect(() => {
        if (isOpen && !isListening && !error) {
            initVoiceEngine();
        }
    }, [isOpen]);

    // Sync input box when it opens
    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            // Premium English Voice Discovery
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v =>
                v.name === "Daniel" ||
                v.name === "Samantha" ||
                v.name.includes("Google US English") ||
                (v.lang.startsWith("en") && v.name.includes("Premium"))
            );

            if (preferred) utterance.voice = preferred;
            utterance.rate = 1.05;
            utterance.pitch = 1.0;

            utterance.onstart = () => {
                setIsSpeaking(true);
                window.dispatchEvent(new CustomEvent("neural-speak", { detail: { active: true } }));
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                window.dispatchEvent(new CustomEvent("neural-speak", { detail: { active: false } }));
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        if (isOpen) {
            neuralAudio.playActivate();
            if (inputRef.current) inputRef.current.focus();
        } else {
            if (typeof window !== 'undefined') {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        const updatedMessages = [...messages, { role: "user", content: userMsg }];
        setMessages(updatedMessages);
        setInput("");
        setIsTyping(true);
        neuralAudio.playTransmit();

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages })
            });

            const data = await res.json();
            if (data.content) {
                const finalMessages = [...updatedMessages, { role: "assistant", content: data.content }];
                setMessages(finalMessages);
                localStorage.setItem("sarangan_session", JSON.stringify(finalMessages));
                speak(data.content);

                // Handle Direct Actions
                if (data.action) {
                    setLastAction(data.action);
                    neuralAudio.playSync();

                    if (data.action === "HIGHLIGHT_PROJECT" && data.projectId) {
                        window.dispatchEvent(new CustomEvent("neural-highlight", { detail: { projectId: data.projectId } }));
                    }

                    setTimeout(() => setLastAction(null), 5000);
                }
            }
        } catch (error) {
            const errorMsg = "Neural synchronization failed. Please reconnect.";
            setMessages(prev => [...prev, { role: "assistant", content: errorMsg }]);
            speak(errorMsg);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Listening Indicator - Pulsing circle near the button */}
            {!isOpen && isListening && (
                <div className="fixed bottom-10 right-10 z-[40]">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-accent/20 rounded-full blur-md"
                    />
                </div>
            )}

            {/* Trigger Button - Floating Sparkle */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 12 }}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Assistant"
                    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-colors" />
                    <Sparkles className="text-accent relative z-10" size={24} />
                </motion.button>
            )}

            {/* Immersive Siri Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
                    >
                        {/* Action Feedback Overlay */}
                        <AnimatePresence>
                            {lastAction && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    className="absolute inset-0 z-50 flex items-center justify-center bg-accent/10 pointer-events-none"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        {lastAction === "GENERATE_REPORT" ? <Download size={64} className="text-accent animate-bounce" /> : <ShieldCheck size={64} className="text-emerald-500 animate-pulse" />}
                                        <p className="text-accent font-mono uppercase tracking-[0.5em] text-sm">{lastAction.replace("_", " ")}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Top Indicator */}
                        <div className="absolute top-12 flex items-center gap-2 opacity-20">
                            <Command size={14} className="text-white" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white">Sarangan Intelligence Online</span>
                        </div>

                        <div className="mb-12">
                            <NeuralOrb active={isSpeaking} />
                        </div>

                        {/* Response Text - Siri Style */}
                        <div className="max-w-4xl w-full text-center">
                            <AnimatePresence mode="wait">
                                {messages.length > 0 && (
                                    <motion.div
                                        key={messages[messages.length - 1].content}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.2 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {messages[messages.length - 1].role === "user" && (
                                            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 opacity-20">
                                                <p className="text-xl md:text-2xl font-display text-white italic">
                                                    "{messages[messages.length - 1].content}"
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-8 flex justify-center gap-1.5"
                                >
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-duration:0.6s]" />
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                                </motion.div>
                            )}
                        </div>

                        {/* Minimal Input Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-24 w-full max-w-2xl px-6"
                        >
                            <div className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder='Try calling "Hey Sarangan"'
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-6 py-5 text-xl outline-none focus:border-accent transition-all text-center placeholder:text-white/10"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleSend}
                                        className="text-white/20 hover:text-accent transition-colors"
                                    >
                                        <Send size={20} />
                                    </motion.button>
                                    <div className="h-4 w-[1px] bg-white/5" />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            if (!isListening) initVoiceEngine();
                                            setIsVoiceTyping(!isVoiceTyping);
                                        }}
                                        className={`p-1 rounded-full transition-all duration-500 ${isVoiceTyping ? 'text-accent shadow-[0_0_15px_rgba(139,92,246,0.5)]' : isListening ? 'text-white/40' : 'text-red-500/50'}`}
                                    >
                                        <Mic size={20} className={isVoiceTyping ? 'animate-pulse' : ''} />
                                    </motion.button>
                                </div>
                            </div>
                            {error ? (
                                <p className="mt-4 text-[10px] text-center text-red-500 uppercase tracking-[0.2em] animate-pulse">{error}</p>
                            ) : (
                                <p className="mt-4 text-[10px] text-center text-white/20 uppercase tracking-[0.2em]">
                                    {isListening ? "Background Listening Active" : "Click Mic to Enable Voice"}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
