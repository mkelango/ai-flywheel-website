"use client";

import { Suspense, cloneElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CalendarCheck } from "lucide-react";
import clsx from "clsx";

type Data = { name: string; role: string; email: string; phone: string; school: string; board: string; city: string; students: string; whatsapp: boolean; consent: boolean };

const ROLES = ["Correspondent or owner", "Principal", "Academic coordinator or CS head", "Teacher", "Parent", "Government or Mission officer", "CSR funder", "School or centre hosting Kids camps"];
const BOARDS = ["CBSE", "ICSE", "TN State Board", "Other"];
const SIZES = ["Under 300", "300–800", "800–1,500", "1,500–3,000", "Over 3,000"];
const STEPS = ["You", "Your school", "Confirm"];

const empty: Data = { name: "", role: "", email: "", phone: "", school: "", board: "", city: "", students: "", whatsapp: false, consent: false };

/** Three-step demo booking. Adult data only. No backend in v1: nothing leaves the browser. */
export function DemoForm() {
  const id = useId();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const up = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));

  const validate = (s: number) => {
    const e: typeof errors = {};
    if (s === 0) {
      if (d.name.trim().length < 2) e.name = "Please enter your name.";
      if (!d.role) e.role = "Please choose your role.";
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Please enter a work or personal email.";
      if (d.phone && !/^[+\d][\d\s-]{7,}$/.test(d.phone)) e.phone = "Please check the phone number.";
      if (d.whatsapp && !d.phone) e.phone = "Add a phone number for WhatsApp.";
    }
    if (s === 1) {
      if (d.school.trim().length < 2) e.school = "Please enter the school’s name.";
      if (!d.board) e.board = "Please choose a board.";
      if (d.city.trim().length < 2) e.city = "Please enter the city.";
      if (!d.students) e.students = "Please choose a size.";
    }
    if (s === 2 && !d.consent) e.consent = "Please confirm so we can contact you.";
    setErrors(e);
    return Object.keys(e) as (keyof Data)[];
  };

  const next = (ev: FormEvent) => {
    ev.preventDefault();
    const bad = validate(step);
    if (bad.length) {
      document.getElementById(`${id}-${bad[0]}`)?.focus();
      return;
    }
    if (step < 2) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={reduce ? { duration: 0 } : undefined} className="card p-8 text-center md:p-12" role="status">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-highlight text-ink">
          <CalendarCheck className="size-8" aria-hidden />
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="mt-6 font-display text-3xl font-semibold text-ink outline-none">
          Thank you, {d.name.trim().split(/\s+/)[0]}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink-2">
          We’ll contact you within two working days to fix a date for {d.school || "your school"}.{d.whatsapp ? " We’ll message you on WhatsApp." : ""}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">Preview site: this request was not sent. Bookings open when the site goes live.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/check" className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-primary px-5 font-medium text-on-primary hover:bg-primary-hover">
            Take the School Flywheel Check <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/programmes" className="inline-flex min-h-11 items-center rounded-pill border border-ink/20 px-5 font-medium text-ink">
            See the curriculum
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={next} noValidate className="card p-6 md:p-9" aria-labelledby={`${id}-title`}>
      <Suspense fallback={null}>
        <RoleFromQuery onRole={(role) => up("role", role)} />
      </Suspense>
      <p id={`${id}-title`} className="sr-only">
        Book a school demo, step {step + 1} of 3
      </p>
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={clsx(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                i < step ? "bg-accent text-on-accent" : i === step ? "bg-primary text-on-primary" : "bg-surface-2 text-muted",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span className={clsx("hidden text-sm sm:inline", i === step ? "font-semibold text-ink" : "text-muted")}>{s}</span>
            {i < STEPS.length - 1 && <span className={clsx("h-0.5 flex-1 rounded-full", i < step ? "bg-accent" : "bg-line")} aria-hidden />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: reduce ? 0 : 0.25 }}>
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${id}-name`} label="Your name" error={errors.name}>
                <input id={`${id}-name`} autoComplete="name" value={d.name} onChange={(e) => up("name", e.target.value)} className={input(errors.name)} />
              </Field>
              <Field id={`${id}-role`} label="Your role" error={errors.role}>
                <select id={`${id}-role`} value={d.role} onChange={(e) => up("role", e.target.value)} className={input(errors.role)}>
                  <option value="">Choose…</option>
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field id={`${id}-email`} label="Email" error={errors.email}>
                <input id={`${id}-email`} type="email" autoComplete="email" value={d.email} onChange={(e) => up("email", e.target.value)} className={input(errors.email)} />
              </Field>
              <Field id={`${id}-phone`} label="Mobile (optional)" error={errors.phone}>
                <input id={`${id}-phone`} type="tel" autoComplete="tel" inputMode="tel" value={d.phone} onChange={(e) => up("phone", e.target.value)} className={input(errors.phone)} />
              </Field>
              <label id="whatsapp" className="flex min-h-11 items-start gap-3 rounded-2xl bg-bg p-4 text-[0.95rem] text-ink-2 sm:col-span-2">
                <input type="checkbox" checked={d.whatsapp} onChange={(e) => up("whatsapp", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]" />
                <span>
                  <span className="font-semibold text-ink">Message me on WhatsApp.</span> I agree that AI Flywheel may contact me on WhatsApp about this demo. I can reply STOP at any time.
                </span>
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${id}-school`} label="School name" error={errors.school} className="sm:col-span-2">
                <input id={`${id}-school`} autoComplete="organization" value={d.school} onChange={(e) => up("school", e.target.value)} className={input(errors.school)} />
              </Field>
              <fieldset className="sm:col-span-2" aria-describedby={errors.board ? `${id}-board-err` : undefined}>
                <legend className="mb-2 text-sm font-semibold text-ink">Board</legend>
                <div className="flex flex-wrap gap-2">
                  {BOARDS.map((b, i) => (
                    <label key={b} className={clsx("inline-flex min-h-11 cursor-pointer items-center rounded-pill border px-4 font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--primary)]", d.board === b ? "border-ink bg-ink text-inverse-ink" : "border-line text-ink-2 hover:border-ink/40")}>
                      <input type="radio" id={i === 0 ? `${id}-board` : undefined} name={`${id}-board`} value={b} checked={d.board === b} onChange={() => up("board", b)} className="sr-only" />
                      {b}
                    </label>
                  ))}
                </div>
                {errors.board && <p id={`${id}-board-err`} role="alert" className="mt-1.5 text-sm font-medium text-ink before:mr-1.5 before:inline-block before:size-2 before:rounded-full before:bg-ember">{errors.board}</p>}
              </fieldset>
              <Field id={`${id}-city`} label="City or district" error={errors.city}>
                <input id={`${id}-city`} autoComplete="address-level2" value={d.city} onChange={(e) => up("city", e.target.value)} className={input(errors.city)} />
              </Field>
              <Field id={`${id}-students`} label="Number of students" error={errors.students}>
                <select id={`${id}-students`} value={d.students} onChange={(e) => up("students", e.target.value)} className={input(errors.students)}>
                  <option value="">Choose…</option>
                  {SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
          )}
          {step === 2 && (
            <div>
              <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-bg p-5 sm:grid-cols-2">
                {(
                  [
                    ["Name", d.name],
                    ["Role", d.role],
                    ["Email", d.email],
                    ["Mobile", d.phone || "—"],
                    ["School", d.school],
                    ["Board", d.board],
                    ["City", d.city],
                    ["Students", d.students],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted">{k}</dt>
                    <dd className="break-words font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <label className="mt-5 flex min-h-11 items-start gap-3 text-[0.95rem] text-ink-2">
                <input
                  type="checkbox"
                  id={`${id}-consent`}
                  checked={d.consent}
                  onChange={(e) => up("consent", e.target.checked)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
                />
                <span>I’m an adult contact for this school. AI Flywheel may use these details to arrange a demo, and will record this consent with a date. No student details are asked for here.</span>
              </label>
              {errors.consent && <p id={`${id}-consent-err`} role="alert" className="mt-1.5 text-sm font-medium text-ink before:mr-1.5 before:inline-block before:size-2 before:rounded-full before:bg-ember">{errors.consent}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill px-4 font-medium text-ink hover:bg-ink/[0.05]">
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-pill bg-primary px-6 font-semibold text-on-primary shadow-[0_8px_24px_-12px_var(--primary)] hover:bg-primary-hover">
          {step < 2 ? "Continue" : "Book my demo"} <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}

function input(err?: string) {
  return clsx("h-12 w-full rounded-xl border bg-bg px-4 text-ink transition focus:border-primary", err ? "border-2 border-ember" : "border-ink/60");
}

const ROLE_QUERY: Record<string, string> = { parent: "Parent", mission: "Government or Mission officer", host: "School or centre hosting Kids camps" };

/** Links such as /demo?role=parent preselect the role, also when clicked while already on /demo. */
function RoleFromQuery({ onRole }: { onRole: (role: string) => void }) {
  const role = useSearchParams().get("role");
  useEffect(() => {
    if (role && ROLE_QUERY[role]) onRole(ROLE_QUERY[role]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);
  return null;
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
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-ink before:mr-1.5 before:inline-block before:size-2 before:rounded-full before:bg-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
