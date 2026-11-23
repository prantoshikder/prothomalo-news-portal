import Link from "next/link";
import { searchHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Outline pill that fills with brand colour on hover (sidebar). */
  solid: "border border-line hover:border-brand hover:bg-brand hover:text-white",
  /** Outline pill that only tints on hover (search page). */
  outline: "border border-line hover:border-brand hover:text-brand",
  /** Filled surface pill (article footer). */
  soft: "bg-surface ring-1 ring-line hover:bg-brand hover:text-white hover:ring-brand",
};

/** Row of tag links that each open a search for that tag. */
export default function TagList({
  tags,
  variant = "solid",
  hashPrefix = false,
  className,
}: {
  tags: string[];
  variant?: keyof typeof VARIANTS;
  hashPrefix?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((t) => (
        <Link
          key={t}
          href={searchHref(t)}
          className={cn("rounded-full px-3 py-1 text-sm transition", VARIANTS[variant])}
        >
          {hashPrefix && "#"}
          {t}
        </Link>
      ))}
    </div>
  );
}
