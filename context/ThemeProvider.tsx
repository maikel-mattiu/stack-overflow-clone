"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  toggleTheme: () => void;
}

let storedTheme = null;

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      storedTheme = localStorage.getItem("theme");
      return storedTheme ? (storedTheme as Theme) : "dark"; // Default to "dark" if not found
    }
    return "dark"; // Default to "dark" on server-side
  });

  const toggleTheme = useCallback(() => {
    const newTheme =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";

    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    if (typeof window !== "undefined") {
      // Only update localStorage if window exists (client-side)
      localStorage.setItem("theme", newTheme);
    }
  }, [theme]);

  // Initial theme setup
  useEffect(() => {
    toggleTheme();
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
