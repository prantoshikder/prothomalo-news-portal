import type { Metadata } from "next";
import { Suspense } from "react";
import ArticleList from "@/components/ArticleList";
import SearchForm from "@/components/search/SearchForm";
import TagList from "@/components/TagList";
import { getAllTags, searchArticles } from "@/lib/data";
import { toBn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

// Search result pages are thin/duplicate content — keep them out of the index but let crawlers follow links.
export const metadata: Metadata = pageMetadata({ title: "খুঁজুন", path: "/search", noindex: true });

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() ?? "";
  const results = searchArticles(q);

  return (
    <>
      <SearchForm defaultValue={q} autoFocus />

      {q ? (
        <p className="mt-6 text-muted" aria-live="polite">
          “<span className="font-semibold text-ink">{q}</span>” — {toBn(results.length)}টি ফল পাওয়া গেছে
        </p>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted">জনপ্রিয় বিষয়:</p>
          <TagList tags={getAllTags().slice(0, 12)} variant="outline" className="mt-2" />
        </div>
      )}

      <ArticleList
        items={results}
        empty={q ? "কোনো খবর পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।" : undefined}
        className="mt-2"
      />
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">খবর খুঁজুন</h1>
      <Suspense fallback={<div className="mt-6 h-16 animate-pulse rounded-2xl bg-line" />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
