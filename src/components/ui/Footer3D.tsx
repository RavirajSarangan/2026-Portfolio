"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NexusCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Reactive rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.5, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.1);

        // Floating motion
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <group>
            {/* Main Interactive Node */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <MeshDistortMaterial
                    color="#8b5cf6"
                    speed={2}
                    distort={0.4}
                    radius={1}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner Core */}
            <Sphere args={[0.8, 16, 16]}>
                <meshStandardMaterial
                    color="#d946ef"
                    emissive="#d946ef"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.1}
                />
            </Sphere>
        </group>
    );
}

const PARTICLE_POSITIONS = new Float32Array(
    Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10)
);

export default function Footer3D() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                <NexusCore />

                {/* Particle Field */}
                <Points positions={PARTICLE_POSITIONS}>
                    <PointMaterial
                        transparent
                        color="#ffffff"
                        size={0.02}
                        sizeAttenuation={true}
                        depthWrite={false}
                        opacity={0.2}
                    />
                </Points>
            </Canvas>
        </div>
    );
}
