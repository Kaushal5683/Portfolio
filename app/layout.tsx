import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/LenisProvider";
import portfolioRaw from "@/public/portfolio-data.json";
import PageProgress from "@/components/ui/PageProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const raw = portfolioRaw as {
  personalInfo: {
    name: string; tagline: string; title: string;
    description: string[]; phone: string;
  };
  socialLinks: { linkedin: string; github: string; instagram: string };
};

const { personalInfo, socialLinks } = raw;

const GITHUB = "https://kaushal5683.github.io/Portfolio";
const NETLIFY = "https://kaushal104.netlify.app";
const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === "true";
const PATH_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";
const OG_IMG = `${GITHUB}/images/ksg.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(GITHUB),

  title: {
    default: `Kaushal Gujarathi — Java Backend & Full Stack Developer | Portfolio`,
    template: `%s | Kaushal Gujarathi`,
  },

  description:
    "Kaushal Gujarathi is a Java Backend & Full Stack Developer from Pune, India. " +
    "Skilled in Spring Boot, React, Angular, Next.js, REST APIs, MySQL, and Node.js. " +
    "Available for freelance projects and full-time opportunities.",

  keywords: [
    // Name variants — most important for personal brand ranking
    "Kaushal Gujarathi", "Kaushal Gujarathi developer", "Kaushal Gujarathi portfolio",
    "Kaushal Gujarathi Java developer", "kaushal5683", "kaushal104",
    // Role keywords
    "Java Backend Developer", "Spring Boot Developer", "Full Stack Developer India",
    "React Developer Pune", "Angular Developer", "Next.js Developer",
    "Web Designer", "Freelance Developer India", "Backend Developer Pune",
    // Tech keywords
    "Java", "Spring Boot", "REST API Developer", "MERN Stack Developer",
    "Node.js Developer", "MySQL Developer", "Hibernate JPA", "Microservices",
    // Action keywords
    "Hire Java Developer India", "Hire Full Stack Developer",
    "Portfolio website developer",
  ],

  authors: [{ name: "Kaushal Gujarathi", url: GITHUB }],
  creator: "Kaushal Gujarathi",
  publisher: "Kaushal Gujarathi",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: `${PATH_PREFIX}/favicon/favicon.ico`, sizes: "any" },
      { url: `${PATH_PREFIX}/favicon/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${PATH_PREFIX}/favicon/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: `${PATH_PREFIX}/favicon/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: `${PATH_PREFIX}/favicon/android-chrome-192x192.png` },
      { rel: "android-chrome", url: `${PATH_PREFIX}/favicon/android-chrome-512x512.png` },
    ],
  },

  manifest: `${PATH_PREFIX}/favicon/site.webmanifest`,

  alternates: {
    canonical: GITHUB,
    // Both domains are mine
    languages: { "en-IN": NETLIFY },
  },

  // Enables Google to show a search box in results
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune, Maharashtra, India",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: GITHUB,
    siteName: "Kaushal Gujarathi — Portfolio",
    title: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
    description:
      "Java Backend Developer from Pune, India. Expert in Spring Boot, React, Angular & REST APIs. " +
      "View my projects, experience, and certifications.",
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: "Kaushal Gujarathi — Portfolio" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaushal Gujarathi — Java Backend & Full Stack Developer",
    description:
      "Java Backend Developer from Pune, India. Spring Boot · React · Angular · Next.js · REST APIs.",
    images: [OG_IMG],
  },
};

// ── Comprehensive JSON-LD ──────────────────────────────────────────────────────
const jsonLd = [
  // 1. Person schema (main entity — drives Google Knowledge Panel)
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${GITHUB}/#person`,
    name: "Kaushal Gujarathi",
    givenName: "Kaushal",
    familyName: "Gujarathi",
    url: GITHUB,
    image: OG_IMG,
    jobTitle: "Java Backend Developer & Full Stack Developer",
    description:
      "Java Backend & Full Stack Developer from Pune, Maharashtra, India. " +
      "Specialises in Spring Boot, React, Angular, REST APIs, and scalable enterprise applications.",
    telephone: personalInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.instagram,
      GITHUB,
      NETLIFY,
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Sinhgad College Of Science",
        sameAs: "https://www.sinhgad.edu/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Symbiosis School for Online & Digital Learning",
        sameAs: "https://www.ssodl.edu.in/",
      },
    ],
    knowsAbout: [
      "Java", "Spring Boot", "JPA", "Hibernate", "Microservices",
      "React", "Angular", "Next.js", "TypeScript",
      "REST API", "MySQL", "Node.js", "Express.js", "MongoDB",
      "Git", "GitHub", "Postman", "Python",
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
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      skills: "Java, Spring Boot, React, Angular, REST APIs, MySQL, Node.js",
    },
  },
  // 2. WebSite schema (enables sitelinks search box in Google)
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${GITHUB}/#website`,
    name: "Kaushal Gujarathi — Portfolio",
    url: GITHUB,
    description: "Portfolio website of Kaushal Gujarathi — Java Backend & Full Stack Developer from Pune, India.",
    author: { "@id": `${GITHUB}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${GITHUB}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0d0d14" />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <PageProgress />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
