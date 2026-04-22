import { motion } from "framer-motion";
import { useState } from "react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/vipin03sh31", icon: "↗" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vipin-sharma", icon: "↗" },
  { label: "Email", href: "mailto:vipinsh2003@gmail.com", icon: "✉" },
  { label: "Phone", href: "tel:+919057974301", icon: "☎" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
    );
    window.location.href = `mailto:vipinsh2003@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 100%, oklch(0.3 0.18 295 / 0.4), transparent 60%), radial-gradient(ellipse at 80% 0%, oklch(0.3 0.18 220 / 0.3), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
            04 / Contact
          </span>
          <h2 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            Let's build something <span className="text-gradient">cinematic</span>.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Open to internships, collaborations and brave product ideas. Drop a line —
            I usually reply within a day.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="glass border-gradient relative space-y-5 rounded-3xl p-8 lg:col-span-3"
          >
            <FloatingInput name="name" label="Your name" />
            <FloatingInput name="email" type="email" label="Email" />
            <FloatingInput name="message" label="Message" textarea />

            <button
              type="submit"
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[oklch(0.1_0.02_270)] transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">{sent ? "Opening mail…" : "Send message"}</span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3 lg:col-span-2"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:-translate-y-1 hover:border-[var(--neon-cyan)]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {s.href.replace(/^(https?:\/\/|mailto:|tel:)/, "")}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all group-hover:border-[var(--neon-cyan)] group-hover:text-[var(--neon-cyan)]">
                  {s.icon}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted-foreground md:flex-row">
          <p className="font-mono uppercase tracking-widest">© 2026 Vipin Sharma</p>
          <p className="font-mono uppercase tracking-widest">Built with React · Three.js · ❤</p>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  name,
  label,
  type = "text",
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const active = focus || value.length > 0;

  const shared =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pb-2 pt-6 text-sm text-foreground outline-none transition-all focus:border-[var(--neon-cyan)] focus:bg-white/[0.05] focus:shadow-[0_0_30px_oklch(0.85_0.18_200_/_0.2)]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          required
          rows={4}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          className={shared}
        />
      )}
      <label
        className={`pointer-events-none absolute left-4 font-mono uppercase tracking-widest transition-all ${
          active
            ? "top-2 text-[10px] text-[var(--neon-cyan)]"
            : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
