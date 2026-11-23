import type { MetadataRoute } from "next";
import { articles, categories, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/latest`, priority: 0.9 },
    ...categories.map((c) => ({ url: `${site.url}/category/${c.slug}`, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${site.url}/news/${a.slug}`, lastModified: a.publishedAt, priority: 0.6 })),
  ];
}
