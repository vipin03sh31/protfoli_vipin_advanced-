import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Palette, Terminal, Cpu, Sun, Code2, Check } from "lucide-react";
import { THEMES, useTheme, type ThemeName } from "./ThemeProvider";

const ICONS: Record<ThemeName, React.ComponentType<{ className?: string }>> = {
  cyberpunk: Palette,
  terminal: Terminal,
  ai: Cpu,
  light: Sun,
  matrix: Code2,
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ActiveIcon = ICONS[theme];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[60]" data-cursor="hover">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-strong absolute bottom-16 right-0 w-64 overflow-hidden rounded-2xl p-2 shadow-[var(--shadow-elegant)]"
          >
            <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Switch environment
            </div>
            <ul className="flex flex-col gap-0.5">
              {THEMES.map((t) => {
                const Icon = ICONS[t.id];
                const active = t.id === theme;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        setTheme(t.id);
                        setOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active
                          ? "bg-primary/15 text-foreground"
                          : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border border-border ${
                          active ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium">{t.label}</span>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {t.tagline}
                        </span>
                      </span>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        className="glass-strong flex h-12 w-12 items-center justify-center rounded-full border border-border shadow-[var(--shadow-glow-purple)]"
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-foreground"
        >
          <ActiveIcon className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </div>
  );
}
