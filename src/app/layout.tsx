import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/data";
import "./globals.css";

const body = Hind_Siliguri({
  variable: "--font-body",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const head = Noto_Serif_Bengali({
  variable: "--font-head",
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "নবকণ্ঠ — বাংলাদেশ, রাজনীতি, বিশ্ব, বাণিজ্য, খেলা, বিনোদন ও প্রযুক্তির সর্বশেষ খবর। (ডেমো নিউজ পোর্টাল)",
  openGraph: { siteName: site.name, locale: "bn_BD", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1218" },
  ],
};

// Applies the saved / system theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('nk-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${body.variable} ${head.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          মূল কনটেন্টে যান
        </a>
        <Header />
        <BreakingTicker />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
