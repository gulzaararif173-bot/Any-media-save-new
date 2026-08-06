// components/media/MediaInformation.tsx
'use client';

import React from 'react';

interface AudioStreamInfo {
  sampleRate?: number;
  channelLayout?: string;
  channels?: number;
}

interface MediaInformationProps {
  info: {
    formatLong?: string;
    format?: string;
    durationFormatted?: string;
    sizeFormatted?: string;
    bitrateFormatted?: string;
    hasVideo?: boolean;
    resolution?: string;
    videoCodec?: string;
    fps?: number;
    aspectRatio?: string;
    isHdr?: boolean;
    hasAudio?: boolean;
    audioCodec?: string;
    audioStreams: AudioStreamInfo[];
    container?: string;
    title?: string;
    artist?: string;
    videoStreams: unknown[];
    subtitleStreams: unknown[];
  };
}

export function MediaInformation({ info }: MediaInformationProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
        Media Information
      </h3>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        <InfoItem label="Format" value={info.formatLong || info.format} />
        <InfoItem label="Duration" value={info.durationFormatted} />
        <InfoItem label="Size" value={info.sizeFormatted} />
        <InfoItem label="Bitrate" value={info.bitrateFormatted} />

        {info.hasVideo && (
          <>
            <InfoItem label="Resolution" value={info.resolution} />
            <InfoItem label="Video Codec" value={info.videoCodec} />
            <InfoItem label="FPS" value={String(info.fps)} />
            <InfoItem label="Aspect Ratio" value={info.aspectRatio} />
            {info.isHdr && <InfoItem label="HDR" value="Yes" highlight />}
          </>
        )}

        {info.hasAudio && (
          <>
            <InfoItem label="Audio Codec" value={info.audioCodec} />
            {info.audioStreams[0] && (
              <>
                <InfoItem
                  label="Sample Rate"
                  value={`${info.audioStreams[0].sampleRate} Hz`}
                />
                <InfoItem
                  label="Channels"
                  value={info.audioStreams[0].channelLayout || String(info.audioStreams[0].channels)}
                />
              </>
            )}
          </>
        )}

        <InfoItem label="Container" value={info.container} />
        {info.title && <InfoItem label="Title" value={info.title} />}
        {info.artist && <InfoItem label="Artist" value={info.artist} />}

        <InfoItem
          label="Streams"
          value={`${info.videoStreams.length}V ${info.audioStreams.length}A ${info.subtitleStreams.length}S`}
        />
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  if (!value || value === '0' || value === 'undefined') return null;

  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </dt>
      <dd
        className={`mt-0.5 truncate text-sm font-medium
          ${highlight
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-gray-800 dark:text-gray-200'
          }`}
      >
        {value}
      </dd>
    </div>
  );
}