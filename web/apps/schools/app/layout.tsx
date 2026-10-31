import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono, Noto_Sans_Tamil } from "next/font/google";
import { SiteFooter } from "@flywheel/ui/components/SiteFooter";
import { Logo } from "@flywheel/ui/components/WheelMark";
import { MotionProvider } from "@flywheel/ui/components/interactive";
import { Header, MobileBar } from "@/components/Chrome";
import { FOOTER } from "@/lib/nav";
import { JsonLd } from "@/components/blocks";
import { ORG_ID, SEO, SITE, SITE_ID } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-noto-tamil", display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://schools.aiflywheel.in"),
  title: { default: "AI Flywheel at Schools — Make it. Question it. Share it.", template: "%s · AI Flywheel Schools" },
  description: SEO["/"].description,
  openGraph: { siteName: "AI Flywheel at Schools", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
};

/** Organisation and website, once per page. Pages refer to the organisation by its @id. */
const SITE_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": ORG_ID,
      name: "AI Flywheel at Schools",
      alternateName: "AI Flywheel Schools",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` },
      image: `${SITE}/opengraph-image`,
      slogan: "Make it. Question it. Share it.",
      description:
        "A class-by-class AI literacy curriculum for CBSE, ICSE and State Board schools, Classes 1–12, in Tamil and English: lesson kits, teacher training (Aware C1 to Builder C3) and Spark Lab. Safe by design: no AI accounts for Classes 3–5, data kept in India.",
      areaServed: [
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "Country", name: "India" },
      ],
      knowsLanguage: ["en", "ta"],
      knowsAbout: ["AI curriculum for schools", "AI literacy", "Teacher training in AI", "AI and robotics lab", "Child data privacy"],
      parentOrganization: {
        "@type": "EducationalOrganization",
        name: "AI Flywheel",
        url: "https://aiflywheel.in",
        parentOrganization: { "@type": "Organization", name: "Inevitra Advisory" },
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: "AI Flywheel at Schools",
      url: SITE,
      inLanguage: ["en-IN", "ta-IN"],
      publisher: { "@id": ORG_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#FFF7E8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable} ${tamil.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-inverse-ink">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter current="schools" logo={<Logo descriptor="at Schools" />} tagline="Make it. Question it. Share it." columns={FOOTER} />
          <MobileBar />
          <JsonLd data={SITE_LD} />
        </MotionProvider>
      </body>
    </html>
  );
}
