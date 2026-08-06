"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

const options = [
  { value: "light", icon: Sun, label: "Light mode" },
  { value: "dark", icon: Moon, label: "Dark mode" },
  { value: "system", icon: Monitor, label: "System mode" },
] as const;

export function ThemeToggle() {
  const [theme, setThemeState] = useState<string | undefined>();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setThemeState(savedTheme);
  }, []);

  const setTheme = (value: string) => {
    localStorage.setItem("theme", value);
    setThemeState(value);
  };

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200 p-0.5 dark:border-slate-700"
      role="group"
      aria-label="Theme selection"
    >
      {options.map(({ value, icon: Icon, label }) => {
        const active = theme === value;
        return (
          <Tooltip key={value} content={label} side="bottom">
            <button
              type="button"
              onClick={() => setTheme(value)}
              aria-label={label}
              aria-pressed={active}
              className={cn(
                "rounded-md p-1.5 transition-all duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                active
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300",
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}