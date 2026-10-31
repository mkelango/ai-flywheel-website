"use client";

import { Printer } from "lucide-react";
import { buttonClass } from "@flywheel/ui/components/primitives";

/** "Print or save as PDF" button, plus print rules that keep only the page body on paper. */
export function PrintButton({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  return (
    <>
      <button type="button" onClick={() => window.print()} className={buttonClass(variant, "lg", "print:hidden")}>
        <Printer className="size-4" aria-hidden />
        Print or save as PDF
      </button>
      <style>{`@media print {
  body > *:not(main) { display: none !important; }
  body { background: #fff !important; }
  .print-keep { break-inside: avoid; }
  a[href]::after { content: none !important; }
}`}</style>
    </>
  );
}
