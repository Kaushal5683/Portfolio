import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import CelestialSphere from "@/components/ui/CelestialSphere";

const BASE_URL = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Kaushal Gujarathi — Java Backend & Full Stack Developer available for freelance projects, collaborations, and full-time opportunities. Based in Pune, India.",
    keywords: [
        "hire Kaushal Gujarathi", "contact Java developer", "freelance React developer India",
        "hire full stack developer Pune", "web developer for hire", "software engineer Pune",
    ],
    alternates: {
        canonical: `${BASE_URL}/contact`,
        languages: { "en-IN": `${NETLIFY}/contact` },
    },
    openGraph: {
        title: "Contact Kaushal Gujarathi — Hire a Developer",
        description: "Reach out for freelance projects, collaborations, or full-time opportunities.",
        url: `${BASE_URL}/contact`,
        images: [{ url: `${BASE_URL}/images/ksg.webp`, width: 1200, height: 630, alt: "Contact Kaushal Gujarathi" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Kaushal Gujarathi",
        description: "Available for freelance & full-time · Java · React · Spring Boot",
        images: [`${BASE_URL}/images/ksg.webp`],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Kaushal Gujarathi",
    url: `${BASE_URL}/contact`,
    mainEntity: {
        "@type": "Person",
        name: "Kaushal Gujarathi",
        telephone: "+91 7218499483",
        address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
    },
};


export default function ContactPage() {
    return (
        <main className="relative bg-bg-primary min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
