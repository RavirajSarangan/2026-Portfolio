import Navbar from "@/components/Navbar";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";
import Footer from "@/components/Footer";

export default function BlogPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <StellarCardGallerySingle />
            </div>
            <Footer />
        </main>
    );
}
