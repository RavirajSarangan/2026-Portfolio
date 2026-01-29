"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorldMap } from "@/components/ui/map";
import { motion } from "framer-motion";

export default function LabPage() {
    return (
        <main className="min-h-screen pt-20 bg-black overflow-hidden">
            <Navbar />

            <div className="py-20 w-full relative">
                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4">
                            Global <span className="text-accent">Clients</span>
                        </h2>
                        <p className="text-sm md:text-lg text-white/40 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                            Delivering world-class digital solutions to clients across continents.
                            From India to the world — trusted by businesses in 7+ countries.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    <WorldMap
                        dots={[
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" }, // India (Central)
                                end: { lat: 51.5074, lng: -0.1278, label: "London" }, // London, UK
                            },
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" },
                                end: { lat: 56.1304, lng: -106.3468, label: "Canada" }, // Canada (Central)
                            },
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" },
                                end: { lat: -25.2744, lng: 133.7751, label: "Australia" }, // Australia (Central)
                            },
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" },
                                end: { lat: -26.5225, lng: 31.4659, label: "Swaziland" }, // Swaziland
                            },
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" },
                                end: { lat: 6.9271, lng: 79.8612, label: "Sri Lanka" }, // Colombo, Sri Lanka
                            },
                            {
                                start: { lat: 20.5937, lng: 78.9629, label: "India" },
                                end: { lat: 37.0902, lng: -95.7129, label: "USA" }, // USA (Central)
                            },
                        ]}
                    />
                </div>

                {/* Global Statistics */}
                <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Countries Served", value: "7+" },
                        { label: "Happy Clients", value: "50+" },
                        { label: "Projects Delivered", value: "100+" },
                        { label: "Client Satisfaction", value: "99%" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-6 rounded-2xl border border-white/5 text-center"
                        >
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-display font-bold text-white tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
