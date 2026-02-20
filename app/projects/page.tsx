import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import ProjectsPage from "@/components/sections/ProjectsPage";
import CelestialSphere from "@/components/ui/CelestialSphere";

const BASE_URL = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore 12+ projects by Kaushal Gujarathi — live client websites (Next.js, React), AI systems (Minimax, Voice Assistant, Chatbot), full-stack MERN apps, and embedded systems (ESP32, Sonar).",
    keywords: [
        "Kaushal Gujarathi projects", "Next.js client website", "React portfolio projects",
        "Java projects", "MERN stack projects", "AI projects India",
        "embedded systems project", "ESP32 car", "full stack developer projects",
    ],
    alternates: {
        canonical: `${BASE_URL}/projects`,
        languages: { "en-IN": `${NETLIFY}/projects` },
    },
    openGraph: {
        title: "Projects — Kaushal Gujarathi",
        description: "12+ projects: client websites, AI systems, MERN apps, and embedded systems.",
        url: `${BASE_URL}/projects`,
        images: [{ url: `${BASE_URL}/images/arnav.webp`, width: 1200, height: 630, alt: "Projects by Kaushal Gujarathi" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects — Kaushal Gujarathi",
        description: "Client websites, AI projects, full-stack apps and more.",
        images: [`${BASE_URL}/images/arnav.webp`],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Kaushal Gujarathi",
    url: `${BASE_URL}/projects`,
    description: "Software development projects by Kaushal Gujarathi — client sites, AI, MERN, embedded.",
    creator: { "@type": "Person", name: "Kaushal Gujarathi", url: BASE_URL },
};


export default function Projects() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
