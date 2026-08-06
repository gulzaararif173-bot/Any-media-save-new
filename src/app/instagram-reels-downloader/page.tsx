import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Instagram Reels Downloader (HD Video) | SaveAllHD",
  description:
    "Download Instagram Reels videos in HD quality. Save Instagram Reels online without installing any app.",
}

export default function InstagramReelsDownloader() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        Instagram Reels Downloader
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD allows you to download Instagram Reels videos quickly and easily.
        You can save Instagram Reels in high-definition quality without installing
        any application.
      </p>

      <p className="text-gray-600 mb-10">
        If you are searching for an Instagram Reels downloader online,
        our tool helps you download Reels videos securely and instantly.
      </p>

      {/* Downloader Placeholder */}
      <div className="mb-10">
        {/* Insert Instagram Reels Downloader Component */}
      </div>

      {/* How To Use */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          How to Download Instagram Reels
        </h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>Open Instagram and copy the Reels video link.</li>
          <li>Paste the URL in the input field above.</li>
          <li>Click download to save the video.</li>
        </ol>
      </section>

      {/* SEO Content */}
      <section className="mb-12 text-gray-600 space-y-4">
        <p>
          Many users search for download Instagram Reels video options.
          SaveAllHD provides a simple and safe way to save Instagram Reels
          for offline viewing.
        </p>

        <p>
          You can download Reels in HD format and store your favorite
          short videos permanently. Whether it is entertainment,
          educational content, or creative clips, our Instagram video
          downloader simplifies the process.
        </p>

        <p>
          If you also download TikTok videos, try our{" "}
          <Link href="/tiktok-video-downloader" className="text-blue-600 underline">
            TikTok Video Downloader
          </Link>.
        </p>
      </section>

      {/* Features */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Features of Our Instagram Reels Downloader
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Fast processing speed</li>
          <li>HD video downloads</li>
          <li>No login required</li>
          <li>Works on mobile and desktop</li>
          <li>Secure and reliable platform</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why Download Instagram Reels?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Save favorite content offline</li>
          <li>Share videos with friends</li>
          <li>Create compilations</li>
          <li>Archive creative ideas</li>
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
              Is Instagram Reels downloader free?
            </h3>
            <p>
              Yes, SaveAllHD provides free Instagram Reels downloads.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download Reels in HD?
            </h3>
            <p>
              Yes, HD Instagram Reels downloads are supported.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does it work on smartphones?
            </h3>
            <p>
              Yes, our tool works on both mobile devices and desktops.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Is it safe to use?
            </h3>
            <p>
              Yes, SaveAllHD does not store your files and is secure.
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
          <li><Link href="/tiktok-video-downloader">TikTok Video Downloader</Link></li>
          <li><Link href="/youtube-downloader">YouTube Downloader</Link></li>
          <li><Link href="/facebook-video-downloader">Facebook Video Downloader</Link></li>
        </ul>
      </section>

    </main>
  )
}