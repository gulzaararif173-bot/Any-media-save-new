import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Video Downloader Online (All Platforms) | SaveAllHD",
  description:
    "Download videos online for free. Save YouTube, TikTok, Instagram, Facebook and Twitter videos easily in HD quality.",
}

export default function FreeVideoDownloaderOnline() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        Free Video Downloader Online
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD is a free video downloader online that allows you to download
        videos from multiple platforms including YouTube, TikTok, Instagram,
        Facebook, and Twitter.
      </p>

      <p className="text-gray-600 mb-10">
        If you are looking for the best free video downloader, our tool provides
        fast, secure, and high-quality downloads without installing any software.
      </p>

      {/* Tools Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Supported Platforms
        </h2>

        <ul className="grid md:grid-cols-2 gap-4 text-blue-600 underline">
          <li><Link href="/youtube-downloader">YouTube Downloader</Link></li>
          <li><Link href="/tiktok-video-downloader">TikTok Downloader</Link></li>
          <li><Link href="/instagram-reels-downloader">Instagram Reels Downloader</Link></li>
          <li><Link href="/facebook-video-downloader">Facebook Video Downloader</Link></li>
          <li><Link href="/twitter-video-downloader">Twitter Video Downloader</Link></li>
        </ul>
      </section>

      {/* SEO Content */}
      <section className="mb-12 text-gray-600 space-y-4">
        <p>
          Many users search for download videos online free tools.
          SaveAllHD makes it easy to save videos from different platforms
          in high definition quality.
        </p>

        <p>
          Whether you want to download YouTube videos in MP4,
          save TikTok videos without watermark, or store Instagram
          Reels offline, our online video downloader supports all major platforms.
        </p>

        <p>
          For audio downloads, try our{" "}
          <Link href="/youtube-to-mp3" className="text-blue-600 underline">
            YouTube to MP3 converter
          </Link>.
        </p>
      </section>

      {/* Features */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why Choose SaveAllHD?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Download videos from multiple platforms</li>
          <li>High-quality HD downloads</li>
          <li>No registration required</li>
          <li>Secure and reliable service</li>
          <li>Works on mobile and desktop</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-12 text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">
              Is this free video downloader really free?
            </h3>
            <p>
              Yes, SaveAllHD provides free video downloads with optional premium features.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Which platforms are supported?
            </h3>
            <p>
              You can download videos from YouTube, TikTok, Instagram,
              Facebook, and Twitter.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Do I need to install software?
            </h3>
            <p>
              No, our video downloader works entirely online.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download HD videos?
            </h3>
            <p>
              Yes, HD downloads are supported depending on source quality.
            </p>
          </div>

        </div>
      </section>

    </main>
  )
}