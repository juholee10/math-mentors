"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BlankCard, CatalogRows } from "@/components/catalog";
import { Search } from "@/components/icons";
import { Action, Card, TextLink } from "@/components/ui";
import { LEVELS, POST_TYPES, type PostMeta } from "@/lib/post-types";

const fieldClass =
  "h-11 w-full rounded-[3px] border border-edge bg-card px-3 font-display text-[0.95rem] text-ink outline-none transition-colors hover:border-ink/40 focus:border-ink";

export default function ResourceBrowser({ posts, courses }: { posts: PostMeta[]; courses: string[] }) {
  const pathname = usePathname();
  const params = useSearchParams();

  const type = params.get("type") ?? "";
  const course = params.get("course") ?? "";
  const level = params.get("level") ?? "";
  const q = params.get("q") ?? "";

  // Filters live in the URL so a filtered list can be linked. Next.js keeps
  // useSearchParams in sync with history.replaceState, with no server request.
  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (type && p.type !== type) return false;
      if (course && p.courseSlug !== course) return false;
      if (level && p.level !== level) return false;
      if (!words.length) return true;
      const text = `${p.title} ${p.summary} ${p.course} ${p.contributor} ${POST_TYPES[p.type].label}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [posts, type, course, level, q]);

  const filtered = Boolean(type || course || level || q);
  const courseOptions = courses.map((name) => ({ name, slug: posts.find((p) => p.course === name)!.courseSlug }));

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <label className="relative block sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Search posts</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Search titles, summaries, courses"
            className={`${fieldClass} pl-9 placeholder:text-faint`}
          />
        </label>
        <Select label="Type" value={type} onChange={(v) => set("type", v)}>
          {Object.entries(POST_TYPES).map(([key, t]) => (
            <option key={key} value={key}>
              {t.label}
            </option>
          ))}
        </Select>
        <Select label="Course or topic" value={course} onChange={(v) => set("course", v)}>
          {courseOptions.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select label="Level" value={level} onChange={(v) => set("level", v)}>
          {Object.entries(LEVELS).map(([key, l]) => (
            <option key={key} value={key}>
              {l.label}
            </option>
          ))}
        </Select>
      </form>

      <Card
        className="mt-6"
        title={filtered ? "Matching posts" : "All posts"}
        meta={
          <span aria-live="polite">
            {filtered ? `${results.length} of ${posts.length}` : `${posts.length}`} {posts.length === 1 ? "post" : "posts"}
          </span>
        }
      >
        {posts.length === 0 ? (
          <BlankCard title="No posts yet">
            The first posts are being reviewed. <TextLink href="/contribute">Contribute</TextLink> explains how to send one.
          </BlankCard>
        ) : results.length === 0 ? (
          <BlankCard title="No posts match these filters">
            <span className="block">Try fewer words or a different filter.</span>
            <Action href={pathname} variant="plain" className="mt-3">
              Clear filters
            </Action>
          </BlankCard>
        ) : (
          <CatalogRows posts={results} />
        )}
      </Card>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldClass} ${value ? "border-ink/60" : ""}`}>
        <option value="">{label}: all</option>
        {children}
      </select>
    </label>
  );
}
