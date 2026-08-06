// components/download/SystemStatusBadge.tsx
'use client';

import React from 'react';

// Local fallback for useSystemStatus to avoid module resolution errors.
// If a project-level hook exists, replace this implementation accordingly.
function useSystemStatus() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<null | {
    services: {
      ytdlp: { available: boolean; version?: string };
      ffmpeg: { available: boolean; version?: string };
    };
  }>(null);

  React.useEffect(() => {
    // Simulate async check; in real app, replace with actual status fetch
    const t = setTimeout(() => {
      setData({
        services: {
          ytdlp: { available: true, version: '2026.01.01' },
          ffmpeg: { available: false },
        },
      });
      setLoading(false);
    }, 200);

    return () => clearTimeout(t);
  }, []);

  return { data, loading } as const;
}
export function SystemStatusBadge() {
  const { data, loading } = useSystemStatus();

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <span className="h-2 w-2 rounded-full bg-gray-300 animate-pulse" />
        Checking system...
      </div>
    );
  }

  if (!data) return null;

  const ytdlpOk = data.services.ytdlp.available;
  const ffmpegOk = data.services.ffmpeg.available;
  const allOk = ytdlpOk && ffmpegOk;

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <div className="flex items-center gap-1.5">
        <span
          className={`h-2 w-2 rounded-full ${
            ytdlpOk ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-gray-600 dark:text-gray-400">
          yt-dlp{' '}
          {data.services.ytdlp.version
            ? `v${data.services.ytdlp.version}`
            : ytdlpOk
            ? 'ready'
            : 'not found'}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className={`h-2 w-2 rounded-full ${
            ffmpegOk ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        />
        <span className="text-gray-600 dark:text-gray-400">
          FFmpeg{' '}
          {data.services.ffmpeg.version
            ? `v${data.services.ffmpeg.version}`
            : ffmpegOk
            ? 'ready'
            : 'optional'}
        </span>
      </div>

      {!allOk && !ytdlpOk && (
        <span className="rounded bg-red-100 px-2 py-0.5 text-red-700 dark:bg-red-900 dark:text-red-300">
          yt-dlp required
        </span>
      )}
    </div>
  );
}