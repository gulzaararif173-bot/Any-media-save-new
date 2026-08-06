import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  platform: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "Content Creator",
    avatar: "AC",
    content:
      "AnyMediaSave has been a game-changer. I can download any video in seconds for my editing projects. Best free tool I've found.",
    rating: 5,
    platform: "YouTube Creator",
  },
  {
    name: "Sarah Williams",
    role: "Social Media Manager",
    avatar: "SW",
    content:
      "The TikTok downloader without watermark is incredible. Saves me so much time every single day managing multiple brand accounts.",
    rating: 5,
    platform: "TikTok User",
  },
  {
    name: "Marco Rossi",
    role: "Videographer",
    avatar: "MR",
    content:
      "Download quality is perfect — I get proper HD and 4K files without any compression. Exactly what professionals need.",
    rating: 5,
    platform: "Vimeo User",
  },
  {
    name: "Priya Patel",
    role: "Digital Marketer",
    avatar: "PP",
    content:
      "Works flawlessly on my phone. Being able to download Instagram Reels and Stories anywhere is exactly what I needed.",
    rating: 5,
    platform: "Instagram User",
  },
  {
    name: "James Thompson",
    role: "Educator",
    avatar: "JT",
    content:
      "I download educational videos for offline teaching. AnyMediaSave is reliable, fast, and I've never had it fail on me.",
    rating: 5,
    platform: "YouTube User",
  },
  {
    name: "Lena Müller",
    role: "Blogger",
    avatar: "LM",
    content:
      "Simple, clean interface and lightning-fast downloads. No ads, no spam, no fuss. It just works every single time.",
    rating: 5,
    platform: "Multiple Platforms",
  },
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} testimonial={t} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Stars */}
      <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={
              i < t.rating
                ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                : "h-4 w-4 text-slate-200 dark:text-slate-700"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        &ldquo;{t.content}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          aria-hidden="true"
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {t.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.role} · {t.platform}
          </p>
        </div>
      </div>
    </div>
  );
}