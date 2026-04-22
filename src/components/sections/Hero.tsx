import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroScene } from "../three/HeroScene";

const ROLES = ["Full-Stack Developer", "Embedded Systems Engineer", "VLSI Enthusiast", "Creative Coder"];

export function Hero() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = role.slice(0, text.length + 1);
        setText(next);
        if (next === role) setTimeout(() => setDeleting(true), 1500);
      } else {
        const next = role.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mb-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-cyan)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Available for opportunities · Delhi, IN
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="text-balance text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl lg:text-[10rem]"
        >
          <span className="block text-foreground">Vipin</span>
          <span className="block text-gradient text-glow">Sharma.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="mt-8 flex h-8 items-center justify-center font-mono text-base text-muted-foreground md:text-xl"
        >
          <span className="text-[var(--neon-cyan)]">{">"}</span>
          <span className="ml-3">{text}</span>
          <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-[var(--neon-cyan)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          className="mt-8 max-w-xl text-balance text-sm text-muted-foreground/90 md:text-base"
        >
          Electronics Engineering student crafting intelligent web experiences,
          embedded systems, and bridging silicon with software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[oklch(0.1_0.02_270)] transition-transform hover:scale-105"
          >
            <span className="relative z-10">Explore Work</span>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-wider backdrop-blur transition-colors hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[var(--neon-cyan)] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
