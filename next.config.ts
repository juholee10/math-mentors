import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old URLs from the journal version of the site.
  async redirects() {
    return [
      { source: "/papers", destination: "/resources", permanent: true },
      { source: "/papers/:slug", destination: "/resources", permanent: true },
      { source: "/submit", destination: "/contribute", permanent: true },
      { source: "/join", destination: "/contribute", permanent: true },
      { source: "/testimonials/new", destination: "/contribute", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      // Dev-only: tag JSX elements with their source location for the
      // ⌥-click inspector (src/components/dev/SourceInspector.tsx).
      "*.tsx": {
        condition: { all: ["development", { not: "foreign" }, { path: /^src\// }] },
        loaders: [path.join(process.cwd(), "dev/source-loader.cjs")],
      },
    },
  },
};

export default nextConfig;
