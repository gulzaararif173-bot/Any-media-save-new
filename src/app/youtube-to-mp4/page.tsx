import React from "react"

// Fallback/local minimal ToolPageTemplate to avoid import resolution errors.
// Keeps the same API surface used by this page.
function ToolPageTemplate({
  title,
  description,
  keyword,
  related,
}: {
  title: string
  description: string
  keyword?: string
  related?: { title: string; href: string }[]
}) {
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      {related && (
        <ul>
          {related.map((r) => (
            <li key={r.href}>{r.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export const metadata = {
  title: "YouTube to MP4 Converter (HD & 1080p) | SaveAllHD",
  description:
    "Convert and download YouTube videos to MP4 format in HD quality for free.",
}

export default function Page() {
  return (
    <ToolPageTemplate
      title="YouTube to MP4 Converter"
      description="Download YouTube videos as MP4 in HD and 1080p quality easily and safely."
      keyword="YouTube to MP4 Converter"
      related={[
        { title: "YouTube to MP3", href: "/youtube-to-mp3" },
        { title: "Download YouTube 1080p", href: "/download-youtube-1080p" },
        { title: "YouTube Playlist Downloader", href: "/youtube-playlist-downloader" },
      ]}
    />
  )
}