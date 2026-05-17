import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";

const CelestialSphere = dynamic(
    () => import("@/components/ui/CelestialSphere"),
    { ssr: false }
);

const BASE    = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";
const OG_IMG  = `${BASE}/images/ME1.webp`;

export const metadata: Metadata = {
    // Template from layout gives: "Contact | Kaushal Gujarathi"
    title: "Contact",
    description:
        "Hire Kaushal Gujarathi — Java Backend & Full Stack Developer, Pune. " +
        "Available for freelance projects, remote contracts & full-time roles. " +
        "Spring Boot · React · Angular.",

    keywords: [
        "hire Kaushal Gujarathi", "contact Kaushal Gujarathi", "Kaushal Gujarathi email",
        "contact Java developer India", "hire Spring Boot developer",
        "freelance React developer India", "hire full stack developer Pune",
        "web developer for hire Pune", "software engineer available India",
        "Java developer freelance project", "hire Next.js developer India",
        "contact backend developer Pune", "Kaushal Gujarathi contact",
        "remote Java developer India", "full-time developer Pune",
    ],

    alternates: {
        canonical: `${BASE}/contact`,
        languages: { "en-IN": `${NETLIFY}/contact` },
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: `${BASE}/contact`,
        siteName: "Kaushal Gujarathi — Portfolio",
        title: "Contact Kaushal Gujarathi — Hire a Java & Full Stack Developer",
        description:
            "Get in touch with Kaushal Gujarathi for freelance, contract or full-time work. " +
            "Java · Spring Boot · React · Angular · Next.js · Pune, India.",
        images: [{ url: OG_IMG, width: 1200, height: 630, alt: "Contact Kaushal Gujarathi" }],
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact Kaushal Gujarathi — Hire a Developer",
        description:
            "Available for freelance & full-time · Java · Spring Boot · React · Angular · Pune.",
        images: [OG_IMG],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
};

// JSON-LD: ContactPage + LocalBusiness + BreadcrumbList
const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${BASE}/contact/#webpage`,
        name: "Contact Kaushal Gujarathi — Hire a Developer",
        description:
            "Reach out to Kaushal Gujarathi for freelance projects, collaborations, or full-time opportunities.",
        url: `${BASE}/contact`,
        isPartOf: { "@id": `${BASE}/#website` },
        breadcrumb: { "@id": `${BASE}/contact/#breadcrumb` },
        mainEntity: {
            "@type": "Person",
            "@id": `${BASE}/#person`,
            name: "Kaushal Gujarathi",
            jobTitle: "Java Backend Developer & Full Stack Developer",
            telephone: "+91-7218499483",
            email: "mailto:kaushalgujrathi10@gmail.com",
            url: BASE,
            image: OG_IMG,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
                postalCode: "411001",
            },
            availableForHire: true,
            knowsAbout: ["Java", "Spring Boot", "React", "Angular", "Next.js", "REST API", "MySQL"],
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${BASE}/contact/#breadcrumb`,
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE}/contact` },
        ],
    },
];

export default function ContactPage() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            {jsonLd.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <CelestialSphere hue={280} speed={0.25} zoom={1.6} particleSize={2.5} />
            <Navbar />
            <FloatingSocialBar />
            <div className="pt-24">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
