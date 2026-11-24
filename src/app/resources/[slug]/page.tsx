import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogRows, SpineLabel } from "@/components/catalog";
import { ArrowUpRight, Download } from "@/components/icons";
import { Action, Card, wrap } from "@/components/ui";
import { site } from "@/data/site";
import { LEVELS, POST_TYPES, contributorLine, formatDate, getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

const RELATED = 5;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const related = getPosts()
    .filter((p) => p.courseSlug === post.courseSlug && p.slug !== post.slug)
    .slice(0, RELATED);

  return (
    <div className={wrap}>
      <nav aria-label="Breadcrumb" className="pt-8 font-display text-[0.9rem] text-muted">
        <Link href="/resources" className="hover:text-ink hover:underline">
          Resources
        </Link>
        <span className="mx-2 text-faint" aria-hidden>
          /
        </span>
        <Link href={`/courses/${post.courseSlug}`} className="hover:text-ink hover:underline">
          {post.course}
        </Link>
      </nav>

      <article>
        <header className="grid gap-6 pt-6 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[46rem]">
            <h1 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-[-0.015em] text-balance sm:text-[2.4rem]">
              {post.title}
            </h1>
            <p className="mt-3 font-display text-[0.95rem] text-muted">
              <Link href={`/resources?type=${post.type}`} className="hover:text-ink hover:underline">
                {POST_TYPES[post.type].label}
              </Link>{" "}
              ·{" "}
              <Link href={`/courses/${post.courseSlug}`} className="hover:text-ink hover:underline">
                {post.course}
              </Link>{" "}
              · {LEVELS[post.level].label}
            </p>
            <p className="mt-1 text-[0.98rem] text-muted">
              {contributorLine(post)} ·{" "}
              <time dateTime={post.date} className="typed text-[0.9rem]">
                {formatDate(post.date)}
              </time>
            </p>
          </div>
          <SpineLabel post={post} className="justify-self-start md:justify-self-end" />
        </header>

        <div className="card px-5 py-7 sm:px-10 sm:py-10">
          {post.html && <div className="prose-post" dangerouslySetInnerHTML={{ __html: post.html }} />}

          {post.pdf && (
            <div className={post.html ? "mt-10 border-t border-ruling pt-8" : ""}>
              <div className="flex flex-wrap items-center gap-3">
                <Action href={post.pdf} download>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Action>
                <Action href={post.pdf} variant="plain">
                  Open in a new tab
                  <ArrowUpRight className="h-4 w-4" />
                </Action>
              </div>
              <object
                data={post.pdf}
                type="application/pdf"
                aria-label={`${post.title} (PDF)`}
                className="mt-5 hidden h-[80vh] w-full border border-edge bg-ground md:block"
              >
                <p className="p-4 text-muted">This browser cannot show the PDF here. Use the download link above.</p>
              </object>
            </div>
          )}

          <footer className="mt-10 max-w-[64ch] space-y-2 border-t border-ruling pt-6 text-[0.95rem] leading-[1.6] text-muted">
            {post.ai && (
              <p>
                <span className="font-display font-semibold text-ink">AI use:</span> {post.ai}
              </p>
            )}
            <p>
              To report a mistake, email{" "}
              <a
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Correction: ${post.title}`)}`}
                className="underline decoration-edge underline-offset-[0.2em] hover:decoration-rule"
              >
                {site.contactEmail}
              </a>{" "}
              with the title of this post.
            </p>
          </footer>
        </div>
      </article>

      {related.length > 0 && (
        <Card title={`More on ${post.course}`} className="mt-12">
          <CatalogRows posts={related} />
        </Card>
      )}
    </div>
  );
}
