// components/media/FpsSelector.tsx
'use client';

import React from 'react';

const FRAME_RATES: number[] = [24, 30, 60, 120];

interface FpsSelectorProps {
  value: number;
  onChange: (fps: number) => void;
  disabled?: boolean;
}

export function FpsSelector({ value, onChange, disabled = false }: FpsSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
        Frame Rate
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
        {FRAME_RATES.map((f: number) => (
          <option key={f} value={f}>{f} fps</option>
        ))}
      </select>
    </div>
  );
}