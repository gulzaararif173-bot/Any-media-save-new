import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "yellow";
  label?: string;
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" } as const;
const colorMap = {
  blue: "bg-blue-600 dark:bg-blue-500",
  green: "bg-green-600 dark:bg-green-500",
  red: "bg-red-600 dark:bg-red-500",
  yellow: "bg-amber-500 dark:bg-amber-400",
} as const;

export function Progress({
  value = 0,
  max = 100,
  showLabel = false,
  size = "md",
  color = "blue",
  label,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? (clamped / max) * 100 : 0;
  const rounded = Math.round(pct);

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div
        className={cn(
          "relative flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",
          sizeMap[size],
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? `${rounded}% complete`}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-slate-600 dark:text-slate-400">
          {rounded}%
        </span>
      )}
    </div>
  );
}