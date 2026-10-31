import { ArrowRight, Mail } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { STAGE_META } from "@/lib/data";
import { MISSION_TOPICS, PROGRESS_MOCK, type MissionTopicSlug } from "@/lib/families";
import { TA_MISSION_TOPICS, TA_STAGE } from "@/lib/ta-content";
import { TaStatus, TaTopicNav } from "./blocks";

export function TaMissionTopicNav({ current }: { current: MissionTopicSlug }) {
  return <TaTopicNav label="மிஷன் தலைப்புகள்" current={current} items={MISSION_TOPICS.map((t) => ({ key: t.slug, href: `/ta/mission/${t.slug}`, label: TA_MISSION_TOPICS[t.slug].label }))} />;
}

const DISTRICT_TA: Record<string, string> = { "District A": "மாவட்டம் A", "District B": "மாவட்டம் B" };

/** Illustrative mock of the district dashboard, in Tamil. */
export function TaProgressMock() {
  return (
    <div className="relative rounded-[var(--radius-card)] border-2 border-dashed border-line bg-surface p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <TaStatus status="Illustrative scenario" />
        <span className="text-sm text-muted">மாதிரி மாவட்டங்கள், மாதிரி எண்கள். வடிவத்தை மட்டும் காட்டுகிறது.</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {PROGRESS_MOCK.map((d) => (
          <div key={d.district} className="card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-xl font-semibold text-ink">{DISTRICT_TA[d.district] ?? d.district}</p>
              <p className="text-sm text-muted">{d.schools} பள்ளிகள்</p>
            </div>
            <p className="mt-5 text-sm font-semibold text-ink">நிலை வாரியாக ஆசிரியர்கள்</p>
            <dl className="mt-2 grid grid-cols-3 gap-2">
              {Object.entries(d.levels).map(([lv, n]) => (
                <div key={lv} className="rounded-2xl bg-surface-2 p-3 text-center">
                  <dt className="font-mono text-xs text-muted">{lv}</dt>
                  <dd className="font-display text-2xl font-semibold text-ink">{n}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm font-semibold text-ink">திட்டத்தை முடித்த வகுப்பு 3–8 குழந்தைகள், கட்டம் வாரியாக</p>
            <ul className="mt-2 space-y-2">
              {STAGE_META.map((s) => {
                const pct = d.stages[s.key];
                const verb = TA_STAGE[s.key].verb;
                return (
                  <li key={s.key} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2 text-sm">
                    <span className="text-ink-2">{verb}</span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`${verb}: ${pct}%`}>
                      <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </span>
                    <span className="text-right text-muted">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TaMissionContact({ overview = false }: { overview?: boolean }) {
  return (
    <section id="contact" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <div className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">மிஷன் குழுவைத் தொடர்பு கொள்ளுங்கள்</h2>
            <p className="mt-2 text-muted">மாவட்ட அலுவலர்கள், கல்வித் துறைகள், CSR குழுக்களுக்கு.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/demo?role=mission">
              <Mail className="size-4" aria-hidden /> சந்திப்பு கேளுங்கள்
            </Button>
            {overview && (
              <SmartLink href="/ta/mission" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                மிஷன் கண்ணோட்டம் <ArrowRight className="size-4" aria-hidden />
              </SmartLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
