import Link from "next/link";
import type { CSSProperties } from "react";
import { getCategory, type Article, type ArticleSummary } from "@/lib/data";
import { articleHref } from "@/lib/routes";
import { cn, timeAgo, toBn } from "@/lib/utils";
import AuthorInfo from "./AuthorInfo";
import CategoryChip from "./CategoryChip";
import NewsImage from "./NewsImage";

const href = (a: ArticleSummary) => articleHref(a.slug);

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
        preload
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
  preload = false,
}: {
  article: Article;
  showExcerpt?: boolean;
  showCategory?: boolean;
  /** Set on the first above-the-fold card so it becomes the LCP image. */
  preload?: boolean;
}) {
  return (
    <article className="group relative flex flex-col">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
        preload={preload}
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
export function ListCard({ article, preload = false }: { article: Article; preload?: boolean }) {
  return (
    <article className="group relative grid gap-4 border-b border-line py-5 sm:grid-cols-[260px_1fr]">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 640px) 260px, 100vw"
        preload={preload}
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
export function HeadlineItem({ article, index }: { article: ArticleSummary; index?: number }) {
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

/** Category chip + headline, no image or time. Used under the lead story. */
export function ChipHeadline({ article }: { article: Article }) {
  return (
    <article className="group relative">
      <CategoryChip slug={article.category} />
      <h3 className="mt-1 font-serif text-[15px] leading-snug font-semibold">
        <Link href={href(article)} className="headline-link after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
    </article>
  );
}

/** Image with the headline laid over a dark gradient. */
export function OverlayCard({
  article,
  sizes,
  size = "md",
  showCategory = false,
  showExcerpt = false,
  isVideo = false,
}: {
  article: Article;
  sizes: string;
  size?: "md" | "lg";
  /** Small gold category label above the title. */
  showCategory?: boolean;
  showExcerpt?: boolean;
  isVideo?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes={sizes}
        isVideo={isVideo}
        className="rounded-2xl"
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/90 via-black/15 to-transparent" />
      <div className={cn("absolute inset-x-0 bottom-0 text-white", size === "lg" ? "p-5 md:p-7" : "p-5 md:p-6")}>
        {showCategory && (
          <span className="text-xs font-semibold tracking-widest text-gold uppercase">
            {getCategory(article.category)?.name}
          </span>
        )}
        <h3
          className={cn(
            "font-serif leading-snug font-bold",
            size === "lg" ? "mt-2 max-w-2xl text-xl md:text-3xl" : "text-xl md:text-2xl",
          )}
        >
          <Link href={href(article)} className="after:absolute after:inset-0 hover:underline">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && <p className="mt-2 line-clamp-2 text-sm text-white/80">{article.excerpt}</p>}
      </div>
    </article>
  );
}

/** Small thumbnail on the left, headline + time on the right. Styled for dark bands. */
export function MediaListItem({ article }: { article: Article }) {
  return (
    <article className="group relative grid grid-cols-[140px_1fr] gap-4">
      <NewsImage seed={article.imageSeed} alt="" sizes="140px" isVideo={article.isVideo} className="rounded-lg" />
      <div>
        <h3 className="font-serif leading-snug font-semibold">
          <Link href={href(article)} className="after:absolute after:inset-0 group-hover:text-gold">
            {article.title}
          </Link>
        </h3>
        <time className="mt-1 block text-xs text-slate-400" dateTime={article.publishedAt}>
          {timeAgo(article.publishedAt)}
        </time>
      </div>
    </article>
  );
}

/** Quote-mark card with author avatar, for opinion pieces. */
export function OpinionCard({ article, accent = "#7c3aed" }: { article: Article; accent?: string }) {
  return (
    <article className="group relative flex flex-col rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-md">
      <svg viewBox="0 0 24 24" className="size-8 opacity-40" style={{ color: accent }} fill="currentColor" aria-hidden>
        <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
      </svg>
      <h3 className="mt-2 font-serif text-lg leading-snug font-bold">
        <Link href={href(article)} className="headline-link after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      <AuthorInfo
        author={article.author}
        className="mt-auto pt-5"
        avatarClassName="ring-2 grayscale transition group-hover:grayscale-0"
        avatarStyle={{ "--tw-ring-color": `${accent}33` } as CSSProperties}
      />
    </article>
  );
}
