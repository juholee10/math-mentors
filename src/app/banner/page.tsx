import Image from "next/image";
import type { Metadata } from "next";
import Volume from "@/components/series/Volume";
import BlankVolume from "@/components/series/BlankVolume";
import { getSeries } from "@/data/resources";
import { site } from "@/data/site";

// Source for the site's 1200x630 share banner. `npm run banner`
// (scripts/banner.mjs) screenshots this page into src/app/opengraph-image.png.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BannerPage() {
  const newest = getSeries().at(-1);

  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-paper text-ink">
      <div className="absolute inset-x-16 top-14 flex items-center gap-3 text-2xl font-black tracking-[-0.04em]">
        <Image src="/mark.png" alt="" width={36} height={36} className="h-9 w-9" />
        {site.name}
      </div>

      <div className="absolute top-[150px] bottom-[92px] left-16 flex w-[520px] flex-col justify-between">
        <h1 className="title-set text-[84px]">Free math guides, written by students.</h1>
        <p className="max-w-[440px] text-[22px] leading-snug text-neutral-600">
          Typeset in LaTeX. Free to read, download, and share.
        </p>
      </div>

      {/* The series standing on its shelf */}
      <div className="absolute right-16 bottom-16 flex items-end gap-5">
        {newest && <Volume resource={newest} className="w-[310px]" />}
        <BlankVolume className="w-[150px]" />
      </div>
      <div className="absolute inset-x-16 bottom-16 h-[3px] bg-ink" />
    </div>
  );
}
