import * as React from "react";

import { cn } from "@/lib/utils";

type SectionTag = "section" | "div" | "article" | "aside";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: SectionTag;
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

export function Section({ as: Tag = "section", spacing = "lg", className, children, ...props }: SectionProps) {
  return (
    <Tag className={cn(spacingMap[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}

export function SectionHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-10 text-center md:mb-14", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mx-auto mt-4 max-w-2xl text-pretty text-base text-slate-600 md:text-lg dark:text-slate-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}