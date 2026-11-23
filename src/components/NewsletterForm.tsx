"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="mt-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
        ধন্যবাদ! সাবস্ক্রিপশন নিশ্চিত হয়েছে (ডেমো)।
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="mt-3 flex overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 focus-within:ring-brand"
    >
      <label htmlFor="nl-email" className="sr-only">ইমেইল</label>
      <input
        id="nl-email"
        type="email"
        required
        placeholder="আপনার ইমেইল"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
      />
      <button type="submit" className="bg-brand px-4 text-sm font-semibold text-white transition hover:brightness-110">
        সাবস্ক্রাইব
      </button>
    </form>
  );
}
