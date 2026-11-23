"use client";

import { useSyncExternalStore } from "react";
import { formatBnFullDate } from "@/lib/utils";

const noop = () => () => {};

export default function HeaderDate() {
  const label = useSyncExternalStore(
    noop,
    () => formatBnFullDate(new Date()),
    () => null,
  );
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {label ?? " "}
    </span>
  );
}
