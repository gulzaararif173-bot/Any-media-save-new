import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const YTDLP_PATH = `"C:\\Users\\bhai bhai laptop\\Downloads\\yt-dlp.exe"`;

export function downloadMP4(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(process.cwd(), "downloads");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputTemplate = path.join(outputDir, "%(title)s.%(ext)s");

    const command = `${YTDLP_PATH} -f b[ext=mp4] -o "${outputTemplate}" "${url}"`;

    const process = spawn(command, { shell: true });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject("Download failed");
      }
    });
  });
}