import type { Metadata } from "next";
import ArticleList from "@/components/ArticleList";
import PageWithSidebar from "@/components/PageWithSidebar";
import { articles } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "সর্বশেষ খবর",
  description: "নবকণ্ঠের সব বিভাগের সর্বশেষ খবর, সময় অনুযায়ী সাজানো — বাংলাদেশ, রাজনীতি, বিশ্ব, বাণিজ্য, খেলা ও বিনোদন।",
  path: "/latest",
});

export default function LatestPage() {
  return (
    <PageWithSidebar>
      <h1 className="flex items-center gap-3 font-serif text-4xl font-bold">
        <span className="live-dot size-3 rounded-full bg-brand" />
        সর্বশেষ
      </h1>
      <p className="mt-2 text-muted">সব বিভাগের খবর, সময় অনুযায়ী সাজানো।</p>
      <ArticleList items={articles} className="mt-4" />
    </PageWithSidebar>
  );
}
