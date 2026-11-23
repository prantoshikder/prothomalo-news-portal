"use client";

import { useState } from "react";
import type { ArticleSummary } from "@/lib/data";
import { HeadlineItem } from "./ArticleCards";

export default function LatestTabs({
  latest,
  popular,
}: {
  latest: ArticleSummary[];
  popular: ArticleSummary[];
}) {
  const [tab, setTab] = useState<"latest" | "popular">("latest");
  const list = tab === "latest" ? latest : popular;

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
      <div role="tablist" aria-label="খবরের তালিকা" className="grid grid-cols-2 gap-1 rounded-xl bg-paper p-1">
        {(
          [
            ["latest", "সর্বশেষ"],
            ["popular", "সর্বাধিক পঠিত"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            id={`tab-${key}`}
            onClick={() => setTab(key)}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              tab === key ? "bg-surface text-brand shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-2 max-h-[560px] divide-y divide-line overflow-y-auto pr-1"
      >
        {list.map((a, i) => (
          <HeadlineItem key={a.id} article={a} index={tab === "popular" ? i : undefined} />
        ))}
      </div>
    </div>
  );
}
