import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { avatarUrl, type Author } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Avatar + name + a meta line (role by default). */
export default function AuthorInfo({
  author,
  size = 44,
  meta,
  avatarClassName,
  avatarStyle,
  className,
}: {
  author: Author;
  size?: 44 | 48;
  /** Replaces the default role line. */
  meta?: ReactNode;
  avatarClassName?: string;
  avatarStyle?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={avatarUrl(author.avatarSeed)}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", size === 48 ? "size-12" : "size-11", avatarClassName)}
        style={avatarStyle}
      />
      <div className="text-sm leading-tight">
        <div className="font-semibold">{author.name}</div>
        <div className="mt-0.5 text-muted">{meta ?? <span className="text-xs">{author.role}</span>}</div>
      </div>
    </div>
  );
}
