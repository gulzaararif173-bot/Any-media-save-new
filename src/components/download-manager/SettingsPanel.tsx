// components/download-manager/SettingsPanel.tsx
'use client';

import React from 'react';
import { useDownloadContext } from '../../lib/download-manager/context';
import { clearStorage } from '../../lib/download-manager/storage';

const defaultSettings = {
  defaultQuality: '720p',
  defaultFormat: 'mp4',
  defaultAudioBitrate: '128kbps',
  maxConcurrentDownloads: 3,
  maxRetries: 2,
  autoRetry: false,
  includeQualityInFilename: false,
  includePlatformInFilename: false,
  includeDateInFilename: false,
};

export function SettingsPanel() {
  const { setDownloads } = useDownloadContext();
  const [settings, setSettings] = React.useState(defaultSettings);

  function handleChange<K extends keyof typeof defaultSettings>(
    key: K,
    value: typeof defaultSettings[K]
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function clearHistory(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Download Defaults */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Download Defaults
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Default Quality
            </label>
            <select
              value={settings.defaultQuality}
              onChange={(e) =>
                handleChange('defaultQuality', e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white
                focus:border-blue-500 focus:outline-none"
            >
              {['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p'].map(
                (q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Default Format
            </label>
            <select
              value={settings.defaultFormat}
              onChange={(e) =>
                handleChange('defaultFormat', e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white
                focus:border-blue-500 focus:outline-none"
            >
              {['mp4', 'webm', 'mkv', 'mp3', 'm4a', 'aac', 'flac'].map(
                (f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Default Audio Quality
            </label>
            <select
              value={settings.defaultAudioBitrate}
              onChange={(e) =>
                handleChange('defaultAudioBitrate', e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white
                focus:border-blue-500 focus:outline-none"
            >
              {[
                '64kbps',
                '96kbps',
                '128kbps',
                '192kbps',
                '256kbps',
                '320kbps',
              ].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Queue Settings */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Queue Settings
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Max Concurrent Downloads:{' '}
              <span className="font-bold text-blue-600">
                {settings.maxConcurrentDownloads}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={settings.maxConcurrentDownloads}
              onChange={(e) =>
                handleChange(
                  'maxConcurrentDownloads',
                  Number(e.target.value)
                )
              }
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Max Retries:{' '}
              <span className="font-bold text-blue-600">
                {settings.maxRetries}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={settings.maxRetries}
              onChange={(e) =>
                handleChange('maxRetries', Number(e.target.value))
              }
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoRetry}
              onChange={(e) =>
                handleChange('autoRetry', e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Auto-retry failed downloads
            </span>
          </label>
        </div>
      </section>

      {/* Filename Settings */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Filename Options
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={settings.includeQualityInFilename}
              onChange={(e) =>
                handleChange(
                  'includeQualityInFilename',
                  e.target.checked
                )
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Include quality in filename
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={settings.includePlatformInFilename}
              onChange={(e) =>
                handleChange(
                  'includePlatformInFilename',
                  e.target.checked
                )
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Include platform in filename
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={settings.includeDateInFilename}
              onChange={(e) =>
                handleChange(
                  'includeDateInFilename',
                  e.target.checked
                )
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Include date in filename
            </span>
          </label>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-red-600">
          Danger Zone
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => clearHistory()}
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm
              font-medium text-red-700 hover:bg-red-100
              dark:border-red-700 dark:bg-red-900/30 dark:text-red-300
              transition-colors"
          >
            Clear All History
          </button>
          <button
            onClick={() => {
              clearStorage();
              window.location.reload();
            }}
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm
              font-medium text-red-700 hover:bg-red-100
              dark:border-red-700 dark:bg-red-900/30 dark:text-red-300
              transition-colors"
          >
            Reset All Settings
          </button>
        </div>
      </section>
    </div>
  );
}