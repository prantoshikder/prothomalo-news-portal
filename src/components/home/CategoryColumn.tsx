import { HeadlineItem, StoryCard } from "@/components/ArticleCards";
import { CategoryHeading } from "@/components/SectionHeading";
import { getArticlesByCategory, type CategorySlug } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Classic newspaper column: one image story followed by text headlines. */
export default function CategoryColumn({
  slug,
  limit = 4,
  excludeIds,
  compact = false,
}: {
  slug: CategorySlug;
  limit?: number;
  excludeIds?: readonly number[];
  /** Smaller variant: no excerpt on the image story, ruled headline list. */
  compact?: boolean;
}) {
  const [first, ...rest] = getArticlesByCategory(slug, limit, excludeIds);
  if (!first) return null;
  return (
    <section>
      <CategoryHeading slug={slug} />
      <StoryCard article={first} showExcerpt={!compact} showCategory={false} />
      <div className={cn("divide-y divide-line", compact ? "mt-3 border-t border-line" : "mt-2")}>
        {rest.map((a) => (
          <HeadlineItem key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
