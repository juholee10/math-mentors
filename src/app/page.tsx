import Link from "next/link";
import Button from "@/components/Button";
import PaperCard from "@/components/papers/PaperCard";
import Shelf from "@/components/papers/Shelf";
import { ArrowLink, Section, wrap } from "@/components/ui";
import { SECTIONS, formatIssue, getNextIssue, getSeries, papers } from "@/data/papers";
import { site } from "@/data/site";

export default function Home() {
  const latest = getSeries().slice(-3).reverse();
  const next = formatIssue(getNextIssue());
  const counts = Object.fromEntries(SECTIONS.map((s) => [s, papers.filter((p) => p.section === s).length]));

  return (
    <div className={wrap}>
      <section className="grid gap-16 pt-24 sm:pt-28 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
        <p className="eyebrow">{site.name}</p>
        <h1 className="headline mt-5 max-w-[40rem] text-balance text-4xl leading-[1.15]">{site.tagline}</h1>
        <p className="mt-7 max-w-[36rem] text-base leading-[26px] font-light text-muted">{site.hook}</p>
        <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/submit" className="min-w-56">
            Submit a paper
          </Button>
          <Link href="/join" className="text-sm text-muted transition-colors hover:text-ink">
            Join the journal <span className="ml-1.5 text-xs text-faint">No LaTeX experience needed</span>
          </Link>
        </div>
        <div className="mt-9">
          <ArrowLink href={`mailto:${site.contactEmail}`}>Questions for the editors</ArrowLink>
        </div>
        </div>
        <Shelf />
      </section>

      <Section title={site.journalName} className="mt-36">
        <p>{site.description}</p>
        <div className="mt-5 flex flex-wrap gap-x-6">
          <ArrowLink href="/about">About the journal</ArrowLink>
          <ArrowLink href="/papers">Browse the archive</ArrowLink>
        </div>
      </Section>

      <section className="mt-36">
        <p className="eyebrow">Sections</p>
        <h2 className="headline mt-4 text-2xl leading-[1.25]">Four kinds of papers</h2>
        <p className="mt-4 max-w-[36rem] text-base leading-[26px] font-light text-muted">
          Most early papers will be Articles. The journal does not require new results.
        </p>
        <ul className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.sections.map((s) => (
            <li key={s.name}>
              <Link href={`/papers?section=${encodeURIComponent(s.name)}`} className="group block">
                <p className="text-sm text-ink group-hover:underline">
                  {s.name} <span className="text-faint">({counts[s.name] ?? 0})</span>
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {s.length}. {s.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-36">
        <h2 className="headline text-2xl leading-[1.25]">How the journal works</h2>
        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
          {site.tracks.map((track, i) => (
            <div key={track.title}>
              <p className="eyebrow">{track.who}</p>
              <p className="mt-4 max-w-[38rem] text-lg leading-[25px] text-ink">{track.description}</p>
              <ArrowLink href={i === 0 ? "/join" : "/submit"} className="mt-5">
                {i === 0 ? "How to join" : "Submission guidelines"}
              </ArrowLink>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-36">
        <h2 className="headline text-2xl leading-[1.25]">Standards</h2>
        <ol className="mt-6 max-w-[40rem]">
          {site.standards.map((rule, i) => (
            <li key={rule} className="flex gap-4 border-b border-line py-3 text-base font-light text-ink first:border-t">
              <span className="w-5 shrink-0 text-sm tabular-nums text-faint">{i + 1}</span>
              {rule}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-36">
        <h2 className="headline text-3xl leading-[1.2]">Latest papers</h2>
        {latest.length > 0 ? (
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {latest.map((paper) => (
              <li key={paper.slug}>
                <PaperCard paper={paper} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-[36rem] text-base leading-[26px] font-light text-muted">
            No papers have been published yet. The first issue, {next}, is in preparation.
          </p>
        )}
        <ArrowLink href="/papers" className="mt-8 text-ink">
          View all papers
        </ArrowLink>
      </section>

      <section className="mt-36">
        <h2 className="headline text-2xl leading-[1.25]">Write for {next}</h2>
        <p className="mt-4 max-w-[40rem] text-base leading-[26px] font-light text-muted">
          New members learn LaTeX on their own first and then move on to writing and reviewing papers.
        </p>
        <ArrowLink href="/join" className="mt-5 text-ink">
          How to join
        </ArrowLink>
      </section>
    </div>
  );
}
