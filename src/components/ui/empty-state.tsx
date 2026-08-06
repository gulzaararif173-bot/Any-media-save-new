import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl",
        "border border-dashed border-slate-200 bg-slate-50 py-16 text-center",
        "dark:border-slate-700 dark:bg-slate-800/50",
        className,
      )}
      role="status"
      aria-label={title}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-slate-400 dark:text-slate-500" />
      </div>
      <div className="max-w-xs px-4">
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}