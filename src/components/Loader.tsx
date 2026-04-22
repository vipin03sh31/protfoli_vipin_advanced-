import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(id);
        setTimeout(() => setDone(true), 600);
      } else {
        setProgress(p);
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]"
          >
            Initializing experience
          </motion.div>

          <div className="relative z-10 mb-6 text-7xl font-bold tracking-tight md:text-9xl">
            <span className="text-gradient">{Math.floor(progress)}</span>
            <span className="text-muted-foreground/40">%</span>
          </div>

          <div className="relative z-10 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: "var(--gradient-neon)",
                boxShadow: "0 0 20px var(--neon-purple)",
              }}
            />
          </div>

          <div className="absolute bottom-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            VIPIN.SHARMA / PORTFOLIO_v2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
