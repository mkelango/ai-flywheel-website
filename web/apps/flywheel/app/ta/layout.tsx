import type { Metadata } from "next";
import { DocLang } from "@/components/ta/DocLang";

export const metadata: Metadata = {
  openGraph: { siteName: "AI Flywheel", locale: "ta_IN", type: "website" },
};

/** Tamil mirror: marks the subtree as Tamil. The root layout keeps the header and footer. */
export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ta">
      <DocLang lang="ta" />
      {children}
    </div>
  );
}
