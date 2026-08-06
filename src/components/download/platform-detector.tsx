import { cn } from "@/lib/utils";
// Define SupportedPlatform locally to avoid dependency on external type exports
export type SupportedPlatform =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "twitter"
  | "vimeo"
  | "pinterest"
  | "dailymotion"
  | "twitch"
  | "reddit"
  | "soundcloud";

export function detectPlatform(url: string): SupportedPlatform | "unknown" {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "").toLowerCase();

    if (
      hostname === "youtube.com" ||
      hostname === "youtu.be" ||
      hostname.endsWith(".youtube.com")
    ) {
      return "youtube";
    }

    if (hostname === "tiktok.com" || hostname.endsWith(".tiktok.com")) {
      return "tiktok";
    }

    if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
      return "instagram";
    }

    if (
      hostname === "facebook.com" ||
      hostname === "fb.watch" ||
      hostname.endsWith(".facebook.com")
    ) {
      return "facebook";
    }

    if (
      hostname === "twitter.com" ||
      hostname === "x.com" ||
      hostname.endsWith(".twitter.com") ||
      hostname.endsWith(".x.com")
    ) {
      return "twitter";
    }

    if (hostname === "vimeo.com" || hostname.endsWith(".vimeo.com")) {
      return "vimeo";
    }

    if (hostname === "pinterest.com" || hostname.endsWith(".pinterest.com")) {
      return "pinterest";
    }

    if (hostname === "dailymotion.com" || hostname.endsWith(".dailymotion.com")) {
      return "dailymotion";
    }

    if (hostname === "twitch.tv" || hostname.endsWith(".twitch.tv")) {
      return "twitch";
    }

    if (hostname === "reddit.com" || hostname.endsWith(".reddit.com")) {
      return "reddit";
    }

    if (hostname === "soundcloud.com" || hostname.endsWith(".soundcloud.com")) {
      return "soundcloud";
    }
  } catch {
    // Invalid URL
  }

  return "unknown";
}

const platformColors: Record<SupportedPlatform | "unknown", string> = {
  youtube:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800",
  tiktok:
    "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600",
  instagram:
    "bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:ring-pink-800",
  facebook:
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800",
  twitter:
    "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600",
  vimeo:
    "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:ring-cyan-800",
  pinterest:
    "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:ring-rose-800",
  dailymotion:
    "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-800",
  twitch:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:ring-violet-800",
  reddit:
    "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800",
  soundcloud:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800",
  unknown:
    "bg-gray-100 text-gray-700 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
};

const platformLabels: Record<SupportedPlatform | "unknown", string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "X (Twitter)",
  vimeo: "Vimeo",
  pinterest: "Pinterest",
  dailymotion: "Dailymotion",
  twitch: "Twitch",
  reddit: "Reddit",
  soundcloud: "SoundCloud",
  unknown: "Unknown",
};

interface PlatformBadgeProps {
  platform: SupportedPlatform | "unknown";
  className?: string;
}

export function PlatformBadge({
  platform,
  className,
}: PlatformBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        platformColors[platform],
        className
      )}
    >
      {platformLabels[platform]}
    </span>
  );
}