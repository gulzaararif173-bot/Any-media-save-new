"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // ✅ IMPORTANT IMPORT

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/ui/section";
import { UrlInput } from "@/components/download/url-input";
import { ResultCard } from "@/components/download/result-card";
import { ResultSkeleton } from "@/components/download/result-skeleton";
import { FaqBlock } from "@/components/download/faq-block";
import { CtaSection } from "@/components/download/cta-section";
import { DownloadHistory } from "@/components/download/download-history";
import { PlatformSupported } from "@/components/download/platform-supported";
import { DownloadManagerPanel } from "@/components/download/download-manager-panel";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useDownloadEngine } from "@/hooks/use-download-engine";
import type { FaqEntry } from "@/components/download/faq-block";

type AccentColor =
  | "red"
  | "slate"
  | "pink"
  | "blue"
  | "rose"
  | "cyan"
  | "indigo"
  | "purple";

interface DownloaderPageProps {
  platform: string;
  heading: string;
  subheading: string;
  placeholder: string;
  accentColor: AccentColor;
  features: string[];
  faqs: FaqEntry[];
}

const accentBadgeMap: Record<AccentColor, string> = {
  red: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800",
  slate:
    "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600",
  pink: "bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:ring-pink-800",
  blue: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800",
  rose: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:ring-rose-800",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:ring-cyan-800",
  indigo:
    "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-800",
  purple:
    "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-800",
};

export function DownloaderPage({
  platform,
  heading,
  subheading,
  placeholder,
  accentColor,
  features,
  faqs,
}: DownloaderPageProps) {
  const { url, setUrl, analyze, isLoading, metadata, status, error } =
    useDownloadEngine();

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 dark:from-slate-900 dark:to-slate-900"
        aria-labelledby="downloader-heading"
      >
        <Container size="lg">
          <div className="relative text-center">

            {/* Badge */}
            <div className="mb-4 flex justify-center">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset",
                  accentBadgeMap[accentColor],
                )}
              >
                {platform} Downloader
              </span>
            </div>

            {/* Heading */}
            <h1
              id="downloader-heading"
              className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
            >
              {heading}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
              {subheading}
            </p>

            {/* Animated Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-2xl"
            >
              <UrlInput
                value={url}
                onChange={setUrl}
                onSubmit={() => void analyze()}
                isLoading={isLoading}
                placeholder={placeholder}
              />
            </motion.div>

            {/* Error */}
            {status === "error" && error && (
              <div className="mx-auto mt-4 max-w-2xl">
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Result */}
            {(isLoading || metadata) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto mt-8 max-w-2xl text-left"
              >
                {isLoading ? (
                  <ResultSkeleton />
                ) : metadata ? (
                  <ResultCard metadata={metadata} />
                ) : null}
              </motion.div>
            )}

            {/* Features */}
            {!metadata && !isLoading && (
              <div className="mx-auto mt-8 max-w-2xl">
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </Container>
      </section>

      {/* History */}
      <Section spacing="sm">
        <Container size="md">
          <DownloadHistory />
        </Container>
      </Section>

      {/* Other Platforms */}
      <Section className="bg-slate-50 dark:bg-slate-800/50">
        <Container>
          <SectionHeader>
            <SectionTitle>More Downloaders</SectionTitle>
            <SectionDescription>
              Download from any platform — all free, all in one place.
            </SectionDescription>
          </SectionHeader>
          <PlatformSupported />
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="md">
          <SectionHeader>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <SectionDescription>
              Common questions about the {platform} downloader.
            </SectionDescription>
          </SectionHeader>
          <FaqBlock faqs={faqs} />
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <CtaSection
            title={`Start downloading ${platform} videos now`}
            description={`Join millions of users who use AnyMediaSave to download ${platform} content every day — free, fast and safe.`}
          />
        </Container>
      </Section>

      {/* Download manager */}
      <DownloadManagerPanel />
    </>
  );
}