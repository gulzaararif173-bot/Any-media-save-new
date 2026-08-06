// components/download/TranscriptViewer.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Local fallback for TranscriptLine type (original import not found)
type TranscriptLine = {
  start: number; // seconds
  text: string;
};

// Simple duration formatter (original import not found)
function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const s = Math.floor(seconds);
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function TranscriptViewer({ videoId }: { videoId: string }) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/transcript?videoId=${videoId}`)
      .then(res => res.json())
      .then(res => setLines(res.data || []));
  }, [videoId]);

  const filtered = lines.filter(l => l.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mt-4 bg-white dark:bg-gray-900 border rounded-lg flex flex-col h-[400px]">
      <div className="p-3 border-b flex items-center justify-between">
        <span className="font-semibold">Transcript</span>
        <input 
          className="text-xs border rounded px-2 py-1 dark:bg-gray-800" 
          placeholder="Search transcript..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filtered.map((line, i) => (
          <div key={i} className="flex gap-3 items-start group">
            <span className="text-[10px] font-mono text-gray-400 mt-1">
              {formatDuration(line.start)}
            </span>
            <p className="text-sm">{line.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}