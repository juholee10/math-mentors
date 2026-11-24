import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/80">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[30rem]">
          <p className="font-display font-bold">{site.name}</p>
          <p className="mt-1 text-[0.95rem] leading-[1.55] text-muted">
            Student-written math resources. Questions and submissions go to{" "}
            <a href={`mailto:${site.contactEmail}`} className="underline decoration-edge underline-offset-[0.2em] hover:decoration-rule">
              {site.contactEmail}
            </a>
            .
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[0.92rem]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-9 items-center text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="typed mt-2 text-[0.8rem] text-faint md:text-right">© {new Date().getFullYear()} {site.name}</p>
        </nav>
      </div>
    </footer>
  );
}
