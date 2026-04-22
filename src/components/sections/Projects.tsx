import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  description: string;
  tech: string[];
  accent: string;
};

const PROJECTS: Project[] = [
  {
    id: "robot",
    title: "Autonomous Line Follower Robot",
    tag: "Embedded · ESP32",
    blurb: "Closed-loop robot that reads the road in real time.",
    description:
      "A closed-loop embedded system using an IR sensor array and ESP32 to detect path deviation, process signals and execute real-time corrections. PWM-driven L298N motor control for precise steering, stability and autonomous tracking.",
    tech: ["ESP32", "C/C++", "L298N", "PWM", "IR Array"],
    accent: "from-[var(--neon-cyan)] to-[var(--neon-blue)]",
  },
  {
    id: "expense",
    title: "Expense Tracker",
    tag: "Desktop · Python",
    blurb: "A clean Tkinter GUI backed by SQLite — full CRUD with export.",
    description:
      "Built during the Cantilever internship. A GUI tool to record, filter, delete and export daily expenses with SQLite3 storage, real-time updates, validation and a dark mode UI.",
    tech: ["Python", "Tkinter", "SQLite3"],
    accent: "from-[var(--neon-purple)] to-[var(--neon-pink)]",
  },
  {
    id: "contact",
    title: "Contact Book",
    tag: "CLI · Python",
    blurb: "Menu-driven contact manager with persistent file storage.",
    description:
      "A menu-based contact manager with add, search, delete and list. Uses Python file handling for persistent text storage with strict input validation for organized records.",
    tech: ["Python", "File I/O", "OOP"],
    accent: "from-[var(--neon-purple)] to-[var(--neon-cyan)]",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    tag: "Web · 3D",
    blurb: "The site you're on — built as an interactive showcase.",
    description:
      "A cinematic personal portfolio using React, Three.js and Framer Motion. Custom cursor, glassmorphism, scroll-triggered storytelling and a 3D tech sphere — all designed to feel like a product, not a CV.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind"],
    accent: "from-[var(--neon-cyan)] to-[var(--neon-purple)]",
  },
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -10, y: x * 12 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onOpen}
      data-cursor="hover"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="group relative block w-full text-left"
      style={{ perspective: 1200 }}
    >
      <div
        className="glass border-gradient relative overflow-hidden rounded-3xl p-8 transition-transform duration-300"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
        />

        <div className="relative z-10 flex h-full min-h-[280px] flex-col">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
              {project.tag}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-all group-hover:border-[var(--neon-cyan)] group-hover:text-[var(--neon-cyan)]">
              →
            </span>
          </div>

          <h3 className="mt-8 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">{project.blurb}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong border-gradient relative w-full max-w-2xl overflow-hidden rounded-3xl p-8 md:p-10"
      >
        <div
          className={`absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br ${project.accent} opacity-30 blur-3xl`}
        />
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            {project.tag}
          </span>
          <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/vipin03sh31"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.1_0.02_270)]"
            >
              View on GitHub
            </a>
            <button
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            03 / Selected Work
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            Things I've <span className="text-gradient">shipped</span>.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
