import type { ReactNode } from "react";
import clsx from "clsx";
import { Photo, type PhotoOverlay } from "@flywheel/ui/components/Media";
import { Blob } from "./art";

/**
 * Self-hosted Unsplash License photos (see public/images/manifest.json).
 * Adults, rooms, objects, robots and hands only: never identifiable children.
 * Each file is used at most three times across the site.
 */
export const PHOTO = {
  classroom: "/images/classroom-empty.jpg",
  boardroom: "/images/boardroom-training.jpg",
  overheadDesks: "/images/desks-overhead-hands.jpg",
  trainingRoom: "/images/teacher-training-room.jpg",
  workshop: "/images/workshop-presenter.jpg",
  loveToLearn: "/images/love-to-learn.jpg",
  robot: "/images/humanoid-robot.jpg",
  roboticsLab: "/images/robotics-lab-engineer.jpg",
  library: "/images/library-aisle.jpg",
  team: "/images/team-around-laptop.jpg",
  meeting: "/images/meeting-notes.jpg",
  appleBlocks: "/images/apple-books-blocks.jpg",
  books: "/images/books-stack.jpg",
  drawings: "/images/engineering-drawings.jpg",
} as const;

export type PhotoKey = keyof typeof PHOTO;

/** Hero art column: about 45% of the container from lg, full width below. */
const HERO_SIZES = "(min-width: 1280px) 540px, (min-width: 1024px) 42vw, 92vw";

/** Small floating-card heading, shared by every photo composition. */
export function FloatEyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{children}</p>;
}

/**
 * Layered hero: rounded photo with a slow drift, a brand blob behind it, an optional glass chip
 * top-right and a floating card that overlaps the photo's lower-left edge.
 * The page's only priority image. Same markup on server and client.
 */
export function HeroPhoto({
  photo,
  alt,
  card,
  chip,
  overlay = "soft",
  priority = true,
  sizes = HERO_SIZES,
  className,
  frameClassName = "aspect-[4/3] lg:aspect-[5/6]",
  blobColor,
  kenBurns = true,
}: {
  photo: PhotoKey;
  alt: string;
  card?: ReactNode;
  chip?: ReactNode;
  overlay?: PhotoOverlay;
  priority?: boolean;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  blobColor?: string;
  /** Slow drift; on for heroes only. */
  kenBurns?: boolean;
}) {
  return (
    <div className={clsx("relative isolate mx-auto w-full max-w-[540px]", card && "sm:pb-10", className)}>
      <Blob className="pointer-events-none absolute -left-10 -top-10 -z-10 w-[58%] opacity-70" color={blobColor} />
      <div aria-hidden className="photo-halo pointer-events-none absolute -bottom-2 -right-4 -z-10 h-3/5 w-3/5 rounded-[calc(var(--radius-card)+12px)]" />
      <Photo
        src={PHOTO[photo]}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        kenBurns={kenBurns}
        overlay={overlay}
        className={clsx("photo-shadow", frameClassName)}
      />
      {chip && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-surface/90 px-3 py-1.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-line backdrop-blur sm:right-4 sm:top-4">
          {chip}
        </span>
      )}
      {card && (
        <div className="float-card card relative z-10 mx-4 -mt-12 p-4 sm:absolute sm:bottom-0 sm:left-4 sm:mx-0 lg:-left-5 sm:mt-0 sm:w-[19rem] sm:p-5">{card}</div>
      )}
    </div>
  );
}

/** Section image: same layering as the hero, never priority, no drift. */
export function SectionPhoto(props: Omit<Parameters<typeof HeroPhoto>[0], "priority" | "kenBurns">) {
  return <HeroPhoto sizes="(min-width: 1024px) 540px, 92vw" {...props} priority={false} kenBurns={false} />;
}

/** Card thumbnail strip (decorative: the card text names the item). Zooms gently on card hover. */
export function CardThumb({ photo, sizes, className }: { photo: PhotoKey; sizes: string; className?: string }) {
  return <Photo src={PHOTO[photo]} alt="" fill sizes={sizes} className={clsx("thumb-zoom !rounded-none", className ?? "aspect-[16/9]")} />;
}
