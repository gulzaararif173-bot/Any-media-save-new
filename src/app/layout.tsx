import "./globals.css"
import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SaveAllHD",
  description: "Free online video downloader tools",
  verification: {
    google: "nzZ5CtyudOnwZz-UVJdsueMkJOmGatawyZX9Aw_L_0k",
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