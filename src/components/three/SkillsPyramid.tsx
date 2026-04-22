import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiFastapi, SiPython, SiCplusplus,
  SiMongodb, SiMysql, SiRedis, SiSqlite, SiGit,
} from "react-icons/si";
import { FaBrain, FaMicrochip, FaRobot } from "react-icons/fa";
import type { IconType } from "react-icons";

type Skill = { name: string; Icon: IconType; color: string };
type Layer = {
  title: string;
  tag: string;
  accent: string;
  skills: Skill[];
};

/* Pyramid is built bottom → top.
   Bottom = widest (most foundational), top = apex (most specialized). */
const LAYERS: Layer[] = [
  {
    title: "Tools",
    tag: "04",
    accent: "#9bf6ff",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Redis", Icon: SiRedis, color: "#FF4438" },
      { name: "SQLite", Icon: SiSqlite, color: "#7FCBF1" },
    ],
  },
  {
    title: "Backend",
    tag: "03",
    accent: "#7c5cff",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    title: "Frontend",
    tag: "02",
    accent: "#22d3ee",
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
    title: "AI / Core",
    tag: "01",
    accent: "#f472b6",
    skills: [
      { name: "AI / ANN", Icon: FaBrain, color: "#F472B6" },
      { name: "ML Models", Icon: FaRobot, color: "#A78BFA" },
      { name: "VLSI", Icon: FaMicrochip, color: "#9bf6ff" },
    ],
  },
];

/* Geometry config — frustum (truncated pyramid) layers stacked vertically.
   Bottom layer is the widest; each layer above is smaller, forming a pyramid. */
const LAYER_HEIGHT = 0.85;
const LAYER_GAP = 0.06;
const BASE_RADIUS = 3.2;
const TOP_RADIUS_RATIO = 0.18; // apex narrowness

function radiusForIndex(i: number, total: number) {
  // i = 0 is bottom (widest)
  const t = i / total;
  const tNext = (i + 1) / total;
  const rBottom = BASE_RADIUS * (1 - t * (1 - TOP_RADIUS_RATIO));
  const rTop = BASE_RADIUS * (1 - tNext * (1 - TOP_RADIUS_RATIO));
  return { rBottom, rTop };
}

function PyramidLayer({
  layer,
  index,
  total,
  isActive,
  isHovered,
  onHover,
  onClick,
  yOffset,
}: {
  layer: Layer;
  index: number;
  total: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (i: number | null) => void;
  onClick: (i: number) => void;
  yOffset: number;
}) {
  const group = useRef<THREE.Group>(null);
  const { rBottom, rTop } = radiusForIndex(index, total);

  // Smoothly interpolate scale on hover/active
  useFrame(() => {
    if (!group.current) return;
    const targetScale = isActive ? 1.12 : isHovered ? 1.06 : 1;
    const s = group.current.scale.x;
    const next = s + (targetScale - s) * 0.12;
    group.current.scale.set(next, 1, next);
  });

  return (
    <group ref={group} position={[0, yOffset, 0]}>
      {/* Glass frustum */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(index);
        }}
      >
        <cylinderGeometry args={[rTop, rBottom, LAYER_HEIGHT, 4, 1, false]} />
        <meshPhysicalMaterial
          color={"#0e0a1f"}
          transparent
          opacity={0.55}
          metalness={0.3}
          roughness={0.15}
          transmission={0.6}
          thickness={0.6}
          emissive={new THREE.Color(layer.accent)}
          emissiveIntensity={isActive ? 0.7 : isHovered ? 0.45 : 0.18}
        />
      </mesh>

      {/* Neon edge wireframe */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.CylinderGeometry(rTop, rBottom, LAYER_HEIGHT, 4, 1, false)]}
        />
        <lineBasicMaterial
          color={layer.accent}
          transparent
          opacity={isActive || isHovered ? 1 : 0.6}
        />
      </lineSegments>

      {/* Floating label on the front face */}
      <Html
        position={[0, 0, (rBottom + rTop) / 2 + 0.05]}
        center
        distanceFactor={6}
        style={{ pointerEvents: "none" }}
      >
        <div className="flex flex-col items-center gap-1 whitespace-nowrap">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: layer.accent, textShadow: `0 0 12px ${layer.accent}` }}
          >
            {layer.tag} / Layer
          </span>
          <span
            className="text-2xl font-bold tracking-tight text-white"
            style={{ textShadow: `0 0 18px ${layer.accent}99` }}
          >
            {layer.title}
          </span>
        </div>
      </Html>

      {/* Icons orbiting the layer when active */}
      {isActive && <OrbitingIcons layer={layer} radius={Math.max(rBottom, rTop) + 0.55} />}
    </group>
  );
}

