"use client";

import { useEffect, useState } from "react";

const SIZES = [0.9, 1, 1.12, 1.25];

export default function ArticleTools({ title }: { title: string }) {
  const [sizeIdx, setSizeIdx] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reader-size", `${SIZES[sizeIdx]}rem`);
    return () => {
      root.style.removeProperty("--reader-size");
    };
  }, [sizeIdx]);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const btn =
    "grid size-9 place-items-center rounded-full border border-line bg-surface text-sm font-bold transition hover:border-brand hover:text-brand disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs text-muted">লেখার আকার</span>
      <button
        type="button"
        className={btn}
        aria-label="লেখা ছোট করুন"
        disabled={sizeIdx === 0}
        onClick={() => setSizeIdx((i) => Math.max(0, i - 1))}
      >
        অ-
      </button>
      <button
        type="button"
        className={btn}
        aria-label="লেখা বড় করুন"
        disabled={sizeIdx === SIZES.length - 1}
        onClick={() => setSizeIdx((i) => Math.min(SIZES.length - 1, i + 1))}
      >
        অ+
      </button>
      <span className="mx-1 h-6 w-px bg-line" aria-hidden />
      <button type="button" onClick={share} className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white transition hover:brightness-110">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        {copied ? "লিংক কপি হয়েছে" : "শেয়ার"}
      </button>
      <button type="button" onClick={() => window.print()} className={btn} aria-label="প্রিন্ট করুন">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v7H6z" />
        </svg>
      </button>
    </div>
  );
}
