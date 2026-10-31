import Link from "next/link";
import { formatDate, type Insight } from "@/lib/research";

export function InsightCard({ a }: { a: Insight }) {
  return (
    <Link href={`/insights/${a.slug}`} className="card card-hover group flex h-full flex-col p-6">
      <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
        <span className="size-2 rounded-full" style={{ background: a.color }} aria-hidden /> {a.tag}
      </span>
      <span className="mt-4 font-display text-xl font-semibold leading-snug text-ink group-hover:text-primary-hover">{a.title}</span>
      <span className="mt-2 text-sm text-muted">{a.dek}</span>
      <span className="mt-auto pt-6 text-xs text-muted">
        <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.read} read
      </span>
    </Link>
  );
}
