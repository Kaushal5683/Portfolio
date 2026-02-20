import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import AboutPage from "@/components/sections/AboutPage";
import CelestialSphere from "@/components/ui/CelestialSphere";

const BASE_URL = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

export const metadata: Metadata = {
    title: "About Me",
    description: "Full profile of Kaushal Gujarathi — Java Backend & Full Stack Developer. 1+ year experience, BSc CS (CGPA 8.56), certifications in React, Java, NVIDIA Deep Learning, and more.",
    keywords: [
        "Kaushal Gujarathi about", "Java developer profile", "full stack developer India",
        "Spring Boot developer", "React developer Pune", "software engineer portfolio",
        "Symbiosis MCA", "Sinhgad College CS",
    ],
    alternates: {
        canonical: `${BASE_URL}/about`,
        languages: { "en-IN": `${NETLIFY}/about` },
    },
    openGraph: {
        title: "About Kaushal Gujarathi — Developer & Engineer",
        description: "Work experience, education, skills, and certifications of Kaushal Gujarathi.",
        url: `${BASE_URL}/about`,
        images: [{ url: `${BASE_URL}/images/ksg.webp`, width: 1200, height: 630, alt: "Kaushal Gujarathi" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Kaushal Gujarathi",
        description: "Education, experience, skills, and certifications of Kaushal Gujarathi.",
        images: [`${BASE_URL}/images/ksg.webp`],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Kaushal Gujarathi",
    url: `${BASE_URL}/about`,
    mainEntity: {
        "@type": "Person",
        name: "Kaushal Gujarathi",
        jobTitle: "Java Backend Developer | Full Stack Developer",
        alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Sinhgad College Of Science" },
            { "@type": "CollegeOrUniversity", name: "Symbiosis School for Online & Digital Learning" },
        ],
        hasCredential: [
            { "@type": "EducationalOccupationalCredential", name: "React Development", credentialCategory: "certificate" },
            { "@type": "EducationalOccupationalCredential", name: "NVIDIA Deep Learning", credentialCategory: "certificate" },
            { "@type": "EducationalOccupationalCredential", name: "Full Stack Java Development", credentialCategory: "certificate" },
        ],
    },
};


export default function About() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CelestialSphere hue={260} speed={0.25} zoom={1.6} particleSize={2.5} fps={45} />
            <Navbar />
            <FloatingSocialBar />
            <div className="pt-24">
                <AboutPage />
            </div>
            <Footer />
        </main>
    );
}
