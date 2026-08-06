// components/download/DownloadPanel.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from "next/image";

type VideoQuality = '1080p' | '720p' | '480p' | '360p' | '240p' | '144p';
type AudioBitrate = '128kbps' | '192kbps' | '256kbps' | '320kbps';
type SupportedFormat = 'mp4' | 'mp3' | 'wav' | 'm4a' | 'aac';

function isAudioFormat(format: SupportedFormat) {
  return format === 'mp3' || format === 'wav' || format === 'm4a' || format === 'aac';
}

function formatDuration(duration: number | undefined) {
  if (!duration || duration <= 0) return '0:00';
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  const parts = [];

  if (hours > 0) parts.push(hours.toString());
  parts.push(hours > 0 ? String(minutes).padStart(2, '0') : minutes.toString());
  parts.push(String(seconds).padStart(2, '0'));

  return parts.join(':');
}

function useDownload() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setResult(null);
    setLoading(false);
    setError(null);
  }, []);

  const getDownloadLink = useCallback(async ({
    url,
    quality,
    format,
    audioOnly,
    audioBitrate,
  }: {
    url: string;
    quality: VideoQuality;
    format: SupportedFormat;
    audioOnly: boolean;
    audioBitrate: AudioBitrate;
  }) => {
    setLoading(true);
    setError(null);

    try {
      setResult(`${url}?quality=${quality}&format=${format}&audioOnly=${audioOnly}&audioBitrate=${audioBitrate}`);
    } catch (err) {
      setError('Unable to generate download link');
    } finally {
      setLoading(false);
    }
  }, []);

  const startStreamDownload = useCallback(({ 
    url,
    quality,
    format,
    audioOnly,
    audioBitrate,
  }: {
    url: string;
    quality: VideoQuality;
    format: SupportedFormat;
    audioOnly: boolean;
    audioBitrate: AudioBitrate;
  }) => {
    setLoading(true);
    setError(null);

    try {
      setResult(`${url}?stream=1&quality=${quality}&format=${format}&audioOnly=${audioOnly}&audioBitrate=${audioBitrate}`);
    } catch (err) {
      setError('Unable to start stream download');
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, getDownloadLink, startStreamDownload, reset };
}

interface VideoMetadata {
  id: string;
  thumbnail?: string;
  title: string;
  uploader: string;
  duration?: number;
  availableVideoQualities: VideoQuality[];
  isLive?: boolean;
  isShort?: boolean;
  ageRestricted?: boolean;
}

interface DownloadPanelProps {
  metadata: VideoMetadata;
}

export function DownloadPanel({ metadata }: DownloadPanelProps) {
  const [format, setFormat] = useState<SupportedFormat>('mp4');
  const [quality, setQuality] = useState<VideoQuality>('720p');
  const [audioBitrate, setAudioBitrate] =
    useState<AudioBitrate>('128kbps');
  const [audioOnly, setAudioOnly] = useState(false);

  const { result, loading, error, getDownloadLink, startStreamDownload, reset } =
    useDownload();

  const isAudio = audioOnly || isAudioFormat(format);

  useEffect(() => {
    if (metadata.availableVideoQualities.length > 0) {
      const preferred: VideoQuality[] = [
        '720p',
        '1080p',
        '480p',
        '360p',
      ];
      const found = preferred.find((q) =>
        metadata.availableVideoQualities.includes(q)
      );
      if (found) setQuality(found);
      else
        setQuality(
          metadata.availableVideoQualities[
            metadata.availableVideoQualities.length - 1] ?? "720p"
        );
    }
  }, [metadata.availableVideoQualities]);

  const handleFormatChange = useCallback(
    (newFormat: SupportedFormat) => {
      setFormat(newFormat);
      reset();
      setAudioOnly(isAudioFormat(newFormat));
    },
    [reset]
  );

  const handleGetLink = useCallback(async () => {
    await getDownloadLink({
      url: `https://www.youtube.com/watch?v=${metadata.id}`,
      quality,
      format,
      audioOnly: isAudio,
      audioBitrate,
    });
  }, [getDownloadLink, metadata.id, quality, format, isAudio, audioBitrate]);

  const handleStreamDownload = useCallback(() => {
    startStreamDownload({
      url: `https://www.youtube.com/watch?v=${metadata.id}`,
      quality,
      format,
      audioOnly: isAudio,
      audioBitrate,
    });
  }, [startStreamDownload, metadata.id, quality, format, isAudio, audioBitrate]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      
   {/* ✅ Video Info */}
<div className="mb-6 flex gap-4">
  {metadata.thumbnail && (
    <div className="relative h-24 w-40 flex-shrink-0">
      <Image
        src={metadata.thumbnail}
        alt={metadata.title}
        fill
        sizes="160px"
        className="rounded-lg object-cover"
      />
    </div>
  )}

  <div className="flex-1 overflow-hidden">
    <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white">
      {metadata.title}
    </h2>

    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {metadata.uploader}
    </p>

    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
      <span>⏱ {formatDuration(metadata.duration)}</span>

      {metadata.isLive && (
        <span className="rounded bg-red-100 px-1.5 py-0.5 text-red-700 dark:bg-red-900 dark:text-red-300">
          LIVE
        </span>
      )}

      {metadata.isShort && (
        <span className="rounded bg-purple-100 px-1.5 py-0.5 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
          SHORT
        </span>
      )}

      {metadata.ageRestricted && (
        <span className="rounded bg-orange-100 px-1.5 py-0.5 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
          18+
        </span>
      )}
    </div>
  </div>
</div>
    </div>
  );
}
