import clsx from "clsx";
import { Scale } from "lucide-react";

/** Banner on every Trust centre sub-page: these are drafts until the legal review is done. */
export function LegalBanner({ className }: { className?: string }) {
  return (
    <div role="note" className={clsx("flex gap-3 rounded-[var(--radius-card)] border border-dashed border-ink/25 bg-highlight/40 p-4 text-ink-2 md:p-5", className)}>
      <Scale className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
      <p>
        <span className="font-semibold text-ink">Published after legal review.</span> This is our working draft. The DPDP processor model needs a legal opinion, so the final text may change before it is published as a policy.
      </p>
    </div>
  );
}

/** Small paper-and-pencil doodle for guide and sampler headers. */
export function PaperDoodle({ className, color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden>
      <rect x="22" y="14" width="92" height="96" rx="12" fill="#FFF7E8" stroke="#1E2A44" strokeOpacity=".2" strokeWidth="3" transform="rotate(-6 68 62)" />
      <path d="M40 44h52M40 60h40M40 76h48" stroke="#1E2A44" strokeOpacity=".45" strokeWidth="5" strokeLinecap="round" transform="rotate(-6 68 62)" />
      <g transform="rotate(32 124 64)">
        <rect x="116" y="18" width="16" height="78" rx="4" fill="#F2B705" />
        <path d="M116 96l8 16 8-16z" fill="#E9B48A" />
        <rect x="116" y="18" width="16" height="10" rx="3" fill={color} />
      </g>
      <path d="M128 18l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" fill={color} className="spin-slow" />
    </svg>
  );
}
