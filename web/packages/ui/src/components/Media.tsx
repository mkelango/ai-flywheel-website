import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";

export type PhotoOverlay = "none" | "soft" | "dark" | "duotone";

export type PhotoProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Fill the frame; give the frame a size via className (e.g. "aspect-[4/3]"). */
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Slow scale drift (CSS only; stopped by prefers-reduced-motion). */
  kenBurns?: boolean;
  overlay?: PhotoOverlay;
};

const overlayClass: Record<Exclude<PhotoOverlay, "none">, string> = {
  soft: "photo-overlay-soft",
  dark: "photo-overlay-dark",
  duotone: "photo-overlay-duotone",
};

/**
 * Rounded, overflow-hidden next/image frame with optional Ken Burns drift and a theme-token overlay.
 * Same markup on server and client.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
  kenBurns = false,
  overlay = "none",
}: PhotoProps) {
  const useFill = fill || !width || !height;
  return (
    <div
      className={clsx(
        "relative isolate overflow-hidden rounded-[var(--radius-card)] bg-surface-2",
        useFill && !className && "aspect-[4/3]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        {...(useFill ? { fill: true } : { width, height })}
        sizes={sizes}
        priority={priority}
        className={clsx(
          useFill ? "object-cover" : "h-auto w-full object-cover",
          overlay === "duotone" && "grayscale-[0.6]",
          kenBurns && "ken-burns",
        )}
      />
      {overlay !== "none" && (
        <div aria-hidden className={clsx("pointer-events-none absolute inset-0", overlayClass[overlay])} />
      )}
    </div>
  );
}

export type PhotoCardProps = PhotoProps & {
  /** Floating card content, pinned bottom-left from sm up; stacks under the photo below sm. */
  children?: ReactNode;
  /** Class for the outer wrapper. */
  wrapperClassName?: string;
  /** Class for the floating card. */
  cardClassName?: string;
};

/** Photo with a floating theme card (bottom-left) for a caption, stat label or quote. */
export function PhotoCard({ children, wrapperClassName, cardClassName, ...photo }: PhotoCardProps) {
  return (
    <div className={clsx("relative", wrapperClassName)}>
      <Photo {...photo} />
      {children != null && (
        <div
          className={clsx(
            "card relative z-10 mt-3 p-4 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.3)]",
            "sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-xs",
            cardClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
