import Link from "next/link";
import { BlankCard, CatalogRows } from "@/components/catalog";
import { Mail } from "@/components/icons";
import { Action, Card, H2, TextLink, wrap } from "@/components/ui";
import { site, submissionMailto } from "@/data/site";
import { countContributors, getCourses, getPosts } from "@/lib/posts";

const NEWEST = 6;

export default function Home() {
  const posts = getPosts();
  const courses = getCourses();
  const contributors = countContributors(posts);

  return (
    <div className={wrap}>
      <section className="grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-14">
        <div>
          <h1 className="font-display text-[2.4rem] leading-[1.05] font-bold tracking-[-0.02em] sm:text-[3rem]">
            {site.name}
          </h1>
          <p className="mt-5 text-[1.12rem] leading-[1.65]">
            Math Mentors collects short math resources written by high school students: guides to specific courses,
            worked problems and notes on single topics. An editor checks each post for mistakes before it goes up.
          </p>
          <p className="mt-4 text-[1.02rem] leading-[1.65] text-muted">
            Most guides are written by students who finished the course recently, so they cover the parts a textbook
            leaves out, such as which units took the most time and which free resources were worth using.
          </p>

          <dl className="typed mt-8 grid max-w-[22rem] grid-cols-3 border-y border-ink/70 text-center">
            <Stat label={posts.length === 1 ? "post" : "posts"} value={posts.length} />
            <Stat label={contributors === 1 ? "contributor" : "contributors"} value={contributors} />
            <Stat label={courses.length === 1 ? "course" : "courses"} value={courses.length} />
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Action href="/resources">Browse resources</Action>
            <Action href="/contribute" variant="plain">
              Contribute
            </Action>
          </div>
        </div>

        <Card
          title="Newest posts"
          meta={posts.length > NEWEST ? `${NEWEST} of ${posts.length}` : undefined}
          className="self-start"
        >
          {posts.length > 0 ? (
            <>
              <CatalogRows posts={posts.slice(0, NEWEST)} />
              <div className="border-t border-ruling px-5 py-3 font-display text-[0.92rem] sm:px-6">
                <TextLink href="/resources">All resources, with filters and search</TextLink>
              </div>
            </>
          ) : (
            <BlankCard title="No posts published yet">
              The first posts are with the editors. New posts will be listed here with their course, level and
              contributor as soon as they are reviewed.
            </BlankCard>
          )}
        </Card>
      </section>

      <section className="mt-20 grid gap-8 border-t border-ink/70 pt-10 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-14">
        <H2>Post types</H2>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {site.types.map((t) => (
            <div key={t.key}>
              <dt className="font-display font-semibold">
                <Link href={`/resources?type=${t.key}`} className="hover:underline hover:decoration-rule">
                  {t.name}
                </Link>{" "}
                <span className="typed text-[0.82rem] font-normal text-faint">{t.limit}</span>
              </dt>
              <dd className="mt-1 text-[0.98rem] leading-[1.6] text-muted">{t.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      {courses.length > 0 && (
        <section className="mt-16 grid gap-8 border-t border-ink/70 pt-10 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-14">
          <H2>Courses</H2>
          <ul className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/courses/${c.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-edge bg-card px-3 font-display text-[0.95rem] hover:border-ink"
                >
                  {c.name} <span className="typed text-[0.8rem] text-faint">{c.posts.length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16 grid gap-8 border-t border-ink/70 pt-10 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-14">
        <H2>Sending a post</H2>
        <div className="max-w-[60ch]">
          <p className="text-[1.02rem] leading-[1.65] text-muted">
            Submissions are by email. Send the post as a PDF, .tex or .md file, or in the body of the email, with your
            display name and grade. The Contribute page lists everything the email needs and the rules every post
            follows.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Action href={submissionMailto()}>
              <Mail className="h-4 w-4" />
              Email a submission
            </Action>
            <TextLink href="/contribute" className="font-display text-[0.95rem]">
              Contribution rules
            </TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-l border-ruling py-3 first:border-l-0">
      <dd className="text-[1.5rem] leading-none font-bold text-ink">{value}</dd>
      <dt className="mt-1.5 text-[0.75rem] text-faint">{label}</dt>
    </div>
  );
}
