"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useSpring } from "framer-motion";

// Generate particles outside to satisfy purity rules
const PARTICLE_COUNT = 2000;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
    PARTICLE_POSITIONS[i * 3] = (Math.random() - 0.5) * 15;
    PARTICLE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 15;
    PARTICLE_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 15;
}

// Generate cluster positions outside
const CLUSTER_POSITIONS = new Float32Array(500 * 3);
for (let i = 0; i < 500 * 3; i++) {
    CLUSTER_POSITIONS[i] = (Math.random() - 0.5) * 10;
}

// Cluster logic

function GeometricCluster({ isInteractive, color, pulseScore }: { isInteractive: boolean; color: THREE.Color; pulseScore: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();
        const scoreMod = pulseScore * 2; // Intensifier

        // Subtle auto-rotation modulated by pulse
        groupRef.current.rotation.y += 0.005 * scoreMod;
        groupRef.current.rotation.z += 0.002 * scoreMod;

        // Neural Morphing Effect for Core
        if (coreRef.current) {
            const pulse = (Math.sin(time * 2 * scoreMod) * 0.1 + 1) * pulseScore;
            const morph = Math.sin(time * 3) * 0.05;
            coreRef.current.scale.set(pulse + morph, pulse - morph, pulse + morph);

            if (coreRef.current.material instanceof THREE.MeshStandardMaterial) {
                coreRef.current.material.opacity = 0.2 + Math.abs(Math.cos(time)) * 0.2 * pulseScore;
                coreRef.current.material.emissiveIntensity = (0.5 + Math.abs(Math.sin(time * 3)) * 0.5) * scoreMod;
                coreRef.current.material.color.copy(color);
                coreRef.current.material.emissive.copy(color);
            }
        }

        if (!isInteractive) {
            const targetX = mouse.x * 0.5;
            const targetY = mouse.y * 0.5;
            groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
            groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Core */}
            <Float speed={2 * pulseScore} rotationIntensity={2} floatIntensity={1}>
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>

            {/* Rotating Nodes with Spatial UI Labels */}
            {[...Array(6)].map((_, i) => (
                <Float
                    key={i}
                    speed={(1.5 + i * 0.2) * pulseScore}
                    rotationIntensity={1}
                    floatIntensity={0.5}
                >
                    <mesh
                        position={[
                            Math.sin(i * (Math.PI / 3)) * 2,
                            Math.cos(i * (Math.PI / 3)) * 2,
                            Math.sin(i) * 1
                        ]}
                    >
                        <octahedronGeometry args={[0.3, 0]} />
                        <meshStandardMaterial
                            color={color}
                            wireframe
                            emissive={color}
                            emissiveIntensity={1}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Connections (Visual Lines) */}
            <Points positions={CLUSTER_POSITIONS} stride={3}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03 * pulseScore}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.2 * pulseScore}
                />
            </Points>
        </group>
    );
}

