// Site-wide text and settings. Edit this file to change wording without
// touching components. Posts live in content/posts, not here.

export const site = {
  name: "Math Mentors",
  url: "https://math-mentors.org",
  contactEmail: "contact@math-mentors.org",
  description:
    "Short math resources written by high school students: course guides, worked problems and notes. An editor checks every post before it goes up.",

  nav: [
    { label: "Resources", href: "/resources" },
    { label: "Courses", href: "/courses" },
    { label: "Contribute", href: "/contribute" },
    { label: "About", href: "/about" },
  ],

  // Shown on Contribute. The limits are the ones editors check.
  types: [
    {
      key: "course-guide",
      name: "Course Guide",
      limit: "600 to 1200 words",
      description:
        'What you wish you had known before a course: the workload, the units that took the most time, how you studied and the free resources that helped. Title it like "What I wish I knew before AP Precalculus".',
    },
    {
      key: "problem-spotlight",
      name: "Problem Spotlight",
      limit: "1 to 2 pages",
      description:
        "One problem you struggled with, a full solution and the idea that made it work. Say where you got stuck, because that is the part other students need.",
    },
    {
      key: "short-note",
      name: "Short Note",
      limit: "1 to 3 pages",
      description:
        "One topic explained with worked examples, sent as a PDF. LaTeX is preferred but not required.",
    },
    {
      key: "guide",
      name: "Guide",
      limit: "Longer than 3 pages",
      description:
        "A full guide to one topic, sent as a PDF: explanations, worked examples, derivations of the main formulas and problems with solutions.",
    },
  ],

  // Shown on Contribute.
  rules: [
    {
      name: "Review",
      text: "One editor checks every post for mathematical mistakes and for the rules below before it goes up. The editor may ask you to fix something first.",
    },
    {
      name: "Copyright",
      text: "Send only your own notes and solutions. Scans or copies of textbooks, teacher handouts and paid materials are not accepted.",
    },
    {
      name: "Academic integrity",
      text: "No answers to homework, quizzes or tests that are currently being graded at any school.",
    },
    {
      name: "Privacy",
      text: "Contributors are shown by first name and grade, or by a username. Full names, photos and contact details are never shown unless you and the club both agree. Your email address is never published.",
    },
    {
      name: "AI use",
      text: "You can use AI tools for LaTeX help and for checking your work. Say how you used them, and make sure you understand everything you send. The statement is printed on the post.",
    },
  ],

  // Shown on About. Fill in names when they are decided; empty names are hidden.
  team: [
    { role: "Founder", name: "Juho Lee" },
    { role: "Editor", name: "" },
    { role: "Faculty advisor", name: "" },
  ],

  // Shown on About. The order matters: each stage builds on the one before.
  stages: [
    {
      name: "Resource hub",
      status: "Now",
      text: "Course Guides, Problem Spotlights, Short Notes and Guides, each checked by one editor.",
    },
    {
      name: "Longer expository pieces",
      status: "Later",
      text: "The strongest spotlights and notes are expanded into 3 to 5 page pieces with full proofs.",
    },
    {
      name: "Student math journal",
      status: "Later",
      text: "Those pieces are collected into Volume 1 of a student math journal.",
    },
  ],
};

/** The pre-filled email that the Contribute page's button opens. */
export const submissionEmail = {
  subject: "Math Mentors submission: [title]",
  body: [
    "Display name and grade:",
    "School (optional):",
    "Content type (Course Guide, Problem Spotlight, Short Note or Guide):",
    "Title:",
    "Course or topic:",
    "Level (intro, intermediate or advanced):",
    "",
    "The post is attached as a PDF, .tex or .md file, or written below this message.",
    "",
    "I confirm that this is my own work, that it contains no copyrighted material (no scans of textbooks, teacher handouts or paid materials) and that it is not an answer to work currently being graded at any school.",
    "",
    'AI use (write "None", or say what you used AI for):',
  ].join("\n"),
};

export function submissionMailto() {
  const q = `subject=${encodeURIComponent(submissionEmail.subject)}&body=${encodeURIComponent(submissionEmail.body)}`;
  return `mailto:${site.contactEmail}?${q}`;
}
