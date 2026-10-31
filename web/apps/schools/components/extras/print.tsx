"use client";

import clsx from "clsx";
import { Printer } from "lucide-react";
import { buttonClass } from "@flywheel/ui/components/primitives";

/** "Print or save as PDF": opens the browser print dialog. Hidden when printing. */
export function PrintButton({ className, label = "Print or save as PDF" }: { className?: string; label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("secondary", "md", clsx("bg-surface print:hidden", className))}>
      <Printer className="size-4" aria-hidden /> {label}
    </button>
  );
}

/**
 * Print styles: only the element marked data-print-area prints (header, footer and sticky bars drop out).
 * Plain CSS, no external assets.
 */
export function PrintStyles() {
  return (
    <style>{`
@media print {
  @page { margin: 14mm; }
  html, body { background: #fff !important; }
  body * { visibility: hidden; }
  [data-print-area], [data-print-area] * { visibility: visible; }
  [data-print-area] { position: absolute; inset: 0 auto auto 0; width: 100%; }
  [data-print-area] .print\\:hidden { display: none !important; }
  [data-print-area] .card, [data-print-area] [data-print-card] { box-shadow: none !important; break-inside: avoid; }
  [data-print-area] a { text-decoration: none; color: inherit; }
}
`}</style>
  );
}
