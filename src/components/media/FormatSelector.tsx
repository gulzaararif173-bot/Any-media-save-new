// components/media/FormatSelector.tsx
'use client';

import React from 'react';

// Local fallback definitions for video/audio formats.
// Kept here to avoid a hard dependency on '@/lib/media/types' which may not exist
// in all environments. If you have a central definition, replace these.
const VIDEO_FORMATS: string[] = ['mp4', 'webm', 'mkv', 'mov', 'avi', 'flv', 'mpeg', 'ts', '3gp', 'm4v'];
const AUDIO_FORMATS: string[] = ['mp3', 'aac', 'm4a', 'flac', 'wav', 'ogg', 'opus', 'aiff'];

interface FormatSelectorProps {
  value: string;
  onChange: (format: string) => void;
  type?: 'video' | 'audio' | 'all';
  disabled?: boolean;
  label?: string;
}

const FORMAT_LABELS: Record<string, string> = {
  mp4: 'MP4', webm: 'WebM', mkv: 'MKV', mov: 'MOV', avi: 'AVI',
  flv: 'FLV', mpeg: 'MPEG', ts: 'TS', '3gp': '3GP', m4v: 'M4V',
  mp3: 'MP3', aac: 'AAC', m4a: 'M4A', flac: 'FLAC',
  wav: 'WAV', ogg: 'OGG', opus: 'OPUS', aiff: 'AIFF',
};

export function FormatSelector({
  value, onChange, type = 'all', disabled = false, label = 'Format',
}: FormatSelectorProps) {
  const formats: string[] =
    type === 'video' ? VIDEO_FORMATS
    : type === 'audio' ? AUDIO_FORMATS
    : [...VIDEO_FORMATS, ...AUDIO_FORMATS];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {formats.map((f) => (
          <option key={f} value={f}>{FORMAT_LABELS[f] ?? f.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}