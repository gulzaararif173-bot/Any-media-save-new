import * as React from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, description, indeterminate = false, error, id, ...props },
    ref,
  ) => {
    const uid = React.useId();
    const checkId = id ?? uid;
    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current!);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <div className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
            <input
              id={checkId}
              ref={innerRef}
              type="checkbox"
              className={cn(
                "peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white",
                "transition-colors duration-150",
                "checked:border-blue-600 checked:bg-blue-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-slate-600 dark:bg-slate-800 dark:checked:border-blue-500 dark:checked:bg-blue-500",
                error && "border-red-400 dark:border-red-500",
                className,
              )}
              {...props}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100">
              {indeterminate ? (
                <Minus className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Check className="h-3 w-3" aria-hidden="true" />
              )}
            </div>
          </div>

          {(label ?? description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <label
                  htmlFor={checkId}
                  className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {label}
                </label>
              )}
              {description && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };