import ToolPageTemplate from "../../components/seo/ToolPageTemplate"

export const metadata = {
  title: "YouTube Playlist Downloader Online | SaveAllHD",
  description:
    "Download full YouTube playlists quickly and easily in MP4 or MP3 format.",
}

export default function Page() {
  return (
    <ToolPageTemplate
      title="YouTube Playlist Downloader"
      description="Download full YouTube playlists in one click with high speed and quality."
      keyword="YouTube Playlist Downloader"
      related={[
        { title: "YouTube to MP3", href: "/youtube-to-mp3" },
        { title: "YouTube to MP4", href: "/youtube-to-mp4" },
        { title: "YouTube Shorts Downloader", href: "/youtube-shorts-downloader" },
      ]}
    />
  )
}