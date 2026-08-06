// components/download/playlist/PlaylistDownloadPanel.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';

// Type fallbacks for missing modules
type PlaylistMetadata = any;
const isAudioFormat = (format: string) =>
  ['mp3', 'aac', 'm4a', 'flac', 'ogg', 'opus'].includes(format);
const usePlaylistDownload = (): any => ({
  progress: {
    status: 'pending' as const,
    zipReady: false,
    overallPercent: 0,
    completedCount: 0,
    totalVideos: 0,
    failedCount: 0,
    skippedCount: 0,
    paused: false,
    currentVideo: null,
  },
  loading: false,
  error: null,
  started: false,
  start: async (p0: { playlistUrl: any; selectedVideoIds: string[]; format: SupportedFormat; quality: VideoQuality; audioOnly: boolean; audioBitrate: AudioBitrate; maxParallel: number; skipPrivate: boolean; skipLive: boolean; createZip: boolean; }) => {},
  pause: () => {},
  cancel: () => {},
  retry: () => {},
  downloadZip: async () => {},
  cleanup: () => {},
  reset: () => {},
});

import { PlaylistCard } from './PlaylistCard';
import { PlaylistVideoList } from './PlaylistVideoList';
import { PlaylistProgressBar } from './PlaylistProgressBar';
import { FormatSelector } from '../FormatSelector';
import type { SupportedFormat } from '../FormatSelector';
import { QualitySelector } from '../QualitySelector';
import type { AudioBitrate } from '../AudioBitrateSelector';
import { AudioBitrateSelector } from '../AudioBitrateSelector';

type VideoQuality = "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "best" | "worst";

interface PlaylistDownloadPanelProps {
  metadata: PlaylistMetadata;
}

export function PlaylistDownloadPanel({
  metadata,
}: PlaylistDownloadPanelProps) {
  const videos: any[] = (metadata as any).videos ?? [];
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(videos.filter((v) => v.availability === 'available' && !v.isPrivate && !v.isLive).map((v) => v.id))
  );

  const [format, setFormat] = useState<SupportedFormat>('mp4');
  const [quality, setQuality] = useState<VideoQuality>('720p');
  const [audioBitrate, setAudioBitrate] =
    useState<AudioBitrate>('128kbps');
  const [audioOnly, setAudioOnly] = useState(false);
  const [createZip, setCreateZip] = useState(false);
  const [maxParallel, setMaxParallel] = useState(2);

  const {
    progress,
    loading,
    error,
    started,
    start,
    pause,
    cancel,
    retry,
    downloadZip,
    cleanup,
    reset,
  } = usePlaylistDownload();

  const isAudio = audioOnly || isAudioFormat(format);

  const availableQualities = useMemo(() => {
    const qualitySets = videos
      .filter((v: any) => v.availableQualities?.length > 0)
      .flatMap((v: any) => v.availableQualities);
    return qualitySets.length > 0
      ? [...new Set(qualitySets)] as VideoQuality[]
      : (['360p', '480p', '720p', '1080p'] as VideoQuality[]);
  }, [videos]);

  const availableBitrates = useMemo(() => {
    const bitrateSets = videos
      .filter((v: any) => v.availableAudioBitrates?.length > 0)
      .flatMap((v: any) => v.availableAudioBitrates);
    return bitrateSets.length > 0
      ? [...new Set(bitrateSets)] as AudioBitrate[]
      : (['128kbps', '192kbps', '256kbps'] as AudioBitrate[]);
  }, [videos]);

  const handleFormatChange = useCallback(
    (newFormat: SupportedFormat) => {
      setFormat(newFormat);
      if (isAudioFormat(newFormat)) {
        setAudioOnly(true);
      } else {
        setAudioOnly(false);
      }
      reset();
    },
    [reset]
  );

  const handleStart = useCallback(async () => {
    if (selectedIds.size === 0) return;

    await start({
      playlistUrl: (metadata as any).playlistUrl || (metadata as any).url,
      selectedVideoIds: Array.from(selectedIds),
      format,
      quality,
      audioOnly: isAudio,
      audioBitrate,
      maxParallel,
      skipPrivate: true,
      skipLive: true,
      createZip,
    });
  }, [
    selectedIds,
    start,
    metadata,
    format,
    quality,
    isAudio,
    audioBitrate,
    maxParallel,
    createZip,
  ]);

  const isDownloading =
    started &&
    progress?.status === 'pending';

  return (
    <div className="flex flex-col gap-4">
      {/* Playlist Info */}
      <PlaylistCard metadata={metadata} />

      {/* Progress (when active) */}
      {started && progress && (
        <PlaylistProgressBar
          progress={progress}
          onPause={pause}
          onCancel={cancel}
          onRetry={retry}
          onDownloadZip={downloadZip}
        />
      )}

      {/* Configuration */}
      {!isDownloading && (
        <>
          {/* Video Selection */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Select Videos ({selectedIds.size} selected)
            </h3>
            <PlaylistVideoList
                videos={videos}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              disabled={loading}
            />
          </div>

          {/* Download Options */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Download Options
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormatSelector
                selected={format}
                onChange={handleFormatChange}
                audioOnly={audioOnly}
                disabled={loading}
              />

              {!isAudio && (
                <QualitySelector
                  availableQualities={availableQualities as VideoQuality[]}
                  selected={quality}
                  onChange={setQuality}
                  disabled={loading}
                />
              )}

              {isAudio && (
                <AudioBitrateSelector
                  availableBitrates={availableBitrates as AudioBitrate[]}
                  selected={audioBitrate as AudioBitrate}
                  onChange={(value) => setAudioBitrate(value)}
                  disabled={loading}
                />
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {/* Audio-only toggle */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={audioOnly}
                  onChange={(e) => {
                    setAudioOnly(e.target.checked);
                    if (e.target.checked && !isAudioFormat(format)) {
                      setFormat('mp3');
                    } else if (
                      !e.target.checked &&
                      isAudioFormat(format)
                    ) {
                      setFormat('mp4');
                    }
                  }}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600
                    focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Audio only
                </span>
              </label>

              {/* ZIP toggle */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={createZip}
                  onChange={(e) => setCreateZip(e.target.checked)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600
                    focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Create ZIP archive
                </span>
              </label>
            </div>

            {/* Parallel Downloads */}
            <div className="mt-4 flex flex-col gap-1">
              <label
                htmlFor="parallel-select"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Parallel Downloads: {maxParallel}
              </label>
              <input
                id="parallel-select"
                type="range"
                min={1}
                max={5}
                value={maxParallel}
                onChange={(e) =>
                  setMaxParallel(Number(e.target.value))
                }
                disabled={loading}
                className="w-full accent-blue-600 disabled:opacity-50"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1 (slow)</span>
                <span>5 (fast)</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      {!isDownloading && (
        <div className="flex gap-3">
          {started && (
            <button
              onClick={cleanup}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium
                text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
                dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
                transition-colors"
            >
              Reset
            </button>
          )}

          <button
            onClick={() => void handleStart()}
            disabled={loading || selectedIds.size === 0}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium
              text-white hover:bg-red-700 focus:outline-none focus:ring-2
              focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50
              transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Starting...
              </span>
            ) : (
              `⬇ Download ${selectedIds.size} Video${selectedIds.size !== 1 ? 's' : ''}`
            )}
          </button>

          {progress?.zipReady && (
            <button
              onClick={downloadZip}
              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium
                text-white hover:bg-green-700 transition-colors"
            >
              📦 ZIP
            </button>
          )}
        </div>
      )}
    </div>
  );
}