"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Download,
  Loader2,
  RefreshCw,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useDownloadManager } from "@/hooks/use-download-manager";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type DownloadManagerItemType = {
  id: string;
  url?: string;
  status: "idle" | "downloading" | "completed" | "failed";
  progress: number;
  error?: string;
  metadata?: boolean | { title?: string };
  format?: {
    type: string;
    quality: string;
    container: string;
  };
};

export function DownloadManagerPanel() {
  const { downloads, setDownloads } = useDownloadManager();
  const [collapsed, setCollapsed] = React.useState(false);

  if (downloads.length === 0) return null;

  const items = downloads;
  const activeCount = items.filter((i) => i.status === "downloading").length;
  const completedCount = items.filter((i) => i.status === "completed").length;

  const pause = (id: string) => {
    setDownloads(items.map(item => item.id === id ? { ...item, status: "idle" as const } : item));
  };

  const cancel = (id: string) => {
    setDownloads(items.map(item => item.id === id ? { ...item, status: "idle" as const } : item));
  };

  const retry = (id: string) => {
    setDownloads(items.map(item => item.id === id ? { ...item, status: "downloading" as const } : item));
  };

  const remove = (id: string) => {
    setDownloads(items.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setDownloads(items.filter(item => item.status !== "completed"));
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800",
        "animate-slide-in-right",
      )}
      role="region"
      aria-label="Download manager"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <Download
              className="h-4 w-4 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Downloads
            </p>
            {activeCount > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeCount} active
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {completedCount > 0 && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={clearCompleted}
              aria-label="Clear completed"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand" : "Collapse"}
            aria-expanded={!collapsed}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                collapsed && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      {/* Items */}
      {!collapsed && (
        <ul
          className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-700"
          role="list"
        >
          {items.map((item) => (
            <DownloadManagerItem
              key={item.id}
              item={item}
              onPause={() => pause(item.id)}
              onCancel={() => cancel(item.id)}
              onRetry={() => void retry(item.id)}
              onRemove={() => remove(item.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

interface DownloadManagerItemProps {
  item: DownloadManagerItemType;
  onPause: () => void;
  onCancel: () => void;
  onRetry: () => void;
  onRemove: () => void;
}

function DownloadManagerItem({
  item,
  onCancel,
  onRetry,
  onRemove,
}: DownloadManagerItemProps) {
  const isActive = item.status === "downloading";
  const isDone = item.status === "completed";
  const isError = item.status === "failed";
  const title =
    typeof item.metadata === "object" &&
    item.metadata !== null &&
    "title" in item.metadata &&
    item.metadata.title
      ? item.metadata.title
      : item.url;
  const formatLabel = item.format
    ? `${item.format.quality} · .${item.format.container}`
    : item.url;
  const progressValue = typeof item.progress === "number" ? item.progress : 0;

  return (
    <li className="group px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        {/* Status icon */}
        <div className="mt-0.5 shrink-0">
          {isActive && (
            <Loader2
              className="h-4 w-4 animate-spin text-blue-500"
              aria-label="Downloading"
            />
          )}
          {isDone && (
            <CheckCircle2
              className="h-4 w-4 text-green-500"
              aria-label="Complete"
            />
          )}
          {isError && (
            <AlertCircle
              className="h-4 w-4 text-red-500"
              aria-label="Error"
            />
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-medium text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {formatLabel}
          </p>

          {/* Progress */}
          {isActive && (
            <div className="mt-1.5">
              <Progress
                value={Math.max(0, Math.min(100, progressValue))}
                size="sm"
                color="blue"
                label="Download progress"
              />
              <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {`${Math.max(0, Math.min(100, progressValue))}%`}
              </div>
            </div>
          )}

          {isError && item.error && (
            <p className="mt-1 line-clamp-2 text-xs text-red-600 dark:text-red-400">
              {item.error}
            </p>
          )}

          {isDone && (
            <p className="mt-0.5 text-xs text-green-600 dark:text-green-400">
              Download complete
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          {isError && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRetry}
              aria-label="Retry download"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          )}
          {isActive && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onCancel}
              aria-label="Cancel download"
              className="text-red-500 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          )}
          {(isDone || isError) && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRemove}
              aria-label="Remove item"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}