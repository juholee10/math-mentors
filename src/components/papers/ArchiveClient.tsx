"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaperCard from "@/components/papers/PaperCard";
import { ArrowLink } from "@/components/ui";
import { Search } from "@/components/icons";
import { SECTIONS, formatIssue, getIssues, getNextIssue, getPosition, papers } from "@/data/papers";

const ALL = "All";

export default function ArchiveClient() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const issueLabels = getIssues().map(formatIssue);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const sectionParam = params.get("section");
  const issueParam = params.get("issue");
  const section = SECTIONS.includes(sectionParam as never) ? sectionParam! : ALL;
  const issue = issueParam && issueLabels.includes(issueParam) ? issueParam : ALL;

  // Filters live in the URL so a filtered view can be shared and the back button works.
  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === ALL || value === "") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function clearAll() {
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  const q = query.trim().toLowerCase();
  const filtered = papers
    .filter((p) => section === ALL || p.section === section)
    .filter((p) => issue === ALL || formatIssue(p.issue) === issue)
    .filter(
      (p) =>
        q === "" ||
        [p.title, p.abstract, p.section, ...p.contents, ...p.authors.map((a) => a.name)].some((field) =>
          field.toLowerCase().includes(q)
        )
    )
    .sort((a, b) => getPosition(b) - getPosition(a));

  const filtering = q !== "" || section !== ALL || issue !== ALL;

  if (papers.length === 0) {
    return (
      <div className="mt-16 max-w-[36rem] border-t border-line pt-8">
        <p className="text-lg text-ink">No papers yet</p>
        <p className="mt-2 text-base leading-[26px] font-light text-muted">
          The first issue ({formatIssue(getNextIssue())}) is in preparation. Papers are added here after they
          pass peer review.
        </p>
        <ArrowLink href="/submit" className="mt-5">
          Submission guidelines
        </ArrowLink>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex max-w-xl items-center border-b border-neutral-300 focus-within:border-ink">
        <Search className="h-4 w-4 text-faint" />
        <input
          type="search"
          aria-label="Search the papers"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setParam("q", e.target.value.trim());
          }}
          placeholder="Search titles, authors and abstracts"
          className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-faint focus:outline-none"
        />
      </div>

      <div className="mt-8 grid gap-3">
        <Tabs label="Section" options={[ALL, ...SECTIONS]} value={section} onChange={(v) => setParam("section", v)} />
        <Tabs label="Issue" options={[ALL, ...issueLabels]} value={issue} onChange={(v) => setParam("issue", v)} />
      </div>

      <div className="mt-8 flex min-h-8 items-center justify-between text-sm text-muted" aria-live="polite">
        <span>
          {filtered.length} {filtering ? "matching " : ""}
          {filtered.length === 1 ? "paper" : "papers"}
        </span>
        {filtering && (
          <button type="button" onClick={clearAll} className="min-h-8 hover:text-ink">
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {filtered.map((paper) => (
            <li key={paper.slug}>
              <PaperCard paper={paper} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 max-w-[36rem] border-t border-line pt-8">
          <p className="text-lg text-ink">No matching papers</p>
          <p className="mt-2 text-base leading-[26px] font-light text-muted">
            Try a shorter search or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}

/** A row of text tabs; the active one is underlined, like openwebui's install tabs. */
function Tabs({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-x-1">
      <span className="eyebrow mr-4 w-16">{label}</span>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`min-h-9 border-b px-2.5 text-[13px] transition-colors ${
              active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
