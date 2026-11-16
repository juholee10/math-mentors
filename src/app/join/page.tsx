import type { Metadata } from "next";
import Button from "@/components/Button";
import { ArrowLink, PageIntro, wrap } from "@/components/ui";
import { formatIssue, getNextIssue } from "@/data/papers";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Join | Math Mentors",
  description: "How to join Math Mentors, a peer-reviewed student math journal.",
};

export default function JoinPage() {
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Joining Math Mentors")}`;

  return (
    <div className={`${wrap} pt-24 sm:pt-28`}>
      <PageIntro eyebrow="Join" title="Join Math Mentors">
        <p>
          Math Mentors is a peer-reviewed student math journal. New members learn LaTeX on their own first,
          and members who already know LaTeX write papers and review each other&rsquo;s work. No LaTeX
          experience is needed to join. We are looking for writers for {formatIssue(getNextIssue())}.
        </p>
      </PageIntro>
      <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href={mailto} className="min-w-56">
          Email us to join
        </Button>
        <span className="text-sm text-faint">{site.contactEmail}</span>
      </div>

      <section className="mt-36">
        <h2 className="headline text-2xl leading-[1.25]">Activities</h2>
        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
          {site.tracks.map((track) => (
            <div key={track.title}>
              <p className="eyebrow">{track.who}</p>
              <p className="mt-4 text-lg text-ink">{track.title}</p>
              <p className="mt-2 max-w-[36rem] text-base leading-[26px] font-light text-muted">{track.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-36">
        <p className="eyebrow">Roles</p>
        <h2 className="headline mt-4 text-2xl leading-[1.25]">Who works on each paper</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.roles.map((role) => (
            <li key={role.title}>
              <p className="text-sm text-ink">{role.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{role.description}</p>
            </li>
          ))}
        </ul>
        <ArrowLink href="/submit" className="mt-10">
          Submission guidelines
        </ArrowLink>
      </section>
    </div>
  );
}
