import { Download, FileDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Btn } from '../lib/primitives'
import { TOOLS, TOOL_GROUPS, toolFileContent } from '../data/toolkit'
import { downloadText } from '../lib/slug'

export default function Toolkit() {
  return (
    <>
      <Seo title="The Toolkit — 28 free tools" path="/toolkit"
        description="Every template, checklist, and diagnostic in the book — free to download and ready to use." />
      <PageHero
        eyebrow="The toolkit · 28 free tools"
        title={<>The field manual, <span className="text-shimmer">free to use</span>.</>}
        sub="Every template, checklist, and diagnostic in the book — stripped to its working form. Download any one, or take the whole kit. Honest scoring only: a flattering score is a wasted tool."
        accent="#E6B968"
      >
        <Btn href="/downloads/AI-Flywheel-Toolkit.md" className="">
          <FileDown className="h-4 w-4" /> Download the full toolkit
        </Btn>
      </PageHero>

      <Section>
        {TOOL_GROUPS.map((group) => (
          <div key={group} className="mb-12">
            <div className="mb-5 flex items-center gap-4">
              <h2 className="font-display text-xl font-bold text-cloud">{group}</h2>
              <span className="h-px flex-1 bg-hairline/40" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {TOOLS.filter((t) => t.group === group).map((t) => (
                <div key={t.slug} className="group flex h-full flex-col rounded-2xl border border-hairline/60 bg-panel/40 p-6 transition hover:border-gold/30">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[15px] font-semibold text-cloud">
                      <span className="font-mono text-gold">{String(t.n).padStart(2, '0')}</span> · {t.name}
                    </h3>
                    <span className="chip border-hairline text-faint">{t.chapter}</span>
                  </div>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted"><span className="text-mist">Use when:</span> {t.useWhen}</p>
                  <button onClick={() => downloadText(`${t.slug}.txt`, toolFileContent(t), 'text/plain')}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-hairline px-3.5 py-1.5 text-[12px] font-semibold text-mist transition hover:border-gold/50 hover:text-gold">
                    <Download className="h-3.5 w-3.5" /> Download template
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4 text-[13px] text-muted">
          Every tool serves one truth: it is almost never the model. It is data readiness, implementation discipline, workflow redesign, and governance.
        </p>
      </Section>
      <CTABand />
    </>
  )
}
