/* =========================================
   Platform Types
========================================= */

export type PlatformName =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "twitter"
  | "unknown";

/* =========================================
   Metadata (Video Info)
========================================= */

export interface PlatformMetadata {
  platform: PlatformName | string;

  title: string;
  thumbnail?: string | null;

  duration?: number | null; // in seconds

  uploader?: string | null;
  uploaderUrl?: string | null;

  viewCount?: number | null;
  likeCount?: number | null;

  uploadDate?: string | null; // YYYYMMDD or ISO
  description?: string | null;
}

/* =========================================
   Media Format
========================================= */

export type MediaType = "video" | "audio";

export interface MediaFormat {
  id?: string;

  type: MediaType;

  quality: string; // 1080p, 720p, 128kbps etc

  container?: string; // mp4, webm, mp3
  fps?: number | null;

  audioCodec?: string | null;
  videoCodec?: string | null;

  fileSize?: number | null; // bytes
  fileSizeLabel?: string | null; // 25 MB
}

/* =========================================
   Download Status
========================================= */

export type DownloadStatus =
  | "idle"
  | "analyzing"
  | "downloading"
  | "processing"
  | "completed"
  | "failed";

/* =========================================
   Download Item
========================================= */

export interface DownloadItem {
  id: string;

  url: string;

  title?: string;

  status: DownloadStatus;

  progress: number; // 0–100

  format?: MediaFormat;

  createdAt: Date;
}