function OrbitingIcons({ layer, radius }: { layer: Layer; radius: number }) {
  const group = useRef<THREE.Group>(null);
  const count = layer.skills.length;

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <group ref={group}>
      {layer.skills.map((skill, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Float key={skill.name} speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
            <Html
              position={[x, 0, z]}
              center
              distanceFactor={5}
              style={{ pointerEvents: "auto" }}
            >
              <SkillBadge skill={skill} accent={layer.accent} />
            </Html>
          </Float>
        );
      })}
    </group>
  );
}

function SkillBadge({ skill, accent }: { skill: Skill; accent: string }) {
  const { Icon, name, color } = skill;
  return (
    <div
      className="group relative flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-white/40"
      style={{ boxShadow: `0 6px 24px ${color}33, inset 0 1px 0 rgba(255,255,255,0.08)` }}
    >
      <span
        className="grid place-items-center transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
        style={{
          color,
          filter: `drop-shadow(0 0 8px ${color}cc) drop-shadow(0 0 14px ${accent}66)`,
          animation: "pulse 2.4s ease-in-out infinite",
        }}
      >
        <Icon size={18} />
      </span>
      <span className="font-mono text-[11px] text-white/90">{name}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${color}55, transparent 70%)` }}
      />
    </div>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9bf6ff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Pyramid() {
  const root = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const { mouse } = useThree();

  const total = LAYERS.length;
  const totalH = total * LAYER_HEIGHT + (total - 1) * LAYER_GAP;

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    // Gentle auto-rotation + subtle float
    root.current.rotation.y += 0.0035;
    root.current.position.y = Math.sin(t * 0.6) * 0.15;
    // Tilt slightly toward cursor for parallax
    const targetRX = -mouse.y * 0.18;
    const targetRZ = mouse.x * 0.08;
    root.current.rotation.x += (targetRX - root.current.rotation.x) * 0.05;
    root.current.rotation.z += (targetRZ - root.current.rotation.z) * 0.05;
  });

  return (
    <group ref={root} rotation={[0, Math.PI / 4, 0]}>
      {LAYERS.map((layer, i) => {
        // Stack from bottom (-totalH/2) up
        const y = -totalH / 2 + LAYER_HEIGHT / 2 + i * (LAYER_HEIGHT + LAYER_GAP);
        return (
          <PyramidLayer
            key={layer.title}
            layer={layer}
            index={i}
            total={total}
            yOffset={y}
            isHovered={hovered === i}
            isActive={active === i}
            onHover={setHovered}
            onClick={(idx) => setActive((cur) => (cur === idx ? null : idx))}
          />
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#08060f"]} />
      <fog attach="fog" args={["#08060f", 10, 26]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={1.4} color="#9b6cff" />
      <pointLight position={[-6, -2, 4]} intensity={1} color="#5cd6ff" />
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#f472b6" />
      <Particles />
      <Float speed={0.8} rotationIntensity={0} floatIntensity={0.3}>
        <Pyramid />
      </Float>
    </>
  );
}

export function SkillsPyramid() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
