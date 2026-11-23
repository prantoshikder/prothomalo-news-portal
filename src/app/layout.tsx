import BackToTop from "@/components/BackToTop";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/data";
import { DEFAULT_DESCRIPTION, RSS_ALTERNATE } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
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
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: site.name,
  keywords: ["বাংলা খবর", "সর্বশেষ খবর", "বাংলাদেশ", "রাজনীতি", "খেলা", "বিনোদন", "Bangla news", site.english],
  alternates: {
    canonical: "/",
    types: RSS_ALTERNATE,
  },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    title: `${site.name} | ${site.tagline}`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
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
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${body.variable} ${head.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        suppressContentEditableWarning
        className="flex min-h-screen flex-col"
      >
        <a
          href="#main"
          className="sr-only z-70 rounded bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
