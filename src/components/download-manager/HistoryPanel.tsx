// components/download-manager/HistoryPanel.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlatformBadge } from '../download/PlatformBadge';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type Platform = React.ComponentProps<typeof PlatformBadge>['platform'];

function formatBytes(bytes: number | string | null | undefined): string {
  if (bytes === null || bytes === undefined || bytes === '') return '0 B';

  const value = typeof bytes === 'string' ? Number(bytes) : bytes;
  if (!Number.isFinite(value) || value <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function useDownloadHistory(_options: any) {
  return {
    history: [],
    totalCount: 0,
    deleteHistoryEntry: (_id: string | number) => {},
  };
}

export function HistoryPanel() {
  const [search] = useState('');
  const [platform] = useState('all');
  const [page] = useState(1);

  const {
    history,
    totalCount,
    deleteHistoryEntry,
  } = useDownloadHistory({
    searchQuery: search,
    platformFilter: platform,
    page,
    pageSize: 15,
  });

  const STATUS_ICONS: Record<string, string> = {
    completed: '✅',
    failed: '❌',
    cancelled: '⛔',
  };

  if (totalCount === 0 && !search && platform === 'all') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 text-4xl">📋</div>
        <p className="text-base font-medium text-gray-600 dark:text-gray-400">
          No download history yet
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Completed downloads will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      {/* ... (unchanged code above) */}

      {history.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No results found.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
          {history.map((entry: any) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {/* ✅ Thumbnail FIXED */}
              <div className="relative flex-shrink-0 h-11 w-[72px]">
                {entry.thumbnail ? (
                  <Image
                    src={entry.thumbnail}
                    alt={String(entry.title)}
                    fill
                    sizes="72px"
                    className="rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-11 w-[72px] items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                    <span className="text-gray-400">▶</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <p className="flex-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                    {STATUS_ICONS[entry.status]} {entry.title}
                  </p>
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  <PlatformBadge
                    platform={entry.platform as Platform}
                    size="sm"
                    showLabel={false}
                  />
                  <span className="text-xs text-gray-500">
                    {entry.format.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {entry.quality}
                  </span>
                  {entry.filesize && (
                    <span className="text-xs text-gray-500">
                      {formatBytes(entry.filesize)}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(entry.downloadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteHistoryEntry(entry.id)}
                className="flex-shrink-0 rounded p-1 text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors"
                title="Remove from history"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination unchanged */}
    </div>
  );
}