// components/download/playlist/PlaylistProgressBar.tsx
'use client';

import React from 'react';

// Local types (fallback when project path aliases are unavailable)
export type QueueItem = {
  id: string | number;
  videoTitle: string;
  status: string;
  progress: number;
  speed?: number;
  error?: string;
};

export type PlaylistProgress = {
  status: string;
  overallPercent: number;
  completedCount: number;
  totalVideos: number;
  failedCount: number;
  skippedCount: number;
  speed: number;
  eta: number;
  currentItem?: QueueItem | null;
  queue: QueueItem[];
  zipReady?: boolean;
};

// Minimal formatBytes fallback
function formatBytes(bytes: number) {
  if (!bytes && bytes !== 0) return '';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

interface PlaylistProgressBarProps {
  progress: PlaylistProgress;
  onPause?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
  onDownloadZip?: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  queued: 'bg-gray-400',
  waiting: 'bg-yellow-400',
  downloading: 'bg-blue-500',
  paused: 'bg-yellow-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
  skipped: 'bg-gray-300',
  cancelled: 'bg-gray-400',
};

function QueueItemRow({ item }: { item: QueueItem }) {
  const color = STATUS_COLORS[item.status] ?? 'bg-gray-400';

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className={`h-2 w-2 flex-shrink-0 rounded-full ${color}`} />
      <span className="min-w-0 flex-1 truncate text-xs text-gray-700 dark:text-gray-300">
        {item.videoTitle}
      </span>
      <div className="flex flex-shrink-0 items-center gap-2">
        {item.status === 'downloading' && (
          <span className="text-xs text-gray-500">
            {item.progress}%
            {(item.speed ?? 0) > 0 &&
              ` · ${formatBytes(item.speed ?? 0)}/s`}
          </span>
        )}
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-medium
          ${
            item.status === 'completed'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
              : item.status === 'failed'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
              : item.status === 'downloading'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              : item.status === 'skipped'
              ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
          }`}
        >
          {item.status}
        </span>
        {item.error && (
          <span
            className="cursor-help text-xs text-red-500"
            title={item.error}
          >
            ⚠
          </span>
        )}
      </div>
    </div>
  );
}

export function PlaylistProgressBar({
  progress,
  onPause,
  onCancel,
  onRetry,
  onDownloadZip,
}: PlaylistProgressBarProps) {
  const isRunning = progress.status === 'running';
  const isPaused = progress.status === 'paused';
  const isCompleted = progress.status === 'completed';
  const isFailed = progress.status === 'failed';
  const isCancelled = progress.status === 'cancelled';
  const isDone = isCompleted || isFailed || isCancelled;

  const failedItems = progress.queue.filter(
    (q: { status: string; }) => q.status === 'failed'
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {isCompleted && '✅ Download Complete'}
            {isFailed && '❌ Download Failed'}
            {isCancelled && '⛔ Download Cancelled'}
            {isRunning && '⬇ Downloading...'}
            {isPaused && '⏸ Paused'}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {progress.overallPercent}%
          </span>
        </div>

        {/* Overall Progress Bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? 'bg-green-500'
                : isFailed
                ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${progress.overallPercent}%` }}
          />
        </div>

        {/* Stats */}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>
            ✅ {progress.completedCount}/{progress.totalVideos} completed
          </span>
          {progress.failedCount > 0 && (
            <span className="text-red-500">
              ❌ {progress.failedCount} failed
            </span>
          )}
          {progress.skippedCount > 0 && (
            <span>⏭ {progress.skippedCount} skipped</span>
          )}
          {progress.speed > 0 && (
            <span>⚡ {formatBytes(progress.speed)}/s</span>
          )}
          {progress.eta > 0 && (
            <span>⏳ ~{Math.ceil(progress.eta)}s remaining</span>
          )}
        </div>
      </div>

      {/* Current Item */}
      {progress.currentItem && (
        <div className="mb-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <p className="mb-1 truncate text-xs font-medium text-blue-800 dark:text-blue-300">
            Currently downloading: {progress.currentItem.videoTitle}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-blue-800">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress.currentItem.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Queue List */}
      <div className="mb-4 max-h-48 overflow-y-auto">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {progress.queue.map((item: QueueItem) => (
            <QueueItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {isRunning && onPause && (
          <button
            onClick={onPause}
            className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5
              text-xs font-medium text-yellow-700 hover:bg-yellow-100
              dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300
              dark:hover:bg-yellow-900/50 transition-colors"
          >
            ⏸ Pause
          </button>
        )}

        {(isRunning || isPaused) && onCancel && (
          <button
            onClick={onCancel}
            className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5
              text-xs font-medium text-red-700 hover:bg-red-100
              dark:border-red-700 dark:bg-red-900/30 dark:text-red-300
              dark:hover:bg-red-900/50 transition-colors"
          >
            ✕ Cancel
          </button>
        )}

        {(isDone || isPaused) && failedItems.length > 0 && onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-1.5
              text-xs font-medium text-orange-700 hover:bg-orange-100
              dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300
              dark:hover:bg-orange-900/50 transition-colors"
          >
            🔄 Retry Failed ({failedItems.length})
          </button>
        )}

        {progress.zipReady && onDownloadZip && (
          <button
            onClick={onDownloadZip}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium
              text-white hover:bg-green-700 transition-colors"
          >
            📦 Download ZIP
          </button>
        )}
      </div>
    </div>
  );
}