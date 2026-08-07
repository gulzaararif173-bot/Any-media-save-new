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
      <body>{children}</body>
    </html>
  )
}