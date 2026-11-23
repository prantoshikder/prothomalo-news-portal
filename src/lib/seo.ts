import type { Metadata } from "next";
import { type Article, type Category, getCategory, imageUrl, site } from "./data";
import { articleHref, categoryHref } from "@/lib/routes";

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const DEFAULT_DESCRIPTION =
  "নবকণ্ঠ — বাংলাদেশ, রাজনীতি, বিশ্ব, বাণিজ্য, খেলা, বিনোদন, প্রযুক্তি ও শিক্ষার সর্বশেষ খবর, বিশ্লেষণ ও মতামত।";

/** RSS discovery link — repeated per page because a page's `alternates` replaces the root one. */
export const RSS_ALTERNATE = {
  "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — সর্বশেষ খবর` }],
};

/** Shared metadata builder so every page gets canonical + OG + Twitter consistently. */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  images,
  noindex,
}: {
  title?: string;
  description?: string;
  path: string;
  images?: string[];
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: RSS_ALTERNATE },
    openGraph: {
      title: title ?? undefined,
      description,
      url: path,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description,
      ...(images ? { images } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------ JSON-LD ------------------------------ */

const publisher = {
  "@type": "NewsMediaOrganization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  alternateName: site.english,
  url: absoluteUrl("/"),
  logo: { "@type": "ImageObject", url: absoluteUrl("/apple-icon.png"), width: 180, height: 180 },
};

export function websiteJsonLd() {
  return [
    publisher,
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: site.name,
      url: absoluteUrl("/"),
      inLanguage: "bn",
      publisher: { "@id": publisher["@id"] },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function articleJsonLd(article: Article) {
  const cat = getCategory(article.category);
  const url = absoluteUrl(articleHref(article.slug));
  return {
    "@type": article.category === "opinion" ? "OpinionNewsArticle" : "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.excerpt,
    image: [imageUrl(article.imageSeed, 1200, 675), imageUrl(article.imageSeed, 1200, 900), imageUrl(article.imageSeed, 1200, 1200)],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{ "@type": "Person", name: article.author.name, jobTitle: article.author.role }],
    publisher: { "@id": publisher["@id"] },
    articleSection: cat?.name,
    keywords: article.tags.join(", "),
    contentLocation: { "@type": "Place", name: article.location },
    inLanguage: "bn",
    isAccessibleForFree: true,
  };
}

export function collectionJsonLd(category: Category, articles: Article[]) {
  return {
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: absoluteUrl(categoryHref(category.slug)),
    inLanguage: "bn",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(articleHref(a.slug)),
        name: a.title,
      })),
    },
  };
}
