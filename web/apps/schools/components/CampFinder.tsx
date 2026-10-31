"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, CalendarDays, Users, Check, PartyPopper } from "lucide-react";
import clsx from "clsx";
import { StatusTag } from "@flywheel/ui/components/primitives";
import { CAMPS, CITIES, type City } from "@/lib/data";

/** Find a camp near you: pick a city, see sample sessions, join the waitlist (adult email only, nothing sent). */
export function CampFinder() {
  const id = useId();
  const reduce = useReducedMotion();
  const [city, setCity] = useState<City>("Chennai");
  const [group, setGroup] = useState<"all" | "3-5" | "6-8">("all");
  const [joinedCity, setJoinedCity] = useState<City | null>(null);
  const joinedRef = useRef<HTMLParagraphElement>(null);
  const [consent, setConsent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const camps = CAMPS[city].filter((c) => group === "all" || c.classes.includes(group === "3-5" ? "3–5" : "6–8") || c.classes === "Classes 3–8");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a parent’s email address.");
    if (!consent) return setError("Please tick the consent box so we can write to you.");
    setError("");
    setJoinedCity(city);
  };

  // Move focus to the confirmation, so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (joinedCity) joinedRef.current?.focus();
  }, [joinedCity]);

  return (
    <div className="rounded-[32px] bg-surface p-5 shadow-[0_30px_60px_-40px_rgb(184_48_111/0.6)] ring-2 ring-[color-mix(in_oklab,var(--kids)_25%,transparent)] md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <fieldset>
          <legend className="mb-3 font-display font-semibold text-ink">Pick your city</legend>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <label
                key={c}
                className={clsx(
                  "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-pill border-2 px-5 font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                  city === c ? "border-[var(--kids)] bg-[var(--kids)] text-white" : "border-line text-ink hover:border-[var(--kids)]",
                )}
              >
                <input type="radio" name={`${id}-city`} value={c} checked={city === c} onChange={() => setCity(c)} className="sr-only" />
                <MapPin className="size-4" aria-hidden /> {c}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor={`${id}-group`} className="mb-2 block text-sm font-medium text-ink">
            Your child’s class
          </label>
          <select id={`${id}-group`} value={group} onChange={(e) => setGroup(e.target.value as typeof group)} className="h-12 w-full rounded-2xl border-2 border-ink/60 bg-bg px-4 font-medium text-ink md:w-48">
            <option value="all">Classes 3–8</option>
            <option value="3-5">Classes 3–5</option>
            <option value="6-8">Classes 6–8</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted">
        <StatusTag status="Illustrative scenario" /> Sample sessions. Real dates open with the waitlist.
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={city + group}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="mt-4 grid gap-3 md:grid-cols-2"
          aria-live="polite"
        >
          {camps.length === 0 && <li className="rounded-3xl bg-bg p-5 text-muted">No sample sessions for this class in {city} yet. Join the waitlist and we’ll tell you first.</li>}
          {camps.map((c) => (
            <li key={c.area + c.product} className="rounded-3xl bg-[color-mix(in_oklab,var(--kids)_7%,var(--bg))] p-5">
              <p className="font-display text-lg font-semibold text-ink">{c.product}</p>
              <ul className="mt-2 space-y-1 text-[0.95rem] text-ink-2">
                <li className="flex items-center gap-2">
                  <MapPin className="size-4" aria-hidden /> {c.place}, {c.area}
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden /> {c.dates}
                </li>
                <li className="flex items-center gap-2">
                  <Users className="size-4" aria-hidden /> {c.classes}
                </li>
              </ul>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="mt-6 rounded-3xl bg-highlight/60 p-5 md:p-6">
        {joinedCity === city ? (
          <p ref={joinedRef} tabIndex={-1} className="flex items-center gap-3 font-display text-lg font-semibold text-ink outline-none" role="status">
            <PartyPopper className="size-6" aria-hidden /> You’re on the {joinedCity} waitlist. We’ll write before dates open.
          </p>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="font-display text-lg font-semibold text-ink">Join the {city} waitlist</p>
            <p className="text-sm text-ink-2">A parent’s email only. We never ask for your child’s details here.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label htmlFor={`${id}-email`} className="sr-only">
                Parent’s email
              </label>
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                placeholder="Parent’s email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                className="h-12 flex-1 rounded-pill border-2 border-ink/60 bg-surface px-5 text-ink"
              />
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-[var(--kids)] px-6 font-semibold text-white hover:brightness-110">
                <Check className="size-4" aria-hidden /> Join waitlist
              </button>
            </div>
            <label className="mt-3 flex min-h-11 items-start gap-3 text-sm text-ink-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--kids)]" />
              I’m a parent or guardian, and I agree that AI Flywheel may email me about Kids camps. I can unsubscribe at any time.
            </label>
            {error && (
              <p id={`${id}-err`} className="mt-2 text-sm font-medium text-ink" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
