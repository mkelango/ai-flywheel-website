import { ArrowRight, Scissors, Monitor } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { PARENT_TOPICS, type ParentTopicSlug } from "@/lib/families";
import { TA_PARENT_TOPICS } from "@/lib/ta-content";
import { TaTopicNav } from "./blocks";

export function TaParentTopicNav({ current }: { current: ParentTopicSlug }) {
  return <TaTopicNav label="பெற்றோர் தலைப்புகள்" current={current} items={PARENT_TOPICS.map((t) => ({ key: t.slug, href: `/ta/parents/${t.slug}`, label: TA_PARENT_TOPICS[t.slug].label }))} />;
}

/** Unplugged vs on-screen bars, by class band. Illustrative proportions. */
export function ScreenBars({ bands }: { bands: { classes: string; unplugged: number; line: string }[] }) {
  return (
    <ul className="space-y-4">
      {bands.map((s) => (
        <li key={s.classes} className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <span className="font-display font-semibold text-ink">{s.classes}</span>
            <span className="text-sm text-muted">சுமார் {s.unplugged}% திரை இல்லாமல்</span>
          </div>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`சுமார் ${s.unplugged}% திரை இல்லாமல், ${100 - s.unplugged}% திரையில்`}>
            <span className="h-full bg-accent" style={{ width: `${s.unplugged}%` }} />
            <span className="h-full flex-1 bg-primary/50" />
          </div>
          <p className="mt-3 text-ink-2">{s.line}</p>
        </li>
      ))}
      <li className="flex flex-wrap gap-x-5 gap-y-1 px-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Scissors className="size-4" aria-hidden /> <span className="inline-block size-2.5 rounded-full bg-accent" aria-hidden /> திரை இல்லாமல்
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Monitor className="size-4" aria-hidden /> <span className="inline-block size-2.5 rounded-full bg-primary/50" aria-hidden /> திரையில்
        </span>
        <span>எடுத்துக்காட்டு விகிதங்கள்; உங்கள் பள்ளியின் கால அட்டவணையே முடிவு செய்யும்.</span>
      </li>
    </ul>
  );
}

/** Closing links on every Tamil parent subpage. */
export function TaParentLinks() {
  return (
    <section className="border-t border-line py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
        <SmartLink href="/demo?role=parent" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
          உங்கள் பள்ளியைச் சேரச் சொல்லுங்கள் <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
        <SmartLink href="/ta/parents" className="inline-flex min-h-11 items-center gap-1.5 text-muted underline-offset-4 hover:text-ink hover:underline">
          பெற்றோர் பக்கம் <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
      </Container>
    </section>
  );
}
