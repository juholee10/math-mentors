import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cover from "@/components/series/Cover";
import { papers } from "@/data/papers";

// Print-only: the cover as a full PDF page. `npm run covers` (scripts/covers.mjs)
// renders /covers/<pdf file name> and puts it in front of that paper's PDF.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function findByFile(file: string) {
  return papers.find((p) => p.pdfUrl.split("/").pop()?.replace(/\.pdf$/i, "") === file);
}

export function generateStaticParams() {
  return papers.map((p) => ({ file: p.pdfUrl.split("/").pop()!.replace(/\.pdf$/i, "") }));
}

export default async function CoverPage({ params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const paper = findByFile(file);
  if (!paper) notFound();

  return (
    <>
      {/* The script sets the page size to match the paper's PDF; no margins. */}
      <style>{`@page { margin: 0 } html, body { height: 100%; margin: 0 }`}</style>
      <div className="h-screen w-screen print:h-full print:w-full">
        <Cover paper={paper} fill />
      </div>
    </>
  );
}
