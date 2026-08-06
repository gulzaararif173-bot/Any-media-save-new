"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  label = "Click or drag files here to upload",
  hint,
  error,
  disabled = false,
  onChange,
  className,
}: FileUploadProps) {
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [sizeError, setSizeError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setSizeError(null);
    const arr = Array.from(newFiles);
    if (maxSize) {
      const oversized = arr.filter((f) => f.size > maxSize);
      if (oversized.length > 0) {
        setSizeError(`File exceeds maximum size of ${formatFileSize(maxSize)}`);
        return;
      }
    }
    const next = multiple ? [...files, ...arr] : arr;
    setFiles(next);
    onChange?.(next);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  const displayError = error ?? sizeError;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30",
          "dark:border-slate-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/10",
          dragging && "border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/20",
          disabled && "cursor-not-allowed opacity-50",
          displayError && "border-red-400 dark:border-red-500",
        )}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload area"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500 dark:bg-slate-800 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
          <Upload className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
          {hint && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
          {maxSize && (
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              Max size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          aria-hidden="true"
        />
      </div>

      {displayError && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {displayError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-1.5" role="list" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}