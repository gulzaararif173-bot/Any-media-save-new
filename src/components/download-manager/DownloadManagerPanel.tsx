// components/download-manager/DownloadManagerPanel.tsx
'use client';

import { useState } from 'react';
import * as downloadManagerContext from '@/lib/download-manager/context';

type Tab = 'queue' | 'history' | 'settings';

type DownloadManagerState = {
  items: Record<string, unknown>;
  history: unknown[];
  activeCount: number;
  isPaused: boolean;
};

const useDownloadManager = (() => {
  const context = downloadManagerContext as Record<string, unknown>;
  const hook =
    (context.useDownloadManager as
      | (() => { state: DownloadManagerState })
      | undefined) ??
    (context.useDownloadManagerContext as
      | (() => { state: DownloadManagerState })
      | undefined);

  return (
    (hook ??
      (() => ({
        state: {
          items: {},
          history: [],
          activeCount: 0,
          isPaused: false,
        },
      }))) as () => { state: DownloadManagerState }
  );
})();

const QueuePanel = () => null;
const HistoryPanel = () => null;
const SettingsPanel = () => null;

export default function DownloadManagerPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const { state } = useDownloadManager();

  const tabs: Array<{
    id: Tab;
    label: string;
    badge?: number;
  }> = [
    {
      id: 'queue',
      label: 'Queue',
      badge:
        Object.keys(state.items).length > 0
          ? Object.keys(state.items).length
          : undefined,
    },
    {
      id: 'history',
      label: 'History',
      badge:
        state.history.length > 0 ? state.history.length : undefined,
    },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">📥</span>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Download Manager
          </h2>
          {state.activeCount > 0 && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {state.activeCount} active
            </span>
          )}
          {state.isPaused && (
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
              Paused
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-4 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium
              transition-colors
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            {tab.label}
            {tab.badge != null && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-bold
                  ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {activeTab === 'queue' && <QueuePanel />}
        {activeTab === 'history' && <HistoryPanel />}
        {activeTab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}