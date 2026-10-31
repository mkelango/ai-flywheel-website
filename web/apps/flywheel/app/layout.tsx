import type { Metadata, Viewport } from "next";
import { Inter, Lora, JetBrains_Mono, Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import { SiteHeader } from "@flywheel/ui/components/SiteHeader";
import { SiteFooter } from "@flywheel/ui/components/SiteFooter";
import { Logo } from "@flywheel/ui/components/WheelMark";
import { MotionProvider } from "@flywheel/ui/components/interactive";
import { NAV, HEADER_CTAS, FOOTER } from "@/lib/nav";
import { TA_PATHS } from "@/lib/ta";
import { JsonLd } from "@/components/ui";
import { BASE_OG, SITE_URL } from "@/lib/site";
import { AUTHOR, AUTHOR_ID, BRAND_LINE, ORG_ID } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });
const tamilSans = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-noto-tamil", display: "swap", preload: false });
const tamilSerif = Noto_Serif_Tamil({ subsets: ["tamil"], variable: "--font-noto-serif-tamil", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AI Flywheel — Learn it. Build it. Prove it.", template: "%s · AI Flywheel" },
  description: "Practical AI programmes for students, professionals, colleges, companies and government in India. Certified on what you can build.",
  openGraph: { ...BASE_OG, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#F6F1E8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${lora.variable} ${mono.variable} ${tamilSans.variable} ${tamilSerif.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-inverse-ink">
            Skip to content
          </a>
          <SiteHeader current="flywheel" logo={<Logo />} items={NAV} ctas={HEADER_CTAS} taPaths={TA_PATHS} searchHref="/search" mobileStickyCta={{ label: "Start free", href: "/programmes/foundation" }} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter current="flywheel" logo={<Logo />} tagline="Learn it. Build it. Prove it." columns={FOOTER} />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": ORG_ID,
                  name: "AI Flywheel",
                  alternateName: "aiflywheel.in",
                  url: SITE_URL,
                  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
                  image: `${SITE_URL}/opengraph-image`,
                  description: BRAND_LINE,
                  slogan: "Learn it. Build it. Prove it.",
                  parentOrganization: { "@type": "Organization", name: "Inevitra Advisory" },
                  founder: { "@id": AUTHOR_ID },
                  address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
                  areaServed: { "@type": "Country", name: "India" },
                  knowsLanguage: ["en-IN", "ta-IN"],
                },
                AUTHOR,
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "AI Flywheel",
                  url: SITE_URL,
                  inLanguage: "en-IN",
                  publisher: { "@id": ORG_ID },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
