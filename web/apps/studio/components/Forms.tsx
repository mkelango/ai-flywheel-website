"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CircleCheck, Info } from "lucide-react";
import clsx from "clsx";
import { buttonClass } from "@flywheel/ui/components/primitives";
import { STUDIOS } from "@/lib/content";

const fieldBase =
  "block h-12 w-full rounded-lg border border-ink/40 bg-bg px-3.5 text-[0.95rem] text-ink placeholder:text-muted/80 transition-colors focus:border-primary";
const field = `${fieldBase} mt-2`;

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-2">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

/** Moves focus to a success message once it mounts, so keyboard and screen-reader users land on it. */
function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => ref.current?.focus(), []);
  return ref;
}

function Success({ title, line }: { title: string; line: string }) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-6">
      <span className="grid size-12 place-items-center rounded-full bg-highlight text-agentic">
        <CircleCheck className="size-6" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold text-ink">
        {title}
      </h2>
      <p className="text-muted">{line}</p>
    </div>
  );
}

const ROLES = ["Cohort learner", "Student (18+)", "Faculty or Campus Lab lead", "Teacher (school)", "Enterprise builder", "Enterprise leader", "Other"];

/** Early-access form. No backend yet: it validates in the browser and shows a success state. */
export function EarlyAccessForm() {
  const [done, setDone] = useState(false);
  const [studios, setStudios] = useState<string[]>(["agentic"]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) setDone(true);
  };

  if (done) return <Success title="You're on the list." line="We'll write when Agentic Studio opens at the Inevitable Summit, February 2027. Nothing else." />;

  return (
    <form method="post" onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required autoComplete="name" className={field} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={field} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Role">
          <select name="role" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field label="Organisation" hint="College, school or company. Optional.">
          <input name="org" autoComplete="organization" className={field} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink-2">Studio interest</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {STUDIOS.map((s) => {
            const on = studios.includes(s.key);
            return (
              <label
                key={s.key}
                className={clsx(
                  "flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border px-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary",
                  on ? "border-ink/40 bg-surface-2 text-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                <input
                  type="checkbox"
                  name="studios"
                  value={s.key}
                  checked={on}
                  onChange={() => setStudios(on ? studios.filter((k) => k !== s.key) : [...studios, s.key])}
                  className="sr-only"
                />
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="min-w-0">
                  {s.name.replace(" Studio", "")} <span className="font-mono text-[0.65rem] text-muted">{s.statusShort}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-ink-2">
        <input type="checkbox" name="consent" required className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]" />
        <span>
          I am 18 or over, and I agree that AI Flywheel may email me about Studio early access. I can unsubscribe at any time.
        </span>
      </label>

      <button type="submit" className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
        Join early access <ArrowRight className="size-4" />
      </button>
      <p className="text-xs text-muted">Under 18? Your teacher or school sets up your Studio account.</p>
    </form>
  );
}

/** Compact "notify me" for studios that open in FY28. */
function NotifySuccess({ studio, color }: { studio: string; color: string }) {
  const ref = useFocusOnMount<HTMLParagraphElement>();
  return (
    <p ref={ref} tabIndex={-1} role="status" className="inline-flex items-center gap-2 text-ink">
      <CircleCheck className="size-5" style={{ color }} /> We'll tell you when {studio} opens.
    </p>
  );
}

export function NotifyForm({ studio, color }: { studio: string; color: string }) {
  const [done, setDone] = useState(false);
  if (done) return <NotifySuccess studio={studio} color={color} />;
  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) setDone(true);
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <label className="sr-only" htmlFor={`notify-${studio}`}>
        Email
      </label>
      <input id={`notify-${studio}`} type="email" required placeholder="you@example.com" autoComplete="email" className={clsx(fieldBase, "rounded-pill")} />
      <button type="submit" className={buttonClass("inverse", "md", "shrink-0")}>
        Notify me
      </button>
    </form>
  );
}

/** Non-functional sign-in UI. Studio opens Feb 2027; no auth happens here. */
export function SignInMock() {
  const [note, setNote] = useState(false);
  const stop = (e: FormEvent) => {
    e.preventDefault();
    setNote(true);
  };
  return (
    <form method="post" onSubmit={stop} className="space-y-4">
      <Field label="Work or college email">
        <input type="email" name="email" autoComplete="email" placeholder="you@college.edu" className={field} />
      </Field>
      <button type="submit" className={buttonClass("primary", "md", "w-full")}>
        Continue
      </button>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>
      <button type="button" onClick={() => setNote(true)} className={buttonClass("secondary", "md", "w-full")}>
        Continue with SSO
      </button>
      {note && (
        <p role="status" className="flex items-start gap-2 rounded-lg border border-line bg-surface-2 p-3 text-sm text-ink-2">
          <Info className="mt-0.5 size-4 shrink-0 text-agentic" />
          Sign-in isn't live yet. Studio opens in February 2027; join early access to be first in.
        </p>
      )}
    </form>
  );
}
