import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Check, Clock, MessageSquareWarning, Siren, UserCheck } from "lucide-react";
import { Button, Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/blocks";
import { pageMeta } from "@/lib/seo";
import { LegalBanner } from "@/components/extras/bits";
import { AI_REGISTER, TRUST_PAGES, getTrustPage, type TrustSlug } from "@/components/extras/content";

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TRUST_PAGES.map((p) => ({ page: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getTrustPage((await params).page);
  if (!p) return {};
  return pageMeta(`/trust/${p.slug}`, { title: `${p.label}: Trust centre`, description: p.description });
}

export default async function TrustSubPage({ params }: Props) {
  const p = getTrustPage((await params).page);
  if (!p) notFound();
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Trust centre", href: "/trust" }, { label: p.label }]} eyebrow={`Trust centre · ${p.label}`} title={p.title} intro={p.intro} updated />
      <section className="pb-16 md:pb-24">
        <Container className="max-w-4xl">
          <LegalBanner className="mb-10" />
          <Body slug={p.slug} />
          <OtherDocs current={p.slug} />
        </Container>
      </section>
    </>
  );
}

function Body({ slug }: { slug: TrustSlug }) {
  switch (slug) {
    case "children-privacy":
      return <ChildrenPrivacy />;
    case "processing-terms":
      return <ProcessingTerms />;
    case "ai-register":
      return <AiRegister />;
    case "grievance":
      return <Grievance />;
  }
}

function Block({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={clsx("card p-6 md:p-7", className)}>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-ink-2">{children}</div>
    </section>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5">
          <Check className="mt-1 size-4 shrink-0 text-ink" aria-hidden /> {it}
        </li>
      ))}
    </ul>
  );
}

function ChildrenPrivacy() {
  return (
    <div className="space-y-5">
      <div className="rounded-[var(--radius-card)] bg-[#DCEBFB] p-6 md:p-7">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-2">For children to read</p>
        <ul className="mt-3 space-y-2 font-display text-lg text-ink">
          <li>We keep the things you make, so you and your teacher can see them.</li>
          <li>We do not show your face. We show your hands and your work.</li>
          <li>We never use your work to teach an AI.</li>
          <li>Your parent can ask us to delete it. Then it is gone.</li>
        </ul>
      </div>
      <Block title="What we keep">
        <Ticks items={["Your child’s first name, class and school, given by the school.", "The work your child makes in lessons, from Class 6 onwards.", "A record of your consent, so we can show it was really you."]} />
        <p>Children in Classes 1–5 have no AI accounts, so we keep no AI data about them.</p>
      </Block>
      <Block title="What we never do">
        <Ticks items={["No ads, no profiling and no tracking.", "No selling or sharing data for marketing.", "No training of AI models on children’s work.", "No faces in photos without written consent."]} />
      </Block>
      <Block title="Where it is kept, and for how long">
        <p>In India. We keep work for as long as your child is at a partner school, then delete it after a short period the school agrees with us. The exact period is set in the school’s terms.</p>
      </Block>
      <Block title="Your choices as a parent">
        <p>After you give consent, you can view, download or delete your child’s data at any time, from the parent view your school sets up. You can also take back consent; we then stop and delete.</p>
        <SmartLink href="/parents/safety" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
          How consent works <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
      </Block>
    </div>
  );
}

