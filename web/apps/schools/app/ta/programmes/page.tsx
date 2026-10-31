import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy, PartyPopper } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { PageHero, SectionHead } from "@/components/blocks";
import { TaDemoBand, TaStatus } from "@/components/ta/blocks";
import { PROGRAMMES, STAGE_META, band } from "@/lib/data";
import { taPageMeta } from "@/lib/seo";
import { TA_BOARDS, TA_CORE, TA_DRIVE, TA_EVENTS, TA_PROGRAMMES, TA_STAGE, taClasses } from "@/lib/ta-content";

export const metadata = taPageMeta(
  "/programmes",
  "பாடத்திட்ட வரைபடம்: வகுப்பு 1 முதல் 12 வரை AI",
  "நான்கு திட்டங்கள், நான்கு கட்டங்கள், வகுப்பு 1 முதல் 12 வரை ஒரே சக்கரம். ஒரு மாணவருக்கு ஆண்டுக் கட்டண வரம்பு, CBSE, ICSE, தமிழ்நாடு மாநிலப் பாடத்திட்டத்துடன் பொருத்தம்.",
);

const EVENT_ICONS = [CalendarDays, Trophy, PartyPopper];

export default function TaProgrammesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "திட்டங்கள்" }]}
        eyebrow="பாடத்திட்ட வரைபடம்"
        title="வகுப்பு வாரியான AI பாடத்திட்டம்: வகுப்பு 1 முதல் 12 வரை, ஒரே சக்கரம்."
        intro={`எங்கள் வகுப்பு வாரியான AI பாடத்திட்டம் நான்கு திட்டங்களாக இயங்குகிறது. ஒவ்வொரு வகுப்பும் நான்கு கட்டங்களையும் கற்கிறது: ${STAGE_META.map((s) => TA_STAGE[s.key].verb).join(", ")}. ஒவ்வொரு படியும் வயதுக்கு ஏற்றது.`}
        actions={
          <>
            <Button href="/demo">பள்ளி டெமோ பதிவு செய்யுங்கள்</Button>
            <Button href="/ta/programmes/boards" variant="secondary">
              பாடத்திட்டப் பொருத்தம்
            </Button>
          </>
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          {/* Desktop: grid map */}
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:block">
            <div className="grid grid-cols-[1.1fr_repeat(4,1fr)_0.9fr] border-b border-line bg-surface-2/60 text-sm">
              <div className="p-4 font-semibold text-ink">திட்டம்</div>
              {STAGE_META.map((s) => (
                <div key={s.key} className="flex items-center gap-2 p-4 font-semibold text-ink">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden />
                  {TA_STAGE[s.key].verb}
                </div>
              ))}
              <div className="p-4 font-semibold text-ink">மாணவர் / ஆண்டு</div>
            </div>
            {PROGRAMMES.map((p, i) => {
              const t = TA_PROGRAMMES[p.slug];
              return (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link href={`/ta/programmes/${p.slug}`} className="group grid grid-cols-[1.1fr_repeat(4,1fr)_0.9fr] border-b border-line last:border-0 hover:bg-bg/60">
                    <div className="p-5">
                      <span className="mb-2 inline-block rounded-pill px-2.5 py-0.5 text-xs font-semibold text-ink" style={{ background: p.tint }}>
                        {taClasses(p.classRange)}
                      </span>
                      <span className="block font-display text-lg font-semibold text-ink group-hover:underline">{p.name}</span>
                      <span className="mt-1 block text-sm text-muted">{t.time}</span>
                    </div>
                    {STAGE_META.map((s) => (
                      <div key={s.key} className="border-l border-line p-5 text-[0.95rem] text-ink-2">
                        {t.stages[s.key]}
                      </div>
                    ))}
                    <div className="border-l border-line p-5">
                      <span className="block font-semibold text-ink">{band(p.price)}</span>
                      <span className="mt-1 inline-block">
                        <TaStatus status="Ed 1.1" />
                      </span>
                      <span className="mt-3 block text-sm text-muted">{t.aiUse}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile and tablet: cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:hidden">
            {PROGRAMMES.map((p) => {
              const t = TA_PROGRAMMES[p.slug];
              return (
                <Link key={p.slug} href={`/ta/programmes/${p.slug}`} className="card card-hover overflow-hidden">
                  <div className="p-6" style={{ background: p.tint }}>
                    <p className="text-sm font-semibold text-ink-2">{taClasses(p.classRange)}</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-ink">{p.name}</p>
                    <p className="mt-2 text-ink-2">
                      <span className="font-semibold text-ink">{band(p.price)}</span> / ஆண்டு <TaStatus status="Ed 1.1" />
                    </p>
                  </div>
                  <ul className="divide-y divide-line">
                    {STAGE_META.map((s) => (
                      <li key={s.key} className="flex gap-3 px-6 py-3 text-[0.95rem] text-ink-2">
                        <span className="mt-2 size-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden />
                        <span>
                          <span className="font-semibold text-ink">{TA_STAGE[s.key].verb}: </span>
                          {t.stages[s.key]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-muted">திட்டப் பெயர்களும் கட்டண வரம்புகளும் Ed 1.1-இலிருந்து. வகுப்புப் பிரிவுகளும் செயல்பாடுகளும் ஒரு முன்மொழிவு; ஒவ்வொரு பள்ளியுடனும் உறுதிசெய்யப்படும்.</p>
        </Container>
      </section>

      {/* DRIVE + CORE */}
      <section className="bg-surface-2/60 py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="ஒவ்வொரு திட்டமும் DRIVE வழியில்" title="கண்டுபிடி. சேகரி. உருவாக்கு. சோதி. பகிர்." className="!mb-6" />
            <ol className="space-y-2">
              {TA_DRIVE.map((d, i) => (
                <li key={d} className="flex items-center gap-3 text-lg text-ink-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface font-display text-sm font-semibold text-ink ring-1 ring-line">{i + 1}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>
          <div className="card self-start p-7">
            <p className="eyebrow">கூடவே, CORE</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">{TA_CORE}</p>
            <p className="mt-5 border-t border-line pt-5 text-ink-2">
              <span className="font-semibold text-ink">AI இல்லாத ஒரு சரிபார்ப்பு.</span> ஒவ்வொரு திட்டமும் ஒரு சிறு, திரை இல்லாத சரிபார்ப்புடன் முடிகிறது. கருவி வேலை செய்தது மட்டுமல்ல, குழந்தைக்குப் புரிந்ததா என்பதும் தெரியும்.
            </p>
          </div>
        </Container>
      </section>

      {/* Boards */}
      <section id="boards" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="பாடத்திட்டப் பொருத்தம்" title="உங்கள் பாடத்திட்டத்துக்கு ஏற்றது." line="ஒவ்வொன்றிலும்: நாங்கள் எதை உள்ளடக்குகிறோம், எதைச் சேர்க்கிறோம்." />
          <div className="grid gap-4 md:grid-cols-3">
            {TA_BOARDS.map((b, i) => (
              <Reveal key={b.board} delay={i * 0.06} className="card h-full p-7">
                <p className="font-display text-2xl font-semibold text-ink">{b.board}</p>
                <p className="mt-3 text-ink-2">அடிப்படை: {b.basis}.</p>
              </Reveal>
            ))}
          </div>
          <Link href="/ta/programmes/boards" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            விரிவான பொருத்தம் <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 pb-8">
        <Container>
          <SectionHead eyebrow="பள்ளி ஆண்டில்" title="படைப்புகளைக் காட்ட மூன்று தருணங்கள்." />
          <div className="grid gap-4 md:grid-cols-3">
            {TA_EVENTS.map(({ t, l }, i) => {
              const I = EVENT_ICONS[i];
              return (
                <div key={t} className="card p-6">
                  <I className="size-6 text-ink" aria-hidden />
                  <p className="mt-4 font-display text-lg font-semibold text-ink">{t}</p>
                  <p className="mt-1 text-muted">{l}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <TaDemoBand />
    </>
  );
}
