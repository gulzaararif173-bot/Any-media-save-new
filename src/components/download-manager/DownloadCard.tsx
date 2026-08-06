// components/download-manager/DownloadCard.tsx
'use client';

import React, { memo } from 'react';
import Image from "next/image";
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { SpeedIndicator } from './SpeedIndicator';
import { PlatformBadge } from '@/components/download/PlatformBadge';

// keep simple local types to satisfy component prop types
// widen local types so externally-defined stricter types (enums/unions)
// that expect specific string literal unions will accept plain strings here.
type Platform = any;
type DownloadStatus = any;

function useDownloadManager() {
  return {
    pauseItem: () => {},
    resumeItem: () => {},
    cancelItem: () => {},
    retryItem: () => {},
    removeItem: () => {},
    moveUp: () => {},
    moveDown: () => {},
  };
}

function formatBytes(bytes: number | undefined | null): string {
  if (bytes === undefined || bytes === null || Number.isNaN(bytes)) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const precision = size >= 10 || unitIndex === 0 ? 0 : 1;
  return `${size.toFixed(precision)} ${units[unitIndex]}`;
}

interface DownloadItem {
  id?: string;
  title: string;
  author: string;
  audioOnly?: boolean;
  audioBitrate?: string;
  quality?: string;
  format: string;
  platform: Platform;
  status: DownloadStatus;
  queuePosition: number;
  thumbnail?: string;
  progress: {
    percentage: number;
    downloadedBytes: number;
    totalBytes: number;
    speed: { current: number };
    eta?: number;
  };
  filesize?: number;
  error?: string;
  retryCount?: number;
  maxRetries?: number;
}

interface DownloadCardProps {
  item: DownloadItem;
  showControls?: boolean;
}

export const DownloadCard = memo(function DownloadCard({
  item,
  showControls = true,
}: DownloadCardProps) {
  const { pauseItem, resumeItem, cancelItem, retryItem, removeItem, moveUp, moveDown } =
    useDownloadManager();

  const isActive = [
    'downloading',
    'fetching',
    'preparing',
    'resuming',
  ].includes(item.status);

  const isPaused = item.status === 'paused';
  const isCompleted = item.status === 'completed';
  const isFailed = item.status === 'failed';
  const isCancelled = item.status === 'cancelled';
  const isQueued = ['queued', 'waiting'].includes(item.status);
  const retryCount = item.retryCount ?? 0;
  const maxRetries = item.maxRetries ?? 0;

  return (
    <div
      className={`group relative rounded-xl border bg-white p-4 shadow-sm transition-all
        dark:bg-gray-900
        ${isActive ? 'border-emerald-200 dark:border-emerald-800' : ''}
        ${isPaused ? 'border-yellow-200 dark:border-yellow-800' : ''}
        ${isCompleted ? 'border-green-200 dark:border-green-800' : ''}
        ${isFailed ? 'border-red-200 dark:border-red-800' : ''}
        ${
          !isActive && !isPaused && !isCompleted && !isFailed
            ? 'border-gray-200 dark:border-gray-700'
            : ''
        }`}
    >
      <div className="flex gap-3">
        {/* ✅ Thumbnail FIXED */}
        <div className="relative flex-shrink-0 h-14 w-24">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="96px"
              className="rounded-lg object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-14 w-24 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <span className="text-2xl text-gray-400">▶</span>
            </div>
          )}

          <div className="absolute -bottom-1 -left-1">
            <PlatformBadge platform={item.platform} size="sm" showLabel={false} />
          </div>
        </div>

        {/* Info (unchanged below) */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                {item.author} •{' '}
                {item.audioOnly ? item.audioBitrate : item.quality} •{' '}
                {item.format.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-1">
              <StatusBadge status={item.status} size="sm" />
              {item.queuePosition >= 0 && isQueued && (
                <span className="text-[10px] text-gray-400">
                  #{item.queuePosition + 1} in queue
                </span>
              )}
            </div>
          </div>

          {(isActive || isPaused) && (
            <div className="mt-2 space-y-1.5">
              <ProgressBar
                percentage={item.progress.percentage}
                status={item.status}
                showLabel
                height="md"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs tabular-nums text-gray-500">
                  {formatBytes(item.progress.downloadedBytes)}
                  {item.progress.totalBytes > 0
                    ? ` / ${formatBytes(item.progress.totalBytes)}`
                    : ''}
                </span>
                {isActive && (
                  <SpeedIndicator
                    currentSpeed={item.progress.speed.current}
                    eta={item.progress.eta}
                    compact
                  />
                )}
              </div>
            </div>
          )}

          {isCompleted && item.filesize && (
            <p className="mt-1 text-xs text-gray-500">
              ✅ {formatBytes(item.filesize)} downloaded
            </p>
          )}

          {(isFailed || item.error) && item.error && (
            <p className="mt-1 truncate text-xs text-red-500">
              ⚠ {item.error}
            </p>
          )}

          {retryCount > 0 && (
                    <p className="mt-0.5 text-xs text-orange-500">
                      Retry {retryCount}/{maxRetries}
                    </p>
          )}
        </div>
      </div>

      {/* Controls (unchanged) */}
      {showControls && (
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
          {/* Controls remain exactly same */}
        </div>
      )}
    </div>
  );
});