'use client';

import * as React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Eye, ThumbsUp, User } from 'lucide-react';
import { StatCard } from '../ui/stat-card';
import PlatformBadge from '../PlatformBadge';

type PlatformName = 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'unknown';

export interface PlatformMetadata {
  platform?: PlatformName | string;
  title?: string;
  thumbnail?: string | null;
  duration?: number | null;
  uploader?: string | null;
  viewCount?: number | null;
  likeCount?: number | null;
  uploadDate?: string | null;
}

export interface MediaFormat {
  id?: string;
  type: 'video' | 'audio';
  quality: string;
  container?: string;
  fps?: number | null;
  audioCodec?: string | null;
  fileSizeLabel?: string | null;
}

interface VideoInfoProps {
  metadata: PlatformMetadata;
  selectedFormat: MediaFormat | null;
  className?: string;
}

export function VideoInfo({
  metadata,
  className = '',
}: VideoInfoProps) {
  const [imgError, setImgError] = React.useState(false);

  const title = metadata.title || 'Untitled video';
  const duration = metadata.duration ?? 0;
  const showThumbnail = Boolean(metadata.thumbnail) && !imgError;

  function formatDuration(_duration: number): string {
    const hours = Math.floor(_duration / 3600);
    const minutes = Math.floor((_duration % 3600) / 60);
    const seconds = _duration % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function formatNumber(value: number | null | undefined): string {
    return value == null ? '0' : new Intl.NumberFormat('en-US').format(value);
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {showThumbnail && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
          <Image
            src={metadata.thumbnail as string}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
            onError={() => setImgError(true)}
          />

          {duration > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
              <Clock className="h-3 w-3" />
              {formatDuration(duration)}
            </div>
          )}
        </div>
      )}

      <div>
        <div className="mb-2 flex items-start gap-2">
          <h2 className="flex-1 text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
            {title}
          </h2>

          <PlatformBadge platform={metadata.platform || 'unknown'} />
        </div>

        {metadata.uploadDate && (
          <StatCard
            icon={Calendar}
            label="Published"
            value={new Date(metadata.uploadDate).toLocaleDateString()}
          />
        )}

        {duration > 0 && (
          <StatCard icon={Clock} label="Duration" value={formatDuration(duration)} />
        )}

        {metadata.viewCount !== undefined && metadata.viewCount !== null && (
          <StatCard icon={Eye} label="Views" value={formatNumber(metadata.viewCount)} />
        )}

        {metadata.likeCount !== undefined && metadata.likeCount !== null && (
          <StatCard icon={ThumbsUp} label="Likes" value={formatNumber(metadata.likeCount)} />
        )}

        {metadata.uploader && (
          <StatCard icon={User} label="Uploader" value={metadata.uploader} />
        )}
      </div>
    </div>
  );
}

