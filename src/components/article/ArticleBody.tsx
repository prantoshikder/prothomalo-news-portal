import type { Article } from "@/lib/data";

/** Article paragraphs; the first one starts with the dateline location. */
export default function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="article-body mx-auto mt-8 max-w-[68ch]">
      {article.body.map((p, i) => (
        <p key={i}>
          {i === 0 && <strong className="font-semibold">{article.location}: </strong>}
          {p}
        </p>
      ))}
    </div>
  );
}
