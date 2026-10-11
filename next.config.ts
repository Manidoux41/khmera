import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // Runs after public files and static routes, before /[locale]: missing
      // assets such as /sw.js or /favicon.ico must not render as a locale.
      afterFiles: [
        {
          source: "/:asset([^/_][^/]*\\.[^/]*)/:rest*",
          destination: "/asset-not-found",
        },
      ],
      fallback: [],
    };
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
