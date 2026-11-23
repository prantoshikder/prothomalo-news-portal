import Link from "next/link";
import { articleHref } from "@/lib/routes";
import { getLatest } from "@/lib/data";

export default function BreakingTicker() {
  const items = getLatest(8);
  const loop = [...items, ...items];
  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl items-stretch px-4">
        <span className="z-10 flex shrink-0 items-center gap-2 bg-brand px-3 py-2 text-sm font-bold text-white">
          <span className="live-dot size-1.5 rounded-full bg-white" />
          ব্রেকিং
        </span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
          <ul className="animate-ticker flex w-max items-center whitespace-nowrap">
            {loop.map((a, i) => (
              <li key={`${a.id}-${i}`} className="flex items-center" aria-hidden={i >= items.length}>
                <Link
                  href={articleHref(a.slug)}
                  tabIndex={i >= items.length ? -1 : undefined}
                  className="px-5 py-2 text-sm font-medium transition hover:text-brand"
                >
                  {a.title}
                </Link>
                <span className="size-1 rounded-full bg-gold" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
