"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required to avoid hydration mismatch with next-themes
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Cambiar tema"
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-700 transition-colors duration-300 hover:border-blue-600/40 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:text-blue-400",
        className
      )}
    >
      {mounted && (
        <>
          <Sun
            className={cn(
              "h-4.5 w-4.5 transition-all duration-300",
              isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute h-4.5 w-4.5 transition-all duration-300",
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
            )}
          />
        </>
      )}
    </button>
  );
}
