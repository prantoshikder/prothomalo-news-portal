import { ChipHeadline, LeadCard, StoryCard } from "@/components/ArticleCards";
import LatestTabs from "@/components/LatestTabs";
import { getLatest, getMostRead, toSummary, type Article } from "@/lib/data";

/** Above-the-fold block: lead story + two secondary stories + latest/popular tabs. */
export default function TopStories({
  lead,
  secondary,
  underLead,
}: {
  lead: Article;
  secondary: Article[];
  underLead: Article[];
}) {
  return (
    <section aria-label="প্রধান খবর" className="grid gap-8 py-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <LeadCard article={lead} />
        <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-3">
          {underLead.map((a) => (
            <ChipHeadline key={a.id} article={a} />
          ))}
        </div>
      </div>

      <div className="space-y-6 lg:col-span-3 lg:border-x lg:border-line lg:px-6">
        {secondary.map((a, i) => (
          <div key={a.id} className="space-y-6">
            {i > 0 && <div className="h-px bg-line" />}
            <StoryCard article={a} showExcerpt />
          </div>
        ))}
      </div>

      <div className="lg:col-span-3">
        <LatestTabs latest={getLatest(10).map(toSummary)} popular={getMostRead(10).map(toSummary)} />
      </div>
    </section>
  );
}
