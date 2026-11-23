import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href?: string; color?: string };

/** Breadcrumb trail. The last crumb without `href` renders as plain text. */
export default function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="ব্রেডক্রাম্ব" className={cn("flex items-center gap-2 text-sm text-muted", className)}>
      {items.map((c, i) => (
        <Fragment key={`${c.name}-${i}`}>
          {i > 0 && <span aria-hidden>/</span>}
          {c.href ? (
            <Link
              href={c.href}
              className={c.color ? "font-semibold" : "hover:text-brand"}
              style={c.color ? { color: c.color } : undefined}
            >
              {c.name}
            </Link>
          ) : (
            <span className="text-ink">{c.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
