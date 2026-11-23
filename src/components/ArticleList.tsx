import type { ReactNode } from "react";
import type { Article } from "@/lib/data";
import { ListCard } from "./ArticleCards";
import EmptyState from "./EmptyState";

/** Vertical list of ListCards. The first image is preloaded since it is usually above the fold. */
export default function ArticleList({
  items,
  empty,
  preloadFirst = true,
  className,
}: {
  items: Article[];
  /** Shown when `items` is empty. Omit to render nothing. */
  empty?: ReactNode;
  preloadFirst?: boolean;
  className?: string;
}) {
  if (items.length === 0) return empty ? <EmptyState>{empty}</EmptyState> : null;
  return (
    <div className={className}>
      {items.map((a, i) => (
        <ListCard key={a.id} article={a} preload={preloadFirst && i === 0} />
      ))}
    </div>
  );
}
