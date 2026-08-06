// components/download/ChapterList.tsx
'use client';

import React from 'react';

type Chapter = {
  title: string;
  start_time: number;
};

function formatDuration(seconds: number) {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export function ChapterList({ chapters }: { chapters: Chapter[] }) {
  if (!chapters.length) return null;

  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-2 text-sm font-semibold border-b">
        Video Chapters
      </div>
      <div className="max-h-60 overflow-y-auto divide-y dark:divide-gray-700">
        {chapters.map((chapter, i) => (
          <div key={i} className="p-2 flex justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
            <span className="text-sm truncate">{chapter.title}</span>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
              {formatDuration(chapter.start_time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}