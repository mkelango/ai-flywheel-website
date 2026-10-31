import { HtmlLang } from "@/components/ta/HtmlLang";

/**
 * Tamil mirror: everything under /ta is marked as Tamil for fonts, screen readers and search.
 * Tamil words run longer than English, so pill buttons may wrap and very long words in headings may break,
 * instead of overflowing at 375px.
 */
const WRAP_BUTTONS =
  "[&_a.rounded-pill.whitespace-nowrap]:!h-auto [&_a.rounded-pill.whitespace-nowrap]:!whitespace-normal [&_a.rounded-pill.whitespace-nowrap]:py-2.5 [&_a.rounded-pill.whitespace-nowrap]:text-center [&_h1]:[overflow-wrap:anywhere] [&_h2]:[overflow-wrap:anywhere]";

export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ta" className={WRAP_BUTTONS}>
      <HtmlLang />
      {children}
    </div>
  );
}
