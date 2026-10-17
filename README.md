# Math Mentors

**Free math guides, written by students.**

We're a student-run volunteer organization that writes LaTeX-typeset problem sheets, packets, equation sheets, and full guides, then gives them away for free, for any math course or level.

Math Mentors is a volunteer organization where students write and typeset study materials in LaTeX so anyone can study math for free. Every guide is written by students, reviewed by students, and released for free to anyone who wants them, whatever math you're learning.

## Why Math Mentors

**Written by students who just took the course.**
We believe that students who have taken the course can reflect their experiences of learning the materials on their work, since they know exactly what they struggled on. We bring these ideas to reality using LaTeX, an important software that will be used in their future academic career as well.

**Complete, and free.**
We publish our work here on the internet for free without any paywalls or any need to create an account.

## Want to join the team?

No LaTeX experience required. We'll teach you. Fill out the [interest form](https://forms.gle/Dtjab1f5zGi8mrN5A), or email us at contact@math-mentors.org.

---

## Running the site

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Adding a guide

1. Put the guide's PDF in `pdfs-source/` (for example `pdfs-source/integrals.pdf`).
2. Add the guide to `src/data/resources.ts` with `pdfUrl: "/pdfs/integrals.pdf"`.
3. With `npm run dev` running, run `npm run covers` in a second terminal. This adds the guide's cover as the first page of its PDF and writes the result to `public/pdfs/`, which is what the site serves.

Cover diagrams are drawn per guide in `src/components/series/Figure.tsx`. A guide without a `figure` gets a title-only cover.

## Other scripts

- `npm run banner`: re-renders the link-preview image (`src/app/opengraph-image.png`) from the `/banner` page. Run it after changing the logo, the banner, or adding a guide.
- `npm run build`: production build.
- `npm run lint`: lint the code.

Site text, links and stats live in `src/data/site.ts`; reviews live in `src/data/testimonials.ts`.
