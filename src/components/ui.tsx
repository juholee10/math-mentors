import Link from "next/link";
import type { ReactNode } from "react";

/** The page column. */
export const wrap = "mx-auto w-full max-w-[72rem] px-5 sm:px-8";

/** A page's title and opening paragraph. */
export function PageHead({ title, children, aside }: { title: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="flex flex-col gap-6 pt-14 pb-10 sm:pt-20 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[44rem]">
        <h1 className="font-display text-[2.1rem] leading-[1.12] font-semibold tracking-[-0.015em] text-balance sm:text-[2.6rem]">
          {title}
        </h1>
        {children && <div className="mt-4 text-[1.08rem] leading-[1.65] text-muted">{children}</div>}
      </div>
      {aside}
    </header>
  );
}

/** A section heading. */
export function H2({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`font-display text-[1.4rem] leading-tight font-semibold tracking-[-0.01em] ${className}`}>
      {children}
    </h2>
  );
}

const linkClass =
  "underline decoration-edge decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-rule";

/** An inline text link. Handles internal routes, mailto and external URLs. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (/^(https?:|mailto:)/.test(href) || /\.pdf$/.test(href)) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={`${linkClass} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${linkClass} ${className}`}>
      {children}
    </Link>
  );
}

/** A solid action, styled like a typed label on a drawer front. */
export function Action({
  href,
  children,
  variant = "solid",
  download,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "plain";
  download?: boolean;
  className?: string;
}) {
  const classes = `inline-flex min-h-11 items-center gap-2.5 rounded-[3px] px-4 font-display text-[0.95rem] font-semibold transition-colors ${
    variant === "solid"
      ? "bg-ink text-card hover:bg-[#2c3650]"
      : "border border-ink/30 bg-card text-ink hover:border-ink"
  } ${className}`;
  if (/^(https?:|mailto:)/.test(href) || /\.pdf$/.test(href)) {
    return (
      <a href={href} className={classes} download={download}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** A catalog card with a heading row above its red rule. */
export function Card({
  title,
  meta,
  children,
  className = "",
  as: Tag = "section",
  headingLevel = 2,
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Tag className={`card ${className}`}>
      {title && (
        <div className="card-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-4 pb-2.5 sm:px-6">
          <Heading className="font-display text-[1.05rem] font-semibold">{title}</Heading>
          {meta && <p className="typed text-[0.82rem] text-faint">{meta}</p>}
        </div>
      )}
      {children}
    </Tag>
  );
}
