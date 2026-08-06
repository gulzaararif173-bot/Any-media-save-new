import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section, SectionDescription, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ToolCard } from "@/components/ui/tool-card";
// If the site config module is unavailable in this environment, fall back to
// an empty list to avoid build errors. In the real app the import should
// provide the actual featuredTools array.
const featuredTools: {
  id?: any;
  name: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
  isNew?: boolean;
}[] = [];

export function FeaturedTools() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Popular Tools</SectionTitle>
          <SectionDescription>
            Everything you need to download and manage media — free, fast and
            always available.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tools"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3",
              "text-sm font-medium text-slate-700 transition-colors",
              "hover:border-slate-300 hover:bg-slate-50",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            )}
          >
            View all tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}