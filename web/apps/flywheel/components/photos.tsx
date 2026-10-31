import type { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Photo, type PhotoOverlay } from "@flywheel/ui/components/Media";
import { Reveal } from "@flywheel/ui/components/interactive";

/**
 * Self-hosted Unsplash License photos (see public/images/manifest.json).
 * Each file is used at most three times across the site.
 */
export const PHOTO = {
  codingPair: "/images/students-coding-together.jpg",
  studentsCafe: "/images/students-laptops-cafe.jpg",
  teamLaptop: "/images/team-around-laptop.jpg",
  tablet: "/images/students-tablet-discussion.jpg",
  classroom: "/images/college-classroom.jpg",
  lectureHall: "/images/lecture-hall.jpg",
  workshop: "/images/workshop-sticky-notes.jpg",
  highFive: "/images/business-high-five.jpg",
  teamMeeting: "/images/team-meeting-laptops.jpg",
  boardroom: "/images/boardroom-training.jpg",
  openOffice: "/images/open-office-gcc.jpg",
  coworking: "/images/coworking-startup.jpg",
  engineers: "/images/engineers-at-desks.jpg",
  dataCentre: "/images/data-centre-engineer.jpg",
  robotics: "/images/robotics-lab-engineer.jpg",
  planning: "/images/planning-board.jpg",
  meetingNotes: "/images/meeting-notes.jpg",
  portrait: "/images/professional-portrait.jpg",
  laptopWindow: "/images/laptop-desk-window.jpg",
  laptopPhone: "/images/laptop-and-phone.jpg",
  library: "/images/library-aisle.jpg",
  generative: "/images/generative-light.jpg",
} as const;

export type PhotoKey = keyof typeof PHOTO;

/** One photo per stage, shared by stage-keyed card grids and lab pages. */
export const STAGE_PHOTO = {
  agentic: "engineers",
  foundation: "dataCentre",
  generative: "generative",
  physical: "robotics",
} as const satisfies Record<string, PhotoKey>;

/** Lab slug to stage photo. */
export const LAB_PHOTO: Record<string, PhotoKey> = {
  agentic: STAGE_PHOTO.agentic,
  model: STAGE_PHOTO.foundation,
  generative: STAGE_PHOTO.generative,
  robotic: STAGE_PHOTO.physical,
};

/** Hero art column: a 5/12 column from lg, capped at 480px below. */
const HERO_SIZES = "(min-width: 1280px) 480px, (min-width: 1024px) 38vw, (min-width: 640px) 480px, 92vw";

/** Small floating-card heading. */
export function FloatEyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">{children}</p>;
}

/**
 * Layered hero: tinted backplate, rounded photo with a slow drift, an optional glass chip top-right
 * and a floating card overlapping the lower-left edge. The page's only priority image.
 */
export function HeroPhoto({
  photo,
  alt,
  card,
  chip,
  overlay = "soft",
  frameClassName = "aspect-[4/3] lg:aspect-[6/5]",
  className,
  plate = "bg-highlight/60",
}: {
  photo: PhotoKey;
  alt: string;
  card?: ReactNode;
  chip?: ReactNode;
  overlay?: PhotoOverlay;
  frameClassName?: string;
  className?: string;
  /** Backplate colour class. */
  plate?: string;
}) {
  return (
    <div className={clsx("relative isolate mx-auto w-full max-w-[480px]", card && "sm:pb-10 sm:pl-8", className)}>
      <div aria-hidden className={clsx("pointer-events-none absolute -right-3 -top-3 -z-10 h-3/4 w-3/4 rotate-2 rounded-[calc(var(--radius-card)+10px)]", plate)} />
      <Photo
        src={PHOTO[photo]}
        alt={alt}
        fill
        sizes={HERO_SIZES}
        priority
        kenBurns
        overlay={overlay}
        className={clsx(frameClassName, "shadow-[0_40px_80px_-40px_rgb(10_19_31/0.55)] ring-1 ring-ink/5")}
      />
      {chip && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-pill border border-white/40 bg-surface/90 px-3 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
          {chip}
        </span>
      )}
      {card && (
        <Reveal delay={0.25} className="relative z-10 mx-4 -mt-12 sm:absolute sm:bottom-0 sm:left-0 sm:mx-0 sm:mt-0 sm:w-64">
          <div className="card p-4 shadow-[0_24px_48px_-24px_rgb(10_19_31/0.5)]">{card}</div>
        </Reveal>
      )}
    </div>
  );
}

/** In-section photo with an optional floating card. Lazy, never priority. */
export function SectionPhoto({
  photo,
  alt,
  sizes,
  card,
  overlay = "none",
  frameClassName = "aspect-[4/3]",
  className,
}: {
  photo: PhotoKey;
  alt: string;
  sizes: string;
  card?: ReactNode;
  overlay?: PhotoOverlay;
  frameClassName?: string;
  className?: string;
}) {
  return (
    <div className={clsx("relative isolate", card && "sm:pb-8", className)}>
      <Photo src={PHOTO[photo]} alt={alt} fill sizes={sizes} overlay={overlay} className={clsx(frameClassName, "ring-1 ring-ink/5")} />
      {card && (
        <Reveal delay={0.15} className="relative z-10 mx-4 -mt-10 sm:absolute sm:bottom-0 sm:right-6 sm:mx-0 sm:mt-0 sm:max-w-xs">
          <div className="card p-4 shadow-[0_24px_48px_-24px_rgb(10_19_31/0.5)]">{card}</div>
        </Reveal>
      )}
    </div>
  );
}

/**
 * Full-bleed thumbnail for the top of a card (the card supplies overflow-hidden and the hover lift).
 * Decorative by default: the card's own text names the link.
 */
export function CardThumb({ photo, sizes, alt = "", className, children }: { photo: PhotoKey; sizes: string; alt?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={clsx("relative aspect-[16/9] overflow-hidden bg-surface-2", className)}>
      <Image
        src={PHOTO[photo]}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
      />
      <div aria-hidden className="photo-overlay-soft pointer-events-none absolute inset-0 opacity-70" />
      {children}
    </div>
  );
}
