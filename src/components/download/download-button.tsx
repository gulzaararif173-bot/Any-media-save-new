"use client";

import * as React from "react";
import { Download, Loader2, StopCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { DownloadItem } from "@/lib/download/manager";

interface DownloadButtonProps {
  onDownload: () => void;
  onCancel?: () => void;
  activeItem?: DownloadItem | null;
  disabled?: boolean;
  className?: string;
}

export function DownloadButton({
  onDownload,
  onCancel,
  activeItem,
  disabled = false,
  className,
}: DownloadButtonProps) {
  const isDownloading = activeItem?.status === "downloading";
  const isDone = activeItem?.status === "completed";
  const isError = activeItem?.status === "failed";
  const progressPercent = activeItem?.progress;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Button
          onClick={isDownloading ? undefined : onDownload}
          disabled={disabled || isDownloading || isDone}
          variant={isDone ? "secondary" : isError ? "destructive" : "gradient"}
          size="xl"
          className={cn("flex-1 text-base", isDone && "cursor-default")}
          aria-label={
            isDownloading
              ? `Downloading ${progressPercent ?? 0}%`
              : isDone
                ? "Download complete"
                : "Download"
          }
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {progressPercent !== undefined ? `${progressPercent}%` : "Downloading…"}
            </>
          ) : isDone ? (
            <>
              <span className="text-green-500 dark:text-green-400" aria-hidden="true">
                ✓
              </span>
              Downloaded
            </>
          ) : isError ? (
            <>
              <Download className="h-5 w-5" aria-hidden="true" />
              Retry Download
            </>
          ) : (
            <>
              <Download className="h-5 w-5" aria-hidden="true" />
              Download Now
            </>
          )}
        </Button>

        {isDownloading && onCancel && (
          <Button variant="outline" size="xl" onClick={onCancel} aria-label="Cancel download">
            <StopCircle className="h-5 w-5" aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* Progress bar */}
      {isDownloading && progressPercent !== undefined && (
        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
            <span>Downloading…</span>
            <span>{progressPercent}%</span>
          </div>

          <Progress
            value={progressPercent}
            size="md"
            color="blue"
            showLabel
            label="Download progress"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{progressPercent}% complete</span>
            <span />
          </div>
        </div>
      )}

      {isError && activeItem?.error && (
        <p role="alert" className="text-center text-xs text-red-600 dark:text-red-400">
          {activeItem.error}
        </p>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}