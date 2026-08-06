"use client";

import { JSX, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionDescription, SectionHeader, SectionTitle } from "@/components/ui/section";

const faqs = [
  {
    question: "Is AnyMediaSave completely free?",
    answer: "Yes, AnyMediaSave is 100% free. No hidden fees, no subscriptions, no registration required. Paste a URL and download.",
  },
  {
    question: "Which video platforms are supported?",
    answer: "We support YouTube, TikTok, Instagram, Facebook, X (Twitter), Vimeo, Pinterest, Dailymotion and many more. We continuously add new platforms.",
  },
  {
    question: "What video qualities are available?",
    answer: "All available qualities are supported — from 144p to 4K (2160p) depending on the source. You can also download audio-only in MP3.",
  },
  {
    question: "Can I download TikTok videos without a watermark?",
    answer: "Yes! Our TikTok downloader removes the watermark automatically. Just paste the TikTok video URL and choose no-watermark option.",
  },
  {
    question: "Is it safe to use?",
    answer: "Absolutely. We never store your downloaded files. All processing is secure and files go directly to your device.",
  },
  {
    question: "Do I need to install software?",
    answer: "No installation needed. AnyMediaSave is fully web-based and works in your browser on any device.",
  },
];

type FaqItemProps = {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-700">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {index + 1}. {question}
        </span>
        <span className="ml-4 text-xl text-slate-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-slate-600 dark:text-slate-300">
          {answer}
        </div>
      )}
    </div>
  );
}

export function FaqSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="bg-slate-50 dark:bg-slate-800/50">
      <Container size="md">
        <SectionHeader>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionDescription>
            Everything you need to know about AnyMediaSave.
          </SectionDescription>
        </SectionHeader>

        <div
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-800"
          role="region"
          aria-label="Frequently asked questions"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              {...faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}