// Renders the site's share banner (the image shown when a link to the site is
// posted in iMessage, Discord, X, ...).
//
//   1. Start the site:  npm run dev
//   2. In another terminal:  npm run banner
//
// Screenshots /banner at 1200x630 (2x for sharp text) into
// src/app/opengraph-image.png, which Next.js serves as the og:image for every
// page. Re-run it after changing the banner, the logo, or the newest guide.

import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = process.env.BANNER_URL ?? "http://localhost:3000";
const OUT = path.join(ROOT, "src", "app", "opengraph-image.png");

async function launch() {
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return await chromium.launch();
  }
}

try {
  await fetch(SITE, { method: "HEAD" });
} catch {
  console.error(`Can't reach the site at ${SITE}. Start it first with: npm run dev`);
  process.exit(1);
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(`${SITE}/banner`, { waitUntil: "networkidle" });
// Wait for the real web fonts (not just the fallback) before measuring.
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.fonts].map((f) => f.load().catch(() => {})));
});
await page.waitForTimeout(300);
// Hide the Next.js dev-mode badge so it isn't captured.
await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`✓ banner written to ${path.relative(ROOT, OUT)}`);
