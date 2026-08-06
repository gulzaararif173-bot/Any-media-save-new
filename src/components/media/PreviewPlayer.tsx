// components/media/PreviewPlayer.tsx
'use client';

import React, { useRef, useState } from 'react';

interface PreviewPlayerProps {
  src: string;
  type: 'video' | 'audio';
  mimeType?: string;
  poster?: string;
}

export function PreviewPlayer({ src, type, mimeType, poster }: PreviewPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      void ref.current.play();
    }
    setPlaying(!playing);
  };

  if (type === 'audio') {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <audio
          ref={ref as React.RefObject<HTMLAudioElement>}
          src={src}
          controls
          className="w-full"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type={mimeType ?? 'audio/mpeg'} />
        </audio>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        src={src}
        controls
        poster={poster}
        className="w-full"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={src} type={mimeType ?? 'video/mp4'} />
      </video>
    </div>
  );
}