// components/download-manager/QueuePanel.tsx
'use client';

import React, { useMemo } from 'react';
import { DownloadCard } from './DownloadCard';

type DownloadCardProps = React.ComponentProps<typeof DownloadCard>;
type DownloadItem = DownloadCardProps['item'];

interface DownloadManagerState {
  items: Record<string, DownloadItem>;
  activeCount: number;
  failedCount: number;
  completedCount: number;
  isPaused: boolean;
}

interface DownloadManagerContextValue {
  state: DownloadManagerState;
  pauseAll: () => void;
  resumeAll: () => void;
  cancelAll: () => void;
  clearCompleted: () => void;
  retryFailed: () => void;
}

function useDownloadManager(): DownloadManagerContextValue {
  return {
    state: {
      items: {},
      activeCount: 0,
      failedCount: 0,
      completedCount: 0,
      isPaused: false,
    },
    pauseAll: () => undefined,
    resumeAll: () => undefined,
    cancelAll: () => undefined,
    clearCompleted: () => undefined,
    retryFailed: () => undefined,
  };
}

interface OverallProgress {
  percentage: number;
  completed: number;
  total: number;
  active: number;
  queued: number;
  failed: number;
  speed: number;
}

function useDownloadProgress(): { overallProgress: OverallProgress } {
  return {
    overallProgress: {
      percentage: 0,
      completed: 0,
      total: 0,
      active: 0,
      queued: 0,
      failed: 0,
      speed: 0,
    },
  };
}

function useDownloadProcessor(): void {
  // noop
}

export function QueuePanel() {
  const {
    state,
    pauseAll,
    resumeAll,
    cancelAll,
    clearCompleted,
    retryFailed,
  } = useDownloadManager();

  // Activate the processor
  useDownloadProcessor();

  const { overallProgress } = useDownloadProgress();

  const orderedItems = useMemo(
    () =>
      Object.values(state.items).sort(
        (a, b) => a.queuePosition - b.queuePosition
      ),
    [state.items]
  );

  const hasItems = orderedItems.length > 0;
  const hasActive = state.activeCount > 0;
  const hasFailed = state.failedCount > 0;
  const hasCompleted = state.completedCount > 0;

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 text-4xl">📥</div>
        <p className="text-base font-medium text-gray-600 dark:text-gray-400">
          Download queue is empty
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Add URLs above to start downloading
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Overall Progress */}
      {hasItems && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Overall Progress
            </span>
            <span className="text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
              {overallProgress.percentage}%
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              ✅ {overallProgress.completed}/{overallProgress.total}
            </span>
            {overallProgress.active > 0 && (
              <span className="text-emerald-600 dark:text-emerald-400">
                ⬇ {overallProgress.active} active
              </span>
            )}
            {overallProgress.queued > 0 && (
              <span>🕐 {overallProgress.queued} queued</span>
            )}
            {hasFailed && (
              <span className="text-red-500">
                ❌ {overallProgress.failed} failed
              </span>
            )}
            {overallProgress.speed > 0 && (
              <span className="ml-auto font-medium text-emerald-600 dark:text-emerald-400">
                {Math.round(overallProgress.speed / 1024)} KB/s
              </span>
            )}
          </div>
        </div>
      )}

      {/* Queue Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {state.isPaused ? (
          <button
            onClick={resumeAll}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium
              text-white hover:bg-emerald-700 transition-colors"
          >
            ▶ Resume All
          </button>
        ) : hasActive ? (
          <button
            onClick={pauseAll}
            className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5
              text-xs font-medium text-yellow-700 hover:bg-yellow-100
              dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300
              transition-colors"
          >
            ⏸ Pause All
          </button>
        ) : null}

        {hasItems && (
          <button
            onClick={cancelAll}
            className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5
              text-xs font-medium text-red-700 hover:bg-red-100
              dark:border-red-700 dark:bg-red-900/30 dark:text-red-300
              transition-colors"
          >
            ⛔ Cancel All
          </button>
        )}

        {hasFailed && (
          <button
            onClick={retryFailed}
            className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-1.5
              text-xs font-medium text-orange-700 hover:bg-orange-100
              dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300
              transition-colors"
          >
            🔄 Retry Failed
          </button>
        )}

        {hasCompleted && (
          <button
            onClick={clearCompleted}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium
              text-gray-600 hover:bg-gray-50
              dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800
              transition-colors"
          >
            🗑 Clear Completed
          </button>
        )}

        <span className="ml-auto text-xs text-gray-400">
          {orderedItems.length} item
          {orderedItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Queue Items */}
      <div className="flex flex-col gap-3">
        {orderedItems.map((item) => (
          <DownloadCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}