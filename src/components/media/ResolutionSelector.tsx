// components/media/ResolutionSelector.tsx
'use client';

import React from 'react';

type QualityPreset =
  | '144p'
  | '240p'
  | '360p'
  | '480p'
  | '720p'
  | '1080p'
  | '1440p'
  | '2160p'
  | '4320p';

const QUALITY_PRESETS: QualityPreset[] = [
  '144p',
  '240p',
  '360p',
  '480p',
  '720p',
  '1080p',
  '1440p',
  '2160p',
  '4320p',
];

interface ResolutionSelectorProps {
  value: string;
  onChange: (quality: string) => void;
  disabled?: boolean;
}

const LABELS: Record<QualityPreset, string> = {
  '144p': '144p', '240p': '240p', '360p': '360p (SD)',
  '480p': '480p', '720p': '720p (HD)', '1080p': '1080p (Full HD)',
  '1440p': '1440p (2K)', '2160p': '2160p (4K)', '4320p': '4320p (8K)',
};

export function ResolutionSelector({ value, onChange, disabled = false }: ResolutionSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
        Resolution
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {QUALITY_PRESETS.map((q) => (
          <option key={q} value={q}>{LABELS[q]}</option>
        ))}
      </select>
    </div>
  );
}