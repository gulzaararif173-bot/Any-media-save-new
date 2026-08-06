import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "gradient";

type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon"
  | "icon-sm"
  | "icon-lg";

interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseButtonClasses =
  "inline-flex items-center justify-center font-medium rounded-xl " +
  "transition-all duration-200 select-none tap-highlight-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 " +
  "disabled:pointer-events-none disabled:opacity-50";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
  destructive:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98] dark:bg-red-500 dark:hover:bg-red-600",
  outline:
    "border border-slate-200 bg-transparent text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800",
  link:
    "bg-transparent text-blue-600 underline-offset-4 p-0 h-auto shadow-none hover:underline dark:text-blue-400",
  gradient:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm hover:from-blue-700 hover:to-cyan-600 active:scale-[0.98] dark:from-blue-500 dark:to-cyan-400",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2",
  xl: "h-12 px-8 text-base gap-2.5",
  icon: "h-10 w-10 p-0",
  "icon-sm": "h-8 w-8 p-0",
  "icon-lg": "h-12 w-12 p-0",
};

const buttonVariants = ({ variant = "primary", size = "md" }: ButtonVariantProps = {}) =>
  cn(baseButtonClasses, buttonVariantClasses[variant], buttonSizeClasses[size]);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
      const child = React.Children.only(
        children,
      ) as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled ?? isLoading}
        aria-disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {isLoading ? (loadingText ?? "Loading…") : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };