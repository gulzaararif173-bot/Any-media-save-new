import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "TikTok Video Downloader (HD & No Watermark) | SaveAllHD",
  description:
    "Download TikTok videos online in HD quality. Save TikTok videos quickly and safely without installing apps.",
}

export default function TikTokVideoDownloader() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-6">
        TikTok Video Downloader
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-6">
        SaveAllHD allows you to download TikTok videos online in high quality.
        You can save TikTok videos instantly without installing any application.
      </p>

      <p className="text-gray-600 mb-10">
        If you are searching for a fast TikTok downloader, our tool helps you
        download TikTok videos easily and securely.
      </p>

      {/* Downloader Placeholder */}
      <div className="mb-10">
        {/* Insert TikTok Downloader Component */}
      </div>

      {/* How To Use */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          How to Download TikTok Videos
        </h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>Open the TikTok app or website.</li>
          <li>Copy the TikTok video link.</li>
          <li>Paste the URL in the input box above.</li>
          <li>Click download to save the video.</li>
        </ol>
      </section>

      {/* SEO Content */}
      <section className="mb-12 text-gray-600 space-y-4">
        <p>
          Many users search for download TikTok video online tools.
          SaveAllHD provides a simple and secure way to save TikTok videos
          directly to your device.
        </p>

        <p>
          You can download TikTok videos in HD quality for offline viewing.
          Whether you want to save funny clips, educational content,
          or trending videos, our TikTok downloader makes it easy.
        </p>

        <p>
          If you need watermark-free downloads, visit our{" "}
          <Link href="/tiktok-no-watermark" className="text-blue-600 underline">
            TikTok No Watermark Downloader
          </Link>.
        </p>
      </section>

      {/* Features */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Features of Our TikTok Downloader
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Fast video processing</li>
          <li>High-quality downloads</li>
          <li>No login required</li>
          <li>Works on all devices</li>
          <li>Secure and safe platform</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="mb-12 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why Download TikTok Videos?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Save videos for offline watching</li>
          <li>Share clips on other platforms</li>
          <li>Keep favorite content permanently</li>
          <li>Create compilations or edits</li>
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
              Is this TikTok video downloader free?
            </h3>
            <p>
              Yes, SaveAllHD allows free TikTok video downloads.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download TikTok videos in HD?
            </h3>
            <p>
              Yes, high-quality TikTok video downloads are supported.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does it remove watermark?
            </h3>
            <p>
              For watermark-free downloads, use our dedicated no-watermark tool.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does it work on mobile?
            </h3>
            <p>
              Yes, our TikTok downloader works on smartphones and desktops.
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
          <li><Link href="/tiktok-no-watermark">TikTok No Watermark</Link></li>
          <li><Link href="/youtube-downloader">YouTube Downloader</Link></li>
          <li><Link href="/instagram-reels-downloader">Instagram Reels Downloader</Link></li>
        </ul>
      </section>

    </main>
  )
}