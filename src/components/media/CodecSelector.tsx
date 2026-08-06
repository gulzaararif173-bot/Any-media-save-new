// components/media/CodecSelector.tsx
'use client';

import React from 'react';

interface CodecSelectorProps {
  value: string;
  onChange: (codec: string) => void;
  type: 'video' | 'audio';
  disabled?: boolean;
}

const VIDEO_CODECS = ['h264', 'h265', 'vp8', 'vp9', 'av1'] as const;
const AUDIO_CODECS = ['aac', 'mp3', 'flac', 'opus', 'pcm'] as const;

const CODEC_LABELS: Record<string, string> = {
  h264: 'H.264 (AVC)', h265: 'H.265 (HEVC)', vp8: 'VP8',
  vp9: 'VP9', av1: 'AV1', aac: 'AAC', mp3: 'MP3',
  flac: 'FLAC', opus: 'Opus', pcm: 'PCM (Lossless)',
};

export function CodecSelector({ value, onChange, type, disabled = false }: CodecSelectorProps) {
  const codecs: readonly string[] = type === 'video' ? VIDEO_CODECS : AUDIO_CODECS;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
        {type === 'video' ? 'Video' : 'Audio'} Codec
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
        {codecs.map((c: string) => (
          <option key={c} value={c}>{CODEC_LABELS[c] ?? c}</option>
        ))}
      </select>
    </div>
  );
}