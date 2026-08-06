'use client';

import React from 'react';
import Image from 'next/image';
// Local fallback types and util to avoid missing-module errors when
// ../../../lib/download isn't available in this environment.
export type PlaylistType =
  | 'normal'
  | 'playlist'
  | 'mix'
  | 'music'
  | 'private'
  | 'unlisted'
  | 'large'
  | 'channel'
  | 'user'
  | 'watchLater'
  | 'liked'
  | 'unknown';

export interface PlaylistMetadata {
  title: string;
  thumbnail?: string;
  videoCount: number;
  totalDuration?: number; // seconds
  viewCount?: number | null;
  lastUpdated?: string | null;
  description?: string | null;
  owner?: string | null;
  channelTitle?: string | null;
  playlistType?: PlaylistType;
  isPrivate?: boolean;
  isUnlisted?: boolean;
}

function formatDuration(seconds: number) {
  if (!seconds || seconds <= 0) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (v: number) => String(v).padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

interface PlaylistCardProps {
  metadata: PlaylistMetadata;
}

const PLAYLIST_TYPE_LABELS: Partial<Record<PlaylistType, string>> = {
  normal: 'Playlist',
  playlist: 'Playlist',
  mix: 'Mix',
  music: 'Music Playlist',
  private: 'Private',
  unlisted: 'Unlisted',
  large: 'Large Playlist',
  channel: 'Channel',
  user: 'User Playlist',
  watchLater: 'Watch Later',
  liked: 'Liked Videos',
  unknown: 'Playlist',
};

export function PlaylistCard({ metadata }: PlaylistCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex gap-4">
        {metadata.thumbnail && (
          <div className="relative flex-shrink-0">
            <Image
              src={metadata.thumbnail}
              alt={metadata.title}
              width={160}
              height={96}
              className="h-24 w-40 rounded-lg object-cover"
              unoptimized
            />
            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
              {metadata.videoCount} videos
            </span>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/50 dark:text-red-300">
              {PLAYLIST_TYPE_LABELS[metadata.playlistType ?? 'normal'] ?? 'Playlist'}
            </span>

            {metadata.isPrivate && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                🔒 Private
              </span>
            )}

            {metadata.isUnlisted && (
              <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">
                🔗 Unlisted
              </span>
            )}
          </div>

          <h2 className="mb-1 line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
            {metadata.title}
          </h2>

          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {metadata.owner ?? metadata.channelTitle ?? 'Unknown channel'}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>🎬 {metadata.videoCount} videos</span>
            <span>⏱ {formatDuration(metadata.totalDuration ?? 0)}</span>

            {(metadata.viewCount ?? 0) > 0 && (
              <span>👁 {metadata.viewCount?.toLocaleString()} views</span>
            )}

            {metadata.lastUpdated && (
              <span>📅 Updated {metadata.lastUpdated}</span>
            )}
          </div>
        </div>
      </div>

      {metadata.description && (
        <p className="mt-3 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {metadata.description}
        </p>
      )}
    </div>
  );
}