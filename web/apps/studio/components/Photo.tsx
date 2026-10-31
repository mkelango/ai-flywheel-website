import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

/**
 * Studio photo frame: next/image (fill), dimmed and tinted with a layer colour so the
 * photo never outshines the UI, plus a bottom shade for text contrast.
 * Ken Burns drift is CSS only (globals.css); prefers-reduced-motion stops it in base.css.
 */
export function StudioPhoto({
  src,
  alt,
  sizes,
  color = "#D98B0B",
  priority,
  kenBurns,
  position = "center",
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Layer colour for the duotone tint. */
  color?: string;
  priority?: boolean;
  kenBurns?: boolean;
  /** object-position for the crop. */
  position?: string;
  /** Frame size (aspect ratio or absolute inset). */
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={clsx("photo-frame relative isolate overflow-hidden bg-surface-2", className)} style={{ ["--tint" as string]: color } as CSSProperties}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={clsx("photo-img object-cover", kenBurns && "ken-burns", imgClassName)}
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="photo-tint pointer-events-none absolute inset-0" />
      <div aria-hidden className="photo-shade pointer-events-none absolute inset-0" />
    </div>
  );
}

/**
 * Layered hero composition: a tinted photo with a floating glass card (bottom-left)
 * and an optional chip (top-right). The card content must already exist in the page copy.
 */
export function PhotoStack({
  card,
  chip,
  className,
  ...photo
}: Parameters<typeof StudioPhoto>[0] & { card?: ReactNode; chip?: ReactNode }) {
  return (
    <div className={clsx("relative pb-10 sm:pb-12", className)}>
      <div aria-hidden className="absolute -inset-4 rounded-[32px] opacity-60 blur-3xl" style={{ background: `radial-gradient(60% 60% at 70% 30%, color-mix(in oklab, ${photo.color ?? "#D98B0B"} 35%, transparent), transparent)` }} />
      <StudioPhoto {...photo} className={clsx("aspect-[4/3] rounded-[calc(var(--radius-card)*1.6)] border border-line shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]")} />
      {chip && <div className="absolute right-4 top-4 z-10">{chip}</div>}
      {card && (
        <div className="glass absolute bottom-0 left-3 right-3 z-10 rounded-[var(--radius-card)] border border-line p-4 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9)] sm:right-auto sm:left-5 sm:w-[19rem] md:p-5 lg:-left-6">
          {card}
        </div>
      )}
    </div>
  );
}
