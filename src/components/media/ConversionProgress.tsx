// components/media/ConversionProgress.tsx
'use client';

import React from 'react';

interface ConversionProgressProps {
  percentage: number;
  isConverting: boolean;
  error: string | null;
  onCancel?: () => void;
}

export function ConversionProgress({
  percentage,
  isConverting,
  error,
  onCancel,
}: ConversionProgressProps) {
  if (!isConverting && !error && percentage === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      {isConverting && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Converting...
            </span>
            <span className="text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
              {percentage}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors"
            >
              Cancel
            </button>
          )}
        </>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
          ⚠ {error}
        </div>
      )}

      {!isConverting && !error && percentage === 100 && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <span>✅</span>
          <span className="font-medium">Conversion complete!</span>
        </div>
      )}
    </div>
  );
}