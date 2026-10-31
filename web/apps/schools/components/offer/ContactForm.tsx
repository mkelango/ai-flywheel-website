"use client";

import { Suspense, cloneElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MailCheck } from "lucide-react";
import clsx from "clsx";
import { CONTACT_TOPICS } from "@/lib/offer";

type Topic = (typeof CONTACT_TOPICS)[number]["key"];
type Data = { topic: Topic | ""; name: string; email: string; phone: string; org: string; message: string; whatsapp: boolean; consent: boolean };
const empty: Data = { topic: "", name: "", email: "", phone: "", org: "", message: "", whatsapp: false, consent: false };

/** Contact form. Adult details only. No backend in v1: nothing leaves the browser. */
export function ContactForm() {
  const id = useId();
  const [d, setD] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const up = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!d.topic) e.topic = "Please choose what this is about.";
    if (d.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Please enter your email.";
    if (d.phone && !/^[+\d][\d\s-]{7,}$/.test(d.phone)) e.phone = "Please check the phone number.";
    if (d.whatsapp && !d.phone) e.phone = "Add a phone number for WhatsApp.";
    if (d.message.trim().length < 5) e.message = "Please add a short message.";
    if (!d.consent) e.consent = "Please confirm so we can reply.";
    setErrors(e);
    const first = Object.keys(e)[0] as keyof Data | undefined;
    if (!first) setDone(true);
    else document.getElementById(`${id}-${first}`)?.focus();
  };

  if (done) {
    return (
      <div className="card p-8 text-center md:p-12" role="status">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-highlight text-ink">
          <MailCheck className="size-8" aria-hidden />
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="mt-6 font-display text-3xl font-semibold text-ink outline-none">
          Thank you, {d.name.trim().split(/\s+/)[0]}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink-2">We reply within two working days{d.whatsapp ? ", on WhatsApp or email" : ", by email"}.</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">Preview site: this message was not sent. The form opens when the site goes live.</p>
        <Link href="/" className="mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-pill border border-ink/20 px-5 font-medium text-ink">
          Back to home <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card p-6 md:p-9" aria-label="Contact us">
      <Suspense fallback={null}>
        <TopicFromQuery onTopic={(topic) => up("topic", topic)} />
      </Suspense>
      <fieldset aria-describedby={errors.topic ? `${id}-topic-err` : undefined}>
        <legend className="mb-3 text-sm font-semibold text-ink">What is this about?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_TOPICS.map((t, i) => (
            <label key={t.key} className={clsx("flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--primary)]", d.topic === t.key ? "border-ink bg-ink text-inverse-ink" : "border-line text-ink hover:border-ink/40")}>
              <input type="radio" id={i === 0 ? `${id}-topic` : undefined} name={`${id}-topic`} value={t.key} checked={d.topic === t.key} onChange={() => up("topic", t.key)} className="sr-only" />
              <span className={clsx("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border", d.topic === t.key ? "border-accent bg-accent text-on-accent" : "border-ink/60")} aria-hidden>
                {d.topic === t.key && <Check className="size-3.5" />}
              </span>
              <span>
                <span className="block font-semibold">{t.label}</span>
                <span className={clsx("block text-sm", d.topic === t.key ? "opacity-80" : "text-muted")}>{t.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.topic && <Err id={`${id}-topic-err`}>{errors.topic}</Err>}
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Your name" error={errors.name}>
          <input id={`${id}-name`} autoComplete="name" value={d.name} onChange={(e) => up("name", e.target.value)} className={input(errors.name)} />
        </Field>
        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <input id={`${id}-email`} type="email" autoComplete="email" value={d.email} onChange={(e) => up("email", e.target.value)} className={input(errors.email)} />
        </Field>
        <Field id={`${id}-phone`} label="Mobile (optional)" error={errors.phone}>
          <input id={`${id}-phone`} type="tel" autoComplete="tel" inputMode="tel" value={d.phone} onChange={(e) => up("phone", e.target.value)} className={input(errors.phone)} />
        </Field>
        <Field id={`${id}-org`} label="School or organisation (optional)">
          <input id={`${id}-org`} autoComplete="organization" value={d.org} onChange={(e) => up("org", e.target.value)} className={input()} />
        </Field>
        <Field id={`${id}-message`} label="Your message" error={errors.message} className="sm:col-span-2">
          <textarea id={`${id}-message`} rows={4} value={d.message} onChange={(e) => up("message", e.target.value)} className={clsx(input(errors.message), "h-auto py-3")} aria-describedby={`${id}-msg-hint`} />
        </Field>
        <p id={`${id}-msg-hint`} className="-mt-3.5 text-sm text-muted sm:col-span-2">
          Please don’t include any child’s name or details.
        </p>
        <label className="flex min-h-11 items-start gap-3 rounded-2xl bg-bg p-4 text-[0.95rem] text-ink-2 sm:col-span-2">
          <input type="checkbox" checked={d.whatsapp} onChange={(e) => up("whatsapp", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]" />
          <span>
            <span className="font-semibold text-ink">Reply to me on WhatsApp.</span> I agree that AI Flywheel may contact me on WhatsApp about this message. I can reply STOP at any time.
          </span>
        </label>
        <div className="sm:col-span-2">
          <label className="flex min-h-11 items-start gap-3 text-[0.95rem] text-ink-2">
            <input
              type="checkbox"
              id={`${id}-consent`}
              checked={d.consent}
              onChange={(e) => up("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
              className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
            />
            <span>I’m an adult. AI Flywheel may use these details to reply to me, and will record this consent with a date.</span>
          </label>
          {errors.consent && <Err id={`${id}-consent-err`}>{errors.consent}</Err>}
        </div>
      </div>

      <button type="submit" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill bg-primary px-6 font-semibold text-on-primary shadow-[0_8px_24px_-12px_var(--primary)] hover:bg-primary-hover">
        Send message <ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  );
}

function input(err?: string) {
  return clsx("h-12 w-full rounded-xl border bg-bg px-4 text-ink transition focus:border-primary", err ? "border-2 border-ember" : "border-ink/60");
}

/** Links such as /contact?topic=grievance preselect the topic, also when clicked while already on /contact. */
function TopicFromQuery({ onTopic }: { onTopic: (topic: Topic) => void }) {
  const topic = useSearchParams().get("topic");
  useEffect(() => {
    const match = CONTACT_TOPICS.find((t) => t.key === topic);
    if (match) onTopic(match.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
  return null;
}

function Err({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-ink before:mr-1.5 before:inline-block before:size-2 before:rounded-full before:bg-ember" role="alert">
      {children}
    </p>
  );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: ReactElement<{ "aria-invalid"?: boolean; "aria-describedby"?: string }> }) {
  // Tie the error to its control, keeping any hint the control already points at.
  const hint = children.props["aria-describedby"];
  const describedBy = [error ? `${id}-err` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {cloneElement(children, { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {error && <Err id={`${id}-err`}>{error}</Err>}
    </div>
  );
}
