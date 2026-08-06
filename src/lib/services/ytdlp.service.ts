import { spawn } from "child_process";

export function downloadMP4(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // ⚠️ yt-dlp must be installed on server PATH
    const process = spawn("yt-dlp", [
      "-f",
      "b[ext=mp4]",
      url,
    ]);

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Download failed"));
      }
    });

    process.on("error", (err) => {
      reject(err);
    });
  });
}