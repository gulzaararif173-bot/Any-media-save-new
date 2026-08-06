"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

import { Badge } from "../ui/badge";
import { Container } from "../ui/container";
import { UrlInput } from "../download/url-input";
import { ResultCard } from "../download/result-card";
import { ResultSkeleton } from "../download/result-skeleton";
import { LoadingOverlay } from "../ui/loading-overlay";
import { useDownloadEngine } from "@/hooks/use-download-engine";

const features = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Zap, text: "100% Safe" },
  { icon: Zap, text: "No Registration" },
] as const;

const quickLinks = [
  { label: "YouTube", href: "/youtube-downloader" },
  { label: "TikTok", href: "/tiktok-downloader" },
  { label: "Instagram", href: "/instagram-downloader" },
  { label: "Facebook", href: "/facebook-downloader" },
] as const;

export function HeroSection() {
  const { url, setUrl, analyze, isLoading, metadata, status, error } =
    useDownloadEngine();

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20"
        aria-labelledby="hero-heading"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <Container size="lg">
          <div className="relative text-center">

            {/* Logo + Animated Accent */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl font-bold text-white">
                SaveAllHD
              </span>
              <div className="premium-line" />
            </div>

            {/* Badge */}
            <div className="mb-6 flex justify-center">
              <Badge className="gap-1.5 px-4 py-1.5 text-sm">
                <Zap className="h-3.5 w-3.5" />
                Free Online Video Downloader
              </Badge>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Download Any Video{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              Download videos from YouTube, TikTok, Instagram, Facebook and more.
              Fast, secure and completely free.
            </p>

            {/* Features */}
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  {text}
                </div>
              ))}
            </div>

            {/* URL Input with animation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-10 max-w-2xl"
            >
              <UrlInput
                value={url}
                onChange={setUrl}
                onSubmit={() => void analyze()}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Error */}
            {status === "error" && error && (
              <div className="mx-auto mt-4 max-w-2xl">
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
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
                className="mx-auto mt-8 max-w-2xl"
              >
                {isLoading ? (
                  <ResultSkeleton />
                ) : metadata ? (
                  <ResultCard metadata={metadata} />
                ) : null}
              </motion.div>
            )}

            {/* Quick Links */}
            {!metadata && !isLoading && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-slate-300 transition hover:border-blue-500 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

          </div>
        </Container>
      </section>
    </>
  );
}