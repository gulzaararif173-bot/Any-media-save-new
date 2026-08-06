"use client";

import React from "react";

export default function EmptyState() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/80 text-slate-400">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">Ready to Analyze Your Media link?</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-400">
          Paste a YouTube, TikTok, Instagram, Facebook, X, Reddit, or any supported media link above to instantly view its metadata and available information.
        </p>
      </div>
    </div>
  );
}