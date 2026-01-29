"use client";

import React, { useEffect, useRef } from 'react';

interface TubesApp {
    tubes: {
        setColors: (colors: string[]) => void;
        setLightsColors: (colors: string[]) => void;
    };
    dispose?: () => void;
}

/**
 * TubesCursor Component
 * - Encapsulates a high-performance 3D cursor animation using Three.js logic.
 * - Dynamically imports the cursor logic from a local file to remain lightweight and Turbopack-friendly.
 */
export default function TubesCursor({ children }: { children?: React.ReactNode }) {
    // useRef to get a persistent reference to the canvas element
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // useRef to hold the animation instance so we can call its methods
    const appRef = useRef<TubesApp | null>(null);

    /**
     * Generates an array of random hex color strings.
     * @param {number} count - The number of random colors to generate.
     * @returns {string[]} An array of color strings.
     */
    const randomColors = (count: number): string[] => {
        return new Array(count)
            .fill(0)
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    };

    // This effect runs once when the component mounts
    useEffect(() => {
        // Delaying the initialization ensures the DOM is fully painted and ready.
        const initTimer = setTimeout(() => {
            import('../../lib/tubes1.min.js')
                .then(module => {
                    const TubesCursorLogic = module.default;

                    // Ensure the canvas element is still available before initializing
                    if (canvasRef.current) {
                        // Initialize the TubesCursor animation
                        const app = TubesCursorLogic(canvasRef.current, {
                            tubes: {
                                colors: ["#5e72e4", "#8965e0", "#f5365c"],
                                lights: {
                                    intensity: 200,
                                    colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"]
                                }
                            }
                        });
                        // Store the instance in our ref for later use
                        appRef.current = app;
                    }
                })
                .catch(err => console.error("Failed to load TubesCursor module:", err));
        }, 100);

        // Cleanup function to dispose of the animation and clear the timeout
        return () => {
            clearTimeout(initTimer);
            if (appRef.current && typeof appRef.current.dispose === 'function') {
                appRef.current.dispose();
            }
        };
    }, []);

    // Handles click events on the main container
    const handleClick = () => {
        if (appRef.current) {
            const newTubeColors = randomColors(3);
            const newLightColors = randomColors(4);

            // Update the colors in the running animation
            appRef.current.tubes.setColors(newTubeColors);
            appRef.current.tubes.setLightsColors(newLightColors);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="relative min-h-screen w-full bg-black font-sans overflow-x-hidden cursor-pointer"
        >
            <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
