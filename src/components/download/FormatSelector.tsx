// components/download/FormatSelector.tsx
'use client';

import React from 'react';

// Local definitions to avoid missing-module build error when the external
// mime utils module is not available. Keep these in sync with the real
// implementation if/when that module is restored.
export type SupportedFormat = 'mp4' | 'webm' | 'mp3' | 'm4a' | 'aac';

export const SUPPORTED_FORMATS: SupportedFormat[] = ['mp4', 'webm', 'mp3', 'm4a', 'aac'];

export function isAudioFormat(f: SupportedFormat) {
  return f === 'mp3' || f === 'm4a' || f === 'aac';
}

interface FormatSelectorProps {
  selected: SupportedFormat;
  onChange: (format: SupportedFormat) => void;
  audioOnly?: boolean;
  disabled?: boolean;
}

const FORMAT_LABELS: Record<SupportedFormat, string> = {
  mp4: 'MP4 (Video)',
  webm: 'WebM (Video)',
  mp3: 'MP3 (Audio)',
  m4a: 'M4A (Audio)',
  aac: 'AAC (Audio)',
};

export function FormatSelector({
  selected,
  onChange,
  audioOnly = false,
  disabled = false,
}: FormatSelectorProps) {
  type NewType = SupportedFormat;

  const formats: NewType[] = audioOnly
    ? (SUPPORTED_FORMATS.filter((f: any) => isAudioFormat(f)) as SupportedFormat[])
    : (SUPPORTED_FORMATS as SupportedFormat[]);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="format-select"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Format
      </label>
      <select
        id="format-select"
        value={selected}
        onChange={(e) => onChange(e.target.value as SupportedFormat)}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {formats.map((f: SupportedFormat) => (
          <option key={f} value={f}>
            {FORMAT_LABELS[f]}
          </option>
        ))}
      </select>
    </div>
  );
}