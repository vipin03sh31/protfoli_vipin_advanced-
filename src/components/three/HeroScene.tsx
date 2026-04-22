import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(2500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 12;
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 18;
    ref.current.rotation.y -= delta / 25;
    const m = state.pointer;
    ref.current.rotation.x += m.y * 0.0008;
    ref.current.rotation.y += m.x * 0.0008;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GlowOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.position.x = Math.sin(t * 0.4) * 0.3;
    mesh.current.position.y = Math.cos(t * 0.3) * 0.2;
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.2;
  });
  return (
    <Sphere ref={mesh} args={[1.4, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.45}
        speed={1.6}
        roughness={0.2}
        metalness={0.8}
        emissive="#4c1d95"
        emissiveIntensity={0.6}
      />
    </Sphere>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, -3]} intensity={1} color="#a78bfa" />
      <Suspense fallback={null}>
        <Particles />
        <GlowOrb />
      </Suspense>
    </Canvas>
  );
}
