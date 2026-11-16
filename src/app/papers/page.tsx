import { Suspense } from "react";
import type { Metadata } from "next";
import ArchiveClient from "@/components/papers/ArchiveClient";
import { PageIntro, wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Archive | Math Mentors",
  description: "Papers accepted by The Math Mentors Journal.",
};

export default function ArchivePage() {
  return (
    <div className={`${wrap} pt-24 sm:pt-28`}>
      <PageIntro eyebrow="Archive" title="Papers">
        <p>Every paper here has passed peer review. Papers are free to read online or to download as PDFs.</p>
      </PageIntro>
      {/* useSearchParams needs a Suspense boundary on a static page */}
      <Suspense>
        <ArchiveClient />
      </Suspense>
    </div>
  );
}
