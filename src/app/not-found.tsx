import { Action, PageHead, wrap } from "@/components/ui";

export default function NotFound() {
  return (
    <div className={wrap}>
      <PageHead title="Page not found">
        <p>There is no page at this address. It may have moved when the site was reorganized.</p>
      </PageHead>
      <div className="flex flex-wrap gap-3">
        <Action href="/resources">Resources</Action>
        <Action href="/" variant="plain">
          Home
        </Action>
      </div>
    </div>
  );
}
