import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(720px,92vw)]" : "w-[min(820px,94vw)]"
      }`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-5 py-3">
        <a href="#home" className="font-mono text-sm font-bold tracking-widest">
          <span className="text-gradient">VS</span>
          <span className="text-foreground/60">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.1_0.02_270)] transition-transform hover:scale-105"
        >
          Hire
        </a>
      </div>
    </motion.nav>
  );
}
