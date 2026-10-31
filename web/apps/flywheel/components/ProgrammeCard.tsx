import Link from "next/link";
import { Clock, CalendarDays, Layers } from "lucide-react";
import { STAGE_META, type Programme } from "@/lib/programmes";
import { LevelPill, PriceLine, StageTag } from "./ui";

/** Dense catalogue card: level, stage colour, format, hours, price band, next batch. */
export function ProgrammeCard({ p, headingLevel = "h3" }: { p: Programme; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const color = STAGE_META[p.stage].color;
  return (
    <Link
      href={`/programmes/${p.slug}`}
      className="card card-hover group relative flex h-full flex-col overflow-hidden focus-visible:outline-offset-2"
    >
      <span className="h-1 w-full" style={{ background: color }} aria-hidden />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <LevelPill level={p.level} />
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">{p.format}</span>
        </div>
        <H className="mt-4 font-display text-[1.3rem] font-semibold leading-snug text-ink group-hover:text-primary-hover">{p.title}</H>
        <p className="mt-1 text-sm text-muted">{p.focus}</p>
        <ul className="mt-4 space-y-1.5 text-[0.82rem] text-ink-2">
          <li className="flex items-center gap-2">
            <Layers className="size-3.5 text-muted" aria-hidden />
            <StageTag stage={p.stage} /> <span className="text-muted">· {p.lifecycle.split("·")[1]?.trim() ?? p.studio}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-3.5 text-muted" aria-hidden />
            {p.formatDetail} · {p.hours}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="size-3.5 text-muted" aria-hidden />
            Next batch: <span className="font-medium text-ink">{p.nextBatch}</span>
          </li>
        </ul>
        <div className="min-h-5 flex-1" />
        <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
          <PriceLine p={p} />
        </div>
      </div>
    </Link>
  );
}
