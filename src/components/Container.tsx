import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width page gutter used by every section. */
export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-7xl px-4", className)}>{children}</div>;
}
