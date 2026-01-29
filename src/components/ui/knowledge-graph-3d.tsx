"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const PROJECTS = [
    { id: 1, name: "ISDN Logistics", color: "#8b5cf6", position: [2, 1, -1], stack: ["Next.js", "Redis", "Kafka"] },
    { id: 2, name: "RDC Nexus", color: "#06b6d4", position: [-2, -1, 1], stack: ["Golang", "Three.js", "gRPC"] },
    { id: 3, name: "Neural Lab", color: "#d946ef", position: [0, 1.5, -2], stack: ["React Three Fiber", "Web Audio API"] }
];

function ProjectNode({ project, isSelected, onSelect }: { project: any; isSelected: boolean; onSelect: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Hover/Selection scale
        const targetScale = isSelected ? 1.5 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            meshRef.current.material.emissiveIntensity = isSelected ? 4 : 1 + Math.sin(time * 2) * 0.5;
        }
    });

    return (
        <group position={project.position as any}>
            <mesh
                ref={meshRef}
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "auto")}
            >
                <icosahedronGeometry args={[0.2, 1]} />
                <meshStandardMaterial
                    color={project.color}
                    emissive={project.color}
                    emissiveIntensity={1}
                    wireframe={!isSelected}
                />
            </mesh>

            <Html distanceFactor={10} position={[0, 0.4, 0]} center>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`whitespace-nowrap flex flex-col items-center gap-2 pointer-events-none transition-all duration-500 ${isSelected ? 'scale-110' : 'opacity-40'}`}
                >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        {project.name}
                    </span>

                    <AnimatePresence>
                        {isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex gap-1"
                            >
                                {project.stack.map((tech: string) => (
                                    <span key={tech} className="text-[8px] bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.5 rounded uppercase font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Html>
        </group>
    );
}

function GraphPoints() {
    const pointsRef = useRef<any>(null);
    const { mouse, viewport } = useThree();

    const count = 1500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2; // Original sphere size
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        pointsRef.current.rotation.y += 0.001;

        // Dynamic mouse interaction
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, x * 0.1, 0.1);
        pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, y * 0.1, 0.1);
    });

    return (
        <group ref={pointsRef}>
            <Points positions={positions} stride={3}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function Connections() {
    const linesRef = useRef<any>(null);
    const count = 20;

    const lines = useMemo(() => {
        const segments: THREE.Vector3[][] = [];
        for (let i = 0; i < count; i++) {
            const start = new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            const end = new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            segments.push([start, end]);
        }
        return segments;
    }, []);

    useFrame(() => {
        if (linesRef.current) {
            linesRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={linesRef}>
            {lines.map((segment, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[new Float32Array([
                                segment[0].x, segment[0].y, segment[0].z,
                                segment[1].x, segment[1].y, segment[1].z
                            ]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color="#8b5cf6" transparent opacity={0.1} />
                </line>
            ))}
        </group>
    );
}

function AutonomousAgent({ color, speed }: { color: string; speed: number }) {
    const agentRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!agentRef.current || !orbitRef.current) return;
        const time = state.clock.getElapsedTime() * speed;

        orbitRef.current.rotation.y = time * 0.5;
        orbitRef.current.rotation.z = Math.sin(time) * 0.5;

        agentRef.current.position.x = Math.sin(time * 2) * 2;
        agentRef.current.position.y = Math.cos(time * 3) * 0.5;

        if (agentRef.current.material instanceof THREE.MeshStandardMaterial) {
            agentRef.current.material.emissiveIntensity = 2 + Math.sin(time * 5) * 1;
        }
    });

    return (
        <group ref={orbitRef}>
            <mesh ref={agentRef}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    roughness={0}
                    metalness={1}
                />
                <pointLight intensity={1} distance={2} color={color} />
            </mesh>
        </group>
    );
}

export default function KnowledgeGraph3D() {
    const [selectedProject, setSelectedProject] = React.useState<number | null>(null);

    // AI Highlight Synchronization
    useEffect(() => {
        const handleAIHighlight = (e: any) => {
            if (e.detail?.projectId) {
                setSelectedProject(e.detail.projectId);
            }
        };

        window.addEventListener("neural-highlight", handleAIHighlight);
        return () => window.removeEventListener("neural-highlight", handleAIHighlight);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={["#000000"]} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <GraphPoints />
                    <Connections />

                    {PROJECTS.map(p => (
                        <ProjectNode
                            key={p.id}
                            project={p}
                            isSelected={selectedProject === p.id}
                            onSelect={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
                        />
                    ))}

                    {/* Multi-Agent Presence */}
                    <AutonomousAgent color="#8b5cf6" speed={1} />
                    <AutonomousAgent color="#06b6d4" speed={1.2} />
                    <AutonomousAgent color="#d946ef" speed={0.8} />
                </Float>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        </div>
    );
}
