// components/download/playlist/PlaylistVideoList.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
// Local PlaylistVideo type (original external type not found in this context)
// Keep minimal fields used by this component.
type PlaylistVideo = {
  id: string;
  isPrivate?: boolean;
  isLive?: boolean;
  [key: string]: any;
};
import { PlaylistVideoItem } from './PlaylistVideoItem';

interface PlaylistVideoListProps {
  videos: PlaylistVideo[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  disabled?: boolean;
  maxVisible?: number;
}

export function PlaylistVideoList({
  videos,
  selectedIds,
  onSelectionChange,
  disabled = false,
  maxVisible = 50,
}: PlaylistVideoListProps) {
  const [showAll, setShowAll] = useState(false);

  const availableVideos = useMemo(
    () =>
      videos.filter(
        (v) =>
          !v.isPrivate &&
          !v.isLive
      ),
    [videos]
  );

  const visibleVideos = showAll ? videos : videos.slice(0, maxVisible);

  const handleToggle = useCallback(
    (videoId: string) => {
      const next = new Set(selectedIds);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      onSelectionChange(next);
    },
    [selectedIds, onSelectionChange]
  );

  const handleSelectAll = useCallback(() => {
    onSelectionChange(
      new Set(availableVideos.map((v) => v.id))
    );
  }, [availableVideos, onSelectionChange]);

  const handleUnselectAll = useCallback(() => {
    onSelectionChange(new Set());
  }, [onSelectionChange]);

  const handleSelectVisible = useCallback(() => {
    const visibleAvailable = visibleVideos
      .filter(
        (v) =>
          !v.isPrivate &&
          !v.isLive
      )
      .map((v) => v.id);
    onSelectionChange(new Set(visibleAvailable));
  }, [visibleVideos, onSelectionChange]);

  const allSelected =
    availableVideos.length > 0 &&
    availableVideos.every((v) => selectedIds.has(v.id));

  return (
    <div className="flex flex-col gap-3">
      {/* Selection Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectedIds.size} / {availableVideos.length} selected
          </span>
          {videos.length - availableVideos.length > 0 && (
            <span className="text-xs text-gray-400">
              ({videos.length - availableVideos.length} unavailable)
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            disabled={disabled || allSelected}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs
              font-medium text-gray-700 hover:bg-gray-50
              disabled:cursor-not-allowed disabled:opacity-50
              dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
              transition-colors"
          >
            Select All
          </button>
          <button
            onClick={handleUnselectAll}
            disabled={disabled || selectedIds.size === 0}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs
              font-medium text-gray-700 hover:bg-gray-50
              disabled:cursor-not-allowed disabled:opacity-50
              dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
              transition-colors"
          >
            Unselect All
          </button>
          {!showAll && videos.length > maxVisible && (
            <button
              onClick={handleSelectVisible}
              disabled={disabled}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs
                font-medium text-gray-700 hover:bg-gray-50
                disabled:cursor-not-allowed disabled:opacity-50
                dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
                transition-colors"
            >
              Select Visible
            </button>
          )}
        </div>
      </div>

      {/* Video List */}
      <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {visibleVideos.map((video) => (
            <PlaylistVideoItem
              key={video.id}
              video={video}
              selected={selectedIds.has(video.id)}
              onToggle={handleToggle}
              disabled={disabled}
            />
          ))}
        </div>

        {!showAll && videos.length > maxVisible && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-3 text-center text-sm text-blue-600
              hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300
              hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Show all {videos.length} videos ({videos.length - maxVisible} more)
          </button>
        )}
      </div>
    </div>
  );
}