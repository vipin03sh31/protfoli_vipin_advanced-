import { motion } from "framer-motion";
import { SkillsSphere } from "../three/SkillsSphere";

const GROUPS = [
  {
    label: "Languages",
    items: ["JavaScript", "Python", "C++", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    items: ["React.js", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "Redis", "SQLite3"],
  },
  {
    label: "Core",
    items: ["DSA", "OOP", "Networks", "VLSI", "AI / ANN"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            02 / Stack
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            An orbit of <span className="text-gradient">tools</span> I build with.
          </h2>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square w-full"
          >
            <div className="absolute inset-10 rounded-full bg-[var(--neon-purple)] opacity-20 blur-3xl" />
            <SkillsSphere />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {GROUPS.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass border-gradient rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
                  {g.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/90 transition-colors hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
