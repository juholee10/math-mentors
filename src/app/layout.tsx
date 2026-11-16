import type { Metadata } from "next";
import { Archivo, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SourceInspector from "@/components/dev/SourceInspector";
import { site } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

// Headlines and navigation; body text uses the system sans stack.
const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["300", "400", "500"],
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
      className={`${archivo.variable} ${math.variable} h-full antialiased`}
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
