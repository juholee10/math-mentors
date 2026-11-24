import type { Metadata } from "next";
import { Mail } from "@/components/icons";
import { Action, Card, H2, PageHead, wrap } from "@/components/ui";
import { site, submissionEmail, submissionMailto } from "@/data/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to send a Course Guide, Problem Spotlight or Short Note to Math Mentors: what to include in the email, the rules and how review works.",
};

const emailItems = [
  "Your display name (first name or a username) and grade. Your school is optional.",
  "The content type, title, course or topic, and level (intro, intermediate or advanced).",
  "The post as a PDF, .tex or .md file, or written in the body of the email.",
  "A statement that it is your own work, contains no copyrighted material and is not an answer to work currently being graded.",
  'A statement of how you used AI, or "None".',
];

const reviewSteps = [
  "You email the submission to the address below.",
  "An editor reads it and checks the math and the rules on this page.",
  "If something needs fixing, the editor replies with what to change and you send a new version.",
  "When it passes, the editor adds it to the site with your display name and grade.",
];

export default function ContributePage() {
  return (
    <div className={wrap}>
      <PageHead title="Contribute">
        <p>
          Any student can send a post. Posts are short, they are checked once by an editor, and they are submitted by
          email. There are no accounts or upload forms.
        </p>
      </PageHead>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="types">
            <H2 id="types">Content types</H2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink font-display text-[0.9rem]">
                    <th className="py-2 pr-6 font-semibold">Type</th>
                    <th className="py-2 pr-6 font-semibold">What it is</th>
                    <th className="py-2 font-semibold whitespace-nowrap">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {site.types.map((t) => (
                    <tr key={t.key} className="border-b border-ruling align-top">
                      <td className="py-3 pr-6 font-display font-semibold whitespace-nowrap">{t.name}</td>
                      <td className="py-3 pr-6 text-[0.98rem] leading-[1.6] text-muted">{t.description}</td>
                      <td className="typed py-3 text-[0.86rem] whitespace-nowrap">{t.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="rules">
            <H2 id="rules">Rules</H2>
            <dl className="mt-5 max-w-[64ch] divide-y divide-ruling border-y border-ruling">
              {site.rules.map((r) => (
                <div key={r.name} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-display font-semibold">{r.name}</dt>
                  <dd className="text-[0.98rem] leading-[1.6] text-muted">{r.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="review">
            <H2 id="review">How review works</H2>
            <ol className="mt-5 max-w-[64ch] list-decimal space-y-2 pl-5 text-[1rem] leading-[1.6] marker:font-display marker:text-faint">
              {reviewSteps.map((s) => (
                <li key={s} className="pl-1">
                  {s}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start" aria-labelledby="send">
          <Card title={<span id="send">Sending the email</span>}>
            <div className="px-5 py-5 sm:px-6">
              <p className="text-[0.98rem] leading-[1.6] text-muted">Send your submission to</p>
              <p className="typed mt-1 text-[1rem] break-all">{site.contactEmail}</p>
              <p className="mt-4 text-[0.98rem] leading-[1.6] text-muted">Include:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-[1.5]">
                {emailItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Action href={submissionMailto()} className="mt-5 w-full justify-center">
                <Mail className="h-4 w-4" />
                Open the email template
              </Action>
              <p className="mt-3 text-[0.88rem] leading-[1.5] text-faint">
                The button opens your mail app with the subject and the list above filled in. If it does not open, copy
                the template below.
              </p>
            </div>
          </Card>
        </aside>
      </div>

      <section aria-labelledby="template" className="mt-14">
        <H2 id="template">Email template</H2>
        <div className="card mt-5 max-w-[48rem] overflow-x-auto">
          <p className="card-rule typed px-5 pt-4 pb-2.5 text-[0.9rem] sm:px-6">Subject: {submissionEmail.subject}</p>
          <pre className="typed px-5 py-4 text-[0.88rem] leading-[1.7] whitespace-pre-wrap sm:px-6">{submissionEmail.body}</pre>
        </div>
      </section>
    </div>
  );
}
