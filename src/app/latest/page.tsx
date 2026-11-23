import type { Metadata } from "next";
import { ListCard } from "@/components/ArticleCards";
import Sidebar from "@/components/Sidebar";
import { articles } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "সর্বশেষ খবর",
  description: "নবকণ্ঠের সব বিভাগের সর্বশেষ খবর, সময় অনুযায়ী সাজানো — বাংলাদেশ, রাজনীতি, বিশ্ব, বাণিজ্য, খেলা ও বিনোদন।",
  path: "/latest",
});

export default function LatestPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_340px]">
      <div>
        <h1 className="flex items-center gap-3 font-serif text-4xl font-bold">
          <span className="live-dot size-3 rounded-full bg-brand" />
          সর্বশেষ
        </h1>
        <p className="mt-2 text-muted">সব বিভাগের খবর, সময় অনুযায়ী সাজানো।</p>
        <div className="mt-4">
          {articles.map((a, i) => (
            <ListCard key={a.id} article={a} preload={i === 0} />
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
