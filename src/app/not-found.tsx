import Button from "@/components/Button";
import { ArrowLink, PageIntro, wrap } from "@/components/ui";

export default function NotFound() {
  return (
    <div className={`${wrap} pt-24 sm:pt-28`}>
      <PageIntro eyebrow="404" title="Page not found">
        <p>This page does not exist or has moved. Published papers are listed in the archive.</p>
      </PageIntro>
      <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href="/papers" className="min-w-56">
          Archive
        </Button>
        <ArrowLink href="/">Home</ArrowLink>
      </div>
    </div>
  );
}
