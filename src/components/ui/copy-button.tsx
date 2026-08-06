"use client";

import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Tooltip } from "./tooltip";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, className, size = "md" }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Tooltip content={copied ? "Copied!" : "Copy"}>
      <button
        type="button"
        onClick={() => copy(text)}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        className={cn(
          "rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200",
          size === "sm" ? "p-1" : "p-1.5",
          className,
        )}
      >
        {copied ? (
          <Check className={cn("text-green-500", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden="true" />
        ) : (
          <Copy className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden="true" />
        )}
      </button>
    </Tooltip>
  );
}