import {
  CompactCard,
  HeadlineItem,
  LeadCard,
  StoryCard,
} from "@/components/ArticleCards";
import CategoryChip from "@/components/CategoryChip";
import LatestTabs from "@/components/LatestTabs";
import NewsImage from "@/components/NewsImage";
import SectionHeading from "@/components/SectionHeading";
import {
  articles,
  avatarUrl,
  getArticlesByCategory,
  getCategory,
  getLatest,
  getMostRead,
  getVideos,
  type Article,
  type CategorySlug,
} from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const catHref = (slug: CategorySlug) => `/category/${slug}`;

/** 1 image story + text headlines — the classic newspaper category column. */
function CategoryColumn({ slug }: { slug: CategorySlug }) {
  const cat = getCategory(slug)!;
  const [first, ...rest] = getArticlesByCategory(slug, 4);
  return (
    <section>
      <SectionHeading title={cat.name} href={catHref(slug)} color={cat.color} />
      <StoryCard article={first} showExcerpt showCategory={false} />
      <div className="mt-2 divide-y divide-line">
        {rest.map((a) => (
          <HeadlineItem key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

function OpinionBand({ items }: { items: Article[] }) {
  return (
    <section className="bg-[#f3ede3] py-12 dark:bg-[#121922]">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="মতামত"
          href={catHref("opinion")}
          color="#7c3aed"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a) => (
            <article
              key={a.id}
              className="group relative flex flex-col rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-8 text-[#7c3aed]/40"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
              </svg>
              <h3 className="mt-2 font-serif text-lg leading-snug font-bold">
                <Link
                  href={`/news/${a.slug}`}
                  className="headline-link after:absolute after:inset-0"
                >
                  {a.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {a.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-5">
                <Image
                  src={avatarUrl(a.author.avatarSeed)}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover ring-2 ring-[#7c3aed]/20 grayscale transition group-hover:grayscale-0"
                />
                <div className="text-sm leading-tight">
                  <div className="font-semibold">{a.author.name}</div>
                  <div className="mt-0.5 text-xs text-muted">
                    {a.author.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoBand({ items }: { items: Article[] }) {
  const [main, ...rest] = items;
  if (!main) return null;
  return (
    <section className="bg-[#0f1722] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold">
            <span className="grid size-9 place-items-center rounded-full bg-brand">
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            ভিডিও গল্প
          </h2>
          <span className="text-sm text-slate-400">
            দেখুন, জানুন, শেয়ার করুন
          </span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <article className="group relative">
            <NewsImage
              seed={main.imageSeed}
              alt={main.title}
              sizes="(min-width:1024px) 720px, 100vw"
              isVideo
              className="rounded-2xl"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                {getCategory(main.category)?.name}
              </span>
              <h3 className="mt-2 max-w-2xl font-serif text-xl leading-snug font-bold md:text-3xl">
                <Link
                  href={`/news/${main.slug}`}
                  className="after:absolute after:inset-0 hover:underline"
                >
                  {main.title}
                </Link>
              </h3>
            </div>
          </article>
          <div className="grid content-start gap-5">
            {rest.map((a) => (
              <article
                key={a.id}
                className="group relative grid grid-cols-[140px_1fr] gap-4"
              >
                <NewsImage
                  seed={a.imageSeed}
                  alt=""
                  sizes="140px"
                  isVideo
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-serif leading-snug font-semibold">
                    <Link
                      href={`/news/${a.slug}`}
                      className="after:absolute after:inset-0 group-hover:text-gold"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <time
                    className="mt-1 block text-xs text-slate-400"
                    dateTime={a.publishedAt}
                  >
                    {timeAgo(a.publishedAt)}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SportsSection({ items }: { items: Article[] }) {
  const [main, ...rest] = items;
  const cat = getCategory("sports")!;
  return (
    <section className="py-10">
      <SectionHeading
        title={cat.name}
        href={catHref("sports")}
        color={cat.color}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="group relative overflow-hidden rounded-2xl">
          <NewsImage
            seed={main.imageSeed}
            alt={main.title}
            sizes="(min-width:1024px) 620px, 100vw"
            ratio="video"
            className="rounded-2xl"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
            <h3 className="font-serif text-xl leading-snug font-bold md:text-2xl">
              <Link
                href={`/news/${main.slug}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                {main.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {main.excerpt}
            </p>
          </div>
        </article>
        <div className="grid content-start gap-5">
          {rest.map((a) => (
            <CompactCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Four category mini-columns side by side. */
function MiniColumns({ slugs }: { slugs: CategorySlug[] }) {
  return (
    <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {slugs.map((slug) => {
        const cat = getCategory(slug)!;
        const [first, ...rest] = getArticlesByCategory(slug, 3);
        return (
          <section key={slug}>
            <SectionHeading
              title={cat.name}
              href={catHref(slug)}
              color={cat.color}
            />
            <StoryCard article={first} showCategory={false} />
            <div className="mt-3 divide-y divide-line border-t border-line">
              {rest.map((a) => (
                <HeadlineItem key={a.id} article={a} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function Home() {
  const news = articles.filter((a) => a.category !== "opinion");
  const [lead, second, third, ...more] = news;
  const underLead = more.slice(0, 3);
  const topRow = more.slice(3, 7);

  return (
    <>
      <h1 className="sr-only">নবকণ্ঠ — আজকের প্রধান খবর</h1>
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== Top stories ===== */}
        <section
          aria-label="প্রধান খবর"
          className="grid gap-8 py-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <LeadCard article={lead} />
            <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-3">
              {underLead.map((a) => (
                <article key={a.id} className="group relative">
                  <CategoryChip slug={a.category} />
                  <h3 className="mt-1 font-serif text-[15px] leading-snug font-semibold">
                    <Link
                      href={`/news/${a.slug}`}
                      className="headline-link after:absolute after:inset-0"
                    >
                      {a.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3 lg:border-x lg:border-line lg:px-6">
            <StoryCard article={second} showExcerpt />
            <div className="h-px bg-line" />
            <StoryCard article={third} showExcerpt />
          </div>

          <div className="lg:col-span-3">
            <LatestTabs latest={getLatest(10)} popular={getMostRead(10)} />
          </div>
        </section>

        {/* ===== More top news ===== */}
        <section
          aria-label="আরও খবর"
          className="grid gap-6 border-t border-line py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {topRow.map((a) => (
            <StoryCard key={a.id} article={a} />
          ))}
        </section>

        {/* ===== Bangladesh / Politics / World ===== */}
        <div className="grid gap-10 border-t border-line py-10 md:grid-cols-2 lg:grid-cols-3">
          <CategoryColumn slug="bangladesh" />
          <CategoryColumn slug="politics" />
          <div className="md:col-span-2 lg:col-span-1">
            <CategoryColumn slug="world" />
          </div>
        </div>
      </div>

      <OpinionBand items={getArticlesByCategory("opinion", 4)} />

      <div className="mx-auto max-w-7xl px-4">
        <SportsSection items={getArticlesByCategory("sports")} />
      </div>

      <VideoBand items={getVideos()} />

      <div className="mx-auto max-w-7xl px-4">
        <MiniColumns
          slugs={["business", "entertainment", "technology", "lifestyle"]}
        />

        {/* Education strip */}
        <section className="border-t border-line py-10">
          <SectionHeading
            title="শিক্ষা"
            href={catHref("education")}
            color={getCategory("education")!.color}
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {getArticlesByCategory("education").map((a) => (
              <StoryCard
                key={a.id}
                article={a}
                showExcerpt
                showCategory={false}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
