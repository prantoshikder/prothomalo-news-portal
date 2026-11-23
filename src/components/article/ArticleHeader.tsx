import Breadcrumb from "@/components/Breadcrumb";
import type { Article, Category } from "@/lib/data";
import { categoryHref } from "@/lib/routes";

/** Breadcrumb, headline and standfirst at the top of an article. */
export default function ArticleHeader({ article, category }: { article: Article; category: Category }) {
  return (
    <header>
      <Breadcrumb
        items={[
          { name: "প্রচ্ছদ", href: "/" },
          { name: category.name, href: categoryHref(category.slug), color: category.color },
        ]}
      />
      <h1 className="mt-4 font-serif text-3xl leading-tight font-bold md:text-[2.6rem] md:leading-[1.25]">
        {article.title}
      </h1>
      <p className="mt-4 border-l-4 pl-4 text-lg leading-relaxed text-muted" style={{ borderColor: category.color }}>
        {article.excerpt}
      </p>
    </header>
  );
}
