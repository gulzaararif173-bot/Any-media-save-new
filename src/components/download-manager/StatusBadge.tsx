// components/download-manager/StatusBadge.tsx
'use client';

import React from 'react';

type DownloadStatus =
  | 'queued'
  | 'preparing'
  | 'fetching'
  | 'downloading'
  | 'paused'
  | 'resuming'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'retrying'
  | 'waiting';

interface StatusBadgeProps {
  status: DownloadStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  DownloadStatus,
  { label: string; className: string; dot: string }
> = {
  queued: {
    label: 'Queued',
    className:
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    dot: 'bg-gray-400',
  },
  preparing: {
    label: 'Preparing',
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-400 animate-pulse',
  },
  fetching: {
    label: 'Fetching',
    className:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    dot: 'bg-indigo-400 animate-pulse',
  },
  downloading: {
    label: 'Downloading',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    dot: 'bg-emerald-500 animate-pulse',
  },
  paused: {
    label: 'Paused',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    dot: 'bg-yellow-400',
  },
  resuming: {
    label: 'Resuming',
    className:
      'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    dot: 'bg-cyan-400 animate-pulse',
  },
  completed: {
    label: 'Completed',
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    dot: 'bg-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    className:
      'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
  failed: {
    label: 'Failed',
    className:
      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    dot: 'bg-red-500',
  },
  retrying: {
    label: 'Retrying',
    className:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    dot: 'bg-orange-400 animate-pulse',
  },
  waiting: {
    label: 'Waiting',
    className:
      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    dot: 'bg-slate-400',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const sizeClass =
    size === 'sm'
      ? 'text-[10px] px-1.5 py-0.5 gap-1'
      : 'text-xs px-2 py-0.5 gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium
        ${config.className} ${sizeClass}`}
    >
      <span
        className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${config.dot}`}
      />
      {config.label}
    </span>
  );
}