import { useState, useEffect } from 'react';

export function useTheme() {
  // Check local storage or system preference on first load
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('mystic-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply the 'dark' class to the HTML element for Tailwind to detect
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('mystic-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('mystic-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}