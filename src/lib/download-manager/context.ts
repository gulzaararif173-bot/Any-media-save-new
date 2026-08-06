import React, { createContext, useContext, useState } from "react";

interface DownloadContextType {
  downloads: any[];
  setDownloads: React.Dispatch<React.SetStateAction<any[]>>;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [downloads, setDownloads] = useState<any[]>([]);

  return React.createElement(
    DownloadContext.Provider,
    { value: { downloads, setDownloads } },
    children
  );
}

export function useDownloadContext() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error("useDownloadContext must be used within DownloadProvider");
  }
  return context;
}