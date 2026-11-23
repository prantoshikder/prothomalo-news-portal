import { CompactCard, OverlayCard } from "@/components/ArticleCards";
import { CategoryHeading } from "@/components/SectionHeading";
import { getArticlesByCategory, type CategorySlug } from "@/lib/data";

/** Category section with one large overlay story and a list of compact cards beside it. */
export default function FeatureSection({
  slug,
  limit,
  excludeIds,
}: {
  slug: CategorySlug;
  limit?: number;
  excludeIds?: readonly number[];
}) {
  const [main, ...rest] = getArticlesByCategory(slug, limit, excludeIds);
  if (!main) return null;
  return (
    <section className="py-10">
      <CategoryHeading slug={slug} />
      <div className="grid gap-6 lg:grid-cols-2">
        <OverlayCard article={main} sizes="(min-width:1024px) 620px, 100vw" showExcerpt isVideo={main.isVideo} />
        <div className="grid content-start gap-5">
          {rest.map((a) => (
            <CompactCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
