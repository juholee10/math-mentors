import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  /** Swap the trailing arrow for another icon (or null for none). */
  icon?: ReactNode;
  download?: boolean;
};

const base =
  "group inline-flex min-h-12 items-center justify-between gap-14 px-7 font-display text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "border border-neutral-300 text-ink hover:border-ink",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  icon,
  download,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const trailing =
    icon === undefined ? (
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    ) : (
      icon
    );
  const content = (
    <>
      <span>{children}</span>
      {trailing}
    </>
  );

  if (href) {
    if (download || /^(mailto:|https?:)/.test(href) || /\.pdf$/.test(href)) {
      return (
        <a href={href} download={download} className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
