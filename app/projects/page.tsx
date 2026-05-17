import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import ProjectsPage from "@/components/sections/ProjectsPage";

const CelestialSphere = dynamic(
    () => import("@/components/ui/CelestialSphere"),
    { ssr: false }
);

const BASE    = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";
const OG_IMG  = `${BASE}/images/ME1.webp`;

export const metadata: Metadata = {
    // Template from layout gives: "All Projects | Kaushal Gujarathi"
    title: "All Projects",
    description:
        "Explore 12+ projects by Kaushal Gujarathi — live client websites (Next.js, React), " +
        "AI chatbots, full-stack MERN apps, Java systems & embedded ESP32 projects. Click to expand.",

    keywords: [
        "Kaushal Gujarathi projects", "Java developer projects India", "React portfolio projects",
        "Next.js client website", "MERN stack project", "AI chatbot project",
        "Spring Boot project", "ESP32 embedded project", "full stack developer portfolio",
        "Kaushal Gujarathi", "web developer projects Pune", "live website projects",
        "client website developer India", "GitHub projects Kaushal",
    ],

    alternates: {
        canonical: `${BASE}/projects`,
        languages: { "en-IN": `${NETLIFY}/projects` },
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: `${BASE}/projects`,
        siteName: "Kaushal Gujarathi — Portfolio",
        title: "All Projects — Kaushal Gujarathi | 12+ Dev Projects",
        description:
            "Client websites, AI systems, MERN apps, Java projects & embedded systems " +
            "built by Kaushal Gujarathi — Full Stack Developer, Pune.",
        images: [{ url: OG_IMG, width: 1200, height: 630, alt: "Projects by Kaushal Gujarathi" }],
    },

    twitter: {
        card: "summary_large_image",
        title: "All Projects — Kaushal Gujarathi",
        description:
            "12+ projects: client sites, AI, MERN, Java, embedded systems. Kaushal Gujarathi, Pune.",
        images: [OG_IMG],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
};

// JSON-LD: CollectionPage + BreadcrumbList
const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${BASE}/projects/#webpage`,
        name: "All Projects — Kaushal Gujarathi",
        description:
            "Software development projects by Kaushal Gujarathi — client sites, AI, MERN, embedded.",
        url: `${BASE}/projects`,
        isPartOf: { "@id": `${BASE}/#website` },
        breadcrumb: { "@id": `${BASE}/projects/#breadcrumb` },
        creator: { "@type": "Person", name: "Kaushal Gujarathi", url: BASE },
        about: { "@type": "Person", name: "Kaushal Gujarathi" },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${BASE}/projects/#breadcrumb`,
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/projects` },
        ],
    },
];

export default function Projects() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            {jsonLd.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <CelestialSphere hue={240} speed={0.25} zoom={1.6} particleSize={2.5} />
            <Navbar />
            <FloatingSocialBar />
            <div className="pt-24">
                <ProjectsPage />
            </div>
            <Footer />
        </main>
    );
}
