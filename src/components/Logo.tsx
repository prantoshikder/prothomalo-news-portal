import Link from "next/link";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <Link href="/" aria-label={`${site.name} — প্রচ্ছদ`} className="group inline-flex items-center gap-2.5">
      <span
        className={cn(
          "relative grid place-items-center rounded-full bg-brand text-white shadow-sm transition group-hover:rotate-12",
          size === "lg" ? "size-11 md:size-12" : "size-8",
        )}
        aria-hidden
      >
        {/* Stylised rising sun + sound wave mark */}
        <svg viewBox="0 0 32 32" className={size === "lg" ? "size-7" : "size-5"} fill="none">
          <path d="M6 20a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M11 20a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="16" cy="20" r="1.8" fill="currentColor" />
          <path d="M4 25h24" stroke="var(--gold)" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-serif font-bold tracking-tight text-brand-ink",
            size === "lg" ? "text-3xl md:text-[2.6rem]" : "text-2xl",
          )}
        >
          {site.name}
        </span>
        {size === "lg" && (
          <span className="mt-1 hidden text-[11px] font-medium tracking-[0.2em] text-muted uppercase md:block">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
