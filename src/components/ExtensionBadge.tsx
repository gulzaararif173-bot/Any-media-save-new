// components/ExtensionBadge.tsx
'use client';

import React, { useEffect, useState } from 'react';

export function ExtensionBadge() {
  const [detected, setDetected] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect if running inside extension context
    const isExtension =
      typeof window !== 'undefined' &&
      window.location.search.includes('ext=1');
    setDetected(isExtension);
  }, []);

  if (!detected) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full
        bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700
        dark:bg-blue-900/40 dark:text-blue-300"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      Extension
    </span>
  );
}