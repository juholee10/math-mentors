import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogRows } from "@/components/catalog";
import { Card, PageHead, wrap } from "@/components/ui";
import { POST_TYPES, type PostType } from "@/lib/post-types";
import { countContributors, getCourses } from "@/lib/posts";

export function generateStaticParams() {
  return getCourses().map((c) => ({ course: c.slug }));
}

export const dynamicParams = false;

function findCourse(slug: string) {
  return getCourses().find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const course = findCourse((await params).course);
  if (!course) return {};
  return { title: course.name, description: `Math Mentors posts about ${course.name}.` };
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const course = findCourse((await params).course);
  if (!course) notFound();

  const groups = (Object.keys(POST_TYPES) as PostType[])
    .map((t) => ({ type: t, posts: course.posts.filter((p) => p.type === t) }))
    .filter((g) => g.posts.length > 0);
  const contributors = countContributors(course.posts);

  return (
    <div className={wrap}>
      <nav aria-label="Breadcrumb" className="pt-8 font-display text-[0.9rem] text-muted">
        <Link href="/courses" className="hover:text-ink hover:underline">
          Courses
        </Link>
      </nav>
      <PageHead
        title={course.name}
        aside={
          <p className="typed text-[0.9rem] text-faint md:text-right">
            {course.code}
            <br />
            {course.posts.length} {course.posts.length === 1 ? "post" : "posts"} · {contributors}{" "}
            {contributors === 1 ? "contributor" : "contributors"}
          </p>
        }
      >
        {course.description && <p>{course.description}</p>}
      </PageHead>

      <div className="space-y-8">
        {groups.map((g) => (
          <Card key={g.type} title={POST_TYPES[g.type].plural} meta={`${g.posts.length}`}>
            <CatalogRows posts={g.posts} />
          </Card>
        ))}
      </div>
    </div>
  );
}
