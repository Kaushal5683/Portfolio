import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // For GitHub Pages: set repo name as basePath if GITHUB_PAGES env is true
    ...(process.env.GITHUB_PAGES === "true"
        ? {
            basePath: "/portfolio-nextjs",
            assetPrefix: "/portfolio-nextjs/",
        }
        : {}),
};

export default nextConfig;
