import { OpinionCard } from "@/components/ArticleCards";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import type { Article } from "@/lib/data";

/** Full-bleed tinted band of opinion cards. */
export default function OpinionBand({
  items,
  title,
  href,
  accent = "#7c3aed",
}: {
  items: Article[];
  title: string;
  href?: string;
  accent?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="bg-[#f3ede3] py-12 dark:bg-[#121922]">
      <Container>
        <SectionHeading title={title} href={href} color={accent} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a) => (
            <OpinionCard key={a.id} article={a} accent={accent} />
          ))}
        </div>
      </Container>
    </section>
  );
}
