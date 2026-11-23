import TagList from "@/components/TagList";
import type { Article } from "@/lib/data";

/** Topic tags and the demo-content notice below the article body. */
export default function ArticleFooter({ article }: { article: Article }) {
  return (
    <>
      <div className="mx-auto mt-8 flex max-w-[68ch] flex-wrap items-center gap-2 border-t border-line pt-6">
        <span className="text-sm font-semibold">বিষয়:</span>
        <TagList tags={article.tags} variant="soft" />
      </div>
      <div className="mx-auto mt-8 max-w-[68ch] rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-muted">
        ⓘ এটি একটি ডেমো প্রতিবেদন। নাম, ঘটনা ও উদ্ধৃতি কাল্পনিক — শুধু ডিজাইন প্রদর্শনের উদ্দেশ্যে তৈরি।
      </div>
    </>
  );
}
