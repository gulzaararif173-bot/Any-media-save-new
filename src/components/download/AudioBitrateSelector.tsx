// components/download/AudioBitrateSelector.tsx
'use client';

import React from 'react';

export type AudioBitrate =
  | '64kbps'
  | '96kbps'
  | '128kbps'
  | '192kbps'
  | '256kbps'
  | '320kbps';

const ALL_AUDIO_BITRATES: AudioBitrate[] = [
  '64kbps',
  '96kbps',
  '128kbps',
  '192kbps',
  '256kbps',
  '320kbps',
];

interface AudioBitrateSelectorProps {
  availableBitrates: AudioBitrate[];
  selected: AudioBitrate;
  onChange: (bitrate: AudioBitrate) => void;
  disabled?: boolean;
}

const BITRATE_LABELS: Record<AudioBitrate, string> = {
  '64kbps': '64 kbps (Low)',
  '96kbps': '96 kbps',
  '128kbps': '128 kbps (Standard)',
  '192kbps': '192 kbps (Good)',
  '256kbps': '256 kbps (High)',
  '320kbps': '320 kbps (Best)',
};

export function AudioBitrateSelector({
  availableBitrates,
  selected,
  onChange,
  disabled = false,
}: AudioBitrateSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="bitrate-select"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Audio Quality
      </label>
      <select
        id="bitrate-select"
        value={selected}
        onChange={(e) => onChange(e.target.value as AudioBitrate)}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {ALL_AUDIO_BITRATES.map((b: AudioBitrate) => {
          const isAvailable =
            availableBitrates.length === 0 ||
            availableBitrates.includes(b);
          return (
            <option key={b} value={b} disabled={!isAvailable}>
              {BITRATE_LABELS[b]}
              {!isAvailable ? ' (unavailable)' : ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}