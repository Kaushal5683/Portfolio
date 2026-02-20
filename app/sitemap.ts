import type { MetadataRoute } from "next";

const GITHUB = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return routes.flatMap(({ path, priority, changeFrequency }) => [
        { url: `${GITHUB}${path}`, lastModified: now, changeFrequency, priority },
        { url: `${NETLIFY}${path}`, lastModified: now, changeFrequency, priority },
    ]);
}
