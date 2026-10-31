import type { Metadata } from "next";
import { Check, Plus } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero } from "@/components/blocks";
import { BOARD_ROWS } from "@/lib/offer";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/programmes/boards");

export default function BoardsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes", href: "/programmes" }, { label: "Boards" }]}
        eyebrow="CBSE · ICSE · TN State Board"
        title="CBSE AI curriculum, Class 3 to 8: what we cover and add."
        intro="Our CBSE AI curriculum for Class 3 to 8 is based on CBSE’s Computational Thinking and AI syllabus, from 2026–27. ICSE and TN State Board maps too. Based on the published syllabus, not an accreditation."
        updated
        actions={
          <>
            <Button href="/demo">Book a school demo</Button>
            <Button href="/programmes" variant="secondary">
              See the programmes
            </Button>
          </>
        }
      />

      <QuickAnswers items={ANSWERS["/programmes/boards"]} eyebrow="CBSE Computational Thinking and AI" title="What schools ask about the CBSE AI curriculum" className="!pt-0" />

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="sr-only">What we cover and what we add, by board</h2>
          {/* Desktop: one table */}
          <div className="card hidden overflow-hidden md:block">
            <table className="w-full text-left">
              <caption className="sr-only">What we cover and what we add, by board</caption>
              <thead className="bg-surface-2/70 text-sm text-muted">
                <tr>
                  <th scope="col" className="w-[26%] p-5 font-semibold">Board</th>
                  <th scope="col" className="p-5 font-semibold">What we cover</th>
                  <th scope="col" className="p-5 font-semibold">What we add</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {BOARD_ROWS.map((b) => (
                  <tr key={b.board} className="align-top">
                    <th scope="row" className="p-5 font-normal">
                      <span className="block font-display text-lg font-semibold text-ink">{b.board}</span>
                      <span className="block text-ink-2">{b.classes}</span>
                      <span className="mt-1 block text-sm text-muted">Based on {b.basis}</span>
                      <span className="mt-2 inline-block">
                        <StatusTag status="Proposed" />
                      </span>
                    </th>
                    <td className="p-5">
                      <List items={b.cover} kind="cover" />
                    </td>
                    <td className="p-5">
                      <List items={b.add} kind="add" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per board */}
          <div className="grid gap-4 md:hidden">
            {BOARD_ROWS.map((b, i) => (
              <Reveal key={b.board} delay={i * 0.05} className="card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">{b.board}</h2>
                    <p className="text-ink-2">{b.classes}</p>
                  </div>
                  <StatusTag status="Proposed" />
                </div>
                <p className="mt-1 text-sm text-muted">Based on {b.basis}</p>
                <h3 className="mt-5 text-sm font-semibold text-ink">What we cover</h3>
                <div className="mt-2">
                  <List items={b.cover} kind="cover" />
                </div>
                <h3 className="mt-5 text-sm font-semibold text-ink">What we add</h3>
                <div className="mt-2">
                  <List items={b.add} kind="add" />
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm text-muted">
            Our reading of each board’s published syllabus. We share a class-by-class map with your coordinator before you start. All three maps, including ICSE, are Proposed until your coordinator reviews them. For the official syllabus, see{" "}
            <a href="https://cbseacademic.nic.in/" className="font-semibold text-ink underline underline-offset-4" rel="noopener">
              CBSE’s curriculum documents on cbseacademic.nic.in
            </a>
            .
          </p>
        </Container>
      </section>

      <RelatedLinks
        links={[
          { href: "/programmes/spark", label: "AI for Classes 3 to 5" },
          { href: "/programmes/practitioner", label: "AI for Classes 6 to 8" },
          { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
          { href: "/teachers", label: "AI training for teachers" },
        ]}
      />
      <DemoBand title="See the map for your board." line="We bring the class-by-class map to your demo." />
    </>
  );
}

function List({ items, kind }: { items: string[]; kind: "cover" | "add" }) {
  const I = kind === "cover" ? Check : Plus;
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-ink-2">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-ink" style={{ background: kind === "cover" ? "#DCEBFB" : "#FFE39A" }} aria-hidden>
            <I className="size-3.5" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}
