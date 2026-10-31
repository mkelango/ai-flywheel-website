"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

const field = "h-12 w-full rounded-xl border border-ink/50 bg-bg px-4 text-ink placeholder:text-muted focus:border-ink";

/** Book a Flywheel Check for an organisation. CRM tag: business. No backend in v1: shows a success state. */
export function CheckForm({ tag = "business", cta = "Book a Flywheel Check" }: { tag?: string; cta?: string }) {
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card p-8 text-center md:p-12" role="status">
        <CircleCheck className="mx-auto size-10 text-physical" aria-hidden />
        <h2 ref={doneRef} tabIndex={-1} className="mt-4 font-display text-3xl font-semibold text-ink">Thank you. We&apos;ll be in touch.</h2>
        <p className="mt-2 text-muted">An adviser will reply by email to set a date. (Demo: nothing was sent.)</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 inline-flex min-h-11 items-center rounded-pill border border-line px-5 text-sm font-medium text-ink hover:border-ink/50">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={submit} className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <input type="hidden" name="tag" value={tag} />
      <div>
        <label htmlFor="cf-name" className="eyebrow mb-2 block">
          Name
        </label>
        <input id="cf-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className="eyebrow mb-2 block">
          Work email
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="cf-org" className="eyebrow mb-2 block">
          Organisation
        </label>
        <input id="cf-org" name="org" required autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="cf-size" className="eyebrow mb-2 block">
          People in scope
        </label>
        <select id="cf-size" name="size" className={field} defaultValue="">
          <option value="" disabled>
            Choose a range
          </option>
          <option>Under 50</option>
          <option>50–250</option>
          <option>250–1,000</option>
          <option>Over 1,000</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-msg" className="eyebrow mb-2 block">
          Where would you like AI to go first? <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea id="cf-msg" name="msg" rows={3} className={`${field} h-auto py-3`} />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-2 md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--primary)]" />
        <span>
          AI Flywheel may use these details to reply to me about this check.{" "}
          <Link href="/trust/privacy" className="font-medium underline underline-offset-4">
            Privacy
          </Link>
        </span>
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded-pill bg-primary px-7 font-medium text-on-primary hover:bg-primary-hover">
          {cta}
        </button>
      </div>
    </form>
  );
}
