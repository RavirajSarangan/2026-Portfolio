/**
 * Design System Constants
 * 
 * These tokens define the visual identity of the Raviraj Sarangan ecosystem.
 * Sharing these constants ensures consistent branding across all portals (Portfolio, ISDN, RDC).
 */

export const DESIGN_TOKENS = {
    colors: {
        accent: "#a78bfa", // Purple-400
        background: "#000000",
        surface: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
    },
    gradients: {
        primary: "linear-gradient(135deg, #a78bfa 0%, #d946ef 100%)", // Purple to Pink
        secondary: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", // Blue to Dark Blue
        glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        dark: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
    },
    animations: {
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom cubic-bezier for premium feel
        hover: { scale: 1.02, transition: { duration: 0.2 } },
    },
    glass: "backdrop-blur-xl bg-white/5 border border-white/10",
};

export const UI_MESSAGES = {
    system: {
        booting: "Initializing Neural Nexus...",
        online: "Ecosystem Online. All systems operational.",
        error: "System conflict detected in localized shard.",
    }
};
