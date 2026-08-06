"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDownloadManager } from "@/hooks/use-download-manager";
import { VideoInfo } from "./video-info";
import { QualityPicker } from "./quality-picker";
import { DownloadButton } from "./download-button";

interface ResultCardProps {
  metadata: any;
  className?: string;
}

export function ResultCard({ metadata, className }: ResultCardProps) {
  const { downloads, setDownloads } = useDownloadManager();
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [videoFormats] = React.useState<any[]>([]);
  const [audioFormats] = React.useState<any[]>([]);

  // Find most recent active download item for this video
  const activeItem = React.useMemo(
    () =>
      [...downloads]
        .filter((i) => i.url === metadata.url && i.formatId === selectedId)
        .at(0) ?? null,
    [downloads, metadata.url, selectedId],
  );

  const handleDownload = React.useCallback(async () => {
    if (!selectedId) return;

    const newItem = {
      id: `${Date.now()}`,
      title: metadata.title ?? metadata.name ?? "Untitled download",
      url: metadata.url,
      formatId: selectedId,
      format: selectedId,
      status: "pending" as const,
      progress: 0,
    };

    setDownloads((prev) => [newItem as any, ...prev]);
  }, [metadata, selectedId, setDownloads]);

  const handleCancel = React.useCallback(() => {
    if (activeItem) setDownloads((prev) => prev.filter((item) => item.id !== activeItem.id));
  }, [activeItem, setDownloads]);

  const allFormats = React.useMemo(
    () => [...videoFormats, ...audioFormats],
    [videoFormats, audioFormats],
  );

  const selectedFormat = React.useMemo(
    () => allFormats.find((f) => f.id === selectedId),
    [allFormats, selectedId],
  );

  function selectFormat(_id: string): void {
    setSelectedId(_id);
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        "dark:border-slate-700 dark:bg-slate-800",
        "animate-fade-up",
        className,
      )}
    >
      <div className="p-5 sm:p-6">
        {/* Video info */}
        <VideoInfo
          metadata={metadata}
          selectedFormat={selectedFormat}
          className="mb-5"
        />

        {/* Divider */}
        <hr className="mb-5 border-slate-200 dark:border-slate-700" />

        {/* Quality picker */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Select Quality
          </h3>
          <QualityPicker
            formats={allFormats}
            selectedId={selectedId}
            onSelect={selectFormat}
          />
        </div>

        {/* Private / unavailable notice */}
        {metadata.isPrivate && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            This content is marked private and may not be downloadable.
          </div>
        )}

        {/* Download button */}
        <DownloadButton
          onDownload={() => void handleDownload()}
          onCancel={handleCancel}
          activeItem={activeItem as any}
          disabled={!selectFormat || allFormats.length === 0}
        />
      </div>
    </div>
  );
}


