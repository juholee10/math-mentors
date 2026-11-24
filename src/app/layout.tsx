import type { Metadata } from "next";
import { Courier_Prime, Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SourceInspector from "@/components/dev/SourceInspector";
import { site } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

// Headings and navigation, after the Franklin Gothic of library signage.
const franklin = Libre_Franklin({ variable: "--font-franklin", weight: ["400", "500", "600", "700"], subsets: ["latin"] });

// Reading text.
const serif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], style: ["normal", "italic"] });

// Call numbers, dates and counts only.
const courier = Courier_Prime({ variable: "--font-courier", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${franklin.variable} ${serif.variable} ${courier.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-card focus:px-3 focus:py-2 font-display text-sm"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        {process.env.NODE_ENV === "development" && <SourceInspector />}
      </body>
    </html>
  );
}
