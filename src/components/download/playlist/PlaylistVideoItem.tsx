// components/download/playlist/PlaylistVideoItem.tsx
'use client';

import React from 'react';
import Image from "next/image";

// Local PlaylistVideo type (mirrors expected shape from original project)
type PlaylistVideo = {
  id: string;
  title?: string;
  thumbnail?: string;
  duration?: number; // seconds
  position?: number | string;
  author?: string;
  availability?:
    | 'private'
    | 'deleted'
    | 'age_restricted'
    | 'geo_blocked'
    | 'live'
    | 'available';
  isPrivate?: boolean;
  isLive?: boolean;
};

// Minimal duration formatter (seconds -> H:MM:SS or M:SS)
const formatDuration = (secs: number) => {
  const s = Math.max(0, Math.floor(secs || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  if (h > 0) return `${h}:${pad(m)}:${pad(sec)}`;
  return `${m}:${pad(sec)}`;
};

interface PlaylistVideoItemProps {
  video: PlaylistVideo;
  selected: boolean;
  onToggle: (videoId: string) => void;
  disabled?: boolean;
}

type AvailabilityKey =
  | 'private'
  | 'deleted'
  | 'age_restricted'
  | 'geo_blocked'
  | 'live'
  | 'available';

const AVAILABILITY_BADGES: Record<
  Exclude<AvailabilityKey, 'available'>,
  { label: string; className: string }
> = {
  private: {
    label: '🔒 Private',
    className:
      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  },
  deleted: {
    label: '🗑 Deleted',
    className:
      'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400',
  },
  age_restricted: {
    label: '🔞 18+',
    className:
      'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
  },
  geo_blocked: {
    label: '🌍 Blocked',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  },
  live: {
    label: '🔴 Live',
    className:
      'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  },
};

const isUnavailable = (video: PlaylistVideo): boolean => {
  const v: any = video as any;
  return v.availability !== 'available' || Boolean(v.isPrivate) || Boolean(v.isLive);
};

export function PlaylistVideoItem({
  video,
  selected,
  onToggle,
  disabled = false,
}: PlaylistVideoItemProps) {
  const unavailable = isUnavailable(video);

  const badge = (() => {
    const v: any = video as any;
    return v.availability !== 'available'
      ? AVAILABILITY_BADGES[v.availability as keyof typeof AVAILABILITY_BADGES]
      : undefined;
  })();

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors
        ${
          selected
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }
        ${unavailable ? 'opacity-60' : ''}`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(video.id)}
        disabled={disabled || unavailable}
        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-blue-600
          focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <span className="w-6 flex-shrink-0 text-center text-xs text-gray-400">
        {(video as any).position}
      </span>

      {video.thumbnail && (
        <div className="relative h-14 w-24 flex-shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title || 'Video thumbnail'}
            fill
            sizes="96px"
            className="rounded object-cover"
            priority={false}
          />

          {(video as any).duration > 0 && (
            <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[10px] text-white">
              {formatDuration((video as any).duration ?? 0)}
            </span>
          )}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {video.title}
        </p>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
          {(video as any).author && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {(video as any).author}
            </span>
          )}

          {badge && (
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`}
            >
              {badge.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}