import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/data/site";

// Source for the site's 1200x630 share banner. `npm run banner`
// (scripts/banner.mjs) screenshots this page into src/app/opengraph-image.png.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BannerPage() {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-paper text-ink">
      <div className="absolute top-12 left-16 flex items-center gap-3 font-display text-xl font-medium">
        <Image src="/mark.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
        {site.name}
      </div>
      <div className="absolute bottom-24 left-16 w-[860px]">
        <p className="text-[15px] tracking-[0.2em] text-faint uppercase">{site.journalName}</p>
        <h1 className="headline mt-6 text-[72px] leading-[1.08]">{site.tagline}</h1>
        <p className="mt-7 text-[24px] font-light text-muted">Math papers by high school students, published twice a year</p>
      </div>
    </div>
  );
}
