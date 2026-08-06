// components/media/BitrateSelector.tsx
'use client';

import React from 'react';

const AUDIO_BITRATES = [64, 128, 192, 256, 320];

interface BitrateSelectorProps {
  value: number;
  onChange: (bitrate: number) => void;
  disabled?: boolean;
}

export function BitrateSelector({ value, onChange, disabled = false }: BitrateSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
        Audio Bitrate
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {AUDIO_BITRATES.map((b) => (
          <option key={b} value={b}>{b} kbps</option>
        ))}
      </select>
    </div>
  );
}