import type { Metadata } from "next";
import { Schibsted_Grotesk, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SourceInspector from "@/components/dev/SourceInspector";
import { site } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

const grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

// Math notation on the covers (variables, labels), set the way LaTeX sets it.
const math = STIX_Two_Text({
  variable: "--font-stix",
  style: "italic",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://math-mentors.org"),
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${math.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <Analytics />
        {process.env.NODE_ENV === "development" && <SourceInspector />}
      </body>
    </html>
  );
}
