import Link from "next/link";
import { getCategory, type CategorySlug } from "@/lib/data";
import { categoryHref } from "@/lib/routes";

export default function SectionHeading({
  title,
  href,
  color = "var(--brand)",
}: {
  title: string;
  href?: string;
  color?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b-2 border-line">
      <h2 className="relative -mb-0.5 border-b-2 pb-2 font-serif text-xl font-bold md:text-2xl" style={{ borderColor: color }}>
        {href ? (
          <Link href={href} className="transition hover:opacity-80">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {href && (
        <Link
          href={href}
          className="group mb-2 inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-brand"
        >
          আরও
          <svg viewBox="0 0 24 24" className="size-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/** SectionHeading pre-filled from a category: its name, colour and listing link. */
export function CategoryHeading({ slug, title }: { slug: CategorySlug; title?: string }) {
  const cat = getCategory(slug);
  if (!cat) return null;
  return <SectionHeading title={title ?? cat.name} href={categoryHref(cat.slug)} color={cat.color} />;
}
