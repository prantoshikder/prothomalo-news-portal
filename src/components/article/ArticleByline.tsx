import ArticleTools from "@/components/ArticleTools";
import AuthorInfo from "@/components/AuthorInfo";
import type { Article } from "@/lib/data";
import { formatBnDate, toBn } from "@/lib/utils";

/** Author, publish date, reading time and share tools. */
export default function ArticleByline({ article }: { article: Article }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
      <AuthorInfo
        author={article.author}
        size={48}
        meta={
          <>
            {article.author.role} • <time dateTime={article.publishedAt}>{formatBnDate(article.publishedAt)}</time>
            {" • "}
            {toBn(article.readMinutes)} মিনিটে পড়ুন
          </>
        }
      />
      <ArticleTools title={article.title} />
    </div>
  );
}
