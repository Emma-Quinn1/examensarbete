"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Theme = "dark" | "light";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = (localStorage.getItem("theme") as Theme) || "light";
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-bs-theme", "dark");
    } else {
      root.removeAttribute("data-bs-theme");
    }
  };

  const toggleDarkMode = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className={`toggle-switch ${theme}`} onClick={toggleDarkMode}>
      <motion.div
        className={`toggle-circle ${theme}`}
        animate={{ x: theme === "dark" ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? "☾" : "☼"}
      </motion.div>
    </div>
  );
}
