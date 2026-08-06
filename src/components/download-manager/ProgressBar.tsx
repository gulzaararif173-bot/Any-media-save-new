// components/download-manager/ProgressBar.tsx
'use client';

import React from 'react';

type DownloadStatus = 'queued' | 'preparing' | 'fetching' | 'downloading' | 'paused' | 'resuming' | 'completed' | 'cancelled' | 'failed' | 'retrying' | 'waiting';

interface ProgressBarProps {
  percentage: number;
  status: DownloadStatus;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  percentage,
  status,
  showLabel = false,
  height = 'md',
}: ProgressBarProps) {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  const heightClass = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2.5',
  }[height];

  const barColor = {
    queued: 'bg-gray-400',
    preparing: 'bg-blue-400',
    fetching: 'bg-indigo-500',
    downloading: 'bg-emerald-500',
    paused: 'bg-yellow-400',
    resuming: 'bg-cyan-500',
    completed: 'bg-green-500',
    cancelled: 'bg-gray-300',
    failed: 'bg-red-500',
    retrying: 'bg-orange-400',
    waiting: 'bg-slate-400',
  }[status] ?? 'bg-blue-500';

  const isAnimated = ['downloading', 'fetching', 'preparing', 'resuming'].includes(status);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${heightClass}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}
            ${isAnimated && clampedPct < 100 ? 'animate-pulse' : ''}`}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 flex-shrink-0 text-right text-xs font-medium tabular-nums text-gray-600 dark:text-gray-400">
          {clampedPct}%
        </span>
      )}
    </div>
  );
}