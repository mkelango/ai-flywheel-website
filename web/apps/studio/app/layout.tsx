import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@flywheel/ui/components/SiteHeader";
import { SiteFooter } from "@flywheel/ui/components/SiteFooter";
import { Logo } from "@flywheel/ui/components/WheelMark";
import { MotionProvider } from "@flywheel/ui/components/interactive";
import { FOOTER_COLUMNS, HEADER_CTAS, NAV_ITEMS } from "@/lib/nav";
import { ORGANIZATION, WEBSITE } from "@/lib/seo";
import { JsonLd } from "@/components/Seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aiflywheel.studio"),
  title: { default: "Agentic AI Platform for Builders · AI Flywheel Studio", template: "%s · AI Flywheel Studio" },
  description: "Build governed AI agents through ten phases and six signed gates. Agentic Studio opens in early access in Feb 2027. Join the list.",
  applicationName: "AI Flywheel Studio",
  publisher: "AI Flywheel",
  category: "technology",
  openGraph: { siteName: "AI Flywheel Studio", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#07090d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary">
            Skip to content
          </a>
          <SiteHeader
            current="studio"
            logo={<Logo descriptor="Studio" />}
            items={NAV_ITEMS}
            ctas={HEADER_CTAS}
            mobileStickyCta={{ label: "Join early access", href: "/early-access" }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter current="studio" logo={<Logo descriptor="Studio" />} tagline="Sign in. Start a project." columns={FOOTER_COLUMNS} />
          <JsonLd data={{ "@context": "https://schema.org", "@graph": [ORGANIZATION, WEBSITE] }} />
        </MotionProvider>
      </body>
    </html>
  );
}
