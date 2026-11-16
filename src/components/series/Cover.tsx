import Figure from "@/components/series/Figure";
import { formatAuthors, formatIssue, formatKind, getFigure, type Paper } from "@/data/papers";
import { site } from "@/data/site";

/**
 * A paper's cover page, added in front of its PDF by `npm run covers`.
 * Sized in container units so it fills any page size.
 */
export default function Cover({
  paper,
  className = "",
  fill = false,
}: {
  paper: Paper;
  className?: string;
  /** Fill the parent box instead of keeping a page shape. */
  fill?: boolean;
}) {
  const figure = getFigure(paper);

  return (
    <div className={`@container relative overflow-hidden bg-paper text-ink ${fill ? "h-full w-full" : "aspect-[5/7]"} ${className}`}>
      <div className="absolute inset-0 flex flex-col p-[9cqw]">
        <div className="flex items-baseline justify-between font-display text-[2.6cqw] text-muted">
          <span>{site.journalName}</span>
          <span className="tabular-nums">{formatIssue(paper.issue)}</span>
        </div>

        <div className="mt-[22cqw]">
          <p className="text-[1.8cqw] tracking-[0.2em] text-faint uppercase">{formatKind(paper)}</p>
          <p className="headline mt-[3cqw] text-balance text-[6.5cqw] leading-[1.12]">{paper.title}</p>
          <p className="mt-[4cqw] text-[2.6cqw] text-ink">{formatAuthors(paper)}</p>
        </div>

        {figure && <Figure kind={figure} className="mt-[8cqw] w-[44cqw] overflow-visible text-ink" />}

        <p className="mt-auto text-[2cqw] text-faint">math-mentors.org</p>
      </div>
    </div>
  );
}
