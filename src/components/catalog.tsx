import Link from "next/link";
import type { ReactNode } from "react";
import { LEVELS, POST_TYPES, contributorLine, formatDate, type PostMeta } from "@/lib/post-types";

function accessionLabel(n: number) {
  return `No. ${String(n).padStart(3, "0")}`;
}

/** The parts of a post's call number, in catalog order. */
export function callNumberParts(post: Pick<PostMeta, "type" | "courseCode" | "level" | "accession">) {
  return [POST_TYPES[post.type].code, post.courseCode, LEVELS[post.level].code, accessionLabel(post.accession)];
}

/** A post's call number as a spine label: one part per line. */
export function SpineLabel({ post, className = "" }: { post: PostMeta; className?: string }) {
  const parts = callNumberParts(post);
  return (
    <div
      className={`typed inline-block rounded-[2px] border border-ink/25 bg-card px-3 py-2 text-[0.9rem] leading-[1.35] text-ink ${className}`}
      aria-label={`Call number ${parts.join(" ")}`}
    >
      {parts.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}

/** One catalog row. The call number sits in the left column on wide screens. */
function Row({ post }: { post: PostMeta }) {
  const parts = callNumberParts(post);
  return (
    <li className="group relative grid gap-x-6 gap-y-1.5 border-t border-ruling px-5 py-4 first:border-t-0 sm:grid-cols-[8.5rem_1fr] sm:px-6">
      <div className="typed text-[0.8rem] leading-[1.4] text-faint" aria-hidden>
        <span className="sm:hidden">{parts.join(" · ")}</span>
        <span className="hidden sm:block">
          {parts.map((p) => (
            <span key={p} className="block">
              {p}
            </span>
          ))}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-[1.08rem] leading-snug font-semibold">
          <Link
            href={`/resources/${post.slug}`}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-rule group-hover:underline-offset-[0.2em]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 font-display text-[0.86rem] text-muted">
          {POST_TYPES[post.type].label} · {post.course} · {LEVELS[post.level].label}
          {post.pdf && (
            <span className="typed ml-2 rounded-[2px] border border-ink/25 px-1 py-px text-[0.72rem] text-ink">PDF</span>
          )}
        </p>
        <p className="mt-1.5 max-w-[62ch] text-[0.98rem] leading-[1.55] text-ink/85">{post.summary}</p>
        <p className="mt-1.5 text-[0.88rem] text-faint">
          {contributorLine(post)} <span aria-hidden>·</span>{" "}
          <time dateTime={post.date} className="typed text-[0.82rem]">
            {formatDate(post.date)}
          </time>
        </p>
      </div>
    </li>
  );
}

export function CatalogRows({ posts }: { posts: PostMeta[] }) {
  return (
    <ul>
      {posts.map((p) => (
        <Row key={p.slug} post={p} />
      ))}
    </ul>
  );
}

/** A blank catalog card for empty states. */
export function BlankCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="px-5 py-6 sm:px-6">
      <p className="font-display text-[1.02rem] font-semibold">{title}</p>
      <div className="mt-1.5 max-w-[56ch] text-[0.98rem] leading-[1.6] text-muted">{children}</div>
      {/* Empty ruled lines, like an unused card. */}
      <div className="mt-5 space-y-6" aria-hidden>
        <div className="border-t border-ruling" />
        <div className="border-t border-ruling" />
        <div className="border-t border-ruling" />
      </div>
    </div>
  );
}