function ParticleField({ color, pulseScore }: { color: THREE.Color; pulseScore: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    const initialPositions = useMemo(() => PARTICLE_POSITIONS.slice(), []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const originalX = initialPositions[ix];
            const originalY = initialPositions[iy];
            const originalZ = initialPositions[iz];

            const dx = mouseX - originalX;
            const dy = mouseY - originalY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, 1.5 - dist / 4) * pulseScore;

            positions[ix] = originalX + (dx * force * 0.2) + Math.sin(time + originalY) * 0.1 * pulseScore;
            positions[iy] = originalY + (dy * force * 0.2) + Math.cos(time + originalX) * 0.1 * pulseScore;
            positions[iz] = originalZ + Math.sin(time * 0.5 + originalX) * 0.2;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.02 * pulseScore;
    });

    return (
        <Points ref={pointsRef} positions={PARTICLE_POSITIONS} stride={3}>
            <PointMaterial
                transparent
                color={color}
                size={0.025 * pulseScore}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function SmoothScrollCamera({ isInteractive, onStateChange }: { isInteractive: boolean; onStateChange: (p: number) => void }) {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 35,
        restDelta: 0.001
    });

    useFrame((state) => {
        const p = smoothProgress.get();
        onStateChange(p);

        if (isInteractive) return;

        const camera = state.camera;
        const time = state.clock.getElapsedTime();

        const targetPos = new THREE.Vector3(0, 0, 8);
        const lookAtPos = new THREE.Vector3(0, 0, 0);

        if (p < 0.2) {
            targetPos.set(0, 0, 8);
        } else if (p < 0.4) {
            const subP = (p - 0.2) / 0.2;
            targetPos.set(
                THREE.MathUtils.lerp(0, 5, subP),
                THREE.MathUtils.lerp(0, 1, subP),
                THREE.MathUtils.lerp(8, 10, subP)
            );
            lookAtPos.set(0, 0, 0);
        } else if (p < 0.6) {
            const subP = (p - 0.4) / 0.2;
            targetPos.set(
                THREE.MathUtils.lerp(5, 0, subP),
                THREE.MathUtils.lerp(1, 6, subP),
                THREE.MathUtils.lerp(10, 4, subP)
            );
            lookAtPos.set(0, 0, 0);
        } else if (p < 0.8) {
            const subP = (p - 0.6) / 0.2;
            targetPos.set(
                THREE.MathUtils.lerp(0, -4, subP),
                THREE.MathUtils.lerp(6, 2, subP),
                THREE.MathUtils.lerp(4, 12, subP)
            );
            lookAtPos.set(0, 0, 2);
        } else {
            const subP = (p - 0.8) / 0.2;
            targetPos.set(
                THREE.MathUtils.lerp(-4, 0, subP),
                THREE.MathUtils.lerp(2, -2, subP),
                THREE.MathUtils.lerp(12, 15, subP)
            );
            lookAtPos.set(0, 0, 0);
        }

        const noiseX = Math.sin(time * 0.5) * 0.1;
        const noiseY = Math.cos(time * 0.4) * 0.1;

        camera.position.lerp(targetPos.add(new THREE.Vector3(noiseX, noiseY, 0)), 0.05);
        camera.lookAt(lookAtPos);
    });

    return null;
}

interface Scene3DProps {
    isInteractive?: boolean;
    pulseScore?: number;
}

export default function Scene3D({ isInteractive = false, pulseScore: propPulseScore = 0.5 }: Scene3DProps) {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [voiceActivity, setVoiceActivity] = React.useState(0);

    // Neural Resonance: React to AI speech
    useEffect(() => {
        const handleSpeak = (e: any) => {
            setVoiceActivity(e.detail?.active ? 1 : 0);
        };
        window.addEventListener("neural-speak", handleSpeak);
        return () => window.removeEventListener("neural-speak", handleSpeak);
    }, []);

    const pulseScore = useMemo(() => {
        return propPulseScore + (voiceActivity * 0.5);
    }, [propPulseScore, voiceActivity]);

    const primaryColor = useMemo(() => {
        const p = scrollProgress;
        const color = new THREE.Color("#8b5cf6");
        const target = new THREE.Color("#06b6d4");
        return color.lerp(target, p);
    }, [scrollProgress]);

    return (
        <div className={`absolute inset-0 -z-10 h-full w-full transition-opacity duration-1000 ${isInteractive ? 'opacity-100' : 'opacity-80'}`}>
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={2 * pulseScore} color={primaryColor} />
                <pointLight position={[-10, -10, -10]} intensity={1 * pulseScore} color="#d946ef" />

                <SmoothScrollCamera isInteractive={isInteractive} onStateChange={setScrollProgress} />
                <GeometricCluster isInteractive={isInteractive} color={primaryColor} pulseScore={pulseScore} />
                <ParticleField color={primaryColor} pulseScore={pulseScore} />

                {isInteractive && (
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={4}
                        maxDistance={12}
                        autoRotate
                        autoRotateSpeed={0.5 * pulseScore}
                        makeDefault
                    />
                )}

                <fog attach="fog" args={["#000000", 5, 20]} />
            </Canvas>
        </div>
    );
}

