import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SkillsPyramid } from "../three/SkillsPyramid";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function Skills() {
  const isMobile = useIsMobile();

  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[var(--neon-purple)] opacity-[0.18] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--neon-cyan)] opacity-[0.14] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            02 / Stack
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            A <span className="text-gradient">pyramid</span> of craft.
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/60">
            Hover a layer to highlight it. Click to reveal the stack inside.
          </p>
        </motion.div>

        {/* 3D Layered Tunnel */}
        <div
          data-cursor="hover"
          className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
          style={{
            boxShadow:
              "inset 0 1px 0 oklch(1 0 0 / 0.06), 0 40px 120px -30px oklch(0.2 0.18 295 / 0.6)",
          }}
        >
          {!isMobile ? (
            <SkillsPyramid />
          ) : (
            <MobileFallback />
          )}

          {/* Top scrim + hint */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            hover a layer · click to reveal skills
          </div>
        </div>
      </div>
    </section>
  );
}

/* Lightweight static fallback for mobile to avoid heavy WebGL */
function MobileFallback() {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        Open on desktop for the full 3D layered experience.
      </p>
    </div>
  );
}
