"use client";

import Navbar from "@/components/Navbar";
import DigitalNexus from "@/components/DigitalNexus";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

export default function NexusPage() {
    return (
        <main className="min-h-screen pt-20 bg-black">
            <Navbar />

            <div className="relative z-10 min-h-screen flex flex-col justify-center">
                <DigitalNexus />
            </div>

            <AIAssistant />
            <Footer />
        </main>
    );
}
