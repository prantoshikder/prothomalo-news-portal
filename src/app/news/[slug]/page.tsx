import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import { StoryCard } from "@/components/ArticleCards";
import ArticleTools from "@/components/ArticleTools";
import NewsImage from "@/components/NewsImage";
import ReadingProgress from "@/components/ReadingProgress";
import SectionHeading from "@/components/SectionHeading";
import Sidebar from "@/components/Sidebar";
import {
  articles,
  avatarUrl,
  getArticle,
  getCategory,
  getRelated,
  imageUrl,
} from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatBnDate, toBn } from "@/lib/utils";

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
    path: `/news/${article.slug}`,
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
            { name: cat.name, path: `/category/${cat.slug}` },
            { name: article.title, path: `/news/${article.slug}` },
          ]),
        ]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <article>
          <nav aria-label="ব্রেডক্রাম্ব" className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand">প্রচ্ছদ</Link>
            <span>/</span>
            <Link href={`/category/${cat.slug}`} className="font-semibold" style={{ color: cat.color }}>
              {cat.name}
            </Link>
          </nav>

          <h1 className="mt-4 font-serif text-3xl leading-tight font-bold md:text-[2.6rem] md:leading-[1.25]">
            {article.title}
          </h1>
          <p className="mt-4 border-l-4 pl-4 text-lg leading-relaxed text-muted" style={{ borderColor: cat.color }}>
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
            <div className="flex items-center gap-3">
              <Image
                src={avatarUrl(article.author.avatarSeed)}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">{article.author.name}</div>
                <div className="text-muted">
                  {article.author.role} • <time dateTime={article.publishedAt}>{formatBnDate(article.publishedAt)}</time>
                  {" • "}
                  {toBn(article.readMinutes)} মিনিটে পড়ুন
                </div>
              </div>
            </div>
            <ArticleTools title={article.title} />
          </div>

          <figure className="mt-6">
            <NewsImage
              seed={article.imageSeed}
              alt={article.title}
              sizes="(min-width: 1024px) 800px, 100vw"
              preload
              isVideo={article.isVideo}
              className="rounded-2xl"
            />
            <figcaption className="mt-2 text-sm text-muted">{article.imageCaption}</figcaption>
          </figure>

          <div className="article-body mx-auto mt-8 max-w-[68ch]">
            {article.body.map((p, i) => (
              <p key={i}>
                {i === 0 && <strong className="font-semibold">{article.location}: </strong>}
                {p}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-[68ch] flex-wrap items-center gap-2 border-t border-line pt-6">
            <span className="text-sm font-semibold">বিষয়:</span>
            {article.tags.map((t) => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className="rounded-full bg-surface px-3 py-1 text-sm ring-1 ring-line transition hover:bg-brand hover:text-white hover:ring-brand"
              >
                {t}
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[68ch] rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-muted">
            ⓘ এটি একটি ডেমো প্রতিবেদন। নাম, ঘটনা ও উদ্ধৃতি কাল্পনিক — শুধু ডিজাইন প্রদর্শনের উদ্দেশ্যে তৈরি।
          </div>

          {related.length > 0 && (
            <section className="mt-12">
              <SectionHeading title="আরও পড়ুন" href={`/category/${cat.slug}`} color={cat.color} />
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((a) => (
                  <StoryCard key={a.id} article={a} />
                ))}
              </div>
            </section>
          )}
        </article>

        <Sidebar />
      </div>
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
