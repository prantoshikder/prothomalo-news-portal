import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StoryCard } from "@/components/ArticleCards";
import ArticleList from "@/components/ArticleList";
import CategoryHero from "@/components/category/CategoryHero";
import EmptyState from "@/components/EmptyState";
import JsonLd from "@/components/JsonLd";
import PageSkeleton from "@/components/PageSkeleton";
import PageWithSidebar from "@/components/PageWithSidebar";
import { categories, getArticlesByCategory, getCategory } from "@/lib/data";
import { categoryHref } from "@/lib/routes";
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "বিভাগ পাওয়া যায়নি", robots: { index: false } };
  return pageMetadata({
    title: `${cat.name} — সর্বশেষ খবর`,
    description: `${cat.name}: ${cat.description} নবকণ্ঠে পড়ুন ${cat.name} বিভাগের সর্বশেষ সংবাদ ও বিশ্লেষণ।`,
    path: categoryHref(cat.slug),
  });
}

async function CategoryPageContent({ params }: Pick<PageProps<"/category/[slug]">, "params">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = getArticlesByCategory(cat.slug);
  const [featured, ...rest] = list;

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd(cat, list),
          breadcrumbJsonLd([
            { name: "প্রচ্ছদ", path: "/" },
            { name: cat.name, path: categoryHref(cat.slug) },
          ]),
        ]}
      />
      <CategoryHero category={cat} count={list.length} />
      <PageWithSidebar>
        {featured ? (
          <>
            <div className="border-b border-line pb-6">
              <StoryCard article={featured} showExcerpt showCategory={false} preload />
            </div>
            <ArticleList items={rest} preloadFirst={false} />
          </>
        ) : (
          <EmptyState>এই বিভাগে এখনো কোনো খবর নেই।</EmptyState>
        )}
      </PageWithSidebar>
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
