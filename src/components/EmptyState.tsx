import type { ReactNode } from "react";

export default function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
      {children}
    </div>
  );
}
