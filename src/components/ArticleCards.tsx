import Link from "next/link";
import type { Article } from "@/lib/data";
import { cn, timeAgo, toBn } from "@/lib/utils";
import CategoryChip from "./CategoryChip";
import NewsImage from "./NewsImage";

const href = (a: Article) => `/news/${a.slug}`;

function Meta({ article, className }: { article: Article; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted", className)}>
      <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time>
      <span aria-hidden>•</span>
      <span>{toBn(article.readMinutes)} মিনিটে পড়ুন</span>
    </div>
  );
}

/** Big hero story — image on top (mobile) / overlay style on desktop. */
export function LeadCard({ article }: { article: Article }) {
  return (
    <article className="group relative">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 1024px) 640px, 100vw"
        priority
        isVideo={article.isVideo}
        ratio="video"
      />
      <div className="mt-4">
        <CategoryChip slug={article.category} />
        <h2 className="mt-2 font-serif text-2xl leading-snug font-bold md:text-[2rem] md:leading-tight">
          <Link href={href(article)} className="headline-link after:absolute after:inset-0">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">{article.excerpt}</p>
        <Meta article={article} className="mt-3" />
      </div>
    </article>
  );
}

/** Standard grid card with image. */
export function StoryCard({
  article,
  showExcerpt = false,
  showCategory = true,
}: {
  article: Article;
  showExcerpt?: boolean;
  showCategory?: boolean;
}) {
  return (
    <article className="group relative flex flex-col">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
        isVideo={article.isVideo}
      />
      <div className="mt-3 flex flex-1 flex-col">
        {showCategory && <CategoryChip slug={article.category} />}
        <h3 className="mt-1.5 font-serif text-lg leading-snug font-bold">
          <Link href={href(article)} className="headline-link after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        )}
        <Meta article={article} className="mt-auto pt-2" />
      </div>
    </article>
  );
}

/** Horizontal: thumbnail + headline. Used in lists & sidebars. */
export function CompactCard({
  article,
  reverse = false,
}: {
  article: Article;
  reverse?: boolean;
}) {
  return (
    <article className={cn("group relative flex gap-3", reverse && "flex-row-reverse")}>
      <div className="flex-1">
        <h3 className="font-serif text-[15px] leading-snug font-semibold md:text-base">
          <Link href={href(article)} className="headline-link after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <time dateTime={article.publishedAt} className="mt-1.5 block text-xs text-muted">
          {timeAgo(article.publishedAt)}
        </time>
      </div>
      <NewsImage
        seed={article.imageSeed}
        alt=""
        sizes="120px"
        isVideo={article.isVideo}
        className="w-24 shrink-0 rounded-lg sm:w-28"
      />
    </article>
  );
}

/** Wide horizontal card used on listing pages. */
export function ListCard({ article }: { article: Article }) {
  return (
    <article className="group relative grid gap-4 border-b border-line py-5 sm:grid-cols-[260px_1fr]">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 640px) 260px, 100vw"
        isVideo={article.isVideo}
      />
      <div>
        <CategoryChip slug={article.category} />
        <h3 className="mt-1.5 font-serif text-xl leading-snug font-bold">
          <Link href={href(article)} className="headline-link after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span className="font-medium text-ink">{article.author.name}</span>
          <span aria-hidden>•</span>
          <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}

/** Text-only headline, optional number. */
export function HeadlineItem({ article, index }: { article: Article; index?: number }) {
  return (
    <article className="group relative flex gap-3 py-3">
      {index !== undefined && (
        <span className="font-serif text-3xl leading-none font-bold text-line tabular-nums transition group-hover:text-brand">
          {toBn(index + 1)}
        </span>
      )}
      <div>
        <h3 className="font-serif text-[15px] leading-snug font-semibold">
          <Link href={href(article)} className="headline-link after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <time dateTime={article.publishedAt} className="mt-1 block text-xs text-muted">
          {timeAgo(article.publishedAt)}
        </time>
      </div>
    </article>
  );
}
