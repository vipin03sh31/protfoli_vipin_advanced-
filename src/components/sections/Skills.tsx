import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiJavascript, SiCplusplus,
  SiFastapi, SiExpress, SiMongodb, SiMysql, SiRedis, SiSqlite,
  SiTailwindcss, SiGit, SiTypescript, SiHtml5, SiCss3,
} from "react-icons/si";
import { FaBrain, FaMicrochip } from "react-icons/fa";
import type { IconType } from "react-icons";

type Skill = {
  name: string;
  Icon: IconType;
  color: string;       // glow tint (oklch / hex)
  size: number;        // 0.85 – 1.25 — depth scale
  delay: number;       // float anim delay (s)
  duration: number;    // float anim duration (s)
  depth: number;       // -1 (back) … 1 (front) — parallax strength
};

const SKILLS: Skill[] = [
  { name: "React",      Icon: SiReact,        color: "#61DAFB", size: 1.20, delay: 0.0, duration: 6.5, depth: 0.9 },
  { name: "Next.js",    Icon: SiNextdotjs,    color: "#FFFFFF", size: 1.05, delay: 0.6, duration: 7.2, depth: 0.6 },
  { name: "TypeScript", Icon: SiTypescript,   color: "#3178C6", size: 1.10, delay: 1.1, duration: 6.8, depth: 0.7 },
  { name: "JavaScript", Icon: SiJavascript,   color: "#F7DF1E", size: 1.15, delay: 0.3, duration: 7.5, depth: 0.8 },
  { name: "Python",     Icon: SiPython,       color: "#3776AB", size: 1.18, delay: 0.9, duration: 6.2, depth: 0.85 },
  { name: "C++",        Icon: SiCplusplus,    color: "#00599C", size: 0.95, delay: 1.4, duration: 7.0, depth: 0.4 },
  { name: "Node.js",    Icon: SiNodedotjs,    color: "#5FA04E", size: 1.10, delay: 0.2, duration: 6.6, depth: 0.7 },
  { name: "Express",    Icon: SiExpress,      color: "#FFFFFF", size: 0.90, delay: 1.7, duration: 7.4, depth: 0.3 },
  { name: "FastAPI",    Icon: SiFastapi,      color: "#009688", size: 1.00, delay: 0.8, duration: 6.9, depth: 0.5 },
  { name: "MongoDB",    Icon: SiMongodb,      color: "#47A248", size: 1.12, delay: 0.4, duration: 6.4, depth: 0.75 },
  { name: "MySQL",      Icon: SiMysql,        color: "#4479A1", size: 1.00, delay: 1.2, duration: 7.1, depth: 0.5 },
  { name: "Redis",      Icon: SiRedis,        color: "#FF4438", size: 0.92, delay: 1.6, duration: 6.7, depth: 0.35 },
  { name: "SQLite",     Icon: SiSqlite,       color: "#7FCBF1", size: 0.88, delay: 0.5, duration: 7.3, depth: 0.3 },
  { name: "Tailwind",   Icon: SiTailwindcss,  color: "#38BDF8", size: 1.08, delay: 1.0, duration: 6.5, depth: 0.65 },
  { name: "Git",        Icon: SiGit,          color: "#F05032", size: 1.05, delay: 1.5, duration: 7.0, depth: 0.6 },
  { name: "HTML",       Icon: SiHtml5,        color: "#E34F26", size: 0.95, delay: 0.7, duration: 6.8, depth: 0.45 },
  { name: "CSS",        Icon: SiCss3,         color: "#1572B6", size: 0.95, delay: 1.3, duration: 7.2, depth: 0.45 },
  { name: "VLSI",       Icon: FaMicrochip,    color: "#A78BFA", size: 1.05, delay: 0.1, duration: 6.6, depth: 0.7 },
  { name: "AI / ANN",   Icon: FaBrain,        color: "#F472B6", size: 1.12, delay: 1.8, duration: 6.3, depth: 0.8 },
];

function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const { name, Icon, color, size, delay, duration } = skill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.6 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
      style={{ transform: `scale(${size})` }}
    >
      <motion.div
        animate={{
          y: [0, -14, 0, 10, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.18, y: -6 }}
        className="group relative cursor-none"
        style={{
          filter: `drop-shadow(0 6px 16px ${color}33)`,
        }}
      >
        {/* Glow halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle, ${color}66, transparent 70%)` }}
        />

        {/* Glass badge */}
        <div
          className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/30"
          style={
            {
              boxShadow:
                "inset 0 1px 0 oklch(1 0 0 / 0.08), 0 8px 28px oklch(0 0 0 / 0.35)",
              ["--skill-color" as string]: color,
            } as React.CSSProperties
          }
        >
          <motion.span
            whileHover={{ rotate: [0, -12, 12, -8, 0], scale: 1.25 }}
            transition={{ duration: 0.6 }}
            className="grid place-items-center"
            style={{
              color,
              filter: `drop-shadow(0 0 8px ${color}aa)`,
            }}
          >
            <Icon size={20} />
          </motion.span>
          <span className="font-mono text-xs font-medium tracking-wide text-foreground/95">
            {name}
          </span>

          {/* Animated gradient ring on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${color}00, ${color}55, ${color}00)`,
              padding: 1,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax (in -1..1 range)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      mx.set(Math.max(-1, Math.min(1, x)));
      my.set(Math.max(-1, Math.min(1, y)));
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      {/* Backdrop atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[var(--neon-purple)] opacity-[0.18] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--neon-cyan)] opacity-[0.14] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            02 / Stack
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            A constellation of <span className="text-gradient">tools</span> I build with.
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/60">
            Hover any skill — they react to your cursor and drift through space.
          </p>
        </motion.div>

        {/* Floating skill cloud */}
        <div
          ref={containerRef}
          className="relative min-h-[28rem] [perspective:1200px]"
        >
          {SKILLS.map((skill, i) => (
            <ParallaxLayer key={skill.name} sx={sx} sy={sy} depth={skill.depth}>
              <SkillBadge skill={skill} index={i} />
            </ParallaxLayer>
          ))}

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {SKILLS.map((skill, i) => (
              <ParallaxItem key={skill.name} sx={sx} sy={sy} depth={skill.depth}>
                <SkillBadge skill={skill} index={i} />
              </ParallaxItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Parallax wrappers — translate based on cursor + per-item depth */
function ParallaxItem({
  children,
  sx,
  sy,
  depth,
}: {
  children: React.ReactNode;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  depth: number;
}) {
  const translateX = useTransform(sx, (v) => v * depth * 22);
  const translateY = useTransform(sy, (v) => v * depth * 18);
  return (
    <motion.div style={{ x: translateX, y: translateY, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

// Unused absolute layer kept out of the DOM (placeholder if you later switch to absolute layout)
function ParallaxLayer(_: {
  children: React.ReactNode;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  depth: number;
}) {
  return null;
}
