import Link from "next/link";
import { formatIssue, formatKind, getNextIssue, getSeries, type Paper } from "@/data/papers";

const SPINE_HEIGHT = "h-[22rem]";

// Spine widths vary a little with the section, so a row of papers doesn't look stamped out.
const WIDTH: Record<Paper["section"], string> = {
  Articles: "w-[4.5rem]",
  Notes: "w-14",
  Research: "w-20",
  Problems: "w-12",
};

/**
 * Published papers standing on a shelf, spine out. Hovering or focusing a
 * spine lifts it and slides its cover out; the row ends with a dashed spine
 * for the issue in preparation, which links to the submission guidelines.
 */
export default function Shelf() {
  const series = getSeries();
  const next = getNextIssue();

  const count = series.length;

  return (
    <div className="flex flex-col items-end">
    <div className="flex items-end justify-end overflow-x-auto pt-8">
      <ul className="flex min-w-max items-end gap-1 border-b border-ink pr-1">
        {series.map((paper, i) => {
          const dark = i % 2 === 0;
          return (
            <li key={paper.slug}>
              <Link
                href={`/papers/${paper.slug}`}
                aria-label={`${paper.title}, ${formatIssue(paper.issue)}`}
                className="group flex items-end"
              >
                <span
                  className={`flex ${SPINE_HEIGHT} ${WIDTH[paper.section]} shrink-0 flex-col items-center justify-between py-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-3 group-focus-visible:-translate-y-3 ${
                    dark ? "bg-ink text-paper" : "border border-neutral-300 bg-white text-ink"
                  }`}
                >
                  <span className="font-display text-sm">{paper.coverLabel}</span>
                  <span className="min-h-0 flex-1 overflow-hidden py-4 font-display text-sm leading-tight font-light [writing-mode:vertical-rl] rotate-180">
                    {paper.title}
                  </span>
                  <span className="text-[10px] tabular-nums opacity-60 [writing-mode:vertical-rl] rotate-180">
                    {formatIssue(paper.issue)}
                  </span>
                </span>
                <span className="block w-0 overflow-hidden transition-[width,transform] duration-500 ease-out-expo group-hover:w-56 group-hover:-translate-y-3 group-focus-visible:w-56 group-focus-visible:-translate-y-3">
                  <span className={`flex ${SPINE_HEIGHT} w-56 flex-col border border-neutral-300 bg-white p-5`}>
                    <span className="flex justify-between text-[11px] text-faint">
                      <span>{formatKind(paper)}</span>
                      <span className="tabular-nums">{formatIssue(paper.issue)}</span>
                    </span>
                    <span className="headline mt-auto text-xl leading-snug">{paper.title}</span>
                    <span className="mt-3 text-xs text-muted">{paper.authors.map((a) => a.name).join(", ")}</span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/submit"
            aria-label={`${formatIssue(next)} is in preparation. Submit a paper.`}
            className="group flex items-end"
          >
            <span
              className={`flex ${SPINE_HEIGHT} w-14 shrink-0 flex-col items-center justify-between border border-dashed border-neutral-400 py-4 text-faint transition-[color,border-color,transform] duration-500 ease-out-expo group-hover:-translate-y-3 group-hover:border-ink group-hover:text-ink group-focus-visible:-translate-y-3`}
            >
              <span className="font-display text-sm">+</span>
              <span className="font-display text-sm font-light [writing-mode:vertical-rl] rotate-180">Your paper</span>
              <span className="text-[10px] tabular-nums [writing-mode:vertical-rl] rotate-180">{formatIssue(next)}</span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
    <p className="mt-3 text-xs text-faint">
      {count === 0
        ? `First issue (${formatIssue(next)}) in preparation`
        : `${count} ${count === 1 ? "paper" : "papers"} published · ${formatIssue(next)} in preparation`}
    </p>
    </div>
  );
}
