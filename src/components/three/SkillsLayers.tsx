import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, ScrollControls, useScroll } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiCplusplus,
  SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiMysql, SiRedis, SiSqlite,
  SiTailwindcss, SiGit, SiHtml5, SiCss,
} from "react-icons/si";
import { FaBrain, FaMicrochip } from "react-icons/fa";
import type { IconType } from "react-icons";

type Skill = { name: string; Icon: IconType; color: string };

const PANELS: { title: string; tag: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    tag: "01",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    title: "Backend",
    tag: "02",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    title: "Data",
    tag: "03",
    skills: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Redis", Icon: SiRedis, color: "#FF4438" },
      { name: "SQLite", Icon: SiSqlite, color: "#7FCBF1" },
    ],
  },
  {
    title: "Core",
    tag: "04",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "VLSI", Icon: FaMicrochip, color: "#A78BFA" },
      { name: "AI / ANN", Icon: FaBrain, color: "#F472B6" },
    ],
  },
];

const PANEL_W = 4.4;
const PANEL_H = 2.8;
const PANEL_GAP = 3.2; // distance between panels along -Z

function PanelCard({
  panel,
  index,
  total,
}: {
  panel: (typeof PANELS)[number];
  index: number;
  total: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  // Slight stagger left/right for depth-stacked feel
  const offsetX = (index - (total - 1) / 2) * 0.55;
  const offsetY = ((index % 2) - 0.5) * 0.35;
  const z = -index * PANEL_GAP;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // float
    group.current.position.y = offsetY + Math.sin(t * 0.6 + index) * 0.12;
    // tilt toward cursor
    const targetRX = -mouse.y * 0.18 + (hovered ? 0.05 : 0);
    const targetRY = mouse.x * 0.22 + (hovered ? -0.05 : 0);
    group.current.rotation.x += (targetRX - group.current.rotation.x) * 0.06;
    group.current.rotation.y += (targetRY - group.current.rotation.y) * 0.06;
  });

  return (
    <group
      ref={group}
      position={[offsetX, offsetY, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glass plane */}
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H, 1, 1]} />
        <meshStandardMaterial
          color={"#0e0a1f"}
          transparent
          opacity={0.35}
          metalness={0.4}
          roughness={0.25}
          emissive={new THREE.Color("#3a1f6b")}
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* Neon edge frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(PANEL_W, PANEL_H)]} />
        <lineBasicMaterial color={hovered ? "#9bf6ff" : "#7c5cff"} transparent opacity={0.9} />
      </lineSegments>

      {/* HTML overlay with icons */}
      <Html
        transform
        distanceFactor={2.6}
        position={[0, 0, 0.01]}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="relative flex w-[480px] flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-2xl"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -20px rgba(124,92,255,0.45)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              {panel.tag} / Layer
            </span>
            <span className="font-mono text-[10px] text-white/40">
              {panel.skills.length} stacks
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-white">
            {panel.title}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {panel.skills.map((s) => (
              <SkillChip key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const { Icon, name, color } = skill;
  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40"
      style={{ boxShadow: `0 6px 18px ${color}22` }}
    >
      <span
        className="grid place-items-center transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
        style={{ color, filter: `drop-shadow(0 0 6px ${color}cc)` }}
      >
        <Icon size={18} />
      </span>
      <span className="font-mono text-xs text-white/90">{name}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
        style={{ background: `radial-gradient(circle, ${color}66, transparent 70%)` }}
      />
    </div>
  );
}

function Rig() {
  const scroll = useScroll();
  const { camera, mouse } = useThree();
  const total = PANELS.length;
  const totalDistance = (total - 1) * PANEL_GAP;

  useFrame(() => {
    // Scroll moves camera through layers
    const targetZ = 5 - scroll.offset * (totalDistance + 4);
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    // Subtle parallax on X/Y based on cursor
    const tx = mouse.x * 0.6;
    const ty = mouse.y * 0.4;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.lookAt(0, 0, camera.position.z - 4);
  });
  return null;
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = -Math.random() * 22;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9bf6ff" size={0.025} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#08060f"]} />
      <fog attach="fog" args={["#08060f", 6, 22]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={1.2} color="#9b6cff" />
      <pointLight position={[-6, -3, 4]} intensity={1} color="#5cd6ff" />
      <Particles />

      {PANELS.map((p, i) => (
        <Float key={p.title} speed={1} rotationIntensity={0.15} floatIntensity={0.35}>
          <PanelCard panel={p} index={i} total={PANELS.length} />
        </Float>
      ))}

      <Rig />
    </>
  );
}

export function SkillsLayers() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <ScrollControls pages={2.5} damping={0.25}>
          <Scene />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
