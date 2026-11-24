import type { Metadata } from "next";
import { H2, PageHead, TextLink, wrap } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who runs Math Mentors, how it started and what comes after the resource hub.",
};

export default function AboutPage() {
  const team = site.team.filter((m) => m.name);

  return (
    <div className={wrap}>
      <PageHead title="About Math Mentors">
        <p>
          Math Mentors is a student-run volunteer group. Members write short math resources for other students, and an
          editor checks each one before it is published here.
        </p>
      </PageHead>

      <div className="max-w-[44rem] space-y-14">
        <section aria-labelledby="history">
          <H2 id="history">How it started</H2>
          <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.7] text-muted">
            <p>
              Members first wrote longer materials in LaTeX, such as problem sheets, packets and textbook-style notes.
              Full textbooks and research papers took too long to finish as a starting point, so the group now
              publishes short posts that one student can write and one editor can check.
            </p>
            <p>
              The posts are written by students who took the course or worked the problem themselves, which is the part
              that large sites like Khan Academy and AoPS do not have.
            </p>
          </div>
        </section>

        <section aria-labelledby="plans">
          <H2 id="plans">Plans</H2>
          <p className="mt-4 text-[1.02rem] leading-[1.7] text-muted">
            Each stage uses the work from the one before it.
          </p>
          <ol className="mt-5 border-y border-ruling">
            {site.stages.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-ruling py-4 first:border-t-0 sm:grid-cols-[2rem_1fr_4rem]">
                <span className="typed pt-0.5 text-[0.9rem] text-faint">{i + 1}.</span>
                <div>
                  <p className="font-display font-semibold">{s.name}</p>
                  <p className="mt-1 text-[0.98rem] leading-[1.6] text-muted">{s.text}</p>
                </div>
                <span
                  className={`typed col-start-2 mt-2 text-[0.82rem] sm:col-start-3 sm:mt-0.5 sm:text-right ${
                    s.status === "Now" ? "font-bold text-rule" : "text-faint"
                  }`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="team">
          <H2 id="team">Team</H2>
          {team.length > 0 ? (
            <dl className="mt-5 divide-y divide-ruling border-y border-ruling">
              {team.map((m) => (
                <div key={`${m.role}-${m.name}`} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-display text-muted">{m.role}</dt>
                  <dd className="font-display font-semibold">{m.name}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-[1.02rem] leading-[1.7] text-muted">
              The editors and the faculty advisor will be listed here.
            </p>
          )}
        </section>

        <section aria-labelledby="contact">
          <H2 id="contact">Contact</H2>
          <p className="mt-4 text-[1.02rem] leading-[1.7] text-muted">
            Email <TextLink href={`mailto:${site.contactEmail}`}>{site.contactEmail}</TextLink> with questions,
            corrections or submissions. Submission details are on the <TextLink href="/contribute">Contribute</TextLink>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
