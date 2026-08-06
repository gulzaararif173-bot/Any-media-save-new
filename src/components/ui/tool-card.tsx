import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Download,
  FilePlus,
  FileText,
  Film,
  Image,
  Minimize2,
  Play,
  RefreshCw,
  Scissors,
  Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";

type Tool = {
  name: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
  isNew?: boolean;
};

const iconMap: Record<string, LucideIcon> = {
  Download,
  Video,
  Play,
  Image,
  Scissors,
  FilePlus,
  FileText,
  Film,
  Minimize2,
  RefreshCw,
  Calculator,
};

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = iconMap[tool.icon] ?? Download;
  const hasBadge = Boolean(tool.badge) || tool.isNew;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md",
        "dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-800",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      )}
      aria-label={`${tool.name}: ${tool.description}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            "bg-blue-50 text-blue-600 transition-colors",
            "group-hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-900/50",
          )}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>

        {hasBadge && (
          <Badge>
            {tool.isNew ? "New" : tool.badge}
          </Badge>
        )}
      </div>

      <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
        Use tool
        <ArrowRight
          className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}