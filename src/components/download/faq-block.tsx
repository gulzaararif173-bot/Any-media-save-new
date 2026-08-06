"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  faqs: FaqEntry[];
}

export function FaqBlock({ faqs }: FaqBlockProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-800">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const headingId = `faq-q-${index}`;
        const contentId = `faq-a-${index}`;

        return (
          <div key={faq.question} className="border-b border-slate-200 last:border-0 dark:border-slate-700">
            <button
              id={headingId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className={cn(
                "flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium sm:text-base",
                "text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg",
              )}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                  isOpen && "rotate-180 text-blue-500",
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={headingId}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}