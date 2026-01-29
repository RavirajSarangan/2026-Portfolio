import Navbar from "@/components/Navbar";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export default function AchievementsPage() {
    return (
        <main className="min-h-screen pt-20">
            <Navbar />
            <Achievements />
            <Footer />
        </main>
    );
}
