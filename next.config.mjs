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
            env: {
                NEXT_PUBLIC_BASE_PATH: "/Portfolio",
            },
        }
        : {
            env: {
                NEXT_PUBLIC_BASE_PATH: "",
            },
        }),
};

export default nextConfig;
