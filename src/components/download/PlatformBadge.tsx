// components/download/PlatformBadge.tsx
'use client';

import React from 'react';

type Platform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'vimeo'
  | 'pinterest'
  | 'dailymotion';

interface PlatformBadgeProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; color: string; bg: string; icon: string }
> = {
  youtube: {
    label: 'YouTube',
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-100 dark:bg-red-900/40',
    icon: '▶',
  },
  tiktok: {
    label: 'TikTok',
    color: 'text-pink-700 dark:text-pink-300',
    bg: 'bg-pink-100 dark:bg-pink-900/40',
    icon: '♪',
  },
  instagram: {
    label: 'Instagram',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    icon: '◈',
  },
  facebook: {
    label: 'Facebook',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    icon: 'f',
  },
  twitter: {
    label: 'X (Twitter)',
    color: 'text-sky-700 dark:text-sky-300',
    bg: 'bg-sky-100 dark:bg-sky-900/40',
    icon: '𝕏',
  },
  vimeo: {
    label: 'Vimeo',
    color: 'text-cyan-700 dark:text-cyan-300',
    bg: 'bg-cyan-100 dark:bg-cyan-900/40',
    icon: '◉',
  },
  pinterest: {
    label: 'Pinterest',
    color: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
    icon: '𝐏',
  },
  dailymotion: {
    label: 'Dailymotion',
    color: 'text-indigo-700 dark:text-indigo-300',
    bg: 'bg-indigo-100 dark:bg-indigo-900/40',
    icon: '◐',
  },
};

export function PlatformBadge({
  platform,
  size = 'md',
  showLabel = true,
}: PlatformBadgeProps) {
  const config = PLATFORM_CONFIG[platform];
  if (!config) return null;

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium
        ${config.bg} ${config.color} ${sizeClasses}`}
    >
      <span className="font-bold">{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}