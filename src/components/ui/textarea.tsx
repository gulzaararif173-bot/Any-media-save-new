import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, wrapperClassName, ...props }, ref) => {
    const uid = React.useId();
    const taId = id ?? uid;
    const errorId = `${taId}-error`;
    const hintId = `${taId}-hint`;
    const describedBy =
      [error ? errorId : null, hint && !error ? hintId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={taId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <textarea
          id={taId}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(
            "block w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm",
            "placeholder:text-slate-400 transition-colors duration-150 resize-y min-h-[80px]",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            "dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500",
            error
              ? "border-red-400 focus:ring-red-500 dark:border-red-500"
              : "border-slate-200 focus:ring-blue-500 dark:border-slate-700",
            className,
          )}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };