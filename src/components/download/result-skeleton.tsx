import { Skeleton } from "@/components/ui/loader";

export function ResultSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 animate-fade-in"
      aria-label="Loading video information"
      aria-busy="true"
    >
      <div className="p-5 sm:p-6 space-y-5">
        {/* Thumbnail */}
        <Skeleton className="aspect-video w-full rounded-xl" />

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-px w-full" />

        {/* Quality picker */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Button */}
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}