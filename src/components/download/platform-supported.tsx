import Link from "next/link";

import { cn } from "@/lib/utils";

const platforms = [
  { name: "YouTube", href: "/youtube-downloader", emoji: "▶️", label: "Play button", gradient: "from-red-500 to-red-600", description: "Videos, Shorts, Playlists", hover: "hover:border-red-200 dark:hover:border-red-800" },
  { name: "TikTok", href: "/tiktok-downloader", emoji: "🎵", label: "Music note", gradient: "from-slate-700 to-slate-900", description: "No watermark", hover: "hover:border-slate-400 dark:hover:border-slate-500" },
  { name: "Instagram", href: "/instagram-downloader", emoji: "📸", label: "Camera", gradient: "from-purple-500 via-pink-500 to-orange-500", description: "Reels, Stories, Posts", hover: "hover:border-pink-200 dark:hover:border-pink-800" },
  { name: "Facebook", href: "/facebook-downloader", emoji: "👥", label: "People", gradient: "from-blue-600 to-blue-700", description: "Videos, Reels", hover: "hover:border-blue-200 dark:hover:border-blue-800" },
  { name: "X (Twitter)", href: "/x-downloader", emoji: "𝕏", label: "X logo", gradient: "from-slate-700 to-black", description: "Videos, GIFs", hover: "hover:border-slate-300 dark:hover:border-slate-600" },
  { name: "Vimeo", href: "/vimeo-downloader", emoji: "🎬", label: "Clapperboard", gradient: "from-cyan-500 to-blue-500", description: "HD Videos", hover: "hover:border-cyan-200 dark:hover:border-cyan-800" },
  { name: "Pinterest", href: "/pinterest-downloader", emoji: "📌", label: "Pushpin", gradient: "from-red-500 to-rose-600", description: "Images, Videos", hover: "hover:border-rose-200 dark:hover:border-rose-800" },
  { name: "Dailymotion", href: "/dailymotion-downloader", emoji: "🎥", label: "Video camera", gradient: "from-blue-500 to-indigo-600", description: "Videos", hover: "hover:border-indigo-200 dark:hover:border-indigo-800" },
] as const;

export function PlatformSupported() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4" role="list" aria-label="Supported video platforms">
      {platforms.map((p) => (
        <li key={p.name}>
          <Link
            href={p.href}
            className={cn(
              "group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              "dark:border-slate-700 dark:bg-slate-800",
              p.hover,
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            )}
            aria-label={`${p.name} downloader: ${p.description}`}
          >
            <div className={cn("mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-sm", p.gradient)} aria-hidden="true">
              <span role="img" aria-label={p.label}>{p.emoji}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{p.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}