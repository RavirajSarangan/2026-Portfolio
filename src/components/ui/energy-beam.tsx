"use client";

import React, { useEffect, useRef } from 'react';

interface EnergyBeamProps {
    projectId?: string;
    className?: string;
}

declare global {
    interface Window {
        UnicornStudio?: {
            init: () => void;
        };
    }
}

const EnergyBeam: React.FC<EnergyBeamProps> = ({
    projectId = "hRFfUymDGOHwtFe7evR2",
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initUnicorn = () => {
            if (window.UnicornStudio) {
                console.log('Initializing Unicorn Studio...');
                window.UnicornStudio.init();
            }
        };

        if (window.UnicornStudio) {
            initUnicorn();
            return;
        }

        const existingScript = document.querySelector('script[src*="unicornStudio"]');
        if (existingScript) {
            existingScript.addEventListener('load', initUnicorn);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js';
        script.async = true;
        script.onload = initUnicorn;
        document.head.appendChild(script);

        return () => {
            script.removeEventListener('load', initUnicorn);
        };
    }, [projectId]);

    return (
        <div className={`relative w-full h-full bg-black overflow-hidden ${className}`}>
            <div
                ref={containerRef}
                data-us-project={projectId}
                className="w-full h-full"
            />
        </div>
    );
};

export default EnergyBeam;
