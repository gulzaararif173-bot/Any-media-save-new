import * as React from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";

import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "destructive";

const alertVariants: Record<AlertVariant, string> = {
  info: "relative flex gap-3 rounded-xl border px-4 py-3 text-sm border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200",
  success: "relative flex gap-3 rounded-xl border px-4 py-3 text-sm border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200",
  warning: "relative flex gap-3 rounded-xl border px-4 py-3 text-sm border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200",
  destructive: "relative flex gap-3 rounded-xl border px-4 py-3 text-sm border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200",
};

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: AlertCircle,
} as const;

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: AlertVariant;
  onDismiss?: () => void;
}

export function Alert({ className, variant = "info", title, children, onDismiss, ...props }: AlertProps) {
  const Icon = iconMap[variant];

  return (
    <div role="alert" className={cn(alertVariants[variant], className)} {...props}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && (
          <div className={cn("leading-relaxed", title && "mt-0.5 opacity-90")}>
            {children}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="ml-auto shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}