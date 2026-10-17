"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps every page in the header and footer, except the bare pages that
 * scripts capture: PDF covers under /covers and the share banner at /banner.
 */
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/covers/") || pathname === "/banner") return <>{children}</>;

  return (
    <>
      {header}
      <main className="flex-1 pb-28">{children}</main>
      {footer}
    </>
  );
}
