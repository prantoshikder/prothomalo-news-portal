import Link from "next/link";
import { categoryHref } from "@/lib/routes";
import { categories, site } from "@/lib/data";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const SOCIAL = [
  { label: "Facebook", path: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" },
  { label: "YouTube", path: "M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8zM10 15V9l5.2 3z" },
  { label: "X", path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.2L4.7 21H1.5l7.5-8.6L1.2 3h6.6l4.5 5.7zm-1.1 16.2h1.8L6.7 4.7H4.8z" },
  { label: "Instagram", path: "M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 7a5.4 5.4 0 0 0-1.5-3.9A5.5 5.5 0 0 0 16.5 1.6C15 1.5 9 1.5 7.5 1.6a5.5 5.5 0 0 0-3.9 1.5A5.4 5.4 0 0 0 2.1 7C2 8.5 2 15.5 2.1 17a5.4 5.4 0 0 0 1.5 3.9 5.5 5.5 0 0 0 3.9 1.5c1.5.1 7.5.1 9 0a5.4 5.4 0 0 0 3.9-1.5 5.5 5.5 0 0 0 1.5-3.9c.1-1.5.1-8.5 0-10z" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-brand bg-[#0f1722] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr_1.2fr]">
          <div>
            <div className="[&_*]:!text-white">
              <Logo size="sm" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {site.tagline}। নিরপেক্ষ, তথ্যনির্ভর ও দায়িত্বশীল সাংবাদিকতার অঙ্গীকার নিয়ে দেশ ও বিশ্বের খবর পৌঁছে দিচ্ছি আপনার কাছে।
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full bg-white/5 transition hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">বিভাগ</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
              <li>
                <Link href="/latest" className="transition hover:text-white">সর্বশেষ</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c.slug)} className="transition hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">নিউজলেটার</h2>
            <p className="text-sm text-slate-400">প্রতিদিন সকালে দিনের সেরা খবর পান ইনবক্সে।</p>
            <NewsletterForm />
            <ul className="mt-6 space-y-1.5 text-sm text-slate-400">
              <li>যোগাযোগ: newsroom@nobokontho.example</li>
              <li>বিজ্ঞাপন: ads@nobokontho.example</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {site.name} — ডেমো নিউজ পোর্টাল। সব সংবাদ ও চরিত্র কাল্পনিক, শুধু ডিজাইন প্রদর্শনের জন্য।</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-white">ব্যবহারের শর্তাবলি</a>
            <a href="#" className="hover:text-white">আমাদের সম্পর্কে</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
