import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import { ListCard, StoryCard } from "@/components/ArticleCards";
import Sidebar from "@/components/Sidebar";
import { categories, getArticlesByCategory, getCategory } from "@/lib/data";
import { toBn } from "@/lib/utils";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "বিভাগ পাওয়া যায়নি" };
  return { title: `${cat.name} — সর্বশেষ খবর`, description: cat.description };
}

async function CategoryPageContent({ params }: Pick<PageProps<"/category/[slug]">, "params">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = getArticlesByCategory(cat.slug);
  const [featured, ...rest] = list;

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-surface">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ background: `radial-gradient(circle at 85% 20%, ${cat.color}, transparent 55%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <nav aria-label="ব্রেডক্রাম্ব" className="text-sm text-muted">
            <Link href="/" className="hover:text-brand">প্রচ্ছদ</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{cat.name}</span>
          </nav>
          <h1 className="mt-3 flex items-center gap-3 font-serif text-4xl font-bold md:text-5xl">
            <span className="h-10 w-1.5 rounded-full" style={{ background: cat.color }} />
            {cat.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>
          <p className="mt-2 text-sm text-muted">মোট {toBn(list.length)}টি প্রতিবেদন</p>
        </div>
        <div className="relative mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              aria-current={c.slug === cat.slug ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                c.slug === cat.slug
                  ? "border-transparent text-white"
                  : "border-line hover:border-brand hover:text-brand"
              }`}
              style={c.slug === cat.slug ? { background: c.color } : undefined}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_340px]">
        <div>
          {featured && (
            <div className="border-b border-line pb-6">
              <StoryCard article={featured} showExcerpt showCategory={false} />
            </div>
          )}
          {rest.map((a) => (
            <ListCard key={a.id} article={a} />
          ))}
          {list.length === 0 && <p className="text-muted">এই বিভাগে এখনো কোনো খবর নেই।</p>}
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="category" />}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}
