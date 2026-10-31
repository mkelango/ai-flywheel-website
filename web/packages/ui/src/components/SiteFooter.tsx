import type { ReactNode } from "react";
import { SITES, type SiteKey } from "../sites";
import { SmartLink } from "./primitives";
import { LanguageLinks } from "./LanguageSwitch";

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

/** Five-column footer with the shared base line every brand carries. */
export function SiteFooter({ current, logo, tagline, columns }: { current: SiteKey; logo: ReactNode; tagline: string; columns: FooterColumn[] }) {
  const others = (["flywheel", "schools", "studio"] as SiteKey[]).filter((k) => k !== current);
  return (
    <footer className="mt-auto bg-[var(--footer-bg,var(--inverse))] pb-24 text-[var(--footer-ink,var(--inverse-ink))] xl:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="[&_*]:!text-[var(--footer-ink,var(--inverse-ink))]">{logo}</div>
          <p className="mt-5 max-w-xs font-display text-2xl leading-snug">{tagline}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest opacity-60">Tools expire. Layers endure.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-widest opacity-55">{col.title}</p>
              <ul className="text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className="inline-flex min-h-11 items-center opacity-80 transition-opacity hover:opacity-100 lg:min-h-8">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5">
            {others.map((k) => (
              <a key={k} href={SITES[k].url} className="inline-flex min-h-11 items-center hover:opacity-100 lg:min-h-8">
                {SITES[k].name} ↗
              </a>
            ))}
            {current !== "studio" && (
              <LanguageLinks linkClassName="inline-flex min-h-11 items-center lg:min-h-8" activeClassName="font-semibold" inactiveClassName="underline-offset-2 hover:underline" />
            )}
          </div>
          <p>AI Flywheel is a brand of Inevitra Advisory. © 2026 · Make the impossible inevitable.</p>
        </div>
      </div>
    </footer>
  );
}
