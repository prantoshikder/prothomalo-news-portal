import ArticleGrid from "@/components/ArticleGrid";
import Container from "@/components/Container";
import CategoryColumn from "@/components/home/CategoryColumn";
import FeatureSection from "@/components/home/FeatureSection";
import OpinionBand from "@/components/home/OpinionBand";
import TopStories from "@/components/home/TopStories";
import VideoBand from "@/components/home/VideoBand";
import JsonLd from "@/components/JsonLd";
import { CategoryHeading } from "@/components/SectionHeading";
import { articles, getArticlesByCategory, getVideos, type CategorySlug } from "@/lib/data";
import { categoryHref } from "@/lib/routes";
import { websiteJsonLd } from "@/lib/seo";

const MINI_COLUMNS: CategorySlug[] = ["business", "entertainment", "technology", "lifestyle"];

export default function Home() {
  const news = articles.filter((a) => a.category !== "opinion");
  const [lead, second, third, ...more] = news;
  // The lead image is preloaded; repeating it lower down would duplicate the story.
  const exclude = [lead.id];

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <h1 className="sr-only">নবকণ্ঠ — আজকের প্রধান খবর</h1>

      <Container>
        <TopStories lead={lead} secondary={[second, third]} underLead={more.slice(0, 3)} />

        <ArticleGrid
          aria-label="আরও খবর"
          items={more.slice(3, 7)}
          cols={4}
          className="border-t border-line py-8"
        />

        <div className="grid gap-10 border-t border-line py-10 md:grid-cols-2 lg:grid-cols-3">
          <CategoryColumn slug="bangladesh" excludeIds={exclude} />
          <CategoryColumn slug="politics" excludeIds={exclude} />
          <div className="md:col-span-2 lg:col-span-1">
            <CategoryColumn slug="world" excludeIds={exclude} />
          </div>
        </div>
      </Container>

      <OpinionBand title="মতামত" href={categoryHref("opinion")} items={getArticlesByCategory("opinion", 4)} />

      <Container>
        <FeatureSection slug="sports" excludeIds={exclude} />
      </Container>

      <VideoBand items={getVideos(exclude)} />

      <Container>
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {MINI_COLUMNS.map((slug) => (
            <CategoryColumn key={slug} slug={slug} limit={3} excludeIds={exclude} compact />
          ))}
        </div>

        <ArticleGrid
          heading={<CategoryHeading slug="education" />}
          items={getArticlesByCategory("education", undefined, exclude)}
          showExcerpt
          showCategory={false}
          className="border-t border-line py-10"
        />
      </Container>
    </>
  );
}
