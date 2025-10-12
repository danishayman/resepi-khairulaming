"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-8 w-16 md:h-10 md:w-20 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <span className="inline-block h-6 w-6 md:h-8 md:w-8 transform rounded-full bg-white shadow-lg transition-transform" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-8 w-16 md:h-10 md:w-20 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
    >
      <span
        className={`inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
          isDark ? "translate-x-8 md:translate-x-10" : "translate-x-1"
        }`}
      >
        {isDark ? (
          // Moon icon for dark mode
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Sun icon for light mode
            <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="#FAD903"
            viewBox="0 0 20 20"
            >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
            </svg>
        )}
      </span>
    </button>
  );
}

