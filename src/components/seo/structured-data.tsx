import type { FaqEntry } from "../download/faq-block";
import type { BreadcrumbEntry } from "../../lib/seo/structured-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildSoftwareAppSchema,
  buildWebAppSchema,
  buildWebSiteSchema,
} from "../../lib/seo/structured-data";

export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }}
    />
  );
}

export function WebAppSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebAppSchema()) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildOrganizationSchema()),
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: FaqEntry[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildBreadcrumbSchema(items)),
      }}
    />
  );
}

export function SoftwareAppSchema({ platform }: { platform: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSoftwareAppSchema(platform)),
      }}
    />
  );
}