import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import PaperCard from "@/components/papers/PaperCard";
import ShareButton from "@/components/papers/ShareButton";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "@/components/icons";
import { wrap } from "@/components/ui";
import {
  formatAuthors,
  formatDate,
  formatIssue,
  formatKind,
  getPaperBySlug,
  getSeries,
  papers,
} from "@/data/papers";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return {};
  return {
    title: `${paper.title} | Math Mentors`,
    description: paper.abstract,
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  const pdfExists = fs.existsSync(path.join(process.cwd(), "public", paper.pdfUrl));
  const sameIssue = getSeries().filter(
    (p) => p.slug !== paper.slug && formatIssue(p.issue) === formatIssue(paper.issue)
  );
  const meta = [
    { label: "Issue", value: `${formatIssue(paper.issue)} · ${formatKind(paper)}` },
    { label: "Submitted", value: formatDate(paper.submitted) },
    { label: "Accepted", value: formatDate(paper.accepted) },
  ];

  return (
    <article className={`${wrap} pt-12`}>
      <Link href="/papers" className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
        Archive
      </Link>

      <header className="mt-12 max-w-[44rem]">
        <p className="eyebrow">
          {formatKind(paper)} · {formatIssue(paper.issue)}
        </p>
        <h1 className="headline mt-5 text-balance text-4xl leading-[1.15]">{paper.title}</h1>
        <p className="mt-5 text-base text-ink">{formatAuthors(paper)}</p>
        <p className="mt-6 text-base leading-[26px] font-light text-muted">{paper.abstract}</p>

        {pdfExists ? (
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              href={paper.pdfUrl}
              download
              icon={<ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" />}
            >
              Download PDF
            </Button>
            <ShareButton title={paper.title} />
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted">The PDF for this paper is not available yet.</p>
        )}
      </header>

      <dl className="mt-20 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="eyebrow">{m.label}</dt>
            <dd className="mt-3 text-sm text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>

      {paper.contents.length > 0 && (
        <section className="mt-28">
          <h2 className="headline text-2xl leading-[1.25]">Contents</h2>
          <ol className="mt-6 max-w-[40rem]">
            {paper.contents.map((heading, i) => (
              <li key={heading} className="flex gap-4 border-b border-line py-3 text-base font-light text-ink first:border-t">
                <span className="w-5 text-sm tabular-nums text-faint">{i + 1}</span>
                {heading}
              </li>
            ))}
          </ol>
        </section>
      )}

      {pdfExists && (
        <section className="mt-28">
          <h2 className="headline text-2xl leading-[1.25]">Read online</h2>
          {/* Phones can't scroll an embedded PDF well; they get a link to it instead. */}
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-ink sm:hidden"
          >
            Open the PDF <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <div className="mt-8 hidden border border-line bg-white sm:block">
            <iframe src={paper.pdfUrl} title={`${paper.title} (PDF)`} className="block h-[80vh] w-full" />
          </div>
        </section>
      )}

      {sameIssue.length > 0 && (
        <section className="mt-28">
          <h2 className="headline text-3xl leading-[1.2]">Other papers in {formatIssue(paper.issue)}</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {sameIssue.map((p) => (
              <li key={p.slug}>
                <PaperCard paper={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
