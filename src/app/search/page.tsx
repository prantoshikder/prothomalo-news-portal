import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ListCard } from "@/components/ArticleCards";
import { getAllTags, searchArticles } from "@/lib/data";
import { toBn } from "@/lib/utils";

export const metadata: Metadata = { title: "খুঁজুন" };

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() ?? "";
  const results = searchArticles(q);

  return (
    <>
      <form action="/search" role="search" className="relative mt-6">
        <input
          name="q"
          type="search"
          defaultValue={q}
          autoFocus
          placeholder="শিরোনাম, বিষয় বা স্থান লিখুন..."
          aria-label="খবর খুঁজুন"
          className="w-full rounded-2xl border-2 border-line bg-surface py-4 pr-32 pl-5 text-lg shadow-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:brightness-110"
        >
          খুঁজুন
        </button>
      </form>

      {q ? (
        <p className="mt-6 text-muted" aria-live="polite">
          “<span className="font-semibold text-ink">{q}</span>” — {toBn(results.length)}টি ফল পাওয়া গেছে
        </p>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted">জনপ্রিয় বিষয়:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {getAllTags()
              .slice(0, 12)
              .map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-line px-3 py-1 text-sm transition hover:border-brand hover:text-brand"
                >
                  {t}
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="mt-2">
        {results.map((a) => (
          <ListCard key={a.id} article={a} />
        ))}
        {q && results.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            কোনো খবর পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।
          </div>
        )}
      </div>
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
