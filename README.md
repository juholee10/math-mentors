# Math Mentors

[math-mentors.org](https://math-mentors.org)

Math Mentors is a collection of short math resources written by high school students. There are four kinds of post: Course Guides (600 to 1200 words on what a course is like), Problem Spotlights (one problem with a full solution, 1 to 2 pages), Short Notes (one topic with examples, a 1 to 3 page PDF) and Guides (longer PDF guides to one topic). An editor checks every post before it goes up. Submissions are sent by email to contact@math-mentors.org.

## Adding a post

Adding a post does not need any code changes.

1. Copy `content/posts/_template.md` to `content/posts/<post-name>.md`. Use lowercase letters, numbers and hyphens in the file name; it becomes the URL `/resources/<post-name>`.
2. Fill in the front matter: `title`, `type` (`course-guide`, `problem-spotlight`, `short-note` or `guide`), `course`, `level` (`intro`, `intermediate` or `advanced`), `contributor` (first name or username only), `grade`, `date`, `ai` (optional) and `summary`.
3. Write the post below the front matter in Markdown. Math goes between `$...$` (inline) or `$$...$$` (display).
4. For a PDF, put the file in `public/pdfs/` and set `pdf: <file-name>.pdf`. A post can have a body, a PDF or both.
5. Run `npm run build`. If a field is missing or misspelled, the build stops and names the file and the field.

A course gets its own page at `/courses/<course>` as soon as one post uses it. To give a course a short code for its call numbers (for example `AP-CALC-BC`) or a description, add it to `content/courses.json`. Courses that are not listed get a code made from their name.

## Development

```
npm install
npm run dev
```

Site text that is not part of a post (rules, content types, team, plans) is in `src/data/site.ts`. Page views are counted with Vercel Web Analytics.
