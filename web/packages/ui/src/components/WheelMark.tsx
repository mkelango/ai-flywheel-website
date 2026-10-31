"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  size?: number;
  /** Spin once on mount (instant under reduced motion; same markup on server and client). */
  animate?: boolean;
  hub?: string;
  className?: string;
  title?: string;
};

const ARCS = ["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"];

/** One wheel for all three brands: four arcs in the layer colours, an ember hub. */
export function WheelMark({ size = 32, animate = false, hub = "#D9542A", className, title = "AI Flywheel" }: Props) {
  const reduce = useReducedMotion();
  const r = 40;
  const c = 2 * Math.PI * r;
  const seg = c / 4;
  const gap = 7;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        initial={animate ? { rotate: -90, opacity: 0 } : false}
        animate={animate ? { rotate: 0, opacity: 1 } : undefined}
        transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {ARCS.map((color, i) => (
          <circle
            key={color}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${seg - gap} ${c - seg + gap}`}
            strokeDashoffset={-i * seg}
            transform="rotate(-90 50 50)"
          />
        ))}
      </motion.g>
      <circle cx="50" cy="50" r="13" fill={hub} />
    </svg>
  );
}

/** Wordmark lockup: wheel + "AI Flywheel" + optional descriptor ("at Schools", "Studio"). */
export function Logo({ descriptor, size = 30, className }: { descriptor?: string; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <WheelMark size={size} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">AI Flywheel</span>
        {descriptor ? <span className="font-sans text-[0.95rem] font-medium text-muted">{descriptor}</span> : null}
      </span>
    </span>
  );
}
