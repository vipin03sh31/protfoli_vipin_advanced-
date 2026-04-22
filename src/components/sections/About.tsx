import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2023 — 27",
    title: "B.Tech Electronics (VLSI)",
    place: "Maharaja Agrasen Institute of Technology · GGSIPU",
    detail: "CGPA 8.2 · DSA, AI, ANN, Statistical Modelling",
  },
  {
    year: "Jun 2025 — Jul 2025",
    title: "Python Programming Intern",
    place: "Cantilever Technologies (Remote)",
    detail: "Built Tkinter + SQLite3 desktop tools with full CRUD & validation.",
  },
  {
    year: "2024 — Now",
    title: "Captain · Basketball Team (MAIT)",
    place: "Leadership · Strategy · Teamwork",
    detail: "Leading training and game strategy under pressure.",
  },
  {
    year: "Ongoing",
    title: "Executive · IOSD Society",
    place: "Tech events & workshops",
    detail: "Coordinating speakers, logistics and student outreach.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[600px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, oklch(0.3 0.18 295 / 0.3), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            01 / About
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            A maker stuck between <span className="text-gradient">silicon</span> and{" "}
            <span className="text-gradient">software</span>.
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass border-gradient relative rounded-3xl p-8 lg:col-span-2"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] text-3xl font-bold text-[oklch(0.1_0.02_270)]">
                  VS
                </div>
                <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] opacity-40 blur-xl" />
              </div>
              <div>
                <p className="text-xl font-semibold">Vipin Sharma</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Engineer · Builder
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              I'm an Electronics Engineering undergrad obsessed with how things work — from
              the gates inside an ESP32 to the layers of a React app. I build things that ship:
              embedded robots, full-stack tools, and the occasional pixel-perfect interface.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { v: "8.2", l: "CGPA" },
                { v: "10+", l: "Projects" },
                { v: "2027", l: "Grad" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-bold text-gradient">{s.v}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative lg:col-span-3">
            <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-[var(--neon-purple)] via-[var(--neon-cyan)] to-transparent" />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <span className="absolute left-[10px] top-2 h-3 w-3 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_15px_var(--neon-cyan)]" />
                  <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.place}</p>
                    <p className="mt-2 text-sm text-foreground/80">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
