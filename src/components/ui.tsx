import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

/** The page column: full width up to 1440px with 60px gutters on desktop. */
export const wrap = "mx-auto w-full max-w-[90rem] px-6 sm:px-15";

/** Gray text link with a trailing arrow, e.g. "Learn more →". */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const Arrow = /^https?:/.test(href) ? ArrowUpRight : ArrowRight;
  const classes = `group inline-flex min-h-8 items-center gap-2 text-sm text-muted transition-colors hover:text-ink ${className}`;
  const inner = (
    <>
      {children}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** A page's opening block: label, headline and intro paragraph. */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-[40rem]">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="headline mt-5 text-balance text-4xl leading-[1.15]">{title}</h1>
      {children && <div className="mt-7 text-base leading-[26px] font-light text-muted">{children}</div>}
    </header>
  );
}

/** A section heading with its content directly underneath. */
export function Section({
  title,
  children,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="headline text-2xl leading-[1.25]">{title}</h2>
      <div className="mt-5 max-w-[40rem] text-base leading-[26px] font-light text-muted">{children}</div>
    </section>
  );
}
