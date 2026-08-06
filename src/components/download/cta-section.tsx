import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CtaSection({
  title = "Ready to start downloading?",
  description = "Join millions of users who download videos for free every day. No account required.",
  primaryLabel = "Start Downloading — Free",
  primaryHref = "/",
}: CtaSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 px-6 py-12 text-center sm:px-12 sm:py-16 dark:from-blue-700 dark:to-cyan-700">
      {/* Decorations */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <h2 className="text-balance text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-blue-100">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" variant="secondary">
            <Link href={primaryHref}>
              <Download className="h-5 w-5" aria-hidden="true" />
              {primaryLabel}
            </Link>
          </Button>
          <Button asChild size="xl" variant="ghost" className="text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10">
            <Link href="/youtube-downloader">
              Browse Tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-blue-200">
          Free forever · No registration · No watermarks
        </p>
      </div>
    </div>
  );
}