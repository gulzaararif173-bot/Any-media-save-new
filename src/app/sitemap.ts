import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://any-media-save-new.vercel.app"

  const routes = [
    "",
    "/youtube-to-mp3",
    "/youtube-to-mp4",
    "/youtube-playlist-downloader",
    "/tiktok-video-downloader",
    "/tiktok-no-watermark",
    "/instagram-reels-downloader",
    "/facebook-video-downloader",
    "/twitter-video-downloader",
    "/free-video-downloader-online",
    "/youtube-downloader",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))
}