import Link from "next/link";
import { categories } from "@/lib/data";
import { categoryHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Horizontally scrollable pill links to every category, highlighting the active one. */
export default function CategoryNav({ active, className }: { active?: string; className?: string }) {
  return (
    <div className={cn("relative mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 no-scrollbar", className)}>
      {categories.map((c) => {
        const isActive = c.slug === active;
        return (
          <Link
            key={c.slug}
            href={categoryHref(c.slug)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition",
              isActive ? "border-transparent text-white" : "border-line hover:border-brand hover:text-brand",
            )}
            style={isActive ? { background: c.color } : undefined}
          >
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
