"use client";

import React from "react";
const steps = [
  {
    step: "01",
    title: "Paste Your Media URL",
    desc: "Copy and paste a public video, reel, short, or social media link into the analyzer.",
  },
  {
    step: "02",
    title: "AI Metadata Analysis",
    desc: "Our intelligent engine instantly detects the platform and extracts titles, thumbnails, duration, author information, and other public metadata.",
  },
  {
    step: "03",
    title: "Preview Your Results",
    desc: "View the extracted media information, preview thumbnails, and access available public media details in seconds.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-800/80 bg-slate-900/40 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How AnyMediaSave Works
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Analyze any supported public media link in three quick and easy steps.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Desktop Connector */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent md:block" />

          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-blue-500/10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-xl font-black text-white shadow-xl">
                {item.step}
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}