// Loads every post from content/posts/*.md. Each file's front matter holds the
// post's details; the body is Markdown with $math$ support. Adding a post is
// adding a file: no code changes. The build stops with a clear message if a
// file has a missing or invalid field.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import courseInfo from "../../content/courses.json";
import { type Post, type PostMeta, type PostType, type Level, POST_TYPES, LEVELS } from "./post-types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PDF_DIR = path.join(process.cwd(), "public", "pdfs");


export * from "./post-types";

type CourseInfo = Record<string, { code?: string; description?: string }>;
const courses = courseInfo as CourseInfo;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Short code for a course, from content/courses.json or made from its name. */
export function courseCode(course: string) {
  const known = courses[course]?.code;
  if (known) return known;
  return course
    .split(/\s+/)
    .map((w) => (w.length > 4 ? w.slice(0, 4) : w))
    .join("-")
    .toUpperCase();
}

export function courseDescription(course: string) {
  return courses[course]?.description ?? null;
}

function fail(file: string, message: string): never {
  throw new Error(`content/posts/${file}: ${message}`);
}

function readString(data: Record<string, unknown>, key: string, file: string, required = true) {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (required) fail(file, `"${key}" is missing.`);
    return "";
  }
  if (typeof value !== "string" && typeof value !== "number") fail(file, `"${key}" must be text.`);
  return String(value).trim();
}

function readDate(data: Record<string, unknown>, file: string) {
  const value = data.date;
  // YAML turns an unquoted 2026-11-20 into a Date.
  if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) return value.trim();
  fail(file, `"date" must look like 2026-11-20.`);
}

type Parsed = Omit<PostMeta, "accession"> & { body: string };

function parseFile(file: string): Parsed {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  if (slug !== slugify(slug)) fail(file, "file names may only use lowercase letters, numbers and hyphens.");

  const type = readString(data, "type", file);
  if (!(type in POST_TYPES)) fail(file, `"type" must be one of: ${Object.keys(POST_TYPES).join(", ")}.`);
  const level = readString(data, "level", file);
  if (!(level in LEVELS)) fail(file, `"level" must be one of: ${Object.keys(LEVELS).join(", ")}.`);

  const gradeText = readString(data, "grade", file, false);
  const grade = gradeText ? Number(gradeText) : null;
  if (gradeText && (!Number.isInteger(grade) || grade! < 1 || grade! > 13)) fail(file, `"grade" must be a number.`);

  const pdfName = readString(data, "pdf", file, false);
  if (pdfName && !fs.existsSync(path.join(PDF_DIR, pdfName))) {
    fail(file, `"pdf" is ${pdfName}, but public/pdfs/${pdfName} does not exist.`);
  }

  const course = readString(data, "course", file);
  const body = content.trim();
  if (!body && !pdfName) fail(file, "the post needs a body, a PDF, or both.");

  return {
    slug,
    title: readString(data, "title", file),
    type: type as PostType,
    course,
    courseSlug: slugify(course),
    courseCode: courseCode(course),
    level: level as Level,
    contributor: readString(data, "contributor", file),
    grade,
    date: readDate(data, file),
    ai: readString(data, "ai", file, false),
    summary: readString(data, "summary", file),
    pdf: pdfName ? `/pdfs/${pdfName}` : null,
    body,
  };
}

let cache: (Parsed & { accession: number })[] | null = null;

function loadAll() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    : [];
  const parsed = files.map(parseFile);
  // Accession numbers follow publication order, oldest first.
  parsed.sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
  cache = parsed.map((p, i) => ({ ...p, accession: i + 1 }));
  return cache;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toMeta({ body: _body, ...meta }: Parsed & { accession: number }): PostMeta {
  return meta;
}

/** All posts, newest first. */
export function getPosts(): PostMeta[] {
  return loadAll().map(toMeta).reverse();
}

export async function getPost(slug: string): Promise<Post | null> {
  const found = loadAll().find((p) => p.slug === slug);
  if (!found) return null;
  const html = found.body
    ? String(
        await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkMath)
          .use(remarkRehype)
          .use(rehypeKatex)
          .use(rehypeStringify)
          .process(found.body)
      )
    : "";
  return { ...toMeta(found), html };
}

export interface Course {
  name: string;
  slug: string;
  code: string;
  description: string | null;
  posts: PostMeta[];
}

/** Every course or topic with at least one post, by name. */
export function getCourses(): Course[] {
  const map = new Map<string, Course>();
  for (const post of getPosts()) {
    const course = map.get(post.courseSlug) ?? {
      name: post.course,
      slug: post.courseSlug,
      code: post.courseCode,
      description: courseDescription(post.course),
      posts: [],
    };
    course.posts.push(post);
    map.set(post.courseSlug, course);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function countContributors(posts: PostMeta[]) {
  return new Set(posts.map((p) => p.contributor.toLowerCase())).size;
}

