import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "পাতাটি খুঁজে পাওয়া যায়নি",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-8xl font-bold text-brand">৪০৪</p>
      <h1 className="mt-4 font-serif text-2xl font-bold">পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-muted">আপনি যে লিংকটি খুঁজছেন, সেটি সরানো হয়েছে অথবা কখনো ছিল না।</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white">প্রচ্ছদে ফিরুন</Link>
        <Link href="/search" className="rounded-full border border-line px-5 py-2.5 font-semibold">খুঁজুন</Link>
      </div>
    </div>
  );
}
