import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "cyberpunk" | "terminal" | "ai" | "light" | "matrix";

export const THEMES: { id: ThemeName; label: string; tagline: string }[] = [
  { id: "cyberpunk", label: "Cyberpunk", tagline: "Neon noir" },
  { id: "terminal", label: "Terminal", tagline: "Phosphor green" },
  { id: "ai", label: "AI / Future", tagline: "Neural blue" },
  { id: "light", label: "Light Dev", tagline: "Clean & minimal" },
  { id: "matrix", label: "Matrix", tagline: "Falling code" },
];

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "cyberpunk";
  const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeName | null;
  if (saved && THEMES.some((t) => t.id === saved)) return saved;
  return "cyberpunk";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("cyberpunk");

  // Apply on mount (avoids SSR mismatch by reading after hydration)
  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore quota / privacy errors
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
