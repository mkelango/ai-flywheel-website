"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { siteHref } from "@flywheel/ui/sites";
import { CRM_TAGS } from "@/lib/nav";
import { getProgramme } from "@/lib/programmes";

type Tag = (typeof CRM_TAGS)[number]["value"];

const field = "h-12 w-full rounded-xl border border-ink/50 bg-bg px-4 text-ink placeholder:text-muted focus:border-ink";

/** Enquiry form. Every enquiry carries one CRM door tag. No backend in v1: shows a success state. */
export function ContactForm() {
  const [tag, setTag] = useState<Tag>("professionals");
  const [programme, setProgramme] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const sp = useSearchParams();
  useEffect(() => {
    const t = sp.get("tag");
    if (t && CRM_TAGS.some((c) => c.value === t)) setTag(t as Tag);
    const p = sp.get("programme");
    setProgramme(p && getProgramme(p) ? p : null);
    setSent(false);
  }, [sp]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card p-8 text-center md:p-12" role="status">
        <CircleCheck className="mx-auto size-10 text-physical" aria-hidden />
        <h2 ref={doneRef} tabIndex={-1} className="mt-4 font-display text-3xl font-semibold text-ink">Thank you. We&apos;ll be in touch.</h2>
        <p className="mt-2 text-muted">An adviser will reply by email. (Demo: nothing was sent.)</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 inline-flex min-h-11 items-center rounded-pill border border-line px-5 text-sm font-medium text-ink hover:border-ink/50">
          Send another
        </button>
      </div>
    );
  }

  const prog = programme ? getProgramme(programme) : undefined;
  const isSchools = tag === "schools" || tag === "kids";

  return (
    <form method="post" onSubmit={submit} className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <div className="md:col-span-2">
        <label htmlFor="tag" className="eyebrow mb-2 block">
          I&apos;m asking about
        </label>
        <select id="tag" name="tag" value={tag} onChange={(e) => setTag(e.target.value as Tag)} className={field}>
          {CRM_TAGS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {isSchools && (
          <p className="mt-2 text-sm text-ink-2">
            Schools and Kids enquiries are handled on{" "}
            <a href={siteHref("schools", "/")} className="font-medium underline underline-offset-4">
              AI Flywheel at Schools ↗
            </a>
          </p>
        )}
      </div>
      {prog && (
        <p className="rounded-xl bg-surface-2 px-4 py-3 text-sm text-ink md:col-span-2">
          Programme: <span className="font-semibold">{prog.title}</span> · next batch {prog.nextBatch}
        </p>
      )}
      <div>
        <label htmlFor="name" className="eyebrow mb-2 block">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">
          Work or personal email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="org" className="eyebrow mb-2 block">
          Organisation <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="org" name="org" autoComplete="organization" className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="msg" className="eyebrow mb-2 block">
          How can we help?
        </label>
        <textarea id="msg" name="msg" rows={4} className={`${field} h-auto py-3`} />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-2 md:col-span-2">
        <input type="checkbox" name="consent" className="mt-1 size-4 accent-[var(--primary)]" />
        Send me updates on batches and free resources. Optional; you can opt out any time.
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded-pill bg-primary px-7 font-medium text-on-primary hover:bg-primary-hover">
          Send enquiry
        </button>
      </div>
    </form>
  );
}
