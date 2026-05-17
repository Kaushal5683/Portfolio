import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import ZoomParallaxProjects from "@/components/sections/ZoomParallaxProjects";
import AnimatedTestimonials from "@/components/sections/AnimatedTestimonials";

const FlowFieldBackground = dynamic(
    () => import("@/components/ui/FlowFieldBackground"),
    { ssr: false }
);

const GITHUB  = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";
const OG_IMG  = `${GITHUB}/images/ME1.webp`;

export const metadata: Metadata = {
    // Absolute title bypasses the layout template for the homepage
    title: {
        absolute: "Kaushal Gujarathi — Java Backend & Full Stack Developer | Portfolio",
    },
    description:
        "Kaushal Gujarathi is a Java Backend & Full Stack Developer from Pune, India. " +
        "Expert in Spring Boot, React, Angular & Next.js. 3+ live client projects, " +
        "NVIDIA Deep Learning certified. Available for freelance & full-time work.",

    keywords: [
        // Name variants (highest priority for personal brand ranking)
        "Kaushal Gujarathi", "Kaushal Gujrati", "kaushal gujarathi", "kaushal5683", "kaushal104",
        "Kaushal Gujarathi portfolio", "Kaushal Gujarathi developer", "Kaushal Gujarathi Java",
        // Role & location
        "Java Backend Developer Pune", "Full Stack Developer Pune", "Spring Boot Developer India",
        "React Developer Pune", "Angular Developer India", "Next.js Developer",
        "Freelance Developer India", "Backend Developer Pune", "Web Developer Pune",
        // Tech stack
        "Java", "Spring Boot", "REST API", "MERN Stack", "Hibernate JPA", "Microservices",
        "React", "Angular", "Next.js", "TypeScript", "Node.js", "MySQL", "MongoDB",
        // Action intent
        "Hire Java Developer India", "Hire Full Stack Developer Pune",
        "Portfolio website developer India",
    ],

    alternates: {
        canonical: GITHUB,
        languages: { "en-IN": NETLIFY },
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: GITHUB,
        siteName: "Kaushal Gujarathi — Portfolio",
        title: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
        description:
            "Java Backend & Full Stack Developer from Pune, India. " +
            "Spring Boot · React · Angular · REST APIs · 3+ client projects. " +
            "NVIDIA Deep Learning certified. Hire me!",
        images: [{ url: OG_IMG, width: 1200, height: 630, alt: "Kaushal Gujarathi — Portfolio" }],
    },

    twitter: {
        card: "summary_large_image",
        title: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
        description:
            "Java Backend Developer · Spring Boot · React · Angular · REST APIs · Pune, India.",
        images: [OG_IMG],
    },
};

export default function Home() {
    return (
        <main className="relative bg-bg-primary">
            <FlowFieldBackground
                color="#818cf8"
                particleCount={1800}
                speed={0.9}
                trailOpacity={0.1}
            />
            <Navbar />
            <FloatingSocialBar />
            <Hero />
            <AboutMe />
            <ZoomParallaxProjects />
            <AnimatedTestimonials />
            <Footer />
        </main>
    );
}
