// components/download-manager/BulkDownloadInput.tsx
'use client';

import React, { useState, useCallback } from 'react';

type Platform = string;

interface DownloadManagerState {
  settings: {
    defaultQuality: string;
    defaultFormat: string;
    defaultAudioBitrate: number;
  };
}

interface DownloadManagerContextValue {
  addBulkDownloads: (downloads: Array<{
    url: string;
    platform: Platform;
    title: string;
    thumbnail: string;
    author: string;
    quality: string;
    format: string;
    audioOnly: boolean;
    audioBitrate: number;
  }>) => void;
  state: DownloadManagerState;
}

function useDownloadManager(): DownloadManagerContextValue {
  return {
    addBulkDownloads: () => undefined,
    state: {
      settings: {
        defaultQuality: '720p',
        defaultFormat: 'mp4',
        defaultAudioBitrate: 128,
      },
    },
  };
}

function detectPlatform(url: string): Platform | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    }
    if (hostname.includes('tiktok.com')) {
      return 'tiktok';
    }
    if (hostname.includes('instagram.com')) {
      return 'instagram';
    }
    if (hostname.includes('x.com') || hostname.includes('twitter.com')) {
      return 'twitter';
    }

    return null;
  } catch {
    return null;
  }
}

interface ParsedUrl {
  url: string;
  platform: Platform | null;
  valid: boolean;
}

interface BulkMetadata {
  title: string;
  thumbnail: string;
  author: string;
  duration: number;
}

type FetchState = 'idle' | 'loading' | 'done' | 'error';

export function BulkDownloadInput() {
  const { addBulkDownloads, state } = useDownloadManager();
  const [rawInput, setRawInput] = useState('');
  const [parsedUrls, setParsedUrls] = useState<ParsedUrl[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [error, setError] = useState<string | null>(null);

  const parseInput = useCallback((input: string) => {
    const lines = input
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsed: ParsedUrl[] = lines.map((url) => {
      let valid = false;
      let platform: Platform | null = null;

      try {
        new URL(url);
        platform = detectPlatform(url);
        valid = platform !== null;
      } catch {
        valid = false;
      }

      return { url, platform, valid };
    });

    setParsedUrls(parsed);
    return parsed;
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setRawInput(e.target.value);
      parseInput(e.target.value);
    },
    [parseInput]
  );

  const handleAddToQueue = useCallback(async () => {
    const validUrls = parsedUrls.filter((p) => p.valid && p.platform);
    if (validUrls.length === 0) return;

    setFetchState('loading');
    setError(null);

    const { defaultQuality, defaultFormat, defaultAudioBitrate } =
      state.settings;

    const metadataResults = await Promise.allSettled(
      validUrls.map(async (item) => {
        const res = await fetch(
          `/api/metadata?url=${encodeURIComponent(item.url)}`
        );
        const json = await res.json() as {
          success?: boolean;
          data?: BulkMetadata;
          message?: string;
        };
        return { item, meta: json.data };
      })
    );

    const downloadParams = metadataResults.map((result, idx) => {
      const item = validUrls[idx];
      let title = item?.url ?? "";
      let thumbnail = '';
      let author = '';

      if (result.status === 'fulfilled' && result.value.meta) {
        const meta = result.value.meta;
        title = meta.title ?? title;
        thumbnail = meta.thumbnail ?? '';
        author = meta.author ?? '';
      }

      return {
        url: item?.url ?? "",
        platform: (item?.platform ?? "unknown") as any,
        title,
        thumbnail,
        author,
        quality: defaultQuality,
        format: defaultFormat,
        audioOnly: false,
        audioBitrate: defaultAudioBitrate,
      };
    });

    addBulkDownloads(downloadParams);
    setFetchState('done');
    setRawInput('');
    setParsedUrls([]);
    setError(null);
  }, [parsedUrls, state.settings, addBulkDownloads]);

  const validCount = parsedUrls.filter((p) => p.valid).length;
  const invalidCount = parsedUrls.filter((p) => !p.valid).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        Bulk Download
      </h3>

      <textarea
        value={rawInput}
        onChange={handleInputChange}
        placeholder={`Paste URLs here, one per line:\nhttps://youtube.com/watch?v=...\nhttps://tiktok.com/@user/video/...\nhttps://instagram.com/reel/...`}
        rows={6}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
          font-mono text-xs text-gray-800 placeholder-gray-400
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
          dark:placeholder-gray-500 resize-none"
      />

      {parsedUrls.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {validCount > 0 && (
            <span className="text-emerald-600 dark:text-emerald-400">
              ✅ {validCount} valid URL{validCount !== 1 ? 's' : ''}
            </span>
          )}
          {invalidCount > 0 && (
            <span className="text-red-500">
              ❌ {invalidCount} invalid URL{invalidCount !== 1 ? 's' : ''}
            </span>
          )}
          <div className="flex flex-wrap gap-1">
            {Array.from(
              new Set(
                parsedUrls
                  .filter((p) => p.valid && p.platform)
                  .map((p) => p.platform)
              )
            ).map((p) => (
              <span
                key={p}
                className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700
                  dark:bg-blue-900/40 dark:text-blue-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => void handleAddToQueue()}
          disabled={validCount === 0 || fetchState === 'loading'}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium
            text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50
            transition-colors"
        >
          {fetchState === 'loading' ? (
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
              Fetching metadata...
            </span>
          ) : (
            `Add ${validCount > 0 ? validCount : ''} to Queue`
          )}
        </button>

        {rawInput && (
          <button
            onClick={() => {
              setRawInput('');
              setParsedUrls([]);
              setFetchState('idle');
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
              text-gray-600 hover:bg-gray-50
              dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800
              transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
