/* =========================================
   TYPES
========================================= */

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

/* =========================================
   WEBSITE SCHEMA
========================================= */

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SaveAllHD",
    url: "https://saveallhd.com",
  };
}

/* =========================================
   WEB APP SCHEMA
========================================= */

export function buildWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SaveAllHD",
    url: "https://saveallhd.com",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
  };
}

/* =========================================
   ORGANIZATION SCHEMA
========================================= */

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SaveAllHD",
    url: "https://saveallhd.com",
    logo: "https://saveallhd.com/logo.png",
  };
}

/* =========================================
   FAQ SCHEMA
========================================= */

export function buildFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* =========================================
   BREADCRUMB SCHEMA
========================================= */

export function buildBreadcrumbSchema(
  items: BreadcrumbEntry[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* =========================================
   SOFTWARE APPLICATION SCHEMA
========================================= */

export function buildSoftwareAppSchema(platform: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SaveAllHD Downloader",
    operatingSystem: "All",
    applicationCategory: "MultimediaApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    platform,
  };
}