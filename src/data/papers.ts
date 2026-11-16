// The journal's archive. Only papers that passed peer review go here. Add one
// object to `papers` per accepted paper; no other code needs to change. `slug`
// must be unique; it becomes the URL (/papers/<slug>).

export const SECTIONS = ["Articles", "Notes", "Research", "Problems"] as const;
export type Section = (typeof SECTIONS)[number];

/** How a section is named on a single paper's cover ("Article", not "Articles"). */
export const SECTION_SINGULAR: Record<Section, string> = {
  Articles: "Article",
  Notes: "Note",
  Research: "Research",
  Problems: "Problems",
};

/**
 * Cover diagrams, each drawn by hand for one specific paper (see
 * src/components/series/Figure.tsx). A paper without a figure gets a
 * title-only cover until one is drawn for it.
 */
export type CoverFigure = "complex-numbers";

export interface Issue {
  volume: number;
  number: number;
}

export interface Author {
  name: string;
  /** School grade, e.g. 11. */
  grade: number;
}

export interface Paper {
  /** Unique URL-safe id, e.g. "pisano-periods" -> /papers/pisano-periods */
  slug: string;
  title: string;
  section: Section;
  /** Articles only: a literature review, shown with a "Survey" label. */
  survey?: boolean;
  authors: Author[];
  /** The paper's abstract (150 words or fewer). */
  abstract: string;
  /** The paper's numbered section headings, in order. */
  contents: string[];
  issue: Issue;
  /** ISO dates, e.g. "2027-02-14". */
  submitted: string;
  accepted: string;
  /** Path to the PDF in /public, e.g. "/pdfs/pisano-periods.pdf". */
  pdfUrl: string;
  /** Short mark for the paper (e.g. "π"); shown on the cover's spine. */
  coverLabel: string;
  /** The diagram drawn on this paper's cover. Optional. */
  figure?: CoverFigure;
}

export const papers: Paper[] = [
  // Placeholder paper for previewing the layout. Remove before publishing real papers.
  {
    slug: "pisano-periods",
    title: "Pisano Periods of the Fibonacci Sequence",
    section: "Articles",
    authors: [{ name: "Sample Author", grade: 11 }],
    abstract:
      "The Fibonacci sequence taken modulo n is periodic, and its period is called the Pisano period. This article proves that the period exists for every n, explains how the period of a product relates to the periods of its factors, and works through the cases where n is a prime. Each result is illustrated with computed examples.",
    contents: ["Introduction", "Periodicity modulo n", "Periods of products", "Periods modulo a prime", "References"],
    issue: { volume: 1, number: 1 },
    submitted: "2026-11-02",
    accepted: "2026-12-14",
    pdfUrl: "/pdfs/pisano-periods.pdf",
    coverLabel: "π",
  },
];

function compareIssues(a: Issue, b: Issue) {
  return a.volume - b.volume || a.number - b.number;
}

/** Papers in publication order (by issue, then acceptance date): the order of the shelf. */
export function getSeries(): Paper[] {
  return [...papers].sort(
    (a, b) => compareIssues(a.issue, b.issue) || (a.accepted < b.accepted ? -1 : a.accepted > b.accepted ? 1 : 0)
  );
}

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}

/** A paper's place on the shelf (1 = first published); sets its cover tone. */
export function getPosition(paper: Paper): number {
  return getSeries().findIndex((p) => p.slug === paper.slug) + 1;
}

/** Every issue that has at least one published paper, oldest first. */
export function getIssues(): Issue[] {
  const seen = new Map<string, Issue>();
  for (const p of papers) seen.set(formatIssue(p.issue), p.issue);
  return [...seen.values()].sort(compareIssues);
}

/** The issue in preparation: the one after the latest published (two issues a year). */
export function getNextIssue(): Issue {
  const latest = getIssues().at(-1);
  if (!latest) return { volume: 1, number: 1 };
  return latest.number >= 2 ? { volume: latest.volume + 1, number: 1 } : { volume: latest.volume, number: 2 };
}

/** "Vol. 1, No. 1" */
export function formatIssue(issue: Issue): string {
  return `Vol. ${issue.volume}, No. ${issue.number}`;
}

/** "Article", "Article · Survey", "Note", ... */
export function formatKind(paper: Paper): string {
  return SECTION_SINGULAR[paper.section] + (paper.survey ? " · Survey" : "");
}

/** "Jordan Lee (Grade 11), Sam Kim (Grade 10)" */
export function formatAuthors(paper: Paper, withGrades = true): string {
  return paper.authors.map((a) => (withGrades ? `${a.name} (Grade ${a.grade})` : a.name)).join(", ");
}

/** "14 February 2027" */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function getFigure(paper: Paper): CoverFigure | undefined {
  return paper.figure;
}
