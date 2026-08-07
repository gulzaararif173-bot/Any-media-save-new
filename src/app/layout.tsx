import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "SaveAllHD",
  description: "Free online video downloader tools",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="5SfN9xWpXpx-AbxA78gQcNVbMZXMi3cOJFeb8e664Ds"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}