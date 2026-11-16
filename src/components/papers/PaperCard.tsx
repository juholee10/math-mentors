import Link from "next/link";
import { formatDate, formatIssue, formatKind, type Paper } from "@/data/papers";

/** A paper in a list: date, title and abstract, like a blog card. */
export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Link href={`/papers/${paper.slug}`} className="group block border-t border-line pt-5">
      <p className="text-sm text-muted">
        {formatIssue(paper.issue)} · {formatKind(paper)} · {formatDate(paper.accepted)}
      </p>
      <h3 className="mt-2 text-lg leading-[1.55] text-ink group-hover:underline">{paper.title}</h3>
      <p className="mt-1 text-sm text-muted">{paper.authors.map((a) => a.name).join(", ")}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted">{paper.abstract}</p>
    </Link>
  );
}
