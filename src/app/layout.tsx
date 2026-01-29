import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClickSpark from "@/components/ui/click-spark";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Faster text rendering
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap", // Faster text rendering
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raviraj.dev"),
  title: "Raviraj Sarangan | Digital Brand Hub 2026",
  description: "A high-performance, future-ready portfolio built with Next.js, Framer Motion, and Three.js. Specializing in AI, Full-Stack Dev, and UI/UX.",
  keywords: ["Raviraj Sarangan", "Portfolio", "Full-Stack Developer", "AI Specialist", "Digital Brand Hub", "2026 Design"],
  authors: [{ name: "Raviraj Sarangan" }],
  openGraph: {
    title: "Raviraj Sarangan | Digital Brand Hub",
    description: "Explore the intersection of design and engineering in this 2026-ready portfolio.",
    url: "https://raviraj.dev",
    siteName: "Raviraj Sarangan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raviraj Sarangan | Digital Brand Hub",
    description: "Engineering Digital Excellence with Next.js & Three.js.",
    creator: "@raviraj_sarangan",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-purple-500/30`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to content link for keyboard accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000000_100%)]" />
          <ClickSpark
            sparkColor='#a855f7'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            {children}
          </ClickSpark>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
