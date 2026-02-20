import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import ZoomParallaxProjects from "@/components/sections/ZoomParallaxProjects";
import AnimatedTestimonials from "@/components/sections/AnimatedTestimonials";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import FlowFieldBackground from "@/components/ui/FlowFieldBackground";

const GITHUB = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";

export const metadata: Metadata = {
  title: "Kaushal Gujarathi — Java Backend & Full Stack Developer | Portfolio",
  description:
    "Hi, I'm Kaushal Gujarathi — Java Backend & Full Stack Developer from Pune, India. " +
    "I build scalable Spring Boot apps, REST APIs, React & Angular frontends. " +
    "BSc CS (CGPA 8.56) · NVIDIA Deep Learning · 3+ live client projects. " +
    "Available for freelance & full-time work.",
  alternates: {
    canonical: GITHUB,
    languages: { "en-IN": NETLIFY },
  },
  openGraph: {
    title: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
    description:
      "Java Backend Developer from Pune, India. Spring Boot · React · Angular · Next.js · REST APIs. " +
      "View my projects, certifications, and client work.",
    url: GITHUB,
    images: [
      {
        url: `${GITHUB}/images/ksg.webp`,
        width: 1200,
        height: 630,
        alt: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative bg-bg-primary">
      {/* Single flow field canvas — one continuous animation across the whole page */}
      <FlowFieldBackground
        color="#818cf8"
        particleCount={2500}
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
