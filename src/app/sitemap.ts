import type { MetadataRoute } from "next";
import { articles, categories, getArticlesByCategory, imageUrl } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = articles[0]?.publishedAt;
  return [
    { url: absoluteUrl("/"), lastModified: newest, changeFrequency: "hourly", priority: 1 },
    { url: absoluteUrl("/latest"), lastModified: newest, changeFrequency: "hourly", priority: 0.9 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/category/${c.slug}`),
      lastModified: getArticlesByCategory(c.slug, 1)[0]?.publishedAt,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/news/${a.slug}`),
      lastModified: a.publishedAt,
      changeFrequency: "daily" as const,
      priority: 0.7,
      images: [imageUrl(a.imageSeed)],
    })),
  ];
}
