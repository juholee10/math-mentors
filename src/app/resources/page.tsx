import type { Metadata } from "next";
import { Suspense } from "react";
import ResourceBrowser from "@/components/ResourceBrowser";
import { CatalogRows } from "@/components/catalog";
import { Card, PageHead, wrap } from "@/components/ui";
import { getCourses, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Resources",
  description: "All Math Mentors posts: course guides, problem spotlights and short notes, filtered by type, course and level.",
};

export default function ResourcesPage() {
  const posts = getPosts();
  const courses = getCourses().map((c) => c.name);

  return (
    <div className={wrap}>
      <PageHead title="Resources">
        <p>Every reviewed post, newest first. Filter by type, course or level, or search by title, summary and contributor.</p>
      </PageHead>
      {/* Without JavaScript, or before it loads, the full list still shows. */}
      <Suspense
        fallback={
          <Card title="All posts" meta={`${posts.length} posts`}>
            <CatalogRows posts={posts} />
          </Card>
        }
      >
        <ResourceBrowser posts={posts} courses={courses} />
      </Suspense>
    </div>
  );
}
