import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleByline from "@/components/article/ArticleByline";
import ArticleFigure from "@/components/article/ArticleFigure";
import ArticleFooter from "@/components/article/ArticleFooter";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleGrid from "@/components/ArticleGrid";
import JsonLd from "@/components/JsonLd";
import PageSkeleton from "@/components/PageSkeleton";
import PageWithSidebar from "@/components/PageWithSidebar";
import ReadingProgress from "@/components/ReadingProgress";
import { CategoryHeading } from "@/components/SectionHeading";
import { articles, getArticle, getCategory, getRelated, imageUrl } from "@/lib/data";
import { articleHref, categoryHref } from "@/lib/routes";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "খবর পাওয়া যায়নি", robots: { index: false } };
  const cat = getCategory(article.category);
  const base = pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: articleHref(article.slug),
    images: [imageUrl(article.imageSeed, 1200, 630)],
  });
  return {
    ...base,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    category: cat?.name,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      section: cat?.name,
      tags: article.tags,
      authors: [article.author.name],
    },
  };
}

async function ArticlePageContent({ params }: Pick<PageProps<"/news/[slug]">, "params">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cat = getCategory(article.category)!;
  const related = getRelated(article, 3);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "প্রচ্ছদ", path: "/" },
            { name: cat.name, path: categoryHref(cat.slug) },
            { name: article.title, path: articleHref(article.slug) },
          ]),
        ]}
      />
      <PageWithSidebar className="py-8">
        <article>
          <ArticleHeader article={article} category={cat} />
          <ArticleByline article={article} />
          <ArticleFigure article={article} />
          <ArticleBody article={article} />
          <ArticleFooter article={article} />
          <ArticleGrid
            items={related}
            heading={<CategoryHeading slug={cat.slug} title="আরও পড়ুন" />}
            className="mt-12"
          />
        </article>
      </PageWithSidebar>
    </>
  );
}

export default function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <ArticlePageContent params={params} />
    </Suspense>
  );
}