function ProcessingTerms() {
  const roles = [
    { who: "Your school", role: "Data fiduciary", line: "Decides why and how children’s data is used. Invites parents and collects consent." },
    { who: "AI Flywheel", role: "Data processor", line: "Processes data only on the school’s written instructions, to run lessons and reports." },
  ];
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((r) => (
          <div key={r.who} className="card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{r.role}</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{r.who}</p>
            <p className="mt-2 text-ink-2">{r.line}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">Subject to legal review: the school-as-fiduciary, AI Flywheel-as-processor model under the DPDP Act needs a legal opinion before these terms are signed.</p>
      <Block title="What we commit to">
        <Ticks
          items={[
            "Use data only for the purposes in the school’s agreement.",
            "Store and process children’s data in India.",
            "Never use school data to train AI models.",
            "Keep data secure: access by role, encryption, and logs of who looked at what.",
            "Help the school answer parents who ask to see, correct or delete data.",
            "Delete or return data when the agreement ends.",
          ]}
        />
      </Block>
      <Block title="Sub-processors">
        <p>Any company that helps us run the service (for example, hosting in India) is listed for the school before it is used. The school can object.</p>
      </Block>
      <Block title="If something goes wrong">
        <p>We tell the school promptly after we learn of a data incident, with what happened and what we are doing, so the school can meet its own duties to parents and the regulator.</p>
      </Block>
    </div>
  );
}

function AiRegister() {
  return (
    <div className="space-y-5">
      <p className="text-ink-2">Every AI feature in AI Flywheel at Schools, as planned. Children in Classes 1–5 never log in to any of them.</p>
      {/* Desktop table */}
      <div className="card hidden overflow-hidden md:block">
        <table className="w-full text-left text-[0.95rem]">
          <caption className="sr-only">AI features by class band, data used and human oversight</caption>
          <thead className="bg-surface-2/70 text-sm text-muted">
            <tr>
              <th scope="col" className="w-[24%] p-4 font-semibold">Feature</th>
              <th scope="col" className="w-[24%] p-4 font-semibold">Who can use it</th>
              <th scope="col" className="p-4 font-semibold">Data used</th>
              <th scope="col" className="p-4 font-semibold">Human oversight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {AI_REGISTER.map((f) => (
              <tr key={f.feature}>
                <th scope="row" className="p-4 font-normal">
                  <span className="block font-semibold text-ink">{f.feature}</span>
                  <span className="mt-1 block text-sm text-muted">{f.what}</span>
                </th>
                <td className="p-4">
                  <Bands bands={f.bands} />
                </td>
                <td className="p-4 text-ink-2">{f.data}</td>
                <td className="p-4 text-ink-2">{f.oversight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {AI_REGISTER.map((f) => (
          <article key={f.feature} className="card p-5">
            <h2 className="font-display text-lg font-semibold text-ink">{f.feature}</h2>
            <p className="mt-1 text-sm text-muted">{f.what}</p>
            <h3 className="mt-4 text-sm font-semibold text-ink">Who can use it</h3>
            <div className="mt-1">
              <Bands bands={f.bands} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink">Data used</h3>
            <p className="mt-1 text-ink-2">{f.data}</p>
            <h3 className="mt-4 text-sm font-semibold text-ink">Human oversight</h3>
            <p className="mt-1 text-ink-2">{f.oversight}</p>
          </article>
        ))}
      </div>
      <p className="flex items-center gap-2 text-sm text-muted">
        <StatusTag status="Proposed" /> The register is updated before any new AI feature reaches a classroom.
      </p>
    </div>
  );
}

function Bands({ bands }: { bands: { band: string; use: string }[] }) {
  return (
    <ul className="space-y-1.5">
      {bands.map((b) => (
        <li key={b.band} className="text-ink-2">
          <span className="font-medium text-ink">{b.band}:</span> {b.use}
        </li>
      ))}
    </ul>
  );
}

function Grievance() {
  const times = [
    { I: Siren, k: "Safety or data incident", v: "Acknowledged within 24 hours" },
    { I: MessageSquareWarning, k: "Concern or complaint", v: "Acknowledged within 2 working days" },
    { I: Clock, k: "Full reply", v: "Within the time the DPDP rules set" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <UserCheck className="size-7 text-ink" aria-hidden />
          <p className="mt-3 font-display text-xl font-semibold text-ink">Grievance Officer</p>
          <p className="mt-1 text-ink-2">A named person at AI Flywheel answers concerns from parents and schools. The name is published here after legal review.</p>
        </div>
        <div className="card p-6">
          <Siren className="size-7 text-ink" aria-hidden />
          <p className="mt-3 font-display text-xl font-semibold text-ink">Incident contact</p>
          <p className="mt-1 text-ink-2">Our Data Protection Lead handles safety and data incidents, and tells the school first.</p>
        </div>
      </div>
      <Block title="How to raise a concern">
        <ol className="space-y-2">
          {["Tell your school, if you can. They are responsible for your child’s data.", "Or write to us through the form. Choose ‘grievance’, and use a parent’s or teacher’s details only.", "A person replies, in Tamil or English, and keeps you updated until it is closed."].map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-on-accent">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="pt-2">
          <Button href="/contact?topic=grievance">
            Raise a concern <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Block>
      <Block title="How quickly we reply">
        <dl className="grid gap-3 sm:grid-cols-3">
          {times.map(({ I, k, v }) => (
            <div key={k} className="rounded-2xl bg-surface-2/70 p-4">
              <dt className="flex items-center gap-2 text-sm text-muted">
                <I className="size-4" aria-hidden /> {k}
              </dt>
              <dd className="mt-1 font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="flex items-center gap-2 text-sm text-muted">
          <StatusTag status="Proposed" /> Response times are proposed until the legal review is done.
        </p>
      </Block>
    </div>
  );
}

function OtherDocs({ current }: { current: TrustSlug }) {
  return (
    <nav aria-label="Trust centre documents" className="mt-12 border-t border-line pt-8">
      <p className="eyebrow mb-4">More in the Trust centre</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {TRUST_PAGES.filter((p) => p.slug !== current).map((p) => (
          <li key={p.slug}>
            <SmartLink href={`/trust/${p.slug}`} className="card card-hover flex min-h-11 items-center justify-between gap-3 p-4 font-semibold text-ink">
              {p.label} <ArrowRight className="size-4 shrink-0" aria-hidden />
            </SmartLink>
          </li>
        ))}
        <li>
          <SmartLink href="/trust" className="card card-hover flex min-h-11 items-center justify-between gap-3 p-4 font-semibold text-ink">
            Trust centre overview <ArrowRight className="size-4 shrink-0" aria-hidden />
          </SmartLink>
        </li>
      </ul>
    </nav>
  );
}
