import "./globals.css"
import type { ReactNode } from "react"

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
          content="nzZ5CtyudOnwZz-UVJdsueMkJOmGatawyZX9Aw_L_0k"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}