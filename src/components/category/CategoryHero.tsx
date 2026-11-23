import Breadcrumb from "@/components/Breadcrumb";
import type { Category } from "@/lib/data";
import { toBn } from "@/lib/utils";
import CategoryNav from "./CategoryNav";

/** Category page banner: breadcrumb, title, description, story count and category switcher. */
export default function CategoryHero({ category, count }: { category: Category; count: number }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ background: `radial-gradient(circle at 85% 20%, ${category.color}, transparent 55%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb items={[{ name: "প্রচ্ছদ", href: "/" }, { name: category.name }]} />
        <h1 className="mt-3 flex items-center gap-3 font-serif text-4xl font-bold md:text-5xl">
          <span className="h-10 w-1.5 rounded-full" style={{ background: category.color }} />
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
        <p className="mt-2 text-sm text-muted">মোট {toBn(count)}টি প্রতিবেদন</p>
      </div>
      <CategoryNav active={category.slug} />
    </div>
  );
}
