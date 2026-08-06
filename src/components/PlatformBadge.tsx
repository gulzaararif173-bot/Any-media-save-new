"use client";

import React from "react";

interface PlatformBadgeProps {
  platform?: string;
  className?: string;
}

export default function PlatformBadge({
  platform = "Unknown",
  className = "",
}: PlatformBadgeProps) {
  const normalized = platform.toLowerCase().trim();

  let style =
    "border-slate-700 bg-slate-800/70 text-slate-300";
  let dot = "bg-slate-400";

  if (normalized.includes("youtube")) {
    style = "border-red-500/30 bg-red-500/10 text-red-400";
    dot = "bg-red-500";
  } else if (normalized.includes("tiktok")) {
    style = "border-pink-500/30 bg-pink-500/10 text-pink-400";
    dot = "bg-pink-500";
  } else if (normalized.includes("instagram")) {
    style = "border-purple-500/30 bg-purple-500/10 text-purple-400";
    dot = "bg-purple-500";
  } else if (normalized.includes("facebook")) {
    style = "border-blue-500/30 bg-blue-500/10 text-blue-400";
    dot = "bg-blue-500";
  } else if (
    normalized.includes("twitter") ||
    normalized === "x" ||
    normalized.includes("x (twitter)")
  ) {
    style = "border-sky-500/30 bg-sky-500/10 text-sky-400";
    dot = "bg-sky-400";
  } else if (normalized.includes("reddit")) {
    style = "border-orange-500/30 bg-orange-500/10 text-orange-400";
    dot = "bg-orange-500";
  } else if (normalized.includes("vimeo")) {
    style = "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";
    dot = "bg-cyan-500";
  } else if (normalized.includes("pinterest")) {
    style = "border-rose-500/30 bg-rose-500/10 text-rose-400";
    dot = "bg-rose-500";
  } else if (normalized.includes("linkedin")) {
    style = "border-blue-700/30 bg-blue-700/10 text-blue-300";
    dot = "bg-blue-600";
  } else if (normalized.includes("dailymotion")) {
    style = "border-indigo-500/30 bg-indigo-500/10 text-indigo-400";
    dot = "bg-indigo-500";
  } else if (normalized.includes("twitch")) {
    style = "border-violet-500/30 bg-violet-500/10 text-violet-400";
    dot = "bg-violet-500";
  } else if (normalized.includes("snapchat")) {
    style = "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    dot = "bg-yellow-400";
  }

  return (
    <span
      title={platform}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${style} ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {platform}
    </span>
  );
}