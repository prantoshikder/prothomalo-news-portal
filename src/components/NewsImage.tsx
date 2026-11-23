import Image from "next/image";
import { imageUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  seed: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  isVideo?: boolean;
  className?: string;
  ratio?: "video" | "wide" | "square" | "portrait";
};

const RATIOS = {
  video: "aspect-[16/10]",
  wide: "aspect-[21/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

export default function NewsImage({
  seed,
  alt,
  sizes,
  priority,
  isVideo,
  className,
  ratio = "video",
}: Props) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-line", RATIOS[ratio], className)}>
      <Image
        src={imageUrl(seed)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      {isVideo && (
        <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          ভিডিও
        </span>
      )}
    </div>
  );
}
