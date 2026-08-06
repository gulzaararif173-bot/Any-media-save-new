import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
  rightIconLabel?: string;
  error?: string;
  hint?: string;
  label?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick,
      rightIconLabel = "Input action",
      error,
      hint,
      label,
      id,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const uid = React.useId();
    const inputId = id ?? uid;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const describedBy =
      [error ? errorId : null, hint && !error ? hintId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden="true"
            >
              <LeftIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              "block w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm",
              "placeholder:text-slate-400 transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              "dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-800/50",
              error
                ? "border-red-400 focus:ring-red-500 dark:border-red-500"
                : "border-slate-200 focus:ring-blue-500 dark:border-slate-700",
              LeftIcon && "pl-9",
              RightIcon && "pr-9",
              className,
            )}
            {...props}
          />

          {RightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {onRightIconClick ? (
                <button
                  type="button"
                  onClick={onRightIconClick}
                  aria-label={rightIconLabel}
                  className="rounded p-0.5 text-slate-400 transition-colors hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <RightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <RightIcon
                  className="h-4 w-4 text-slate-400 dark:text-slate-500"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>

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

Input.displayName = "Input";

export { Input };