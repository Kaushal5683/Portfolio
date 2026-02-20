/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // For GitHub Pages: set repo name as basePath if GITHUB_PAGES env is true
    ...(process.env.GITHUB_PAGES === "true"
        ? {
            basePath: "/Portfolio",
        }
        : {}),
};

export default nextConfig;
