"use client";

import React from "react";

export default function LoadingSkeleton() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="animate-pulse overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

        {/* Header */}
        <div className="mb-8">
          <div className="h-7 w-52 rounded-lg bg-slate-800" />
          <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-800" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Thumbnail */}
          <div className="space-y-4">
            <div className="aspect-video rounded-2xl bg-slate-800" />

            <div className="flex gap-3">
              <div className="h-8 w-24 rounded-full bg-slate-800" />
              <div className="h-8 w-24 rounded-full bg-slate-800" />
              <div className="h-8 w-24 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* Metadata */}
          <div>

            <div className="mb-6 h-7 w-3/4 rounded bg-slate-800" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-36 rounded bg-slate-800" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-28 rounded bg-slate-800" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-32 rounded bg-slate-800" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-40 rounded bg-slate-800" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-20 rounded bg-slate-800" />
              </div>

            </div>

            {/* Download Buttons Skeleton */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="h-12 rounded-xl bg-slate-800" />

              <div className="h-12 rounded-xl bg-slate-800" />

              <div className="col-span-2 h-12 rounded-xl bg-slate-800" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}