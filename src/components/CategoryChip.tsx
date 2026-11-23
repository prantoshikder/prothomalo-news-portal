import Link from "next/link";
import { getCategory, type CategorySlug } from "@/lib/data";

export default function CategoryChip({
  slug,
  asLink = true,
}: {
  slug: CategorySlug;
  asLink?: boolean;
}) {
  const cat = getCategory(slug);
  if (!cat) return null;
  const inner = (
    <>
      <span className="size-1.5 rounded-full" style={{ background: cat.color }} />
      {cat.name}
    </>
  );
  const cls =
    "relative z-10 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide";
  return asLink ? (
    <Link href={`/category/${cat.slug}`} className={cls} style={{ color: cat.color }}>
      {inner}
    </Link>
  ) : (
    <span className={cls} style={{ color: cat.color }}>
      {inner}
    </span>
  );
}
