// components/download-manager/SpeedIndicator.tsx
'use client';

import React from 'react';

interface SpeedIndicatorProps {
  currentSpeed: number;
  averageSpeed?: number;
  eta?: number;
  compact?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const index = Math.min(
    units.length - 1,
    Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024)))
  );
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(1).replace(/\.0$/, '')} ${units[index]}`;
}

function formatEta(seconds: number): string {
  if (seconds <= 0) return '--';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor(
    (seconds % 3600) / 60
  )}m`;
}

export function SpeedIndicator({
  currentSpeed,
  averageSpeed,
  eta,
  compact = false,
}: SpeedIndicatorProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs tabular-nums text-gray-500 dark:text-gray-400">
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {formatBytes(currentSpeed)}/s
        </span>
        {eta != null && eta > 0 && (
          <span>ETA {formatEta(eta)}</span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Speed
        </div>
        <div className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
          {formatBytes(currentSpeed)}/s
        </div>
      </div>
      {averageSpeed != null && (
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Avg
          </div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
            {formatBytes(averageSpeed)}/s
          </div>
        </div>
      )}
      {eta != null && (
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ETA
          </div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-gray-700 dark:text-gray-300">
            {formatEta(eta)}
          </div>
        </div>
      )}
    </div>
  );
}