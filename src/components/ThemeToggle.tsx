import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "binapani-theme";

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle group relative inline-flex h-9 w-[4.5rem] items-center rounded-full border border-border bg-secondary p-1 transition-colors duration-300"
    >
      <span
        className="theme-toggle-thumb flex h-7 w-7 items-center justify-center rounded-full bg-background shadow"
        style={{ transform: isDark ? "translateX(2.25rem)" : "translateX(0)" }}
      >
        {isDark ? (
          <Moon size={14} className="text-primary" />
        ) : (
          <Sun size={14} className="text-primary" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
