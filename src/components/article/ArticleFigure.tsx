import NewsImage from "@/components/NewsImage";
import type { Article } from "@/lib/data";

/** Hero image with caption. Preloaded because it is the article's LCP element. */
export default function ArticleFigure({ article }: { article: Article }) {
  return (
    <figure className="mt-6">
      <NewsImage
        seed={article.imageSeed}
        alt={article.title}
        sizes="(min-width: 1024px) 800px, 100vw"
        preload
        isVideo={article.isVideo}
        className="rounded-2xl"
      />
      <figcaption className="mt-2 text-sm text-muted">{article.imageCaption}</figcaption>
    </figure>
  );
}
