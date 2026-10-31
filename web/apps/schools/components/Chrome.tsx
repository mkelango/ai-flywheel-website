"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SiteHeader } from "@flywheel/ui/components/SiteHeader";
import { WheelMark } from "@flywheel/ui/components/WheelMark";
import { SmartLink, buttonClass } from "@flywheel/ui/components/primitives";
import { NAV, FAMILY_PATHS } from "@/lib/nav";
import { TA_PATHS } from "@/lib/ta";
import { WHATSAPP_URL } from "@/lib/contact";

function useFamily() {
  const path = usePathname() ?? "/";
  return FAMILY_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

/** Header: "Book a school demo" everywhere, "Find a Kids camp" on Parents and Kids pages. */
export function Header() {
  const family = useFamily();
  const ctas = family
    ? [{ label: "Find a Kids camp", href: "/kids/find", variant: "primary" as const }]
    : [{ label: "Book a school demo", href: "/demo", variant: "primary" as const }];
  return <SiteHeader current="schools" logo={<SchoolsLogo />} items={NAV} ctas={ctas} taPaths={TA_PATHS} searchHref="/search" />;
}

/** Sticky mobile bar: WhatsApp "Talk to us" plus the page's main action. */
export function MobileBar() {
  const family = useFamily();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 p-3 backdrop-blur xl:hidden">
      <div className="flex gap-2">
        <SmartLink href={WHATSAPP_URL} className={buttonClass("secondary", "md", "flex-1 bg-surface")}>
          <MessageCircle className="size-4" aria-hidden /> Talk to us
        </SmartLink>
        <SmartLink
          href={family ? "/kids/find" : "/demo"}
          className={buttonClass("primary", "md", family ? "flex-[1.4] !bg-[var(--kids)] hover:!brightness-110" : "flex-[1.4]")}
        >
          {family ? "Find a Kids camp" : "Book a demo"}
        </SmartLink>
      </div>
    </div>
  );
}

/** Logo lockup like the shared <Logo descriptor="at Schools" />, but the descriptor can hide on tight header widths. */
export function SchoolsLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <WheelMark size={30} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">AI Flywheel</span>
        <span className="logo-descriptor font-sans text-[0.95rem] font-medium text-muted">at Schools</span>
      </span>
    </span>
  );
}
