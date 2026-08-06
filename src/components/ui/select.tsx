import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  wrapperClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      error,
      hint,
      placeholder,
      id,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const uid = React.useId();
    const selectId = id ?? uid;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;
    const describedBy =
      [error ? errorId : null, hint && !error ? hintId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              "block w-full appearance-none rounded-xl border bg-white px-3 py-2.5 pr-9 text-sm text-slate-900 shadow-sm",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              "dark:bg-slate-800 dark:text-slate-100",
              error
                ? "border-red-400 focus:ring-red-500 dark:border-red-500"
                : "border-slate-200 focus:ring-blue-500 dark:border-slate-700",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            aria-hidden="true"
          >
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
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

Select.displayName = "Select";

export { Select };