---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/resources","src/app/courses","src/app/contribute","src/app/about"]
---

## Scope

Whole site (Home, Resources, Post, Courses, Contribute, About). Mode: Read. Replacement visual world; the journal look is discarded.

## Audience and job

High school students looking for a course guide, a worked problem or a short note for a specific course; contributors checking exactly what to email.

## Direction contract

Seed key: 097e4191 (assigned, kind: assigned).

THESIS: The site is a library card catalog of student-written math. Every post is a catalogued card with a call number built from its metadata. Refuses the category default of a hero plus a grid of resource cards.

OWN-WORLD: Real catalog-card materials, not cream lamplight: cool white card stock on a pale gray-green ground, typewriter-ribbon blue-black ink, one red top rule per card, faint blue ruling in dense lists, violet date-stamp ink reserved for review stamps. Libre Franklin (library signage) for headings and nav, Source Serif 4 for reading, Courier Prime only for call numbers, dates and counts (data, not costume).

FIRST VIEWPORT: Masthead with name and nav; one plain paragraph saying what the site is; the live catalog itself (newest entries with call numbers) and the post and contributor counts, visible without scrolling. Empty state is a blank catalog card that says no posts are published yet and links to Contribute.

SIGNATURE: Call numbers (type, course code, level, accession number) set as spine-label blocks; course pages as labeled catalog drawers; the "Reviewed by" line rendered as a slightly rotated violet date stamp on each post.

READING COLUMN: Calm serif at 17px, 68ch measure, KaTeX math, standard tables and code.

RISK: Catalog styling could leak into the reading column or feel like costume; keep it to the frame, list rows, call numbers and the stamp.

## Unresolved

Featured courses, reviewer names, team names, final tagline.
