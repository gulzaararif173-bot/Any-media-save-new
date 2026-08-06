const stats = [
  { value: "10M+", label: "Videos Downloaded", description: "and counting every day" },
  { value: "8+", label: "Platforms Supported", description: "YouTube, TikTok, Instagram…" },
  { value: "2M+", label: "Happy Users", description: "worldwide" },
  { value: "99.9%", label: "Uptime", description: "always available" },
] as const;

export function StatsSection() {
  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
      aria-label="Platform statistics"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-2xl bg-white/60 p-5 text-center backdrop-blur-sm dark:bg-slate-800/60"
        >
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 sm:text-4xl">
            {stat.value}
          </span>
          <span className="mt-1 font-semibold text-slate-900 dark:text-white text-sm">
            {stat.label}
          </span>
          <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {stat.description}
          </span>
        </div>
      ))}
    </div>
  );
}