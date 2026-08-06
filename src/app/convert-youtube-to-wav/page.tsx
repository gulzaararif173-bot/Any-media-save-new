import ToolPageTemplate from "@/components/seo/ToolPageTemplate"

export const metadata = {
  title: "Convert YouTube to WAV (High Quality Audio) | SaveAllHD",
  description:
    "Convert YouTube videos to WAV audio format in high quality.",
}

export default function Page() {
  return (
    <ToolPageTemplate
      title="YouTube to WAV Converter"
      description="Download high-quality WAV audio from YouTube videos instantly."
      keyword="YouTube to WAV Converter"
      related={[
        { title: "YouTube to MP3", href: "/youtube-to-mp3" },
        { title: "YouTube to M4A", href: "/youtube-to-m4a" },
        { title: "YouTube Downloader Hub", href: "/youtube-downloader" },
      ]}
    />
  )
}