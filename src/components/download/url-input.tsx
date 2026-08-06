"use client";

import * as React from "react";
import { Clipboard, Link2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// Lightweight fallback for toast if the project's toast utility isn't available.
// This keeps the component functional without adding external dependencies.
const toast = {
  success: (msg: string) => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("SUCCESS:", msg);
    }
  },
  error: (msg: string) => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("ERROR:", msg);
    }
  },
};

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function UrlInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = "Paste video URL here…",
  className,
}: UrlInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text.trim());
        toast.success("URL pasted from clipboard");
        inputRef.current?.focus();
      }
    } catch {
      toast.error("Could not read clipboard. Please paste manually.");
    }
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit();
    }
  };

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isValid = value.trim().length === 0 || isValidUrl(value.trim());

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm transition-all duration-200",
          "dark:bg-slate-800",
          !isValid
            ? "border-red-300 ring-1 ring-red-300 dark:border-red-700 dark:ring-red-700"
            : "border-slate-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 dark:border-slate-700 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-500",
        )}
      >
        <Link2
          className="ml-2 h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Video URL input"
          aria-invalid={!isValid}
          aria-describedby={!isValid ? "url-error" : undefined}
          className={cn(
            "flex-1 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400",
            "focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500",
          )}
          disabled={isLoading}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear URL"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={handlePaste}
          aria-label="Paste from clipboard"
          className={cn(
            "shrink-0 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors",
            "hover:bg-slate-50 hover:border-slate-300",
            "dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "hidden sm:flex items-center gap-1.5",
          )}
        >
          <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
          Paste
        </button>

        <Button
          onClick={onSubmit}
          disabled={!value.trim() || !isValid || isLoading}
          isLoading={isLoading}
          loadingText="Analyzing…"
          size="md"
          className="shrink-0"
          aria-label="Analyze and download video"
        >
          Download
        </Button>
      </div>

      {!isValid && (
        <p id="url-error" role="alert" className="px-1 text-xs text-red-600 dark:text-red-400">
          Please enter a valid URL starting with http:// or https://
        </p>
      )}
    </div>
  );
}