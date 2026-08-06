import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube Playlist Downloader Online (MP4 & MP3) | SaveAllHD",
  description:
    "Download full YouTube playlists easily. Convert YouTube playlist to MP4 or MP3 in high quality.",
}

export default function YouTubePlaylistDownloader() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        YouTube Playlist Downloader
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD allows you to download full YouTube playlists quickly and easily.
        You can convert YouTube playlists to MP4 or MP3 format in high quality
        without installing any software.
      </p>

      <p className="text-gray-600 mb-10">
        If you want to save multiple YouTube videos at once, our YouTube playlist
        downloader is the perfect solution.
      </p>

      {/* Downloader Placeholder */}
      <div className="mb-10">
        {/* Insert Playlist Downloader Component */}
      </div>

      {/* How To Use */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          How to Download a YouTube Playlist
        </h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>Copy the YouTube playlist URL.</li>
          <li>Paste it into the input box above.</li>
          <li>Select your preferred format (MP4 or MP3).</li>
          <li>Click download to save the full playlist.</li>
        </ol>
      </section>

      {/* SEO Content */}
      <section className="mb-12 text-gray-600 space-y-4">
        <p>
          Many users search for download YouTube playlist online tools.
          With SaveAllHD, you can save full YouTube playlists without downloading
          each video individually.
        </p>

        <p>
          Our YouTube playlist downloader supports high-quality video and audio formats.
          Whether you want to download a playlist for offline learning, travel,
          or music collection, our tool simplifies the process.
        </p>

        <p>
          If you only need audio, try our{" "}
          <Link href="/youtube-to-mp3" className="text-blue-600 underline">
            YouTube to MP3 converter
          </Link>.
        </p>
      </section>

      {/* Why Choose */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why Use SaveAllHD Playlist Downloader?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Download multiple videos in one click</li>
          <li>Supports MP4 and MP3 formats</li>
          <li>High-quality output</li>
          <li>No registration required</li>
          <li>Fast processing speed</li>
        </ul>

        <p>
          You can also download single videos using our{" "}
          <Link href="/youtube-to-mp4" className="text-blue-600 underline">
            YouTube to MP4 tool
          </Link>.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Who Uses Playlist Downloaders?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Students saving educational playlists</li>
          <li>Music lovers building offline libraries</li>
          <li>Travelers preparing content before trips</li>
          <li>Content creators analyzing videos offline</li>
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
              Is the YouTube playlist downloader free?
            </h3>
            <p>
              Yes, SaveAllHD provides free playlist downloads with optional premium upgrades.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download playlists in MP3 format?
            </h3>
            <p>
              Yes, you can convert full playlists to MP3 audio files.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Is there a limit for free users?
            </h3>
            <p>
              Free users have daily download limits. Premium users enjoy unlimited access.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does it work on mobile devices?
            </h3>
            <p>
              Yes, our playlist downloader works on smartphones and tablets.
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
          <li><Link href="/youtube-to-mp3">YouTube to MP3</Link></li>
          <li><Link href="/youtube-to-mp4">YouTube to MP4</Link></li>
          <li><Link href="/youtube-shorts-downloader">YouTube Shorts Downloader</Link></li>
          <li><Link href="/youtube-downloader">YouTube Downloader Hub</Link></li>
        </ul>
      </section>

    </main>
  )
}