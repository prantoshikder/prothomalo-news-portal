import Link from "next/link";
import { getAllTags, getLatest, getMostRead } from "@/lib/data";
import LatestTabs from "./LatestTabs";

export default function Sidebar({ sticky = true }: { sticky?: boolean }) {
  return (
    <aside className={sticky ? "space-y-6 lg:sticky lg:top-16" : "space-y-6"}>
      <LatestTabs latest={getLatest(10)} popular={getMostRead(10)} />

      <div className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-serif text-lg font-bold">আলোচিত বিষয়</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {getAllTags()
            .slice(0, 14)
            .map((t) => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className="rounded-full border border-line px-3 py-1 text-sm transition hover:border-brand hover:bg-brand hover:text-white"
              >
                #{t}
              </Link>
            ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink to-[#1c4a7d] p-5 text-white dark:from-[#16263a] dark:to-[#1c3352]">
        <p className="text-xs font-semibold tracking-widest text-gold uppercase">বাজারদর আজ</p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            ["ডলার (আন্তঃব্যাংক)", "১২২.৫০", "+০.১০"],
            ["সোনা (২২ ক্যারেট/ভরি)", "১,৪২,৩০০", "-৮০০"],
            ["ডিএসইএক্স", "৫,৮৪২", "+৩১"],
            ["চাল (মোটা/কেজি)", "৫২", "০"],
          ].map(([k, v, d]) => (
            <li key={k} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 last:border-0">
              <span className="text-white/80">{k}</span>
              <span className="font-semibold tabular-nums">
                {v}{" "}
                <span className={d.startsWith("-") ? "text-red-300" : d.startsWith("+") ? "text-emerald-300" : "text-white/50"}>
                  {d}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
