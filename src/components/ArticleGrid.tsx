import type { ReactNode } from "react";
import type { Article } from "@/lib/data";
import { cn } from "@/lib/utils";
import { StoryCard } from "./ArticleCards";

const COLS = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Optional heading + responsive grid of StoryCards. */
export default function ArticleGrid({
  items,
  heading,
  cols = 3,
  showExcerpt = false,
  showCategory = true,
  className,
  "aria-label": ariaLabel,
}: {
  items: Article[];
  heading?: ReactNode;
  cols?: keyof typeof COLS;
  showExcerpt?: boolean;
  showCategory?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-label={ariaLabel} className={className}>
      {heading}
      <div className={cn("grid gap-6", COLS[cols])}>
        {items.map((a) => (
          <StoryCard key={a.id} article={a} showExcerpt={showExcerpt} showCategory={showCategory} />
        ))}
      </div>
    </section>
  );
}
