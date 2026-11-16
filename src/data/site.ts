// Site-wide copy and config. Edit this file to change text without touching components.

export const site = {
  name: "Math Mentors",
  shortName: "MM",
  // Working name, not final.
  journalName: "The Math Mentors Journal",
  tagline: "A peer-reviewed student math journal",
  hook:
    "Math Mentors is a peer-reviewed math journal written by students. Authors learn LaTeX on their own, write their papers in the journal's template and review each other's work. Papers that pass peer review are published here in two issues each year.",
  description:
    "Math Mentors publishes The Math Mentors Journal, a peer-reviewed journal of math papers written by high school students. Each paper is checked by two student reviewers before it is accepted, and every paper uses the same LaTeX template. Any topic in mathematics is welcome.",
  founded: 2025,

  // Shown in the header, in the order they should appear.
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Archive", href: "/papers" },
    { label: "Submit", href: "/submit" },
    { label: "Join", href: "/join" },
  ],

  // All "contact us" links, joining, and paper submissions use this email.
  contactEmail: "contact@math-mentors.org",

  // The two ways into the journal. Shown on Home and Join.
  tracks: [
    {
      who: "New to LaTeX",
      title: "Learning LaTeX",
      description:
        "New members learn LaTeX on their own before they write a paper. No LaTeX experience is needed to join, and every paper uses the same template, so there is one fixed format to learn.",
    },
    {
      who: "Already know LaTeX",
      title: "Paper writing",
      description:
        "Members who already know LaTeX write papers for the journal. A paper can explain a known result with original examples and complete proofs, prove one short result or explore an open question. Members also review each other's papers.",
    },
  ],

  // The jobs behind every paper. Shown on Join's credits page.
  roles: [
    {
      title: "Author",
      credit: "Written by",
      description: "Writes the paper in the journal's LaTeX template and revises it after review.",
    },
    {
      title: "Reviewer",
      credit: "Reviewed by",
      description: "Checks every proof in the paper and writes a report. Each paper has two reviewers.",
    },
    {
      title: "Editor",
      credit: "Edited by",
      description: "Checks the format and topic, assigns the reviewers and makes the final decision on each paper.",
    },
    {
      title: "Typesetter",
      credit: "Typeset by",
      description: "Keeps each paper in the journal template and puts the issue together.",
    },
  ],

  // The editorial board, shown on About. Fill in `name` once each role is chosen.
  board: [
    { role: "Editor-in-Chief", name: "" },
    { role: "Managing Editor", name: "" },
    { role: "Section Editor, Articles and Notes", name: "" },
    { role: "Section Editor, Research", name: "" },
    { role: "Problems Editor", name: "" },
    { role: "LaTeX and Production", name: "" },
    { role: "Faculty Advisor", name: "" },
  ],

  // From submission to publication. Shown on About and Submit.
  review: [
    { step: "Editor check", time: "About 1 week", description: "The editor checks the paper's format and topic." },
    {
      step: "Peer review",
      time: "About 2 weeks",
      description: "Two member reviewers check every proof and each write a report.",
    },
    {
      step: "Revision",
      time: "",
      description: "The author revises the paper and replies to each comment in a short letter.",
    },
    { step: "Decision", time: "", description: "The editor decides: accept, revise again, or reject." },
    {
      step: "Outside reading",
      time: "",
      description:
        "Research papers, and Notes where possible, also go to a faculty advisor or an outside reader, such as a math teacher or a university math student.",
    },
  ],
  reviewTotal: "The whole process usually takes about 4 to 8 weeks.",

  // The journal's sections. Shown on Submit.
  sections: [
    {
      name: "Articles",
      length: "4–8 pages",
      description:
        "Articles are expository papers that explain a known result clearly, with original examples and complete proofs. Surveys, which review the published work on a topic, are also printed as Articles with a \"Survey\" label.",
    },
    {
      name: "Notes",
      length: "2–4 pages",
      description:
        "Notes are short papers that present a single result, such as a new proof of a known theorem, a generalization of a competition problem or a small lemma.",
    },
    {
      name: "Research",
      length: "5–12 pages",
      description:
        "Research papers are exploratory papers that report computed data and conjectures, prove some of the cases and say which questions are still open.",
    },
    {
      name: "Problems",
      length: "1 page each",
      description: "Problems are original problems written by members. Their solutions are published in the next issue.",
    },
  ],

  standards: [
    "Every proof must be complete and correct.",
    "Every result that is used but not proved must have a citation.",
    "Each paper must say clearly which parts are known and which parts are the author's own work.",
    "A computer check is evidence, not a proof. Papers must label it as a check.",
    "Surveys must cite original sources (papers and books), not only Wikipedia or blogs.",
    "A claim of \"a new proof\" needs a literature search first. Write \"we could not find this proof in the literature\", not \"this is new\".",
  ],
};
