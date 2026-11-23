"use client";

import Link from "next/link";
import { categoryHref } from "@/lib/routes";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/data";
import Logo from "./Logo";

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="মেনু খুলুন"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="সাইট মেনু"
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="মেনু বন্ধ করুন"
            className="grid size-9 place-items-center rounded-full hover:bg-paper"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form action="/search" className="border-b border-line p-4">
          <input
            name="q"
            type="search"
            placeholder="খবর খুঁজুন..."
            className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </form>

        <nav className="flex-1 overflow-y-auto p-2">
          <Link
            href="/latest"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-brand hover:bg-paper"
          >
            <span className="live-dot size-2 rounded-full bg-brand" /> সর্বশেষ
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={categoryHref(c.slug)}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-paper"
            >
              <span className="size-2 rounded-full" style={{ background: c.color }} />
              {c.name}
              <span className="ml-auto text-xs text-muted">{c.english}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
