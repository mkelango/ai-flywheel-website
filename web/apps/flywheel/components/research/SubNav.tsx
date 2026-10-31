import Link from "next/link";
import clsx from "clsx";

/** A horizontal row of sibling links (framework topics, trust pages). Scrolls inside itself on small screens. */
export function SubNav({ items, active, label }: { items: { href: string; label: string }[]; active?: string; label: string }) {
  return (
    <nav aria-label={label} className="border-b border-line">
      <div className="container-site">
        <ul className="-mb-px flex gap-1 overflow-x-auto">
          {items.map((i) => {
            const on = i.href === active;
            return (
              <li key={i.href} className="shrink-0">
                <Link
                  href={i.href}
                  aria-current={on ? "page" : undefined}
                  className={clsx(
                    "inline-flex min-h-11 items-center border-b-2 px-3 text-sm font-medium transition-colors",
                    on ? "border-primary text-ink" : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {i.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
