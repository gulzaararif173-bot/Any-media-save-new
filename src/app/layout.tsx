import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "SaveAllHD",
  description: "Free online video downloader tools",
  verification: {
    google: "5SfN9xWpXpx-AbxA78gQcNVbMZXMi3cOJFeb8e664Ds",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}