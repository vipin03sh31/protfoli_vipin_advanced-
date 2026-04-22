import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const SKILLS = [
  "React", "Next.js", "Node.js", "Python", "JavaScript", "C++",
  "FastAPI", "Express", "MongoDB", "MySQL", "Redis", "SQLite",
  "Tailwind", "Git", "VLSI", "AI/ANN",
];

function fibonacciSphere(n: number, radius = 2.4) {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

function Cloud() {
  const group = useRef<THREE.Group>(null);
  const positions = fibonacciSphere(SKILLS.length);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={group}>
      {SKILLS.map((skill, i) => (
        <Float key={skill} speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
          <Html
            position={positions[i]}
            center
            distanceFactor={8}
            style={{ pointerEvents: "none" }}
          >
            <span className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-foreground backdrop-blur-md transition-all hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]">
              {skill}
            </span>
          </Html>
        </Float>
      ))}
    </group>
  );
}

export function SkillsSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <Cloud />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
