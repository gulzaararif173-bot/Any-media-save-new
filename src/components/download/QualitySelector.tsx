"use client";

import React from "react";
import { cn } from "../../lib/utils";

type VideoQuality =
  | "144p"
  | "240p"
  | "360p"
  | "480p"
  | "720p"
  | "1080p"
  | "1440p"
  | "2160p"
  | "best"
  | "worst";

const ALL_VIDEO_QUALITIES: VideoQuality[] = [
  "144p",
  "240p",
  "360p",
  "480p",
  "720p",
  "1080p",
  "1440p",
  "2160p",
  "best",
  "worst",
];

interface QualitySelectorProps {
  availableQualities?: VideoQuality[];
  selected?: VideoQuality;
  selectedQuality?: VideoQuality;
  onChange: (quality: VideoQuality) => void;
  disabled?: boolean;
  className?: string;
}

const QUALITY_LABELS: Record<VideoQuality, string> = {
  "144p": "144p (Low)",
  "240p": "240p",
  "360p": "360p (SD)",
  "480p": "480p",
  "720p": "720p (HD)",
  "1080p": "1080p (Full HD)",
  "1440p": "1440p (2K)",
  "2160p": "2160p (4K)",
  best: "Best Quality",
  worst: "Smallest / Fastest",
};

export function QualitySelector({
  availableQualities = ALL_VIDEO_QUALITIES,
  selected,
  selectedQuality,
  onChange,
  disabled = false,
  className,
}: QualitySelectorProps) {
  const currentSelected = selected ?? selectedQuality;

  const qualities =
    availableQualities.length > 0 ? availableQualities : ALL_VIDEO_QUALITIES;

  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
      {qualities.map((quality: VideoQuality) => {
        const isSelected = currentSelected === quality;

        return (
          <button
            key={quality}
            type="button"
            disabled={disabled}
            onClick={() => onChange(quality)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm font-medium transition",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              disabled && "cursor-not-allowed opacity-50",
              isSelected
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            )}
          >
            {QUALITY_LABELS[quality]}
          </button>
        );
      })}
    </div>
  );
}

export default QualitySelector;