import type { Metadata } from "next";
import Link from "next/link";
import { BlankCard } from "@/components/catalog";
import { Card, PageHead, TextLink, wrap } from "@/components/ui";
import { POST_TYPES, type PostType } from "@/lib/post-types";
import { getCourses } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Courses",
  description: "Math Mentors posts grouped by course and topic.",
};

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className={wrap}>
      <PageHead title="Courses">
        <p>
          Each course or topic with at least one post has its own page with all of its guides, spotlights and notes. A
          course gets a page as soon as its first post is published.
        </p>
      </PageHead>

      {courses.length === 0 ? (
        <Card>
          <BlankCard title="No courses yet">
            Courses appear here once posts are published. <TextLink href="/contribute">Contribute</TextLink> explains
            how to write the first post for your course.
          </BlankCard>
        </Card>
      ) : (
        // The catalog cabinet: one drawer per course.
        <ul className="grid gap-3 rounded-[4px] bg-drawer p-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const counts = (Object.keys(POST_TYPES) as PostType[])
              .map((t) => ({ t, n: c.posts.filter((p) => p.type === t).length }))
              .filter((x) => x.n > 0);
            return (
              <li key={c.slug}>
                <Link
                  href={`/courses/${c.slug}`}
                  className="group flex h-full flex-col items-center rounded-[3px] border border-ink/15 bg-[#eef0eb] px-5 pt-5 pb-4 shadow-[inset_0_-2px_0_rgb(27_34_50/0.08)] transition-colors hover:bg-card"
                >
                  {/* Label holder */}
                  <span className="block w-full max-w-[17rem] rounded-[2px] border-2 border-[#9aa093] bg-card px-3 py-2 text-center">
                    <span className="block font-display text-[1.05rem] font-semibold group-hover:underline group-hover:decoration-rule">
                      {c.name}
                    </span>
                    <span className="typed mt-0.5 block text-[0.8rem] text-faint">{c.code}</span>
                  </span>
                  <span className="mt-3 block text-center font-display text-[0.86rem] text-muted">
                    {counts.map((x) => `${x.n} ${x.n === 1 ? POST_TYPES[x.t].label : POST_TYPES[x.t].plural}`).join(" · ")}
                  </span>
                  {/* Drawer pull */}
                  <span aria-hidden className="mt-3 block h-2 w-14 rounded-b-full border-2 border-t-0 border-[#9aa093]" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
