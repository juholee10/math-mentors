import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, PageIntro, Section, wrap } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About | Math Mentors",
  description: site.description,
};

export default function AboutPage() {
  return (
    <div className={`${wrap} pt-24 sm:pt-28`}>
      <PageIntro eyebrow="About" title="About Math Mentors">
        <p>{site.description}</p>
      </PageIntro>

      <section className="mt-36">
        <p className="eyebrow">Peer review</p>
        <h2 className="headline mt-4 text-2xl leading-[1.25]">From submission to publication</h2>
        <p className="mt-4 max-w-[36rem] text-base leading-[26px] font-light text-muted">
          {site.reviewTotal}{" "}Only accepted papers are posted on this site.
        </p>
        {/* The order is the process, so each step keeps its number. */}
        <ol className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {site.review.map((step, i) => (
            <li key={step.step}>
              <p className="text-sm text-ink">
                <span className="mr-2 tabular-nums text-faint">{i + 1}</span>
                {step.step}
              </p>
              {step.time && <p className="mt-1 text-xs text-faint">{step.time}</p>}
              <p className="mt-2 text-xs leading-5 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-36">
        <h2 className="headline text-2xl leading-[1.25]">Editorial board</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {site.board.map((seat) => (
            <li key={seat.role}>
              <p className="eyebrow">{seat.role}</p>
              <p className={`mt-3 text-lg ${seat.name ? "text-ink" : "text-faint"}`}>
                {seat.name || "To be announced"}
              </p>
            </li>
          ))}
          <li>
            <p className="eyebrow">Open roles</p>
            <Link href="/join" className="mt-3 inline-block text-lg text-ink hover:underline">
              Join as an author, reviewer or editor
            </Link>
          </li>
        </ul>
      </section>

      <Section title="History" className="mt-36">
        <p>
          Math Mentors started in {site.founded}. At first it taught LaTeX and made math materials for other
          students. It is now a peer-reviewed journal where members write math papers and review each
          other&rsquo;s work, and the papers that pass review are published in {site.journalName}.
        </p>
        <ArrowLink href="/join" className="mt-5">
          Join Math Mentors
        </ArrowLink>
      </Section>
    </div>
  );
}
