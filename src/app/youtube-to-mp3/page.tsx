import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube to MP3 Converter Free (Fast & High Quality) | SaveAllHD",
  description:
    "Free YouTube to MP3 converter. Convert YouTube videos to MP3 and download high-quality audio online without installing software.",
}

export default function YouTubeToMP3Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        YouTube to MP3 Converter
      </h1>

      {/* Intro with keyword variations */}
      <p className="mb-6 text-lg text-gray-600">
        SaveAllHD is a free YouTube to MP3 converter that allows you to convert
        YouTube video to MP3 format instantly. You can download YouTube audio
        in high quality without installing any software. Our YouTube audio
        downloader works on mobile, desktop, and tablet devices.
      </p>

      <p className="mb-6 text-gray-600">
        If you are looking for a fast MP3 converter online, this tool helps you
        convert YouTube videos into audio files in seconds. No registration,
        no complicated steps — just paste the link and download.
      </p>

      {/* Downloader Component */}
      <div className="mb-10">
        {/* Downloader goes here */}
      </div>

      {/* How To Use */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          How to Convert YouTube to MP3
        </h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Copy the YouTube video URL.</li>
          <li>Paste the link into the input box above.</li>
          <li>Click the convert button.</li>
          <li>Select MP3 format.</li>
          <li>Download your audio file instantly.</li>
        </ol>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Features of Our YouTube to MP3 Tool
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Fast conversion speed</li>
          <li>High-quality MP3 audio</li>
          <li>No registration required</li>
          <li>Works on all devices</li>
          <li>Secure and safe downloads</li>
        </ul>
      </section>

      {/* Core SEO Content */}
      <section className="mb-10 space-y-4 text-gray-600">
        <p>
          <Link href="/youtube-to-mp4" className="text-blue-600 underline">
            YouTube to MP4
          </Link>{" "}
          and YouTube to MP3 conversion are among the most popular online tools.
          Many users prefer listening to music or podcasts offline instead of
          streaming continuously.
        </p>

        <p>
          Our YouTube to MP3 converter extracts high-quality audio directly from
          the video source. Whether you are downloading music, lectures,
          interviews, or motivational speeches, SaveAllHD ensures clear sound
          without distortion.
        </p>

        <p>
          Unlike many other converters, SaveAllHD does not require account
          registration. Simply paste the link and start converting immediately.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-10 space-y-4 text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">
          Why Choose SaveAllHD Over Other Converters?
        </h2>

        <p>
          Many YouTube to MP3 websites are slow or filled with aggressive ads.
          SaveAllHD provides a clean interface, fast processing, and reliable
          high-quality downloads without unnecessary redirects.
        </p>

        <p>
          Our tool works entirely online. You do not need to install extensions
          or software. Simply open the website and convert YouTube video to MP3
          safely and quickly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Download High-Quality YouTube Audio
        </h2>

        <p>
          If you search for high quality YouTube to MP3 converter, you will
          find many options. SaveAllHD focuses on providing stable conversion
          speed and clear audio output so you can enjoy your favorite content offline.
        </p>

        <p>
          Whether building a personal music collection or saving educational
          content for offline use, our YouTube audio downloader simplifies the process.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-gray-600">

          <div>
            <h3 className="font-semibold">
              Is this YouTube to MP3 converter free?
            </h3>
            <p>
              Yes, SaveAllHD provides free YouTube to MP3 conversion for all users.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I use this tool on mobile?
            </h3>
            <p>
              Yes, our converter works perfectly on Android, iPhone, and desktop devices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              What audio quality can I download?
            </h3>
            <p>
              You can download high-quality MP3 files depending on the original video quality.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Is there a daily download limit?
            </h3>
            <p>
              Free users have a daily limit, while Premium users enjoy unlimited downloads.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Is it safe to download YouTube audio?
            </h3>
            <p>
              Yes, SaveAllHD is secure and does not store your files on our servers.
            </p>
          </div>

        </div>
      </section>

      {/* Internal Links */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Related Tools
        </h3>
        <ul className="space-y-2">
          <li>
            <Link href="/youtube-to-mp4" className="text-blue-600 underline">
              YouTube to MP4 Converter
            </Link>
          </li>
          <li>
            <Link href="/youtube-playlist-downloader" className="text-blue-600 underline">
              YouTube Playlist Downloader
            </Link>
          </li>
          <li>
            <Link href="/convert-youtube-to-wav" className="text-blue-600 underline">
              YouTube to WAV Converter
            </Link>
          </li>
          <li>
            <Link href="/free-video-downloader-online" className="text-blue-600 underline">
              Free Video Downloader Online
            </Link>
          </li>
        </ul>
      </section>

    </main>
  )
}