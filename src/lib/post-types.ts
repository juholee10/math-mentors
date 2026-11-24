// Post types, levels and display helpers. No server-only code, so client
// components can import this file.

export const POST_TYPES = {
  "course-guide": { label: "Course Guide", plural: "Course Guides", code: "CG" },
  "problem-spotlight": { label: "Problem Spotlight", plural: "Problem Spotlights", code: "PS" },
  "short-note": { label: "Short Note", plural: "Short Notes", code: "SN" },
  guide: { label: "Guide", plural: "Guides", code: "GD" },
} as const;
export type PostType = keyof typeof POST_TYPES;

export const LEVELS = {
  intro: { label: "Intro", code: "INTRO" },
  intermediate: { label: "Intermediate", code: "INTER" },
  advanced: { label: "Advanced", code: "ADV" },
} as const;
export type Level = keyof typeof LEVELS;

/** Everything a list row needs. Safe to pass to client components. */
export interface PostMeta {
  slug: string;
  title: string;
  type: PostType;
  course: string;
  courseSlug: string;
  courseCode: string;
  level: Level;
  contributor: string;
  grade: number | null;
  /** ISO date, e.g. "2026-11-20". */
  date: string;
  /** The contributor's AI-use statement. Empty if none was given. */
  ai: string;
  summary: string;
  /** Public URL of the PDF, e.g. "/pdfs/eigenvectors.pdf". */
  pdf: string | null;
  /** Order of publication, starting at 1. */
  accession: number;
}

export interface Post extends PostMeta {
  html: string;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${month} ${y}`;
}

export function contributorLine(post: Pick<PostMeta, "contributor" | "grade">) {
  return post.grade ? `${post.contributor}, Grade ${post.grade}` : post.contributor;
}
