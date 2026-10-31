import { siteHref } from "@flywheel/ui/sites";
import type { HeaderCta, NavItem } from "@flywheel/ui/components/SiteHeader";
import type { FooterColumn } from "@flywheel/ui/components/SiteFooter";
import { AUDIENCES, STUDIOS } from "./content";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Studios",
    href: "/agentic",
    columns: [
      {
        title: "Four studios",
        links: STUDIOS.map((s) => ({ label: s.name, href: s.href, desc: `${s.verb} · ${s.status}`, color: s.color })),
      },
    ],
    featured: {
      eyebrow: "Opens Feb 2027",
      title: "Agentic Studio opens first.",
      text: "Build agents that act, from G1 to a tested kill switch.",
      href: "/early-access",
      cta: "Join early access",
    },
  },
  { label: "How it works", href: "/how-it-works" },
  {
    label: "For",
    href: "/for-learners",
    columns: [{ title: "Who builds here", links: AUDIENCES.map((a) => ({ label: a.label, href: a.href, desc: a.title })) }],
  },
  {
    label: "Platform",
    href: "/architecture",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Architecture", href: "/architecture", desc: "Nine layers, four planes" },
          { label: "Security and trust", href: "/security", desc: "SSO, residency, audit log" },
        ],
      },
      {
        title: "Plans",
        links: [
          { label: "Roadmap", href: "/roadmap", desc: "Agentic first, Feb 2027" },
          { label: "FAQ", href: "/faq", desc: "Opening, access, data" },
        ],
      },
    ],
  },
];

export const HEADER_CTAS: HeaderCta[] = [
  { label: "Sign in", href: "/sign-in", variant: "secondary" },
  { label: "Join early access", href: "/early-access", variant: "primary" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Studios", links: STUDIOS.map((s) => ({ label: s.name, href: s.href })) },
  { title: "For", links: AUDIENCES.map((a) => ({ label: a.label, href: a.href })) },
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Architecture", href: "/architecture" },
      { label: "Security", href: "/security" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "FAQ", href: "/faq" },
      { label: "Early access", href: "/early-access" },
      { label: "Sign in", href: "/sign-in" },
    ],
  },
  {
    title: "AI Flywheel",
    links: [
      { label: "Programmes", href: siteHref("flywheel", "/programmes") },
      { label: "Trust centre", href: siteHref("flywheel", "/trust") },
      { label: "Verify a credential", href: siteHref("flywheel", "/verify") },
      { label: "For schools", href: siteHref("schools", "/") },
    ],
  },
];
