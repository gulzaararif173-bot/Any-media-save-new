import Link from "next/link";
import { Download, Heart } from "lucide-react";
import React from "react";

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0019 4.77 5.07 5.07 0 0018.91 1S17.73.65 15 2.48a13.38 13.38 0 00-10 0C2.27.65 1.09 1 1.09 1A5.07 5.07 0 001 4.77c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 006.5 18.5V22" />
  </svg>
);

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

const siteConfig = {
  name: "Any Media Save",
  description: "Download videos and convert media files easily",
};

const footerSections = [
  {
    title: "Downloaders",
    links: [
      { label: "YouTube", href: "/youtube-downloader" },
      { label: "TikTok", href: "/tiktok-downloader" },
      { label: "Instagram", href: "/instagram-downloader" },
      { label: "Facebook", href: "/facebook-downloader" },
      { label: "X (Twitter)", href: "/x-downloader" },
      { label: "Vimeo", href: "/vimeo-downloader" },
    ],
  },
  {
    title: "Image Tools",
    links: [
      { label: "Background Remover", href: "/background-remover" },
      { label: "Image Compressor", href: "/image-compressor" },
      { label: "Image Converter", href: "/image-converter" },
    ],
  },
  {
    title: "PDF Tools",
    links: [
      { label: "PDF Merge", href: "/pdf-merge" },
      { label: "PDF Split", href: "/pdf-split" },
      { label: "PDF Compress", href: "/pdf-compress" },
      { label: "Word to PDF", href: "/word-to-pdf" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

const socials = [
  { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80"
      aria-label="Site footer"
    >
      <Container>
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`${siteConfig.name} — home`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500" aria-hidden="true">
                <Download className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">{siteConfig.name}</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {siteConfig.description}
            </p>

            <div className="mt-4 flex gap-1.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900",
                    "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {section.title}
              </h3>
              <ul className="space-y-2" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-slate-600 transition-colors hover:text-slate-900",
                        "dark:text-slate-400 dark:hover:text-white",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            Made with{" "}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" aria-hidden="true" />{" "}
            for creators worldwide
          </p>
        </div>
      </Container>
    </footer>
  );
}