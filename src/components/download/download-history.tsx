"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, ExternalLink, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PlatformBadge } from "./platform-detector"; // ✅ ADD THIS LINE
// Local HistoryEntry type (was previously imported from @/types)
// Fields are based on usage within this component
type HistoryEntry = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string | null;
  platform: string; // e.g. "youtube", "vimeo", "unknown"
  format?: string | null;
  downloadedAt: string; // ISO date
};

const LOCAL_STORAGE_KEYS = {
  HISTORY: "download_history",
} as const;

const HISTORY_MAX_ITEMS = 50;

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore write errors
    }
  }, [key, storedValue]);

  const clearValue = React.useCallback(() => {
    setStoredValue(initialValue);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }, [initialValue, key]);

  return [storedValue, setStoredValue, clearValue];
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.max(0, now.getTime() - date.getTime());

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${days}d ago`;
}

export function useDownloadHistory() {
  const [history, setHistory, clearHistory] = useLocalStorage<HistoryEntry[]>(
    LOCAL_STORAGE_KEYS.HISTORY,
    [],
  );

  const addEntry = React.useCallback(
    (entry: Omit<HistoryEntry, "id" | "downloadedAt">) => {
      setHistory((prev: any) => {
        const newEntry: HistoryEntry = {
          ...entry,
          id: crypto.randomUUID(),
          downloadedAt: new Date().toISOString(),
        };

        return [newEntry, ...prev].slice(0, HISTORY_MAX_ITEMS);
      });
    },
    [setHistory],
  );

  const removeEntry = React.useCallback(
    (id: string) => {
      setHistory((prev: any[]) => prev.filter((item) => item.id !== id));
    },
    [setHistory],
  );

  return {
    history,
    addEntry,
    removeEntry,
    clearHistory,
  };
}

export function DownloadHistory() {
  const { history, removeEntry, clearHistory } = useDownloadHistory();

  if (history.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No download history"
        description="Your recent downloads will appear here."
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Downloads ({history.length})
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-red-600 hover:text-red-700 dark:text-red-400"
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          Clear all
        </Button>
      </div>

      <ul className="space-y-2">
        {history.map((entry: HistoryEntry) => (
          <HistoryItem
            key={entry.id}
            entry={entry}
            onRemove={() => removeEntry(entry.id)}
          />
        ))}
      </ul>
    </div>
  );
}

interface HistoryItemProps {
  entry: HistoryEntry;
  onRemove: () => void;
}

function HistoryItem({ entry, onRemove }: HistoryItemProps) {
  return (
    <li className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
      {entry.thumbnail && (
        <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
          <Image
            src={entry.thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="112px"
            unoptimized
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium text-slate-900 dark:text-white">
          {entry.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <PlatformBadge
            platform={
              entry.platform === "unknown"
                ? "youtube"
                : (entry.platform as any)
            }
          />

          {entry.format && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {entry.format}
            </span>
          )}

          <span className="text-xs text-slate-400 dark:text-slate-500">
            {formatRelativeTime(entry.downloadedAt)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open original URL"
          className={cn(
            "rounded-lg p-1.5 text-slate-400 transition-colors",
            "hover:bg-slate-100 hover:text-slate-600",
            "dark:hover:bg-slate-700 dark:hover:text-slate-300",
          )}
        >
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove from history"
          className={cn(
            "rounded-lg p-1.5 text-slate-400 transition-colors",
            "hover:bg-red-50 hover:text-red-600",
            "dark:hover:bg-red-900/20 dark:hover:text-red-400",
          )}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}