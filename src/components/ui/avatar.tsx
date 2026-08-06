"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { cls: "h-8 w-8 text-xs", px: 32 },
  md: { cls: "h-10 w-10 text-sm", px: 40 },
  lg: { cls: "h-12 w-12 text-base", px: 48 },
  xl: { cls: "h-16 w-16 text-lg", px: 64 },
} as const;

export function Avatar({ src, alt = "", fallback, size = "md", className, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);
  const { cls, px } = sizeMap[size];

  const initials = fallback
    ? fallback.trim().split(/\s+/).map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",
        cls,
        className,
      )}
      {...props}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          width={px}
          height={px}
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-semibold text-slate-600 dark:text-slate-300" aria-label={alt || fallback}>
          {initials}
        </span>
      )}
    </div>
  );
}