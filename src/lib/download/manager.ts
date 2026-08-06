export interface DownloadItem {
  [x: string]: any;
  format: any;
  id: string;
  url: string;
  title: string;
  status: "idle" | "downloading" | "completed" | "failed";
  progress: number;
}