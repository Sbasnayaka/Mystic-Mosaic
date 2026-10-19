import { Sun, Moon } from 'lucide-react'; // We will install lucide-react for clean icons

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-sm border-4 border-magic-900 dark:border-cosmic-800 
                 bg-white dark:bg-cosmic-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] 
                 transition-all duration-100 cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-accent" />
      ) : (
        <Moon className="w-6 h-6 text-magic-600" />
      )}
    </button>
  );
}