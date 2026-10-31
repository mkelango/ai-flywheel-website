import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "accent";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover shadow-[0_8px_24px_-12px_var(--primary)]",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink/60 hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.06]",
  inverse: "bg-inverse text-inverse-ink hover:opacity-90",
  accent: "bg-accent text-on-accent hover:brightness-105",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98] min-h-11",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = { href?: string; variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode } & Omit<
  ComponentProps<"button">,
  "className" | "children"
>;

/** Renders a Next link when given an href (external links get a plain anchor), otherwise a button. */
export function Button({ href, variant, size, className, children, ...rest }: ButtonProps) {
  const cls = buttonClass(variant, size, className);
  if (href) {
    return href.startsWith("http") ? (
      <a href={href} className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  return href.startsWith("http") ? (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("container-site", className)}>{children}</div>;
}

/** A page section with an optional eyebrow, heading and intro. Keeps copy short by design. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  className,
  center,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  className?: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={clsx("py-16 md:py-24", className)}>
      <Container>
        {(eyebrow || title || intro) && (
          <header className={clsx("mb-10 md:mb-14 max-w-2xl", center && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.1] font-semibold text-ink">{title}</h2>}
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Pill({ children, color, className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span
      className={clsx("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider", className)}
      style={color ? { background: `color-mix(in oklab, ${color} 14%, transparent)`, color } : undefined}
    >
      {color && <span className="size-1.5 rounded-full" style={{ background: color }} />}
      {children}
    </span>
  );
}

/** Small label for claim status, per the "never a claim without evidence" rule. */
export function StatusTag({ status }: { status: "Real" | "Pilot" | "Illustrative scenario" | "Proposed" | "Ed 1.1" }) {
  return <span className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">{status}</span>;
}

/** Resolve a breadcrumb href against an optional absolute base ("https://aiflywheel.in"). */
function breadcrumbUrl(href: string, base?: string) {
  if (!base || /^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  try {
    return new URL(href, base.endsWith("/") ? base : `${base}/`).toString();
  } catch {
    return href;
  }
}

/**
 * Visible breadcrumb trail plus schema.org BreadcrumbList JSON-LD.
 * Pass `base` (site origin) so item URLs are absolute; without it they stay relative.
 * The last item (no href) is the current page and is emitted without an item URL.
 */
export function Breadcrumbs({ items, base }: { items: { label: string; href?: string }[]; base?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(item.href && !isLast ? { item: breadcrumbUrl(item.href, base) } : {}),
      };
    }),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>›</span>}
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-6 items-center py-1 hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex min-h-6 items-center py-1 text-ink" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
