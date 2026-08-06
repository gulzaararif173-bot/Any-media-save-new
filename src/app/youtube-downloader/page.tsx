import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube Downloader Online (MP3, MP4, Playlist & More) | SaveAllHD",
  description:
    "Free YouTube downloader online. Download YouTube videos as MP3, MP4, 1080p, WAV, M4A or full playlists easily and safely.",
}

export default function YouTubeDownloaderHub() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        Free YouTube Downloader Online
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD is a complete YouTube downloader that allows you to download
        YouTube videos in multiple formats including{" "}
        <Link href="/youtube-to-mp3" className="text-blue-600 underline">
          MP3
        </Link>,{" "}
        <Link href="/youtube-to-mp4" className="text-blue-600 underline">
          MP4
        </Link>, 1080p, WAV, M4A, and full playlists.
        Whether you want to convert YouTube videos to audio or download high-quality
        video files, our tools make it simple and fast.
      </p>

      <p className="text-gray-600 mb-10">
        Our YouTube downloader works directly in your browser. No software
        installation is required. Simply paste the video link and choose
        your preferred format.
      </p>

      {/* Tool Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          YouTube Download Tools
        </h2>

        <ul className="grid md:grid-cols-2 gap-4 text-blue-600 underline">
          <li><Link href="/youtube-to-mp3">YouTube to MP3 Converter</Link></li>
          <li><Link href="/youtube-to-mp4">YouTube to MP4 Converter</Link></li>
          <li><Link href="/youtube-playlist-downloader">YouTube Playlist Downloader</Link></li>
          <li><Link href="/youtube-thumbnail-downloader">YouTube Thumbnail Downloader</Link></li>
          <li><Link href="/convert-youtube-to-wav">YouTube to WAV Converter</Link></li>
          <li><Link href="/youtube-to-m4a">YouTube to M4A Converter</Link></li>
          <li><Link href="/download-youtube-1080p">Download YouTube 1080p</Link></li>
          <li><Link href="/youtube-shorts-downloader">YouTube Shorts Downloader</Link></li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">
          Why Use SaveAllHD YouTube Downloader?
        </h2>

        <p>
          Many online downloaders are slow, filled with ads, or unsafe.
          SaveAllHD provides a clean interface, fast processing,
          and reliable downloads without requiring registration.
        </p>

        <p>
          You can download YouTube videos in high quality and convert
          them into different audio formats depending on your needs.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">
          What Can You Download?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Music videos converted to MP3</li>
          <li>Educational lectures saved for offline listening</li>
          <li>Full playlists for travel or study</li>
          <li>High-quality 1080p video downloads</li>
          <li>YouTube Shorts and thumbnails</li>
        </ul>
      </section>

      {/* ✅ NEW SEO BOOST SECTION */}
      <section className="mb-12 text-gray-600 space-y-4">

        <h2 className="text-2xl font-semibold mb-4">
          Best Free YouTube Downloader Online
        </h2>

        <p>
          If you are searching for the best YouTube downloader online,
          SaveAllHD provides a complete solution. You can download YouTube videos
          free in multiple formats including{" "}
          <Link href="/youtube-to-mp3" className="text-blue-600 underline">
            YouTube to MP3
          </Link>,{" "}
          <Link href="/youtube-to-mp4" className="text-blue-600 underline">
            YouTube to MP4
          </Link>, WAV, M4A, and high-definition 1080p.
        </p>

        <p>
          Our free YouTube video downloader allows users to save YouTube videos
          offline quickly and securely. You can also download full playlists using our{" "}
          <Link href="/youtube-playlist-downloader" className="text-blue-600 underline">
            YouTube Playlist Downloader
          </Link>.
        </p>

        <p>
          Unlike many other websites, SaveAllHD focuses on speed, safety, and
          user experience. No unnecessary popups, no forced registrations —
          just fast YouTube downloads.
        </p>

      </section>

      {/* FAQ */}
      <section className="mb-12 text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">
              Is this YouTube downloader free?
            </h3>
            <p>
              Yes, SaveAllHD provides free YouTube downloads with optional premium upgrades.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download YouTube videos in 1080p?
            </h3>
            <p>
              Yes, you can download YouTube videos in high-definition formats.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does it support playlist downloads?
            </h3>
            <p>
              Yes, our YouTube playlist downloader allows you to download multiple videos at once.
            </p>
          </div>

        </div>
      </section>

      {/* ✅ FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this YouTube downloader free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, SaveAllHD provides free YouTube downloads."
                }
              },
              {
                "@type": "Question",
                name: "Can I download YouTube videos in 1080p?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, high-definition downloads are supported."
                }
              }
            ]
          })
        }}
      />

    </main>
  )
}