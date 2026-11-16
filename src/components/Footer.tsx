import Image from "next/image";
import Link from "next/link";
import { wrap } from "@/components/ui";
import { site } from "@/data/site";

const linkClass = "inline-flex min-h-9 items-center text-sm text-neutral-600 transition-colors hover:text-ink";

const columns = [
  { title: "Journal", links: [{ label: "Archive", href: "/papers" }, { label: "Submission guidelines", href: "/submit" }] },
  { title: "Math Mentors", links: [{ label: "About", href: "/about" }, { label: "Join", href: "/join" }] },
  { title: "Contact", links: [{ label: "Email us", href: `mailto:${site.contactEmail}` }] },
];

export default function Footer() {
  return (
    <footer className={`${wrap} pt-24 pb-10`}>
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <Link href="/" aria-label={site.name} className="self-start">
          <Image src="/mark.png" alt="" width={24} height={24} className="h-6 w-6" />
        </Link>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm text-muted">{col.title}</p>
            <ul className="mt-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("mailto:") ? (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-2 text-sm text-faint sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. {site.journalName}.
        </p>
        <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-ink">
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
