import { useState } from "react";

export type DownloadStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export function useDownloadEngine() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!url) return;

    try {
      setStatus("loading");
      setError(null);
      setMetadata(null);

      const res = await fetch("/api/youtube/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze URL");
      }

      setMetadata(data);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return {
    url,
    setUrl,
    metadata,
    status,
    error,
    isLoading: status === "loading",
    analyze,
  };
}