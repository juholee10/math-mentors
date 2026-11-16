import type { Metadata } from "next";
import Button from "@/components/Button";
import { PageIntro, Section, wrap } from "@/components/ui";
import { formatIssue, getNextIssue } from "@/data/papers";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Submit | Math Mentors",
  description: "Submission guidelines for The Math Mentors Journal.",
};

const list = "max-w-[40rem]";
const row = "flex gap-4 border-b border-line py-3 text-base font-light text-ink first:border-t";

export default function SubmitPage() {
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Submission: [paper title]")}`;

  return (
    <div className={`${wrap} pt-24 sm:pt-28`}>
      <PageIntro eyebrow="Submit" title="Submission guidelines">
        <p>
          Submissions are open for {formatIssue(getNextIssue())}. Any topic in mathematics is welcome. To submit,
          email the PDF and the .tex source to {site.contactEmail}.
        </p>
      </PageIntro>
      <div className="mt-11">
        <Button href={mailto} className="min-w-56">
          Email a submission
        </Button>
      </div>

      <section className="mt-36">
        <p className="eyebrow">Sections</p>
        <h2 className="headline mt-4 text-2xl leading-[1.25]">Four kinds of papers</h2>
        <p className="mt-4 max-w-[36rem] text-base leading-[26px] font-light text-muted">
          Expository papers are accepted. Professional journals such as the American Mathematical Monthly
          publish them too, and this journal does not require new results.
        </p>
        <ul className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.sections.map((s) => (
            <li key={s.name}>
              <p className="text-sm text-ink">{s.name}</p>
              <p className="mt-1 text-xs text-faint">{s.length}</p>
              <p className="mt-2 text-xs leading-5 text-muted">{s.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section title="Format" className="mt-36">
        <p>All papers use the journal&rsquo;s LaTeX template, which you can get from the editors. Each paper includes:</p>
        <ul className={`mt-5 ${list}`}>
          {["A title", "Author names and grades", "An abstract of 150 words or fewer", "Numbered sections", "References"].map(
            (item) => (
              <li key={item} className={row}>
                {item}
              </li>
            )
          )}
        </ul>
      </Section>

      <Section title="Standards" className="mt-28">
        <ol className={list}>
          {site.standards.map((rule, i) => (
            <li key={rule} className={row}>
              <span className="w-5 shrink-0 text-sm tabular-nums text-faint">{i + 1}</span>
              {rule}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="AI tools" className="mt-28">
        <p>
          You may use AI tools for help with LaTeX and for checking calculations. State the use at the end of
          your paper. You must understand every proof in it and be able to explain any step to a reviewer.
        </p>
      </Section>

      <Section title="Review process" className="mt-28">
        <ol className={list}>
          {site.review.map((step, i) => (
            <li key={step.step} className={row}>
              <span className="w-5 shrink-0 text-sm tabular-nums text-faint">{i + 1}</span>
              <span>
                {step.step}
                {step.time && <span className="text-faint"> · {step.time}</span>}
                <span className="mt-1 block text-sm text-muted">{step.description}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5">{site.reviewTotal}</p>
      </Section>

      <Section title="Outside journals" className="mt-28">
        <p>
          Each year the editors may send one or two papers to outside student journals. Many of these journals
          do not accept work that is already public, so those papers are not posted here until the outside
          journal makes its decision.
        </p>
      </Section>
    </div>
  );
}
