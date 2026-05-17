import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import AboutPage from "@/components/sections/AboutPage";

const CelestialSphere = dynamic(
    () => import("@/components/ui/CelestialSphere"),
    { ssr: false }
);

const BASE    = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";
const OG_IMG  = `${BASE}/images/ME1.webp`;

export const metadata: Metadata = {
    // Template from layout gives: "About Me | Kaushal Gujarathi"
    title: "About Me",
    description:
        "Kaushal Gujarathi — Java Backend & Full Stack Developer, Pune. " +
        "BSc CS (CGPA 8.56), MCA Symbiosis. NVIDIA Deep Learning · React · Java certified. " +
        "1+ year industry experience.",

    keywords: [
        "Kaushal Gujarathi about", "Kaushal Gujarathi developer profile",
        "Java developer profile India", "full stack developer profile Pune",
        "Spring Boot developer experience", "React developer certifications",
        "NVIDIA Deep Learning certificate", "Symbiosis MCA developer",
        "Sinhgad College CS developer", "software engineer Pune bio",
        "Kaushal Gujarathi education", "Kaushal Gujarathi skills",
        "Kaushal Gujarathi resume", "Kaushal Gujarathi CV",
        "hire Java developer Pune", "Java Spring Boot developer profile",
    ],

    alternates: {
        canonical: `${BASE}/about`,
        languages: { "en-IN": `${NETLIFY}/about` },
    },

    openGraph: {
        type: "profile",
        locale: "en_IN",
        url: `${BASE}/about`,
        siteName: "Kaushal Gujarathi — Portfolio",
        title: "About Kaushal Gujarathi — Java & Full Stack Developer, Pune",
        description:
            "Meet Kaushal Gujarathi — Java Backend & Full Stack Developer. " +
            "BSc CS CGPA 8.56 · MCA Symbiosis · NVIDIA Deep Learning · React certified. Pune, India.",
        images: [{ url: OG_IMG, width: 1200, height: 630, alt: "Kaushal Gujarathi — About" }],
    },

    twitter: {
        card: "summary_large_image",
        title: "About Kaushal Gujarathi — Java & Full Stack Developer",
        description:
            "BSc CS CGPA 8.56 · MCA · NVIDIA Deep Learning certified · Spring Boot · React · Pune.",
        images: [OG_IMG],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
};

// JSON-LD: ProfilePage + Person + BreadcrumbList
const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${BASE}/about/#webpage`,
        name: "About Kaushal Gujarathi",
        description: "Developer profile, education, skills, and certifications of Kaushal Gujarathi.",
        url: `${BASE}/about`,
        isPartOf: { "@id": `${BASE}/#website` },
        breadcrumb: { "@id": `${BASE}/about/#breadcrumb` },
        mainEntity: {
            "@type": "Person",
            "@id": `${BASE}/#person`,
            name: "Kaushal Gujarathi",
            givenName: "Kaushal",
            familyName: "Gujarathi",
            jobTitle: "Java Backend Developer & Full Stack Developer",
            url: BASE,
            image: OG_IMG,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
            },
            alumniOf: [
                {
                    "@type": "CollegeOrUniversity",
                    name: "Sinhgad College Of Science",
                    sameAs: "https://www.sinhgad.edu/",
                    description: "BSc Computer Science, CGPA 8.56",
                },
                {
                    "@type": "CollegeOrUniversity",
                    name: "Symbiosis School for Online & Digital Learning",
                    sameAs: "https://www.ssodl.edu.in/",
                    description: "MCA (Master of Computer Applications)",
                },
            ],
            hasCredential: [
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "NVIDIA Deep Learning",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "NVIDIA" },
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "React Development",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Udemy" },
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "Full Stack Java Development",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Symbiosis" },
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "JavaScript Development",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Udemy" },
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "Cyber Security Analyst Job Simulation",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Tata & Forage" },
                },
            ],
            knowsAbout: [
                "Java", "Spring Boot", "JPA", "Hibernate", "Microservices",
                "React", "Angular", "Next.js", "TypeScript",
                "REST API", "MySQL", "Node.js", "Express.js", "MongoDB",
                "Python", "Git", "GitHub", "Postman",
            ],
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${BASE}/about/#breadcrumb`,
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "About", item: `${BASE}/about` },
        ],
    },
];

export default function About() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            {jsonLd.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
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
