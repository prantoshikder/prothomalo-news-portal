import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";

/** Two-column layout: main content + sticky sidebar on desktop. */
export default function PageWithSidebar({
  children,
  className,
}: {
  children: ReactNode;
  /** Vertical padding etc. Defaults to `py-10`. */
  className?: string;
}) {
  return (
    <div className={cn("mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_340px]", className ?? "py-10")}>
      <div className="min-w-0">{children}</div>
      <Sidebar />
    </div>
  );
}
