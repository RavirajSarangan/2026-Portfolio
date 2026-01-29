import Navbar from "@/components/Navbar";
import TubesCursor from "@/components/ui/tubes-cursor";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <TubesCursor>
                <div className="pt-20">
                    <Testimonials />
                </div>
            </TubesCursor>
            <Footer />
        </main>
    );
}
