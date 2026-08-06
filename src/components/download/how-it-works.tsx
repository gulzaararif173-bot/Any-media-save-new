import { CheckCircle2, Download, Link2, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  color: { bg: string; icon: string; badge: string };
}

export function HowItWorksSteps() {
  const steps: Step[] = [
    {
      step: 1,
      icon: Link2,
      title: "Paste the URL",
      description: "Copy the video link from any supported platform and paste it into the input field above.",
      color: {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        icon: "text-blue-600 dark:text-blue-400",
        badge: "bg-blue-600 text-white",
      },
    },
    {
      step: 2,
      icon: Settings2,
      title: "Choose your format",
      description: "Select video quality (up to 4K), format type, or download audio-only in MP3.",
      color: {
        bg: "bg-purple-50 dark:bg-purple-900/30",
        icon: "text-purple-600 dark:text-purple-400",
        badge: "bg-purple-600 text-white",
      },
    },
    {
      step: 3,
      icon: Download,
      title: "Download instantly",
      description: "Click download and your file saves directly to your device in seconds.",
      color: {
        bg: "bg-green-50 dark:bg-green-900/30",
        icon: "text-green-600 dark:text-green-400",
        badge: "bg-green-600 text-white",
      },
    },
  ];

  return (
    <div>
      <div className="relative mx-auto max-w-4xl">
        <div
          className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-slate-200 dark:bg-slate-700 lg:block"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3" role="list">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${s.color.bg}`} aria-hidden="true">
                    <Icon className={`h-8 w-8 ${s.color.icon}`} />
                  </div>
                  <span
                    className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${s.color.badge}`}
                    aria-label={`Step ${s.step}`}
                  >
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {s.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="mt-6 h-8 w-px bg-slate-200 dark:bg-slate-700 lg:hidden" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-5 py-2.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400" role="note">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Free, safe and no registration required
        </div>
      </div>
    </div>
  );
}