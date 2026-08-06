"use client"

import Link from "next/link"
import React from "react"

type RelatedTool = {
  title: string
  href: string
}

interface ToolPageTemplateProps {
  title: string
  description: string
  keyword: string
  related: RelatedTool[]
}

export default function ToolPageTemplate({
  title,
  description,
  keyword,
  related,
}: ToolPageTemplateProps) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      {/* Description */}
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Downloader Placeholder */}
      <div className="mb-10">
        {/* Insert Downloader Component Here */}
      </div>

      {/* How To Use */}
      <section className="mb-10 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          How to Use {keyword}
        </h2>

        <ol className="list-decimal ml-6 space-y-2">
          <li>Copy the YouTube video URL.</li>
          <li>Paste the link in the input box.</li>
          <li>Select your preferred format.</li>
          <li>Click download and save the file.</li>
        </ol>
      </section>

      {/* Why Use */}
      <section className="mb-10 text-gray-600 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why Use SaveAllHD?
        </h2>

        <p>
          SaveAllHD provides fast processing, high-quality output,
          and a secure experience without unnecessary redirects.
        </p>

        <p>
          This {keyword} tool works on all devices and requires no installation.
        </p>
      </section>

      {/* Related Tools */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Related Tools
        </h2>

        <ul className="space-y-2 text-blue-600 underline">
          {related && related.length > 0 ? (
            related.map((tool, index) => (
              <li key={index}>
                <Link href={tool.href}>{tool.title}</Link>
              </li>
            ))
          ) : (
            <li>No related tools available.</li>
          )}
        </ul>
      </section>

    </main>
  )
}