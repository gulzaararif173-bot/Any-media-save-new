import {
  Download,
  Globe,
  HardDrive,
  Infinity,
  Lock,
  Smartphone,
  Video,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download videos in seconds. No waiting, no delays.",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    icon: Lock,
    title: "100% Safe",
    description: "No file storage on our servers. Your downloads are private.",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Globe,
    title: "All Platforms",
    description: "YouTube, TikTok, Instagram, Facebook, X and more.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Video,
    title: "HD Quality",
    description: "Download in up to 4K resolution. Never miss quality.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on any device — desktop, tablet or mobile.",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    icon: Infinity,
    title: "Unlimited Downloads",
    description: "No daily limits, no caps. Download as much as you need.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    icon: HardDrive,
    title: "Multiple Formats",
    description: "MP4, MP3, WebM and more. Always get the format you need.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Download,
    title: "Free Forever",
    description: "No registration, no payment. Completely free to use.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
];

export function FeaturesGrid() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      role="list"
      aria-label="Platform features"
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            role="listitem"
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}
              aria-hidden="true"
            >
              <Icon className={`h-5 w-5 ${feature.color}`} />
            </div>
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}