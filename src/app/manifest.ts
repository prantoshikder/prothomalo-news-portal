import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর (ডেমো নিউজ পোর্টাল)",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#d7262f",
    lang: "bn",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
