"use client";

import * as React from "react";
import { Headphones, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaFormat } from "@/lib/download/types";

// Local type refinements because the shared types file does not export
// specific Audio/Video format interfaces.
type AudioFormat = MediaFormat & {
  id: string;
  type: "audio";
  quality: string;
  container: string;
  audioCodec?: string | null;
  fileSizeLabel?: string;
};

type VideoFormat = MediaFormat & {
  id: string;
  type: "video";
  quality: string;
  container: string;
  fps?: number | null;
  fileSizeLabel?: string;
  hasAudio?: boolean;
};

interface QualityPickerProps {
  formats: MediaFormat[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function QualityPicker({
  formats,
  selectedId,
  onSelect,
}: QualityPickerProps) {
  const videoFormats = formats.filter(
    (f): f is VideoFormat => f.type === "video",
  );
  const audioFormats = formats.filter(
    (f): f is AudioFormat => f.type === "audio",
  );

  if (formats.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
        No downloadable formats available. Configure API keys to enable
        downloads.
      </div>
    );
  }

  return (
    <div className="space-y-3" role="group" aria-label="Select download quality">
      {videoFormats.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Video className="h-3.5 w-3.5" aria-hidden="true" />
            Video
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {videoFormats.map((f) => (
              <VideoQualityCard
                key={f.id}
                format={f}
                selected={selectedId === f.id}
                onSelect={() => onSelect(f.id)}
              />
            ))}
          </div>
        </div>
      )}

      {audioFormats.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
            Audio only
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {audioFormats.map((f) => (
              <AudioQualityCard
                key={f.id}
                format={f}
                selected={selectedId === f.id}
                onSelect={() => onSelect(f.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoQualityCard({
  format,
  selected,
  onSelect,
}: {
  format: VideoFormat;
  selected: boolean;
  onSelect: () => void;
}) {
  const isHD = format.quality === "720p" || format.quality === "1080p";
  const is4K = format.quality === "2160p" || format.quality === "1440p";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col rounded-xl border p-3 text-left transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        selected
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
          : "border-slate-200 hover:border-blue-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-blue-800 dark:hover:bg-slate-700",
      )}
    >
      {(isHD || is4K) && (
        <span
          className={cn(
            "absolute right-2 top-2 rounded px-1 py-0.5 text-xs font-bold",
            is4K
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
          )}
        >
          {is4K ? (format.quality === "2160p" ? "4K" : "2K") : "HD"}
        </span>
      )}

      <span
        className={cn(
          "text-base font-bold",
          selected
            ? "text-blue-700 dark:text-blue-300"
            : "text-slate-900 dark:text-white",
        )}
      >
        {format.quality}
      </span>

      <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        .{format.container}
        {format.fps ? ` · ${format.fps}fps` : ""}
      </span>

      {format.fileSizeLabel && (
        <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          {format.fileSizeLabel}
        </span>
      )}

      {!format.hasAudio && (
        <span className="mt-1 text-xs text-amber-600 dark:text-amber-400">
          Video only
        </span>
      )}
    </button>
  );
}

function AudioQualityCard({
  format,
  selected,
  onSelect,
}: {
  format: AudioFormat;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex flex-col rounded-xl border p-3 text-left transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
        selected
          ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
          : "border-slate-200 hover:border-green-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-green-800 dark:hover:bg-slate-700",
      )}
    >
      <span
        className={cn(
          "text-base font-bold",
          selected
            ? "text-green-700 dark:text-green-300"
            : "text-slate-900 dark:text-white",
        )}
      >
        {format.quality}
      </span>
      <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        .{format.container} ·{" "}
{format.audioCodec &&
format.audioCodec !== "unknown"
  ? format.audioCodec.toUpperCase()
  : "Audio"}
      </span>
      {format.fileSizeLabel && (
        <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          {format.fileSizeLabel}
        </span>
      )}
    </button>
  );
}