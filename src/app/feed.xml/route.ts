import { articles, getCategory, imageUrl, site } from "@/lib/data";
import { absoluteUrl, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { articleHref } from "@/lib/routes";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the latest 30 stories — used by feed readers and news aggregators. */
export function GET() {
  const items = articles
    .slice(0, 30)
    .map((a) => {
      const url = absoluteUrl(articleHref(a.slug));
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(a.excerpt)}</description>
      <category>${esc(getCategory(a.category)?.name ?? "")}</category>
      <dc:creator>${esc(a.author.name)}</dc:creator>
      <pubDate>${new Date(Date.parse(a.publishedAt)).toUTCString()}</pubDate>
      <enclosure url="${esc(imageUrl(a.imageSeed, 800, 450))}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} — সর্বশেষ খবর</title>
    <link>${absoluteUrl("/")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc(DEFAULT_DESCRIPTION)}</description>
    <language>bn</language>
    <lastBuildDate>${new Date(Date.parse(articles[0].publishedAt)).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
