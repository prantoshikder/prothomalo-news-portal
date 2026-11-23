import Link from "next/link";
import { categories } from "@/lib/data";
import HeaderDate from "./HeaderDate";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

const NAV = categories.slice(0, 9);

export default function Header() {
  return (
    <header className="bg-surface">
      {/* Masthead */}
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 md:py-5">
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <MobileMenu categories={categories} />
          </div>
          <div className="hidden text-sm text-muted lg:block">
            <HeaderDate />
            <div className="text-xs">ঢাকা • ২৪° সে. • আংশিক মেঘলা</div>
          </div>
        </div>

        <Logo />

        <div className="flex items-center justify-end gap-2">
          <form action="/search" className="relative hidden md:block" role="search">
            <input
              name="q"
              type="search"
              placeholder="খুঁজুন"
              aria-label="খবর খুঁজুন"
              className="w-36 rounded-full border border-line bg-paper py-2 pr-4 pl-9 text-sm transition-all outline-none focus:w-56 focus:border-brand"
            />
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </form>
          <Link
            href="/search"
            aria-label="খুঁজুন"
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Category nav */}
      <nav
        aria-label="প্রধান বিভাগসমূহ"
        className="sticky top-0 z-40 border-y border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 no-scrollbar">
          <Link
            href="/latest"
            className="flex shrink-0 items-center gap-2 px-3 py-3 text-[15px] font-bold text-brand"
          >
            <span className="live-dot size-2 rounded-full bg-brand" />
            সর্বশেষ
          </Link>
          {NAV.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="relative shrink-0 px-3 py-3 text-[15px] font-semibold text-ink transition after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-brand hover:after:scale-x-100"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
