import { MediaListItem, OverlayCard } from "@/components/ArticleCards";
import Container from "@/components/Container";
import type { Article } from "@/lib/data";

/** Dark full-bleed band: one big video story plus a list of smaller ones. */
export default function VideoBand({
  items,
  title = "ভিডিও গল্প",
  tagline = "দেখুন, জানুন, শেয়ার করুন",
}: {
  items: Article[];
  title?: string;
  tagline?: string;
}) {
  const [main, ...rest] = items;
  if (!main) return null;
  return (
    <section className="bg-[#0f1722] py-12 text-white">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold">
            <span className="grid size-9 place-items-center rounded-full bg-brand">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {title}
          </h2>
          <span className="text-sm text-slate-400">{tagline}</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <OverlayCard article={main} sizes="(min-width:1024px) 720px, 100vw" size="lg" showCategory isVideo />
          <div className="grid content-start gap-5">
            {rest.map((a) => (
              <MediaListItem key={a.id} article={a} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
