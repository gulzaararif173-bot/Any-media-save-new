import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube to MP4 Converter (HD & 1080p) | SaveAllHD",
  description:
    "Free YouTube to MP4 converter. Download YouTube videos in HD and 1080p quality online without installing software.",
}

export default function YouTubeToMP4Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        YouTube to MP4 Converter
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD is a free YouTube to MP4 converter that allows you to download
        YouTube videos in high quality. You can convert YouTube video to MP4 format
        instantly and save videos offline without installing any software.
      </p>

      <p className="text-gray-600 mb-10">
        If you are searching for a fast YouTube video downloader, this tool lets
        you download YouTube videos in HD and 1080p resolution safely and easily.
      </p>

      {/* Downloader Placeholder */}
      <div className="mb-10">
        {/* Insert Downloader Component Here */}
      </div>

      {/* How To Use */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          How to Download YouTube Videos as MP4
        </h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>Copy the YouTube video link.</li>
          <li>Paste the URL in the input field above.</li>
          <li>Select MP4 format.</li>
          <li>Click download and save the file.</li>
        </ol>
      </section>

      {/* Features */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Features of Our YouTube to MP4 Tool
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Download YouTube videos in HD</li>
          <li>Supports 1080p quality</li>
          <li>No registration required</li>
          <li>Works on mobile and desktop</li>
          <li>Safe and secure downloading</li>
        </ul>
      </section>

      {/* SEO Content */}
      <section className="mb-12 text-gray-600 space-y-4">
        <p>
          <Link href="/youtube-to-mp3" className="text-blue-600 underline">
            YouTube to MP3
          </Link>{" "}
          and YouTube to MP4 conversion are among the most popular online tools.
          Many users prefer downloading YouTube videos in MP4 format so they can
          watch them offline anytime.
        </p>

        <p>
          Our YouTube to MP4 converter ensures smooth video downloads in high
          resolution. Whether you want to save tutorials, music videos, lectures,
          or entertainment clips, our tool helps you download YouTube videos
          without complications.
        </p>

        <p>
          You can also use our{" "}
          <Link href="/youtube-playlist-downloader" className="text-blue-600 underline">
            YouTube Playlist Downloader
          </Link>{" "}
          if you need to download multiple videos at once.
        </p>
      </section>

      {/* High Quality Section */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Download YouTube Videos in 1080p
        </h2>

        <p>
          Many users search for download YouTube 1080p options. SaveAllHD
          supports high-definition video downloads, making it easy to save
          high-quality MP4 files for offline viewing.
        </p>

        <p>
          If you prefer audio only, try our{" "}
          <Link href="/youtube-to-m4a" className="text-blue-600 underline">
            YouTube to M4A converter
          </Link>{" "}
          or{" "}
          <Link href="/convert-youtube-to-wav" className="text-blue-600 underline">
            YouTube to WAV converter
          </Link>.
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
              Is this YouTube to MP4 converter free?
            </h3>
            <p>
              Yes, SaveAllHD allows you to download YouTube videos in MP4 format for free.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download videos in 1080p?
            </h3>
            <p>
              Yes, high-definition downloads including 1080p are supported.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Do I need to install software?
            </h3>
            <p>
              No, our YouTube video downloader works directly in your browser.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Is there a daily limit?
            </h3>
            <p>
              Free users have a daily limit. Premium users enjoy unlimited downloads.
            </p>
          </div>

        </div>
      </section>

      {/* Related */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Related Tools
        </h3>

        <ul className="space-y-2 text-blue-600 underline">
          <li><Link href="/youtube-to-mp3">YouTube to MP3 Converter</Link></li>
          <li><Link href="/youtube-playlist-downloader">YouTube Playlist Downloader</Link></li>
          <li><Link href="/download-youtube-1080p">Download YouTube 1080p</Link></li>
          <li><Link href="/youtube-downloader">YouTube Downloader Hub</Link></li>
        </ul>
      </section>

    </main>
  )
}