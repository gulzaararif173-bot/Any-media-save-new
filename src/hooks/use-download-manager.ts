import { useState } from "react";

export interface DownloadItem {
  [x: string]: any;
  id: string;
  title: string;
  progress: number;
  status: "idle" | "downloading" | "completed" | "failed";
}

export function useDownloadManager() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  return {
    downloads,
    setDownloads,
  };
}