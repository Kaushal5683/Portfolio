import type { MetadataRoute } from "next";

const GITHUB = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: [
            `${GITHUB}/sitemap.xml`,
            `${NETLIFY}/sitemap.xml`,
        ],
        host: GITHUB,
    };
}
